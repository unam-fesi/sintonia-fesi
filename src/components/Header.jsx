import { NavLink, Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
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

        <nav className="nav" aria-label="Navegación principal">
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/recursos">Recursos</NavLink>
          <NavLink to="/mi-historia">Mi historia</NavLink>
          <NavLink to="/privacidad">Privacidad</NavLink>
          <Link to="/consentimiento" className="btn btn-primary btn-sm nav-cta">
            Iniciar orientación
          </Link>
        </nav>
      </div>
    </header>
  );
}
