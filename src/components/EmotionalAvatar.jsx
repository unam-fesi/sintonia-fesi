// =============================================================
// Sintonía UNAM — Avatar emocional SVG basado en último resultado
// y último check-in. Sutil, juguetón, respetuoso.
// =============================================================

import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient.js';

export default function EmotionalAvatar({ code }) {
  const [state, setState] = useState({ mood: 3, level: 'moderado' });

  useEffect(() => {
    if (!code) return;
    (async () => {
      const [{ data: lastSession }, { data: lastCheckin }] = await Promise.all([
        supabase.from('assessment_sessions')
          .select('general_level').eq('anonymous_code', code)
          .order('created_at', { ascending: false }).limit(1).maybeSingle(),
        supabase.from('weekly_checkins')
          .select('mood').eq('anonymous_code', code)
          .order('created_at', { ascending: false }).limit(1).maybeSingle(),
      ]);
      setState({
        mood: lastCheckin?.mood ?? 3,
        level: lastSession?.general_level ?? 'moderado',
      });
    })();
  }, [code]);

  const { face, color, label, mouth } = avatarFor(state);

  return (
    <div className="avatar-card">
      <svg viewBox="0 0 200 200" width="180" height="180" className="avatar-svg">
        <defs>
          <radialGradient id="av-grad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor={lighten(color, 30)}/>
            <stop offset="55%" stopColor={color}/>
            <stop offset="100%" stopColor={darken(color, 20)}/>
          </radialGradient>
          <filter id="av-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#10243E" floodOpacity="0.3"/>
          </filter>
        </defs>
        {/* Cuerpo redondo */}
        <circle cx="100" cy="100" r="80" fill="url(#av-grad)" filter="url(#av-shadow)"/>
        {/* Reflejo */}
        <ellipse cx="75" cy="68" rx="22" ry="12" fill="white" opacity="0.4"/>
        {/* Cara */}
        {face}
        {/* Boca */}
        {mouth}
      </svg>
      <p className="avatar-label">{label}</p>

      <style>{`
        .avatar-card {
          background: linear-gradient(135deg, var(--c-marfil), #fff);
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 24px;
          text-align: center;
        }
        .avatar-svg { display: block; margin: 0 auto; }
        .avatar-label {
          font-family: var(--ff-serif);
          font-size: 1.1rem;
          color: var(--c-azul-800);
          margin: 12px 0 0;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}

function avatarFor({ mood, level }) {
  // Mood toma prioridad si existe (más reciente).
  const m = Number(mood) || 3;
  let face;
  if (m >= 4) {
    face = (
      <>
        <circle cx="78" cy="92" r="7" fill="#10243E"/>
        <circle cx="122" cy="92" r="7" fill="#10243E"/>
        <path d="M70 80 Q 78 70 86 80" stroke="#10243E" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M114 80 Q 122 70 130 80" stroke="#10243E" strokeWidth="3" fill="none" strokeLinecap="round"/>
      </>
    );
  } else if (m === 3) {
    face = (
      <>
        <circle cx="78" cy="92" r="6" fill="#10243E"/>
        <circle cx="122" cy="92" r="6" fill="#10243E"/>
      </>
    );
  } else {
    face = (
      <>
        <circle cx="78" cy="95" r="6" fill="#10243E"/>
        <circle cx="122" cy="95" r="6" fill="#10243E"/>
        <path d="M70 92 Q 78 100 86 92" stroke="#10243E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M114 92 Q 122 100 130 92" stroke="#10243E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      </>
    );
  }

  let mouth;
  if (m >= 4) mouth = <path d="M75 130 Q 100 155 125 130" stroke="#10243E" strokeWidth="4" fill="none" strokeLinecap="round"/>;
  else if (m === 3) mouth = <path d="M80 132 Q 100 138 120 132" stroke="#10243E" strokeWidth="4" fill="none" strokeLinecap="round"/>;
  else if (m === 2) mouth = <path d="M85 135 L 115 135" stroke="#10243E" strokeWidth="4" fill="none" strokeLinecap="round"/>;
  else mouth = <path d="M80 140 Q 100 125 120 140" stroke="#10243E" strokeWidth="4" fill="none" strokeLinecap="round"/>;

  // Color por nivel del último test
  const colorByLevel = {
    bajo:        '#8FB8A0',
    moderado:    '#C9A227',
    prioritario: '#E8826B',
  };
  const color = colorByLevel[level] || '#C9A227';

  const labelByMood = {
    5: 'Hoy te ves luminoso(a) ✨',
    4: 'Tu energía hoy es buena 🌿',
    3: 'Vas a tu propio ritmo. Respira.',
    2: 'Hoy puedes ir despacito. Está bien.',
    1: 'Hoy te ves cansado(a). ¿Te das un descanso? 💛',
  };
  return { face, color, mouth, label: labelByMood[m] || labelByMood[3] };
}

function lighten(hex, p) {
  const n = parseInt(hex.slice(1), 16);
  return `#${[16,8,0].map(s => Math.min(255, ((n >> s) & 0xff) + Math.round(2.55*p))).map(v => v.toString(16).padStart(2,'0')).join('')}`;
}
function darken(hex, p) { return lighten(hex, -p); }
