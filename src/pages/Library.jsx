import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient.js';
import { useStudent } from '../hooks/useStudent.js';

const CATEGORIES = [
  { id: 'all',         label: 'Todo',          icon: '✨' },
  { id: 'breathing',   label: 'Respiración',   icon: '🌬' },
  { id: 'sound',       label: 'Sonidos',       icon: '🎧' },
  { id: 'video',       label: 'Videos',        icon: '🎬' },
  { id: 'dictionary',  label: 'Diccionario',   icon: '📖' },
  { id: 'quote',       label: 'Frases',        icon: '💭' },
  { id: 'challenge',   label: 'Retos',         icon: '🎯' },
];

export default function Library() {
  const { student } = useStudent();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!student?.code) {
      navigate('/mi-historia', { state: { from: '/biblioteca' } });
      return;
    }
    load();
  // eslint-disable-next-line
  }, [student?.code]);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('student_library')
      .select('*').eq('active', true).order('category').order('title');
    setItems(data || []);
    setLoading(false);
  }

  if (!student?.code) return null;
  const visible = filter === 'all' ? items : items.filter(i => i.category === filter);

  return (
    <section className="section">
      <div className="container" style={{maxWidth: 980}}>
        <header className="text-center" style={{maxWidth: 720, margin: '0 auto'}}>
          <span className="tag sage">Biblioteca</span>
          <h1 className="mt-2">Tu rincón de bienestar</h1>
          <p className="lede">
            Audio, video, ejercicios, lectura. Recursos curados para acompañarte en momentos de
            tranquilidad, concentración o desahogo.
          </p>
        </header>

        <div className="filters mt-4">
          {CATEGORIES.map(c => (
            <button key={c.id} className={`chip ${filter === c.id ? 'active' : ''}`} onClick={() => setFilter(c.id)}>
              <span>{c.icon}</span> {c.label}
            </button>
          ))}
        </div>

        {loading ? <div className="spinner" style={{margin: '40px auto'}} /> : (
          <div className="lib-grid mt-3">
            {visible.length === 0 ? (
              <p className="note">Aún no hay contenido en esta categoría. Tu equipo de Sintonía está agregando más.</p>
            ) : visible.map(item => <LibraryItem key={item.id} item={item} />)}
          </div>
        )}
      </div>

      <style>{`
        .filters { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
        .chip {
          background: #fff;
          border: 1.5px solid var(--c-borde);
          border-radius: var(--r-pill);
          padding: 8px 14px;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--c-azul-800);
          cursor: pointer;
        }
        .chip.active { background: var(--c-azul-800); color: #fff; border-color: var(--c-azul-800); }
        .lib-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 14px;
        }
      `}</style>
    </section>
  );
}

function LibraryItem({ item }) {
  return (
    <article className="lib-item">
      <header>
        <span className="cat-badge">{categoryIcon(item.category)} {categoryLabel(item.category)}</span>
        {item.duration_sec && <small>⏱ {Math.round(item.duration_sec / 60)} min</small>}
      </header>
      <h3>{item.title}</h3>
      {item.body && <p>{item.body}</p>}
      {item.media_url && (
        item.category === 'video' ? (
          <video controls src={item.media_url} style={{width:'100%', borderRadius: 8, marginTop: 8}} />
        ) : item.category === 'sound' ? (
          <audio controls src={item.media_url} style={{width:'100%', marginTop: 8}} />
        ) : (
          <a href={item.media_url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
            Abrir recurso →
          </a>
        )
      )}

      <style jsx>{`
        .lib-item {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 18px;
          display: flex; flex-direction: column;
        }
        .lib-item header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .cat-badge {
          background: var(--c-azul-100); color: var(--c-azul-800);
          padding: 3px 10px; border-radius: 999px;
          font-size: 0.74rem; font-weight: 700;
        }
        .lib-item small { color: var(--c-gris); font-size: 0.78rem; }
        .lib-item h3 { color: var(--c-azul-800); margin: 4px 0; font-size: 1rem; }
        .lib-item p { color: var(--c-texto-soft); font-size: 0.92rem; margin: 0; flex: 1; }
      `}</style>
    </article>
  );
}

function categoryLabel(c) {
  const map = { breathing:'Respiración', sound:'Sonido', video:'Video', dictionary:'Emoción', quote:'Frase', challenge:'Reto' };
  return map[c] || c;
}
function categoryIcon(c) {
  const map = { breathing:'🌬', sound:'🎧', video:'🎬', dictionary:'📖', quote:'💭', challenge:'🎯' };
  return map[c] || '✨';
}
