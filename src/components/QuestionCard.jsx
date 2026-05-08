import { LIKERT_OPTIONS } from '../data/fallbackQuestions.js';
import './QuestionCard.css';

export default function QuestionCard({ question, value, onChange, index }) {
  return (
    <article className="question-card" key={question.id}>
      <span className="question-number">PREGUNTA {index + 1}</span>
      <h2 className="question-text">{question.question_text}</h2>

      <div className="options" role="radiogroup" aria-label="Opciones de respuesta">
        {LIKERT_OPTIONS.map(opt => (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={value === opt.value}
            className={`option ${value === opt.value ? 'selected' : ''}`}
            onClick={() => onChange(opt.value)}
          >
            <span className="opt-mark" aria-hidden="true" />
            <span>{opt.label}</span>
          </button>
        ))}
      </div>
    </article>
  );
}
