# Sintonía UNAM

> Orientación universitaria para el bienestar emocional.
> Plataforma anónima, informativa y no diagnóstica para la comunidad UNAM.

Una autoevaluación breve (20 preguntas, 7-10 minutos) que entrega
un resultado por dimensiones, recomendaciones de autocuidado y vinculación
con recursos universitarios. Apoyada por inteligencia artificial **con responsabilidad**.

---

## Stack

| Capa        | Tecnología                                  |
|-------------|---------------------------------------------|
| Frontend    | React + Vite                                |
| Routing     | React Router DOM                            |
| Hosting     | GitHub Pages                                |
| Base datos  | Supabase Postgres + Row Level Security      |
| Función IA  | Supabase Edge Function (Deno)               |
| IA          | Google Gemini (vía Edge Function)           |

La API key de Gemini **nunca** vive en el frontend. Sólo en secrets de Supabase.

---

## Arquitectura

```
┌──────────────────────────────────────────────────────────────┐
│  navegador (GitHub Pages estático, React + Vite)             │
│  ──────────────────────────────────────────────────────────  │
│  [Home] → [Consent] → [Assessment 20q] → [Results]           │
│                              │                                │
│                              ▼                                │
│             /functions/generate-orientation                   │
│             (Edge Function, Deno)                             │
│                              │                                │
│                              ▼                                │
│                       Gemini API                              │
└──────────────────────────────────────────────────────────────┘
            │
            └── Inserta sesión + respuestas (anónimas) →  Supabase Postgres
```

- El test guarda **sesiones y respuestas anónimas** (sin PII).
- La Edge Function recibe únicamente datos agregados, llama a Gemini y persiste el output en `gemini_outputs`.
- Si Gemini no está configurada, el sistema entrega recomendaciones del catálogo local (fallback).

---

## Estructura del proyecto

```
sintonia-unam/
├── README.md
├── package.json
├── vite.config.js
├── index.html
├── .env.example
├── .nojekyll
├── public/
│   ├── favicon.svg
│   └── 404.html              · Redirect SPA para GitHub Pages
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── config/
│   │   └── supabaseClient.js
│   ├── data/
│   │   ├── fallbackQuestions.js
│   │   ├── fallbackResources.js
│   │   └── fallbackRecommendations.js
│   ├── components/           · Header, Footer, Hero, InfoCard,
│   │                           ProgressBar, QuestionCard,
│   │                           ResultCard, ResourceCard,
│   │                           DimensionChart, SafetyNotice
│   ├── pages/                · Home, Consent, Assessment, Results,
│   │                           Resources, Privacy, Admin
│   ├── services/             · assessmentService, supabaseService, geminiService
│   ├── utils/                · scoring, anonymousCode, constants
│   └── styles/               · global.css, theme.css
└── supabase/
    ├── schema.sql            · 6 tablas + RLS
    ├── seed.sql              · 20 preguntas + recomendaciones + recursos
    ├── config.toml
    └── functions/
        └── generate-orientation/
            ├── index.ts
            └── deno.json
```

---

## Requisitos

- Node.js 18 o superior (recomendado 20)
- npm 9 o superior
- Cuenta de Supabase (gratuita)
- API key de Google AI Studio para Gemini
- (Opcional) Supabase CLI para desplegar Edge Functions

---

## Instalación local

```bash
npm install
cp .env.example .env.local       # edita con tus claves
npm run dev                      # http://localhost:5173/sintonia-unam/
```

`.env.local`:

```env
VITE_SUPABASE_URL=https://knblatuzbgzgnugwkxdp.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_xxx_tu_key_aqui
VITE_BASE_PATH=/sintonia-unam/
```

> Si trabajas en local con base path "/", cambia `VITE_BASE_PATH=/`.

---

## Configuración de Supabase

### 1. Cargar el schema y los datos

Desde el **SQL Editor** del proyecto Supabase:

```sql
-- 1. Ejecuta supabase/schema.sql
-- 2. Ejecuta supabase/seed.sql
```

Esto crea:
- 6 tablas (`questions`, `assessment_sessions`, `assessment_answers`, `recommendations`, `resources`, `gemini_outputs`)
- Políticas RLS:
  - Lectura pública de catálogos activos.
  - Inserción anónima de sesiones y respuestas.
  - Bloqueo de lectura pública sobre respuestas y outputs Gemini.
- Vista `view_level_distribution` para reportes agregados.
- 20 preguntas, 15 recomendaciones, 8 recursos de ejemplo.

### 2. Variables de entorno del frontend

`VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` se obtienen en
**Project Settings → API**.

> El nombre técnico es **anon key**. En el panel nuevo de Supabase puede
> aparecer como **publishable key** (formato `sb_publishable_...`). Ambas son seguras
> para frontend si tienes RLS activo.

---

## Configuración de Gemini

### 1. Obtener API key

[Google AI Studio](https://aistudio.google.com/) → API key → crea o selecciona una existente.

### 2. Definir secrets en Supabase

**Project Settings → Edge Functions → Secrets**:

| Variable                    | Valor                                         |
|-----------------------------|-----------------------------------------------|
| `SUPABASE_URL`              | URL del proyecto Supabase                     |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key (no expongas en frontend)    |
| `GEMINI_API_KEY`            | API key de Gemini                             |
| `GEMINI_MODEL`              | `gemini-1.5-flash` (opcional)                 |

### 3. Desplegar la Edge Function

Con la [Supabase CLI](https://supabase.com/docs/guides/cli):

```bash
npm install -g supabase
supabase login
supabase link --project-ref <tu-project-ref>

supabase functions deploy generate-orientation --no-verify-jwt
```

`--no-verify-jwt` permite que la función responda al test público anónimo.
La validación se hace internamente en el código de la función.

---

## Despliegue en GitHub Pages

### 1. Subir el repo a GitHub

```bash
git init
git add .
git commit -m "Sintonía UNAM — primera versión"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/sintonia-unam.git
git push -u origin main
```

### 2. Build y deploy

```bash
npm run build
npm run deploy
```

`npm run deploy` usa `gh-pages` para publicar `dist/` a la rama `gh-pages` automáticamente.

En GitHub: **Settings → Pages**, source: `Deploy from a branch`, branch: `gh-pages`, folder: `/ (root)`. En 1-2 minutos quedará en
`https://<tu-usuario>.github.io/sintonia-unam/`.

> Si tu repositorio se llama distinto, ajusta `VITE_BASE_PATH` en `.env.local` y rebuild.
> Por ejemplo, si el repo es `armonia` → `VITE_BASE_PATH=/armonia/`.

### 3. SPA fallback

`public/404.html` redirige rutas como `/sintonia-unam/recursos` al index con un parámetro `?p=`.
`src/main.jsx` lo procesa y restaura la URL para React Router. No necesitas configurar más.

---

## Variables de entorno

| Variable                    | Dónde se usa     | Notas                                      |
|-----------------------------|------------------|--------------------------------------------|
| `VITE_SUPABASE_URL`         | Frontend         | Pública                                    |
| `VITE_SUPABASE_ANON_KEY`    | Frontend         | Pública (RLS la protege)                   |
| `VITE_BASE_PATH`            | Build de Vite    | Igual al subdir de GitHub Pages            |
| `SUPABASE_URL`              | Edge Function    | Secret                                     |
| `SUPABASE_SERVICE_ROLE_KEY` | Edge Function    | **Secret** — nunca en frontend             |
| `GEMINI_API_KEY`            | Edge Function    | **Secret** — nunca en frontend             |
| `GEMINI_MODEL`              | Edge Function    | Opcional. Default: `gemini-1.5-flash`      |

---

## Seguridad

- **Sin PII en frontend.** No solicitamos nombre, correo, teléfono, número de cuenta ni IP.
- **Anonimato.** Identificamos sesiones con un código tipo `SIN-KQT-2856`.
- **Almacenamiento mínimo.** Sólo se guardan respuestas (0-4), puntajes y un timestamp.
- **RLS activo.** Sólo se permite lectura pública de catálogos activos. Las respuestas y outputs Gemini quedan inaccesibles sin role autenticado.
- **API key de Gemini en secrets.** El cliente nunca la ve.
- **Validación y sanitización en la Edge Function.** El payload se recorta y se filtra para evitar prompt injection.
- **sessionStorage** (no localStorage) para el resultado durante la sesión activa, evitando persistencia indebida.

---

## Limitaciones (Fase 1)

- Sin autenticación de admin: la pantalla `/admin` está marcada como prototipo.
- Sin filtros por carrera o plantel (no se capturan para preservar anonimato).
- Sin seguimiento longitudinal (la persona puede repetir el test, pero no comparamos resultados).
- Sin app móvil nativa.
- Las recomendaciones AI son útiles pero no reemplazan personalización humana.

---

## Tono y comunicación

- Lenguaje cercano, respetuoso, no clínico.
- Evitamos: "Tienes ansiedad/depresión", "Tu diagnóstico es", "Necesitas tratamiento".
- Usamos: "Tus respuestas sugieren", "Podrías beneficiarte de", "Esta orientación no sustituye atención profesional".

---

## Roadmap — Fase 2 (documentado, no implementado)

1. **Ruta de bienestar de 7-14 días** — actividades, pausas activas, deporte, arte, sustentabilidad.
2. **Check-in semanal** — 30-60 segundos, anónimo.
3. **Clave anónima persistente** para seguimiento longitudinal sin PII.
4. **Mapa vivo de bienestar universitario** — recursos por plantel y categoría.
5. **Bienestar verde** — caminatas, jardines polinizadores, talleres de plantas medicinales, retos de cuidado ambiental.
6. **Acompañante con IA** — chat limitado, no terapéutico.
7. **Dashboard institucional avanzado** — tendencias, dimensiones críticas, participación, indicadores de impacto.
8. **Kit para docentes y tutores** — señales no diagnósticas, directorio de canalización, dinámicas de integración.
9. **Gamificación responsable** — logros no competitivos.
10. **Canalización segura** — flujos para crisis o solicitud explícita de apoyo.
11. **Analítica de impacto comunitario** — uso, recomendaciones más útiles, necesidades emergentes.
12. **Autenticación de admin** — Supabase Auth o SSO institucional.

---

## Criterios de aceptación de esta versión

- [x] El sitio carga localmente con `npm run dev`.
- [x] La página de inicio se visualiza correctamente.
- [x] El usuario acepta consentimiento.
- [x] El usuario responde 20 preguntas con barra de progreso.
- [x] El sistema calcula resultado local transparente.
- [x] El sistema muestra recomendaciones (con fallback).
- [x] Funciona aunque Gemini no esté configurado.
- [x] La arquitectura llama a Gemini desde Supabase Edge Function.
- [x] La API key de Gemini no se expone.
- [x] Hay SQL completo para Supabase con RLS.
- [x] Hay documentación para GitHub Pages.
- [x] Fase 2 documentada como evolución del proyecto.

---

## Licencia y créditos

© Universidad Nacional Autónoma de México, 2026.
Programa universitario de orientación para el bienestar emocional.

Esta plataforma es informativa y no constituye atención clínica.
