import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import InfoCard from '../components/InfoCard.jsx';
import SafetyNotice from '../components/SafetyNotice.jsx';

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
        </div>
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
