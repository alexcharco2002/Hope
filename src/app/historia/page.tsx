// src/app/historia/page.tsx
import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";
import PreviewImage from "@/components/ui/PreviewImage";

export const metadata: Metadata = { title: "Historia" };

const timelineItems = [
  { emoji: "🌅", sub: "Antes del diagnóstico",  titulo: "Todo parecía normal",           texto: "Nuestra vida en familia transcurría con normalidad, entre momentos familiares, risas y sueños. Nunca imaginamos que una noticia inesperada cambiaría nuestro rumbo.", lado: "left" },
  { emoji: "🔍", sub: "Los primeros síntomas",   titulo: "Las señales que no entendíamos", texto: "Comenzaron pequeños síntomas que parecían algo pasajero. Con el tiempo las preocupaciones crecieron y decidimos buscar ayuda médica.", lado: "right" },
  { emoji: "💔", sub: "El diagnóstico",           titulo: "El día que todo cambió",          texto: "Escuchar la palabra cáncer fue uno de los momentos más difíciles de nuestra vida. El miedo, la incertidumbre y las preguntas invadieron a toda la familia.", lado: "left" },
  { emoji: "💊", sub: "El tratamiento",           titulo: "La batalla más dura",             texto: "Hospitales, tratamientos y días difíciles se volvieron parte de nuestra rutina. Hubo momentos de cansancio y dolor, pero también Dios nos dio mucha esperanza.", lado: "right" },
  { emoji: "🙏", sub: "La fe y la familia",       titulo: "Nuestra mayor fortaleza",         texto: "La unión familiar y la fe en Dios nos ayudaron a seguir adelante cuando todo parecía imposible. Cada oración y abrazo nos daba nuevas fuerzas.", lado: "left" },
  { emoji: "✨", sub: "Aprendizajes",             titulo: "Lo que esta experiencia nos enseñó", texto: "Valorar el tiempo con nuestros seres queridos, agradecer cada día y nunca, jamás, perder la esperanza.", lado: "right" },
];

const galeriaItems = [
  { src: "/images/mama-3.webp", label: "Fe y Fortaleza",   clase: "historia-gal-card--span2" },
  { src: "/images/mama-4.webp", label: "Momentos juntos",  clase: "" },
  { src: "/images/mama-5.webp", label: "El tratamiento",   clase: "" },
  { src: "/images/mama-6.webp", label: "Luz de esperanza", clase: "" },
];

export default function HistoriaPage() {
  return (
    <main>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="historia-hero">
        <p className="historia-hero__eyebrow">Nuestra Historia</p>
        <h1 className="historia-hero__title">
          El camino que transformó <em>nuestras vidas</em> para siempre
        </h1>
        <p className="historia-hero__quote">
          "Maria perdió su cabello, pero jamás perdió su fe."
        </p>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <div className="historia-stats">
        <div className="historia-stats__grid">
          {[
            { valor: "7",  label: "Meses de tratamiento" },
            { valor: "∞",  label: "Momentos de esperanza" },
            { valor: "1",  label: "Familia que no se rindió" },
            { valor: "♡",  label: "Con amor infinito" },
          ].map((s) => (
            <div key={s.label} className="historia-stat">
              <span className="historia-stat__value">{s.valor}</span>
              <span className="historia-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── TIMELINE ─────────────────────────────────────── */}
      <div className="historia-tl-wrap">
        <AnimatedSection>
          <p className="historia-tl-eyebrow">Capítulo a capítulo</p>
          <h2 className="historia-tl-title">Conce nuestra historia</h2>
        </AnimatedSection>

        <div className="historia-timeline">
          {timelineItems.map((item, i) => (
            <AnimatedSection
              key={i}
              delay={i * 0.08}
              direction={item.lado === "left" ? "left" : "right"}
            >
              <div className={`historia-tl-item historia-tl-${item.lado}`}>
                <div className="historia-tl-box">
                  <span className="historia-tl-emoji">{item.emoji}</span>
                  <p className="historia-tl-sub">{item.sub}</p>
                  <h3 className="historia-tl-h">{item.titulo}</h3>
                  <p className="historia-tl-p">{item.texto}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* ── GALERÍA ──────────────────────────────────────── */}
      <div className="historia-gal-wrap">
        <AnimatedSection>
          <p className="historia-gal-eyebrow">Galería de momentos</p>
          <h2 className="historia-gal-title">Imágenes que guardan nuestra historia</h2>
        </AnimatedSection>
        <div className="historia-gal-grid">
          {galeriaItems.map((g, i) => (
            <AnimatedSection key={i} delay={i * 0.07}>
              <div className={`historia-gal-card ${g.clase}`}>
                <PreviewImage 
                  src={g.src} 
                  alt={g.label} 
                  className="media-block-img" 
                />
                <div className="historia-gal-card__info">
                   <span className="historia-gal-lbl">{g.label}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* ── BLOCKQUOTE ───────────────────────────────────── */}
      <div className="historia-bq-wrap">
        <AnimatedSection>
          <blockquote className="historia-bq">
            <span className="historia-bq__mark">"</span>
            <p className="historia-bq__text">
              "Alégrense en la esperanza, muestren paciencia en el sufrimiento, perseveren en la oración."
            </p>
            <footer className="historia-bq__footer">— Romanos 12:12</footer>
          </blockquote>
        </AnimatedSection>
      </div>

      {/* ── MENSAJE FINAL ────────────────────────────────── */}
      <div className="historia-msg-wrap">
        <AnimatedSection>
          <div className="historia-msg-grid">
            <div>
              <p className="historia-msg-eyebrow">Gracias</p>
              <h2 className="historia-msg-title">Por ser parte de nuestra historia</h2>
              <p className="historia-msg-body">
                Cada persona que nos ha acompañado en este camino ha dejado una huella.
                Tu presencia, tu apoyo y tu amor han sido parte fundamental de esta batalla.
              </p>
              <p className="historia-msg-body">
                Si conoces a alguien que está luchando, acompáñalo.
                A veces el amor y la compañía también sanan.
              </p>
              <div className="historia-msg-btns">
                <Link href="/contacto" className="btn-base btn--primary">
                  Escríbenos →
                </Link>
                <Link href="/galeria" className="btn-base btn--secondary">
                  Ver galería
                </Link>
              </div>
            </div>
            <div className="historia-msg-visual">
              <PreviewImage 
                src="/images/jesus.webp" 
                alt="Jesús y Mamá" 
                className="media-block-img" 
              />
              <div className="historia-msg-badge">
                <span className="historia-msg-badge__num">+7</span>
                <p className="historia-msg-badge__txt">meses de lucha y fe</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <div className="cta-banner">
              <p className="cta-banner__eyebrow">¿Tienes algo que decir?</p>
              <h2 className="cta-banner__title">Nos encanta escucharte</h2>
              <p className="cta-banner__body">
                Comparte tu experiencia, déjanos un mensaje o únete a nuestra comunidad.
              </p>
              <Link href="/comentarios" className="btn-base btn-white-ghost">
                Ir a Comunidad →
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </main>
  );
}