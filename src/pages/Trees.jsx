import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabaseClient.js';
import { useStudent } from '../hooks/useStudent.js';

export default function Trees() {
  const { student } = useStudent();
  const [trees, setTrees] = useState([]);
  const [myTrees, setMyTrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all | mine | available

  async function load() {
    setLoading(true);
    const { data: t } = await supabase.from('view_trees_with_care').select('*').order('planted_at', { ascending: false });
    setTrees(t || []);
    if (student?.code) {
      const mine = (t || []).filter(x => (x.caretakers || []).includes(student.code));
      setMyTrees(mine);
    }
    setLoading(false);
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [student?.code]);

  async function adopt(treeId) {
    if (!student?.code) {
      alert('Crea tu código anónimo desde "Mi historia" para adoptar árboles.');
      return;
    }
    const { error } = await supabase.from('tree_caretakers').insert({
      tree_id: treeId, anonymous_code: student.code,
    });
    if (error) {
      if (error.code === '23505') alert('Ya eres cuidador(a) de este árbol.');
      else alert(error.message);
      return;
    }
    // Logro
    await supabase.from('student_achievements').upsert({
      anonymous_code: student.code,
      achievement_key: 'tree_adopted',
    });
    load();
  }

  async function logAction(treeId, action, note = '') {
    if (!student?.code) return;
    await supabase.from('tree_care_log').insert({
      tree_id: treeId, anonymous_code: student.code, action, note,
    });
    if (action === 'visita') {
      await supabase.from('student_achievements').upsert({
        anonymous_code: student.code,
        achievement_key: 'wellness_walk',
      });
    }
  }

  const visible = filter === 'mine'      ? myTrees
                : filter === 'available' ? trees.filter(t => !(t.caretakers || []).includes(student?.code) && t.caretaker_count < 5)
                :                          trees;

  return (
    <section className="section">
      <div className="container" style={{maxWidth:980}}>
        <header className="text-center" style={{maxWidth: 720, margin: '0 auto'}}>
          <span className="tag sage">Bienestar verde</span>
          <h1 className="mt-2">Adopta un árbol, cuida tu bienestar 🌳</h1>
          <p className="lede">
            En la UNAM hay un proyecto de plantación. Cada árbol necesita ojos que lo visiten, lo
            rieguen y lo cuiden. Adoptar un árbol es un acto de cuidado mutuo:
            tú cuidas algo vivo y eso te cuida a ti.
          </p>
        </header>

        <div className="filters mt-3">
          <button className={`chip ${filter==='all'?'active':''}`} onClick={() => setFilter('all')}>Todos ({trees.length})</button>
          <button className={`chip ${filter==='available'?'active':''}`} onClick={() => setFilter('available')}>Sin adoptar</button>
          {student?.code && <button className={`chip ${filter==='mine'?'active':''}`} onClick={() => setFilter('mine')}>Mis árboles ({myTrees.length})</button>}
        </div>

        {loading ? <div className="spinner" style={{margin: '40px auto'}} /> : (
          <div className="trees-grid mt-3">
            {visible.length === 0 ? (
              <p className="note text-center">
                {filter === 'mine'
                  ? 'Aún no has adoptado árboles. ¡Adopta uno y empieza a cuidarlo!'
                  : 'No hay árboles registrados en esta vista.'}
              </p>
            ) : visible.map(t => {
              const isMine = (t.caretakers || []).includes(student?.code);
              return (
                <article key={t.id} className="tree-card">
                  {t.photo_url && <img src={t.photo_url} alt={t.species || 'árbol'} />}
                  <div className="tc-body">
                    <h3>🌳 {t.species || 'Árbol'}</h3>
                    {t.location_name && <small>📍 {t.location_name}</small>}
                    {t.planted_at && <small>📅 Plantado el {new Date(t.planted_at).toLocaleDateString('es-MX')}</small>}
                    <small>👥 {t.caretaker_count} cuidador{t.caretaker_count === 1 ? '' : 'es'}</small>
                    {t.notes && <p>{t.notes}</p>}

                    <div className="tc-actions">
                      {!student?.code ? (
                        <Link to="/mi-historia" className="btn btn-ghost btn-sm">Crear código para adoptar</Link>
                      ) : isMine ? (
                        <>
                          <button className="btn btn-gold btn-sm" onClick={() => logAction(t.id, 'visita', 'Visita registrada')}>
                            ✓ Registrar visita
                          </button>
                          <button className="btn btn-ghost btn-sm" onClick={() => logAction(t.id, 'riego', 'Lo regué')}>💧 Riego</button>
                        </>
                      ) : t.caretaker_count >= 5 ? (
                        <small className="note">Cupo de cuidadores lleno</small>
                      ) : (
                        <button className="btn btn-primary btn-sm" onClick={() => adopt(t.id)}>
                          🤝 Adoptar
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <section className="panel mt-4">
          <h2>¿Cómo cuidar a tu árbol?</h2>
          <ul style={{lineHeight: 1.7, paddingLeft: 20}}>
            <li><strong>Visítalo</strong> al menos una vez por semana.</li>
            <li><strong>Riégalo</strong> si lleva 5+ días sin lluvia y el suelo se ve seco.</li>
            <li><strong>Limpia</strong> hojas secas o basura de su base.</li>
            <li><strong>Observa</strong> si tiene plagas, hojas amarillas u otros signos.</li>
            <li><strong>Comparte</strong> tu visita en el Diario o con un buddy.</li>
          </ul>
          <p className="note">
            Visitar tu árbol es también una <strong>caminata corta</strong>: doble cuidado.
          </p>
        </section>
      </div>

      <style>{`
        .filters { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
        .chip {
          background: #fff;
          border: 1.5px solid var(--c-borde);
          border-radius: var(--r-pill);
          padding: 6px 14px;
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--c-azul-800);
          cursor: pointer;
        }
        .chip.active { background: var(--c-salvia-600); color: #fff; border-color: var(--c-salvia-600); }
        .trees-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 14px;
        }
        .tree-card {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          overflow: hidden;
        }
        .tree-card img { width: 100%; height: 160px; object-fit: cover; }
        .tc-body { padding: 16px; display: flex; flex-direction: column; gap: 4px; }
        .tc-body h3 { color: var(--c-azul-800); margin: 0; font-size: 1.05rem; }
        .tc-body small { color: var(--c-gris); font-size: 0.84rem; }
        .tc-body p { margin: 6px 0 0; font-size: 0.9rem; color: var(--c-texto-soft); }
        .tc-actions { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 12px; }
      `}</style>
    </section>
  );
}
