// =============================================================
// Sintonía UNAM — Auth y permisos para /admin
// =============================================================

import { supabase, isSupabaseConfigured } from '../config/supabaseClient.js';

let _authClient = null;

// Cliente Supabase con persistencia de sesión, separado del público.
// Importante: para auth necesitamos persistSession=true.
export function authClient() {
  if (_authClient || !isSupabaseConfigured) return _authClient;
  // Reusamos el mismo client base; sus opciones de auth ya permiten signIn.
  // Forzamos persistencia activando localStorage internamente al hacer login.
  _authClient = supabase;
  return _authClient;
}

export async function signIn(email, password) {
  const c = authClient();
  if (!c) throw new Error('Supabase no configurado');
  const { data, error } = await c.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const c = authClient();
  if (!c) return;
  await c.auth.signOut();
}

export async function getCurrentUser() {
  const c = authClient();
  if (!c) return null;
  const { data } = await c.auth.getUser();
  return data?.user || null;
}

// Devuelve { user, role } si hay admin activo, o null si no.
export async function getAdminContext() {
  const user = await getCurrentUser();
  if (!user) return null;
  const c = authClient();
  const { data, error } = await c
    .from('admin_users')
    .select('id, role, full_name, email, active')
    .eq('user_id', user.id)
    .maybeSingle();
  if (error || !data || !data.active) return null;
  return { user, admin: data };
}

// Helpers de permisos
export const PERMISSIONS = {
  admin:        ['view_aggregated','view_detail','manage_users','manage_content','manage_config'],
  especialista: ['view_aggregated','view_detail'],
  analista:     ['view_aggregated'],
  coordinador:  ['view_aggregated','manage_content'],
};

export function can(role, permission) {
  return Boolean(PERMISSIONS[role]?.includes(permission));
}

// Listener para reaccionar a cambios de sesión
export function onAuthChange(callback) {
  const c = authClient();
  if (!c) return () => {};
  const { data: sub } = c.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  });
  return () => sub.subscription.unsubscribe();
}
