import { LEVEL_LABELS } from '../utils/constants.js';
import './DimensionChart.css';

export default function DimensionChart({ dimensions }) {
  const entries = Object.entries(dimensions);
  return (
    <div className="dim-chart" role="list">
      {entries.map(([id, dim]) => (
        <div key={id} className="dim-row" role="listitem">
          <div className="dim-label">{dim.label}</div>
          <div className="dim-track" aria-label={`Puntaje ${dim.score} de 100`}>
            <span className={`dim-fill lvl-bg-${dim.level}`} style={{ width: `${dim.score}%` }} />
          </div>
          <div className={`dim-value lvl-${dim.level}`}>
            {dim.score}
            <small>{LEVEL_LABELS[dim.level]}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
