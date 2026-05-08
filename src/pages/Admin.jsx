import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../config/supabaseClient.js';
import { checkSupabaseHealth } from '../services/supabaseService.js';
import { checkOrientationHealth } from '../services/geminiService.js';

const initialMetrics = {
  totalSessions: null,
  averageScore: null,
  topDimensions: [],
  topResources: [],
  recent: [],
  loading: true,
};

export default function Admin() {
  const [conn, setConn] = useState({ supabase: null, gemini: null });
  const [metrics, setMetrics] = useState(initialMetrics);

  useEffect(() => {
    (async () => {
      const [s, g] = await Promise.all([checkSupabaseHealth(), checkOrientationHealth()]);
      setConn({ supabase: s, gemini: g });
    })();
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setMetrics(m => ({ ...m, loading: false }));
      return;
    }
    (async () => {
      try {
        const { count: total } = await supabase
          .from('assessment_sessions')
          .select('*', { count: 'exact', head: true });

        const { data: lastSessions } = await supabase
          .from('assessment_sessions')
          .select('id, anonymous_code, total_score, general_level, top_attention_areas, created_at')
          .order('created_at', { ascending: false })
          .limit(8);

        const avg = lastSessions?.length
          ? Math.round(lastSessions.reduce((s, r) => s + (r.total_score || 0), 0) / lastSessions.length)
          : null;

        // Conteo de áreas con atención (de los registros recientes)
        const dimCount = {};
        for (const s of lastSessions || []) {
          for (const a of s.top_attention_areas || []) {
            dimCount[a.label] = (dimCount[a.label] || 0) + 1;
          }
        }
        const topDimensions = Object.entries(dimCount)
          .sort((a, b) => b[1] - a[1])
          .map(([label, count]) => ({ label, count }));

        setMetrics({
          totalSessions: total ?? 0,
          averageScore: avg,
          topDimensions,
          topResources: [], // se completa en Fase 2 con tabla de selecciones
          recent: lastSessions || [],
          loading: false,
        });
      } catch {
        setMetrics(m => ({ ...m, loading: false }));
      }
    })();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12}}>
          <div>
            <span className="tag">Panel administrativo · prototipo</span>
            <h1 className="mt-2">Métricas agregadas</h1>
            <p className="lede">
              Esta vista no muestra datos personales. En Fase 2 se integrará con autenticación
              de Supabase.
            </p>
          </div>
          <div className="health">
            <ConnChip label="Supabase" ok={conn.supabase?.ok} reason={conn.supabase?.reason} />
            <ConnChip label="Gemini" ok={conn.gemini?.ok} reason={conn.gemini?.reason} />
          </div>
        </header>

        <div className="kpi-grid mt-4">
          <KpiCard label="Sesiones totales" value={metrics.totalSessions ?? '—'} />
          <KpiCard label="Promedio reciente (0-100)" value={metrics.averageScore ?? '—'} />
          <KpiCard label="Áreas de atención frecuentes" value={metrics.topDimensions.length} />
          <KpiCard label="Estado del programa" value={metrics.loading ? '⏳' : '✅'} />
        </div>

        <div className="panel mt-4">
          <h2>Áreas de mayor atención reciente</h2>
          {metrics.topDimensions.length === 0 ? (
            <p className="note">No hay datos suficientes todavía.</p>
          ) : (
            <ul className="rec-list">
              {metrics.topDimensions.map(d => (
                <li key={d.label}><strong>{d.label}</strong> · {d.count} menciones</li>
              ))}
            </ul>
          )}
        </div>

        <div className="panel mt-4">
          <h2>Últimas sesiones (anónimas)</h2>
          <div className="table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>Fecha</th><th>Código</th><th>Puntaje</th><th>Nivel</th></tr>
              </thead>
              <tbody>
                {metrics.recent.length === 0 ? (
                  <tr><td colSpan={4} className="note text-center">Sin registros aún.</td></tr>
                ) : metrics.recent.map(r => (
                  <tr key={r.id}>
                    <td>{new Date(r.created_at).toLocaleString('es-MX')}</td>
                    <td><code>{r.anonymous_code}</code></td>
                    <td>{r.total_score ?? '—'}</td>
                    <td>{r.general_level ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .health { display: flex; gap: 8px; flex-wrap: wrap; }
        .conn-chip {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 12px;
          border-radius: var(--r-pill);
          font-size: 0.84rem;
          font-weight: 700;
        }
        .conn-chip.ok    { background: var(--c-salvia-100); color: #2F6048; }
        .conn-chip.fail  { background: var(--c-coral-100); color: #93362A; }
        .conn-chip.unknown { background: var(--c-azul-100); color: var(--c-azul-800); }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        .kpi-card {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 18px;
        }
        .kpi-card .label { font-size: 0.84rem; color: var(--c-gris); text-transform: uppercase; letter-spacing: 0.04em; font-weight: 700; }
        .kpi-card .value { font-family: var(--ff-serif); font-size: 1.8rem; color: var(--c-azul-800); margin-top: 4px; font-weight: 800; }

        .table-wrap {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          overflow: hidden;
        }
        .admin-table { width: 100%; border-collapse: collapse; font-size: 0.92rem; }
        .admin-table th, .admin-table td { text-align: left; padding: 12px 16px; border-bottom: 1px solid var(--c-borde-soft); }
        .admin-table th { background: var(--c-azul-100); color: var(--c-azul-800); font-weight: 800; font-size: 0.84rem; text-transform: uppercase; letter-spacing: 0.03em; }

        .rec-list { list-style: none; padding: 0; display: grid; gap: 8px; margin: 12px 0 0; }
        .rec-list li { padding: 10px 14px; background: var(--c-marfil); border-radius: 12px; border: 1px solid var(--c-borde-soft); }

        @media (max-width: 880px) { .kpi-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .kpi-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

function KpiCard({ label, value }) {
  return (
    <div className="kpi-card">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  );
}

function ConnChip({ label, ok, reason }) {
  let cls = 'unknown', icon = '⏳';
  if (ok === true) { cls = 'ok'; icon = '✓'; }
  else if (ok === false) { cls = 'fail'; icon = '✗'; }
  return (
    <span className={`conn-chip ${cls}`} title={reason || ''}>
      {icon} {label}
    </span>
  );
}
