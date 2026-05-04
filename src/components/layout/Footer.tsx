import Link from "next/link";

const LINKS_SITIO = [
  { href: "/",            label: "Inicio" },
  { href: "/historia",    label: "Historia" },
  { href: "/galeria",     label: "Galería" },
  { href: "/reflexiones", label: "Reflexiones" },
  { href: "/comentarios", label: "Comunidad" },
  { href: "/contacto",    label: "Contacto" },
];

const LINKS_LEGAL = [
  { href: "/privacidad",  label: "Privacidad" },
  { href: "/terminos",    label: "Términos" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__inner">
          {/* Marca */}
          <div>
            <p className="footer__brand-name">Mother&apos;s Hope</p>
            <p className="footer__brand-desc">
              Un espacio construido con propósito, historia y comunidad.
            </p>
          </div>

          {/* Sitio */}
          <div>
            <p className="footer__col-title">Sitio</p>
            <nav className="footer__links" aria-label="Mapa del sitio">
              {LINKS_SITIO.map(({ href, label }) => (
                <Link key={href} href={href} className="footer__link">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div>
            <p className="footer__col-title">Legal</p>
            <nav className="footer__links" aria-label="Legal">
              {LINKS_LEGAL.map(({ href, label }) => (
                <Link key={href} href={href} className="footer__link">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {year} Mother&apos;s Hope
            <span className="footer__dot" aria-hidden="true" />
            Todos los derechos reservados
          </p>
          <p className="footer__copy" aria-hidden="true">
            Hecho con cuidado ✦
          </p>
        </div>
      </div>
    </footer>
  );
}