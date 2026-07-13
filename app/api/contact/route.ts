import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";

const services = [
  "Desarrollo web",
  "Software a medida",
  "Automatización e IA",
  "Chatbot",
  "CRM e integraciones",
  "Hosting y mantenimiento",
  "Infraestructura / VPS",
  "Consultoría tecnológica",
  "Otro",
  "Web development",
  "Custom software",
  "Automation and AI",
  "CRM and integrations",
  "Hosting and maintenance",
  "Infrastructure / VPS",
  "Technology consulting",
  "Other",
] as const;

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().max(120).optional().default(""),
  email: z.string().trim().email().max(254),
  whatsapp: z.string().trim().min(6).max(30),
  service: z.enum(services),
  description: z.string().trim().min(20).max(2500),
  privacy: z.literal("accepted"),
  website: z.string().max(0).optional().default(""),
  recaptchaToken: z.string().max(4096).optional().default(""),
  locale: z.enum(["es", "en"]).default("es"),
  source: z.string().max(300).default("/contacto"),
});

const attempts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = attempts.get(ip);
  if (!current || current.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return false;
  }
  current.count += 1;
  return current.count > 5;
}

function safeHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").slice(0, 120);
}

async function verifyRecaptcha(token: string, ip: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token, remoteip: ip });
  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!response.ok) return false;
  const result = (await response.json()) as {
    success?: boolean;
    score?: number;
    action?: string;
  };
  return Boolean(result.success && result.action === "contact" && (result.score ?? 0) >= 0.5);
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!(await verifyRecaptcha(parsed.data.recaptchaToken, ip))) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CONTACT_EMAIL_FROM, CONTACT_EMAIL_TO } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD || !CONTACT_EMAIL_FROM || !CONTACT_EMAIL_TO) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const id = crypto.randomUUID();
  const createdAt = new Intl.DateTimeFormat("es-CL", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "America/Santiago",
  }).format(new Date());

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });

  const data = parsed.data;
  const text = [
    `Fecha: ${createdAt}`,
    `Solicitud: ${id}`,
    `Nombre: ${data.name}`,
    `Empresa: ${data.company || "No informada"}`,
    `Correo: ${data.email}`,
    `WhatsApp: ${data.whatsapp}`,
    `Servicio: ${data.service}`,
    `Idioma: ${data.locale}`,
    `Página de origen: ${data.source}`,
    "",
    "Descripción:",
    data.description,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: CONTACT_EMAIL_FROM,
      to: CONTACT_EMAIL_TO,
      replyTo: data.email,
      subject: `[Nuevo contacto DreamWeb] ${safeHeader(data.service)} - ${safeHeader(data.name)}`,
      text,
    });
    return NextResponse.json({ ok: true, id });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
