"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "/",            label: "Inicio" },
  { href: "/historia",    label: "Historia" },
  { href: "/galeria",     label: "Galería" },
  { href: "/reflexiones", label: "Reflexiones" },
  { href: "/comentarios", label: "Comunidad" },
];

export default function Header() {
  const pathname   = usePathname();
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  /* Detectar scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Cerrar drawer al navegar */
  useEffect(() => setOpen(false), [pathname]);

  /* Cerrar drawer con Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`header${scrolled ? " scrolled" : ""}`}
      role="banner"
    >
      {/* ── barra principal ── */}
      <div className="header__inner">
        {/* Logo */}
        <Link href="/" className="header__logo" aria-label="Mother's Hope — inicio">
          <Image 
            src="/aceitunas.png" 
            alt="Logo" 
            width={32} 
            height={32} 
            className="header__logo-img"
          />
          <span>Mother&apos;s <span className="header__logo-text-hope">Hope</span></span>
        </Link>

        {/* Navegación desktop */}
        <nav className="header__nav" aria-label="Navegación principal">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`header__nav-link${pathname === href ? " active" : ""}`}
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <Link href="/contacto" className="header__cta">
          Contacto
        </Link>

        {/* Botón hamburguesa — móvil */}
        <button
          type="button"
          className={`header__menu-btn${open ? " open" : ""}`}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open ? "true" : "false"}
          aria-controls="mobile-drawer"
          onClick={() => setOpen(!open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      {/* ── drawer móvil ── */}
      <nav
        id="mobile-drawer"
        className={`header__drawer${open ? " open" : ""}`}
        aria-label="Menú móvil"
        aria-hidden={open ? "false" : "true"}
      >
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`header__drawer-link${pathname === href ? " active" : ""}`}
            aria-current={pathname === href ? "page" : undefined}
            tabIndex={open ? 0 : -1}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/contacto"
          className="header__drawer-link header__drawer-link--highlight"
          tabIndex={open ? 0 : -1}
        >
          Contacto →
        </Link>
      </nav>
    </header>
  );
}
