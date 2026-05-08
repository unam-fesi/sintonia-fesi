import { useEffect, useState } from 'react';
import { useNavigate, NavLink, Routes, Route } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../config/supabaseClient.js';
import { getAdminContext, signOut, can, ROLE_LABEL } from '../services/authService.js';
import { checkSupabaseHealth } from '../services/supabaseService.js';
import { checkOrientationHealth } from '../services/geminiService.js';
import DimensionBubbles from '../components/DimensionBubbles.jsx';
import AdminProfile from './AdminProfile.jsx';
import AdminContent from './AdminContent.jsx';
import AdminAudit from './AdminAudit.jsx';
import AdminStats from './AdminStats.jsx';
import AdminExport from './AdminExport.jsx';
import AdminSearch from './AdminSearch.jsx';
import AdminSystem from './AdminSystem.jsx';
import AdminInsights from './AdminInsights.jsx';
import AdminOperations from './AdminOperations.jsx';
import AdminAdvanced from './AdminAdvanced.jsx';
import AdminProgram from './AdminProgram.jsx';
import TeachersKit from './TeachersKit.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';

export default function Admin() {
  const navigate = useNavigate();
  const [ctx, setCtx] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const c = await getAdminContext().catch(() => null);
      if (!c) {
        navigate('/admin/login', { replace: true });
        return;
      }
      setCtx(c);
      setLoading(false);
    })();
  }, [navigate]);

  if (loading) {
    return (
      <section className="section">
        <div className="container text-center">
          <div className="spinner" style={{margin: '40px auto 18px'}} />
          <p className="lede">Verificando sesión…</p>
        </div>
      </section>
    );
  }

  if (!ctx) return null;

  async function refreshCtx() {
    const c = await getAdminContext().catch(() => null);
    if (c) setCtx(c);
  }

  return (
    <div className="admin-shell">
      <AdminSidebar ctx={ctx} />
      <main className="admin-main">
        <Routes>
          {/* Index: docente cae directo en su kit; los demás ven dashboard */}
          <Route index element={ctx.admin.role === 'docente' ? <TeachersKit /> : <AdminDashboard ctx={ctx} />} />
          <Route path="perfil" element={<AdminProfile ctx={ctx} onUpdated={refreshCtx} />} />

          {can(ctx.admin.role, 'view_aggregated') && <Route path="estadisticas" element={<AdminStats />} />}
          {can(ctx.admin.role, 'view_aggregated') && <Route path="avanzado"     element={<AdminAdvanced />} />}
          {can(ctx.admin.role, 'view_insights')   && <Route path="insights"     element={<AdminInsights />} />}
          {can(ctx.admin.role, 'view_detail')     && <Route path="sesiones"     element={<AdminSessions />} />}
          {can(ctx.admin.role, 'view_detail')     && <Route path="buscar"       element={<AdminSearch ctx={ctx} />} />}
          {can(ctx.admin.role, 'manage_content')  && <Route path="contenido"    element={<AdminContent ctx={ctx} />} />}
          {can(ctx.admin.role, 'manage_content')  && <Route path="programa"     element={<AdminProgram ctx={ctx} />} />}
          {can(ctx.admin.role, 'view_aggregated') && <Route path="exportar"     element={<AdminExport ctx={ctx} />} />}
          {can(ctx.admin.role, 'manage_config')   && <Route path="sistema"      element={<AdminSystem ctx={ctx} />} />}
          {can(ctx.admin.role, 'manage_security') && <Route path="operacion"    element={<AdminOperations ctx={ctx} />} />}
          {can(ctx.admin.role, 'manage_users')    && <Route path="usuarios"     element={<AdminUsers ctx={ctx} />} />}
          {can(ctx.admin.role, 'manage_users')    && <Route path="auditoria"    element={<AdminAudit />} />}
          {can(ctx.admin.role, 'view_teachers_kit') && <Route path="docentes"   element={<TeachersKit />} />}
        </Routes>
      </main>

      <style>{`
        .admin-shell {
          display: grid;
          grid-template-columns: 240px 1fr;
          min-height: calc(100vh - 80px);
        }
        .admin-side {
          background: var(--c-azul-800);
          color: #fff;
          padding: 24px 18px;
        }
        .admin-side .role-chip {
          display: inline-block;
          padding: 3px 8px;
          background: var(--c-oro-600);
          color: var(--c-azul-800);
          border-radius: 999px;
          font-size: 0.66rem;
          font-weight: 800;
          margin-bottom: 4px;
          text-transform: uppercase;
        }
        .profile-link {
          display: grid;
          grid-template-columns: 42px 1fr 22px;
          gap: 10px;
          align-items: center;
          padding: 10px;
          margin-bottom: 18px;
          border-radius: 12px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          color: #fff !important;
          transition: background 0.2s;
        }
        .profile-link:hover { background: rgba(255,255,255,0.12); }
        .profile-link .avatar {
          width: 42px; height: 42px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--c-oro-600), var(--c-oro-400));
          color: var(--c-azul-800);
          font-family: var(--ff-serif);
          font-weight: 800;
          font-size: 1.1rem;
          display: grid; place-items: center;
        }
        .profile-link .profile-meta {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .profile-link .profile-meta strong {
          font-size: 0.92rem;
          color: #fff;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .profile-link .profile-meta small {
          font-size: 0.74rem;
          color: rgba(255,255,255,0.65);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .profile-link .edit-icon {
          opacity: 0.6;
          font-size: 1.1rem;
        }
        .profile-link.active {
          background: var(--c-oro-600);
          color: var(--c-azul-800) !important;
        }
        .profile-link.active .profile-meta strong,
        .profile-link.active .profile-meta small { color: var(--c-azul-800); }
        .profile-link.active .avatar {
          background: var(--c-azul-800);
          color: var(--c-oro-400);
        }
        .admin-nav { display: grid; gap: 4px; }
        .admin-nav a {
          padding: 10px 14px;
          border-radius: 10px;
          color: rgba(255,255,255,0.85);
          font-size: 0.94rem;
          font-weight: 600;
          transition: background 0.2s;
        }
        .admin-nav a:hover { background: rgba(255,255,255,0.08); }
        .admin-nav a.active { background: var(--c-oro-600); color: var(--c-azul-800); }
        .admin-side .logout {
          margin-top: 20px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: var(--c-oro-400);
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          font-weight: 700;
          cursor: pointer;
        }
        .admin-side .logout:hover { background: rgba(255,255,255,0.05); }
        .admin-main { padding: 28px 32px 60px; background: var(--c-marfil); }

        @media (max-width: 880px) {
          .admin-shell { grid-template-columns: 1fr; }
          .admin-side { padding: 16px; }
        }
      `}</style>
    </div>
  );
}

function AdminSidebar({ ctx }) {
  const r = ctx.admin.role;
  const initials = (ctx.admin.full_name || ctx.admin.email)
    .split(/\s+|@|\./)
    .filter(Boolean)
    .map(p => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className="admin-side">
      <NavLink to="perfil" className="profile-link" title="Editar mi perfil">
        <span className="avatar" aria-hidden="true">{initials}</span>
        <div className="profile-meta">
          <span className="role-chip">{ROLE_LABEL[r] || r}</span>
          <strong>{ctx.admin.full_name || ctx.admin.email}</strong>
          <small>{ctx.admin.email}</small>
        </div>
        <span className="edit-icon" aria-hidden="true">⚙</span>
      </NavLink>

      <nav className="admin-nav">
        {r !== 'docente' && <NavLink to="" end>📊 Dashboard</NavLink>}

        {can(r, 'view_aggregated') && <NavLink to="estadisticas">📈 Estadísticas</NavLink>}
        {can(r, 'view_aggregated') && <NavLink to="avanzado">🧠 Análisis avanzado</NavLink>}
        {can(r, 'view_insights')   && <NavLink to="insights">✨ Pum-AI Insights</NavLink>}

        {can(r, 'view_detail')     && <NavLink to="sesiones">🔍 Sesiones</NavLink>}
        {can(r, 'view_detail')     && <NavLink to="buscar">🔎 Buscar por código</NavLink>}

        {can(r, 'manage_content')  && <NavLink to="contenido">📝 Contenido</NavLink>}
        {can(r, 'manage_content')  && <NavLink to="programa">🌱 Programa</NavLink>}

        {can(r, 'view_aggregated') && <NavLink to="exportar">⬇ Exportar</NavLink>}

        {can(r, 'manage_config')   && <NavLink to="sistema">⚙ Sistema</NavLink>}
        {can(r, 'manage_security') && <NavLink to="operacion">🔒 Operación</NavLink>}

        {can(r, 'manage_users')    && <NavLink to="usuarios">👥 Usuarios admin</NavLink>}
        {can(r, 'manage_users')    && <NavLink to="auditoria">🧾 Auditoría</NavLink>}

        {can(r, 'view_teachers_kit') && <NavLink to="docentes" end={r === 'docente'}>📚 Kit docente</NavLink>}

        <NavLink to="perfil">👤 Mi perfil</NavLink>
      </nav>

      <ThemeToggle />

      <button className="logout" onClick={async () => {
        await signOut();
        window.location.href = import.meta.env.BASE_URL + 'admin/login';
      }}>↩ Cerrar sesión</button>
    </aside>
  );
}

// =============================================================
// Dashboard
// =============================================================
function AdminDashboard({ ctx }) {
  const r = ctx.admin.role;
  const [conn, setConn] = useState({});
  const [metrics, setMetrics] = useState({ loading: true });

  useEffect(() => {
    (async () => {
      const [s, g] = await Promise.all([checkSupabaseHealth(), checkOrientationHealth()]);
      setConn({ supabase: s, gemini: g });
    })();
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) { setMetrics({ loading: false }); return; }
    if (!can(r, 'view_aggregated')) { setMetrics({ loading: false }); return; }

    (async () => {
      try {
        const [{ count: total }, dimResult, recentResult] = await Promise.all([
          supabase.from('assessment_sessions').select('*', { count: 'exact', head: true }),
          supabase.from('view_dimension_impact').select('*'),
          supabase
            .from('assessment_sessions')
            .select('id, anonymous_code, total_score, general_level, top_attention_areas, created_at')
            .order('created_at', { ascending: false })
            .limit(10),
        ]);

        const recent = recentResult.data || [];
        const avg = recent.length
          ? Math.round(recent.reduce((s, r) => s + (r.total_score || 0), 0) / recent.length)
          : null;

        const levels = { bajo: 0, moderado: 0, prioritario: 0 };
        const lvlResult = await supabase
          .from('assessment_sessions')
          .select('general_level')
          .not('general_level', 'is', null);
        for (const row of lvlResult.data || []) {
          if (levels[row.general_level] !== undefined) levels[row.general_level]++;
        }

        setMetrics({
          loading: false,
          total: total ?? 0,
          avg,
          recent,
          dimensions: dimResult.data || [],
          levels,
        });
      } catch (e) {
        console.warn(e);
        setMetrics({ loading: false, error: e.message });
      }
    })();
  }, [r]);

  return (
    <>
      <header className="page-head">
        <div>
          <span className="tag">Panel administrativo</span>
          <h1 className="mt-2">Bienvenida, bienvenido</h1>
          <p className="lede">
            Como <strong>{ROLE_LABEL[r]}</strong>, accedes a {permissionsDescription(r)}.
          </p>
        </div>
        <div className="health">
          <ConnChip label="Supabase" ok={conn.supabase?.ok} />
          <ConnChip label="Pum-AI"   ok={conn.gemini?.ok} />
        </div>
      </header>

      {metrics.loading ? (
        <div className="text-center mt-4"><div className="spinner" style={{margin: '0 auto'}} /></div>
      ) : (
        <>
          <div className="kpi-grid">
            <Kpi label="Sesiones totales" value={metrics.total ?? '—'} />
            <Kpi label="Promedio reciente" value={metrics.avg ?? '—'} suffix="/100" />
            <Kpi label="Nivel bajo"        value={metrics.levels?.bajo ?? 0}        accent="sage" />
            <Kpi label="Nivel moderado"    value={metrics.levels?.moderado ?? 0}    accent="gold" />
            <Kpi label="Nivel prioritario" value={metrics.levels?.prioritario ?? 0} accent="coral" />
          </div>

          <section className="panel mt-4">
            <span className="tag">Modelo dimensional de impacto</span>
            <h2 className="mt-2">Esferas de bienestar</h2>
            <p className="lede">
              Cada esfera representa una dimensión del bienestar. El tamaño es proporcional al
              número de menciones en áreas de atención de las sesiones completadas. Esto te
              ayuda a identificar dónde está el mayor impacto.
            </p>
            <DimensionBubbles data={metrics.dimensions || []} />
          </section>

          {can(r, 'view_aggregated') && (
            <section className="panel mt-4">
              <h2>Sesiones recientes</h2>
              <p className="note">
                {can(r, 'view_detail')
                  ? 'Vista agregada. Para ver el detalle por sesión, ve a "Sesiones detalladas".'
                  : 'Vista agregada — los detalles individuales requieren rol de Especialista o Administrador.'}
              </p>
              <div className="table-wrap mt-2">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Código</th>
                      <th>Puntaje</th>
                      <th>Nivel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(metrics.recent || []).length === 0 ? (
                      <tr><td colSpan={4} className="note text-center">Sin registros aún.</td></tr>
                    ) : metrics.recent.map(s => (
                      <tr key={s.id}>
                        <td>{new Date(s.created_at).toLocaleString('es-MX')}</td>
                        <td><code>{s.anonymous_code}</code></td>
                        <td>{s.total_score ?? '—'}</td>
                        <td><span className={`lvl-bg-${s.general_level}`} style={{padding:'4px 10px',borderRadius:8,fontWeight:700}}>{s.general_level || '—'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </>
      )}

      <style>{`
        .page-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 24px;
        }
        .page-head h1 { margin: 0 0 6px; }
        .health { display: flex; gap: 8px; flex-wrap: wrap; }
        .conn-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: var(--r-pill);
          font-size: 0.84rem;
          font-weight: 700;
        }
        .conn-chip.ok      { background: var(--c-salvia-100); color: #2F6048; }
        .conn-chip.fail    { background: var(--c-coral-100); color: #93362A; }
        .conn-chip.unknown { background: var(--c-azul-100); color: var(--c-azul-800); }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 14px;
        }
        .kpi-card {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 18px;
        }
        .kpi-card .label { font-size: 0.84rem; color: var(--c-gris); text-transform: uppercase; letter-spacing: 0.04em; font-weight: 700; }
        .kpi-card .value {
          font-family: var(--ff-serif);
          font-size: 2rem;
          color: var(--c-azul-800);
          margin-top: 4px;
          font-weight: 800;
        }
        .kpi-card.sage  { border-color: var(--c-salvia-400); }
        .kpi-card.gold  { border-color: var(--c-oro-600); }
        .kpi-card.coral { border-color: var(--c-coral-500); }

        .table-wrap {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          overflow: hidden;
        }
        .admin-table { width: 100%; border-collapse: collapse; font-size: 0.92rem; }
        .admin-table th, .admin-table td { text-align: left; padding: 12px 16px; border-bottom: 1px solid var(--c-borde-soft); }
        .admin-table th { background: var(--c-azul-100); color: var(--c-azul-800); font-weight: 800; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.03em; }
      `}</style>
    </>
  );
}

function permissionsDescription(role) {
  switch (role) {
    case 'admin':        return 'control total: gestión de usuarios, contenido, sistema, operación y todas las métricas';
    case 'especialista': return 'detalle de sesiones individuales, búsqueda por código, métricas agregadas e insights de Pum-AI';
    case 'analista':     return 'métricas agregadas, análisis avanzado e insights de Pum-AI (sin acceso individual)';
    case 'coordinador':  return 'gestión de contenido y programa (preguntas, recursos, eventos, árboles, etc.) + métricas agregadas';
    case 'docente':      return 'el kit pedagógico para acompañar a tus estudiantes';
    default:             return 'el panel administrativo';
  }
}

function Kpi({ label, value, suffix, accent }) {
  return (
    <div className={`kpi-card ${accent || ''}`}>
      <div className="label">{label}</div>
      <div className="value">
        {value}
        {suffix && <small style={{fontSize:'0.55em',marginLeft:4,color:'var(--c-gris)'}}>{suffix}</small>}
      </div>
    </div>
  );
}

function ConnChip({ label, ok }) {
  let cls = 'unknown', icon = '⏳';
  if (ok === true) { cls = 'ok'; icon = '✓'; }
  else if (ok === false) { cls = 'fail'; icon = '✗'; }
  return <span className={`conn-chip ${cls}`}>{icon} {label}</span>;
}

// =============================================================
// Sesiones detalladas (solo especialista/admin)
// =============================================================
function AdminSessions() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('assessment_sessions')
        .select('id, anonymous_code, total_score, general_level, dimension_scores, top_attention_areas, created_at')
        .order('created_at', { ascending: false })
        .limit(40);
      setRows(data || []);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <header className="page-head">
        <div>
          <span className="tag coral">Detalle</span>
          <h1 className="mt-2">Sesiones individuales</h1>
          <p className="lede">
            Cada sesión es anónima. No mostramos información que pueda identificar a la persona.
          </p>
        </div>
      </header>

      {loading ? <div className="spinner" style={{margin: '40px auto'}} /> : (
        <div className="sessions-grid">
          {rows.length === 0 && (
            <p className="note">Aún no hay sesiones para mostrar.</p>
          )}
          {rows.map(s => (
            <article key={s.id} className="session-card">
              <header>
                <code>{s.anonymous_code}</code>
                <span className={`lvl-bg-${s.general_level}`} style={{padding:'3px 10px',borderRadius:8,fontSize:'0.78rem',fontWeight:700}}>
                  {s.general_level}
                </span>
              </header>
              <div className="score">{s.total_score} <small>/100</small></div>
              <small className="date">{new Date(s.created_at).toLocaleString('es-MX')}</small>
              <div className="dims">
                {Object.entries(s.dimension_scores || {}).map(([id, d]) => (
                  <div key={id} className="dim-row">
                    <span>{d.label}</span>
                    <span className={`lvl-${d.level}`}>{d.score}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}

      <style>{`
        .sessions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 14px;
        }
        .session-card {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 18px;
        }
        .session-card header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 8px;
        }
        .session-card code { font-size: 0.86rem; color: var(--c-azul-800); font-weight: 700; }
        .session-card .score { font-family: var(--ff-serif); font-size: 1.8rem; font-weight: 800; color: var(--c-azul-800); }
        .session-card .score small { font-size: 0.6em; color: var(--c-gris); }
        .session-card .date { color: var(--c-gris); font-size: 0.78rem; display: block; margin-bottom: 10px; }
        .dims { display: grid; gap: 4px; padding-top: 10px; border-top: 1px solid var(--c-borde-soft); }
        .dim-row { display: flex; justify-content: space-between; font-size: 0.86rem; }
        .dim-row span:first-child { color: var(--c-texto-soft); }
        .dim-row span:last-child { font-weight: 700; }
      `}</style>
    </>
  );
}

// =============================================================
// Gestión de usuarios admin (solo rol admin)
// =============================================================
function AdminUsers({ ctx }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ email: '', full_name: '', role: 'analista' });
  const [msg, setMsg] = useState(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from('admin_users')
      .select('id, email, full_name, role, active, last_access, created_at')
      .order('created_at', { ascending: false });
    setUsers(data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e) {
    e.preventDefault();
    setMsg(null);
    const { error } = await supabase
      .from('admin_users')
      .upsert({
        email: form.email.trim(),
        full_name: form.full_name.trim(),
        role: form.role,
        active: true,
      }, { onConflict: 'email' });
    if (error) {
      setMsg({ type: 'error', text: error.message });
      return;
    }
    setMsg({ type: 'ok', text: 'Usuario actualizado. Recuerda que también debe existir en Authentication → Users de Supabase.' });
    setForm({ email: '', full_name: '', role: 'analista' });
    load();
  }

  async function setRole(id, role) {
    const { error } = await supabase.from('admin_users').update({ role }).eq('id', id);
    if (error) setMsg({ type: 'error', text: error.message });
    else load();
  }

  async function toggleActive(id, active) {
    const { error } = await supabase.from('admin_users').update({ active }).eq('id', id);
    if (error) setMsg({ type: 'error', text: error.message });
    else load();
  }

  return (
    <>
      <header className="page-head">
        <div>
          <span className="tag azul">Usuarios</span>
          <h1 className="mt-2">Gestión de equipo administrativo</h1>
          <p className="lede">
            Define quién accede al panel y con qué permisos. Solo el rol{' '}
            <strong>Administrador</strong> puede modificar esta sección.
          </p>
        </div>
      </header>

      <section className="panel">
        <h2>Agregar / actualizar miembro</h2>
        <p className="note">
          La cuenta debe existir primero en <strong>Authentication → Users</strong> de Supabase
          (con su correo y contraseña). Aquí asignas su rol en el programa.
        </p>
        <form onSubmit={handleAdd} className="user-form mt-2">
          <div className="field">
            <label>Correo</label>
            <input type="email" required value={form.email}
              onChange={e => setForm(f => ({...f, email: e.target.value}))}
              placeholder="usuario@unam.mx" />
          </div>
          <div className="field">
            <label>Nombre completo</label>
            <input type="text" value={form.full_name}
              onChange={e => setForm(f => ({...f, full_name: e.target.value}))} />
          </div>
          <div className="field">
            <label>Rol</label>
            <select value={form.role} onChange={e => setForm(f => ({...f, role: e.target.value}))}>
              <option value="analista">Analista</option>
              <option value="especialista">Especialista</option>
              <option value="coordinador">Coordinador</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <button className="btn btn-primary" type="submit">Guardar</button>
        </form>
        {msg && (
          <p className={`feedback ${msg.type}`}>{msg.text}</p>
        )}
      </section>

      <section className="panel mt-4">
        <h2>Equipo actual</h2>
        {loading ? <div className="spinner" style={{margin:'24px auto'}} /> : (
          <div className="table-wrap mt-2">
            <table className="admin-table">
              <thead>
                <tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Activo</th><th></th></tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr><td colSpan={5} className="note text-center">Aún no hay miembros.</td></tr>
                ) : users.map(u => (
                  <tr key={u.id}>
                    <td><strong>{u.full_name || '—'}</strong></td>
                    <td>{u.email}</td>
                    <td>
                      <select
                        value={u.role}
                        onChange={e => setRole(u.id, e.target.value)}
                        disabled={u.id === ctx.admin.id}
                      >
                        <option value="analista">Analista</option>
                        <option value="especialista">Especialista</option>
                        <option value="coordinador">Coordinador</option>
                        <option value="admin">Administrador</option>
                      </select>
                    </td>
                    <td>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={u.active}
                          onChange={e => toggleActive(u.id, e.target.checked)}
                          disabled={u.id === ctx.admin.id}
                        />
                        <span>{u.active ? 'Activo' : 'Inactivo'}</span>
                      </label>
                    </td>
                    <td><small className="note">{u.last_access ? new Date(u.last_access).toLocaleString('es-MX') : 'Sin acceso aún'}</small></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <style>{`
        .user-form {
          display: grid;
          grid-template-columns: 2fr 2fr 1.2fr auto;
          gap: 12px;
          align-items: end;
        }
        .feedback {
          padding: 10px 14px;
          border-radius: 12px;
          margin-top: 12px;
          font-size: 0.92rem;
        }
        .feedback.ok    { background: var(--c-salvia-100); color: #2F6048; }
        .feedback.error { background: var(--c-coral-100); color: #93362A; }
        .toggle { display: inline-flex; align-items: center; gap: 6px; }

        @media (max-width: 880px) {
          .user-form { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
