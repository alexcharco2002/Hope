"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

/**
 * Componente de botón reutilizable con variantes y soporte para links.
 * Ahora utiliza clases de globals.css para evitar inline styles.
 */
export default function Button({ 
  href, 
  onClick, 
  variant = "primary", 
  children, 
  type = "button", 
  disabled,
  className = "" 
}: Props) {
  
  const variantClass = {
    primary: "btn--primary",
    secondary: "btn--secondary",
    ghost: "btn--ghost",
  }[variant];

  const fullClassName = `btn-base ${variantClass} ${disabled ? "btn-base--disabled" : ""} ${className}`;

  if (href) return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="btn-wrapper">
      <Link href={href} className={fullClassName}>
        {children}
      </Link>
    </motion.div>
  );

  return (
    <motion.button 
      whileHover={{ scale: disabled ? 1 : 1.02 }} 
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      type={type} 
      onClick={onClick} 
      disabled={disabled} 
      className={fullClassName}
    >
      {children}
    </motion.button>
  );
}
