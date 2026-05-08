// =============================================================
// Sintonía UNAM — Cliente Supabase para el frontend
// Sólo se usan claves PÚBLICAS (anon / publishable).
// Las claves service_role y de Gemini viven en Edge Functions.
// =============================================================

import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: { persistSession: false }, // Sin sesión en flujo público
      global: { headers: { 'x-sintonia-app': 'web' } },
    })
  : null;

if (!isSupabaseConfigured && import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.warn(
    '[Sintonía UNAM] Falta configurar VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en .env.local'
  );
}
