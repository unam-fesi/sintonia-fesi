import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient.js';

const ACTION_LABELS = {
  create: '🆕 Creó',
  update: '✏️ Actualizó',
  delete: '🗑 Eliminó',
  toggle: '🔁 Cambió estado',
};

const ENTITY_LABELS = {
  questions: 'pregunta',
  recommendations: 'recomendación',
  resources: 'recurso',
  admin_users: 'usuario admin',
  prompt: 'prompt Pum-AI',
  alerts: 'alerta',
};

export default function AdminAudit() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  async function load() {
    setLoading(true);
    let q = supabase
      .from('admin_audit_log')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);
    if (filter !== 'all') q = q.eq('entity', filter);
    const { data } = await q;
    setRows(data || []);
    setLoading(false);
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [filter]);

  return (
    <>
      <header className="page-head">
        <div>
          <span className="tag azul">Auditoría</span>
          <h1 className="mt-2">Bitácora de cambios</h1>
          <p className="lede">Registro de todas las acciones administrativas (últimas 200).</p>
        </div>
      </header>

      <div className="filters">
        {['all','questions','recommendations','resources','admin_users','prompt'].map(f => (
          <button key={f} className={`chip ${filter===f?'active':''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? 'Todo' : ENTITY_LABELS[f] || f}
          </button>
        ))}
      </div>

      <section className="panel mt-3">
        {loading ? <div className="spinner" style={{margin:'24px auto'}} /> : (
          <div className="audit-list">
            {rows.length === 0 && <p className="note text-center">Sin registros aún.</p>}
            {rows.map(row => (
              <div key={row.id} className="audit-item">
                <div className="audit-when">
                  {new Date(row.created_at).toLocaleString('es-MX')}
                </div>
                <div className="audit-line">
                  <strong>{row.admin_email || 'Sistema'}</strong>{' '}
                  {ACTION_LABELS[row.action] || row.action}{' '}
                  {ENTITY_LABELS[row.entity] || row.entity}
                  {row.entity_id && <code> #{row.entity_id.slice(0,8)}</code>}
                </div>
                {row.after_data?.title && <small>"{row.after_data.title}"</small>}
                {row.after_data?.question_text && <small>"{row.after_data.question_text}"</small>}
                {row.after_data?.name && <small>"{row.after_data.name}"</small>}
              </div>
            ))}
          </div>
        )}
      </section>

      <style>{`
        .filters { display: flex; gap: 8px; flex-wrap: wrap; }
        .chip {
          background: #fff;
          border: 1.5px solid var(--c-borde);
          border-radius: var(--r-pill);
          padding: 6px 14px;
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--c-azul-800);
          cursor: pointer;
        }
        .chip.active { background: var(--c-azul-800); color: #fff; border-color: var(--c-azul-800); }

        .audit-list { display: grid; gap: 6px; }
        .audit-item {
          padding: 10px 14px;
          background: var(--c-marfil);
          border: 1px solid var(--c-borde-soft);
          border-radius: 10px;
        }
        .audit-when { font-size: 0.78rem; color: var(--c-gris); margin-bottom: 4px; }
        .audit-line { font-size: 0.94rem; color: var(--c-texto); }
        .audit-line code { background: var(--c-azul-100); padding: 2px 6px; border-radius: 6px; font-size: 0.84em; }
        .audit-item small { display:block; color: var(--c-gris); font-size: 0.84rem; margin-top: 4px; }
      `}</style>
    </>
  );
}
