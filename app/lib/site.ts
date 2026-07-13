import type { Metadata } from "next";

export type Locale = "es" | "en";
export type PageKey =
  | "home"
  | "services"
  | "projects"
  | "about"
  | "contact"
  | "privacy"
  | "terms"
  | "cookies";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dreamwebchile.cl";

export const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "56994402632";

export const bookingUrl =
  process.env.NEXT_PUBLIC_GOOGLE_BOOKING_URL || "";

export const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "";
export const contactEmail = "benjafyl@gmail.com";

export const paths: Record<Locale, Record<PageKey, string>> = {
  es: {
    home: "/",
    services: "/servicios",
    projects: "/proyectos",
    about: "/dreamweb",
    contact: "/contacto",
    privacy: "/privacidad",
    terms: "/terminos",
    cookies: "/cookies",
  },
  en: {
    home: "/en",
    services: "/en/services",
    projects: "/en/projects",
    about: "/en/about",
    contact: "/en/contact",
    privacy: "/en/privacy",
    terms: "/en/terms",
    cookies: "/en/cookies",
  },
};

export const labels = {
  es: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      projects: "Proyectos",
      about: "DreamWeb",
      contact: "Contacto",
    },
    booking: "Agendar reunión",
    project: "Cuéntanos tu proyecto",
    whatsapp: "Hablar por WhatsApp",
    language: "Cambiar a inglés",
    menu: "Abrir menú",
    close: "Cerrar menú",
    response: "Respondemos dentro de 24 horas hábiles.",
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      projects: "Projects",
      about: "DreamWeb",
      contact: "Contact",
    },
    booking: "Book a meeting",
    project: "Tell us about your project",
    whatsapp: "Chat on WhatsApp",
    language: "Cambiar a español",
    menu: "Open menu",
    close: "Close menu",
    response: "We reply within 24 business hours.",
  },
} as const;

export const services = [
  {
    id: "web",
    es: {
      title: "Desarrollo web",
      summary:
        "Sitios y plataformas que explican bien tu propuesta y convierten visitas en oportunidades.",
      problem: "Tu presencia digital no representa el nivel real de tu negocio.",
      deliverables: [
        "Sitios corporativos y landing pages",
        "Plataformas de captación y e-commerce",
        "Renovación o rescate de sitios existentes",
        "Integraciones, analítica y formularios",
      ],
      clients: "Negocios, profesionales, marcas y organizaciones.",
    },
    en: {
      title: "Web development",
      summary:
        "Websites and platforms that communicate your offer and turn visits into opportunities.",
      problem: "Your digital presence no longer reflects the quality of your business.",
      deliverables: [
        "Corporate websites and landing pages",
        "Lead platforms and e-commerce",
        "Website redesign and recovery",
        "Integrations, analytics and forms",
      ],
      clients: "Businesses, professionals, brands and organizations.",
    },
  },
  {
    id: "software",
    es: {
      title: "Software a medida",
      summary:
        "Aplicaciones y sistemas creados alrededor de tu operación, no al revés.",
      problem: "Tu equipo depende de planillas, tareas manuales o herramientas desconectadas.",
      deliverables: [
        "Aplicaciones y paneles internos",
        "Sistemas de gestión",
        "APIs e integraciones",
        "Modernización de herramientas internas",
      ],
      clients: "Pymes y equipos con procesos específicos.",
    },
    en: {
      title: "Custom software",
      summary:
        "Applications and systems built around the way your operation actually works.",
      problem: "Your team relies on spreadsheets, manual work or disconnected tools.",
      deliverables: [
        "Web applications and internal dashboards",
        "Management systems",
        "APIs and integrations",
        "Modernization of internal tools",
      ],
      clients: "SMBs and teams with specific processes.",
    },
  },
  {
    id: "automation",
    es: {
      title: "Automatización e IA",
      summary:
        "Flujos y asistentes que reducen trabajo repetitivo sin perder control humano.",
      problem: "Tareas rutinarias consumen tiempo y dificultan el crecimiento.",
      deliverables: [
        "Automatizaciones con n8n",
        "Agentes, asistentes y chatbots",
        "Procesamiento de información",
        "Integraciones con servicios de IA",
      ],
      clients: "Equipos que necesitan ganar capacidad operativa.",
    },
    en: {
      title: "Automation and AI",
      summary:
        "Workflows and assistants that reduce repetitive work while keeping people in control.",
      problem: "Routine tasks take time away from growth and customer work.",
      deliverables: [
        "n8n automations",
        "Agents, assistants and chatbots",
        "Information processing",
        "AI service integrations",
      ],
      clients: "Teams that need more operational capacity.",
    },
  },
  {
    id: "crm",
    es: {
      title: "CRM, chatbots e integraciones",
      summary:
        "Canales de atención y herramientas conectadas para operar con mayor contexto.",
      problem: "La información de clientes está dispersa entre varias plataformas.",
      deliverables: [
        "Implementación y personalización de CRM",
        "Chatwoot self-hosted",
        "APIs, webhooks y canales de atención",
        "Conexiones con correo y WhatsApp",
      ],
      clients: "Empresas, agencias y equipos comerciales.",
    },
    en: {
      title: "CRM, chatbots and integrations",
      summary:
        "Connected customer channels and tools that give your team better context.",
      problem: "Customer information is scattered across multiple platforms.",
      deliverables: [
        "CRM implementation and customization",
        "Self-hosted Chatwoot",
        "APIs, webhooks and service channels",
        "Email and WhatsApp connections",
      ],
      clients: "Companies, agencies and sales teams.",
    },
  },
  {
    id: "infrastructure",
    es: {
      title: "Hosting e infraestructura",
      summary:
        "Despliegue, mantenimiento y soporte para que tus soluciones sigan disponibles.",
      problem: "Tu plataforma necesita continuidad técnica y una base confiable.",
      deliverables: [
        "Hosting administrado y VPS",
        "Docker, dominios y SSL",
        "Respaldos y monitoreo básico",
        "Migraciones, actualizaciones y soporte",
      ],
      clients: "Proyectos que requieren operación y acompañamiento continuo.",
    },
    en: {
      title: "Hosting and infrastructure",
      summary:
        "Deployment, maintenance and support that keep your digital products available.",
      problem: "Your platform needs technical continuity and a reliable foundation.",
      deliverables: [
        "Managed hosting and VPS",
        "Docker, domains and SSL",
        "Backups and basic monitoring",
        "Migrations, updates and support",
      ],
      clients: "Projects that need ongoing operation and support.",
    },
  },
  {
    id: "consulting",
    es: {
      title: "Consultoría tecnológica",
      summary:
        "Diagnóstico y acompañamiento para tomar mejores decisiones técnicas.",
      problem: "Necesitas claridad antes de invertir, migrar o implementar una solución.",
      deliverables: [
        "Diagnóstico y arquitectura",
        "Selección de herramientas",
        "Evaluación de factibilidad",
        "Acompañamiento para agencias y empresas",
      ],
      clients: "Organizaciones y agencias que necesitan un socio técnico.",
    },
    en: {
      title: "Technology consulting",
      summary:
        "Diagnosis and technical guidance for better investment and implementation decisions.",
      problem: "You need clarity before investing, migrating or building a solution.",
      deliverables: [
        "Technical diagnosis and architecture",
        "Tool selection",
        "Feasibility assessment",
        "Technical support for agencies and companies",
      ],
      clients: "Organizations and agencies looking for a technical partner.",
    },
  },
] as const;

export const projects = [
  {
    slug: "bkids",
    clientName: "BKids",
    featured: true,
    published: true,
    websiteUrl: "",
    es: {
      title: "Recuperación y continuidad de una presencia digital",
      summary:
        "Rediseñamos una experiencia deficiente y devolvimos al negocio un canal web claro, adaptable y acompañado.",
      context:
        "BKids necesitaba recuperar su presencia digital después de un desarrollo deficiente, sin soporte ni continuidad operativa.",
      problem: [
        "Sitio no responsive y difícil de mantener.",
        "Falta de claridad sobre la operación técnica.",
        "Ausencia de soporte después de la entrega.",
      ],
      solution: [
        "Desarrollo de un sitio responsive adaptado a la marca.",
        "Configuración, publicación y hosting administrado.",
        "Mantenimiento continuo y atención directa.",
      ],
      results: [
        "Sitio operativo en distintos dispositivos.",
        "Canal centralizado para recibir consultas.",
        "Continuidad técnica y acompañamiento cercano.",
      ],
      services: ["Desarrollo web", "Hosting", "Mantenimiento", "Soporte"],
    },
    en: {
      title: "Recovering a digital presence and its continuity",
      summary:
        "We replaced a poor experience with a clear, responsive web channel backed by ongoing support.",
      context:
        "BKids needed to recover its digital presence after receiving a poor website with no technical continuity.",
      problem: [
        "Non-responsive website that was difficult to maintain.",
        "Little clarity around technical operation.",
        "No support after delivery.",
      ],
      solution: [
        "Responsive development adapted to the brand.",
        "Setup, publishing and managed hosting.",
        "Ongoing maintenance and direct support.",
      ],
      results: [
        "An operational website across devices.",
        "A central channel for inquiries.",
        "Technical continuity and close support.",
      ],
      services: ["Web development", "Hosting", "Maintenance", "Support"],
    },
  },
  {
    slug: "1percentil",
    clientName: "1Percentil",
    featured: true,
    published: true,
    websiteUrl: "https://1percentil.cl",
    es: {
      title: "Una plataforma para ordenar postulaciones y contenido",
      summary:
        "Convertimos un proceso gestionado desde Instagram en una experiencia centralizada para informar y postular.",
      context:
        "La mentoría dependía principalmente de Instagram para comunicar fechas, recibir postulaciones y mostrar reseñas.",
      problem: [
        "Postulaciones y fechas difíciles de ordenar.",
        "Información comercial dispersa.",
        "Dependencia de una plataforma social.",
      ],
      solution: [
        "Diseño y desarrollo de un sitio propio.",
        "Flujo de postulación y gestión visual de fechas.",
        "Presentación centralizada de información y reseñas.",
      ],
      results: [
        "Proceso de postulación más ordenado.",
        "Presencia digital independiente de Instagram.",
        "Información y validación social en un solo lugar.",
      ],
      services: ["UX/UI", "Desarrollo web", "Hosting", "Mantenimiento"],
    },
    en: {
      title: "A platform that organizes applications and content",
      summary:
        "We turned an Instagram-led process into a central experience for information and applications.",
      context:
        "The mentorship relied mainly on Instagram to announce dates, collect applications and share reviews.",
      problem: [
        "Applications and dates were hard to organize.",
        "Commercial information was scattered.",
        "The program depended on a social platform.",
      ],
      solution: [
        "Design and development of an owned website.",
        "Application flow and visual date management.",
        "Central presentation of information and reviews.",
      ],
      results: [
        "A more organized application process.",
        "A digital presence independent from Instagram.",
        "Information and social proof in one place.",
      ],
      services: ["UX/UI", "Web development", "Hosting", "Maintenance"],
    },
  },
  {
    slug: "onpoint-marketing",
    clientName: "OnPoint Marketing",
    featured: false,
    published: process.env.NEXT_PUBLIC_ENABLE_ONPOINT === "true",
    websiteUrl: "",
    es: {
      title: "Infraestructura propia para una operación de atención digital",
      summary:
        "Consultoría e implementación técnica de una plataforma de atención self-hosted y personalizada.",
      context:
        "El cliente necesitaba mayor control, personalización e infraestructura propia para su operación CRM y chatbot.",
      problem: [
        "Dependencia de una modalidad cloud externa.",
        "Necesidad de mayor control técnico y visual.",
        "Base insuficiente para futuras integraciones.",
      ],
      solution: [
        "Consultoría y preparación de infraestructura VPS.",
        "Implementación productiva de Chatwoot Community Edition.",
        "Personalización visual y preparación de integraciones.",
      ],
      results: [
        "Operación en infraestructura controlada por el cliente.",
        "Experiencia alineada con la identidad de OnPoint.",
        "Base preparada para evolución e integraciones.",
      ],
      services: ["Consultoría", "Chatwoot", "VPS", "Infraestructura"],
    },
    en: {
      title: "Owned infrastructure for a digital support operation",
      summary:
        "Technical consulting and implementation of a self-hosted, customized customer service platform.",
      context:
        "The client needed more control, customization and owned infrastructure for its CRM and chatbot operation.",
      problem: [
        "Dependence on an external cloud model.",
        "Need for greater technical and visual control.",
        "A limited base for future integrations.",
      ],
      solution: [
        "Technical consulting and VPS preparation.",
        "Production deployment of Chatwoot Community Edition.",
        "Visual customization and integration readiness.",
      ],
      results: [
        "Operation on client-controlled infrastructure.",
        "Experience aligned with OnPoint's identity.",
        "A foundation ready for evolution and integrations.",
      ],
      services: ["Consulting", "Chatwoot", "VPS", "Infrastructure"],
    },
  },
] as const;

export const faq = {
  es: [
    [
      "¿Qué tipo de proyectos desarrolla DreamWeb?",
      "Desarrollamos sitios web, software a medida, automatizaciones, soluciones con IA, integraciones, CRM e infraestructura. Primero entendemos el problema y luego definimos la solución adecuada.",
    ],
    [
      "¿Cómo se define el valor de un proyecto?",
      "Cada proyecto se evalúa según alcance, complejidad, integraciones, infraestructura y necesidades de acompañamiento. No trabajamos con precios rígidos sin conocer el contexto.",
    ],
    [
      "¿Cuánto demora un desarrollo?",
      "Depende del alcance y de las decisiones pendientes. Después del levantamiento entregamos una propuesta con etapas y una planificación realista.",
    ],
    [
      "¿Pueden mejorar o continuar un proyecto existente?",
      "Sí. Revisamos el estado técnico, identificamos riesgos y proponemos si conviene corregir, modernizar o reconstruir partes específicas.",
    ],
    [
      "¿Ofrecen hosting y mantenimiento?",
      "Sí. Podemos administrar hosting, despliegues, respaldos, actualizaciones y soporte como parte del proyecto o como servicio independiente.",
    ],
    [
      "¿Trabajan fuera de Santiago o con clientes internacionales?",
      "Sí. Atendemos proyectos en todo Chile y también colaboramos de forma remota con clientes internacionales.",
    ],
    [
      "¿Qué ocurre después de entregar el proyecto?",
      "Acompañamos la puesta en marcha, capacitación y soporte. La continuidad se define según las necesidades de cada solución.",
    ],
    [
      "¿Cómo comienza un proyecto?",
      "Comienza con una conversación breve para entender el objetivo, el problema y el contexto. Luego proponemos el enfoque y los siguientes pasos.",
    ],
  ],
  en: [
    [
      "What kind of projects does DreamWeb build?",
      "We build websites, custom software, automations, AI solutions, integrations, CRM systems and infrastructure. We start with the problem and define the right solution from there.",
    ],
    [
      "How is a project priced?",
      "Each project is evaluated according to scope, complexity, integrations, infrastructure and support requirements. We do not use rigid prices without understanding the context.",
    ],
    [
      "How long does development take?",
      "It depends on scope and pending decisions. After discovery, we provide a proposal with clear stages and a realistic plan.",
    ],
    [
      "Can you improve or continue an existing project?",
      "Yes. We assess the technical state, identify risks and recommend whether to repair, modernize or rebuild specific parts.",
    ],
    [
      "Do you provide hosting and maintenance?",
      "Yes. We can manage hosting, deployments, backups, updates and support as part of a project or as a standalone service.",
    ],
    [
      "Do you work with international clients?",
      "Yes. We work remotely across Chile and can collaborate with international clients.",
    ],
    [
      "What happens after delivery?",
      "We support launch, training and ongoing operation. The continuity plan is defined around each solution.",
    ],
    [
      "How does a project begin?",
      "It starts with a short conversation about the goal, the problem and the current context. We then recommend an approach and next steps.",
    ],
  ],
} as const;

const titles: Record<Locale, Record<PageKey, [string, string]>> = {
  es: {
    home: [
      "Soluciones digitales de principio a fin",
      "Creamos sitios web, software, automatizaciones e infraestructura para negocios en Chile.",
    ],
    services: [
      "Servicios digitales",
      "Desarrollo web, software, IA, automatización e infraestructura adaptada a tu negocio.",
    ],
    projects: [
      "Proyectos",
      "Casos reales de soluciones digitales construidas para ordenar, recuperar y hacer avanzar negocios.",
    ],
    about: [
      "Conoce DreamWeb",
      "Una marca chilena de soluciones digitales, cercana en el proceso y rigurosa en la implementación.",
    ],
    contact: [
      "Contacto",
      "Agenda una reunión o cuéntanos qué necesitas resolver. Respondemos dentro de 24 horas hábiles.",
    ],
    privacy: ["Política de privacidad", "Cómo DreamWeb Chile trata y protege los datos personales."],
    terms: ["Términos", "Condiciones generales de uso del sitio y contratación de servicios."],
    cookies: ["Política de cookies", "Uso de tecnologías necesarias, analíticas y de marketing."],
  },
  en: {
    home: [
      "End-to-end digital solutions",
      "We build websites, software, automations and infrastructure for businesses in Chile and abroad.",
    ],
    services: [
      "Digital services",
      "Web development, software, AI, automation and infrastructure tailored to your business.",
    ],
    projects: [
      "Projects",
      "Real digital solutions built to organize, recover and move businesses forward.",
    ],
    about: [
      "About DreamWeb",
      "A Chilean digital solutions brand: close throughout the process and rigorous in implementation.",
    ],
    contact: [
      "Contact",
      "Book a meeting or tell us what you need to solve. We reply within 24 business hours.",
    ],
    privacy: ["Privacy policy", "How DreamWeb Chile handles and protects personal data."],
    terms: ["Terms", "General conditions for using this website and engaging our services."],
    cookies: ["Cookie policy", "Use of necessary, analytics and marketing technologies."],
  },
};

export function pageMetadata(locale: Locale, page: PageKey): Metadata {
  const [title, description] = titles[locale][page];
  const canonical = paths[locale][page];
  const alternate = paths[locale === "es" ? "en" : "es"][page];

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "es-CL": locale === "es" ? canonical : alternate,
        en: locale === "en" ? canonical : alternate,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: locale === "es" ? "es_CL" : "en_US",
      images: [{ url: "/og.png", width: 1728, height: 910, alt: "DreamWeb Chile" }],
    },
    twitter: { card: "summary_large_image", images: ["/og.png"] },
  };
}

export function whatsappHref(locale: Locale) {
  const fallback =
    locale === "es"
      ? "Hola, vi el sitio de DreamWeb Chile y me gustaría conversar sobre una solución digital para mi negocio."
      : "Hi, I found the DreamWeb Chile website and would like to discuss a digital solution for my business.";
  const configured = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || fallback;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(configured)}`;
}
