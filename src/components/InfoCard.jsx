import './InfoCard.css';

export default function InfoCard({ icon = '✦', title, children, accent = 'azul' }) {
  return (
    <article className={`info-card accent-${accent}`}>
      <div className="info-icon" aria-hidden="true">{icon}</div>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}
