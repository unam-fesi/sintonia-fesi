import { useEffect, useMemo, useState } from 'react';
import ResourceCard from '../components/ResourceCard.jsx';
import SafetyNotice from '../components/SafetyNotice.jsx';
import { fetchResources } from '../services/supabaseService.js';
import { RESOURCE_TYPES } from '../data/fallbackResources.js';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchResources().then(rs => {
      if (mounted) { setResources(rs); setLoading(false); }
    });
    return () => { mounted = false; };
  }, []);

  const visible = useMemo(() => {
    if (filter === 'all') return resources;
    return resources.filter(r => r.type === filter);
  }, [filter, resources]);

  return (
    <section className="section">
      <div className="container">
        <header style={{textAlign: 'center', maxWidth: 720, margin: '0 auto'}}>
          <span className="tag">Recursos de apoyo</span>
          <h1 className="mt-2">Espacios universitarios para tu bienestar</h1>
          <p className="lede">
            Conoce orientaciones, actividades y servicios disponibles dentro de la UNAM
            para acompañarte en tu vida universitaria.
          </p>
        </header>

        <div className="filters mt-4">
          <button
            className={`chip ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >Todos</button>
          {RESOURCE_TYPES.map(t => (
            <button
              key={t.id}
              className={`chip ${filter === t.id ? 'active' : ''}`}
              onClick={() => setFilter(t.id)}
            >
              <span aria-hidden="true">{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center mt-4 lede">Cargando recursos…</p>
        ) : visible.length === 0 ? (
          <p className="text-center mt-4 note">No hay recursos en esta categoría todavía.</p>
        ) : (
          <div className="resource-grid mt-4">
            {visible.map(r => <ResourceCard key={r.id} resource={r} />)}
          </div>
        )}

        <div className="mt-4">
          <SafetyNotice variant="gold">
            ¿Estás en una situación de crisis? Llama a la <strong>Línea de la Vida</strong> al
            <strong> 800 290 0024</strong>, gratuita y disponible las 24 horas, todos los días.
          </SafetyNotice>
        </div>
      </div>

      <style>{`
        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }
        .chip {
          background: #fff;
          border: 1.5px solid var(--c-borde);
          border-radius: var(--r-pill);
          padding: 8px 14px;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--c-azul-800);
          cursor: pointer;
          transition: all var(--t);
        }
        .chip:hover { border-color: var(--c-azul-800); }
        .chip.active {
          background: var(--c-azul-800);
          color: #fff;
          border-color: var(--c-azul-800);
        }
        .resource-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 16px;
        }
      `}</style>
    </section>
  );
}
