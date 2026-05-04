// src/app/page.tsx
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import HeroHome from "@/components/sections/HeroHome";
import ComentariosPreview from "@/components/sections/ComentariosPreview";
import PreviewImage from "@/components/ui/PreviewImage";
import { Heart, Sparkles, Clock, Flame } from "lucide-react";

export default function HomePage() {
  return (
    <main>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <HeroHome />

      {/* ── HISTORIA PREVIEW ─────────────────────────────────── */}
      <section id="next-section" className="section section--surface">
        <div className="container">
          <div className="section-grid section-grid--2col">
            <AnimatedSection direction="left">
              <SectionTitle
                eyebrow="Nuestra historia"
                title="Un camino construido con propósito"
                subtitle="Conoce el origen, los valores y la evolución que dio vida a este proyecto."
              />
              <Button href="/historia" variant="primary">Leer historia →</Button>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="media-block">
                <PreviewImage 
                  src="/images/baños.webp" 
                  alt="Foto en baños" 
                  className="media-block-img" 
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── GALERÍA PREVIEW ──────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <SectionTitle
              eyebrow="Galería"
              title="Momentos que cuentan historias"
              subtitle="Recuerdos grabados en el corazón, instantes que capturan la esencia de una vida llena de luz."
              center
            />
          </AnimatedSection>

          <div className="gallery-grid">
            {[
              { src: "/images/mama-1.webp", alt: "Recuerdo 1" },
              { src: "/images/mama-2.webp", alt: "Recuerdo 2", className: "img-pos-5" },
              { src: "/images/mama-3.webp", alt: "Recuerdo 3" },
              { src: "/images/mama-4.webp", alt: "Recuerdo 4" },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="gallery-card gallery-card--preview">
                  <PreviewImage 
                    src={item.src} 
                    alt={item.alt} 
                    className={`media-block-img ${item.className || ""}`}
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="section-cta">
            <Button href="/galeria" variant="secondary">Ver toda la galería</Button>
          </div>
        </div>
      </section>

      {/* ── REFLEXIONES PREVIEW ──────────────────────────────── */}
      <section className="section section--surface">
        <div className="container">
          <AnimatedSection>
            <SectionTitle
              eyebrow="Reflexiones"
              title="Pensamientos que inspiran"
              subtitle="Ideas, aprendizajes y palabras que vale la pena compartir."
              center
            />
          </AnimatedSection>

          <div className="cards-grid">
            {[
              { 
                titulo: "El valor de una madre", 
                extracto: "A veces no entendemos todo lo que una madre hace por nosotros hasta que la vemos luchando por su vida. Su amor silencioso merece ser valorado cada día.",
                icon: <Heart size={24} />
              },
              { 
                titulo: "La fe en los momentos difíciles", 
                extracto: "Cuando todo parecía derrumbarse, la fe fue el refugio que nos dio fuerzas para seguir adelante incluso en los días más oscuros.",
                icon: <Sparkles size={24} />
              },
              { 
                titulo: "El tiempo con quienes amas", 
                extracto: "La vida puede cambiar en un instante. Aprende a abrazar, escuchar y amar hoy a quienes están contigo.",
                icon: <Clock size={24} />
              },
            ].map((r, i) => {
              // Lógica para limitar a 30 palabras
              const palabras = r.extracto.split(" ");
              const textoLimitado = palabras.length > 30 
                ? palabras.slice(0, 30).join(" ") + "..." 
                : r.extracto;

              return (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <article className="reflexion-card">
                    <div className="reflexion-card__icon">{r.icon}</div>
                    <p className="reflexion-card__eyebrow">Reflexión</p>
                    <h3 className="reflexion-card__title">{r.titulo}</h3>
                    <p className="reflexion-card__body">{textoLimitado}</p>
                  </article>
                </AnimatedSection>
              );
            })}
          </div>

          <div className="section-cta">
            <Button href="/reflexiones" variant="secondary">Ver todas las reflexiones</Button>
          </div>
        </div>
      </section>

      {/* ── COMENTARIOS desde Supabase ────────────────────────── */}
      <ComentariosPreview />

      {/* ── CTA CONTACTO ─────────────────────────────────────── */}
      <section className="section section--surface">
        <div className="container">
          <AnimatedSection>
            <div className="cta-banner">
              <p className="cta-banner__eyebrow">¿Tienes algo que decir?</p>
              <h2 className="cta-banner__title">Nos encanta escucharte</h2>
              <p className="cta-banner__body">
                Escríbenos, comparte tu experiencia o déjanos saber cómo podemos mejorar.
              </p>
              <Button 
                href="/contacto" 
                variant="ghost" 
                className="btn-white-ghost"
              >
                Ir a Contacto →
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </main>
  );
}
