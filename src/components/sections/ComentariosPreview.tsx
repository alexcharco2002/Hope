//src/components/sections/ComentariosPreview.tsx
"use client";

import { useEffect, useState } from "react";
import ComentarioForm from "./ComentarioForm";
import { motion } from "framer-motion";
import { supabase, type Comentario } from "@/lib/supabase";

function getIniciales(nombre: string) {
  return nombre.trim().charAt(0).toUpperCase();
}

const AVATAR_COLORS: Record<string, string> = {
  A:"#d9ede9", B:"#f5e8df", C:"#d9ede9", D:"#e8e6e1",
  E:"#c8e6e1", F:"#f5e8df", G:"#d9ede9", H:"#fdf1eb",
};

function getAvatarBg(letra: string) {
  return AVATAR_COLORS[letra] ?? "var(--color-primary-light)";
}

export default function ComentariosPreview() {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComentarios() {
      const { data, error } = await supabase
        .from("comentarios")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (!error && data) {
        setComentarios(data);
      }
      setLoading(false);
    }

    fetchComentarios();
  }, []);

  return (
    <section className="comunidad-section">
      <div className="comunidad-inner">
        {/* Título */}
        <div className="comunidad-header">
          <p className="comunidad-eyebrow">
            Comunidad
          </p>

          <h2 className="comunidad-title">
            Lo que dicen nuestros visitantes
          </h2>

          <p className="comunidad-subtitle">
            Lee algunos comentarios y deja también tu mensaje.
          </p>
        </div>

        {/* Comentarios previos */}
        <div className="comunidad-grid">
          {loading ? (
            // Placeholder mientras carga
            [...Array(3)].map((_, i) => (
              <div key={i} className="comentario-card-v2 opacity-50">
                <div className="comentario-card-v2__avatar skeleton-avatar" />
                <div className="comentario-card-v2__content">
                  <div className="skeleton-box h-1 w-30 mb-2" />
                  <div className="skeleton-box h-2 w-full" />
                </div>
              </div>
            ))
          ) : comentarios.length > 0 ? (
            comentarios.map((comentario, i) => {
              const inicial = getIniciales(comentario.nombre);
              return (
                <motion.div
                  key={comentario.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="comentario-card-v2"
                >
                  <div
                    className="comentario-card-v2__avatar"
                    style={{ background: getAvatarBg(inicial) }}
                  >
                    {inicial}
                  </div>

                  <div className="comentario-card-v2__content">
                    <div className="comentario-card-v2__header">
                      <p className="comentario-card-v2__nombre">{comentario.nombre}</p>
                      <p className="comentario-card-v2__fecha">
                        {new Date(comentario.created_at).toLocaleDateString("es-EC", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <p className="comentario-card-v2__mensaje">{comentario.mensaje}</p>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="comentario-card text-center">
              <p className="comentario-mensaje">No hay mensajes aún. ¡Sé el primero en escribir!</p>
            </div>
          )}
        </div>

        {/* Formulario real */}
        <ComentarioForm />
      </div>
    </section>
  );
}
