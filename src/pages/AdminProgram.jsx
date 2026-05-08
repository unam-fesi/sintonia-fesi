// =============================================================
// Sintonía UNAM — Admin Programa
// CRUD de: árboles, eventos del calendario, treasure hunts, biblioteca, especialistas
// =============================================================

import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient.js';
import { logAudit } from '../services/auditService.js';

const TABS = [
  { id: 'trees',     label: '🌳 Árboles' },
  { id: 'events',    label: '📅 Eventos' },
  { id: 'hunts',     label: '🗺 Treasure Hunts' },
  { id: 'library',   label: '📚 Biblioteca' },
  { id: 'specialists', label: '🩺 Especialistas' },
];

export default function AdminProgram({ ctx }) {
  const [tab, setTab] = useState('trees');
  return (
    <>
      <header className="page-head">
        <div>
          <span className="tag sage">Programa</span>
          <h1 className="mt-2">Gestión del programa</h1>
          <p className="lede">Administra el contenido vivo del proyecto: árboles, eventos, aventuras, biblioteca y especialistas.</p>
        </div>
      </header>

      <div className="tabs">
        {TABS.map(t => (
          <button key={t.id} className={`tab-btn ${tab===t.id?'active':''}`} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      <div className="mt-3">
        {tab === 'trees'       && <TreesAdmin ctx={ctx} />}
        {tab === 'events'      && <EventsAdmin ctx={ctx} />}
        {tab === 'hunts'       && <HuntsAdmin ctx={ctx} />}
        {tab === 'library'     && <LibraryAdmin ctx={ctx} />}
        {tab === 'specialists' && <SpecialistsAdmin ctx={ctx} />}
      </div>

      <style>{`
        .tabs { display: flex; gap: 6px; flex-wrap: wrap; background: #fff; padding: 6px; border-radius: var(--r-pill); border: 1px solid var(--c-borde); width: fit-content; }
        .tab-btn { padding: 8px 16px; border-radius: var(--r-pill); background: transparent; border: 0; font-weight: 700; color: var(--c-azul-800); cursor: pointer; font-size: 0.9rem; }
        .tab-btn.active { background: var(--c-azul-800); color: #fff; }
        .grid-form { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        @media (max-width: 720px) { .grid-form { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}

// =============================================================
// TREES
// =============================================================
function TreesAdmin({ ctx }) {
  return (
    <CrudList
      ctx={ctx}
      table="tree_plantings"
      entity="trees"
      title="Árboles plantados"
      columns={[
        { key:'species', label:'Especie' },
        { key:'location_name', label:'Ubicación' },
        { key:'planted_at', label:'Plantado', format: v => v ? new Date(v).toLocaleDateString('es-MX') : '—' },
      ]}
      defaultRow={{ species:'', planted_at:'', location_name:'', location_lat:'', location_lng:'', notes:'', photo_url:'' }}
      Form={({ draft, setDraft }) => (
        <div className="grid-form">
          <div className="field"><label>Especie</label><input value={draft.species||''} onChange={e=>setDraft({...draft, species:e.target.value})} /></div>
          <div className="field"><label>Plantado el</label><input type="date" value={draft.planted_at||''} onChange={e=>setDraft({...draft, planted_at:e.target.value})} /></div>
          <div className="field"><label>Ubicación</label><input value={draft.location_name||''} onChange={e=>setDraft({...draft, location_name:e.target.value})} /></div>
          <div className="field"><label>Foto URL</label><input value={draft.photo_url||''} onChange={e=>setDraft({...draft, photo_url:e.target.value})} /></div>
          <div className="field"><label>Latitud</label><input type="number" step="0.0001" value={draft.location_lat||''} onChange={e=>setDraft({...draft, location_lat:e.target.value})} /></div>
          <div className="field"><label>Longitud</label><input type="number" step="0.0001" value={draft.location_lng||''} onChange={e=>setDraft({...draft, location_lng:e.target.value})} /></div>
          <div className="field" style={{gridColumn:'1 / -1'}}><label>Notas</label><textarea value={draft.notes||''} onChange={e=>setDraft({...draft, notes:e.target.value})} /></div>
        </div>
      )}
    />
  );
}

// =============================================================
// EVENTS
// =============================================================
function EventsAdmin({ ctx }) {
  return (
    <CrudList
      ctx={ctx}
      table="wellness_events"
      entity="wellness_events"
      title="Eventos universitarios"
      columns={[
        { key:'title', label:'Título' },
        { key:'category', label:'Categoría' },
        { key:'starts_at', label:'Inicia', format: v => v ? new Date(v).toLocaleString('es-MX') : '—' },
        { key:'active', label:'Activo', format: v => v ? '✅' : '⏸' },
      ]}
      defaultRow={{ title:'', description:'', category:'comunidad', starts_at:'', ends_at:'', location:'', faculty:'', organizer:'', url:'', capacity:'', active:true }}
      Form={({ draft, setDraft }) => (
        <div className="grid-form">
          <div className="field" style={{gridColumn:'1/-1'}}><label>Título</label><input value={draft.title||''} onChange={e=>setDraft({...draft, title:e.target.value})} /></div>
          <div className="field" style={{gridColumn:'1/-1'}}><label>Descripción</label><textarea value={draft.description||''} onChange={e=>setDraft({...draft, description:e.target.value})} /></div>
          <div className="field"><label>Categoría</label>
            <select value={draft.category||'comunidad'} onChange={e=>setDraft({...draft, category:e.target.value})}>
              <option value="psicologia">Psicología</option>
              <option value="deporte">Deporte</option>
              <option value="arte">Arte</option>
              <option value="sustentabilidad">Sustentabilidad</option>
              <option value="comunidad">Comunidad</option>
            </select>
          </div>
          <div className="field"><label>Capacidad</label><input type="number" value={draft.capacity||''} onChange={e=>setDraft({...draft, capacity:e.target.value})} /></div>
          <div className="field"><label>Inicia</label><input type="datetime-local" value={tsLocal(draft.starts_at)} onChange={e=>setDraft({...draft, starts_at:e.target.value})} /></div>
          <div className="field"><label>Termina</label><input type="datetime-local" value={tsLocal(draft.ends_at)} onChange={e=>setDraft({...draft, ends_at:e.target.value})} /></div>
          <div className="field"><label>Ubicación</label><input value={draft.location||''} onChange={e=>setDraft({...draft, location:e.target.value})} /></div>
          <div className="field"><label>Facultad</label><input value={draft.faculty||''} onChange={e=>setDraft({...draft, faculty:e.target.value})} /></div>
          <div className="field"><label>Organizador</label><input value={draft.organizer||''} onChange={e=>setDraft({...draft, organizer:e.target.value})} /></div>
          <div className="field"><label>URL</label><input value={draft.url||''} onChange={e=>setDraft({...draft, url:e.target.value})} /></div>
          <div className="field"><label>Activo</label><select value={draft.active?'1':'0'} onChange={e=>setDraft({...draft, active: e.target.value==='1'})}><option value="1">Sí</option><option value="0">No</option></select></div>
        </div>
      )}
    />
  );
}

function tsLocal(v) {
  if (!v) return '';
  const d = new Date(v);
  if (isNaN(d)) return '';
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off*60000).toISOString().slice(0,16);
}

// =============================================================
// SPECIALISTS
// =============================================================
function SpecialistsAdmin({ ctx }) {
  return (
    <CrudList
      ctx={ctx}
      table="specialists"
      entity="specialists"
      title="Especialistas para canalización"
      columns={[
        { key:'full_name', label:'Nombre' },
        { key:'specialty', label:'Especialidad' },
        { key:'faculty',   label:'Facultad' },
        { key:'active', label:'Activo', format: v => v ? '✅' : '⏸' },
      ]}
      defaultRow={{ full_name:'', specialty:'Psicología', email:'', phone:'', schedule:'', modality:'', faculty:'', active:true }}
      Form={({ draft, setDraft }) => (
        <div className="grid-form">
          <div className="field" style={{gridColumn:'1/-1'}}><label>Nombre / Servicio</label><input value={draft.full_name||''} onChange={e=>setDraft({...draft, full_name:e.target.value})} /></div>
          <div className="field"><label>Especialidad</label><input value={draft.specialty||''} onChange={e=>setDraft({...draft, specialty:e.target.value})} /></div>
          <div className="field"><label>Facultad</label><input value={draft.faculty||''} onChange={e=>setDraft({...draft, faculty:e.target.value})} /></div>
          <div className="field"><label>Email</label><input type="email" value={draft.email||''} onChange={e=>setDraft({...draft, email:e.target.value})} /></div>
          <div className="field"><label>Teléfono</label><input value={draft.phone||''} onChange={e=>setDraft({...draft, phone:e.target.value})} /></div>
          <div className="field"><label>Horario</label><input value={draft.schedule||''} onChange={e=>setDraft({...draft, schedule:e.target.value})} /></div>
          <div className="field"><label>Modalidad</label><input value={draft.modality||''} onChange={e=>setDraft({...draft, modality:e.target.value})} /></div>
          <div className="field"><label>Activo</label><select value={draft.active?'1':'0'} onChange={e=>setDraft({...draft, active:e.target.value==='1'})}><option value="1">Sí</option><option value="0">No</option></select></div>
        </div>
      )}
    />
  );
}

// =============================================================
// LIBRARY
// =============================================================
function LibraryAdmin({ ctx }) {
  return (
    <CrudList
      ctx={ctx}
      table="student_library"
      entity="student_library"
      title="Biblioteca para estudiantes"
      columns={[
        { key:'category', label:'Categoría' },
        { key:'title', label:'Título' },
        { key:'duration_sec', label:'Duración (seg)' },
        { key:'active', label:'Activo', format: v => v ? '✅' : '⏸' },
      ]}
      defaultRow={{ category:'breathing', title:'', body:'', media_url:'', duration_sec:'', active:true, meta:null }}
      Form={({ draft, setDraft }) => (
        <div className="grid-form">
          <div className="field"><label>Categoría</label>
            <select value={draft.category||'breathing'} onChange={e=>setDraft({...draft, category:e.target.value})}>
              <option value="breathing">Respiración</option>
              <option value="sound">Sonido</option>
              <option value="video">Video</option>
              <option value="dictionary">Diccionario emoción</option>
              <option value="quote">Frase</option>
              <option value="challenge">Reto</option>
              <option value="teachers_kit">Kit docente</option>
            </select>
          </div>
          <div className="field"><label>Duración (seg)</label><input type="number" value={draft.duration_sec||''} onChange={e=>setDraft({...draft, duration_sec:e.target.value})} /></div>
          <div className="field" style={{gridColumn:'1/-1'}}><label>Título</label><input value={draft.title||''} onChange={e=>setDraft({...draft, title:e.target.value})} /></div>
          <div className="field" style={{gridColumn:'1/-1'}}><label>Contenido / instrucciones</label><textarea rows={4} value={draft.body||''} onChange={e=>setDraft({...draft, body:e.target.value})} /></div>
          <div className="field" style={{gridColumn:'1/-1'}}><label>URL del media (audio/video)</label><input value={draft.media_url||''} onChange={e=>setDraft({...draft, media_url:e.target.value})} placeholder="https://..." /></div>
          <div className="field"><label>Activo</label><select value={draft.active?'1':'0'} onChange={e=>setDraft({...draft, active:e.target.value==='1'})}><option value="1">Sí</option><option value="0">No</option></select></div>
        </div>
      )}
    />
  );
}

// =============================================================
// HUNTS (game_events + game_clues)
// =============================================================
function HuntsAdmin({ ctx }) {
  const [hunts, setHunts] = useState([]);
  const [open, setOpen] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('game_events').select('*, clues:game_clues(*)').order('starts_at', { ascending: false });
    setHunts(data || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  if (loading) return <div className="spinner" style={{margin:'24px auto'}} />;

  return (
    <section className="panel">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Treasure Hunts ({hunts.length})</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setOpen('new')}>＋ Nueva aventura</button>
      </div>

      <div className="hunts-list mt-2">
        {hunts.map(h => (
          <article key={h.id} className="hunt-item">
            <header>
              <div>
                <strong>{h.title}</strong>
                <small>{h.active ? '🟢 activo' : '⏸ inactivo'} · {h.clues?.length || 0} pistas</small>
              </div>
              <button className="icon-btn" onClick={() => setOpen(h.id)}>✎ Editar</button>
            </header>
            {h.description && <p className="note">{h.description}</p>}
          </article>
        ))}
      </div>

      {open && <HuntEditor ctx={ctx} hunt={open === 'new' ? null : hunts.find(h => h.id === open)} onClose={() => { setOpen(null); load(); }} />}

      <style>{`
        .hunts-list { display: grid; gap: 10px; }
        .hunt-item { background: #fff; border: 1px solid var(--c-borde); border-radius: 12px; padding: 14px 16px; }
        .hunt-item header { display: flex; justify-content: space-between; align-items: flex-start; }
        .hunt-item small { display: block; color: var(--c-gris); font-size: 0.82rem; }
        .icon-btn { background: transparent; border: 1px solid var(--c-borde); padding: 6px 10px; border-radius: 8px; cursor: pointer; }
      `}</style>
    </section>
  );
}

function HuntEditor({ ctx, hunt, onClose }) {
  const [form, setForm] = useState(hunt || {
    title: '', description: '', reward_label: '', reward_image: '',
    starts_at: '', ends_at: '', active: true, clues: [],
  });
  const [saving, setSaving] = useState(false);

  function addClue() {
    setForm(f => ({
      ...f,
      clues: [...(f.clues || []), { clue_order: (f.clues?.length || 0) + 1, riddle: '', hint: '', unlock_after: 'always' }],
    }));
  }
  function updateClue(i, key, value) {
    setForm(f => ({ ...f, clues: f.clues.map((c, idx) => idx === i ? { ...c, [key]: value } : c) }));
  }
  function removeClue(i) {
    setForm(f => ({ ...f, clues: f.clues.filter((_, idx) => idx !== i) }));
  }

  async function save() {
    setSaving(true);
    try {
      let evId = hunt?.id;
      const evRow = {
        title: form.title, description: form.description,
        reward_label: form.reward_label, reward_image: form.reward_image,
        starts_at: form.starts_at, ends_at: form.ends_at,
        active: form.active,
      };
      if (!evId) {
        const { data, error } = await supabase.from('game_events').insert(evRow).select().single();
        if (error) throw error;
        evId = data.id;
        await logAudit({ ctx, action: 'create', entity: 'game_events', entity_id: evId, after_data: data });
      } else {
        const { error } = await supabase.from('game_events').update(evRow).eq('id', evId);
        if (error) throw error;
        await logAudit({ ctx, action: 'update', entity: 'game_events', entity_id: evId, after_data: evRow });
      }

      // Reemplazar pistas
      await supabase.from('game_clues').delete().eq('event_id', evId);
      for (const c of form.clues) {
        await supabase.from('game_clues').insert({
          event_id: evId,
          clue_order: c.clue_order,
          riddle: c.riddle,
          hint: c.hint,
          unlock_after: c.unlock_after,
          reveal_at_lat: c.reveal_at_lat || null,
          reveal_at_lng: c.reveal_at_lng || null,
        });
      }
      onClose();
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!hunt?.id) return;
    if (!confirm(`¿Eliminar la aventura "${hunt.title}"?`)) return;
    await supabase.from('game_events').delete().eq('id', hunt.id);
    await logAudit({ ctx, action: 'delete', entity: 'game_events', entity_id: hunt.id, before_data: hunt });
    onClose();
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <header>
          <h3>{hunt ? '✏️ Editar aventura' : '✨ Nueva aventura'}</h3>
          <button onClick={onClose}>✕</button>
        </header>
        <div className="grid-form">
          <div className="field" style={{gridColumn:'1/-1'}}><label>Título</label><input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} /></div>
          <div className="field" style={{gridColumn:'1/-1'}}><label>Descripción</label><textarea value={form.description||''} onChange={e=>setForm({...form, description:e.target.value})} /></div>
          <div className="field"><label>Inicio</label><input type="datetime-local" value={tsLocal(form.starts_at)} onChange={e=>setForm({...form, starts_at:e.target.value})} /></div>
          <div className="field"><label>Fin</label><input type="datetime-local" value={tsLocal(form.ends_at)} onChange={e=>setForm({...form, ends_at:e.target.value})} /></div>
          <div className="field" style={{gridColumn:'1/-1'}}><label>Recompensa</label><input value={form.reward_label||''} onChange={e=>setForm({...form, reward_label:e.target.value})} /></div>
          <div className="field"><label>Activo</label><select value={form.active?'1':'0'} onChange={e=>setForm({...form, active:e.target.value==='1'})}><option value="1">Sí</option><option value="0">No</option></select></div>
        </div>

        <h4 className="mt-3">Pistas</h4>
        {form.clues?.length === 0 && <p className="note">Aún sin pistas. Agrega al menos 1.</p>}
        {(form.clues || []).map((c, i) => (
          <div key={i} className="clue-edit">
            <header>
              <strong>Pista #{c.clue_order}</strong>
              <button onClick={() => removeClue(i)} className="icon-btn">🗑</button>
            </header>
            <div className="grid-form">
              <div className="field"><label>Orden</label><input type="number" value={c.clue_order} onChange={e=>updateClue(i, 'clue_order', Number(e.target.value))} /></div>
              <div className="field"><label>Desbloquea con</label>
                <select value={c.unlock_after||'always'} onChange={e=>updateClue(i, 'unlock_after', e.target.value)}>
                  <option value="always">Disponible al inicio</option>
                  <option value="checkin_count:1">1 check-in</option>
                  <option value="checkin_count:2">2 check-ins</option>
                  <option value="checkin_count:3">3 check-ins</option>
                  <option value="wellness_route_done">Completar ruta de bienestar</option>
                </select>
              </div>
              <div className="field" style={{gridColumn:'1/-1'}}><label>Adivinanza / pista</label><textarea value={c.riddle||''} onChange={e=>updateClue(i, 'riddle', e.target.value)} /></div>
              <div className="field" style={{gridColumn:'1/-1'}}><label>Hint adicional (opcional)</label><input value={c.hint||''} onChange={e=>updateClue(i, 'hint', e.target.value)} /></div>
              <div className="field"><label>Lat (opcional)</label><input type="number" step="0.0001" value={c.reveal_at_lat||''} onChange={e=>updateClue(i, 'reveal_at_lat', e.target.value)} /></div>
              <div className="field"><label>Lng (opcional)</label><input type="number" step="0.0001" value={c.reveal_at_lng||''} onChange={e=>updateClue(i, 'reveal_at_lng', e.target.value)} /></div>
            </div>
          </div>
        ))}
        <button className="btn btn-ghost btn-sm mt-2" onClick={addClue}>＋ Agregar pista</button>

        <div style={{display:'flex',gap:8,marginTop:18}}>
          <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? 'Guardando…' : '✓ Guardar aventura'}</button>
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          {hunt && <button className="btn btn-coral" onClick={remove} style={{marginLeft:'auto'}}>🗑 Eliminar</button>}
        </div>
      </div>
      <style>{`
        .overlay { position: fixed; inset: 0; background: rgba(10,25,41,0.5); display: grid; place-items: center; z-index: 100; padding: 16px; }
        .modal { background: #fff; border-radius: var(--r-xl); padding: 24px; max-width: 760px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 30px 80px rgba(0,0,0,0.4); }
        .modal header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .modal header h3 { margin: 0; }
        .modal header button { background: transparent; border: 0; cursor: pointer; font-size: 1.4rem; color: var(--c-gris); }
        .clue-edit { background: var(--c-marfil); border: 1px solid var(--c-borde-soft); border-radius: 12px; padding: 14px; margin-top: 10px; }
        .clue-edit header { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .icon-btn { background: transparent; border: 1px solid var(--c-borde); padding: 4px 8px; border-radius: 6px; cursor: pointer; }
      `}</style>
    </div>
  );
}

// =============================================================
// CrudList genérico
// =============================================================
function CrudList({ ctx, table, entity, title, columns, defaultRow, Form }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState({});
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from(table).select('*');
    setItems(data || []);
    setLoading(false);
  }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [table]);

  function startNew()  { setEditing('new'); setDraft({...defaultRow}); }
  function startEdit(r){ setEditing(r.id); setDraft({...r}); }

  async function save() {
    const payload = sanitize(draft);
    if (editing === 'new') {
      const { data, error } = await supabase.from(table).insert(payload).select().single();
      if (error) return alert(error.message);
      await logAudit({ ctx, action: 'create', entity, entity_id: data.id, after_data: data });
    } else {
      const before = items.find(i => i.id === editing);
      const { error } = await supabase.from(table).update(payload).eq('id', editing);
      if (error) return alert(error.message);
      await logAudit({ ctx, action: 'update', entity, entity_id: editing, before_data: before, after_data: payload });
    }
    setEditing(null); setDraft({}); load();
  }

  async function remove(r) {
    if (!confirm('¿Eliminar este registro?')) return;
    await supabase.from(table).delete().eq('id', r.id);
    await logAudit({ ctx, action: 'delete', entity, entity_id: r.id, before_data: r });
    load();
  }

  function sanitize(d) {
    const out = {...d};
    for (const k in out) {
      if (out[k] === '' && (k.endsWith('_at') || k.endsWith('_lat') || k.endsWith('_lng') || k === 'capacity' || k === 'duration_sec')) {
        out[k] = null;
      }
    }
    return out;
  }

  if (loading) return <div className="spinner" style={{margin:'24px auto'}} />;

  return (
    <section className="panel">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
        <h2>{title} ({items.length})</h2>
        <button className="btn btn-primary btn-sm" onClick={startNew}>＋ Nuevo</button>
      </div>

      {(editing === 'new' || editing) && (
        <div className="edit-area mt-3">
          <Form draft={draft} setDraft={setDraft} />
          <div style={{display:'flex',gap:8,marginTop:10}}>
            <button className="btn btn-primary btn-sm" onClick={save}>✓ Guardar</button>
            <button className="btn btn-ghost btn-sm" onClick={() => { setEditing(null); setDraft({}); }}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="table-wrap mt-3">
        <table className="admin-table">
          <thead>
            <tr>{columns.map(c => <th key={c.key}>{c.label}</th>)}<th></th></tr>
          </thead>
          <tbody>
            {items.length === 0 ? <tr><td colSpan={columns.length + 1} className="note text-center">Sin registros aún.</td></tr> :
              items.map(item => (
                <tr key={item.id}>
                  {columns.map(c => <td key={c.key}>{c.format ? c.format(item[c.key]) : (item[c.key] ?? '—')}</td>)}
                  <td className="actions-cell">
                    <button className="icon-btn" onClick={() => startEdit(item)}>✎</button>
                    <button className="icon-btn danger" onClick={() => remove(item)}>🗑</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .edit-area { background: var(--c-azul-100); padding: 14px; border-radius: 12px; }
        .actions-cell { display: flex; gap: 4px; }
        .icon-btn { background: transparent; border: 1px solid var(--c-borde); padding: 4px 8px; border-radius: 6px; cursor: pointer; }
        .icon-btn.danger { color: #93362A; border-color: var(--c-coral-500); }
      `}</style>
    </section>
  );
}
