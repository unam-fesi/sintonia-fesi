import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import InfoCard from '../components/InfoCard.jsx';
import SafetyNotice from '../components/SafetyNotice.jsx';
import { DailyQuote, DailyChallenge } from '../components/DailyContent.jsx';

const PILLARS = [
  { icon: '📝', accent: 'azul',    title: 'Evaluación breve',
    text: 'Veinte preguntas en aproximadamente siete a diez minutos.' },
  { icon: '📊', accent: 'oro',     title: 'Resultado informativo',
    text: 'Un panorama de tus dimensiones de bienestar, sin etiquetas clínicas.' },
  { icon: '🌿', accent: 'salvia',  title: 'Recomendaciones personalizadas',
    text: 'Acciones de autocuidado y vinculación con actividades universitarias.' },
  { icon: '🏛',  accent: 'coral',   title: 'Recursos universitarios',
    text: 'Orientación psicológica, deporte, cultura, comunidad y bienestar verde.' },
  { icon: '🤝', accent: 'lavanda', title: 'IA con responsabilidad',
    text: 'Te acompaña con redacción amable; nunca diagnostica ni sustituye atención profesional.' },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="section-sm">
        <div className="container" style={{maxWidth: 980}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
            <DailyQuote />
            <DailyChallenge />
          </div>
          <style>{`
            @media (max-width: 720px) {
              .section-sm > .container > div { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center" style={{maxWidth: 720, margin: '0 auto'}}>
            <span className="tag">Cómo te acompaña Sintonía UNAM</span>
            <h2 className="mt-2">Una orientación clara, anónima y con sentido comunitario</h2>
            <p className="lede">
              Sintonía UNAM es una plataforma para reflexionar sobre tu bienestar emocional,
              identificar áreas de autocuidado y conocer recursos de apoyo dentro de la UNAM.
            </p>
          </div>

          <div className="pillars">
            {PILLARS.map(p => (
              <InfoCard key={p.title} icon={p.icon} title={p.title} accent={p.accent}>
                {p.text}
              </InfoCard>
            ))}
          </div>

          <div className="continuity-card">
            <div className="continuity-icon" aria-hidden="true">🔁</div>
            <div>
              <span className="tag sage">¿Quieres seguir cuidándote?</span>
              <h3 className="mt-2">Tu código anónimo te abre un rincón propio</h3>
              <p>
                Si guardas tu código (ej. <code>SIN-XXX-####</code>) puedes regresar
                cuando quieras y obtener acceso a:
              </p>
              <ul className="continuity-list">
                <li>📝 <strong>Check-in semanal</strong> de 30 segundos</li>
                <li>📔 <strong>Diario emocional</strong> rápido (1 línea/día)</li>
                <li>🛤 <strong>Ruta de bienestar</strong> de 7 o 14 días personalizada</li>
                <li>🤝 <strong>Pum-AI acompañante</strong> para conversar cuando lo necesites</li>
                <li>📚 <strong>Biblioteca</strong> de respiraciones, sonidos y videos</li>
                <li>🗺 <strong>Aventura</strong> con pistas en el campus</li>
                <li>🌳 <strong>Adopta un árbol</strong> y cuídalo</li>
                <li>🫂 <strong>Buddy anónimo</strong> para conectar con otra persona</li>
                <li>📅 <strong>Calendario</strong> de eventos universitarios</li>
                <li>📊 <strong>Tu evolución</strong> a lo largo del tiempo</li>
              </ul>
              <p className="note">
                Sigue siendo <strong>100% anónimo</strong>: solo tu código y, si quieres, una contraseña.
                Nada de nombre, correo ni datos personales.
              </p>
              <div className="continuity-actions">
                <Link to="/mi-historia" className="btn btn-gold">Crear mi código anónimo</Link>
                <Link to="/consentimiento" className="btn btn-ghost">Solo hacer el test</Link>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .continuity-card {
            background: linear-gradient(135deg, var(--c-azul-100), var(--c-salvia-100));
            border: 1px solid rgba(255,184,156,0.4);
            border-radius: var(--r-xl);
            padding: 32px;
            margin-top: 28px;
            display: grid;
            grid-template-columns: 80px 1fr;
            gap: 24px;
            align-items: start;
          }
          .continuity-icon {
            width: 72px; height: 72px;
            border-radius: 20px;
            background: linear-gradient(135deg, var(--c-oro-600), var(--c-oro-400));
            display: grid; place-items: center;
            font-size: 2rem;
          }
          .continuity-card h3 {
            font-size: 1.4rem;
            color: var(--c-azul-800);
          }
          .continuity-list {
            list-style: none;
            padding: 0;
            margin: 14px 0 16px;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 6px 16px;
          }
          .continuity-list li {
            font-size: 0.94rem;
            color: var(--c-texto);
          }
          .continuity-actions {
            display: flex; gap: 10px; flex-wrap: wrap; margin-top: 12px;
          }
          @media (max-width: 720px) {
            .continuity-card { grid-template-columns: 1fr; padding: 22px; }
            .continuity-icon { width: 60px; height: 60px; font-size: 1.6rem; }
          }
        `}</style>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>¿Listo para iniciar?</h2>
              <p>
                La orientación es anónima. No solicitamos nombre, correo, teléfono ni número de cuenta.
                Tus respuestas se procesan para devolverte un panorama útil y recomendaciones.
              </p>
            </div>
            <div className="cta-actions">
              <Link to="/consentimiento" className="btn btn-primary btn-lg">Iniciar orientación</Link>
              <Link to="/recursos" className="btn btn-ghost">Ver recursos de apoyo</Link>
            </div>
          </div>

          <div className="mt-4">
            <SafetyNotice />
          </div>
        </div>
      </section>

      <style>{`
        .pillars {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-top: 28px;
        }
        .cta-band {
          background: linear-gradient(135deg, var(--c-azul-100), var(--c-oro-100));
          border: 1px solid var(--c-borde);
          border-radius: var(--r-xl);
          padding: 36px;
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 24px;
          align-items: center;
        }
        .cta-actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: flex-end; }
        @media (max-width: 740px) {
          .cta-band { grid-template-columns: 1fr; padding: 24px; }
          .cta-actions { justify-content: flex-start; }
        }
      `}</style>
    </>
  );
}
