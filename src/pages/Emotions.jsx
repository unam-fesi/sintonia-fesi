import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient.js';

export default function Emotions() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('student_library')
      .select('*').eq('active', true).eq('category', 'dictionary').order('title')
      .then(({ data }) => { setItems(data || []); setLoading(false); });
  }, []);

  const visible = items.filter(i =>
    !search.trim() || i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.body?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="section">
      <div className="container" style={{maxWidth: 840}}>
        <header className="text-center" style={{maxWidth: 640, margin: '0 auto'}}>
          <span className="tag lavanda">Diccionario</span>
          <h1 className="mt-2">Diccionario de emociones</h1>
          <p className="lede">
            A veces no sabemos qué nombre darle a lo que sentimos. Aquí encuentras un vocabulario
            emocional cuidado para ayudarte a identificar y validar tu experiencia.
          </p>
        </header>

        <div className="search-bar mt-4">
          <input
            type="search"
            placeholder="Buscar emoción…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {loading ? <div className="spinner" style={{margin: '40px auto'}} /> : (
          <div className="emo-grid mt-3">
            {visible.length === 0 ? (
              <p className="note text-center">
                {search ? 'No encontramos esa emoción. Prueba con otro término.' : 'Aún no hay emociones cargadas.'}
              </p>
            ) : visible.map(e => (
              <article key={e.id} className="emo-card">
                <h3>{e.title}</h3>
                <p>{e.body}</p>
                {e.meta?.synonyms && (
                  <small><strong>También:</strong> {e.meta.synonyms}</small>
                )}
              </article>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .search-bar { display: flex; justify-content: center; }
        .search-bar input {
          width: 100%; max-width: 420px;
          padding: 10px 16px;
          border: 1.5px solid var(--c-borde);
          border-radius: 999px;
          font-size: 0.95rem;
        }
        .emo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 12px;
        }
        .emo-card {
          background: linear-gradient(135deg, var(--c-lavanda-100), #fff);
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 16px 18px;
        }
        .emo-card h3 {
          font-family: var(--ff-serif);
          font-size: 1.15rem;
          color: var(--c-azul-800);
          margin: 0 0 6px;
        }
        .emo-card p { color: var(--c-texto-soft); font-size: 0.92rem; margin: 0 0 6px; }
        .emo-card small { color: var(--c-gris); font-size: 0.82rem; }
      `}</style>
    </section>
  );
}
