import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient.js';
import { useStudent } from '../hooks/useStudent.js';

function isoWeek(d = new Date()) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

const QUESTIONS = [
  { key: 'mood',   label: '¿Cómo ha estado tu ánimo esta semana?',          low: 'Muy bajo', high: 'Muy bueno' },
  { key: 'energy', label: '¿Cómo ha estado tu nivel de energía?',           low: 'Agotado',  high: 'Pleno' },
  { key: 'stress', label: '¿Qué tan presionado(a) te has sentido?',         low: 'Tranquilo',high: 'Muy presionado' },
  { key: 'social', label: '¿Cómo te has sentido con tus vínculos sociales?',low: 'Aislado',  high: 'Conectado' },
];

export default function CheckIn() {
  const { student } = useStudent();
  const navigate = useNavigate();
  const [vals, setVals] = useState({ mood: 3, energy: 3, stress: 3, social: 3 });
  const [text, setText] = useState('');
  const [emotion, setEmotion] = useState('');
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState(null);
  const [thisWeek, setThisWeek] = useState(null);

  useEffect(() => {
    if (!student?.code) {
      navigate('/mi-historia', { state: { from: '/check-in' } });
      return;
    }
    // Verificar si ya hizo check-in esta semana
    const week = isoWeek();
    supabase.from('weekly_checkins')
      .select('week_iso, created_at')
      .eq('anonymous_code', student.code)
      .eq('week_iso', week)
      .maybeSingle()
      .then(({ data }) => setThisWeek(data));
  }, [student, navigate]);

  async function submit() {
    setErr(null); setSubmitting(true);
    try {
      const week = isoWeek();
      const { error } = await supabase.from('weekly_checkins').insert({
        anonymous_code: student.code,
        ...vals,
        free_text: text.trim() || null,
        week_iso: week,
      });
      if (error) {
        if (error.code === '23505') throw new Error('Ya hiciste tu check-in esta semana. ¡Excelente!');
        throw error;
      }

      // Si añadió texto, también guardar en diario
      if (text.trim()) {
        await supabase.from('student_journal').insert({
          anonymous_code: student.code,
          entry: text.trim(),
          emotion_tag: emotion || null,
        });
      }

      // Logro: primer check-in
      await supabase.from('student_achievements').upsert({
        anonymous_code: student.code,
        achievement_key: 'first_checkin',
      });

      setDone(true);
    } catch (e) {
      setErr(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (!student?.code) return null;

  if (thisWeek) {
    return (
      <section className="section">
        <div className="container" style={{maxWidth: 540}}>
          <div className="panel text-center">
            <span className="tag sage">Esta semana</span>
            <h1 className="mt-2">Ya hiciste tu check-in 🌿</h1>
            <p className="lede">Te leemos la próxima semana. Mientras tanto, sigue cuidándote.</p>
            <div style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap',marginTop:16}}>
              <Link to="/mi-historia" className="btn btn-ghost">Ver mi historia</Link>
              <Link to="/diario" className="btn btn-primary">Anotar en mi diario</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (done) {
    return (
      <section className="section">
        <div className="container" style={{maxWidth: 540}}>
          <div className="panel text-center">
            <span className="tag sage">¡Listo!</span>
            <h1 className="mt-2">Check-in registrado 🎉</h1>
            <p className="lede">Gracias por darte un minuto para escucharte.</p>
            <div style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap',marginTop:16}}>
              <Link to="/mi-historia" className="btn btn-ghost">Ver mi evolución</Link>
              <Link to="/" className="btn btn-primary">Volver al inicio</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container" style={{maxWidth: 620}}>
        <div className="panel">
          <span className="tag">Check-in semanal</span>
          <h1 className="mt-2">¿Cómo estuvo tu semana?</h1>
          <p className="lede">
            30 segundos. Sin pedirte ningún dato personal. Solo para que te escuches a ti.
          </p>

          {err && <div className="login-error mt-2">{err}</div>}

          <div className="mt-3">
            {QUESTIONS.map(q => (
              <Slider key={q.key} q={q} value={vals[q.key]} onChange={v => setVals(s => ({...s, [q.key]: v}))} />
            ))}

            <div className="field mt-3">
              <label>Anota una línea (opcional)</label>
              <input type="text" value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Ej. Esta semana me costó dormir, pero salí a caminar 2 veces…" />
            </div>

            {text.trim() && (
              <div className="field">
                <label>¿Qué emoción dominó? (opcional)</label>
                <select value={emotion} onChange={e => setEmotion(e.target.value)}>
                  <option value="">— No especifico —</option>
                  <option>Calma</option>
                  <option>Alegría</option>
                  <option>Gratitud</option>
                  <option>Cansancio</option>
                  <option>Ansiedad</option>
                  <option>Tristeza</option>
                  <option>Enojo</option>
                  <option>Confusión</option>
                  <option>Esperanza</option>
                </select>
              </div>
            )}

            <button className="btn btn-primary btn-lg" style={{width:'100%'}}
              disabled={submitting} onClick={submit}>
              {submitting ? 'Guardando…' : 'Guardar mi check-in'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .login-error { background: var(--c-coral-100); color: #93362A; padding: 10px 14px; border-radius: 12px; }
      `}</style>
    </section>
  );
}

function Slider({ q, value, onChange }) {
  return (
    <div className="slider-row">
      <strong>{q.label}</strong>
      <div className="slider-track">
        {[1,2,3,4,5].map(n => (
          <button
            key={n}
            type="button"
            className={`slider-pill ${value === n ? 'on' : ''}`}
            onClick={() => onChange(n)}
            aria-label={`Nivel ${n}`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="slider-labels">
        <small>{q.low}</small>
        <small>{q.high}</small>
      </div>
      <style>{`
        .slider-row { margin: 14px 0; }
        .slider-row strong { display: block; color: var(--c-azul-800); margin-bottom: 8px; font-size: 0.96rem; }
        .slider-track { display: flex; gap: 4px; }
        .slider-pill {
          flex: 1;
          padding: 10px 0;
          border: 1.5px solid var(--c-borde);
          background: #fff;
          font-weight: 700;
          color: var(--c-azul-800);
          cursor: pointer;
          border-radius: 10px;
        }
        .slider-pill.on {
          background: linear-gradient(135deg, var(--c-azul-800), var(--c-azul-700));
          color: #fff;
          border-color: var(--c-azul-800);
        }
        .slider-pill:hover:not(.on) { background: var(--c-azul-100); }
        .slider-labels { display: flex; justify-content: space-between; margin-top: 4px; color: var(--c-gris); }
      `}</style>
    </div>
  );
}
