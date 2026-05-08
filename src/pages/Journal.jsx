import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient.js';
import { useStudent } from '../hooks/useStudent.js';

const EMOTIONS = ['Calma','Alegría','Gratitud','Cansancio','Ansiedad','Tristeza','Enojo','Confusión','Esperanza'];

export default function Journal() {
  const { student } = useStudent();
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState('');
  const [emotion, setEmotion] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!student?.code) {
      navigate('/mi-historia', { state: { from: '/diario' } });
      return;
    }
    load();
  // eslint-disable-next-line
  }, [student?.code]);

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
    await supabase.from('student_journal').insert({
      anonymous_code: student.code,
      entry: text.trim(),
      emotion_tag: emotion || null,
    });
    setText(''); setEmotion('');
    await load();
    setSaving(false);
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
