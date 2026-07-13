import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { SiteShell } from "./components/SiteShell";

export default function NotFound() {
  return (
    <SiteShell locale="es">
      <section className="not-found">
        <div className="container not-found-inner">
          <Compass size={40} />
          <span className="eyebrow">Error 404</span>
          <h1>Esta ruta no lleva a ninguna página.</h1>
          <p>Volvamos al inicio para encontrar el camino correcto.</p>
          <Link href="/" className="button button-primary"><ArrowLeft size={18} />Volver al inicio</Link>
        </div>
      </section>
    </SiteShell>
  );
}
