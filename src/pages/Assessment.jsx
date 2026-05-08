import { useEffect, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar.jsx';
import QuestionCard from '../components/QuestionCard.jsx';
import SafetyNotice from '../components/SafetyNotice.jsx';
import { fetchQuestions } from '../services/supabaseService.js';
import { submitAssessment } from '../services/assessmentService.js';
import { STORAGE_KEYS } from '../utils/constants.js';
import { generateAnonymousCode } from '../utils/anonymousCode.js';

export default function Assessment() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Validar consentimiento
  useEffect(() => {
    const c = sessionStorage.getItem(STORAGE_KEYS.CONSENT);
    if (!c) {
      navigate('/consentimiento', { replace: true });
      return;
    }
    let mounted = true;
    fetchQuestions().then(qs => {
      if (!mounted) return;
      setQuestions(qs);
      // Restaurar respuestas si existen
      try {
        const saved = sessionStorage.getItem(STORAGE_KEYS.ANSWERS);
        if (saved) setAnswers(JSON.parse(saved));
      } catch { /* noop */ }
      setLoading(false);
    });
    return () => { mounted = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persistir respuestas en sessionStorage para evitar pérdida al recargar
  useEffect(() => {
    if (!loading) {
      try { sessionStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers)); } catch { /* noop */ }
    }
  }, [answers, loading]);

  const total = questions.length;
  const current = questions[idx];
  const allAnswered = useMemo(
    () => questions.every(q => answers[q.id] !== undefined),
    [questions, answers]
  );

  function setValue(v) {
    if (!current) return;
    setAnswers(prev => ({ ...prev, [current.id]: v }));
  }

  function next() {
    if (idx < total - 1) setIdx(i => i + 1);
  }
  function prev() {
    if (idx > 0) setIdx(i => i - 1);
  }

  async function finish() {
    if (!allAnswered) {
      const firstUn = questions.findIndex(q => answers[q.id] === undefined);
      if (firstUn !== -1) setIdx(firstUn);
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const code = generateAnonymousCode();
      const result = await submitAssessment({
        questions, answers, anonymousCode: code,
      });
      sessionStorage.setItem(STORAGE_KEYS.RESULT, JSON.stringify(result));
      sessionStorage.setItem(STORAGE_KEYS.ANON_CODE, code);
      sessionStorage.removeItem(STORAGE_KEYS.ANSWERS);
      navigate('/resultado');
    } catch (e) {
      console.error(e);
      setError('No pudimos generar tu resultado en este momento. Intenta nuevamente en unos segundos.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <section className="section">
        <div className="container" style={{maxWidth: 720, textAlign: 'center'}}>
          <div className="spinner" style={{margin: '40px auto 18px'}} />
          <p className="lede">Preparando preguntas…</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container" style={{maxWidth: 820}}>
        <ProgressBar current={idx + 1} total={total} />

        {current && (
          <QuestionCard
            index={idx}
            question={current}
            value={answers[current.id]}
            onChange={setValue}
          />
        )}

        <div className="assess-actions mt-3">
          <button className="btn btn-ghost" onClick={prev} disabled={idx === 0}>← Anterior</button>
          {idx < total - 1 ? (
            <button
              className="btn btn-primary"
              onClick={next}
              disabled={answers[current?.id] === undefined}
            >
              Siguiente →
            </button>
          ) : (
            <button
              className="btn btn-coral btn-lg"
              onClick={finish}
              disabled={submitting || !allAnswered}
            >
              {submitting ? 'Generando orientación…' : 'Finalizar y ver resultado'}
            </button>
          )}
        </div>

        {!allAnswered && idx === total - 1 && (
          <p className="note text-center mt-3">
            Te faltan algunas preguntas por contestar. Usa "Anterior" para revisarlas.
          </p>
        )}

        {error && (
          <div className="mt-4">
            <SafetyNotice variant="warm">{error}</SafetyNotice>
          </div>
        )}

        <p className="text-center mt-4">
          <Link to="/" className="note">Salir y descartar respuestas</Link>
        </p>
      </div>

      <style>{`
        .assess-actions {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
      `}</style>
    </section>
  );
}
