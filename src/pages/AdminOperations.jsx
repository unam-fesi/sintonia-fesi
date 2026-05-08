import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient.js';

export default function AdminOperations({ ctx }) {
  const [tab, setTab] = useState('audit');
  return (
    <>
      <header className="page-head">
        <div>
          <span className="tag">Operación</span>
          <h1 className="mt-2">Seguridad y bitácora</h1>
          <p className="lede">Auditoría de cambios, IPs sospechosas y bloqueos.</p>
        </div>
      </header>

      <div className="tabs">
        <button className={`tab-btn ${tab==='audit'?'active':''}`} onClick={() => setTab('audit')}>🧾 Auditoría</button>
        <button className={`tab-btn ${tab==='ips'?'active':''}`} onClick={() => setTab('ips')}>🔒 IPs sospechosas</button>
        <button className={`tab-btn ${tab==='blocked'?'active':''}`} onClick={() => setTab('blocked')}>🚫 Bloqueadas</button>
      </div>

      <div className="mt-3">
        {tab === 'audit' && <AuditPanel />}
        {tab === 'ips' && <SuspiciousIPs />}
        {tab === 'blocked' && <BlockedIPs ctx={ctx} />}
      </div>

      <style>{`
        .tabs { display: flex; gap: 8px; flex-wrap: wrap; background: #fff; padding: 6px; border-radius: var(--r-pill); border: 1px solid var(--c-borde); width: fit-content; }
        .tab-btn { padding: 8px 18px; border-radius: var(--r-pill); background: transparent; border: 0; font-weight: 700; color: var(--c-azul-800); cursor: pointer; }
        .tab-btn.active { background: var(--c-azul-800); color: #fff; }
      `}</style>
    </>
  );
}

function AuditPanel() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    let q = supabase.from('admin_audit_log').select('*').order('created_at', { ascending: false }).limit(500);
    if (filter !== 'all') q = q.eq('entity', filter);
    const { data } = await q;
    setRows(data || []);
    setLoading(false);
  }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [filter]);

  const visible = rows.filter(r =>
    !search || (r.admin_email || '').toLowerCase().includes(search.toLowerCase()) ||
    (r.entity_id || '').includes(search) ||
    JSON.stringify(r.after_data || {}).toLowerCase().includes(search.toLowerCase())
  );

  function downloadCSV() {
    const cols = ['created_at','admin_email','action','entity','entity_id'];
    const csv = cols.join(',') + '\n' + visible.map(r => cols.map(c => `"${String(r[c] ?? '').replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `audit-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  }

  return (
    <section className="panel">
      <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:12}}>
        <input className="input" placeholder="Buscar admin, ID, contenido…" value={search} onChange={e => setSearch(e.target.value)} style={{maxWidth:300}}/>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">Todas las entidades</option>
          <option value="questions">Preguntas</option>
          <option value="recommendations">Recomendaciones</option>
          <option value="resources">Recursos</option>
          <option value="admin_users">Usuarios admin</option>
          <option value="prompt">Prompt Pum-AI</option>
          <option value="alerts">Alertas</option>
        </select>
        <button className="btn btn-ghost btn-sm" onClick={downloadCSV}>⬇ Exportar CSV</button>
      </div>
      {loading ? <div className="spinner" style={{margin:'24px auto'}} /> : (
        <div className="table-wrap" style={{maxHeight: 600, overflowY: 'auto'}}>
          <table className="admin-table">
            <thead><tr><th>Cuándo</th><th>Quién</th><th>Acción</th><th>Entidad</th><th>ID</th></tr></thead>
            <tbody>
              {visible.length === 0 ? <tr><td colSpan={5} className="note text-center">Sin registros.</td></tr> :
                visible.map(r => (
                  <tr key={r.id}>
                    <td>{new Date(r.created_at).toLocaleString('es-MX')}</td>
                    <td>{r.admin_email || '—'}</td>
                    <td>{r.action}</td>
                    <td>{r.entity}</td>
                    <td><code>{r.entity_id?.slice(0,8) || '—'}</code></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function SuspiciousIPs() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('view_suspicious_ips').select('*');
    setRows(data || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function block(ipHash) {
    if (!confirm('¿Bloquear esta IP? No podrá registrar nuevas cuentas anónimas ni usar el chat.')) return;
    await supabase.from('ip_blocklist').upsert({ ip_hash: ipHash, reason: 'manual block by admin' });
    load();
  }

  async function clearLogs(ipHash) {
    if (!confirm('¿Limpiar el historial de esta IP? Resetea el contador de rate limit (útil para testing).')) return;
    await supabase.from('ip_log').delete().eq('ip_hash', ipHash);
    load();
  }

  return (
    <section className="panel">
      <p className="note">IPs (hasheadas) que crearon más de 5 códigos anónimos en las últimas 24h.</p>
      {loading ? <div className="spinner" style={{margin:'24px auto'}} /> :
       rows.length === 0 ? <p className="note text-center">Sin IPs sospechosas en este momento. 🟢</p> : (
        <div className="table-wrap mt-2">
          <table className="admin-table">
            <thead>
              <tr><th>Prefix</th><th>Hash</th><th>Eventos</th><th>Códigos distintos</th><th>Endpoints</th><th>Última actividad</th><th></th></tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.ip_hash}>
                  <td>{r.ip_prefix || '—'}</td>
                  <td><code style={{fontSize:'0.74rem'}}>{r.ip_hash.slice(0, 12)}…</code></td>
                  <td>{r.total_events}</td>
                  <td><strong>{r.distinct_codes}</strong></td>
                  <td><small>{(r.endpoints || []).join(', ')}</small></td>
                  <td>{new Date(r.last_at).toLocaleString('es-MX')}</td>
                  <td style={{whiteSpace:'nowrap'}}>
                    <button className="icon-btn" onClick={() => clearLogs(r.ip_hash)} title="Borra logs y resetea rate limit">🧹 Limpiar</button>
                    {' '}
                    <button className="icon-btn danger" onClick={() => block(r.ip_hash)}>🚫 Bloquear</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <style>{`
        .icon-btn { background:transparent; border: 1px solid var(--c-borde); padding: 6px 10px; border-radius: 8px; cursor: pointer; font-size: 0.85rem; }
        .icon-btn.danger { color: #93362A; border-color: var(--c-coral-500); }
      `}</style>
    </section>
  );
}

function BlockedIPs() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);
  const [resetMsg, setResetMsg] = useState(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('ip_blocklist').select('*').order('blocked_at', { ascending: false });
    setRows(data || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function unblock(ipHash) {
    if (!confirm('¿Desbloquear esta IP? También limpiará su historial de logs (para evitar re-bloqueo automático).')) return;
    // 1) Quitar del blocklist
    await supabase.from('ip_blocklist').delete().eq('ip_hash', ipHash);
    // 2) Limpiar SUS logs en ip_log para que el contador de rate limit se reinicie
    await supabase.from('ip_log').delete().eq('ip_hash', ipHash);
    load();
  }

  async function resetAllRecent() {
    if (!confirm('⚠️ MODO TESTING\n\n¿Borrar TODOS los logs de IP de las últimas 24h y desbloquear TODAS las IPs?\n\nEsto resetea los rate limits de toda la plataforma. Útil cuando estás probando con tu propia conexión y quieres seguir registrando códigos.')) return;
    setResetting(true); setResetMsg(null);
    try {
      const since = new Date(Date.now() - 24*3600*1000).toISOString();
      const [a, b] = await Promise.all([
        supabase.from('ip_log').delete().gte('created_at', since),
        supabase.from('ip_blocklist').delete().gte('blocked_at', since),
      ]);
      if (a.error || b.error) throw new Error(a.error?.message || b.error?.message);
      setResetMsg('✅ Logs de IP y blocklist de las últimas 24h limpiados. Ya puedes volver a registrar.');
      load();
    } catch (e) {
      setResetMsg('❌ ' + (e.message || 'Error al resetear'));
    } finally {
      setResetting(false);
    }
  }

  return (
    <section className="panel">
      <p className="note">IPs bloqueadas para nuevas operaciones públicas (registro/chat). Auto-bloqueo después de más de 5 registros en 24h.</p>
      {loading ? <div className="spinner" style={{margin:'24px auto'}} /> :
       rows.length === 0 ? <p className="note text-center">Ninguna IP bloqueada. 🟢</p> : (
        <div className="table-wrap mt-2">
          <table className="admin-table">
            <thead><tr><th>Hash</th><th>Razón</th><th>Bloqueada</th><th></th></tr></thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.ip_hash}>
                  <td><code style={{fontSize:'0.74rem'}}>{r.ip_hash.slice(0, 16)}…</code></td>
                  <td><small>{r.reason}</small></td>
                  <td>{new Date(r.blocked_at).toLocaleString('es-MX')}</td>
                  <td><button className="icon-btn" onClick={() => unblock(r.ip_hash)}>✓ Desbloquear y limpiar logs</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== Modo testing — botón bestia para devs ===== */}
      <div className="testing-box mt-4">
        <h3>🧪 Modo testing — resetear rate limits</h3>
        <p className="note">
          Cuando estás probando registros con tu propia IP y te auto-bloqueas, este botón limpia
          todos los logs y desbloqueos de las últimas 24h. <strong>No usar en producción real.</strong>
        </p>
        <button className="btn btn-ghost" onClick={resetAllRecent} disabled={resetting}>
          {resetting ? 'Reseteando…' : '🧹 Resetear rate limits de las últimas 24h'}
        </button>
        {resetMsg && <p className="note mt-2"><strong>{resetMsg}</strong></p>}
      </div>

      <style>{`
        .icon-btn { background:transparent; border: 1px solid var(--c-borde); padding: 6px 10px; border-radius: 8px; cursor: pointer; font-size: 0.85rem; }
        .testing-box {
          margin-top: 20px;
          padding: 16px 18px;
          background: var(--c-oro-100);
          border: 1px dashed var(--c-oro-600);
          border-radius: 12px;
        }
        .testing-box h3 { margin: 0 0 6px; font-size: 1rem; color: #7B5E14; }
      `}</style>
    </section>
  );
}
