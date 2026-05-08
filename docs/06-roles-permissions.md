# 06 · Roles y permisos

## Cinco roles administrativos

| Rol | Para quién | Filosofía |
|---|---|---|
| **`admin`** | Owner técnico/operativo del programa | Control total, único que crea otros usuarios, modifica seguridad |
| **`coordinador`** | Responsable del contenido del programa | Edita preguntas, recomendaciones, recursos, eventos, kit docente |
| **`analista`** | Equipo de investigación / dirección | Ve métricas agregadas, exporta CSVs, lee insights — nunca detalle individual |
| **`especialista`** | Psicólogo/orientador UNAM | Lee detalle de sesiones, deja notas privadas, busca por código anónimo |
| **`docente`** | Profesores que acompañan a alumnos | Acceso al kit pedagógico (descargas, guías) — nada más |

## Ocho permisos atómicos

Cada rol agrega un set de permisos. El componente `<RoleGuard requires={[...]}>` y los menús del sidebar leen estos permisos:

| Permiso | Descripción | admin | coordinador | analista | especialista | docente |
|---|---|---|---|---|---|---|
| `view_aggregated`   | KPIs, charts agregados (sin detalle individual) | ✅ | ✅ | ✅ | ✅ | ❌ |
| `view_detail`       | Detalle de sesión individual (sin PII)          | ✅ | ❌ | ❌ | ✅ | ❌ |
| `view_insights`     | Insights generados con IA                        | ✅ | ❌ | ✅ | ❌ | ❌ |
| `manage_users`      | Crear/editar/borrar usuarios admin              | ✅ | ❌ | ❌ | ❌ | ❌ |
| `manage_content`    | Editar preguntas, recursos, eventos, copy       | ✅ | ✅ | ❌ | ❌ | ❌ |
| `manage_config`     | Configuración del sistema, feature flags        | ✅ | ❌ | ❌ | ❌ | ❌ |
| `manage_security`   | Auditoría, blocklist, rate limits               | ✅ | ❌ | ❌ | ❌ | ❌ |
| `view_teachers_kit` | Kit pedagógico para docentes                    | ✅ | ✅ | ❌ | ❌ | ✅ |

## Mapa de páginas vs permisos

| Ruta | Permiso requerido | Quién entra |
|---|---|---|
| `/admin/login` | — | Cualquiera |
| `/admin/perfil` | logged-in | Todos los staff |
| `/admin/stats` | `view_aggregated` | admin, coordinador, analista, especialista |
| `/admin/insights` | `view_insights` | admin, analista |
| `/admin/search` | `view_detail` | admin, especialista |
| `/admin/auditoria` | `manage_security` | admin |
| `/admin/operaciones` | `manage_security` | admin |
| `/admin/sistema` | `manage_config` | admin |
| `/admin/avanzado` | `manage_config` | admin |
| `/admin/programa` | `manage_content` | admin, coordinador |
| `/admin/contenido` | `manage_content` | admin, coordinador |
| `/admin/anonimos` | `manage_security` | admin |
| `/admin/exportar` | `view_aggregated` | admin, analista |
| `/admin/docentes` | `view_teachers_kit` | admin, coordinador, docente |

## Implementación

### `RoleGuard` componente

```jsx
<RoleGuard requires={['view_detail']}>
  <DetailPanel />
</RoleGuard>
```

Si el usuario no tiene el permiso, muestra un mensaje "No tienes acceso a esta sección" sin redirigir (para no romper navegación).

### Tabla de permisos en código

Vive en `src/utils/constants.js` (o similar) como mapa estático:

```js
export const ROLE_PERMISSIONS = {
  admin: ['view_aggregated','view_detail','view_insights','manage_users',
          'manage_content','manage_config','manage_security','view_teachers_kit'],
  coordinador: ['view_aggregated','manage_content','view_teachers_kit'],
  analista:    ['view_aggregated','view_insights'],
  especialista:['view_aggregated','view_detail'],
  docente:     ['view_teachers_kit'],
};
```

### Verificación en backend

Las Edge Functions sensibles (ej. `admin-create-user`, `admin-delete-anonymous`) hacen:

```ts
const { data: { user } } = await supa.auth.getUser(token);
const { data: row } = await supa.from('admin_users').select('role').eq('user_id', user.id).single();
if (!row || row.role !== 'admin') return json({ error: 'No autorizado' }, 403);
```

Y las RLS policies usan `has_admin_access(auth.uid())` o `has_role(auth.uid(), 'admin')`.

## Crear un usuario admin

Hay dos vías:

### 1. Desde el panel (recomendado)
`/admin/usuarios` → "Nuevo usuario" → ingresa email, password, full_name, rol. Llama a `admin-create-user` Edge Function que:
1. Crea el usuario en `auth.users` con email confirmado.
2. Inserta fila en `admin_users` con el rol.
3. Loggea en `admin_audit_log`.

### 2. Manual (SQL)
Sólo para el primer admin (bootstrap):

```sql
-- 1) Crear usuario en Supabase Dashboard → Authentication → Users → Add user
-- 2) Asignar rol:
INSERT INTO public.admin_users (user_id, email, role, full_name)
VALUES ('<uuid-del-usuario>', 'admin@unam.mx', 'admin', 'Admin Principal');
```

## Cambiar rol o desactivar

Desde `/admin/usuarios` admin puede:
- Cambiar rol (loggeado en audit).
- Desactivar (soft delete: `active = false` + revoca sesiones).
- Borrar (hard delete: borra de `admin_users` y de `auth.users`).

## Auditoría

Toda acción de admin se persiste en `admin_audit_log`:
- `admin_email` — quién
- `action` — `created`, `updated`, `deleted`, `viewed`, `exported`
- `entity` — `users`, `questions`, `recommendations`, `resources`, `prompt`, `alerts`, `anonymous_user`
- `entity_id` — id del recurso
- `before_data` / `after_data` — snapshots json
- `created_at`, `ip_address` (en claro para staff, no aplica privacidad anónima)

Visible en `/admin/auditoria` (solo admin), filtrable por entidad/admin/fecha, exportable a CSV.
