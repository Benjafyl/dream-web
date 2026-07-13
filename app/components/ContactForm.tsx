"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { trackEvent } from "../lib/analytics";
import { paths, type Locale, whatsappHref } from "../lib/site";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const serviceOptions = {
  es: [
    "Desarrollo web",
    "Software a medida",
    "Automatización e IA",
    "Chatbot",
    "CRM e integraciones",
    "Hosting y mantenimiento",
    "Infraestructura / VPS",
    "Consultoría tecnológica",
    "Otro",
  ],
  en: [
    "Web development",
    "Custom software",
    "Automation and AI",
    "Chatbot",
    "CRM and integrations",
    "Hosting and maintenance",
    "Infrastructure / VPS",
    "Technology consulting",
    "Other",
  ],
};

export function ContactForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const started = useRef(false);
  const es = locale === "es";

  async function getRecaptchaToken() {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) return "";

    if (!window.grecaptcha) {
      await new Promise<void>((resolve, reject) => {
        const existing = document.querySelector<HTMLScriptElement>("script[data-dreamweb-recaptcha]");
        if (existing) {
          existing.addEventListener("load", () => resolve(), { once: true });
          existing.addEventListener("error", () => reject(new Error("recaptcha_load_failed")), { once: true });
          return;
        }
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        script.async = true;
        script.dataset.dreamwebRecaptcha = "true";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("recaptcha_load_failed"));
        document.head.appendChild(script);
      });
    }

    return new Promise<string>((resolve, reject) => {
      window.grecaptcha?.ready(() => {
        window.grecaptcha?.execute(siteKey, { action: "contact" }).then(resolve).catch(reject);
      });
    });
  }

  const start = () => {
    if (started.current) return;
    started.current = true;
    trackEvent("contact_form_start");
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const recaptchaToken = await getRecaptchaToken();
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, recaptchaToken, locale, source: window.location.pathname }),
      });
      if (!response.ok) throw new Error("send_failed");
      form.reset();
      setStatus("success");
      trackEvent("contact_form_submit");
    } catch {
      setStatus("error");
      trackEvent("contact_form_error");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} onFocus={start} id="formulario">
      <div className="form-heading">
        <span className="eyebrow">{es ? "Formulario" : "Project inquiry"}</span>
        <h2>{es ? "Cuéntanos qué necesitas resolver" : "Tell us what you need to solve"}</h2>
        <p>{es ? "Los campos marcados con * son obligatorios." : "Fields marked with * are required."}</p>
      </div>
      <div className="form-grid">
        <label>
          <span>{es ? "Nombre" : "Name"} *</span>
          <input name="name" required maxLength={100} autoComplete="name" />
        </label>
        <label>
          <span>{es ? "Empresa o marca" : "Company or brand"}</span>
          <input name="company" maxLength={120} autoComplete="organization" />
        </label>
        <label>
          <span>{es ? "Correo electrónico" : "Email"} *</span>
          <input name="email" type="email" required maxLength={254} autoComplete="email" />
        </label>
        <label>
          <span>WhatsApp *</span>
          <input name="whatsapp" type="tel" required maxLength={30} autoComplete="tel" placeholder="+56 9 1234 5678" />
        </label>
        <label className="form-full">
          <span>{es ? "Servicio de interés" : "Service of interest"} *</span>
          <select name="service" required defaultValue="">
            <option value="" disabled>{es ? "Selecciona una opción" : "Select an option"}</option>
            {serviceOptions[locale].map((service) => <option key={service}>{service}</option>)}
          </select>
        </label>
        <label className="form-full">
          <span>{es ? "Problema o proyecto" : "Problem or project"} *</span>
          <textarea
            name="description"
            required
            minLength={20}
            maxLength={2500}
            rows={7}
            placeholder={es ? "¿Qué quieres lograr y qué ocurre hoy?" : "What do you want to achieve, and what happens today?"}
          />
        </label>
        <label className="honeypot" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <label className="privacy-check form-full">
          <input name="privacy" type="checkbox" required value="accepted" />
          <span>
            {es ? "He leído la " : "I have read the "}
            <Link href={paths[locale].privacy}>{es ? "Política de Privacidad" : "Privacy Policy"}</Link>
            {es
              ? " y autorizo el uso de mis datos para responder esta consulta."
              : " and agree to the use of my data to answer this inquiry."}
          </span>
        </label>
      </div>
      <p className="privacy-note">
        {es
          ? "Usaremos tus datos únicamente para responder tu consulta, evaluar tu proyecto y coordinar los siguientes pasos."
          : "We will use your data only to answer your inquiry, assess your project and coordinate next steps."}
      </p>
      <button className="button button-primary form-submit" disabled={status === "loading"}>
        {status === "loading" ? <LoaderCircle className="spin" size={18} /> : <Send size={18} />}
        {status === "loading" ? (es ? "Enviando..." : "Sending...") : es ? "Enviar consulta" : "Send inquiry"}
      </button>
      <div className="form-status" aria-live="polite">
        {status === "success" && (
          <p className="status-success"><CheckCircle2 size={19} />{es ? "Recibimos tu mensaje. Te responderemos dentro de las próximas 24 horas hábiles." : "We received your message. We will reply within the next 24 business hours."}</p>
        )}
        {status === "error" && (
          <p className="status-error">
            <AlertCircle size={19} />
            <span>
              {es ? "No pudimos enviar tu mensaje. Inténtalo nuevamente o " : "We could not send your message. Try again or "}
              <a href={whatsappHref(locale)} target="_blank" rel="noreferrer">{es ? "escríbenos por WhatsApp" : "contact us on WhatsApp"}</a>.
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
