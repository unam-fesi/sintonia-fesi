import { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../config/supabaseClient.js';

export default function PostTestFeedback({ sessionId }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    if (rating === 0) return;
    setSubmitting(true);
    if (isSupabaseConfigured) {
      try {
        await supabase.from('assessment_feedback').insert({
          session_id: sessionId || null,
          rating,
          comment: comment.trim() || null,
        });
      } catch (e) { console.warn(e); }
    }
    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="feedback-thanks">
        <p>✨ <strong>Gracias por tu retroalimentación.</strong> Nos ayuda a mejorar el programa.</p>
      </div>
    );
  }

  return (
    <div className="feedback-box">
      <h3>¿Cómo te pareció esta orientación?</h3>
      <div className="stars" role="radiogroup" aria-label="Calificación">
        {[1,2,3,4,5].map(n => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={rating === n}
            className={`star ${(hover || rating) >= n ? 'active' : ''}`}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(n)}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        placeholder="Comentario opcional…"
        value={comment}
        onChange={e => setComment(e.target.value)}
        rows={2}
      />
      <button className="btn btn-primary btn-sm" disabled={rating === 0 || submitting} onClick={submit}>
        {submitting ? 'Enviando…' : 'Enviar'}
      </button>

      <style>{`
        .feedback-box {
          background: var(--c-marfil);
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 18px;
          margin-top: 16px;
          text-align: center;
        }
        .feedback-box h3 { margin: 0 0 10px; color: var(--c-azul-800); font-size: 1.05rem; }
        .stars { display: inline-flex; gap: 4px; margin-bottom: 10px; }
        .star {
          background: transparent;
          border: 0;
          cursor: pointer;
          font-size: 2rem;
          color: var(--c-borde);
          transition: color var(--t), transform var(--t);
        }
        .star:hover { transform: scale(1.15); }
        .star.active { color: var(--c-oro-600); }
        .feedback-box textarea {
          width: 100%;
          margin: 8px 0;
          padding: 8px 12px;
          border: 1px solid var(--c-borde);
          border-radius: 10px;
          font-family: inherit;
          font-size: 0.92rem;
          resize: vertical;
        }
        .feedback-thanks {
          background: var(--c-salvia-100);
          color: #2F6048;
          padding: 14px 18px;
          border-radius: var(--r-md);
          margin-top: 16px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
