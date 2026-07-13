import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  Bot,
  CalendarDays,
  Check,
  ChevronRight,
  CloudCog,
  Code2,
  Compass,
  Cpu,
  Database,
  ExternalLink,
  Gauge,
  Globe2,
  HeartHandshake,
  Layers3,
  LifeBuoy,
  Mail,
  MessageCircle,
  Network,
  Route,
  SearchCheck,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { ContactForm } from "./ContactForm";
import { SiteShell } from "./SiteShell";
import {
  bookingUrl,
  contactEmail,
  faq,
  labels,
  paths,
  projects,
  services,
  type Locale,
  whatsappHref,
} from "../lib/site";

const serviceIcons = {
  web: Globe2,
  software: Code2,
  automation: Bot,
  crm: Network,
  infrastructure: ServerCog,
  consulting: Compass,
};

const methodology = {
  es: [
    ["01", "Descubrimiento", "Entendemos el problema, el contexto y el resultado esperado."],
    ["02", "Propuesta", "Definimos alcance, enfoque, etapas y responsabilidades."],
    ["03", "Diseño y desarrollo", "Construimos con revisiones claras y decisiones visibles."],
    ["04", "Implementación", "Publicamos, integramos y verificamos la operación real."],
    ["05", "Capacitación", "Dejamos al equipo preparado para utilizar la solución."],
    ["06", "Soporte", "Acompañamos la continuidad y las siguientes mejoras."],
  ],
  en: [
    ["01", "Discovery", "We understand the problem, context and expected outcome."],
    ["02", "Proposal", "We define scope, approach, stages and responsibilities."],
    ["03", "Design and development", "We build through clear reviews and visible decisions."],
    ["04", "Implementation", "We launch, integrate and verify real-world operation."],
    ["05", "Training", "We prepare your team to use and manage the solution."],
    ["06", "Support", "We support continuity and the next improvements."],
  ],
} as const;

const technologies = [
  ["Next.js", Layers3],
  ["React", Blocks],
  ["Node.js", Cpu],
  ["n8n", Workflow],
  ["Docker", CloudCog],
  ["PostgreSQL", Database],
  ["APIs", Network],
  ["Cloud / VPS", ServerCog],
] as const;

function Breadcrumbs({ locale, current }: { locale: Locale; current: string }) {
  return (
    <nav className="breadcrumbs" aria-label={locale === "es" ? "Migas de pan" : "Breadcrumbs"}>
      <Link href={paths[locale].home}>{locale === "es" ? "Inicio" : "Home"}</Link>
      <ChevronRight size={14} />
      <span aria-current="page">{current}</span>
    </nav>
  );
}

function InternalHero({
  locale,
  eyebrow,
  title,
  description,
  stat,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  description: string;
  stat?: [string, string];
}) {
  return (
    <section className="internal-hero">
      <div className="container">
        <Breadcrumbs locale={locale} current={eyebrow} />
        <div className="internal-hero-grid">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
          </div>
          <div className="internal-hero-aside">
            <p>{description}</p>
            {stat && (
              <div className="hero-stat">
                <strong>{stat[0]}</strong>
                <span>{stat[1]}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function BookingLink({ locale, placement, className = "button button-primary" }: { locale: Locale; placement: string; className?: string }) {
  const href = bookingUrl || `${paths[locale].contact}#agenda`;
  return (
    <a
      className={className}
      href={href}
      target={bookingUrl ? "_blank" : undefined}
      rel={bookingUrl ? "noreferrer" : undefined}
      data-event="booking_cta_click"
      data-placement={placement}
    >
      <CalendarDays size={18} />
      {labels[locale].booking}
    </a>
  );
}

function CTASection({ locale }: { locale: Locale }) {
  const es = locale === "es";
  return (
    <section className="cta-band">
      <div className="container cta-band-inner">
        <div>
          <span className="eyebrow">{es ? "Siguiente paso" : "Next step"}</span>
          <h2>{es ? "Conversemos sobre tu proyecto." : "Let’s talk about your project."}</h2>
          <p>{es ? "Una conversación breve puede darte claridad sobre el camino técnico." : "A short conversation can bring clarity to the right technical path."}</p>
        </div>
        <div className="cta-actions">
          <BookingLink locale={locale} placement="final_cta" />
          <Link className="button button-secondary" href={paths[locale].contact}>
            {labels[locale].project}<ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, locale, compact = false }: { service: (typeof services)[number]; locale: Locale; compact?: boolean }) {
  const content = service[locale];
  const Icon = serviceIcons[service.id];
  return (
    <article className={`service-card ${compact ? "service-card-compact" : ""}`} data-service={service.id}>
      <div className="service-icon"><Icon size={23} /></div>
      <div>
        <span className="service-index">{String(services.indexOf(service) + 1).padStart(2, "0")}</span>
        <h3>{content.title}</h3>
        <p>{content.summary}</p>
      </div>
      {!compact && (
        <>
          <div className="service-problem">
            <strong>{locale === "es" ? "Cuando" : "When"}</strong>
            <p>{content.problem}</p>
          </div>
          <ul className="check-list">
            {content.deliverables.map((item) => <li key={item}><Check size={15} />{item}</li>)}
          </ul>
          <p className="service-clients"><strong>{locale === "es" ? "Para:" : "For:"}</strong> {content.clients}</p>
        </>
      )}
      <Link href={`${paths[locale].contact}?service=${service.id}`} className="text-link">
        {locale === "es" ? "Hablemos de tu proyecto" : "Let’s discuss your project"}<ArrowRight size={16} />
      </Link>
    </article>
  );
}

function ProjectVisual({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className={`project-visual project-${project.slug}`} aria-label={`Vista conceptual del proyecto ${project.clientName}`}>
      <div className="mock-browser-bar"><span /><span /><span /></div>
      <div className="mock-brand">{project.clientName}</div>
      <div className="mock-content">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function ProjectCard({ project, locale }: { project: (typeof projects)[number]; locale: Locale }) {
  const content = project[locale];
  const href = `${paths[locale].projects}/${project.slug}`;
  return (
    <article className="project-card">
      <ProjectVisual project={project} />
      <div className="project-card-content">
        <div className="project-meta">
          <span>{project.clientName}</span>
          <span>{content.services.slice(0, 2).join(" · ")}</span>
        </div>
        <h3>{content.title}</h3>
        <p>{content.summary}</p>
        <Link href={href} className="text-link" data-event="project_view" data-project={project.slug}>
          {locale === "es" ? "Ver proyecto" : "View project"}<ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

function Methodology({ locale }: { locale: Locale }) {
  return (
    <div className="methodology">
      {methodology[locale].map(([number, title, description]) => (
        <div className="method-step" key={number}>
          <span>{number}</span>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      ))}
    </div>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const es = locale === "es";
  return (
    <SiteShell locale={locale}>
      <section className="home-hero">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="eyebrow"><span className="signal-dot" />{es ? "Soluciones digitales · Chile" : "Digital solutions · Chile"}</span>
            <h1>{es ? "Creamos soluciones digitales que hacen avanzar tu negocio." : "We create digital solutions that move your business forward."}</h1>
            <p>{es ? "Diseñamos sitios web, software, automatizaciones e infraestructura adaptada a tus objetivos. Te acompañamos desde la idea hasta la puesta en marcha y el soporte posterior." : "We design websites, software, automations and infrastructure around your goals. From the first idea to launch and ongoing support."}</p>
            <div className="hero-actions">
              <BookingLink locale={locale} placement="hero" />
              <Link className="button button-secondary" href={paths[locale].contact}>
                {labels[locale].project}<ArrowRight size={17} />
              </Link>
            </div>
            <a className="hero-whatsapp" href={whatsappHref(locale)} target="_blank" rel="noreferrer" data-event="whatsapp_click" data-placement="hero">
              <MessageCircle size={17} />{labels[locale].whatsapp}<ExternalLink size={14} />
            </a>
          </div>
          <div className="hero-rail" aria-label={es ? "Áreas de trabajo" : "Areas of work"}>
            <div><Code2 size={18} /><span>{es ? "Desarrollo" : "Development"}</span></div>
            <div><Workflow size={18} /><span>{es ? "Automatización" : "Automation"}</span></div>
            <div><ServerCog size={18} /><span>{es ? "Infraestructura" : "Infrastructure"}</span></div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-inner">
          <span>{es ? "Negocios que ya confían en DreamWeb" : "Businesses that trust DreamWeb"}</span>
          <div className="client-wordmarks"><strong>BKids</strong><strong>1Percentil</strong></div>
          <span className="trust-note"><ShieldCheck size={16} />{es ? "Casos reales y verificables" : "Real, verifiable work"}</span>
        </div>
      </section>

      <section className="section services-preview">
        <div className="container">
          <div className="section-heading split-heading">
            <div><span className="eyebrow">{es ? "Qué resolvemos" : "What we solve"}</span><h2>{es ? "Tecnología aplicada a objetivos concretos." : "Technology applied to concrete goals."}</h2></div>
            <div><p>{es ? "No vendemos paquetes cerrados. Diseñamos cada solución alrededor del problema, la operación y las prioridades del negocio." : "We do not sell rigid packages. Each solution is shaped around the problem, operation and business priorities."}</p><Link className="text-link" href={paths[locale].services}>{es ? "Ver todos los servicios" : "Explore all services"}<ArrowRight size={16} /></Link></div>
          </div>
          <div className="services-grid services-grid-compact">
            {services.slice(0, 4).map((service) => <ServiceCard key={service.id} service={service} locale={locale} compact />)}
          </div>
        </div>
      </section>

      <section className="section projects-preview">
        <div className="container">
          <div className="section-heading split-heading">
            <div><span className="eyebrow">{es ? "Trabajo realizado" : "Selected work"}</span><h2>{es ? "Soluciones que ordenan, recuperan y abren oportunidades." : "Solutions that organize, recover and create opportunities."}</h2></div>
            <p>{es ? "Mostramos el problema, lo que implementamos y el resultado alcanzado, sin cifras inventadas ni promesas infladas." : "We show the problem, implementation and outcome without invented numbers or inflated promises."}</p>
          </div>
          <div className="projects-grid">{projects.filter((project) => project.published && project.featured).map((project) => <ProjectCard key={project.slug} project={project} locale={locale} />)}</div>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <div className="section-heading split-heading">
            <div><span className="eyebrow">{es ? "Cómo trabajamos" : "How we work"}</span><h2>{es ? "De la conversación inicial a una solución funcionando." : "From the first conversation to a working solution."}</h2></div>
            <p>{es ? "Un proceso visible, con decisiones claras y acompañamiento después de publicar." : "A visible process with clear decisions and support beyond launch."}</p>
          </div>
          <Methodology locale={locale} />
        </div>
      </section>

      <section className="section technology-section">
        <div className="container technology-layout">
          <div className="technology-copy"><span className="eyebrow">{es ? "Tecnologías" : "Technologies"}</span><h2>{es ? "Elegimos herramientas por su utilidad, no por moda." : "We choose tools for their value, not their hype."}</h2><p>{es ? "Combinamos desarrollo, automatización e infraestructura para construir soluciones mantenibles y preparadas para evolucionar." : "We combine development, automation and infrastructure to build maintainable solutions ready to evolve."}</p></div>
          <div className="technology-grid">{technologies.map(([name, Icon]) => <div key={name}><Icon size={20} /><span>{name}</span></div>)}</div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container faq-layout">
          <div className="faq-intro"><span className="eyebrow">FAQ</span><h2>{es ? "Antes de comenzar." : "Before we begin."}</h2><p>{es ? "Respuestas directas a las preguntas más habituales." : "Straight answers to common questions."}</p></div>
          <div className="faq-list">{faq[locale].slice(0, 6).map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
        </div>
      </section>
      <CTASection locale={locale} />
    </SiteShell>
  );
}

export function ServicesPage({ locale }: { locale: Locale }) {
  const es = locale === "es";
  return (
    <SiteShell locale={locale}>
      <InternalHero locale={locale} eyebrow={es ? "Servicios" : "Services"} title={es ? "Una solución diseñada alrededor de tu negocio." : "A solution designed around your business."} description={es ? "Abordamos diseño, desarrollo, automatización e infraestructura como partes de un mismo sistema. Cada proyecto se cotiza de forma personalizada." : "We bring design, development, automation and infrastructure into one system. Every project is assessed and quoted individually."} stat={["06", es ? "áreas de especialidad" : "areas of expertise"]} />
      <section className="section services-page-section">
        <div className="container services-grid">{services.map((service) => <ServiceCard key={service.id} service={service} locale={locale} />)}</div>
      </section>
      <section className="section service-principles">
        <div className="container principle-grid">
          <div><SearchCheck size={24} /><h3>{es ? "Diagnóstico antes de construir" : "Diagnose before building"}</h3><p>{es ? "Evaluamos el problema y el contexto antes de definir herramientas." : "We assess the problem and context before selecting tools."}</p></div>
          <div><Route size={24} /><h3>{es ? "Alcance visible" : "Visible scope"}</h3><p>{es ? "Etapas, decisiones y responsabilidades claras desde el inicio." : "Clear stages, decisions and responsibilities from the start."}</p></div>
          <div><LifeBuoy size={24} /><h3>{es ? "Continuidad real" : "Real continuity"}</h3><p>{es ? "Podemos acompañar el despliegue, soporte y evolución posterior." : "We can support deployment, operation and future evolution."}</p></div>
        </div>
      </section>
      <CTASection locale={locale} />
    </SiteShell>
  );
}

export function ProjectsPage({ locale }: { locale: Locale }) {
  const es = locale === "es";
  return (
    <SiteShell locale={locale}>
      <InternalHero locale={locale} eyebrow={es ? "Proyectos" : "Projects"} title={es ? "Experiencia demostrada con problemas reales." : "Experience demonstrated through real problems."} description={es ? "Casos publicables y verificables. Compartimos el contexto, la solución implementada y los resultados sin revelar información privada." : "Verifiable, approved work. We share context, implementation and outcomes without exposing private information."} stat={[String(projects.filter((project) => project.published).length).padStart(2, "0"), es ? "casos publicados" : "published cases"]} />
      <section className="section projects-page-section"><div className="container projects-grid">{projects.filter((project) => project.published).map((project) => <ProjectCard key={project.slug} project={project} locale={locale} />)}</div></section>
      <section className="section outcome-band"><div className="container outcome-grid"><div><Gauge size={24} /><h3>{es ? "Resultados responsables" : "Responsible outcomes"}</h3><p>{es ? "No publicamos métricas que no estén validadas por el cliente." : "We do not publish metrics that have not been validated by the client."}</p></div><div><ShieldCheck size={24} /><h3>{es ? "Información cuidada" : "Protected information"}</h3><p>{es ? "Precios, accesos e información operativa permanecen privados." : "Pricing, access and operational information remain private."}</p></div><div><HeartHandshake size={24} /><h3>{es ? "Acompañamiento" : "Ongoing partnership"}</h3><p>{es ? "La entrega es una etapa, no el final de la relación técnica." : "Delivery is a stage, not the end of the technical relationship."}</p></div></div></section>
      <CTASection locale={locale} />
    </SiteShell>
  );
}

export function ProjectDetailPage({ locale, slug }: { locale: Locale; slug: string }) {
  const project = projects.find((item) => item.slug === slug && item.published);
  if (!project) return null;
  const es = locale === "es";
  const content = project[locale];
  return (
    <SiteShell locale={locale}>
      <section className="project-detail-hero">
        <div className="container">
          <Breadcrumbs locale={locale} current={project.clientName} />
          <div className="project-detail-grid">
            <div><span className="eyebrow">{es ? "Caso de proyecto" : "Project case"}</span><h1>{content.title}</h1><p>{content.summary}</p><div className="tag-row">{content.services.map((service) => <span key={service}>{service}</span>)}</div></div>
            <ProjectVisual project={project} />
          </div>
        </div>
      </section>
      <section className="section project-story"><div className="container story-layout"><aside><strong>{project.clientName}</strong><p>{content.context}</p>{project.websiteUrl && <a className="text-link" href={project.websiteUrl} target="_blank" rel="noreferrer">{es ? "Visitar sitio" : "Visit website"}<ExternalLink size={15} /></a>}</aside><div className="story-sections"><div><span>01</span><h2>{es ? "El problema" : "The problem"}</h2><ul>{content.problem.map((item) => <li key={item}>{item}</li>)}</ul></div><div><span>02</span><h2>{es ? "La solución" : "The solution"}</h2><ul>{content.solution.map((item) => <li key={item}>{item}</li>)}</ul></div><div><span>03</span><h2>{es ? "El resultado" : "The outcome"}</h2><ul>{content.results.map((item) => <li key={item}>{item}</li>)}</ul></div></div></div></section>
      <CTASection locale={locale} />
    </SiteShell>
  );
}

export function AboutPage({ locale }: { locale: Locale }) {
  const es = locale === "es";
  return (
    <SiteShell locale={locale}>
      <InternalHero locale={locale} eyebrow="DreamWeb" title={es ? "Tecnología cercana, implementada con rigor." : "Approachable technology, implemented with rigor."} description={es ? "Somos una marca chilena de soluciones digitales enfocada en transformar necesidades de negocio en herramientas concretas, funcionales y mantenibles." : "We are a Chilean digital solutions brand focused on turning business needs into concrete, functional and maintainable tools."} stat={["360°", es ? "acompañamiento integral" : "end-to-end support"]} />
      <section className="section about-intro"><div className="container about-grid"><div className="about-statement"><span className="eyebrow">{es ? "Nuestra forma de trabajar" : "Our way of working"}</span><h2>{es ? "La claridad técnica también es parte del servicio." : "Technical clarity is part of the service."}</h2></div><div className="about-copy"><p>{es ? "Trabajamos de forma cercana durante todo el proceso: desde el levantamiento inicial y la definición de la solución hasta su implementación, capacitación y soporte." : "We work closely throughout the process: from initial discovery and solution definition to implementation, training and support."}</p><p>{es ? "DreamWeb está construida para crecer como una marca independiente, capaz de acompañar a negocios, empresas y agencias en proyectos de distinta escala." : "DreamWeb is built to grow as an independent brand, able to support businesses, companies and agencies across projects of different scales."}</p></div></div></section>
      <section className="section values-section"><div className="container values-grid"><div><HeartHandshake size={25} /><span>01</span><h3>{es ? "Cercanía" : "Closeness"}</h3><p>{es ? "Comunicación directa, contexto compartido y decisiones entendibles." : "Direct communication, shared context and understandable decisions."}</p></div><div><SearchCheck size={25} /><span>02</span><h3>{es ? "Claridad" : "Clarity"}</h3><p>{es ? "Explicamos alternativas, riesgos y límites antes de implementar." : "We explain alternatives, risks and limits before implementation."}</p></div><div><ShieldCheck size={25} /><span>03</span><h3>{es ? "Responsabilidad" : "Responsibility"}</h3><p>{es ? "Construimos soluciones mantenibles y evitamos promesas absolutas." : "We build maintainable solutions and avoid absolute promises."}</p></div><div><Sparkles size={25} /><span>04</span><h3>{es ? "Evolución" : "Evolution"}</h3><p>{es ? "Diseñamos una base que pueda aprender, crecer y adaptarse." : "We design foundations that can learn, grow and adapt."}</p></div></div></section>
      <section className="section about-method"><div className="container"><div className="section-heading split-heading"><div><span className="eyebrow">{es ? "Metodología" : "Methodology"}</span><h2>{es ? "Un proceso completo, sin zonas grises." : "A complete process without gray areas."}</h2></div><p>{es ? "Cada etapa deja decisiones, entregables y próximos pasos claros." : "Every stage leaves clear decisions, deliverables and next steps."}</p></div><Methodology locale={locale} /></div></section>
      <CTASection locale={locale} />
    </SiteShell>
  );
}

export function ContactPage({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const bookingHref = bookingUrl || "#formulario";
  return (
    <SiteShell locale={locale}>
      <InternalHero locale={locale} eyebrow={es ? "Contacto" : "Contact"} title={es ? "Hablemos de lo que tu negocio necesita resolver." : "Let’s talk about what your business needs to solve."} description={es ? "Elige el canal que te resulte más cómodo. Para evaluar un proyecto, una reunión o el formulario nos entregan el contexto necesario." : "Choose the channel that works best for you. A meeting or the form gives us the context needed to assess your project."} />
      <section className="section contact-section"><div className="container contact-layout"><div className="contact-sidebar"><div className="contact-method" id="agenda"><CalendarDays size={23} /><span className="eyebrow">{es ? "Reunión de 60 minutos" : "60-minute meeting"}</span><h2>{es ? "Revisemos tu proyecto en contexto." : "Let’s review your project in context."}</h2><p>{es ? "La disponibilidad se gestiona en Google Calendar y utiliza America/Santiago como zona horaria principal." : "Availability is managed through Google Calendar, using America/Santiago as the primary time zone."}</p><a className="button button-primary" href={bookingHref} target={bookingUrl ? "_blank" : undefined} rel={bookingUrl ? "noreferrer" : undefined} data-event="booking_cta_click" data-placement="contact"><CalendarDays size={18} />{bookingUrl ? labels[locale].booking : es ? "Solicitar una hora" : "Request a time"}</a><small>{es ? "Alternativas disponibles: formulario y WhatsApp." : "Alternative channels: form and WhatsApp."}</small></div><div className="direct-contact"><a href={whatsappHref(locale)} target="_blank" rel="noreferrer" data-event="whatsapp_click" data-placement="contact"><MessageCircle size={20} /><span><strong>WhatsApp</strong><small>+56 9 9440 2632</small></span><ArrowRight size={17} /></a><a href={`mailto:${contactEmail}`}><Mail size={20} /><span><strong>Email</strong><small>{contactEmail}</small></span><ArrowRight size={17} /></a></div><p className="response-note"><span className="signal-dot" />{labels[locale].response}</p></div><ContactForm locale={locale} /></div></section>
    </SiteShell>
  );
}

type LegalKind = "privacy" | "terms" | "cookies";

const legalCopy = {
  privacy: {
    es: {
      title: "Política de privacidad",
      intro: "Esta política explica cómo se tratan los datos personales enviados a través de DreamWeb Chile.",
      updated: "Actualizada el 13 de julio de 2026",
      sections: [
        ["Responsable", `DreamWeb Chile es una marca comercial operada por Benjamín Yáñez, quien determina las finalidades y medios del tratamiento. Canal de contacto: ${contactEmail}.`],
        ["Datos que tratamos", "Podemos recibir nombre, empresa o marca, correo, WhatsApp, servicio de interés y descripción del proyecto. No solicitamos datos sensibles, contraseñas, credenciales ni información bancaria."],
        ["Finalidades", "Usamos la información para responder consultas, evaluar necesidades, preparar propuestas, coordinar reuniones y gestionar una relación precontractual o contractual solicitada por la persona."],
        ["Proveedores", "El sitio puede utilizar proveedores de correo, Google Calendar, Google reCAPTCHA, Google Analytics, Meta Pixel, alojamiento, DNS, CDN y seguridad. Algunos pueden tratar datos fuera de Chile conforme a sus condiciones aplicables."],
        ["Conservación", "Las consultas que no se conviertan en clientes se eliminarán o anonimizarán después de 12 meses, salvo necesidad justificada. Los datos de clientes se conservarán según obligaciones contractuales, tributarias y de defensa de derechos."],
        ["Tus derechos", `Puedes solicitar acceso, rectificación, eliminación, oposición, bloqueo, portabilidad o revocación cuando corresponda escribiendo a ${contactEmail}. Podremos solicitar información razonable para verificar identidad.`],
        ["Seguridad y cambios", "Aplicamos medidas proporcionales para proteger la información y revisaremos esta política cuando cambien proveedores, finalidades o la normativa aplicable."],
      ],
    },
    en: {
      title: "Privacy policy",
      intro: "This policy explains how personal data submitted through DreamWeb Chile is handled.",
      updated: "Updated July 13, 2026",
      sections: [
        ["Controller", `DreamWeb Chile is a trade name operated by Benjamín Yáñez, who determines the purposes and means of processing. Contact: ${contactEmail}.`],
        ["Data we process", "We may receive your name, company, email, WhatsApp number, service of interest and project description. We do not request sensitive data, passwords, credentials or banking information."],
        ["Purposes", "We use this information to answer inquiries, assess needs, prepare proposals, coordinate meetings and manage a requested pre-contractual or contractual relationship."],
        ["Providers", "The site may use email, Google Calendar, Google reCAPTCHA, Google Analytics, Meta Pixel, hosting, DNS, CDN and security providers. Some may process data outside Chile under their applicable terms."],
        ["Retention", "Inquiries that do not become client relationships are deleted or anonymized after 12 months unless a justified need applies. Client data is kept according to contractual, tax and legal-defense obligations."],
        ["Your rights", `You may request access, correction, deletion, objection, restriction, portability or withdrawal where applicable by writing to ${contactEmail}. We may request reasonable information to verify identity.`],
        ["Security and updates", "We apply proportionate safeguards and will review this policy when providers, purposes or applicable law change."],
      ],
    },
  },
  terms: {
    es: {
      title: "Términos del sitio y servicios",
      intro: "Estas condiciones regulan el uso informativo de este sitio y los principios generales para contratar servicios de DreamWeb.",
      updated: "Actualizados el 13 de julio de 2026",
      sections: [
        ["Uso del sitio", "El contenido es informativo y puede actualizarse sin aviso. No constituye una cotización, asesoría jurídica, garantía de resultado ni una oferta irrevocable."],
        ["Servicios", "El alcance, entregables, plazos, responsabilidades, soporte y valor de cada proyecto se definen en una propuesta o acuerdo específico aceptado por las partes."],
        ["Propiedad intelectual", "La marca, diseño y contenidos propios del sitio pertenecen a sus respectivos titulares. Los activos de clientes se muestran únicamente cuando existe autorización."],
        ["Enlaces externos", "Los enlaces a WhatsApp, Google Calendar, sitios de clientes y otros servicios se rigen por las condiciones de sus propios proveedores."],
        ["Disponibilidad", "Procuramos mantener el sitio disponible y seguro, pero pueden existir interrupciones por mantenimiento, proveedores o causas fuera de nuestro control."],
        ["Contacto", `Para consultas sobre estos términos escribe a ${contactEmail}. Las condiciones definitivas de cada servicio se acuerdan por separado.`],
      ],
    },
    en: {
      title: "Website and service terms",
      intro: "These terms govern informational use of this website and the general principles for engaging DreamWeb services.",
      updated: "Updated July 13, 2026",
      sections: [
        ["Website use", "Content is informational and may change without notice. It is not a quotation, legal advice, result guarantee or irrevocable offer."],
        ["Services", "Scope, deliverables, timing, responsibilities, support and pricing are defined in a specific proposal or agreement accepted by both parties."],
        ["Intellectual property", "The brand, design and original site content belong to their respective owners. Client assets are shown only with authorization."],
        ["External links", "Links to WhatsApp, Google Calendar, client sites and other services are governed by their providers’ terms."],
        ["Availability", "We aim to keep the site available and secure, but interruptions may occur due to maintenance, providers or events outside our control."],
        ["Contact", `For questions about these terms, write to ${contactEmail}. Final conditions for each service are agreed separately.`],
      ],
    },
  },
  cookies: {
    es: {
      title: "Política de cookies",
      intro: "Explicamos qué tecnologías puede utilizar este sitio y cómo puedes controlar tus preferencias.",
      updated: "Actualizada el 13 de julio de 2026",
      sections: [
        ["Necesarias", "Permiten funciones básicas de seguridad, navegación y conservación de preferencias. Operan siempre porque el sitio no puede funcionar correctamente sin ellas."],
        ["Analítica", "Google Analytics 4 puede medir visitas e interacciones solo después de tu autorización. No enviamos nombre, correo, teléfono ni contenido del formulario a la analítica."],
        ["Marketing", "Meta Pixel puede utilizarse para medir campañas únicamente después de tu autorización de marketing. No se envían datos del formulario ni datos de reservas."],
        ["Tus preferencias", "Puedes aceptar, rechazar o configurar categorías desde el panel inicial. También puedes reabrir las preferencias desde el footer en cualquier momento."],
        ["Duración y proveedores", "Las duraciones dependen de la tecnología configurada. Mantendremos actualizado el detalle de proveedor, finalidad y duración cuando se incorporen identificadores productivos."],
        ["Contacto", `Para preguntas sobre cookies o tratamiento de datos escribe a ${contactEmail}.`],
      ],
    },
    en: {
      title: "Cookie policy",
      intro: "This policy explains which technologies this site may use and how you can control your preferences.",
      updated: "Updated July 13, 2026",
      sections: [
        ["Necessary", "These technologies support basic security, navigation and preference storage. They always operate because the site cannot work correctly without them."],
        ["Analytics", "Google Analytics 4 may measure visits and interactions only after your permission. We do not send names, emails, phone numbers or form content to analytics."],
        ["Marketing", "Meta Pixel may be used to measure campaigns only after marketing permission. Form data and booking information are never sent."],
        ["Your preferences", "You can accept, reject or customize categories in the initial panel and reopen preferences from the footer at any time."],
        ["Duration and providers", "Duration depends on the configured technology. We will keep provider, purpose and duration details updated when production identifiers are added."],
        ["Contact", `For questions about cookies or personal data, write to ${contactEmail}.`],
      ],
    },
  },
} as const;

export function LegalPage({ locale, kind }: { locale: Locale; kind: LegalKind }) {
  const content = legalCopy[kind][locale];
  return (
    <SiteShell locale={locale}>
      <InternalHero locale={locale} eyebrow={content.title} title={content.title} description={content.intro} />
      <section className="section legal-section"><div className="container legal-layout"><aside><span>{content.updated}</span><p>{locale === "es" ? "Esta redacción es funcional y debe revisarse jurídicamente antes del lanzamiento definitivo." : "This functional draft should receive legal review before final launch."}</p><a className="text-link" href={`mailto:${contactEmail}`}>{locale === "es" ? "Consultar" : "Ask a question"}<Mail size={15} /></a></aside><article>{content.sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}</article></div></section>
    </SiteShell>
  );
}
