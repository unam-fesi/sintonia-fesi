# 10 · Roadmap

Lo que sigue. Esta lista es un mapa vivo — prioridades pueden cambiar según feedback de estudiantes y del equipo del programa.

## Próximos pasos inmediatos

### Push-notifications opcionales
- Web Push API en navegadores compatibles + suscripción opcional desde "El rincón".
- Recordatorios suaves: check-in semanal, día de la ruta, mensaje del buddy.
- Sin trackeo: sólo notificaciones server → cliente. Si el usuario rechaza permisos, todo sigue funcionando.

### App móvil (PWA)
- Service worker para offline-first del test (las preguntas y el scoring son locales).
- Manifest.json para "Add to homescreen" en iOS/Android.
- Caching agresivo de assets estáticos (logo, iconos, sonidos).

### Internacionalización
- Soporte inglés (mucho intercambio académico en UNAM).
- Estructura: `src/locales/es.json`, `en.json` con `react-intl` o solución ligera propia.
- Toggle de idioma en footer.

## Mejoras de IA

### Pum-AI con contexto de carrera/facultad (anónimo)
- Si el usuario opta por compartir su facultad al registrarse, las respuestas de Pum-AI pueden referenciar contextos comunes (ej. "los exámenes finales de Química suelen ser muy intensos").
- Implementación: pasar `faculty` (sin PII) al system prompt.

### Buddy IA mejorado
- Memoria de turnos previos más larga (actualmente últimos 10).
- Resumen automático de conversaciones largas para mantener contexto.
- Detección de "fatiga del buddy" — si un usuario habla mucho del mismo tema sin avanzar, sugerir conectar con especialista.

### Insights más profundos
- Dashboard de tendencias por facultad/carrera con análisis de Pum-AI ("este mes en FES Acatlán los niveles de estrés académico subieron 15% — coincide con periodo de finales").
- Alertas automáticas al equipo del programa cuando un campus tiene pico de niveles prioritarios.

## Funcionalidades de comunidad

### Buddy con voz/audio (opcional)
- Mensajes de audio cortos en el chat buddy (max 60s).
- Transcripción local con Web Speech API (privacidad).
- Encriptación end-to-end con la propia salt del par.

### Grupos pequeños
- "Círculos" de 4-6 estudiantes anónimos con un facilitador (especialista UNAM).
- Sesión asíncrona durante 7 días.
- Tema rotativo: ansiedad ante exámenes, soledad, autoestima, etc.

### Eventos en vivo (webinars 2.0)
- Webinars con chat en vivo anónimo (Q&A).
- Replay disponible 30 días.
- Integración con calendario de la UNAM.

## Salud mental + clínico

### Canalización guiada con triaje
- Si un test indica nivel prioritario, ofrecer agendar cita con especialista (sin PII — el especialista verifica el código al recibir).
- Slots disponibles de cada especialista con su agenda (sin nombres ni teléfonos).
- Recordatorio con código (no email) al usuario.

### Conexión con servicios externos
- Línea de la Vida 800 290 0024 — botón "llamar ahora" en CrisisFAB que abre `tel:`.
- SAPTEL, OPC UNAM con info actualizada en `resources`.

## Investigación + impacto

### Reporte público anual
- Generación de un reporte público (sin datos individuales) con los hallazgos.
- Visualizaciones interactivas en `/impacto`.
- Open data: dataset agregado descargable para investigadores con acuerdo de uso.

### Benchmark comparativo
- Comparar tu nivel con el promedio de tu facultad/semestre (siempre agregado, anónimo).
- Reduce sensación de "soy el único con esto".

## Infraestructura + dev experience

### Migrar a `supabase/` carpeta como source of truth
- Mover todos los `.ts` y `.sql` a `supabase/functions/<name>/index.ts` y `supabase/migrations/`.
- Auto-deploy en CI con GitHub Actions cuando se mergea a `main`.

### Tests
- Vitest + React Testing Library para componentes.
- Playwright para flujos end-to-end (test del test, registro anónimo, buddy chat).
- Mock de Edge Functions con MSW.

### Monitoring
- Sentry para errores de cliente.
- Logs estructurados en Edge Functions con niveles (info/warn/error).
- Dashboard de uptime accesible al equipo.

## Accesibilidad (a11y)

### Audit completo
- Lighthouse + axe-core para verificar WCAG 2.1 AA.
- Lectura de pantalla optimizada (NVDA, VoiceOver).
- Navegación con teclado en todas las páginas (ya hay focus-visible, falta validar).

### Subtítulos en audios
- Los 10 sonidos relajantes en `/biblioteca` con descripción textual.
- Webinars con transcripción.

## Nice-to-haves

- **Tema personalizable** por usuario anónimo (paletas alternativas).
- **Modo "no me molestes"** que silencia toasts (BuddyAvailableToast, WebinarToast) por X horas.
- **Compartir mi resultado** (sin PII): genera una imagen con tu nivel y dimensiones para compartir si quieres (opt-in explícito).
- **Stickers/badges** desbloqueables al completar la ruta, hacer N check-ins, ayudar a un buddy.
- **Modo "mentor"**: estudiantes avanzados que se ofrecen como buddy más estable (con onboarding).

## No-haremos

- ❌ **Login con email/Google/Facebook**. Rompe el principio de anonimato. Si un día se necesita seguimiento longitudinal con identidad, será un programa separado y opt-in muy explícito.
- ❌ **Diagnóstico clínico automatizado**. La IA orienta, no diagnostica. Esto es no-negociable.
- ❌ **Anuncios o monetización**. Programa universitario, gratuito, sin tracking.
- ❌ **Dataset crudo público**. Sólo agregados anonimizados para investigación.

---

¿Tienes una idea? Abre un issue en el repo o contacta al programa. Las ideas mejor recibidas son las que vienen de los propios estudiantes.
