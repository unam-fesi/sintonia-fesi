import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ResultCard from '../components/ResultCard.jsx';
import DimensionChart from '../components/DimensionChart.jsx';
import SafetyNotice from '../components/SafetyNotice.jsx';
import { STORAGE_KEYS } from '../utils/constants.js';
import { getRecommendationsFor } from '../data/fallbackRecommendations.js';

export default function Results() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEYS.RESULT);
      if (!raw) return navigate('/', { replace: true });
      setResult(JSON.parse(raw));
    } catch {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  if (!result) return null;

  const aiActions = result.ai?.suggested_actions || [];
  const aiResources = result.ai?.recommended_resources || [];
  const safetyNote = result.ai?.safety_note;

  const baseRecs = result.base_recommendations
    ? getRecommendationsFor(result.dimensions)
        .map(r => ({ title: r.title, description: r.description }))
    : [];

  function copyResult() {
    const lines = [
      `Sintonía UNAM — Tu orientación`,
      `Código anónimo: ${result.anonymous_code}`,
      `Nivel general: ${result.general_level_label} (${result.total_score}/100)`,
      ``,
      `Dimensiones:`,
      ...Object.entries(result.dimensions).map(([, d]) =>
        `  • ${d.label}: ${d.score} (${d.level_label})`
      ),
      ``,
      result.ai?.friendly_summary || '',
      result.ai?.safety_note || 'Esta orientación es informativa y no sustituye atención profesional.',
    ].join('\n');
    navigator.clipboard?.writeText(lines).catch(() => {});
  }

  const aiSource = result.ai?.source; // 'gemini' | 'fallback' | undefined

  return (
    <section className="section">
      <div className="container" style={{maxWidth: 1000}}>
        <ResultCard result={result} />

        {aiSource && (
          <div className={`source-badge source-${aiSource}`}>
            {aiSource === 'gemini' ? (
              <>✨ Orientación personalizada generada con IA (Gemini)</>
            ) : (
              <>📋 Orientación generada localmente desde el catálogo base</>
            )}
          </div>
        )}

        <SafetyNotice>
          {safetyNote || (
            <>
              <strong>Esta orientación es informativa.</strong> Tus respuestas sugieren áreas en las que vale
              la pena enfocar tu autocuidado, pero no constituyen un diagnóstico clínico. Si lo necesitas,
              acércate a un servicio de orientación universitario.
            </>
          )}
        </SafetyNotice>

        <div className="results-grid mt-4">
          <div className="panel">
            <span className="tag azul">Tus dimensiones</span>
            <h2 className="mt-2">Cómo se ve tu bienestar por área</h2>
            <p className="lede">
              Cada barra representa el nivel de atención que sugieren tus respuestas en esa área.
              Mayor puntaje = mayor invitación al autocuidado.
            </p>
            <DimensionChart dimensions={result.dimensions} />
          </div>

          <div className="panel">
            <span className="tag coral">Acciones sugeridas</span>
            <h2 className="mt-2">Pasos pequeños y útiles</h2>
            {aiActions.length > 0 ? (
              <ul className="rec-list">
                {aiActions.map((a, i) => <li key={i}>✦ {a}</li>)}
              </ul>
            ) : (
              <ul className="rec-list">
                {baseRecs.length === 0 && (
                  <li>Sigue cultivando tus rutinas de bienestar. Tus respuestas no muestran áreas urgentes hoy.</li>
                )}
                {baseRecs.map((r, i) => (
                  <li key={i}>
                    <strong>{r.title}.</strong> {r.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="panel mt-4">
          <span className="tag sage">Recursos sugeridos</span>
          <h2 className="mt-2">Recursos universitarios para ti</h2>
          {aiResources.length > 0 ? (
            <ul className="rec-list">
              {aiResources.map((r, i) => <li key={i}>📌 {r}</li>)}
            </ul>
          ) : (
            <p>Visita la sección de <Link to="/recursos">Recursos de apoyo</Link> para ver el catálogo completo.</p>
          )}
        </div>

        {result.top_attention_areas?.length > 0 && (
          <div className="panel mt-4">
            <span className="tag">Áreas con mayor atención sugerida</span>
            <h2 className="mt-2">Dónde poner foco</h2>
            <ul className="rec-list">
              {result.top_attention_areas.map(a => (
                <li key={a.id}>
                  <strong>{a.label}</strong> — Puntaje: {a.score}, nivel: {a.level === 'prioritario' ? 'prioritario' : 'moderado'}.
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="results-actions mt-4">
          <button className="btn btn-gold" onClick={copyResult}>📋 Copiar resultado</button>
          <Link to="/recursos" className="btn btn-secondary btn-primary">Ver recursos universitarios</Link>
          <Link to="/evaluacion" className="btn btn-ghost">Volver a evaluar</Link>
          <Link to="/" className="btn btn-ghost">Ir al inicio</Link>
        </div>
      </div>

      <style>{`
        .source-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: var(--r-pill);
          font-size: 0.88rem;
          font-weight: 600;
          margin: 16px 0;
        }
        .source-gemini {
          background: linear-gradient(135deg, var(--c-oro-100), var(--c-salvia-100));
          color: var(--c-azul-800);
          border: 1px solid var(--c-oro-600);
        }
        .source-fallback {
          background: var(--c-azul-100);
          color: var(--c-azul-800);
          border: 1px solid var(--c-borde);
        }
        .results-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 20px;
        }
        .rec-list {
          list-style: none;
          padding: 0;
          margin: 12px 0 0;
          display: grid;
          gap: 12px;
        }
        .rec-list li {
          padding: 12px 14px;
          background: var(--c-marfil);
          border: 1px solid var(--c-borde-soft);
          border-radius: 12px;
        }
        .results-actions {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        @media (max-width: 880px) {
          .results-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
