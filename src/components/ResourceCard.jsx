import { RESOURCE_TYPES } from '../data/fallbackResources.js';
import './ResourceCard.css';

export default function ResourceCard({ resource }) {
  const type = RESOURCE_TYPES.find(t => t.id === resource.type) || { label: resource.type, icon: '✦' };
  return (
    <article className="resource-card">
      <div className="resource-icon" aria-hidden="true">{type.icon}</div>
      <div className="resource-body">
        <span className="tag">{type.label}</span>
        <h3 className="mt-2">{resource.name}</h3>
        <p>{resource.description}</p>
        <ul className="resource-meta">
          {resource.audience && <li><strong>Público:</strong> {resource.audience}</li>}
          {resource.modality && <li><strong>Modalidad:</strong> {resource.modality}</li>}
          {resource.location && <li><strong>Ubicación:</strong> {resource.location}</li>}
          {resource.schedule && <li><strong>Horario:</strong> {resource.schedule}</li>}
          {resource.contact  && <li><strong>Contacto:</strong> {resource.contact}</li>}
        </ul>
      </div>
    </article>
  );
}
