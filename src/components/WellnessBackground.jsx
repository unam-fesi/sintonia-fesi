// =============================================================
// Sintonía UNAM — Background animado para páginas públicas
// 3 blobs orgánicos con drift continuo + partículas flotantes
// + parallax sutil ligado al scroll.
// Respeta prefers-reduced-motion.
// =============================================================

import { useEffect, useRef } from 'react';

const PARTICLES = [
  { x: 12, delay: 0,  duration: 24, size: 14, color: 'var(--c-salvia-400)', shape: 'leaf' },
  { x: 28, delay: 4,  duration: 28, size: 10, color: 'var(--c-oro-400)',    shape: 'circle' },
  { x: 42, delay: 9,  duration: 22, size: 12, color: 'var(--c-lavanda-500)', shape: 'leaf' },
  { x: 60, delay: 2,  duration: 30, size: 8,  color: 'var(--c-coral-500)',  shape: 'circle' },
  { x: 76, delay: 12, duration: 26, size: 14, color: 'var(--c-salvia-600)', shape: 'leaf' },
  { x: 88, delay: 6,  duration: 28, size: 10, color: 'var(--c-oro-600)',    shape: 'circle' },
  { x: 18, delay: 14, duration: 32, size: 8,  color: 'var(--c-lavanda-500)', shape: 'circle' },
  { x: 50, delay: 18, duration: 25, size: 12, color: 'var(--c-salvia-400)', shape: 'leaf' },
  { x: 68, delay: 8,  duration: 30, size: 9,  color: 'var(--c-oro-400)',    shape: 'circle' },
  { x: 32, delay: 16, duration: 26, size: 11, color: 'var(--c-coral-500)',  shape: 'leaf' },
];

export default function WellnessBackground() {
  const bgRef = useRef(null);

  useEffect(() => {
    // Respetar usuarios que prefieren menos animación
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let raf = null;
    function update() {
      if (!bgRef.current) return;
      const y = window.scrollY;
      // Parallax muy sutil — el background se mueve al ~15% del scroll
      bgRef.current.style.transform = `translateY(${y * -0.15}px)`;
      raf = null;
    }
    function onScroll() {
      if (raf == null) raf = requestAnimationFrame(update);
    }
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={bgRef} className="wellness-bg" aria-hidden="true">
      {/* Blobs orgánicos */}
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-blob bg-blob-3" />
      <div className="bg-blob bg-blob-4" />

      {/* Partículas flotantes */}
      <div className="bg-particles">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={`bg-particle bg-particle-${p.shape}`}
            style={{
              left: `${p.x}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.shape === 'circle' ? p.color : undefined,
              color: p.shape === 'leaf' ? p.color : undefined,
              animationDelay: `-${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          >
            {p.shape === 'leaf' && (
              <svg viewBox="0 0 16 16" width="100%" height="100%">
                <path d="M8 1 C 14 1, 15 9, 8 15 C 1 9, 2 1, 8 1 Z M 8 4 L 8 13" fill="currentColor" stroke="currentColor" strokeWidth="0.6" opacity="0.6"/>
              </svg>
            )}
          </span>
        ))}
      </div>

      <style>{`
        .wellness-bg {
          position: fixed;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          overflow: hidden;
          will-change: transform;
        }

        /* ===== Blobs ===== */
        .bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.32;
          will-change: transform;
        }
        .bg-blob-1 {
          width: 460px; height: 460px;
          top: -120px; left: -120px;
          background: radial-gradient(circle, var(--c-salvia-400), transparent 65%);
          animation: drift1 22s ease-in-out infinite;
        }
        .bg-blob-2 {
          width: 380px; height: 380px;
          top: 25%; right: -120px;
          background: radial-gradient(circle, var(--c-oro-400), transparent 65%);
          animation: drift2 26s ease-in-out infinite;
        }
        .bg-blob-3 {
          width: 500px; height: 500px;
          bottom: -150px; left: 25%;
          background: radial-gradient(circle, var(--c-lavanda-500), transparent 60%);
          animation: drift3 28s ease-in-out infinite;
        }
        .bg-blob-4 {
          width: 360px; height: 360px;
          bottom: 15%; right: 8%;
          background: radial-gradient(circle, var(--c-coral-500), transparent 65%);
          opacity: 0.18;
          animation: drift4 24s ease-in-out infinite;
        }

        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0)        scale(1); }
          33%      { transform: translate(50px, 30px)  scale(1.08); }
          66%      { transform: translate(-30px, 60px) scale(0.92); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0)        scale(1); }
          33%      { transform: translate(-40px, -30px) scale(1.05); }
          66%      { transform: translate(20px, 40px)  scale(0.95); }
        }
        @keyframes drift3 {
          0%, 100% { transform: translate(0, 0)        scale(1); }
          50%      { transform: translate(60px, -40px) scale(1.10); }
        }
        @keyframes drift4 {
          0%, 100% { transform: translate(0, 0)         scale(1); }
          33%      { transform: translate(-50px, 20px)  scale(0.95); }
          66%      { transform: translate(30px, -30px)  scale(1.08); }
        }

        /* ===== Partículas ===== */
        .bg-particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .bg-particle {
          position: absolute;
          bottom: -5%;
          opacity: 0;
          animation-name: rise;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          will-change: transform, opacity;
        }
        .bg-particle-circle { border-radius: 50%; }
        .bg-particle-leaf {
          display: inline-flex;
        }

        @keyframes rise {
          0%   { transform: translate(0,    0)        rotate(0deg);    opacity: 0; }
          10%  {                                       opacity: 0.5; }
          50%  { transform: translate(30px, -55vh)    rotate(180deg);  opacity: 0.45; }
          90%  {                                       opacity: 0.4; }
          100% { transform: translate(-40px, -110vh)  rotate(360deg);  opacity: 0; }
        }

        /* ===== Reduced motion ===== */
        @media (prefers-reduced-motion: reduce) {
          .bg-blob { animation: none; }
          .bg-particle { animation: none; opacity: 0; }
        }

        /* En móvil bajamos un poco la intensidad para no consumir bateria */
        @media (max-width: 720px) {
          .bg-blob { opacity: 0.22; filter: blur(50px); }
          .bg-blob-4 { display: none; }
          .bg-particle { opacity: 0.3 !important; }
        }
      `}</style>
    </div>
  );
}
