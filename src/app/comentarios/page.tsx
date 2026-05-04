// src/app/comentarios/page.tsx
import type { Metadata } from "next";
import { supabase, type Comentario } from "@/lib/supabase";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ComentarioForm from "@/components/sections/ComentarioForm";
import Link from "next/link";

export const metadata: Metadata = { title: "Comunidad" };

async function getComentarios(): Promise<Comentario[]> {
  const { data, error } = await supabase
    .from("comentarios")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return [];
  return data ?? [];
}

function getIniciales(nombre: string) {
  return nombre.trim().charAt(0).toUpperCase();
}

// Colores de avatar por letra para variedad visual
const AVATAR_COLORS: Record<string, string> = {
  A:"#d9ede9", B:"#f5e8df", C:"#d9ede9", D:"#e8e6e1",
  E:"#c8e6e1", F:"#f5e8df", G:"#d9ede9", H:"#fdf1eb",
};
function getAvatarBg(letra: string) {
  return AVATAR_COLORS[letra] ?? "var(--color-primary-light)";
}

export default async function ComentariosPage() {
  const comentarios = await getComentarios();

  return (
    <main>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="comentarios-hero">
        <p className="comentarios-hero__eyebrow">Comunidad</p>
        <h1 className="comentarios-hero__title">
          Voces que nos <em>acompañan</em> en el camino
        </h1>
        <p className="comentarios-hero__subtitle">
          "Cada palabra de apoyo es una luz en los momentos oscuros."
        </p>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <div className="comentarios-stats">
        <div className="comentarios-stats__grid">
          {[
            { valor: comentarios.length.toString(), label: "Mensajes recibidos" },
            { valor: "∞",  label: "Amor compartido" },
            { valor: "1",  label: "Comunidad unida" },
            { valor: "♡",  label: "Con gratitud" },
          ].map((s) => (
            <div key={s.label} className="comentarios-stat">
              <span className="comentarios-stat__value">{s.valor}</span>
              <span className="comentarios-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONTENIDO PRINCIPAL ──────────────────────────── */}
      <div className="comentarios-wrap">
        <div className="comentarios-inner">

          {/* ── LISTA ── */}
          <div className="comentarios-lista-wrap">
            <AnimatedSection>
              <div className="comentarios-lista-header">
                <h2 className="comentarios-lista-title">Mensajes de la comunidad</h2>
                {comentarios.length > 0 && (
                  <span className="comentarios-count-badge">
                    💬 {comentarios.length} {comentarios.length === 1 ? "mensaje" : "mensajes"}
                  </span>
                )}
              </div>
            </AnimatedSection>

            <div className="comentarios-lista">
              {comentarios.length === 0 ? (
                <AnimatedSection>
                  <div className="comentarios-empty">
                    <span className="comentarios-empty__icon">💬</span>
                    <p className="comentarios-empty__text">
                      Sin mensajes aún. ¡Sé el primero en escribir!
                    </p>
                  </div>
                </AnimatedSection>
              ) : (
                comentarios.map((c, i) => (
                  <AnimatedSection key={c.id} delay={i * 0.05}>
                    <div className="comentario-card-v2">
                      {/* Avatar */}
                      <div
                        className="comentario-card-v2__avatar"
                        style={{ background: getAvatarBg(getIniciales(c.nombre)) }}
                      >
                        {getIniciales(c.nombre)}
                      </div>

                      {/* Contenido */}
                      <div className="comentario-card-v2__content">
                        <div className="comentario-card-v2__header">
                          <p className="comentario-card-v2__nombre">{c.nombre}</p>
                          <p className="comentario-card-v2__fecha">
                            {new Date(c.created_at).toLocaleDateString("es-EC", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <p className="comentario-card-v2__mensaje">{c.mensaje}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))
              )}
            </div>
          </div>

          {/* ── FORMULARIO sticky ── */}
          <aside className="comentarios-form-sticky">
            <AnimatedSection direction="right">
              <div className="comentarios-form-card">
                <p className="comentarios-form-card__eyebrow">Tu voz importa</p>
                <h3 className="comentarios-form-card__title">Deja tu mensaje</h3>
                <p className="comentarios-form-card__desc">
                  Comparte tu apoyo, experiencia o palabras de aliento.
                  Cada mensaje hace esta comunidad más grande.
                </p>
                <ComentarioForm />
              </div>
            </AnimatedSection>
          </aside>

        </div>
      </div>

      {/* ── BLOCKQUOTE ───────────────────────────────────── */}
      <div className="comentarios-bq-wrap">
        <AnimatedSection>
          <blockquote className="comentarios-bq">
            <span className="comentarios-bq__mark">"</span>
            <p className="comentarios-bq__text">
              Saber que no estás solo ya es la mitad del camino ganado.
            </p>
            <footer className="comentarios-bq__footer">— Mother&apos;s Hope</footer>
          </blockquote>
        </AnimatedSection>
      </div>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <div className="cta-banner">
              <p className="cta-banner__eyebrow">Sigue explorando</p>
              <h2 className="cta-banner__title">Conoce más de nuestra historia</h2>
              <p className="cta-banner__body">
                Lee nuestra historia, explora la galería o escríbenos directamente.
              </p>
              <div className="flex-center-wrap">
                <Link href="/historia" className="btn-base btn-white-ghost">
                  Ver historia →
                </Link>
                <Link href="/reflexiones" className="btn-base btn-white-ghost">
                  Reflexiones →
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </main>
  );
}