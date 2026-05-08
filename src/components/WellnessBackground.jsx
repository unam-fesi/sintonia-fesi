// =============================================================
// Sintonía UNAM — Background "marea de acuarela"
// Wash base con gradiente desplazándose lento + blobs gigantes con
// mix-blend-mode + parallax sutil al scroll. Tema wellness con
// lavanda dominante para sensación de calma.
// =============================================================

import { useEffect, useRef } from 'react';

export default function WellnessBackground() {
  const bgRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let raf = null;
    function update() {
      if (!bgRef.current) return;
      const y = window.scrollY;
      // Parallax sutil
      bgRef.current.style.transform = `translate3d(0, ${y * -0.10}px, 0)`;
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
      {/* Wash base que rota muy lento */}
      <div className="bg-wash" />

      {/* Blobs gigantes que se mezclan */}
      <div className="bg-blob bg-blob-lavender" />
      <div className="bg-blob bg-blob-sage" />
      <div className="bg-blob bg-blob-gold" />
      <div className="bg-blob bg-blob-coral" />
      <div className="bg-blob bg-blob-blue" />

      <style>{`
        .wellness-bg {
          position: fixed;
          inset: -10vh -10vw;     /* Sobre-cubre los bordes para que el parallax no muestre vacío */
          z-index: -1;
          pointer-events: none;
          overflow: hidden;
          will-change: transform;
        }

        /* ===== Wash base (gradiente desplazándose) ===== */
        .bg-wash {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg,
              rgba(183, 168, 217, 0.55) 0%,
              rgba(143, 184, 160, 0.45) 30%,
              rgba(232, 200, 104, 0.40) 60%,
              rgba(232, 130, 107, 0.35) 100%
            );
          background-size: 250% 250%;
          animation: washShift 32s ease-in-out infinite;
          opacity: 0.85;
        }
        @keyframes washShift {
          0%   { background-position:   0%   0%; }
          25%  { background-position: 100%  30%; }
          50%  { background-position: 100% 100%; }
          75%  { background-position:   0%  70%; }
          100% { background-position:   0%   0%; }
        }

        /* ===== Blobs de color que se mezclan ===== */
        .bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          mix-blend-mode: multiply;
          will-change: transform;
        }

        .bg-blob-lavender {
          width: 90vmax; height: 90vmax;
          top: -25vmax; left: -25vmax;
          background: radial-gradient(circle, var(--c-lavanda-500) 0%, transparent 55%);
          opacity: 0.75;
          animation: drift-1 38s ease-in-out infinite;
        }
        .bg-blob-sage {
          width: 80vmax; height: 80vmax;
          bottom: -20vmax; right: -15vmax;
          background: radial-gradient(circle, var(--c-salvia-400) 0%, transparent 55%);
          opacity: 0.7;
          animation: drift-2 42s ease-in-out infinite;
        }
        .bg-blob-gold {
          width: 70vmax; height: 70vmax;
          top: 20vh; right: -15vmax;
          background: radial-gradient(circle, var(--c-oro-400) 0%, transparent 60%);
          opacity: 0.55;
          animation: drift-3 36s ease-in-out infinite;
        }
        .bg-blob-coral {
          width: 60vmax; height: 60vmax;
          bottom: 10vh; left: -10vmax;
          background: radial-gradient(circle, var(--c-coral-500) 0%, transparent 60%);
          opacity: 0.45;
          animation: drift-4 44s ease-in-out infinite;
        }
        .bg-blob-blue {
          width: 65vmax; height: 65vmax;
          top: 50vh; left: 30vw;
          background: radial-gradient(circle, var(--c-azul-700) 0%, transparent 60%);
          opacity: 0.30;
          animation: drift-5 50s ease-in-out infinite;
        }

        @keyframes drift-1 {
          0%, 100% { transform: translate(0, 0)              scale(1); }
          25%      { transform: translate(20vw, 25vh)        scale(1.10); }
          50%      { transform: translate(40vw, -10vh)       scale(0.95); }
          75%      { transform: translate(-10vw, 30vh)       scale(1.05); }
        }
        @keyframes drift-2 {
          0%, 100% { transform: translate(0, 0)              scale(1); }
          33%      { transform: translate(-25vw, -20vh)      scale(1.08); }
          66%      { transform: translate(15vw, -10vh)       scale(0.92); }
        }
        @keyframes drift-3 {
          0%, 100% { transform: translate(0, 0)              scale(1); }
          50%      { transform: translate(-30vw, 25vh)       scale(1.15); }
        }
        @keyframes drift-4 {
          0%, 100% { transform: translate(0, 0)              scale(1); }
          33%      { transform: translate(35vw, -15vh)       scale(0.90); }
          66%      { transform: translate(20vw, 20vh)        scale(1.10); }
        }
        @keyframes drift-5 {
          0%, 100% { transform: translate(0, 0)              scale(1); }
          50%      { transform: translate(-20vw, -25vh)      scale(1.20); }
        }

        /* ===== Reduced motion: sin animación pero mantenemos colores ===== */
        @media (prefers-reduced-motion: reduce) {
          .bg-wash, .bg-blob { animation: none; }
        }

        /* ===== Mobile: bajamos blur para mejor performance ===== */
        @media (max-width: 720px) {
          .bg-blob { filter: blur(60px); }
          .bg-blob-blue { display: none; }
          .bg-blob-coral { display: none; }
        }
      `}</style>
    </div>
  );
}
