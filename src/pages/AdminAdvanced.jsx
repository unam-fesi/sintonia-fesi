import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient.js';
import { BarChart, LineChart } from '../components/Charts.jsx';

const DIM_LABELS = {
  estado_emocional: 'Estado emocional',
  estres_academico: 'Estrés académico',
  sueno_descanso: 'Sueño y descanso',
  apoyo_social: 'Apoyo social',
  motivacion_pertenencia: 'Motivación',
};

export default function AdminAdvanced() {
  const [cohorts, setCohorts] = useState([]);
  const [heatmap, setHeatmap] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [c, h, f] = await Promise.all([
        supabase.from('view_cohorts_monthly').select('*').limit(12),
        supabase.from('view_dimension_heatmap').select('*').limit(80),
        supabase.from('view_feedback_summary').select('*').limit(30),
      ]);
      setCohorts(c.data || []);
      setHeatmap(h.data || []);
      setFeedback(f.data || []);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="spinner" style={{margin:'80px auto'}} />;

  // Procesar heatmap dimension × week
  const weeks = [...new Set(heatmap.map(h => h.week))].sort().slice(-12);
  const dims = [...new Set(heatmap.map(h => h.dimension_id))];
  const heatmapMatrix = dims.map(d => ({
    dimension: d,
    cells: weeks.map(w => {
      const cell = heatmap.find(h => h.week === w && h.dimension_id === d);
      return { week: w, score: cell?.avg_score ?? null, samples: cell?.samples ?? 0 };
    }),
  }));

  return (
    <>
      <header className="page-head">
        <div>
          <span className="tag azul">Análisis avanzado</span>
          <h1 className="mt-2">Cohortes, tendencias y benchmarks</h1>
          <p className="lede">Comparativas mensuales, heatmap dimensión × tiempo, y feedback agregado.</p>
        </div>
      </header>

      {/* COHORTES */}
      <section className="panel">
        <h2>Cohortes mensuales</h2>
        <p className="note">Cómo se compara cada mes con los anteriores en participación y nivel general.</p>
        <BarChart
          data={cohorts.slice(0, 6).reverse().map(c => ({ label: c.cohort, value: c.total }))}
          x="label" y="value" color="#1A3358"
        />
        <div className="table-wrap mt-2">
          <table className="admin-table">
            <thead><tr><th>Mes</th><th>Total</th><th>Promedio</th><th>Bajo</th><th>Moderado</th><th>Prioritario</th></tr></thead>
            <tbody>
              {cohorts.map(c => (
                <tr key={c.cohort}>
                  <td><strong>{c.cohort}</strong></td>
                  <td>{c.total}</td>
                  <td>{c.avg_score}</td>
                  <td><span className="lvl-bg-bajo" style={{padding:'2px 8px',borderRadius:6}}>{c.bajo}</span></td>
                  <td><span className="lvl-bg-moderado" style={{padding:'2px 8px',borderRadius:6}}>{c.moderado}</span></td>
                  <td><span className="lvl-bg-prioritario" style={{padding:'2px 8px',borderRadius:6}}>{c.prioritario}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* HEATMAP */}
      <section className="panel mt-3">
        <h2>Heatmap: dimensiones × semanas</h2>
        <p className="note">Color = puntaje promedio (más oscuro = mayor atención requerida).</p>
        <div className="hm-wrap" style={{overflowX:'auto'}}>
          <table className="hm-table">
            <thead>
              <tr>
                <th>Dimensión</th>
                {weeks.map(w => <th key={w} className="hm-col">{new Date(w).toLocaleDateString('es-MX', {day:'2-digit',month:'short'})}</th>)}
              </tr>
            </thead>
            <tbody>
              {heatmapMatrix.map(row => (
                <tr key={row.dimension}>
                  <td className="hm-row-label">{DIM_LABELS[row.dimension] || row.dimension}</td>
                  {row.cells.map((c, i) => (
                    <td
                      key={i}
                      className="hm-cell"
                      style={{
                        background: c.score === null ? '#F4F7FB' : heatmapColor(c.score),
                        color: c.score && c.score > 50 ? '#fff' : 'var(--c-azul-800)',
                      }}
                      title={`${c.score ?? '—'} (n=${c.samples})`}
                    >
                      {c.score ?? '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <style>{`
          .hm-table { border-collapse: collapse; font-size: 0.86rem; }
          .hm-table th, .hm-table td { padding: 8px 10px; border: 1px solid var(--c-borde-soft); text-align: center; min-width: 56px; }
          .hm-row-label { text-align: left !important; font-weight: 700; color: var(--c-azul-800); white-space: nowrap; min-width: 160px; }
          .hm-col { font-size: 0.74rem; color: var(--c-gris); white-space: nowrap; }
          .hm-cell { font-weight: 700; }
        `}</style>
      </section>

      {/* FEEDBACK TIMELINE */}
      {feedback.length > 0 && (
        <section className="panel mt-3">
          <h2>Tendencia de feedback</h2>
          <p className="note">Calificaciones diarias (1-5).</p>
          <LineChart
            data={feedback.slice(0, 14).reverse().map(f => ({ day: f.day, total: f.avg_rating, raw: f }))}
            x="day" y="total"
            label="Promedio diario de feedback"
          />
        </section>
      )}
    </>
  );
}

function heatmapColor(v) {
  // 0 verde → 100 coral
  const t = Math.max(0, Math.min(1, v / 100));
  const r = Math.round(143 + (210 - 143) * t);
  const g = Math.round(184 + (107 - 184) * t);
  const b = Math.round(160 + (83 - 160) * t);
  return `rgb(${r},${g},${b})`;
}
