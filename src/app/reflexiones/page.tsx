"use client";

import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";

const TEMAS = ["Todas", "Fe", "Esperanza", "Fortaleza", "Amor"];

const REFLEXIONES = [
  {
    id: 1,
    titulo: "La roca inamovible",
    texto: "Nuestra fe en Dios es la roca que nos mantiene firmes. No es la ausencia de problemas, sino la presencia de Su paz lo que nos sostiene.",
    versiculo: "Salmos 62:2",
    cita: "Él solo es mi roca y mi salvación; es mi refugio, no resbalaré mucho.",
    tema: "Fe",
  },
  {
    id: 2,
    titulo: "El valor de una madre",
    texto: "A veces no entendemos todo lo que una madre hace por nosotros hasta que la vemos luchando. Su amor silencioso es un tesoro que merece ser valorado cada día.",
    versiculo: "Proverbios 31:28",
    cita: "Se levantan sus hijos y la llaman bienaventurada; y su marido también la alaba.",
    tema: "Amor",
  },
  {
    id: 3,
    titulo: "Nuevas fuerzas",
    texto: "Hay una fuente de energía que no proviene de nosotros mismos, sino de confiar plenamente en la promesa de Dios para cada nuevo día.",
    versiculo: "Isaías 40:31",
    cita: "Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas.",
    tema: "Fortaleza",
  },
  {
    id: 4,
    titulo: "Cada día es un regalo",
    texto: "Cuando la enfermedad llega, los días ordinarios se vuelven extraordinarios. Un café, una sonrisa o un abrazo cobran un nuevo y profundo significado.",
    versiculo: "Salmos 118:24",
    cita: "Este es el día que hizo Jehová; nos gozaremos y alegraremos en él.",
    tema: "Esperanza",
  },
  {
    id: 5,
    titulo: "Paz en la angustia",
    texto: "En las noches de incertidumbre, entregar nuestras cargas al Señor es lo único que calma el corazón y aquieta nuestra mente.",
    versiculo: "Filipenses 4:7",
    cita: "Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones.",
    tema: "Fe",
  },
  {
    id: 6,
    titulo: "Nunca rendirse",
    texto: "La esperanza no es la certeza de que todo saldrá bien, sino la decisión valiente de no soltar la mano de quien amas y seguir luchando.",
    versiculo: "Josué 1:9",
    cita: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes.",
    tema: "Fortaleza",
  },
  {
    id: 7,
    titulo: "Luz en el camino",
    texto: "Incluso en los pasillos más oscuros de un hospital, una palabra de aliento o una oración sincera puede iluminar todo el trayecto.",
    versiculo: "Salmos 119:105",
    cita: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.",
    tema: "Esperanza",
  },
  {
    id: 8,
    titulo: "El tiempo con quienes amas",
    texto: "La vida puede cambiar en un instante. Aprende a abrazar y escuchar hoy a quienes están contigo, sin posponer el amor que sientes por ellos.",
    versiculo: "Eclesiastés 3:1",
    cita: "Todo tiene su tiempo, y todo lo que se quiere debajo del cielo tiene su hora.",
    tema: "Amor",
  },
  {
    id: 9,
    titulo: "Confianza plena",
    texto: "Nuestra mente puede dudar ante el diagnóstico, pero nuestro espíritu descansa cuando decidimos confiar en el propósito perfecto del Creador.",
    versiculo: "Proverbios 3:5",
    cita: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia.",
    tema: "Fe",
  },
];

export default function ReflexionesPage() {
  const [temaActivo, setTemaActivo] = useState("Todas");

  const reflexionesFiltradas = temaActivo === "Todas"
    ? REFLEXIONES
    : REFLEXIONES.filter((r) => r.tema === temaActivo);

  return (
    <main>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="reflexiones-hero">
        <p className="reflexiones-hero__eyebrow">Reflexiones y Palabra</p>
        <h1 className="reflexiones-hero__title">
          Mensajes de <em>luz y esperanza</em>
        </h1>
        <p className="reflexiones-hero__subtitle">
          "Su palabra es el bálsamo que restaura nuestra alma en cada paso."
        </p>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <div className="reflexiones-stats">
        <div className="reflexiones-stats__grid">
          {[
            { valor: REFLEXIONES.length, label: "Reflexiones" },
            { valor: "4",  label: "Categorías" },
            { valor: "∞",   label: "Promesas" },
            { valor: "🙏",  label: "Fe Viva" },
          ].map((s) => (
            <div key={s.label} className="reflexiones-stat">
              <span className="reflexiones-stat__value">{s.valor}</span>
              <span className="reflexiones-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FILTROS ──────────────────────────────────────── */}
      <div className="reflexiones-filtros-wrap">
        <AnimatedSection>
          <p className="reflexiones-filtros-eyebrow">Filtrar por tema</p>
          <h2 className="reflexiones-filtros-title">Busca la palabra que necesitas hoy</h2>
        </AnimatedSection>
        <div className="reflexiones-filtros">
          {TEMAS.map((tema) => (
            <button
              key={tema}
              className={`reflexiones-filtro-btn ${temaActivo === tema ? "active" : ""}`}
              onClick={() => setTemaActivo(tema)}
            >
              {tema}
            </button>
          ))}
        </div>
      </div>

      {/* ── GRID UNIFORME ──────────────────────────────────── */}
      <div className="reflexiones-grid-wrap">
        <div className="reflexiones-grid-uniform">
          {reflexionesFiltradas.map((r, i) => (
            <AnimatedSection key={r.id} delay={i * 0.05}>
              <div className={`reflexion-card-v3 reflexion-card-v3--${r.tema.toLowerCase()}`}>
                <div className="reflexion-card-v3__header">
                  <span className="reflexion-card-v3__tag">{r.tema}</span>
                  <span className="reflexion-card-v3__verse-ref">{r.versiculo}</span>
                </div>
                
                <h3 className="reflexion-card-v3__title">{r.titulo}</h3>
                <p className="reflexion-card-v3__text">{r.texto}</p>
                
                <div className="reflexion-card-v3__bible-box">
                  <p className="reflexion-card-v3__quote">"{r.cita}"</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* ── BLOCKQUOTE ───────────────────────────────────── */}
      <div className="reflexiones-bq-wrap">
        <AnimatedSection>
          <blockquote className="reflexiones-bq">
            <span className="reflexiones-bq__mark">"</span>
            <p className="reflexiones-bq__text">
              La palabra de Dios es medicina para nuestros huesos y alegría para nuestro corazón.
            </p>
            <footer className="reflexiones-bq__footer">— Mother&apos;s Hope</footer>
          </blockquote>
        </AnimatedSection>
      </div>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <div className="cta-banner">
              <p className="cta-banner__eyebrow">Comparte tu luz</p>
              <h2 className="cta-banner__title">¿Tienes una palabra de aliento?</h2>
              <p className="cta-banner__body">
                Si Dios ha puesto una reflexión en tu corazón, compártela con nosotros para bendecir a otros.
              </p>
              <Link href="/contacto" className="btn-base btn-white-ghost">
                Enviar mensaje →
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </main>
  );
}
