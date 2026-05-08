# 09 · Changelog

Historial de "waves" y entregables del proyecto.

## Fundación

**Wave 0 — Bootstrap (React + Vite + Supabase)**
- Repo limpio, estructura `src/` con pages/components/services/hooks.
- Sistema de diseño: paleta UNAM + acentos psicológicos, tipografía Source Serif 4 + Inter.
- Datos fallback (preguntas, recursos, recomendaciones) en `src/data/` para que la app funcione offline.
- Componentes base: Header, Footer, Hero, InfoCard, ProgressBar, QuestionCard, ResultCard, ResourceCard, DimensionChart, SafetyNotice.
- Páginas core eager: Home, Consent, Assessment, Results.
- Edge Function inaugural: `generate-orientation`.
- README completo + validación de build local.

## Iteraciones tempranas

**Fix CORS + RLS en producción**
- Headers CORS abiertos en todas las Edge Functions.
- RLS policies para que `anon` pueda crear sesiones sin autenticación.

**Fix botón nav-cta + rediseño /admin**
- Resolución de bug `.nav a` overrideando `.btn-primary` con `:not(.btn)`.
- Rediseño visual del panel admin con sidebar + contenido principal.

**Rebrand Gemini → Pum-AI + 3D bubbles + sugerencias admin**
- Toda referencia "Gemini" reemplazada por "Pum-AI" en UI.
- `DimensionBubbles` con efecto pseudo-3D.
- `PumAISuggester` para sugerencias de mejora a preguntas/recomendaciones.

## Oleadas (waves estructuradas)

**Oleada 1 — SQL migration + editores de contenido + auditoría**
- Migración base con tablas, índices, RLS.
- Editores en `/admin/contenido` para preguntas, recomendaciones, recursos.
- `admin_audit_log` con trigger automático.

**Oleada 2 — Estadísticas + métricas Pum-AI + export**
- `/admin/stats` con charts (sesiones, dimensiones, niveles).
- `view_pumai_metrics` y `view_pumai_cost`.
- Export CSV en `/admin/exportar`.

**Oleada 3 — Búsqueda + notas + encuesta + alertas + dark mode**
- `/admin/search` con filtros avanzados.
- `session_notes` para que especialistas dejen notas privadas.
- Encuesta post-test (`assessment_feedback`).
- Sistema de alertas configurables.
- Dark mode toggle (solo en admin).

**Iconos nuevos + Pum-AI suggester de preguntas + recomendar Fase 2**
- Iconografía rediseñada en menú admin.
- `PumAIRecSuggester` para recomendaciones.

## Waves alfabéticas (Fase 2)

**Wave A — sort + rec-suggester + mega-SQL + anon student auth**
- Ordenación en tablas admin.
- Migración masiva: `student_profiles`, `ip_log`, `ip_blocklist`, `anon_passwords`.
- Edge Function `anon-auth` con register/login/history.

**Wave B — check-in + ruta bienestar + canalización + diario**
- `/check-in` semanal con 5 preguntas.
- `/ruta` con plan de 21 días generado por Pum-AI (`generate-wellness-route`).
- `/apoyo` (canalización inmediata).
- `/diario` con entradas privadas + emotion_tag.

**Wave C — Acompañante IA + Biblioteca + Emociones + Frase del día + FAB crisis**
- `/companion` chat empático con `chat-companion`.
- `/biblioteca` con artículos/audios/podcasts.
- `/emociones` diccionario emocional educativo.
- Frase/reto del día rotando en home.
- `CrisisFAB` botón flotante "🆘 Apoyo inmediato".

**Wave D — Mapa + árboles + buddy + calendario + avatar + treasure hunt**
- `/mapa` con Leaflet + OpenStreetMap.
- `/arboles` gamificación de hábitos.
- `/buddy` emparejamiento anónimo.
- `/calendario` de eventos.
- `EmotionalAvatar` interactivo.
- `/aventura` modo lúdico con pistas.

**Wave E — Admin avanzado completo (insights IA + operación + programa + docentes)**
- `/admin/insights` con `ai-insights` Edge Function.
- `/admin/operaciones` con auditoría + IPs sospechosas + bloqueadas.
- `/admin/programa` para gestionar campus, carreras, eventos.
- `/admin/docentes` (privado) con kit pedagógico.

**Pulido post-Wave E**
- Mover `/docentes` público a `/admin/docentes` (requiere rol).
- Card "continuidad" en home.
- Nav rediseñado.
- Avatar visible en hero.

## Pulido fino y seguridad

**RoleGuard + fix mi-panel + login icon + anon logout + admin de usuarios anónimos**
- `<RoleGuard requires={[...]}>` componente.
- Fix navegación a "Mi panel".
- Icono de login en header.
- Logout anónimo con clearStudent.
- `/admin/anonimos` con cards + filtros + delete cascade.

**Pulido: nav back + error wellness route + buddy AI casual + tracking retos**
- Botones "atrás" consistentes.
- Fallback `buildLocalPlan()` para wellness route.
- Personas casuales para buddy IA.
- Tracking de retos diarios.

**Wave I — Rate limits + security review + webinars**
- Rate limits en `chat-companion`, `buddy-ai-reply`, `anon-auth`.
- Auditoría de seguridad completa.
- `WebinarToast` + tabla `webinars` + admin de webinars.

**Diario inteligente — sugerencia de biblioteca**
- `journal-suggest` Edge Function.
- Pum-AI lee el journal y sugiere libros relevantes según emoción.

**AdminAnonymous rediseño**
- Cards en lugar de tabla.
- Botón delete con confirmación.
- Filtro de inactivos +1 mes.

**Revisión mobile**
- Header drawer vía createPortal (fix iOS Safari).
- Tablas admin colapsables.
- Admin sidebar drawer en móvil.

## Pulidos recientes (mayo 2026)

**Mascota + UX**
- Avatar Pum-AI mejorado.
- "Supabase" reemplazado por "Backend"/"BD"/"el sistema" en UI pública.
- Generación de password al crear admin.
- Background "marea de acuarela" intensificado: wash gradient + 5 blobs `mix-blend-mode: multiply` + parallax sutil.

**Documentación completa**
- Carpeta `docs/` con 11 archivos: overview, arquitectura, features, database, edge-functions, roles-permissions, deployment, security, changelog, roadmap, README.

**Buddy chat fixes**
- **Anonimato**: Pum-AI buddy ya no revela nombre/carrera/facultad/semestre. Saludos rotativos sin presentación de identidad.
- **Mobile UX**: polling reemplazado por **realtime** (Supabase postgres_changes). Cero refresco visible, no estorba al teclear.
- **Delays humanos**: respuestas con timing variable basado en longitud del reply (1.4-9s). Saludo inicial espera 1.8-3.5s.
- **Indicador "escribiendo…"**: 3 puntitos animados mientras la IA procesa.
- **Mensajes optimistas**: aparecen al instante, se reemplazan al confirmar el INSERT real.
- **System prompt blindado**: lenguaje de chavos con variación natural, regla #1 de anonimato, defensa post-IA con regex.

**Anon-auth blindado**
- Try/catch global: nunca devuelve 5xx vacío.
- `action: 'ping'` para diagnóstico.
- Tolerancia a fallas en `ip_log`.
- `extractFnError()` en frontend para extraer el body que el SDK ocultaba.

**Admin: modo testing para rate limits**
- "🧹 Limpiar logs" en `SuspiciousIPs`.
- "Desbloquear y limpiar logs" en `BlockedIPs` (evita re-bloqueo).
- "🧹 Resetear rate limits de las últimas 24h" para developer testing.

**BuddyAvailableToast**
- Notificación realtime cuando otro estudiante anónimo entra a la cola de buddy.
- Solo visible si: hay código + no admin + no en /buddy + no en test + no tienes pareja activa.
- Auto-oculta tras 25s. Dismiss = silencia 30 min.
