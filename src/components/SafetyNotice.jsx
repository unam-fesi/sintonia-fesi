import './SafetyNotice.css';

export default function SafetyNotice({ variant = 'default', children }) {
  return (
    <aside className={`safety-notice safety-${variant}`} role="note">
      <span className="safety-icon" aria-hidden="true">ⓘ</span>
      <div>
        {children || (
          <>
            <strong>Esta orientación es informativa.</strong> No constituye un diagnóstico
            médico ni psicológico, ni reemplaza la atención profesional. Si necesitas apoyo,
            acércate a los servicios de orientación y salud de la UNAM.
          </>
        )}
      </div>
    </aside>
  );
}
