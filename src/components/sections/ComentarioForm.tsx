// src/components/sections/ComentarioForm.tsx
// Este componente es el formulario para dejar un nuevo comentario en la página de comentarios.
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function ComentarioForm() {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // 1. Validación de campos vacíos
    if (!nombre.trim() || !mensaje.trim()) {
      setError("Por favor completa todos los campos.");
      return;
    }

    // 2. Límite de palabras (máximo 80 palabras por comentario)
    const palabras = mensaje.trim().split(/\s+/).length;
    if (palabras > 80) {
      setError("El mensaje es demasiado largo. Máximo 80 palabras.");
      return;
    }

    // 3. Control de Spam (Límite de 4 comentarios por sesión en este navegador)
    const MAX_COMENTARIOS = 4;
    const countKey = "user_comments_count";
    const currentCount = parseInt(localStorage.getItem(countKey) || "0");

    if (currentCount >= MAX_COMENTARIOS) {
      setError("Has alcanzado el límite de mensajes permitidos por ahora. ¡Gracias por tu participación!");
      return;
    }

    setLoading(true);

    try {
      const { error: sbError } = await supabase
        .from("comentarios")
        .insert([{ nombre: nombre.trim(), mensaje: mensaje.trim() }]);

      if (sbError) throw sbError;

      // Éxito
      setSuccess(true);
      setNombre("");
      setMensaje("");
      
      // Incrementar contador local de spam
      localStorage.setItem(countKey, (currentCount + 1).toString());

      // Recarga la lista después de 2s para mostrar el nuevo comentario
      setTimeout(() => {
        setSuccess(false);
        window.location.reload();
      }, 2000);

    } catch (err) {
      console.error(err);
      setError("Error al enviar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-container">
      <h3 className="form-title">
        Deja tu comentario
      </h3>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="success-message"
          >
            ✅ ¡Comentario enviado con éxito!
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="form-element">
        <div>
          <label className="form-label">
            Nombre
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            className="form-input"
            maxLength={50}
          />
        </div>

        <div>
          <label className="form-label">
            Mensaje
          </label>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escribe tu comentario..."
            rows={4}
            className="form-input"
            maxLength={1000}
          />
          <p style={{ fontSize: '0.7rem', color: 'var(--color-faint)', marginTop: '0.4rem' }}>
            Máximo 80 palabras permitidas.
          </p>
        </div>

        {error && (
          <p className="form-error">{error}</p>
        )}

        <motion.button
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.97 }}
          type="submit"
          disabled={loading}
          className="form-button"
        >
          {loading ? "Enviando..." : "Enviar comentario"}
        </motion.button>
      </form>
    </div>
  );
}
