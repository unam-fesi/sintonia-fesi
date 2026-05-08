import { NavLink, Link } from 'react-router-dom';
import { useStudent } from '../hooks/useStudent.js';
import './Header.css';

export default function Header() {
  const { student } = useStudent();
  const loggedIn = !!student?.code;

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
          <NavLink to="/calendario">Calendario</NavLink>
          <NavLink to="/mapa">Mapa</NavLink>
          <NavLink to="/apoyo">Apoyo</NavLink>
          <NavLink to="/emociones">Emociones</NavLink>
          <NavLink to="/docentes">Docentes</NavLink>
          {loggedIn ? (
            <>
              <NavLink to="/companion">🤝 Pum-AI</NavLink>
              <NavLink to="/check-in">Check-in</NavLink>
              <NavLink to="/diario">Diario</NavLink>
              <NavLink to="/ruta">Mi ruta</NavLink>
              <NavLink to="/biblioteca">Biblioteca</NavLink>
              <NavLink to="/mi-historia">Mi historia</NavLink>
            </>
          ) : (
            <NavLink to="/mi-historia">Mi historia</NavLink>
          )}
          <NavLink to="/privacidad">Privacidad</NavLink>
          <Link to="/consentimiento" className="btn btn-primary btn-sm nav-cta">
            Iniciar orientación
          </Link>
        </nav>
      </div>
    </header>
  );
}
