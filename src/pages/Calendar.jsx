import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabaseClient.js';
import { useStudent } from '../hooks/useStudent.js';

const CATEGORIES = ['todos','psicologia','deporte','arte','sustentabilidad','comunidad'];
const CAT_ICON = { psicologia:'🧠', deporte:'🏃', arte:'🎨', sustentabilidad:'🌿', comunidad:'🤝' };

export default function Calendar() {
  const { student } = useStudent();
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('todos');
  const [myRsvps, setMyRsvps] = useState(new Set());
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('view_upcoming_events').select('*').limit(60);
    setEvents(data || []);

    if (student?.code) {
      const { data: r } = await supabase.from('event_rsvp').select('event_id').eq('anonymous_code', student.code);
      setMyRsvps(new Set((r || []).map(x => x.event_id)));
    }
    setLoading(false);
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [student?.code]);

  async function rsvp(eventId) {
    if (!student?.code) return;
    if (myRsvps.has(eventId)) {
      await supabase.from('event_rsvp').delete().eq('event_id', eventId).eq('anonymous_code', student.code);
    } else {
      await supabase.from('event_rsvp').insert({ event_id: eventId, anonymous_code: student.code });
    }
    load();
  }

  const visible = filter === 'todos' ? events : events.filter(e => e.category === filter);

  const grouped = visible.reduce((acc, e) => {
    const day = new Date(e.starts_at).toLocaleDateString('es-MX', { weekday:'long', day:'2-digit', month:'long' });
    (acc[day] ||= []).push(e);
    return acc;
  }, {});

  return (
    <section className="section">
      <div className="container" style={{maxWidth: 880}}>
        <header className="text-center" style={{maxWidth: 720, margin: '0 auto'}}>
          <span className="tag">Calendario</span>
          <h1 className="mt-2">Bienestar en agenda</h1>
          <p className="lede">
            Eventos universitarios de bienestar: talleres, círculos, deporte y actividades culturales.
            {student?.code && ' Marca los que te interesan para verlos en "Mi historia".'}
          </p>
        </header>

        <div className="filters mt-3">
          {CATEGORIES.map(c => (
            <button key={c} className={`chip ${filter === c ? 'active':''}`} onClick={() => setFilter(c)}>
              {CAT_ICON[c] || ''} {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        {loading ? <div className="spinner" style={{margin:'40px auto'}} /> :
         visible.length === 0 ? (
          <div className="panel text-center mt-3">
            <p className="note">
              No hay eventos próximos en esta categoría.
              {' '}<Link to="/recursos">Mira los recursos disponibles →</Link>
            </p>
          </div>
        ) : Object.entries(grouped).map(([day, dayEvents]) => (
          <section key={day} className="day-section">
            <h3 className="day-title">{day}</h3>
            <div className="day-events">
              {dayEvents.map(e => (
                <article key={e.id} className="event-card">
                  <div className="evt-icon" aria-hidden="true">{CAT_ICON[e.category] || '✨'}</div>
                  <div className="evt-body">
                    <strong>{e.title}</strong>
                    <small>
                      🕐 {new Date(e.starts_at).toLocaleTimeString('es-MX', { hour:'2-digit', minute:'2-digit' })}
                      {e.ends_at && ` – ${new Date(e.ends_at).toLocaleTimeString('es-MX', { hour:'2-digit', minute:'2-digit' })}`}
                      {e.location && ` · 📍 ${e.location}`}
                    </small>
                    {e.description && <p>{e.description}</p>}
                    {e.organizer && <small className="note">{e.organizer}</small>}
                    <div className="evt-actions">
                      {student?.code && (
                        <button
                          className={`btn btn-sm ${myRsvps.has(e.id) ? 'btn-gold' : 'btn-primary'}`}
                          onClick={() => rsvp(e.id)}
                        >
                          {myRsvps.has(e.id) ? '✓ Apuntado(a)' : 'Me interesa'}
                        </button>
                      )}
                      {e.url && <a href={e.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">Más info →</a>}
                      {!student?.code && <Link to="/mi-historia" className="note">Crea código para apuntarte →</Link>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <style>{`
        .filters { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
        .chip {
          background: #fff;
          border: 1.5px solid var(--c-borde);
          border-radius: var(--r-pill);
          padding: 6px 14px;
          font-size: 0.84rem;
          color: var(--c-azul-800);
          cursor: pointer;
        }
        .chip.active { background: var(--c-azul-800); color: #fff; border-color: var(--c-azul-800); }
        .day-section { margin-top: 22px; }
        .day-title {
          color: var(--c-azul-800);
          font-size: 1rem;
          text-transform: capitalize;
          padding-bottom: 4px;
          border-bottom: 1px solid var(--c-borde-soft);
          margin-bottom: 10px;
        }
        .day-events { display: grid; gap: 10px; }
        .event-card {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 14px;
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 14px 16px;
        }
        .evt-icon {
          width: 44px; height: 44px;
          background: var(--c-azul-100);
          border-radius: 14px;
          display: grid; place-items: center;
          font-size: 1.4rem;
        }
        .evt-body strong { color: var(--c-azul-800); display: block; }
        .evt-body small { color: var(--c-gris); font-size: 0.84rem; display:block; margin-top: 2px; }
        .evt-body p { margin: 6px 0 0; font-size: 0.92rem; color: var(--c-texto-soft); }
        .evt-actions { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px; align-items: center; }
      `}</style>
    </section>
  );
}
