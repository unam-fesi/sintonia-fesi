// =============================================================
// Sintonía UNAM — Admin: Usuarios anónimos
// Vista agregada de actividad por anonymous_code (registrados).
// Click en un código abre detalle completo.
// =============================================================

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../config/supabaseClient.js';
import { BarChart } from '../components/Charts.jsx';

export default function AdminAnonymous() {
  const [users, setUsers] = useState([]);
  const [kpis, setKpis] = useState(null);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // all | active | inactive | with_password
  const [sortBy, setSortBy] = useState({ key: 'engagement_score', dir: 'desc' });
  const [selected, setSelected] = useState(null);

  async function load() {
    setLoading(true);
    const [u, k, f] = await Promise.all([
      supabase.from('view_student_activity').select('*'),
      supabase.from('view_anonymous_kpis').select('*').single(),
      supabase.from('view_faculty_distribution').select('*'),
    ]);
    setUsers(u.data || []);
    setKpis(k.data || {});
    setFaculty(f.data || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  const visible = useMemo(() => {
    let out = users;
    if (search) {
      const s = search.toLowerCase();
      out = out.filter(u =>
        u.anonymous_code.toLowerCase().includes(s) ||
        (u.faculty || '').toLowerCase().includes(s) ||
        (u.career || '').toLowerCase().includes(s)
      );
    }
    const sevenAgo = Date.now() - 7 * 24 * 3600 * 1000;
    if (filter === 'active') out = out.filter(u => u.last_activity_at && new Date(u.last_activity_at).getTime() > sevenAgo);
    if (filter === 'inactive') out = out.filter(u => !u.last_activity_at || new Date(u.last_activity_at).getTime() <= sevenAgo);

    out = [...out].sort((a, b) => {
      const A = a[sortBy.key]; const B = b[sortBy.key];
      if (A === B) return 0;
      if (A == null) return 1;
      if (B == null) return -1;
      const cmp = typeof A === 'number' ? A - B : String(A).localeCompare(String(B));
      return sortBy.dir === 'asc' ? cmp : -cmp;
    });
    return out;
  }, [users, search, filter, sortBy]);

  function setSort(key) {
    setSortBy(s => s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'desc' });
  }

  function exportCSV() {
    const cols = ['anonymous_code','faculty','career','registered_at','last_activity_at','sessions_count','checkins_count','journal_count','achievements_count','routes_completed','trees_adopted','events_rsvped','chat_messages_count','engagement_score'];
    const csv = cols.join(',') + '\n' + visible.map(r => cols.map(c => `"${String(r[c] ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `usuarios-anonimos-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  }

  if (loading) return <div className="spinner" style={{margin:'80px auto'}} />;

  return (
    <>
      <header className="page-head">
        <div>
          <span className="tag azul">Comunidad anónima</span>
          <h1 className="mt-2">Usuarios anónimos registrados</h1>
          <p className="lede">
            Quiénes están usando Sintonía UNAM. Sin nombres ni identificadores personales —
            solo códigos anónimos y métricas de actividad.
          </p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={exportCSV}>⬇ Exportar CSV</button>
      </header>

      {/* KPIs */}
      <div className="kpi-grid">
        <Kpi label="Registrados" value={kpis?.total_registered ?? 0} />
        <Kpi label="Activos 7d"  value={kpis?.active_7d ?? 0}        accent="sage" />
        <Kpi label="Activos 30d" value={kpis?.active_30d ?? 0}       accent="gold" />
        <Kpi label="Con password" value={kpis?.with_password ?? 0}   accent="azul" />
        <Kpi label="Check-ins totales" value={kpis?.total_checkins ?? 0} />
        <Kpi label="Entradas diario" value={kpis?.total_journal_entries ?? 0} />
        <Kpi label="Árboles adoptados" value={kpis?.total_tree_adoptions ?? 0} accent="sage" />
      </div>

      {/* Distribución por facultad */}
      {faculty.length > 0 && (
        <section className="panel mt-3">
          <h2>Distribución por facultad</h2>
          <BarChart
            data={faculty.slice(0, 10).map(f => ({ label: f.faculty.slice(0, 22), value: f.total }))}
            x="label" y="value" color="#1A3358"
          />
        </section>
      )}

      {/* Filtros */}
      <section className="panel mt-3">
        <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center',marginBottom:12}}>
          <input className="input" placeholder="🔍 Buscar código, facultad…" value={search} onChange={e => setSearch(e.target.value)} style={{maxWidth: 320}} />
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">Todos</option>
            <option value="active">Activos (7d)</option>
            <option value="inactive">Inactivos</option>
          </select>
          <small className="note" style={{marginLeft:'auto'}}>Mostrando {visible.length} de {users.length}</small>
        </div>

        <div className="table-wrap" style={{maxHeight: 600, overflowY: 'auto'}}>
          <table className="admin-table">
            <thead>
              <tr>
                <th><Sh k="anonymous_code" sortBy={sortBy} onSort={setSort}>Código</Sh></th>
                <th><Sh k="faculty" sortBy={sortBy} onSort={setSort}>Facultad</Sh></th>
                <th><Sh k="sessions_count" sortBy={sortBy} onSort={setSort}>Tests</Sh></th>
                <th><Sh k="checkins_count" sortBy={sortBy} onSort={setSort}>Check-ins</Sh></th>
                <th><Sh k="journal_count" sortBy={sortBy} onSort={setSort}>Diario</Sh></th>
                <th><Sh k="routes_completed" sortBy={sortBy} onSort={setSort}>Rutas ✓</Sh></th>
                <th><Sh k="trees_adopted" sortBy={sortBy} onSort={setSort}>🌳</Sh></th>
                <th><Sh k="chat_messages_count" sortBy={sortBy} onSort={setSort}>💬</Sh></th>
                <th><Sh k="engagement_score" sortBy={sortBy} onSort={setSort}>Engagement</Sh></th>
                <th><Sh k="last_activity_at" sortBy={sortBy} onSort={setSort}>Última actividad</Sh></th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 && <tr><td colSpan={10} className="note text-center">Sin usuarios.</td></tr>}
              {visible.map(u => (
                <tr key={u.anonymous_code} style={{cursor:'pointer'}} onClick={() => setSelected(u)}>
                  <td><code>{u.anonymous_code}</code></td>
                  <td><small>{u.faculty || '—'}</small></td>
                  <td>{u.sessions_count}</td>
                  <td>{u.checkins_count}</td>
                  <td>{u.journal_count}</td>
                  <td>{u.routes_completed}</td>
                  <td>{u.trees_adopted}</td>
                  <td>
                    {u.chat_messages_count}
                    {u.chat_flagged_count > 0 && <span title="Sesión flaggeada" style={{color:'#93362A',marginLeft:4}}>⚠</span>}
                  </td>
                  <td><strong>{u.engagement_score}</strong></td>
                  <td><small>{u.last_activity_at ? new Date(u.last_activity_at).toLocaleString('es-MX', {month:'short',day:'2-digit',hour:'2-digit',minute:'2-digit'}) : 'sin actividad'}</small></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {selected && <DetailModal user={selected} onClose={() => setSelected(null)} />}

      <style>{`
        .input { padding: 8px 14px; border: 1.5px solid var(--c-borde); border-radius: 999px; font-size: 0.92rem; }
      `}</style>
    </>
  );
}

function Sh({ k, sortBy, onSort, children }) {
  const active = sortBy.key === k;
  const arrow = active ? (sortBy.dir === 'asc' ? '▲' : '▼') : '↕';
  return (
    <button type="button" onClick={() => onSort(k)}
      style={{background:'transparent',border:0,cursor:'pointer',font:'inherit',color:'inherit',padding:0,display:'inline-flex',gap:4,opacity: active ? 1 : 0.7}}>
      {children} <span style={{fontSize:'0.7em'}}>{arrow}</span>
    </button>
  );
}

function Kpi({ label, value, accent }) {
  return (
    <div className={`kpi-card ${accent || ''}`}>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  );
}

// ===========================================================
// Detalle del usuario (modal)
// ===========================================================
function DetailModal({ user, onClose }) {
  const [data, setData] = useState({ loading: true });

  useEffect(() => {
    (async () => {
      const code = user.anonymous_code;
      const [sessions, checkins, journal, achievements, routes, chats, notes] = await Promise.all([
        supabase.from('assessment_sessions').select('id, total_score, general_level, dimension_scores, top_attention_areas, created_at').eq('anonymous_code', code).order('created_at', { ascending: false }),
        supabase.from('weekly_checkins').select('mood, energy, stress, social, free_text, week_iso, created_at').eq('anonymous_code', code).order('created_at', { ascending: false }),
        supabase.from('student_journal').select('entry, emotion_tag, created_at').eq('anonymous_code', code).order('created_at', { ascending: false }).limit(20),
        supabase.from('student_achievements').select('achievement_key, awarded_at').eq('anonymous_code', code),
        supabase.from('wellness_routes').select('id, duration_days, started_at, completed_at, plan').eq('anonymous_code', code),
        supabase.from('chat_sessions').select('id, message_count, flagged, flag_reason, created_at, last_at').eq('anonymous_code', code),
        supabase.from('session_notes').select('admin_name, note, created_at').in('session_id',
          (await supabase.from('assessment_sessions').select('id').eq('anonymous_code', code)).data?.map(s => s.id) || []
        ),
      ]);

      setData({
        loading: false,
        sessions: sessions.data || [],
        checkins: checkins.data || [],
        journal:  journal.data  || [],
        achievements: achievements.data || [],
        routes:   routes.data   || [],
        chats:    chats.data    || [],
        notes:    notes.data    || [],
      });
    })();
  }, [user.anonymous_code]);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <header>
          <div>
            <h2>👤 <code>{user.anonymous_code}</code></h2>
            <small>{user.faculty || 'Sin facultad'} · Registrado: {user.registered_at ? new Date(user.registered_at).toLocaleDateString('es-MX') : '—'}</small>
          </div>
          <button onClick={onClose}>✕</button>
        </header>

        {data.loading ? <div className="spinner" style={{margin:'40px auto'}} /> : (
          <>
            <div className="quick-kpis">
              <span><strong>{data.sessions.length}</strong> tests</span>
              <span><strong>{data.checkins.length}</strong> check-ins</span>
              <span><strong>{data.journal.length}</strong> diario</span>
              <span><strong>{data.achievements.length}</strong> logros</span>
              <span><strong>{data.routes.filter(r => r.completed_at).length}/{data.routes.length}</strong> rutas</span>
              <span><strong>{data.chats.length}</strong> chats</span>
            </div>

            <h3>📊 Tests realizados</h3>
            {data.sessions.length === 0 ? <p className="note">Sin tests.</p> : (
              <ul className="detail-list">
                {data.sessions.map(s => (
                  <li key={s.id}>
                    <strong>{s.total_score}/100</strong>{' '}
                    <span className={`lvl-bg-${s.general_level}`} style={{padding:'2px 8px',borderRadius:6,fontSize:'0.78rem'}}>{s.general_level}</span>
                    <small>{new Date(s.created_at).toLocaleString('es-MX')}</small>
                    {s.top_attention_areas?.length > 0 && (
                      <small> · Áreas: {s.top_attention_areas.slice(0,2).map(a => a.label).join(', ')}</small>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <h3>📝 Check-ins</h3>
            {data.checkins.length === 0 ? <p className="note">Sin check-ins.</p> : (
              <ul className="detail-list">
                {data.checkins.slice(0, 8).map((c, i) => (
                  <li key={i}>
                    Ánimo {c.mood}/5 · Energía {c.energy}/5 · Estrés {c.stress}/5 · Social {c.social}/5
                    <small>{c.week_iso} · {new Date(c.created_at).toLocaleDateString('es-MX')}</small>
                    {c.free_text && <em style={{display:'block',marginTop:4}}>"{c.free_text}"</em>}
                  </li>
                ))}
              </ul>
            )}

            <h3>📔 Últimas entradas de diario</h3>
            {data.journal.length === 0 ? <p className="note">Sin entradas.</p> : (
              <ul className="detail-list">
                {data.journal.slice(0, 8).map((j, i) => (
                  <li key={i}>
                    <em>"{j.entry}"</em>
                    <small>{j.emotion_tag || '—'} · {new Date(j.created_at).toLocaleDateString('es-MX')}</small>
                  </li>
                ))}
              </ul>
            )}

            <h3>🏆 Logros</h3>
            {data.achievements.length === 0 ? <p className="note">Sin logros.</p> : (
              <div className="achievements-list">
                {data.achievements.map((a, i) => (
                  <span key={i} className="achievement">🏆 {a.achievement_key}</span>
                ))}
              </div>
            )}

            <h3>💬 Chat con Pum-AI</h3>
            {data.chats.length === 0 ? <p className="note">Sin sesiones de chat.</p> : (
              <ul className="detail-list">
                {data.chats.map(c => (
                  <li key={c.id}>
                    <strong>{c.message_count}</strong> mensajes
                    {c.flagged && <span style={{color:'#93362A',marginLeft:6}}>⚠ {c.flag_reason}</span>}
                    <small>{new Date(c.created_at).toLocaleString('es-MX')} → {new Date(c.last_at).toLocaleString('es-MX')}</small>
                  </li>
                ))}
              </ul>
            )}

            {data.notes.length > 0 && (
              <>
                <h3>🗒 Notas del equipo</h3>
                <ul className="detail-list">
                  {data.notes.map((n, i) => (
                    <li key={i}>
                      <strong>{n.admin_name || 'Anónimo'}</strong>
                      <small>{new Date(n.created_at).toLocaleString('es-MX')}</small>
                      <p style={{margin:'4px 0 0'}}>{n.note}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>

      <style>{`
        .overlay { position: fixed; inset: 0; background: rgba(10,25,41,0.55); z-index: 100; display: grid; place-items: center; padding: 16px; }
        .modal { background: #fff; border-radius: var(--r-xl); padding: 24px; max-width: 760px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 30px 80px rgba(0,0,0,0.4); }
        .modal header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
        .modal header h2 { margin: 0; font-size: 1.4rem; }
        .modal header small { color: var(--c-gris); font-size: 0.84rem; }
        .modal header button { background: transparent; border: 0; cursor: pointer; font-size: 1.4rem; color: var(--c-gris); }
        .modal h3 { color: var(--c-azul-800); margin: 18px 0 8px; font-size: 1.05rem; }

        .quick-kpis { display: flex; gap: 14px; flex-wrap: wrap; padding: 12px 16px; background: var(--c-azul-100); border-radius: 12px; margin-bottom: 6px; }
        .quick-kpis span { font-size: 0.92rem; }
        .quick-kpis strong { color: var(--c-azul-800); font-family: var(--ff-serif); font-size: 1.1rem; }

        .detail-list { list-style: none; padding: 0; display: grid; gap: 6px; }
        .detail-list li {
          background: var(--c-marfil); border: 1px solid var(--c-borde-soft);
          padding: 8px 12px; border-radius: 8px;
          font-size: 0.92rem;
        }
        .detail-list small { color: var(--c-gris); font-size: 0.78rem; display:block; margin-top: 2px; }
        .achievements-list { display: flex; gap: 6px; flex-wrap: wrap; }
        .achievement { background: var(--c-oro-100); color: #7B5E14; padding: 4px 10px; border-radius: 999px; font-size: 0.84rem; font-weight: 700; }
      `}</style>
    </div>
  );
}
