import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-card card fade-in">
            <span className="tag">Programa universitario · UNAM</span>
            <h1 className="mt-2">
              Sintonízate contigo, con tu <span style={{color: 'var(--c-oro-700)'}}>comunidad</span>
              {' '}y con tu bienestar.
            </h1>
            <p className="lede">
              Una autoevaluación breve, anónima y con recomendaciones personalizadas
              para reflexionar sobre tu bienestar emocional y conocer recursos de apoyo
              dentro de la UNAM.
            </p>
            <ul className="hero-checks">
              <li><strong>20 preguntas</strong> en 7 a 10 minutos</li>
              <li>Resultado <strong>informativo, anónimo y confidencial</strong></li>
              <li>Recomendaciones y vinculación con <strong>recursos universitarios</strong></li>
            </ul>
            <div className="hero-actions">
              <Link to="/consentimiento" className="btn btn-primary btn-lg">Iniciar orientación</Link>
              <Link to="/privacidad" className="btn btn-ghost">Aviso de privacidad</Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><strong>20</strong><span>preguntas</span></div>
              <div className="hero-stat"><strong>7-10</strong><span>minutos</span></div>
              <div className="hero-stat"><strong>0</strong><span>datos personales</span></div>
            </div>
          </div>

          <aside className="hero-visual fade-in" aria-hidden="true">
            <div className="orb-grid">
              <div className="orb azul"><div><span>🧠</span>Psicología</div></div>
              <div className="orb oro"><div><span>⚖️</span>Equilibrio</div></div>
              <div className="orb salvia"><div><span>🌿</span>Calma</div></div>
              <div className="orb coral"><div><span>🤝</span>Comunidad</div></div>
              <div className="orb marfil"><div><span>✨</span>Sintonía</div></div>
              <div className="orb lavanda"><div><span>🎨</span>Arte</div></div>
              <div className="orb salvia"><div><span>🏃</span>Deporte</div></div>
              <div className="orb azul"><div><span>📚</span>Estudio</div></div>
              <div className="orb oro"><div><span>💛</span>Bienestar</div></div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
