import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useStudent } from '../hooks/useStudent.js';
import './Header.css';

export default function Header() {
  const { student } = useStudent();
  const loggedIn = !!student?.code;
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null); // 'discover' | 'mine' | null
  const navRef = useRef(null);

  // Cierra menús al cambiar de ruta o click fuera
  useEffect(() => { setOpenMenu(null); }, [location.pathname]);
  useEffect(() => {
    function handler(e) {
      if (!navRef.current?.contains(e.target)) setOpenMenu(null);
    }
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  function toggle(name) {
    setOpenMenu(m => (m === name ? null : name));
  }

  const initials = loggedIn
    ? student.code.split('-').map(p => p[0]).join('').slice(0, 3)
    : '';

  return (
    <header className="site-header">
      <div className="container topbar">
        <Link to="/" className="brand" aria-label="Sintonía UNAM, ir al inicio">
          <img
            src={`${import.meta.env.BASE_URL}Sintonia-icon192.png`}
            srcSet={`${import.meta.env.BASE_URL}Sintonia-icon192.png 1x, ${import.meta.env.BASE_URL}Sintonia-icon512.png 2x`}
            alt="Sintonía UNAM"
            className="brand-logo"
            width="56" height="56"
          />
          <div className="brand-copy">
            <strong>Sintonía UNAM</strong>
            <span>Bienestar emocional universitario</span>
          </div>
        </Link>

        <nav className="nav" aria-label="Navegación principal" ref={navRef}>
          <NavLink to="/" end className="nav-link">Inicio</NavLink>

          {/* Conocer (público) */}
          <div className="dropdown">
            <button
              type="button"
              className={`nav-link drop-trigger ${openMenu === 'discover' ? 'active' : ''}`}
              onClick={() => toggle('discover')}
              aria-haspopup="true"
              aria-expanded={openMenu === 'discover'}
            >
              Conocer ▾
            </button>
            {openMenu === 'discover' && (
              <div className="drop-panel">
                <NavLink to="/recursos">📌 Recursos</NavLink>
                <NavLink to="/calendario">📅 Calendario</NavLink>
                <NavLink to="/mapa">🗺 Mapa</NavLink>
                <NavLink to="/emociones">📖 Emociones</NavLink>
              </div>
            )}
          </div>

          <NavLink to="/apoyo" className="nav-link">🆘 Apoyo</NavLink>

          {/* Mi rincón (logged-in) */}
          {loggedIn && (
            <div className="dropdown">
              <button
                type="button"
                className={`nav-link drop-trigger ${openMenu === 'mine' ? 'active' : ''}`}
                onClick={() => toggle('mine')}
                aria-haspopup="true"
                aria-expanded={openMenu === 'mine'}
              >
                Mi rincón ▾
              </button>
              {openMenu === 'mine' && (
                <div className="drop-panel">
                  <NavLink to="/mi-historia">📊 Mi historia</NavLink>
                  <NavLink to="/check-in">📝 Check-in</NavLink>
                  <NavLink to="/diario">📔 Diario</NavLink>
                  <NavLink to="/ruta">🛤 Mi ruta</NavLink>
                  <NavLink to="/companion">🤝 Pum-AI</NavLink>
                  <NavLink to="/biblioteca">📚 Biblioteca</NavLink>
                  <NavLink to="/aventura">🗺 Aventura</NavLink>
                  <NavLink to="/buddy">🫂 Buddy</NavLink>
                  <NavLink to="/arboles">🌳 Mis árboles</NavLink>
                </div>
              )}
            </div>
          )}

          {!loggedIn && <NavLink to="/mi-historia" className="nav-link">Mi historia</NavLink>}

          <NavLink to="/privacidad" className="nav-link nav-tiny">Privacidad</NavLink>

          {loggedIn ? (
            <Link to="/mi-historia" className="user-chip" title={`Tu código: ${student.code}`}>
              <span className="initials">{initials}</span>
              <small>{student.code}</small>
            </Link>
          ) : (
            <Link to="/consentimiento" className="btn btn-primary btn-sm nav-cta">
              Iniciar orientación
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
