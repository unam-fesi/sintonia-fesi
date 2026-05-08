import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient.js';
import { useStudent } from '../hooks/useStudent.js';

const EMOTIONS = ['Calma','Alegría','Gratitud','Cansancio','Ansiedad','Tristeza','Enojo','Confusión','Esperanza'];

function resolveMediaUrl(url) {
  if (!url) return '';
  if (/^(https?:|data:|blob:)/.test(url)) return url;
  const base = import.meta.env.BASE_URL || '/';
  return base + url.replace(/^\/+/, '');
}

export default function Journal() {
  const { student } = useStudent();
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState('');
  const [emotion, setEmotion] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const suggestRef = useRef(null);

  useEffect(() => {
    if (!student?.code) {
      navigate('/mi-historia', { state: { from: '/diario' } });
      return;
    }
    load();
  // eslint-disable-next-line
  }, [student?.code]);

  // Scroll a la sugerencia cuando aparezca
  useEffect(() => {
    if (suggestion || suggestLoading) {
      requestAnimationFrame(() => {
        suggestRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }, [suggestion, suggestLoading]);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from('student_journal')
      .select('id, entry, emotion_tag, created_at')
      .eq('anonymous_code', student.code)
      .order('created_at', { ascending: false })
      .limit(40);
    setEntries(data || []);
    setLoading(false);
  }

  async function add() {
    if (!text.trim()) return;
    setSaving(true);
    const entry = text.trim();
    const tag = emotion || null;
    await supabase.from('student_journal').insert({
      anonymous_code: student.code,
      entry,
      emotion_tag: tag,
    });
    setText(''); setEmotion('');
    await load();
    setSaving(false);

    // Pum-AI sugiere algo de la biblioteca
    requestSuggestion(entry, tag);
  }

  async function requestSuggestion(entry, emotion_tag) {
    setSuggestLoading(true); setSuggestion(null);
    let usedFallback = false;

    try {
      const { data, error } = await supabase.functions.invoke('journal-suggest', {
        body: {
          anonymous_code: student.code,
          entry,
          emotion_tag,
        },
      });

      // Caso éxito
      if (!error && data && !data.error) {
        if (data.crisis) {
          setSuggestion({ kind: 'crisis', message: data.message });
        } else if (data.suggestion) {
          setSuggestion({
            kind: 'resource',
            item: data.suggestion,
            reason: data.reason,
            fallback: !!data.fallback,
          });
        } else {
          // No hubo sugerencia pero tampoco error — mostrar fallback local
          usedFallback = true;
        }
      } else {
        usedFallback = true;
        if (error || data?.error) {
          console.warn('[journal-suggest] error', error || data.error);
        }
      }
    } catch (e) {
      console.warn('[journal-suggest] exception', e);
      usedFallback = true;
    }

    // Fallback local: si la edge function no respondió o falló, intentar
    // armar una sugerencia client-side desde la biblioteca pública
    if (usedFallback) {
      try {
        const cats = pickCategoriesFor(emotion_tag);
        const { data: lib } = await supabase.from('student_library')
          .select('id, category, title, body, media_url, duration_sec, meta')
          .eq('active', true)
          .in('category', cats)
          .limit(40);
        if (lib && lib.length > 0) {
          const item = lib[Math.floor(Math.random() * lib.length)];
          setSuggestion({
            kind: 'resource',
            item,
            reason: localReasonFor(emotion_tag),
            fallback: true,
          });
        }
      } catch (e) { console.warn(e); }
    }

    setSuggestLoading(false);
  }

  async function remove(id) {
    if (!confirm('¿Eliminar esta entrada?')) return;
    await supabase.from('student_journal').delete().eq('id', id).eq('anonymous_code', student.code);
    load();
  }

  if (!student?.code) return null;

  return (
    <section className="section">
      <div className="container" style={{maxWidth: 720}}>
        <div className="panel">
          <span className="tag sage">Diario</span>
          <h1 className="mt-2">Una línea sobre cómo te sientes hoy</h1>
          <p className="lede">
            Escribir aunque sea una frase ayuda a procesar lo que sientes. No tiene que ser perfecto.
          </p>

          <div className="field">
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Hoy me sentí…"
              maxLength={240}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); add(); } }}
            />
          </div>

          <div className="emo-pills">
            <small>Emoción dominante (opcional):</small>
            {EMOTIONS.map(em => (
              <button
                key={em}
                className={`emo-pill ${emotion === em ? 'on' : ''}`}
                onClick={() => setEmotion(emotion === em ? '' : em)}
              >
                {em}
              </button>
            ))}
          </div>

          <button className="btn btn-primary mt-2" disabled={saving || !text.trim()} onClick={add}>
            {saving ? 'Guardando…' : 'Agregar entrada'}
          </button>

          {(suggestLoading || suggestion) && (
            <div className="suggest-area mt-3" ref={suggestRef}>
              {suggestLoading && (
                <div className="suggest-loading">
                  <div className="spinner small" />
                  <span>Pum-AI está eligiendo algo para ti…</span>
                </div>
              )}
              {suggestion?.kind === 'crisis' && (
                <div className="suggest-card crisis">
                  <strong>{suggestion.message}</strong>
                  <p>Te invitamos a llamar a la <strong>Línea de la Vida 800 290 0024</strong> y revisar las opciones en /apoyo.</p>
                  <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:8}}>
                    <a href="tel:8002900024" className="btn btn-coral btn-sm">📞 Llamar</a>
                    <Link to="/apoyo" className="btn btn-ghost btn-sm">Ver apoyos</Link>
                  </div>
                </div>
              )}
              {suggestion?.kind === 'resource' && (
                <SuggestionCard
                  item={suggestion.item}
                  reason={suggestion.reason}
                  onDismiss={() => setSuggestion(null)}
                />
              )}
            </div>
          )}
        </div>

        <section className="panel mt-3">
          <h2>Tus entradas ({entries.length})</h2>
          {loading ? <div className="spinner" style={{margin:'24px auto'}} /> : entries.length === 0 ? (
            <p className="note">Aún no has escrito nada. ¡Empieza con una línea!</p>
          ) : (
            <ul className="entry-list">
              {entries.map(e => (
                <li key={e.id} className="entry-item">
                  <div className="entry-meta">
                    <small>{new Date(e.created_at).toLocaleString('es-MX', { weekday:'short', day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' })}</small>
                    {e.emotion_tag && <span className="emo-tag">{e.emotion_tag}</span>}
                    <button className="del-btn" onClick={() => remove(e.id)} title="Eliminar">🗑</button>
                  </div>
                  <p>"{e.entry}"</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <p className="text-center mt-3">
          <Link to="/mi-historia" className="note">← Volver a mi historia</Link>
        </p>
      </div>

      <style>{`
        .suggest-area { animation: fadeInUp 0.3s ease; }
        .suggest-loading {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 16px;
          background: var(--c-azul-100);
          border-radius: 12px;
          color: var(--c-azul-800);
          font-size: 0.92rem;
        }
        .spinner.small { width: 18px; height: 18px; border-width: 2px; margin: 0; }
        .suggest-card {
          background: linear-gradient(135deg, var(--c-oro-100), var(--c-salvia-100));
          border: 1px solid var(--c-oro-600);
          border-radius: var(--r-md);
          padding: 16px 18px;
          position: relative;
        }
        .suggest-card.crisis {
          background: linear-gradient(135deg, var(--c-coral-100), #FFF6F2);
          border-color: var(--c-coral-500);
          color: #5C2018;
        }
        .suggest-card.crisis strong { color: #93362A; display: block; margin-bottom: 4px; }
        .suggest-card .badge {
          display: inline-block;
          background: var(--c-azul-800); color: var(--c-oro-400);
          padding: 3px 10px; border-radius: 999px;
          font-size: 0.74rem; font-weight: 800;
          letter-spacing: 0.04em; text-transform: uppercase;
        }
        .suggest-card h4 { color: var(--c-azul-800); margin: 8px 0 4px; font-size: 1.05rem; }
        .suggest-card p { margin: 4px 0; font-size: 0.92rem; color: var(--c-texto-soft); }
        .suggest-card .reason {
          font-style: italic;
          background: rgba(255,255,255,0.7);
          padding: 10px 12px;
          border-radius: 10px;
          margin: 8px 0;
          color: var(--c-azul-800);
        }
        .suggest-card .dismiss {
          position: absolute; top: 8px; right: 8px;
          background: transparent; border: 0; cursor: pointer;
          font-size: 0.92rem; color: var(--c-gris);
        }
        .emo-pills { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; margin: 8px 0 4px; }
        .emo-pills small { color: var(--c-gris); font-size: 0.84rem; margin-right: 6px; }
        .emo-pill {
          padding: 5px 10px;
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: 999px;
          font-size: 0.82rem;
          color: var(--c-azul-800);
          cursor: pointer;
        }
        .emo-pill.on { background: var(--c-salvia-400); color: #1F3829; border-color: var(--c-salvia-600); }

        .entry-list { list-style: none; padding: 0; display: grid; gap: 10px; }
        .entry-item {
          padding: 14px 16px;
          background: var(--c-marfil);
          border: 1px solid var(--c-borde-soft);
          border-radius: 12px;
        }
        .entry-meta { display: flex; gap: 8px; align-items: center; margin-bottom: 6px; }
        .entry-meta small { color: var(--c-gris); font-size: 0.78rem; flex: 1; }
        .emo-tag {
          background: var(--c-salvia-100);
          color: #2F6048;
          padding: 2px 8px;
          border-radius: 999px;
          font-size: 0.76rem;
          font-weight: 700;
        }
        .del-btn {
          background: transparent; border: none; cursor: pointer;
          font-size: 0.86rem; opacity: 0.5;
        }
        .del-btn:hover { opacity: 1; }
        .entry-item p { margin: 0; font-family: var(--ff-serif); font-size: 1.02rem; color: var(--c-azul-800); font-style: italic; }
      `}</style>
    </section>
  );
}

function pickCategoriesFor(emotion) {
  const e = (emotion || '').toLowerCase();
  if (/triste|cansancio|apat|soledad/.test(e))     return ['sound','breathing','quote'];
  if (/ansie|nerv|estr|enojo|conf/.test(e))         return ['breathing','sound'];
  if (/calma|gratitud|esperanza|aleg/.test(e))      return ['challenge','quote','sound'];
  return ['sound','breathing','quote','challenge'];
}

function localReasonFor(emotion) {
  const e = (emotion || '').toLowerCase();
  if (/triste|cansancio|apat|soledad/.test(e))
    return 'Para acompañarte en este momento sin presión. Solo escucha.';
  if (/ansie|nerv|estr/.test(e))
    return 'Esto puede ayudarte a regular el ritmo y soltar un poco la tensión.';
  if (/calma|gratitud|esperanza|aleg/.test(e))
    return '¡Ese estado es valioso! Aprovéchalo con un pequeño reto.';
  return 'Quizás esto resuena con cómo te sientes hoy.';
}

function SuggestionCard({ item, reason, onDismiss }) {
  const media = resolveMediaUrl(item.media_url);
  const catLabel = {
    sound: '🎧 Sonido',
    video: '🎬 Video',
    breathing: '🌬 Respiración',
    challenge: '🎯 Reto',
    quote: '💭 Frase',
    dictionary: '📖 Emoción',
  }[item.category] || '✨ Recurso';

  return (
    <div className="suggest-card">
      <button className="dismiss" onClick={onDismiss} aria-label="Cerrar">✕</button>
      <span className="badge">✨ Pum-AI te sugiere · {catLabel}</span>
      <h4>{item.title}</h4>
      {item.body && <p>{item.body}</p>}
      {reason && <p className="reason">"{reason}"</p>}

      {item.media_url && item.category === 'sound' && (
        <audio controls preload="metadata" src={media} style={{width:'100%', marginTop: 6}} />
      )}
      {item.media_url && item.category === 'video' && (
        <video controls preload="metadata" src={media} style={{width:'100%', borderRadius: 8, marginTop: 6}} />
      )}
      {item.media_url && !['sound','video'].includes(item.category) && (
        <a href={media} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" style={{marginTop:6}}>
          Abrir recurso →
        </a>
      )}
      {item.meta?.tempo && (
        <small style={{display:'block',marginTop:8,color:'var(--c-gris)'}}>
          🎵 {item.meta.tempo} · {item.meta.energy ? `Energía ${item.meta.energy.toLowerCase()}` : ''}
        </small>
      )}
      <div style={{marginTop:8, display:'flex', gap:6, flexWrap:'wrap'}}>
        <Link to="/biblioteca" className="btn btn-ghost btn-sm">Ver más en biblioteca →</Link>
      </div>
    </div>
  );
}
