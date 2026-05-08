import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../config/supabaseClient.js';
import SafetyNotice from '../components/SafetyNotice.jsx';

export default function TeachersKit() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('student_library')
      .select('*').eq('category', 'teachers_kit').eq('active', true).order('title')
      .then(({ data }) => { setItems(data || []); setLoading(false); });
  }, []);

  return (
    <section className="section">
      <div className="container" style={{maxWidth:840}}>
        <header className="text-center" style={{maxWidth: 720, margin: '0 auto'}}>
          <span className="tag azul">Para docentes y tutores</span>
          <h1 className="mt-2">Kit pedagógico de bienestar</h1>
          <p className="lede">
            Recursos para acompañar a estudiantes desde tu rol docente. Orientaciones,
            dinámicas de integración, señales generales (no diagnósticas) y rutas de
            canalización dentro de la UNAM.
          </p>
        </header>

        <div className="kit-grid mt-4">
          <article className="kit-section">
            <h2>🎯 Señales generales de alerta</h2>
            <p className="note">No clínicas. Si notas varias en un estudiante de manera sostenida, considera abrir un espacio de conversación.</p>
            <ul style={{lineHeight: 1.7}}>
              <li>Cambios marcados en asistencia o desempeño</li>
              <li>Aislamiento del grupo o pérdida de vínculos</li>
              <li>Lenguaje de desesperanza, "no vale la pena"</li>
              <li>Cansancio extremo, dormir en clase</li>
              <li>Cambios bruscos de ánimo o irritabilidad</li>
              <li>Comentarios sobre autolesión o suicidio (acción inmediata)</li>
            </ul>
          </article>

          <article className="kit-section">
            <h2>💬 Cómo abrir conversación</h2>
            <ul style={{lineHeight: 1.7}}>
              <li><strong>Privado y sin prisa.</strong> "He notado que algo te ha estado pesando. ¿Cómo estás?"</li>
              <li><strong>Escucha sin interrumpir.</strong> Resiste el impulso de dar consejo inmediato.</li>
              <li><strong>Valida lo que sienten.</strong> "Tiene sentido que te sientas así dadas las circunstancias."</li>
              <li><strong>Comparte recursos, no diagnostiques.</strong> "¿Sabías que en /apoyo hay servicios universitarios?"</li>
              <li><strong>Acompaña, no resuelvas.</strong> Tu rol es ser puente, no terapeuta.</li>
            </ul>
          </article>

          <article className="kit-section">
            <h2>🚨 Canalización inmediata</h2>
            <p>Si un estudiante refiere ideación suicida, autolesión o crisis aguda:</p>
            <ol style={{lineHeight: 1.7}}>
              <li>No lo dejes solo(a). Si es virtual, pide su ubicación y contacto de apoyo.</li>
              <li>Llama con él/ella a <strong>Línea de la Vida 800 290 0024</strong> (24/7).</li>
              <li>Si hay peligro inminente, llama al <strong>911</strong>.</li>
              <li>Notifica a la coordinación correspondiente para seguimiento.</li>
              <li>Después, acércalo(a) a <Link to="/apoyo">los servicios universitarios</Link>.</li>
            </ol>
          </article>

          <article className="kit-section">
            <h2>🤝 Dinámicas breves de integración (5-15 min)</h2>
            <ul style={{lineHeight: 1.7}}>
              <li><strong>"Una palabra".</strong> Cada quien comparte una palabra que describa su semana.</li>
              <li><strong>Termómetro emocional.</strong> En escala 1-10, ¿dónde está tu energía hoy?</li>
              <li><strong>Pausa de 3 minutos.</strong> Antes de empezar clase: 1 min respiración, 1 min estiramiento, 1 min silencio.</li>
              <li><strong>Pregunta abierta.</strong> "¿Qué reto enfrentaste esta semana y cómo lo resolviste?"</li>
              <li><strong>Reconocimiento entre pares.</strong> Cada quien dice algo que aprecia de otro miembro del grupo.</li>
            </ul>
          </article>

          <article className="kit-section">
            <h2>🌱 Recomendaciones para fomentar bienestar grupal</h2>
            <ul style={{lineHeight: 1.7}}>
              <li>Incluye <strong>pausas activas</strong> de 5 minutos cada hora de clase.</li>
              <li>Modela <strong>vulnerabilidad sana</strong>: comparte que tú también tienes días difíciles.</li>
              <li>Crea <strong>rutinas predecibles</strong> en la clase: estructura reduce ansiedad.</li>
              <li>Invita a usar <strong>Sintonía UNAM</strong> al inicio del semestre y antes de exámenes.</li>
              <li>Comparte el código <strong>QR del aula</strong> con la URL de la plataforma.</li>
              <li>Promueve la <strong>diversidad de espacios</strong>: aula, jardín, biblioteca, exterior.</li>
            </ul>
          </article>

          <article className="kit-section">
            <h2>📞 Directorio de canalización</h2>
            <p>Servicios disponibles en la UNAM (consulta también <Link to="/apoyo">/apoyo</Link>):</p>
            <ul style={{lineHeight: 1.7}}>
              <li><strong>UEPI Iztacala</strong> · 5556231333 · uepi@iztacala.unam.mx</li>
              <li><strong>Servicios médicos UNAM</strong> · 5556227290</li>
              <li><strong>Línea de la Vida</strong> · 800 290 0024 · 24/7</li>
              <li><strong>SUAyED orientación</strong> · orientacion@suayed.unam.mx</li>
              <li><strong>Tutorías institucionales</strong> · tu coordinación de carrera</li>
            </ul>
          </article>
        </div>

        <h2 className="text-center mt-4">📚 Material complementario</h2>
        {loading ? <div className="spinner" /> : items.length === 0 ? (
          <p className="note text-center">Aún no hay material complementario cargado. La coordinación está agregándolo.</p>
        ) : (
          <div className="kit-grid mt-2">
            {items.map(it => (
              <article key={it.id} className="kit-section">
                <h3>{it.title}</h3>
                {it.body && <p>{it.body}</p>}
                {it.media_url && <a href={it.media_url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">Ver recurso →</a>}
              </article>
            ))}
          </div>
        )}

        <SafetyNotice variant="gold" className="mt-4">
          Este material es <strong>educativo</strong>, no clínico. Tu rol como docente es acompañar
          y canalizar, no diagnosticar ni intervenir clínicamente. Si tú mismo necesitas apoyo,
          también puedes acudir a los servicios universitarios.
        </SafetyNotice>
      </div>

      <style>{`
        .kit-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 14px;
        }
        .kit-section {
          background: #fff;
          border: 1px solid var(--c-borde);
          border-radius: var(--r-md);
          padding: 22px 26px;
        }
        .kit-section h2, .kit-section h3 {
          color: var(--c-azul-800);
          margin: 0 0 8px;
        }
        .kit-section h2 { font-size: 1.15rem; }
        .kit-section ol, .kit-section ul {
          padding-left: 20px;
        }
        .kit-section p { color: var(--c-texto-soft); }
      `}</style>
    </section>
  );
}
