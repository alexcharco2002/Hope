"use client";

import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";
import PreviewImage from "@/components/ui/PreviewImage";
import { useImageModal } from "@/context/ImageModalContext";

const CATEGORIAS = ["Todas", "Familia", "Momentos", "Esperanza", "Videos"];

const ASSETS = [
  // Videos
  { id: 101, src: "/images/mama-video-1.mp4", type: "video", label: "Un momento de fuerza", categoria: "Videos", span: "" },
  { id: 102, src: "/images/mama-video-2.mp4", type: "video", label: "Compartiendo risas", categoria: "Videos", span: "" },
  
  // Imágenes principales
  { id: 1, src: "/images/mama-1.webp", type: "image", label: "Sonrisa", categoria: "Esperanza", span: "" },
  { id: 2, src: "/images/mama-2.webp", type: "image", label: "Fuerza", categoria: "Familia", span: "" },
  { id: 3, src: "/images/mama-3.webp", type: "image", label: "Paz", categoria: "Esperanza", span: "" },
  { id: 4, src: "/images/mama-4.webp", type: "image", label: "Unión", categoria: "Familia", span: "" },
  { id: 5, src: "/images/mama-5.webp", type: "image", label: "Camino", categoria: "Momentos", span: "" },
  { id: 6, src: "/images/mama-6.webp", type: "image", label: "Luz", categoria: "Esperanza", span: "" },
  { id: 7, src: "/images/mama-7.webp", type: "image", label: "Mirada", categoria: "Momentos", span: "" },
  { id: 8, src: "/images/mama-8.webp", type: "image", label: "Abrazo", categoria: "Familia", span: "" },
  { id: 9, src: "/images/mama-9.webp", type: "image", label: "Día especial", categoria: "Momentos", span: "" },
  { id: 10, src: "/images/mama-10.webp", type: "image", label: "Felicidad", categoria: "Esperanza", span: "" },
  { id: 11, src: "/images/mama-11.webp", type: "image", label: "Compañía", categoria: "Familia", span: "" },
  { id: 12, src: "/images/mama-12.webp", type: "image", label: "Recuerdo", categoria: "Momentos", span: "" },
  { id: 13, src: "/images/mama-13.webp", type: "image", label: "Paseo", categoria: "Momentos", span: "" },
  { id: 14, src: "/images/mama-14.webp", type: "image", label: "Amor", categoria: "Familia", span: "" },
  { id: 15, src: "/images/mama-15.webp", type: "image", label: "Vida", categoria: "Esperanza", span: "" },
  { id: 16, src: "/images/mama-16.webp", type: "image", label: "Instante", categoria: "Momentos", span: "" },
  { id: 17, src: "/images/mama-17.webp", type: "image", label: "Fe", categoria: "Esperanza", span: "" },
  { id: 18, src: "/images/mama-18.webp", type: "image", label: "Vínculo", categoria: "Familia", span: "" },
  { id: 19, src: "/images/mama-19.webp", type: "image", label: "Alegre", categoria: "Momentos", span: "" },
  { id: 20, src: "/images/mama-20.webp", type: "image", label: "Corazón", categoria: "Esperanza", span: "" },
  
  // Otras imágenes
  { id: 21, src: "/jesusymama.jpg", type: "image", label: "Jesús y Mamá", categoria: "Esperanza", span: "" },
  { id: 22, src: "/images/baños.webp", type: "image", label: "Baños", categoria: "Momentos", span: "" },
  { id: 23, src: "/images/jesus.webp", type: "image", label: "Jesús", categoria: "Esperanza", span: "" },
];

export default function GaleriaPage() {
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const { openModal } = useImageModal();

  const assetsFiltrados = categoriaActiva === "Todas"
    ? ASSETS
    : ASSETS.filter((f) => f.categoria === categoriaActiva);

  return (
    <main>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="galeria-hero">
        <p className="galeria-hero__eyebrow">Galería</p>
        <h1 className="galeria-hero__title">
          Cada imagen guarda <em>un momento</em> que no olvidamos
        </h1>
        <p className="galeria-hero__subtitle">
          Nuestra colección de recuerdos, fe y esperanza.
        </p>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <div className="galeria-stats">
        <div className="galeria-stats__grid">
          {[
            { valor: ASSETS.filter(a => a.type === 'image').length,  label: "Fotografías" },
            { valor: ASSETS.filter(a => a.type === 'video').length,   label: "Videos" },
            { valor: "∞",   label: "Recuerdos" },
            { valor: "♡",   label: "Con amor" },
          ].map((s) => (
            <div key={s.label} className="galeria-stat">
              <span className="galeria-stat__value">{s.valor}</span>
              <span className="galeria-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FILTROS + GRID ───────────────────────────────── */}
      <div className="galeria-filtros-wrap">
        <AnimatedSection>
          <p className="galeria-filtros-eyebrow">Nuestra colección</p>
          <h2 className="galeria-filtros-title">Imágenes que guardan nuestra historia</h2>
        </AnimatedSection>

        {/* Filtros */}
        <div className="galeria-filtros">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              className={`galeria-filtro-btn ${categoriaActiva === cat ? "active" : ""}`}
              onClick={() => setCategoriaActiva(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── GRID DE ASSETS ────────────────────────────────── */}
      <div className="galeria-grid-wrap">
        <div className="galeria-grid">
          {assetsFiltrados.map((asset, i) => (
            <AnimatedSection key={asset.id} delay={i * 0.04}>
              <div
                className="galeria-item"
                onClick={() => openModal(asset.src, asset.label, asset.type as "image" | "video")}
              >
                {asset.type === "video" ? (
                  <div className="galeria-item__video-wrap">
                    <video 
                      src={asset.src} 
                      className="galeria-item__video"
                      poster="/images/mama-5.webp"
                      muted
                      playsInline
                    />
                    <div className="galeria-item__label-overlay">
                      <span className="galeria-item__label">Video: {asset.label}</span>
                    </div>
                    <div className="galeria-item__overlay">
                      <span className="galeria-item__overlay-icon">▶</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="galeria-item__img">
                      <img 
                        src={asset.src} 
                        alt={asset.label} 
                        className="media-block-img" 
                      />
                      <span className="galeria-item__label-float">{asset.label}</span>
                    </div>
                    <div className="galeria-item__overlay">
                      <span className="galeria-item__overlay-icon">🔍</span>
                    </div>
                  </>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* ── BLOCKQUOTE ───────────────────────────────────── */}
      <div className="galeria-msg-wrap">
        <AnimatedSection>
          <blockquote className="galeria-bq">
            <span className="galeria-bq__mark">"</span>
            <p className="galeria-bq__text">
              "Me acordaré de las maravillas que el Señor ha hecho; sí, recordaré tus milagros de tiempos pasados."
            </p>
            <footer className="galeria-bq__footer">— Salmos 77:11</footer>
          </blockquote>
        </AnimatedSection>
      </div>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <div className="cta-banner">
              <p className="cta-banner__eyebrow">Comparte tu historia</p>
              <h2 className="cta-banner__title">¿Tienes fotos que quieras añadir?</h2>
              <p className="cta-banner__body">
                Escríbenos y cuéntanos tu historia. Cada imagen suma a nuestra memoria colectiva.
              </p>
              <Link href="/contacto" className="btn-base btn-white-ghost">
                Contáctanos →
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </main>
  );
}
