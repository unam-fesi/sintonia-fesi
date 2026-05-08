import { useState } from 'react';
import { supabase } from '../config/supabaseClient.js';

export default function AdminSearch({ ctx }) {
  const [code, setCode] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  async function search(e) {
    e?.preventDefault();
    if (!code.trim()) return;
    setLoading(true); setErr(null); setResults(null);
    try {
      const { data, error } = await supabase
        .from('assessment_sessions')
        .select('id, anonymous_code, total_score, general_level, dimension_scores, top_attention_areas, created_at')
        .ilike('anonymous_code', `%${code.trim()}%`)
        .order('created_at', { ascending: false })
        .limit(20);
      if (error) throw error;
      setResults(data || []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="page-head">
        <div>
          <span className="tag">Búsqueda</span>
          <h1 className="mt-2">Buscar por código anónimo</h1>
          <p className="lede">
            Si una persona regresa con su código (ej. <code>SIN-XJS-4278</code>), aquí ves sus
            sesiones. Útil para acompañar evolución sin pedir datos personales.
          </p>
        </div>
      </header>

      <form className="panel" onSubmit={search} style={{display:'flex',gap:10,alignItems:'flex-end'}}>
        <div className="field" style={{flex:1, marginBottom:0}}>
          <label>Código anónimo</label>
          <input
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            placeholder="SIN-XXX-####"
            style={{fontFamily:'var(--ff-serif)', letterSpacing:'0.05em'}}
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Buscando…' : '🔍 Buscar'}
        </button>
      </form>

      {err && <p className="feedback error mt-2">{err}</p>}

      {results && (
        <section className="panel mt-3">
          <h2>Resultados ({results.length})</h2>
          {results.length === 0 && <p className="note">No se encontraron sesiones con ese código.</p>}
          <div className="results-list">
            {results.map(s => (
              <SessionRow key={s.id} session={s} ctx={ctx} />
            ))}
          </div>
        </section>
      )}

      <style>{`
        .feedback.error { background: var(--c-coral-100); color: #93362A; padding: 10px 14px; border-radius: 12px; }
        .results-list { display: grid; gap: 14px; }
      `}</style>
    </>
  );
}

function SessionRow({ session: s, ctx }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [saving, setSaving] = useState(false);

  async function loadNotes() {
    const { data } = await supabase
      .from('session_notes')
      .select('*')
      .eq('session_id', s.id)
      .order('created_at', { ascending: false });
    setNotes(data || []);
  }

  async function addNote(e) {
    e.preventDefault();
    if (!newNote.trim()) return;
    setSaving(true);
    const { error } = await supabase.from('session_notes').insert({
      session_id: s.id,
      admin_id: ctx.admin.id,
      admin_name: ctx.admin.full_name || ctx.admin.email,
      note: newNote.trim(),
    });
    if (!error) {
      setNewNote('');
      loadNotes();
    }
    setSaving(false);
  }

  function toggleNotes() {
    setShowNotes(s => {
      if (!s) loadNotes();
      return !s;
    });
  }

  return (
    <article className="srow">
      <header>
        <code>{s.anonymous_code}</code>
        <span className={`lvl-bg-${s.general_level}`} style={{padding:'3px 10px',borderRadius:8,fontSize:'0.78rem',fontWeight:700}}>
          {s.general_level}
        </span>
        <small>{new Date(s.created_at).toLocaleString('es-MX')}</small>
        <strong style={{marginLeft:'auto'}}>{s.total_score}/100</strong>
      </header>

      <div className="dims-mini">
        {Object.entries(s.dimension_scores || {}).map(([id, d]) => (
          <div key={id}>
            <small>{d.label}</small>
            <span className={`lvl-${d.level}`}>{d.score}</span>
          </div>
        ))}
      </div>

      <button className="btn btn-ghost btn-sm mt-2" onClick={toggleNotes}>
        {showNotes ? 'Ocultar' : 'Ver/agregar'} notas internas
      </button>

      {showNotes && (
        <div className="notes-area">
          <form onSubmit={addNote} style={{display:'flex',gap:8}}>
            <input
              value={newNote}
              onChange={e => setNewNote(e.target.value)}
              placeholder="Anotación visible solo para el equipo…"
              style={{flex:1,padding:'8px 10px',border:'1px solid var(--c-borde)',borderRadius:8}}
            />
            <button className="btn btn-primary btn-sm" disabled={saving || !newNote.trim()}>
              {saving ? '…' : 'Agregar'}
            </button>
          </form>
          <ul className="notes-list">
            {notes.length === 0 && <li className="note">Aún no hay notas.</li>}
            {notes.map(n => (
              <li key={n.id}>
                <strong>{n.admin_name || 'Anónimo'}</strong>
                <small>{new Date(n.created_at).toLocaleString('es-MX')}</small>
                <p>{n.note}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>{`
        .srow {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 16px;
        }
        .srow header {
          display: flex; gap: 10px; align-items: center;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }
        .srow header code { color: var(--c-azul-800); font-weight: 700; }
        .srow header small { color: var(--c-gris); font-size: 0.82rem; }
        .dims-mini { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px; }
        .dims-mini > div { padding: 6px 8px; background: var(--c-marfil); border-radius: 8px; }
        .dims-mini small { display:block; color: var(--c-gris); font-size: 0.78rem; }
        .dims-mini span { font-weight: 800; }

        .notes-area { background: var(--c-azul-100); padding: 12px; border-radius: 12px; margin-top: 10px; }
        .notes-list { list-style: none; padding: 0; margin: 12px 0 0; display: grid; gap: 8px; }
        .notes-list li { background: #fff; padding: 8px 12px; border-radius: 8px; }
        .notes-list strong { font-size: 0.86rem; color: var(--c-azul-800); }
        .notes-list small { color: var(--c-gris); font-size: 0.78rem; margin-left: 6px; }
        .notes-list p { margin: 4px 0 0; font-size: 0.92rem; }
      `}</style>
    </article>
  );
}
