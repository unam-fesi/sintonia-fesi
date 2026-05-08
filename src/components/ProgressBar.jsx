import './ProgressBar.css';

export default function ProgressBar({ current, total }) {
  const pct = total ? Math.round((current / total) * 100) : 0;
  return (
    <div className="progress-wrap" aria-label={`Progreso ${pct}%`}>
      <div className="progress-meta">
        <span>Pregunta <strong>{current}</strong> de <strong>{total}</strong></span>
        <span>{pct}%</span>
      </div>
      <div className="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={pct}>
        <span style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
