import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../config/supabaseClient.js';
import SafetyNotice from '../components/SafetyNotice.jsx';

export default function Support() {
  const [specialists, setSpecialists] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    Promise.all([
      supabase.from('specialists').select('*').eq('active', true).order('full_name'),
      supabase.from('content_blocks').select('*').eq('page','support').eq('active', true).order('order_idx'),
    ]).then(([s, b]) => {
      setSpecialists(s.data || []);
      setBlocks(b.data || []);
    });
  }, []);

  const specialties = [...new Set(specialists.map(s => s.specialty))];
  const visible = filter === 'all' ? specialists : specialists.filter(s => s.specialty === filter);

  return (
    <section className="section">
      <div className="container" style={{maxWidth: 920}}>
        <header className="text-center" style={{maxWidth:720,margin:'0 auto'}}>
          <span className="tag coral">Pedir apoyo</span>
          <h1 className="mt-2">No estás solo(a). Hay rutas de apoyo</h1>
          <p className="lede">
            Si sientes que necesitas hablar con alguien, aquí están los servicios disponibles
            dentro de la UNAM y líneas de emergencia. Ningún paso es obligatorio — tú decides cómo y cuándo.
          </p>
        </header>

        <div className="crisis-card mt-4" role="alert">
          <div>
            <span className="emoji" aria-hidden="true">📞</span>
            <h2>Línea de la Vida — 800 290 0024</h2>
            <p>
              Servicio de orientación emocional <strong>gratuito, confidencial y disponible 24 horas, todos los días</strong>.
              Si estás en una situación de crisis o piensas en hacerte daño, llama ahora.
            </p>
            <a href="tel:8002900024" className="btn btn-coral btn-lg">📞 Llamar ahora</a>
          </div>
        </div>

        <section className="panel mt-4">
          <h2>Servicios universitarios</h2>
          <p className="lede">
            Especialistas y áreas de orientación dentro de la UNAM. Su atención es gratuita para la comunidad.
          </p>

          {specialties.length > 1 && (
            <div className="filters mt-2">
              <button className={`chip ${filter==='all' ? 'active':''}`} onClick={() => setFilter('all')}>Todos</button>
              {specialties.map(s => (
                <button key={s} className={`chip ${filter===s ? 'active':''}`} onClick={() => setFilter(s)}>{s}</button>
              ))}
            </div>
          )}

          {visible.length === 0 ? (
            <p className="note mt-3">
              Aún no hay especialistas registrados.
              Mientras tanto, en <Link to="/recursos">Recursos</Link> encuentras servicios universitarios.
            </p>
          ) : (
            <div className="spec-grid mt-3">
              {visible.map(s => (
                <article key={s.id} className="spec-card">
                  <span className="spec-tag">{s.specialty}</span>
                  <h3>{s.full_name}</h3>
                  {s.faculty   && <small>📍 {s.faculty}</small>}
                  {s.modality  && <small>🌐 {s.modality}</small>}
                  {s.schedule  && <small>🕐 {s.schedule}</small>}
                  {s.email && <a href={`mailto:${s.email}`} className="btn btn-ghost btn-sm">📧 Escribir</a>}
                  {s.phone && <a href={`tel:${s.phone}`} className="btn btn-primary btn-sm">📞 Llamar</a>}
                </article>
              ))}
            </div>
          )}
        </section>

        {blocks.map(b => (
          <section key={b.id} className="panel mt-4">
            <h2>{b.emoji} {b.title}</h2>
            {b.body && <p className="lede">{b.body}</p>}
            {Array.isArray(b.list_items) && b.list_items.length > 0 && (
              <ol style={{lineHeight: 1.8}}>
                {b.list_items.map((it, i) => (
                  <li key={i} dangerouslySetInnerHTML={{__html: renderMd(it)}} />
                ))}
              </ol>
            )}
          </section>
        ))}

        <SafetyNotice variant="warm">
          <strong>Si estás en peligro inmediato</strong> o experimentas una emergencia médica,
          marca al <strong>911</strong>.
        </SafetyNotice>

        <p className="text-center mt-4">
          <Link to="/" className="btn btn-ghost">Volver al inicio</Link>
        </p>
      </div>

      <style>{`
        .crisis-card {
          background: linear-gradient(135deg, var(--c-coral-100), #FFF6F2);
          border: 2px solid var(--c-coral-500);
          border-radius: var(--r-xl);
          padding: 28px;
          text-align: center;
          box-shadow: var(--sh-md);
        }
        .crisis-card .emoji { font-size: 2.4rem; display: block; margin-bottom: 8px; }
        .crisis-card h2 { color: #93362A; margin: 0 0 8px; font-size: 1.6rem; }
        .crisis-card p { color: #5C2018; max-width: 540px; margin: 0 auto 14px; }

        .filters { display: flex; gap: 6px; flex-wrap: wrap; }
        .chip {
          background: #fff;
          border: 1.5px solid var(--c-borde);
          border-radius: var(--r-pill);
          padding: 5px 12px;
          font-size: 0.84rem;
          color: var(--c-azul-800);
          cursor: pointer;
        }
        .chip.active { background: var(--c-azul-800); color: #fff; border-color: var(--c-azul-800); }

        .spec-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 14px;
        }
        .spec-card {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 18px;
          display: grid;
          gap: 6px;
        }
        .spec-card h3 { color: var(--c-azul-800); margin: 4px 0; font-size: 1.05rem; }
        .spec-card small { color: var(--c-gris); font-size: 0.84rem; }
        .spec-tag {
          background: var(--c-azul-100);
          color: var(--c-azul-800);
          padding: 3px 10px;
          border-radius: 999px;
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          width: fit-content;
        }
        .spec-card .btn { margin-top: 6px; }
      `}</style>
    </section>
  );
}

function renderMd(t) {
  if (!t) return '';
  return String(t)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>');
}
