// src/components/sections/HeroHome.tsx
// Componente de sección Hero para la página de inicio
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import PreviewImage from "@/components/ui/PreviewImage";

// constantes de animación
const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroHome() {
  return (
    <section className="hero-home">
      {/* Orbe radial de fondo */}
      <div className="hero-home__orb" aria-hidden />

      <div className="hero-home__inner">

        {/* Avatar circular */}
        <motion.div
          className="hero-home__avatar"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease }}
        >
          <div className="hero-home__avatar-inner">
            <PreviewImage src="/jesusymama.jpg" alt="Jesús y Mamá" className="hero-home__avatar-img" />
          </div>
          <div className="hero-home__avatar-ring" aria-hidden />
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          className="hero-home__eyebrow"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease }}
        >
          Bienvenido a Mother&apos;s Hope
        </motion.p>

        {/* Título */}
        <motion.h1
          className="hero-home__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
        >
          Historia, <em>galería</em>{" "}
          <br className="hero-home__br" />
          y comunidad
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          className="hero-home__subtitle"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.4, ease }}
        >
          Un espacio creado con propósito para compartir momentos,
          reflexiones y conectar con quienes forman parte de este camino.
        </motion.p>

        {/* Botones */}
        <motion.div
          className="hero-home__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease }}
        >
          <Link href="/historia" className="hero-home__btn hero-home__btn--primary">
            Nuestra historia
          </Link>
          <Link href="/galeria" className="hero-home__btn hero-home__btn--outline">
            Ver galería
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="hero-home__scroll cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          onClick={() => document.getElementById('next-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="hero-home__scroll-lines">
            <span /><span />
          </span>
          <span>Desplegar</span>
          <span className="hero-home__scroll-lines">
            <span /><span />
          </span>
          <motion.span
            className="hero-home__scroll-arrow"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </motion.div>
      </div>

      <style>{`
        .hero-home {
          min-height: 94vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: #0f1a18;
        }

        .hero-home__orb {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 55% at 50% 38%,
            rgba(30,107,94,0.26) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-home__inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: clamp(4rem, 8vh, 6rem) clamp(1.5rem, 6vw, 3rem);
          width: 100%;
          max-width: 780px;
          margin-inline: auto;
        }

        /* Avatar */
        .hero-home__avatar {
          position: relative;
          width: clamp(96px, 14vw, 140px);
          aspect-ratio: 1;
          margin-bottom: 2rem;
        }

        .hero-home__avatar-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(145deg, #2a8c7c, #1e6b5e);
          border: 3px solid rgba(255,255,255,0.1);
          box-shadow:
            0 0 0 1px rgba(30,107,94,0.4),
            0 12px 40px rgba(30,107,94,0.35),
            0 4px 12px rgba(0,0,0,0.4);
          overflow: hidden;
        }

        .hero-home__avatar-ring {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1.5px solid rgba(30,107,94,0.35);
          animation: pulse-ring 3s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes pulse-ring {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0.9; transform: scale(1.04); }
        }

        .hero-home__avatar-emoji {
          font-size: clamp(2.5rem, 5vw, 4rem);
          line-height: 1;
          user-select: none;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));
        }

        .hero-home__avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Eyebrow */
        .hero-home__eyebrow {
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.38);
          margin-bottom: 1rem;
          max-width: none;
        }

        /* Título */
        .hero-home__title {
          font-family: var(--font-display);
          font-size: clamp(2.6rem, 6vw, 4.5rem);
          line-height: 1.08;
          color: #f0ede8;
          margin-bottom: 1.25rem;
          letter-spacing: -0.01em;
        }

        .hero-home__title em {
          font-style: italic;
          color: #5ec4b0;
        }

        .hero-home__br { display: none; }
        @media (min-width: 480px) { .hero-home__br { display: block; } }

        /* Subtítulo */
        .hero-home__subtitle {
          color: rgba(240,237,232,0.5);
          font-size: clamp(0.95rem, 1.5vw, 1.05rem);
          line-height: 1.75;
          max-width: 44ch;
          margin-bottom: 2.5rem;
        }

        /* Botones */
        .hero-home__actions {
          display: flex;
          gap: 0.875rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .hero-home__btn {
          display: inline-flex;
          align-items: center;
          padding: 0.75rem 1.85rem;
          border-radius: 9999px;
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.18s ease;
          white-space: nowrap;
          letter-spacing: 0.01em;
        }

        .hero-home__btn:active { transform: scale(0.97); }

        .hero-home__btn--primary {
          background: rgba(255,255,255,0.1);
          color: #f0ede8;
          border: 1.5px solid rgba(255,255,255,0.22);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .hero-home__btn--primary:hover {
          background: rgba(255,255,255,0.18);
          border-color: rgba(255,255,255,0.4);
          transform: translateY(-1px);
        }

        .hero-home__btn--outline {
          background: rgba(30,107,94,0.18);
          color: #5ec4b0;
          border: 1.5px solid rgba(30,107,94,0.4);
        }
        .hero-home__btn--outline:hover {
          background: rgba(30,107,94,0.3);
          border-color: rgba(94,196,176,0.6);
          transform: translateY(-1px);
        }

        /* Scroll hint */
        .hero-home__scroll {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 3.5rem;
          color: rgba(240,237,232,0.25);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .hero-home__scroll-lines {
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .hero-home__scroll-lines span { display: block; height: 1px; background: rgba(240,237,232,0.2); border-radius: 2px; }
        .hero-home__scroll-lines span:nth-child(1) { width: 20px; }
        .hero-home__scroll-lines span:nth-child(2) { width: 10px; }

        .hero-home__scroll-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(240,237,232,0.18);
          font-size: 0.75rem;
          color: rgba(240,237,232,0.35);
          margin-left: 0.25rem;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .hero-home { min-height: 100svh; }
          .hero-home__actions { flex-direction: column; width: 100%; max-width: 280px; }
          .hero-home__btn { justify-content: center; padding: 0.8rem 1.5rem; }
          .hero-home__scroll-lines { display: none; }
        }
      `}</style>
    </section>
  );
}
