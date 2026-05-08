import './ResultCard.css';

export default function ResultCard({ result }) {
  if (!result) return null;
  const { total_score, general_level_label, anonymous_code, ai } = result;

  return (
    <section className="result-card">
      <div className="result-hero">
        <div className="result-score">
          <span className="result-score-num">{total_score}</span>
          <span className="result-score-label">/ 100</span>
        </div>
        <div className="result-meta">
          <span className="tag">Tu orientación</span>
          <h1 className="mt-2">{general_level_label}</h1>
          <p className="result-summary">
            {ai?.friendly_summary
              || 'Tus respuestas sugieren áreas en las que vale la pena enfocar tu autocuidado durante las próximas semanas. Recuerda que esto es una orientación, no un diagnóstico.'}
          </p>
          {anonymous_code && (
            <p className="anon-code">
              Tu código anónimo: <strong>{anonymous_code}</strong>
              <small>Puedes copiarlo si quieres consultar tu resultado nuevamente más tarde.</small>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
