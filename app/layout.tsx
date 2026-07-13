import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://dreamwebchile.cl",
  ),
  title: {
    default: "DreamWeb Chile | Soluciones digitales de principio a fin",
    template: "%s | DreamWeb Chile",
  },
  description:
    "Desarrollo web, software, automatización, inteligencia artificial e infraestructura para negocios en Chile.",
  applicationName: "DreamWeb Chile",
  creator: "DreamWeb Chile",
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "DreamWeb Chile",
    images: [{ url: "/og.png", width: 1728, height: 910, alt: "DreamWeb Chile - Soluciones digitales de principio a fin" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
