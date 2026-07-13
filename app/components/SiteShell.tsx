"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  AtSign,
  CalendarDays,
  Check,
  ChevronRight,
  Cookie,
  Globe2,
  Mail,
  Menu,
  MessageCircle,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { getConsent, trackEvent } from "../lib/analytics";
import {
  bookingUrl,
  contactEmail,
  instagramUrl,
  labels,
  paths,
  type Locale,
  whatsappHref,
} from "../lib/site";

type Consent = {
  analytics: boolean;
  marketing: boolean;
};

function Brand() {
  return (
    <span className="brand" aria-label="DreamWeb Chile">
      <span className="brand-mark" aria-hidden="true">
        D<span>W</span>
      </span>
      <span className="brand-name">
        Dream<span>Web</span>
      </span>
    </span>
  );
}

function ConsentManager({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [consent, setConsent] = useState<Consent>({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem("dreamweb-consent");
      if (!saved) setVisible(true);
      else setConsent(getConsent());
    }, 0);

    const open = () => {
      setExpanded(true);
      setVisible(true);
    };
    window.addEventListener("dreamweb:open-consent", open);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("dreamweb:open-consent", open);
    };
  }, []);

  const save = (value: Consent) => {
    window.localStorage.setItem("dreamweb-consent", JSON.stringify(value));
    setConsent(value);
    setVisible(false);
    window.dispatchEvent(
      new CustomEvent("dreamweb:consent-change", { detail: value }),
    );
  };

  if (!visible) return null;

  const es = locale === "es";
  return (
    <section className="consent" aria-label={es ? "Preferencias de privacidad" : "Privacy preferences"}>
      <div className="consent-icon" aria-hidden="true">
        <Cookie size={20} />
      </div>
      <div className="consent-copy">
        <strong>{es ? "Tu privacidad, bajo tu control" : "Your privacy, under your control"}</strong>
        <p>
          {es
            ? "Usamos tecnologías necesarias y, solo si lo autorizas, medición y marketing."
            : "We use necessary technologies and, only with your permission, analytics and marketing."}
        </p>
        {expanded && (
          <div className="consent-options">
            <label>
              <input type="checkbox" checked disabled />
              <span>{es ? "Necesarias" : "Necessary"}</span>
              <small>{es ? "Siempre activas" : "Always active"}</small>
            </label>
            <label>
              <input
                type="checkbox"
                checked={consent.analytics}
                onChange={(event) =>
                  setConsent((current) => ({
                    ...current,
                    analytics: event.target.checked,
                  }))
                }
              />
              <span>{es ? "Analítica" : "Analytics"}</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={consent.marketing}
                onChange={(event) =>
                  setConsent((current) => ({
                    ...current,
                    marketing: event.target.checked,
                  }))
                }
              />
              <span>Marketing</span>
            </label>
          </div>
        )}
      </div>
      <div className="consent-actions">
        {!expanded && (
          <button className="button button-ghost button-sm" onClick={() => setExpanded(true)}>
            <SlidersHorizontal size={16} />
            {es ? "Configurar" : "Customize"}
          </button>
        )}
        <button className="button button-secondary button-sm" onClick={() => save({ analytics: false, marketing: false })}>
          {es ? "Rechazar" : "Reject"}
        </button>
        <button
          className="button button-primary button-sm"
          onClick={() => save(expanded ? consent : { analytics: true, marketing: true })}
        >
          <Check size={16} />
          {expanded ? (es ? "Guardar" : "Save") : es ? "Aceptar" : "Accept"}
        </button>
      </div>
    </section>
  );
}

function AnalyticsLoader() {
  useEffect(() => {
    const load = (consent: Consent) => {
      const gaId = process.env.NEXT_PUBLIC_GA_ID;
      if (consent.analytics && gaId && !document.querySelector("[data-dreamweb-ga]")) {
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        script.dataset.dreamwebGa = "true";
        document.head.appendChild(script);
        window.dataLayer = window.dataLayer || [];
        const gtag = (...args: unknown[]) => window.dataLayer?.push(args);
        gtag("js", new Date());
        gtag("config", gaId, { anonymize_ip: true });
      }

      const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
      if (consent.marketing && metaId && !document.querySelector("[data-dreamweb-meta]")) {
        const queue: unknown[][] = [];
        const fbq = (...args: unknown[]) => queue.push(args);
        Object.assign(fbq, { queue, loaded: true, version: "2.0" });
        window.fbq = fbq;
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://connect.facebook.net/en_US/fbevents.js";
        script.dataset.dreamwebMeta = "true";
        document.head.appendChild(script);
        window.fbq("consent", "grant");
        window.fbq("init", metaId);
        window.fbq("track", "PageView");
      } else if (!consent.marketing) {
        window.fbq?.("consent", "revoke");
      }
    };

    load(getConsent());
    const update = (event: Event) => load((event as CustomEvent<Consent>).detail);
    window.addEventListener("dreamweb:consent-change", update);
    return () => window.removeEventListener("dreamweb:consent-change", update);
  }, []);

  return null;
}

export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const copy = labels[locale];
  const otherLocale: Locale = locale === "es" ? "en" : "es";

  const nav = useMemo(
    () =>
      (["home", "services", "projects", "about", "contact"] as const).map(
        (key) => ({ key, href: paths[locale][key], label: copy.nav[key] }),
      ),
    [copy, locale],
  );

  const pageKey = useMemo(() => {
    const entry = (Object.entries(paths[locale]) as [keyof typeof paths.es, string][])
      .sort((a, b) => b[1].length - a[1].length)
      .find(([, value]) => pathname === value || (value !== "/" && pathname.startsWith(`${value}/`)));
    return entry?.[0] || "home";
  }, [locale, pathname]);

  const bookingHref = bookingUrl || `${paths[locale].contact}#agenda`;
  const isExternalBooking = Boolean(bookingUrl);

  useEffect(() => {
    const handleTrackedClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const tracked = target?.closest<HTMLElement>("[data-event]");
      if (!tracked) return;
      const { event: eventName, ...data } = tracked.dataset;
      if (eventName) trackEvent(eventName, data as Record<string, string>);
    };
    document.addEventListener("click", handleTrackedClick);
    return () => document.removeEventListener("click", handleTrackedClick);
  }, []);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <Link href={paths[locale].home} className="brand-link">
            <Brand />
          </Link>
          <nav className="desktop-nav" aria-label={locale === "es" ? "Navegación principal" : "Main navigation"}>
            {nav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={pathname === item.href ? "active" : ""}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link
              className="language-switch"
              href={paths[otherLocale][pageKey] || paths[otherLocale].home}
              aria-label={copy.language}
              onClick={() => trackEvent("language_switch", { language: otherLocale })}
            >
              <Globe2 size={16} />
              {otherLocale.toUpperCase()}
            </Link>
            <a
              className="button button-primary header-cta"
              href={bookingHref}
              target={isExternalBooking ? "_blank" : undefined}
              rel={isExternalBooking ? "noreferrer" : undefined}
              onClick={() => trackEvent("booking_cta_click", { placement: "header" })}
            >
              <CalendarDays size={17} />
              {copy.booking}
            </a>
            <button
              className="menu-button"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? copy.close : copy.menu}
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label={locale === "es" ? "Navegación móvil" : "Mobile navigation"}>
            <div className="container">
              {nav.map((item) => (
                <Link key={item.key} href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                  <ChevronRight size={18} />
                </Link>
              ))}
              <a className="button button-primary" href={bookingHref}>
                <CalendarDays size={17} />
                {copy.booking}
              </a>
            </div>
          </nav>
        )}
      </header>

      <main id="contenido">{children}</main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>
              {locale === "es"
                ? "Soluciones digitales personalizadas para negocios que quieren avanzar con claridad."
                : "Tailored digital solutions for businesses ready to move forward with clarity."}
            </p>
            <span className="footer-location">
              {locale === "es" ? "Desde Chile, para cualquier lugar." : "From Chile, working anywhere."}
            </span>
          </div>
          <div>
            <strong>{locale === "es" ? "Explorar" : "Explore"}</strong>
            <div className="footer-links">
              {nav.slice(1).map((item) => (
                <Link key={item.key} href={item.href}>{item.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <strong>{locale === "es" ? "Contacto" : "Contact"}</strong>
            <div className="footer-links">
              <a href={`mailto:${contactEmail}`}><Mail size={15} />{contactEmail}</a>
              <a
                href={whatsappHref(locale)}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("whatsapp_click", { placement: "footer" })}
              >
                <MessageCircle size={15} />WhatsApp
              </a>
              {instagramUrl && (
                <a href={instagramUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent("instagram_click")}>
                  <AtSign size={15} />Instagram
                </a>
              )}
            </div>
          </div>
          <div>
            <strong>{locale === "es" ? "Legal" : "Legal"}</strong>
            <div className="footer-links">
              <Link href={paths[locale].privacy}>{locale === "es" ? "Privacidad" : "Privacy"}</Link>
              <Link href={paths[locale].cookies}>Cookies</Link>
              <Link href={paths[locale].terms}>{locale === "es" ? "Términos" : "Terms"}</Link>
              <button onClick={() => window.dispatchEvent(new Event("dreamweb:open-consent"))}>
                {locale === "es" ? "Preferencias de cookies" : "Cookie preferences"}
              </button>
            </div>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} DreamWeb Chile.</span>
          <Link href={paths[otherLocale][pageKey] || paths[otherLocale].home}>
            <Globe2 size={14} /> {otherLocale.toUpperCase()}
          </Link>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href={whatsappHref(locale)}
        target="_blank"
        rel="noreferrer"
        aria-label={copy.whatsapp}
        onClick={() => trackEvent("whatsapp_click", { placement: "floating" })}
      >
        <MessageCircle size={22} />
        <span>{copy.whatsapp}</span>
        <ArrowUpRight size={15} />
      </a>
      <AnalyticsLoader />
      <ConsentManager locale={locale} />
    </div>
  );
}
