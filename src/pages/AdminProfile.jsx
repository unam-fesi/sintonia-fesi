import { useState } from 'react';
import { supabase } from '../config/supabaseClient.js';

const ROLE_LABEL = {
  admin: 'Administrador',
  analista: 'Analista',
  especialista: 'Especialista',
  coordinador: 'Coordinador',
};

export default function AdminProfile({ ctx, onUpdated }) {
  const [fullName, setFullName] = useState(ctx.admin.full_name || '');
  const [pw1, setPw1] = useState('');
  const [pw2, setPw2] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPw, setSavingPw] = useState(false);
  const [msg, setMsg] = useState(null);

  async function saveProfile(e) {
    e.preventDefault();
    setMsg(null);
    setSavingProfile(true);
    try {
      const { error } = await supabase
        .from('admin_users')
        .update({ full_name: fullName.trim() || null })
        .eq('id', ctx.admin.id);
      if (error) throw error;
      setMsg({ type: 'ok', text: 'Nombre actualizado.' });
      onUpdated?.();
    } catch (err) {
      setMsg({ type: 'error', text: err.message });
    } finally {
      setSavingProfile(false);
    }
  }

  async function changePassword(e) {
    e.preventDefault();
    setMsg(null);

    if (pw1.length < 8) {
      setMsg({ type: 'error', text: 'La contraseña debe tener al menos 8 caracteres.' });
      return;
    }
    if (pw1 !== pw2) {
      setMsg({ type: 'error', text: 'Las contraseñas no coinciden.' });
      return;
    }

    setSavingPw(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: pw1 });
      if (error) throw error;
      setPw1(''); setPw2('');
      setMsg({ type: 'ok', text: 'Contraseña actualizada exitosamente.' });
    } catch (err) {
      setMsg({ type: 'error', text: err.message });
    } finally {
      setSavingPw(false);
    }
  }

  return (
    <>
      <header className="page-head">
        <div>
          <span className="tag">Mi perfil</span>
          <h1 className="mt-2">Tu cuenta administrativa</h1>
          <p className="lede">
            Eres <strong>{ROLE_LABEL[ctx.admin.role]}</strong>. Aquí puedes actualizar tu nombre
            y cambiar tu contraseña.
          </p>
        </div>
      </header>

      {msg && (
        <p className={`feedback ${msg.type} mt-2`} role="status">{msg.text}</p>
      )}

      <div className="profile-grid">
        <section className="panel">
          <h2>Información</h2>
          <p className="note">El correo no se cambia desde aquí (lo gestiona la coordinación general).</p>
          <form onSubmit={saveProfile} className="mt-3">
            <div className="field">
              <label>Correo</label>
              <input type="email" value={ctx.admin.email} disabled />
            </div>
            <div className="field">
              <label>Nombre completo</label>
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} />
            </div>
            <div className="field">
              <label>Rol</label>
              <input type="text" value={ROLE_LABEL[ctx.admin.role]} disabled />
            </div>
            <button type="submit" className="btn btn-primary" disabled={savingProfile}>
              {savingProfile ? 'Guardando…' : 'Guardar cambios'}
            </button>
          </form>
        </section>

        <section className="panel">
          <h2>Cambiar contraseña</h2>
          <p className="note">Mínimo 8 caracteres. Recomendamos usar una mezcla de letras, números y símbolos.</p>
          <form onSubmit={changePassword} className="mt-3" autoComplete="off">
            <div className="field">
              <label>Nueva contraseña</label>
              <input
                type="password"
                value={pw1}
                onChange={e => setPw1(e.target.value)}
                minLength={8}
                required
                autoComplete="new-password"
              />
            </div>
            <div className="field">
              <label>Confirmar contraseña</label>
              <input
                type="password"
                value={pw2}
                onChange={e => setPw2(e.target.value)}
                minLength={8}
                required
                autoComplete="new-password"
              />
            </div>
            <button type="submit" className="btn btn-coral" disabled={savingPw}>
              {savingPw ? 'Actualizando…' : 'Cambiar contraseña'}
            </button>
          </form>
        </section>
      </div>

      <style>{`
        .profile-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-top: 12px;
        }
        .feedback {
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 0.92rem;
          display: inline-block;
        }
        .feedback.ok    { background: var(--c-salvia-100); color: #2F6048; }
        .feedback.error { background: var(--c-coral-100); color: #93362A; }
        @media (max-width: 880px) {
          .profile-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
