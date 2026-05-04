"use client";

import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import Link from "next/link";

const DATOS = [
  {
    icon: <Mail size={20} />,
    label: "Email",
    valor: "alexcharco2002@gmail.com",
    href: "mailto:alexcharco2002@gmail.com",
  },
  {
    icon: <Phone size={20} />,
    label: "Teléfono",
    valor: "+593 99 880 4603",
    href: "tel:+593998804603",
  },
  {
    icon: <MapPin size={20} />,
    label: "Ubicación",
    valor: "Chimborazo, Ecuador",
    href: null,
  },
  {
    icon: <Clock size={20} />,
    label: "Disponibilidad",
    valor: "Lun – Sab, 8:00 – 18:00",
    href: null,
  },
];

import emailjs from "@emailjs/browser";

type FormState = { nombre: string; email: string; asunto: string; mensaje: string };

export default function ContactoPage() {
  const [form, setForm] = useState<FormState>({
    nombre: "", email: "", asunto: "", mensaje: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Leemos directamente de process.env
    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("Configuración de EmailJS incompleta:", { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY });
      setError("Error de configuración: Las claves de EmailJS no se detectan. Recuerda reiniciar el servidor (npm run dev) después de editar el archivo .env.");
      setLoading(false);
      return;
    }

    try {
      console.log("Intentando enviar con:", { 
        service: SERVICE_ID.slice(0, 5) + "...", 
        template: TEMPLATE_ID.slice(0, 5) + "...", 
        key: PUBLIC_KEY.slice(0, 5) + "..." 
      });

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.nombre,
          from_email: form.email,
          to_name: "Admin", // Puedes cambiar esto si tu plantilla usa otro nombre
          to_email: "alexcharco2002@gmail.com", // El destinatario final
          subject: form.asunto,
          message: form.mensaje,
          reply_to: form.email,
        },
        PUBLIC_KEY
      );

      console.log("✅ EmailJS Status:", response.status, response.text);

      if (response.status === 200) {
        setSent(true);
        setForm({ nombre: "", email: "", asunto: "", mensaje: "" });
      }
    } catch (err: any) {
      // DEBUG AGRESIVO:
      console.error("❌ ERROR DETECTADO EN EMAILJS:");
      console.error("Status:", err?.status);
      console.error("Text:", err?.text);
      console.error("Mensaje:", err?.message);
      
      const errorReal = err?.text || err?.message || JSON.stringify(err);
      setError(`Error: ${errorReal || "La clave de EmailJS es inválida o el servicio está desconectado."}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="contacto-hero">
        <p className="contacto-hero__eyebrow">Contacto</p>
        <h1 className="contacto-hero__title">
          Estamos aquí para <em>escucharte</em>
        </h1>
        <p className="contacto-hero__subtitle">
          "Cada mensaje que recibes es una oportunidad de conectar."
        </p>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <div className="contacto-stats">
        <div className="contacto-stats__grid">
          {[
            { valor: "24h",  label: "Tiempo de respuesta" },
            { valor: "100%", label: "Mensajes respondidos" },
            { valor: "♡",    label: "Con amor y atención" },
            { valor: "EC",   label: "Ecuador" },
          ].map((s) => (
            <div key={s.label} className="contacto-stat">
              <span className="contacto-stat__value">{s.valor}</span>
              <span className="contacto-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONTENIDO ────────────────────────────────────── */}
      <div className="contacto-wrap">
        <div className="contacto-inner">

          {/* ── INFO ── */}
          <AnimatedSection direction="left">
            <div className="contacto-info">
              <div className="contacto-info__header">
                <p className="contacto-info__eyebrow">Información</p>
                <h2 className="contacto-info__title">Hablemos</h2>
                <p className="contacto-info__desc">
                  Escríbenos con cualquier duda, historia o mensaje.
                  Nos pondremos en contacto a la brevedad.
                </p>
              </div>

              {DATOS.map((d) => (
                <div key={d.label} className="contacto-dato">
                  <div className="contacto-dato__icon">{d.icon}</div>
                  <div>
                    <p className="contacto-dato__label">{d.label}</p>
                    {d.href ? (
                      <a href={d.href} className="contacto-dato__valor">
                        {d.valor}
                      </a>
                    ) : (
                      <p className="contacto-dato__valor">{d.valor}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="contacto-nota">
                <p className="contacto-nota__text">
                  💚 Todas las consultas son respondidas con cariño.
                  Si conoces a alguien que necesita apoyo, no dudes en escribirnos.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* ── FORMULARIO ── */}
          <AnimatedSection direction="right">
            <div className="contacto-form-card">
              <p className="contacto-form-card__eyebrow">Escríbenos</p>
              <h3 className="contacto-form-card__title">Enviar mensaje</h3>

              {sent ? (
                <div className="contacto-success">
                  <span className="contacto-success__icon">✅</span>
                  <h4 className="contacto-success__title">¡Mensaje enviado!</h4>
                  <p className="contacto-success__text">
                    Gracias por escribirnos. Te responderemos pronto con mucho cariño.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contacto-field">

                  {/* Nombre + Email en fila */}
                  <div className="contacto-field-row">
                    <div>
                      <label className="contacto-label" htmlFor="nombre">Nombre</label>
                      <input
                        id="nombre"
                        className="contacto-input"
                        type="text"
                        name="nombre"
                        placeholder="Tu nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="contacto-label" htmlFor="email">Email</label>
                      <input
                        id="email"
                        className="contacto-input"
                        type="email"
                        name="email"
                        placeholder="tu@email.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Asunto */}
                  <div>
                    <label className="contacto-label" htmlFor="asunto">Asunto</label>
                    <input
                      id="asunto"
                      className="contacto-input"
                      type="text"
                      name="asunto"
                      placeholder="¿En qué podemos ayudarte?"
                      value={form.asunto}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label className="contacto-label" htmlFor="mensaje">Mensaje</label>
                    <textarea
                      id="mensaje"
                      className="contacto-input contacto-textarea"
                      name="mensaje"
                      placeholder="Cuéntanos tu historia o escribe tu mensaje..."
                      rows={5}
                      value={form.mensaje}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="contacto-submit"
                    disabled={loading}
                  >
                    {loading ? "Enviando..." : "Enviar mensaje →"}
                  </button>

                </form>
              )}
            </div>
          </AnimatedSection>

        </div>
      </div>

      {/* ── BLOCKQUOTE ───────────────────────────────────── */}
      <div className="contacto-bq-wrap">
        <AnimatedSection>
          <blockquote className="contacto-bq">
            <span className="contacto-bq__mark">"</span>
            <p className="contacto-bq__text">
              No hay mensaje pequeño cuando viene del corazón.
            </p>
            <footer className="contacto-bq__footer">— Mother&apos;s Hope</footer>
          </blockquote>
        </AnimatedSection>
      </div>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <div className="cta-banner">
              <p className="cta-banner__eyebrow">Sigue explorando</p>
              <h2 className="cta-banner__title">Hay más por descubrir</h2>
              <p className="cta-banner__body">
                Lee nuestra historia, explora la galería o únete a la comunidad.
              </p>
              <div className="flex-center-wrap">
                <Link href="/historia"     className="btn-base btn-white-ghost">Historia →</Link>
                <Link href="/galeria"      className="btn-base btn-white-ghost">Galería →</Link>
                <Link href="/comentarios"  className="btn-base btn-white-ghost">Comunidad →</Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </main>
  );
}