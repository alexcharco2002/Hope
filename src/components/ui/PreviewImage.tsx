"use client";

import { useImageModal } from "@/context/ImageModalContext";
import { motion } from "framer-motion";

interface Props {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Componente de imagen que al hacer clic abre una previsualización a pantalla completa.
 * Utiliza clases CSS para evitar inline styles.
 */
export default function PreviewImage({ src, alt, className = "", style }: Props) {
  const { openModal } = useImageModal();

  return (
    <motion.img
      src={src}
      alt={alt}
      className={`${className} cursor-zoom-in`}
      style={style}
      onClick={() => openModal(src, alt)}
      whileHover={{ opacity: 0.9 }}
      whileTap={{ scale: 0.98 }}
    />
  );
}
