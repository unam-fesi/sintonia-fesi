import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn, getAdminContext } from '../services/authService.js';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Si ya hay sesión válida, brincamos directo al panel
  useEffect(() => {
    (async () => {
      const ctx = await getAdminContext().catch(() => null);
      if (ctx) navigate('/admin', { replace: true });
    })();
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      const ctx = await getAdminContext();
      if (!ctx) {
        setError('Esta cuenta no tiene permisos administrativos.');
        return;
      }
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Credenciales incorrectas.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login-shell">
      <div className="login-card">
        <img
          src={`${import.meta.env.BASE_URL}Sintonia-icon192.png`}
          srcSet={`${import.meta.env.BASE_URL}Sintonia-icon192.png 1x, ${import.meta.env.BASE_URL}Sintonia-icon512.png 2x`}
          alt="Sintonía UNAM"
          className="login-mark"
          width="72" height="72"
        />
        <h1>Acceso interno</h1>
        <p className="lede text-center">Panel administrativo · Sintonía UNAM</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="field">
            <label htmlFor="email">Correo institucional</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="usuario@unam.mx"
            />
          </div>
          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{width: '100%'}}
            disabled={loading}
          >
            {loading ? 'Verificando…' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="note text-center mt-3">
          Solo personal autorizado. Si tu cuenta no aparece, contacta a la coordinación del programa.
        </p>
        <p className="text-center mt-2">
          <Link to="/" className="note">← Volver al sitio público</Link>
        </p>
      </div>

      <style>{`
        .login-shell {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 40px 20px;
          background:
            radial-gradient(circle at 30% 20%, rgba(201,162,39,0.18), transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(143,184,160,0.18), transparent 50%),
            linear-gradient(135deg, var(--c-azul-800), #0A1929);
        }
        .login-card {
          width: 100%;
          max-width: 440px;
          background: #fff;
          border-radius: var(--r-xl);
          padding: 36px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.35);
        }
        .login-mark {
          width: 72px; height: 72px;
          border-radius: 18px;
          object-fit: cover;
          display: block;
          margin: 0 auto 16px;
          box-shadow: var(--sh-md);
        }
        .login-card h1 {
          text-align: center;
          font-size: 1.6rem;
          margin: 0 0 4px;
        }
        .login-error {
          background: var(--c-coral-100);
          color: #93362A;
          border: 1px solid rgba(232,130,107,0.4);
          border-radius: 12px;
          padding: 10px 14px;
          font-size: 0.92rem;
          margin: 12px 0;
        }
      `}</style>
    </section>
  );
}
