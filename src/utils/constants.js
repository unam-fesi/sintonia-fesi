// =============================================================
// Sintonía UNAM — Constantes globales
// =============================================================

export const APP_NAME = 'Sintonía UNAM';
export const APP_TAGLINE = 'Orientación universitaria para el bienestar emocional';
export const TEST_VERSION = '1.0.0';
export const TOTAL_QUESTIONS = 20;

// Umbrales para clasificar nivel por dimensión (basado en porcentaje 0-100)
export const LEVEL_THRESHOLDS = {
  bajo:        { min: 0,  max: 33 },
  moderado:    { min: 34, max: 66 },
  prioritario: { min: 67, max: 100 },
};

export const LEVEL_LABELS = {
  bajo:        'Bajo nivel de atención',
  moderado:    'Atención moderada',
  prioritario: 'Atención prioritaria',
};

// Clave de sessionStorage para mantener el resultado durante la sesión
export const STORAGE_KEYS = {
  ANSWERS:      'sintonia.answers',
  CONSENT:      'sintonia.consent',
  RESULT:       'sintonia.result',
  ANON_CODE:    'sintonia.anon_code',
};

// Nombre de la Edge Function en Supabase
export const ORIENTATION_FUNCTION = 'generate-orientation';
