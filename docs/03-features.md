# 03 · Funcionalidades

Catálogo completo de funcionalidades por tipo de usuario.

## Usuarios públicos (sin código anónimo)

### Home (`/`)
Landing pública con hero, explicación del flujo, accesos directos al test, recursos y privacidad. CTA principal: "Hacer mi autoevaluación". Background animado "marea de acuarela".

### Consentimiento (`/consentimiento`)
Pantalla previa al test que detalla qué se hace con los datos, anonimato, no diagnóstico. Checkbox de aceptación obligatorio para continuar. Marca un flag en `sessionStorage`.

### Test / Evaluación (`/evaluacion`)
Cuestionario de 20 preguntas en 7 dimensiones (Ánimo, Energía, Conexión, Estrés académico, Sueño, Hábitos, Pertenencia). Componente `QuestionCard` con escala Likert. ProgressBar superior. Las respuestas viven en `sessionStorage` hasta el envío.

### Resultado (`/resultado`)
Genera la orientación con Pum-AI vía Edge Function `generate-orientation`:
- `ResultCard` con texto empático personalizado
- `DimensionChart` (barras horizontales)
- `DimensionBubbles` (visualización lúdica)
- `ResourceCard[]` con recursos sugeridos
- `PostTestFeedback` (¿te fue útil? 👍👎)
- Si hay código anónimo, persiste la sesión

### Recursos (`/recursos`)
Catálogo navegable de servicios UNAM (psicológicos, sociales, académicos, comunitarios). Filtros por categoría y campus. Cada `ResourceCard` muestra horarios, ubicación, contacto, link a más info.

### Mapa (`/mapa`)
Vista geoespacial con Leaflet sobre tiles de OpenStreetMap. Markers de colores según tipo de recurso. Popup con CTA "Ver detalle". Carga Leaflet por CDN dinámicamente.

### Apoyo (`/apoyo`)
Página de canalización inmediata: línea de la vida, UNAM emergencias, OPC. Diseño sobrio, sin distracciones. Disponible también como `CrisisFAB` (botón flotante).

### Privacidad (`/privacidad`)
Política de privacidad detallada, qué se guarda, dónde, cómo se anonimiza, cómo solicitar borrado. Accesible desde footer de toda la app.

### Emociones (`/emociones`)
Diccionario emocional educativo: categorías, ejemplos, ideas de regulación. Componente `EmotionalAvatar` interactivo.

### Calendario (`/calendario`)
Vista de eventos universitarios de bienestar (talleres, círculos, webinars). Sin requerir login.

### Biblioteca (`/biblioteca`)
Recursos asincrónicos: artículos, podcasts, audios. Filtros por tema y duración.

### Aventura (`/aventura`)
Modo lúdico: misiones cortas de bienestar (ej. "5 min de respiración consciente"). Disponible para todos pero con progreso sólo si hay código.

## Usuarios públicos (con código anónimo)

Todo lo de arriba **+** acceso a "El rincón" personal.

### Mi historia (`/mi-historia`)
Línea del tiempo de los tests realizados con el mismo código. Muestra evolución de dimensiones, cambios de nivel y recomendaciones generadas. Permite descargar PDF (cliente).

### Check-in semanal (`/check-in`)
Mini-evaluación de 5 preguntas que captura ánimo de la semana. Guardada en `checkins`. El usuario ve su tendencia en gráfica.

### Diario (`/diario`)
Editor de entradas de bitácora privadas. Pum-AI puede sugerir prompts (Edge Fn `journal-suggest`). Las entradas se guardan cifradas (hash de código + salt como key) en `diario_entries`.

### Ruta de bienestar (`/ruta`)
Plan personalizado de 21 días generado por Pum-AI a partir de los resultados. Edge Fn `generate-wellness-route`. Incluye microhábitos, lecturas, ejercicios. Marca progreso por día.

### Companion (`/companion`)
Chat empático con Pum-AI. Edge Fn `chat-companion` con historial de últimos N turnos. Detección de crisis local (regex) que corto-circuita la IA. Rate limit por IP + código.

### Buddy (`/buddy`)
Acompañamiento entre pares anónimo. Cada usuario obtiene un buddy aleatorio del pool. Mensajes asincrónicos. Hay opción de "buddy IA" si no hay match (Edge Fn `buddy-ai-reply`).

### Árboles adoptados (`/arboles`)
Gamificación: cada hábito completado riega un árbol. Visualización tipo bosque. Los árboles persisten asociados al código.

## Usuarios administrativos

Acceso vía `/admin/login` con email + password (Supabase Auth). Cada rol ve sólo lo que sus permisos le habilitan.

### Comunes a todos los roles administrativos
- **Login** (`/admin/login`): formulario auth + redirect según rol
- **Mi perfil** (`/admin/perfil`): cambio de contraseña, datos del staff
- **Toggle de tema**: oscuro/claro (sólo en admin)

### Admin (rol con permisos completos)
Acceso a todas las secciones siguientes.

### Estadísticas (`/admin/stats`)
KPIs agregados: usuarios activos, tests completados, niveles de bienestar, tendencias semanales/mensuales. Charts con `Charts.jsx`. **Roles**: admin, analista.

### Insights (`/admin/insights`)
Análisis automático con IA (Edge Fn `ai-insights`) sobre datos agregados. Patrones por carrera, campus, dimensión más afectada. **Roles**: admin, analista.

### Búsqueda (`/admin/search`)
Localizar sesiones por código (sin PII), filtros por nivel, fecha, dimensión. Muestra detalle clínico-orientativo. **Roles**: admin, especialista.

### Auditoría (`/admin/auditoria`)
Log inmutable de todas las acciones administrativas (quién, cuándo, qué). Filtrable. **Roles**: admin.

### Operaciones (`/admin/operaciones`)
Salud del sistema: latencia de Edge Functions, errores recientes, rate limit hits. **Roles**: admin.

### Sistema (`/admin/sistema`)
Estado del backend, BD, configuración general (modelos IA, prompts globales). **Roles**: admin.

### Avanzado (`/admin/avanzado`)
Configuración profunda: feature flags, A/B testing, jobs programados. **Roles**: admin.

### Programa (`/admin/programa`)
Gestión del programa universitario: campus, carreras, semestres, eventos. **Roles**: admin, coordinador.

### Contenido (`/admin/contenido`)
Editor visual de `content_blocks`: preguntas del test, descripciones, copy de la home. Versionado básico. **Roles**: admin, coordinador.

### Anónimos (`/admin/anonimos`)
Lista de usuarios anónimos activos, con acción de "borrar todo" en cascada (Edge Fn `admin-delete-anonymous`) que limpia sesiones, diario, buddy, etc. **Roles**: admin.

### Exportar (`/admin/exportar`)
Descarga CSVs de datos agregados (nunca PII). Sesiones, check-ins, métricas. **Roles**: admin, analista.

### Kit docente (`/admin/docentes`)
Material descargable para docentes: guía para detectar señales tempranas, lecturas, scripts para conversación. Antes era pública en `/docentes`, ahora vive bajo admin con rol `docente`. **Roles**: admin, docente.

## Funcionalidades transversales

### CrisisFAB
Botón flotante "🆘 Apoyo inmediato" siempre visible en rutas públicas. Lleva a `/apoyo` y muestra modal con líneas de ayuda.

### WebinarToast
Notificación discreta en home cuando hay un webinar próximo (tabla `webinars`).

### WellnessBackground
Fondo animado "marea de acuarela" en todas las rutas públicas, **excepto** `/evaluacion` (para concentración).

### Header / Footer
Header con logo, navegación, link a "El rincón" si hay código activo. Drawer móvil vía portal. Footer con links a privacidad, contacto, repo.

### Pum-AI Suggesters
- `PumAISuggester`: sugerencias contextuales de preguntas en el test
- `PumAIRecSuggester`: sugerencias de recomendaciones en resultados

### Daily content
`DailyContent` muestra una frase/práctica del día rotada en home. Conectado a `content_blocks`.

## Flujo de "primera vez" (sin código)

```
Home → Consentimiento → Test (20 preguntas)
     → Resultado (orientación + recursos)
     → Banner: "¿Quieres guardar tu progreso anónimamente? Crea un código"
     → Si acepta → anon-auth → guarda en sessionStorage
     → Acceso a Mi historia, Check-in, Diario, Ruta, Companion, Buddy, Aventura
```

## Flujo de "vuelta" (con código)

```
Cualquier dispositivo → Home → "Tengo un código" → input
     → useStudent valida con anon-auth (op: validate, con password si aplica)
     → sessionStorage poblada
     → Header muestra "Hola, anónimo · ir al rincón"
```
