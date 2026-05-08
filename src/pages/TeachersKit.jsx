import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabaseClient.js';
import SafetyNotice from '../components/SafetyNotice.jsx';

export default function TeachersKit() {
  const [blocks, setBlocks] = useState([]);
  const [extras, setExtras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase.from('content_blocks').select('*').eq('page', 'teachers').eq('active', true).order('order_idx'),
      supabase.from('student_library').select('*').eq('category', 'teachers_kit').eq('active', true).order('title'),
    ]).then(([b, e]) => {
      setBlocks(b.data || []);
      setExtras(e.data || []);
      setLoading(false);
    });
  }, []);

  return (
    <section className="section">
      <div className="container" style={{maxWidth:840}}>
        <header className="text-center" style={{maxWidth: 720, margin: '0 auto'}}>
          <span className="tag azul">Para docentes y tutores</span>
          <h1 className="mt-2">Kit pedagógico de bienestar</h1>
          <p className="lede">
            Recursos para acompañar a estudiantes desde tu rol docente. Orientaciones,
            dinámicas de integración, señales generales (no diagnósticas) y rutas de
            canalización dentro de la UNAM.
          </p>
        </header>

        {loading ? <div className="spinner" style={{margin:'40px auto'}} /> : (
          <div className="kit-grid mt-4">
            {blocks.length === 0 ? (
              <p className="note text-center" style={{gridColumn:'1/-1'}}>
                Aún no hay bloques de contenido configurados. La coordinación los está agregando.
              </p>
            ) : blocks.map(b => (
              <article key={b.id} className="kit-section">
                <h2>{b.emoji} {b.title}</h2>
                {b.body && <p className="note">{b.body}</p>}
                {Array.isArray(b.list_items) && b.list_items.length > 0 && (
                  <ul style={{lineHeight: 1.7}}>
                    {b.list_items.map((it, i) => (
                      <li key={i} dangerouslySetInnerHTML={{__html: renderMarkdown(it)}} />
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        )}

        {extras.length > 0 && (
          <>
            <h2 className="text-center mt-4">📚 Material complementario</h2>
            <div className="kit-grid mt-2">
              {extras.map(it => (
                <article key={it.id} className="kit-section">
                  <h3>{it.title}</h3>
                  {it.body && <p>{it.body}</p>}
                  {it.media_url && <a href={it.media_url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">Ver recurso →</a>}
                </article>
              ))}
            </div>
          </>
        )}

        <SafetyNotice variant="gold">
          Este material es <strong>educativo</strong>, no clínico. Tu rol como docente es acompañar
          y canalizar, no diagnosticar ni intervenir clínicamente. Si tú mismo necesitas apoyo,
          también puedes acudir a <Link to="/apoyo">los servicios universitarios</Link>.
        </SafetyNotice>
      </div>

      <style>{`
        .kit-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 14px;
        }
        .kit-section {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 22px 26px;
        }
        .kit-section h2, .kit-section h3 {
          color: var(--c-azul-800);
          margin: 0 0 8px;
        }
        .kit-section h2 { font-size: 1.15rem; }
        .kit-section ol, .kit-section ul {
          padding-left: 20px;
        }
        .kit-section p { color: var(--c-texto-soft); }
        .kit-section ul li strong { color: var(--c-azul-800); }
      `}</style>
    </section>
  );
}

// Mini renderizador de **bold** y backticks
function renderMarkdown(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>');
}
