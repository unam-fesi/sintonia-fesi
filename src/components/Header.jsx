import { NavLink, Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container topbar">
        <Link to="/" className="brand" aria-label="Sintonía UNAM, ir al inicio">
          <div className="brand-mark" aria-hidden="true">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path d="M3 18 C 7 8, 12 8, 15 18 S 23 28, 27 18"
                    stroke="#C9A227" strokeWidth="2.4" strokeLinecap="round" fill="none" />
              <circle cx="15" cy="6" r="2.2" fill="#C9A227" />
            </svg>
          </div>
          <div className="brand-copy">
            <strong>Sintonía UNAM</strong>
            <span>Bienestar emocional universitario</span>
          </div>
        </Link>

        <nav className="nav" aria-label="Navegación principal">
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/recursos">Recursos</NavLink>
          <NavLink to="/privacidad">Privacidad</NavLink>
          <Link to="/consentimiento" className="btn btn-primary btn-sm nav-cta">
            Iniciar orientación
          </Link>
        </nav>
      </div>
    </header>
  );
}
