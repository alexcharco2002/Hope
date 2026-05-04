// src/components/ui/AnimatedSection.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export default function AnimatedSection({ 
  children, 
  delay = 0, 
  className,
  direction = "up" 
}: Props) {
  
  // Definimos el desplazamiento inicial basado en la dirección
  const variants = {
    up:    { initial: { opacity: 0, y: 40 },  animate: { opacity: 1, y: 0 } },
    down:  { initial: { opacity: 0, y: -40 }, animate: { opacity: 1, y: 0 } },
    left:  { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 40 },  animate: { opacity: 1, x: 0 } },
  };

  const selected = variants[direction];

  return (
    <motion.div
      initial={selected.initial}
      whileInView={selected.animate}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
