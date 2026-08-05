import Image from "next/image";
import Link from "next/link";
import { OpenOrderButton } from "./ProfessionalOrderProvider";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <a
          className="brand-lockup brand-lockup--footer"
          href="https://innova-eyewear.com/"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            className="footer-innova-logo"
            src="/media/brand/innova-logo.png"
            alt="Innova Eyewear, distribuidor profesional de Alfred Kerbs"
            width={624}
            height={198}
          />
        </a>
        <p>Distribución profesional por Innova Eyewear para ópticas, cadenas retail y departamentos ópticos.</p>
      </div>
      <div className="footer-links">
        <div>
          <span>Explorar</span>
          <Link href="/marca">La marca</Link>
          <Link href="/historia">Historia</Link>
          <Link href="/filosofia">Filosofía</Link>
          <Link href="/catalogo">Catálogo</Link>
        </div>
        <div>
          <span>Innova Eyewear</span>
          <Link href="/catalogo">Selección de producto</Link>
          <Link href="/blog">Blog profesional</Link>
          <OpenOrderButton className="footer-order-link">Preparar pedido</OpenOrderButton>
          <a href="mailto:info@innova-eyewear.com">Correo comercial</a>
          <a href="https://wa.me/17542704613" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </div>
      <div className="footer-contact">
        <span>INNOVA EYEWEAR · EQUIPO COMERCIAL</span>
        <a href="mailto:info@innova-eyewear.com">info@innova-eyewear.com</a>
        <a href="tel:+17542704613">+1 (754) 270-4613</a>
        <a href="https://wa.me/17542704613" target="_blank" rel="noreferrer">WhatsApp</a>
        <a href="https://www.instagram.com/innova_eyewear/" target="_blank" rel="noreferrer">@innova_eyewear</a>
        <address>1206 Stirling Road Ste 3B<br />Dania Beach, FL 33004 · United States</address>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Innova Eyewear</span>
        <a href="https://www.alfredkerbs.com/privacy-policy" target="_blank" rel="noreferrer">
          Privacidad
        </a>
        <span>Alfred Kerbs · Distribución profesional</span>
      </div>
    </footer>
  );
}
