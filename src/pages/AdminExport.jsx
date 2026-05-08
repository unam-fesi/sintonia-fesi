import { useState } from 'react';
import { supabase } from '../config/supabaseClient.js';

const DATASETS = [
  { id: 'sessions',        label: 'Sesiones', table: 'assessment_sessions',
    columns: 'id, anonymous_code, total_score, general_level, dimension_scores, top_attention_areas, created_at' },
  { id: 'answers',         label: 'Respuestas individuales', table: 'assessment_answers',
    columns: 'id, session_id, question_id, answer_value, normalized_value, created_at',
    requiresRole: ['admin','especialista'] },
  { id: 'questions',       label: 'Preguntas', table: 'questions',
    columns: 'id, sort_order, dimension, question_text, is_reverse_scored, active' },
  { id: 'recommendations', label: 'Recomendaciones', table: 'recommendations',
    columns: 'id, dimension, level, title, description, active' },
  { id: 'resources',       label: 'Recursos', table: 'resources',
    columns: 'id, name, type, description, audience, modality, location, schedule, contact, active' },
  { id: 'feedback',        label: 'Feedback de usuarios', table: 'assessment_feedback',
    columns: 'id, session_id, rating, comment, created_at' },
  { id: 'audit',           label: 'Auditoría', table: 'admin_audit_log',
    columns: 'id, admin_email, action, entity, entity_id, created_at',
    requiresRole: ['admin'] },
];

export default function AdminExport({ ctx }) {
  const [working, setWorking] = useState(null);
  const [msg, setMsg] = useState(null);

  async function exportData(ds, format) {
    setWorking(`${ds.id}-${format}`);
    setMsg(null);
    try {
      const { data, error } = await supabase.from(ds.table).select(ds.columns);
      if (error) throw error;

      let content, mime, ext;
      if (format === 'json') {
        content = JSON.stringify(data || [], null, 2);
        mime = 'application/json';
        ext = 'json';
      } else {
        content = toCSV(data || []);
        mime = 'text/csv;charset=utf-8';
        ext = 'csv';
      }

      const blob = new Blob([content], { type: mime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const date = new Date().toISOString().slice(0, 10);
      a.download = `sintonia-${ds.id}-${date}.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
      setMsg({ type: 'ok', text: `Descargado: ${data?.length || 0} registros.` });
    } catch (e) {
      setMsg({ type: 'error', text: e.message });
    } finally {
      setWorking(null);
    }
  }

  return (
    <>
      <header className="page-head">
        <div>
          <span className="tag">Exportación</span>
          <h1 className="mt-2">Descarga de datos</h1>
          <p className="lede">
            Exporta cualquier dataset para análisis externo. Las descargas son anónimas.
            Para datos detallados se requiere rol de Especialista o Administrador.
          </p>
        </div>
      </header>

      {msg && <p className={`feedback ${msg.type} mt-2`}>{msg.text}</p>}

      <div className="datasets-grid">
        {DATASETS.map(ds => {
          const allowed = !ds.requiresRole || ds.requiresRole.includes(ctx.admin.role);
          return (
            <div key={ds.id} className={`ds-card ${!allowed ? 'locked' : ''}`}>
              <h3>{ds.label}</h3>
              <small className="note">tabla <code>{ds.table}</code></small>
              {allowed ? (
                <div className="ds-actions">
                  <button
                    className="btn btn-primary btn-sm"
                    disabled={working !== null}
                    onClick={() => exportData(ds, 'csv')}
                  >
                    {working === `${ds.id}-csv` ? 'Exportando…' : '⬇ CSV'}
                  </button>
                  <button
                    className="btn btn-ghost btn-sm"
                    disabled={working !== null}
                    onClick={() => exportData(ds, 'json')}
                  >
                    {working === `${ds.id}-json` ? 'Exportando…' : '⬇ JSON'}
                  </button>
                </div>
              ) : (
                <p className="note">🔒 Tu rol no tiene permiso para este dataset.</p>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        .datasets-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 14px;
          margin-top: 16px;
        }
        .ds-card {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 18px;
        }
        .ds-card.locked { opacity: 0.5; }
        .ds-card h3 { margin: 0 0 4px; color: var(--c-azul-800); }
        .ds-card code { background: var(--c-azul-100); padding: 2px 6px; border-radius: 6px; font-size: 0.84em; }
        .ds-actions { display: flex; gap: 8px; margin-top: 12px; }
        .feedback { padding: 10px 14px; border-radius: 12px; font-size: 0.92rem; display: inline-block; }
        .feedback.ok    { background: var(--c-salvia-100); color: #2F8770; }
        .feedback.error { background: var(--c-coral-100); color: #93362A; }
      `}</style>
    </>
  );
}

function toCSV(rows) {
  if (!rows || rows.length === 0) return '';
  const cols = Object.keys(rows[0]);
  const head = cols.join(',');
  const body = rows.map(r => cols.map(c => {
    const v = r[c];
    if (v === null || v === undefined) return '';
    if (typeof v === 'object') return `"${JSON.stringify(v).replace(/"/g, '""')}"`;
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  }).join(',')).join('\n');
  return `${head}\n${body}`;
}
