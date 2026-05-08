// =============================================================
// Sintonía UNAM — DimensionBubbles
// Visualización tipo "3D" de las dimensiones del bienestar.
// Tamaño de cada esfera = total de menciones en sesiones.
// El color responde al puntaje promedio (alto = más atención).
// =============================================================

import { useEffect, useRef, useState } from 'react';

const COLORS = {
  estado_emocional:        ['#1A3358', '#10243E'],
  estres_academico:        ['#D26B53', '#B5403E'],
  sueno_descanso:          ['#B7A8D9', '#6E5BA0'],
  apoyo_social:            ['#8FB8A0', '#4F8A6E'],
  motivacion_pertenencia:  ['#E5C868', '#B08F1F'],
};

const DEFAULT_GRADIENT = ['#1A3358', '#10243E'];

const VIEW_W = 720;
const VIEW_H = 420;

// Layout simple: distribuir esferas con física suave de repulsión
function layoutBubbles(items) {
  const cx = VIEW_W / 2;
  const cy = VIEW_H / 2;
  const n = items.length || 1;
  return items.map((it, i) => {
    const angle = (i / n) * 2 * Math.PI;
    const radius = 130 + (i % 2) * 40;
    return {
      ...it,
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius * 0.65,
    };
  });
}

export default function DimensionBubbles({ data = [] }) {
  // data: [{dimension_id, dimension_label, mentions, avg_score}, ...]
  const ref = useRef(null);
  const [hover, setHover] = useState(null);

  if (!data.length) {
    return (
      <div className="empty-bubbles">
        <p className="note">Aún no hay datos suficientes para construir el modelo dimensional.</p>
      </div>
    );
  }

  // Escalar tamaños: la dimensión con más menciones = 78px, la mínima = 36px
  const max = Math.max(...data.map(d => d.mentions || 0)) || 1;
  const min = Math.min(...data.map(d => d.mentions || 0)) || 0;
  const scale = (m) => {
    if (max === min) return 56;
    return 36 + ((m - min) / (max - min)) * 50;
  };

  const positioned = layoutBubbles(
    data.map(d => ({ ...d, r: scale(d.mentions || 0) }))
  );

  return (
    <div className="bubbles-wrap">
      <svg
        ref={ref}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="bubbles-svg"
        role="img"
        aria-label="Modelo dimensional de impacto del bienestar"
      >
        <defs>
          {positioned.map((b) => {
            const [c1, c2] = COLORS[b.dimension_id] || DEFAULT_GRADIENT;
            return (
              <radialGradient
                key={`grad-${b.dimension_id}`}
                id={`grad-${b.dimension_id}`}
                cx="35%" cy="30%" r="70%"
              >
                <stop offset="0%"  stopColor={lighten(c1, 30)} stopOpacity="1" />
                <stop offset="55%" stopColor={c1} stopOpacity="1" />
                <stop offset="100%" stopColor={c2} stopOpacity="1" />
              </radialGradient>
            );
          })}
          <filter id="bubble-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#10243E" floodOpacity="0.32"/>
          </filter>
        </defs>

        {/* Líneas conectoras suaves desde el centro para reforzar idea sistémica */}
        <g className="bubble-links" stroke="#1A3358" strokeWidth="1" strokeOpacity="0.10">
          {positioned.map((b, i) => (
            <line
              key={`l-${i}`}
              x1={VIEW_W/2} y1={VIEW_H/2}
              x2={b.x} y2={b.y}
            />
          ))}
        </g>

        {/* Centro */}
        <circle cx={VIEW_W/2} cy={VIEW_H/2} r="14" fill="#C9A227" opacity="0.7" />
        <text
          x={VIEW_W/2} y={VIEW_H/2 + 28}
          textAnchor="middle" fontSize="11"
          fill="#10243E" fontWeight="700"
        >
          Sintonía
        </text>

        {/* Esferas */}
        {positioned.map((b) => {
          const isHover = hover === b.dimension_id;
          return (
            <g
              key={b.dimension_id}
              transform={`translate(${b.x}, ${b.y})`}
              onMouseEnter={() => setHover(b.dimension_id)}
              onMouseLeave={() => setHover(null)}
              style={{cursor: 'pointer'}}
              className={`bubble ${isHover ? 'is-hover' : ''}`}
            >
              <circle
                r={b.r}
                fill={`url(#grad-${b.dimension_id})`}
                filter="url(#bubble-shadow)"
                style={{transition: 'r 0.35s cubic-bezier(.2,.7,.2,1)'}}
              />
              {/* Reflejo */}
              <ellipse
                cx={-b.r * 0.35}
                cy={-b.r * 0.4}
                rx={b.r * 0.35}
                ry={b.r * 0.18}
                fill="white"
                opacity="0.35"
              />
              <text
                y={b.r + 18}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="#10243E"
              >
                {b.dimension_label || b.dimension_id}
              </text>
              <text
                y={b.r + 32}
                textAnchor="middle"
                fontSize="10"
                fill="#6B7280"
              >
                {b.mentions} {b.mentions === 1 ? 'mención' : 'menciones'}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="bubbles-legend">
        {data.map(d => {
          const [c1] = COLORS[d.dimension_id] || DEFAULT_GRADIENT;
          return (
            <div key={d.dimension_id} className="legend-item">
              <span className="legend-dot" style={{background: c1}} />
              <div>
                <strong>{d.dimension_label}</strong>
                <small>
                  {d.mentions} menciones · Promedio: {d.avg_score}
                </small>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .bubbles-wrap {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 24px;
          align-items: center;
        }
        .bubbles-svg {
          width: 100%;
          height: auto;
          background: radial-gradient(ellipse at center, #FBF8F1, #ffffff 75%);
          border-radius: var(--r-xl);
          border: 1px solid var(--c-borde);
        }
        .bubble text { pointer-events: none; user-select: none; }
        .bubble.is-hover circle:first-of-type { transform: scale(1.06); transform-origin: center; }
        .empty-bubbles {
          padding: 48px;
          text-align: center;
          background: var(--c-marfil);
          border: 1px dashed var(--c-borde);
          border-radius: var(--r-xl);
        }
        .bubbles-legend {
          display: grid;
          gap: 10px;
        }
        .legend-item {
          display: grid;
          grid-template-columns: 18px 1fr;
          gap: 10px;
          align-items: center;
          padding: 10px 12px;
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: 12px;
          font-size: 0.92rem;
        }
        .legend-dot {
          width: 14px; height: 14px;
          border-radius: 50%;
          box-shadow: inset -3px -3px 4px rgba(0,0,0,0.18), 0 2px 4px rgba(0,0,0,0.12);
        }
        .legend-item strong { color: var(--c-azul-800); display: block; }
        .legend-item small  { color: var(--c-gris); font-size: 0.82rem; }

        @media (max-width: 880px) {
          .bubbles-wrap { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

// Aclara un color hex en N%
function lighten(hex, percent) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, ((n >> 16) & 0xff) + Math.round(2.55 * percent));
  const g = Math.min(255, ((n >> 8)  & 0xff) + Math.round(2.55 * percent));
  const b = Math.min(255, (n & 0xff) + Math.round(2.55 * percent));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}
