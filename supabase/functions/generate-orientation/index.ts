// =============================================================
// Sintonía UNAM — Edge Function: generate-orientation
// -------------------------------------------------------------
// Recibe el resultado AGREGADO (sin PII) y, con apoyo de Gemini,
// devuelve una orientación amigable estructurada.
//
// Estructura esperada:
//   POST { ping?: true } → { ok: true } (health-check)
//   POST {
//     session_id, test_version, general_level, dimensions,
//     top_attention_areas, recommendation_catalog
//   }
//   → {
//     friendly_summary, suggested_actions[],
//     recommended_resources[], safety_note
//   }
//
// Variables (Supabase → Project Settings → Edge Functions → Secrets):
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, GEMINI_API_KEY, GEMINI_MODEL
//
// Despliegue:
//   supabase functions deploy generate-orientation --no-verify-jwt
// =============================================================

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL  = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY   = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const GEMINI_KEY    = Deno.env.get("GEMINI_API_KEY")!;
const GEMINI_MODEL  = Deno.env.get("GEMINI_MODEL") || "gemini-1.5-flash";

const PROMPT_VERSION = "v1.0";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

const supa = SERVICE_KEY
  ? createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } })
  : null;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ error: "JSON inválido" }, 400);
  }

  // Health-check rápido
  if (body?.ping === true) {
    return json({ ok: true, model: GEMINI_MODEL, configured: Boolean(GEMINI_KEY) });
  }

  // Validación de payload
  if (!isValidPayload(body)) {
    return json({ error: "Payload inválido" }, 400);
  }

  // Sanitizar para evitar prompt-injection (no aceptamos texto libre)
  const safe = {
    general_level: String(body.general_level || "moderado"),
    dimensions: sanitizeDimensions(body.dimensions),
    top_attention_areas: sanitizeAttentionAreas(body.top_attention_areas),
    recommendation_catalog: sanitizeCatalog(body.recommendation_catalog),
  };

  // Llamar a Gemini
  let aiOutput = await callGemini(safe);
  if (!aiOutput) {
    aiOutput = fallbackOutput(safe);
  }

  // Persistir output si hay session_id válido
  if (supa && typeof body.session_id === "string" && body.session_id.length > 0) {
    try {
      await supa.from("gemini_outputs").insert({
        session_id: body.session_id,
        prompt_version: PROMPT_VERSION,
        input_summary: safe,
        output: aiOutput,
      });
    } catch (e) {
      console.warn("gemini_outputs insert failed", e);
    }
  }

  return json(aiOutput);
});

// ============================================================
// Helpers
// ============================================================
function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), { status, headers: cors });
}

function isValidPayload(b: any) {
  return b && typeof b === "object" &&
    typeof b.general_level === "string" &&
    b.dimensions && typeof b.dimensions === "object";
}

function sanitizeDimensions(d: any): Record<string, { score: number; level: string; label: string }> {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(d || {})) {
    if (!v || typeof v !== "object") continue;
    out[String(k).slice(0, 64)] = {
      score: Math.max(0, Math.min(100, Number((v as any).score) || 0)),
      level: ["bajo","moderado","prioritario"].includes((v as any).level) ? (v as any).level : "moderado",
      label: String((v as any).label || k).slice(0, 64),
    };
  }
  return out;
}

function sanitizeAttentionAreas(a: any) {
  if (!Array.isArray(a)) return [];
  return a.slice(0, 5).map((it: any) => ({
    label: String(it?.label || "").slice(0, 64),
    score: Number(it?.score) || 0,
    level: String(it?.level || ""),
  }));
}

function sanitizeCatalog(c: any) {
  if (!Array.isArray(c)) return [];
  return c.slice(0, 30).map((r: any) => ({
    dimension: String(r?.dimension || "").slice(0, 64),
    level: String(r?.level || ""),
    title: String(r?.title || "").slice(0, 120),
    description: String(r?.description || "").slice(0, 280),
  }));
}

// ----------------------------------------------------------
// Llamada a Gemini con prompt restringido
// ----------------------------------------------------------
async function callGemini(input: any) {
  if (!GEMINI_KEY) return null;

  const SYSTEM = `Eres un asistente de orientación universitaria para bienestar emocional.
Tu función es explicar de forma amable y NO diagnóstica los resultados agregados de una autoevaluación.
NO eres terapeuta, médico ni psicólogo clínico.
NO puedes emitir diagnósticos, indicar tratamientos, interpretar condiciones clínicas
ni sustituir atención profesional.

Recibirás:
- Nivel general de atención (bajo, moderado, prioritario).
- Puntajes por dimensión (0..100) y nivel de cada dimensión.
- Áreas de mayor atención.
- Un catálogo controlado de recomendaciones permitidas.

Reglas obligatorias:
1. Responde siempre en español neutro de México.
2. Usa tono empático, claro y prudente.
3. NO uses lenguaje clínico definitivo (no digas "tienes depresión", "ansiedad", "trastorno", "enfermedad").
4. NO recomiendes medicamentos.
5. NO inventes servicios o recursos.
6. Usa frases como "tus respuestas sugieren", "podrías beneficiarte de", "puede ayudar".
7. Sugiere acciones simples, accesibles y seguras de autocuidado.
8. Recomienda acercarse a recursos institucionales cuando sea pertinente.
9. Incluye SIEMPRE una nota indicando que el resultado es informativo y no sustituye atención profesional.
10. Devuelve UNICAMENTE JSON válido con este formato exacto:
{
  "friendly_summary": "string (1-3 frases)",
  "suggested_actions": ["string", "string", "string"],
  "recommended_resources": ["string", "string", "string"],
  "safety_note": "string"
}`;

  const userInput = JSON.stringify(input).slice(0, 4000);
  const prompt = `${SYSTEM}\n\nDATOS DEL ESTUDIANTE:\n${userInput}\n\nRecuerda: SOLO JSON válido, sin markdown ni texto extra.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_KEY}`;

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,
          responseMimeType: "application/json",
          maxOutputTokens: 800,
        },
      }),
    });

    if (!resp.ok) {
      console.error("Gemini error", resp.status, (await resp.text()).slice(0, 500));
      return null;
    }

    const json = await resp.json();
    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return null;

    let parsed: any;
    try { parsed = JSON.parse(text); } catch { return null; }

    // Validación final del esquema
    if (
      typeof parsed?.friendly_summary !== "string" ||
      !Array.isArray(parsed?.suggested_actions) ||
      !Array.isArray(parsed?.recommended_resources) ||
      typeof parsed?.safety_note !== "string"
    ) return null;

    return {
      friendly_summary: parsed.friendly_summary.slice(0, 600),
      suggested_actions: parsed.suggested_actions.slice(0, 5).map((s: any) => String(s).slice(0, 240)),
      recommended_resources: parsed.recommended_resources.slice(0, 5).map((s: any) => String(s).slice(0, 240)),
      safety_note: parsed.safety_note.slice(0, 400),
    };
  } catch (err) {
    console.error("Gemini fetch failed", err);
    return null;
  }
}

// Salida fallback si Gemini no está disponible: usa el catálogo controlado.
function fallbackOutput(input: any) {
  const recs = (input.recommendation_catalog || []).filter((r: any) =>
    input.dimensions[r.dimension]?.level === r.level
  );

  const actions = recs.slice(0, 3).map((r: any) => `${r.title}. ${r.description}`);
  const resources = [
    "Servicios de orientación psicológica de tu plantel",
    "Programa Institucional de Tutorías",
    "Actividades culturales y deportivas universitarias",
  ];

  return {
    friendly_summary:
      input.general_level === "bajo"
        ? "Tus respuestas sugieren un buen equilibrio general. Sigue cuidando tus rutinas y vínculos."
        : input.general_level === "moderado"
        ? "Tus respuestas sugieren áreas en las que vale la pena enfocar tu autocuidado durante las próximas semanas."
        : "Tus respuestas sugieren que podrías beneficiarte de acercarte a apoyos universitarios para acompañarte.",
    suggested_actions: actions.length ? actions : [
      "Date pequeñas pausas durante el día.",
      "Conversa con alguien de confianza sobre cómo te sientes.",
      "Participa en una actividad cultural o deportiva esta semana.",
    ],
    recommended_resources: resources,
    safety_note:
      "Esta orientación es informativa y no sustituye atención profesional. Si lo necesitas, acércate a los servicios universitarios.",
  };
}
