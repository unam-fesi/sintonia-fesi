# 05 · Edge Functions

Las Edge Functions corren en **Deno** sobre la red de Supabase. Cada función vive en `supabase/functions/<name>/index.ts` y se despliega con:

```bash
supabase functions deploy <name> --no-verify-jwt
```

Todas las funciones devuelven JSON con CORS abierto (`*`) y comparten el patrón:

```ts
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};
```

## Variables de entorno (secrets)

Configuradas en el dashboard de Supabase → Project Settings → Edge Functions → Secrets:

- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (auto-disponibles).
- `GEMINI_API_KEY` — clave de Google AI Studio.
- `GEMINI_MODEL` — por defecto `gemini-2.5-flash`.
- `HASH_SALT` — salt para hashear IPs y passwords. **Cambiar en producción** del default.

## Catálogo de funciones (11 total)

### `generate-orientation`
Genera el texto orientativo + recomendaciones a partir de los scores del test.
- **Input**: `{ scores: [...], dimension_scores: {...}, anonymous_code?, faculty? }`
- **Salida**: `{ generated_text, recommendations: [...], dimension_summary: {...} }`
- Usa Gemini con `responseSchema` para JSON estricto. Si Gemini truena, fallback local desde `data/fallbackRecommendations.js`.
- Persiste en `assessment_sessions` si hay código.

### `chat-companion`
Chat con Pum-AI (modo "acompañante empático").
- **Input**: `{ anonymous_code, message, session_id? }`
- **Pre-check**: regex de crisis. Si match → devuelve respuesta de emergencia local, NO llama a Gemini.
- **Rate limits**: 30 mensajes/hora por código, 200 llamadas/día por IP-hash.
- Carga últimos 10 turnos de `chat_messages` como contexto.
- Persiste turnos del usuario y de Pum-AI.

### `buddy-ai-reply`
Cuando un usuario chatea con un "buddy" que en realidad es Pum-AI con persona casual de chavo.
- **Input**: `{ pair_id }`
- **Anonimato estricto**: NUNCA revela nombre/carrera/facultad. Persona interna usa solo `vibe`, `focus`, `edad`.
- **Saludo inicial**: 13 variantes rotativas casuales ("qué onda, todo bien?", "ola! cómo va?", ...).
- **Crisis**: 3 variantes rotativas. Mantiene contención + sugiere Línea de la Vida.
- **Delay humano**: calcula `targetDuration = 1400-2000ms base + 22-35ms per char + 0-700ms jitter`. Resta lo que ya tardó Gemini, capa a 9s. Por eso una respuesta corta llega en ~3s y una larga en ~6s.
- **Saludo del primer mensaje** también espera 1.8-3.5s antes de aparecer.
- **Defensa post-IA**: regex que limpia si Gemini se desliza con "soy X, Nto de Carrera" o "FES X".
- **Rate limits**: 30 msgs/hora por par, 200 llamadas/día por IP, cooldown 1.5s entre respuestas.

### `anon-auth`
Registro y validación de cuentas anónimas.
- **Actions**:
  - `ping` → diagnóstico (`{ ok, has_url, has_service, has_salt }`).
  - `register` → crea `student_profiles` con código + password (opcional) + faculty/career/semester.
  - `login` → valida password contra hash SHA-256+salt.
  - `history` → devuelve sesiones, check-ins, journal, achievements del código (post-login).
- **Anti-abuso**: max 5 registros/IP/24h → auto-bloquea en `ip_blocklist`.
- **Try/catch global**: nunca devuelve 5xx vacío, siempre JSON con `detail`, `hint`, `code` del error.
- **Tolerancia**: si `ip_log` falla (no migrada, RLS), no bloquea el registro.

### `generate-wellness-route`
Genera el plan de bienestar de 21 días basado en scores.
- **Input**: `{ anonymous_code, dimension_scores, focus_areas }`
- **Output**: `{ days: [{ day, theme, micro_habit, reading, exercise }, ...] }`
- Si Gemini falla, `buildLocalPlan()` arma un plan template con 21 días.
- Persiste en `wellness_routes`.

### `journal-suggest`
Sugerencias contextuales para el diario (Pum-AI lee la entrada y sugiere libros/recursos).
- **Input**: `{ anonymous_code, entry, emotion_tag }`
- **Output**: `{ suggestion: { type: 'book'|'resource', title, why } }`
- Conectado al catálogo de biblioteca.

### `suggest-questions`
Asistente para coordinadores: sugiere mejoras/variantes para preguntas del test.
- **Input**: `{ question_id, current_text, dimension }`
- **Output**: `{ suggestions: [...] }`
- Usado en `/admin/contenido` por el `PumAISuggester`.

### `suggest-recommendations`
Igual que el anterior pero para recomendaciones.
- **Input**: `{ recommendation_id, current_text, dimension, level }`
- **Output**: `{ suggestions: [...] }`

### `ai-insights`
Genera insights agregados (privacidad-preserving) sobre datos de la plataforma.
- **Input**: `{ scope: 'monthly'|'faculty'|'dimension', range }`
- **Output**: `{ headlines, patterns, recommendations_for_program }`
- Cachea resultados en `ai_insights` para no re-generar en cada vista.
- **Roles requeridos**: admin o analista.

### `admin-create-user`
Crea un usuario admin completo (auth + admin_users) con password.
- **Input**: `{ email, password, role, full_name }`
- Solo accesible por admin (verifica JWT).
- Útil porque el dashboard de Supabase no permite asignar role directamente.

### `admin-delete-anonymous`
Borrado en cascada de un usuario anónimo y todos sus datos.
- **Input**: `{ anonymous_code, reason }`
- Borra en orden: árboles → journal → check-ins → buddy → chat → sesiones → profile.
- Loggea cada paso en `admin_audit_log`.
- Solo accesible por admin.

## Patrones compartidos

### Hashing de IP
```ts
async function ipHash(ip: string) {
  const buf = await crypto.subtle.digest("SHA-256",
    new TextEncoder().encode(`${HASH_SALT}::ip::${ip}`));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}
```

### Detección de crisis
```ts
const CRISIS_PATTERNS = [
  /\b(suicid|matarme|quitarme la vida|terminar (con )?todo|no quiero (vivir|seguir))\b/i,
  /\b(autolesi[oó]n|cortarme|hacer(me)? da[ñn]o)\b/i,
];
function detectCrisis(t: string) { return CRISIS_PATTERNS.some(p => p.test(t)); }
```

### Llamada a Gemini con presupuesto
```ts
generationConfig: {
  temperature: 0.85,
  maxOutputTokens: 600,
  thinkingConfig: { thinkingBudget: 0 },  // crítico: evita truncar la respuesta
  responseMimeType: "application/json",   // si esperamos JSON
  responseSchema: {...},
}
```

## Despliegue

```bash
# Para todas las funciones
for fn in generate-orientation chat-companion buddy-ai-reply anon-auth \
          generate-wellness-route journal-suggest suggest-questions \
          suggest-recommendations ai-insights admin-create-user \
          admin-delete-anonymous; do
  supabase functions deploy $fn --no-verify-jwt
done
```

`--no-verify-jwt` es necesario porque el frontend público no manda JWT (solo anon key). Las funciones que requieren admin verifican el token manualmente con `supa.auth.getUser(token)`.

## Logs y debugging

- `console.log/error` aparece en Supabase Dashboard → Edge Functions → tu función → Logs.
- Para diagnóstico desde el cliente: cualquier función responde a `{ action: 'ping' }` o devuelve `{ detail }` cuando hay error.
- En `MyHistory.jsx` y otros, la función `extractFnError(error)` lee el body del FunctionsHttpError que el SDK oculta.
