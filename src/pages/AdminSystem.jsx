import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient.js';
import { logAudit } from '../services/auditService.js';

export default function AdminSystem({ ctx }) {
  return (
    <>
      <header className="page-head">
        <div>
          <span className="tag azul">Sistema</span>
          <h1 className="mt-2">Configuración</h1>
          <p className="lede">Editor del prompt de Pum-AI y reglas de alertas operativas.</p>
        </div>
      </header>

      <PromptEditor ctx={ctx} />
      <AlertsConfig ctx={ctx} />
    </>
  );
}

function PromptEditor({ ctx }) {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);

  useEffect(() => { load(); }, []);
  async function load() {
    setLoading(true);
    const { data } = await supabase.from('system_config').select('*').eq('id', 'pumai_prompt').maybeSingle();
    setConfig(data?.data || {});
    setLoading(false);
  }

  async function save() {
    setMsg(null);
    const { data: before } = await supabase.from('system_config').select('data').eq('id','pumai_prompt').single();
    const { error } = await supabase
      .from('system_config')
      .upsert({ id: 'pumai_prompt', data: config, updated_by: ctx.admin.id, updated_at: new Date().toISOString() });
    if (error) {
      setMsg({type:'error', text: error.message});
    } else {
      await logAudit({ ctx, action:'update', entity:'prompt', entity_id:'pumai_prompt', before_data: before?.data, after_data: config });
      setMsg({type:'ok', text:'Configuración guardada. Tomará efecto en la siguiente invocación de la Edge Function.'});
    }
  }

  if (loading) return <div className="spinner" style={{margin:'24px auto'}} />;

  return (
    <section className="panel mt-3">
      <h2>Prompt de Pum-AI</h2>
      <p className="note">
        Define las reglas y tono que la IA debe seguir al generar la orientación.
        Cambios aplican a partir de la próxima sesión.
      </p>

      <div className="field mt-3">
        <label>Instrucción del sistema</label>
        <textarea
          value={config?.system || ''}
          onChange={e => setConfig({...config, system: e.target.value})}
          rows={8}
        />
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12}}>
        <div className="field">
          <label>Temperatura (0-1)</label>
          <input type="number" min="0" max="1" step="0.05"
            value={config?.temperature ?? 0.4}
            onChange={e => setConfig({...config, temperature: Number(e.target.value)})} />
        </div>
        <div className="field">
          <label>Max tokens</label>
          <input type="number" min="256" max="8192" step="128"
            value={config?.max_tokens ?? 2048}
            onChange={e => setConfig({...config, max_tokens: Number(e.target.value)})} />
        </div>
        <div className="field">
          <label>Activado</label>
          <select value={config?.enabled ? '1' : '0'}
            onChange={e => setConfig({...config, enabled: e.target.value === '1'})}>
            <option value="1">Sí</option>
            <option value="0">No (solo fallback)</option>
          </select>
        </div>
      </div>

      <button className="btn btn-primary" onClick={save}>Guardar</button>
      {msg && <p className={`feedback ${msg.type}`}>{msg.text}</p>}

      <p className="note mt-3">
        ⚠ Para que estos cambios tomen efecto, la Edge Function debe leer <code>system_config</code> al
        iniciar cada llamada. Puedo enviarte la versión actualizada de la function que lo hace
        cuando me digas.
      </p>

      <style>{`
        .feedback { padding: 10px 14px; border-radius: 12px; margin-top: 12px; font-size: 0.92rem; display: inline-block; }
        .feedback.ok    { background: var(--c-salvia-100); color: #2F8770; }
        .feedback.error { background: var(--c-coral-100); color: #93362A; }
      `}</style>
    </section>
  );
}

function AlertsConfig({ ctx }) {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);

  useEffect(() => { load(); }, []);
  async function load() {
    setLoading(true);
    const { data } = await supabase.from('system_config').select('*').eq('id','alerts_rules').maybeSingle();
    setConfig(data?.data || { priority_threshold: 30, priority_window_days: 7, notify_email: '', enabled: false });
    setLoading(false);
  }

  async function save() {
    setMsg(null);
    const { data: before } = await supabase.from('system_config').select('data').eq('id','alerts_rules').single();
    const { error } = await supabase
      .from('system_config')
      .upsert({ id: 'alerts_rules', data: config, updated_by: ctx.admin.id, updated_at: new Date().toISOString() });
    if (error) {
      setMsg({type:'error', text: error.message});
    } else {
      await logAudit({ ctx, action:'update', entity:'alerts', entity_id:'alerts_rules', before_data: before?.data, after_data: config });
      setMsg({type:'ok', text:'Reglas guardadas.'});
    }
  }

  if (loading) return null;

  return (
    <section className="panel mt-3">
      <h2>Alertas operativas</h2>
      <p className="note">
        Define umbrales para que el sistema notifique cuando demasiadas sesiones llegan a nivel
        prioritario en una ventana de tiempo. (Las notificaciones por email requieren
        configurar el envío de email del backend con un proveedor SMTP — Fase 2.)
      </p>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:12}}>
        <div className="field">
          <label>% de sesiones en nivel prioritario que disparan alerta</label>
          <input type="number" min="1" max="100"
            value={config.priority_threshold}
            onChange={e => setConfig({...config, priority_threshold: Number(e.target.value)})} />
        </div>
        <div className="field">
          <label>Ventana en días</label>
          <input type="number" min="1" max="90"
            value={config.priority_window_days}
            onChange={e => setConfig({...config, priority_window_days: Number(e.target.value)})} />
        </div>
        <div className="field">
          <label>Email de notificación</label>
          <input type="email" value={config.notify_email || ''}
            onChange={e => setConfig({...config, notify_email: e.target.value})}
            placeholder="alertas@unam.mx" />
        </div>
        <div className="field">
          <label>Estado</label>
          <select value={config.enabled ? '1' : '0'}
            onChange={e => setConfig({...config, enabled: e.target.value === '1'})}>
            <option value="0">Desactivadas</option>
            <option value="1">Activas</option>
          </select>
        </div>
      </div>

      <button className="btn btn-primary mt-2" onClick={save}>Guardar</button>
      {msg && <p className={`feedback ${msg.type}`}>{msg.text}</p>}
    </section>
  );
}
