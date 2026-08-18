import type { Locale } from "@/lib/i18n";

export type CookieBannerContent = {
  accept: string;
  alwaysActive: string;
  analyticsDescription: string;
  analyticsLabel: string;
  analyticsTitle: string;
  ariaLabel: string;
  description: string;
  necessaryDescription: string;
  necessaryTitle: string;
  reject: string;
  saveSettings: string;
  settings: string;
  title: string;
};

export type ContactFormContent = {
  company: string;
  email: string;
  error: string;
  message: string;
  name: string;
  submit: string;
  submitting: string;
  success: string;
  validationMessage: string;
  website: string;
};

type SiteContent = {
  header: {
    contact: string;
    process: string;
    security: string;
    services: string;
    tagline: string;
  };
  hero: {
    badge: string;
    cardEyebrow: string;
    description: string;
    highlights: Array<{ title: string; description: string }>;
    primaryCta: string;
    secondaryCta: string;
    title: string;
  };
  services: {
    description: string;
    eyebrow: string;
    items: Array<{ title: string; description: string }>;
    title: string;
  };
  security: {
    description: string;
    eyebrow: string;
    points: Array<{ title: string; description: string }>;
    title: string;
  };
  process: {
    description: string;
    eyebrow: string;
    steps: Array<{ title: string; description: string }>;
    title: string;
  };
  contact: {
    complianceDescription: string;
    complianceTitle: string;
    description: string;
    eyebrow: string;
    form: ContactFormContent;
    title: string;
  };
  cookieBanner: CookieBannerContent;
  privacy: {
    backToHome: string;
    introduction: string;
    sections: Array<{ title: string; body: string }>;
    title: string;
  };
  footer: {
    copy: string;
    home: string;
    privacy: string;
  };
};

export const siteContent: Record<Locale, SiteContent> = {
  sv: {
    header: {
      contact: "Kontakt",
      process: "Arbetsprocess",
      security: "Säkerhet & compliance",
      services: "Tjänster",
      tagline: "AI-automation med EU-hostad leverans",
    },
    hero: {
      badge: "GDPR-först • EU-hosting • Produktion inom veckor",
      cardEyebrow: "Vad ni får",
      description:
        "Hiristic hjälper företag att automatisera verksamhetskritiska flöden med AI, orkestrering och integrationsplattformar som utvecklas och driftas inom EU.",
      highlights: [
        {
          title: "EU-baserad verktygsstack",
          description:
            "Vi designar lösningar med modeller, databaser och automationsverktyg som kan driftas inom EU för att minimera juridisk och operativ risk.",
        },
        {
          title: "Snabb väg till värde",
          description:
            "Från pilot till produktion med fokus på processer där automation ger tydlig effekt i tid, kvalitet och skalbarhet.",
        },
        {
          title: "Styrning och spårbarhet",
          description:
            "Rollbaserad åtkomst, loggning och tydliga integrationsgränser gör att era interna team kan ta över och vidareutveckla lösningen säkert.",
        },
      ],
      primaryCta: "Boka ett möte",
      secondaryCta: "Läs om integritet",
      title: "Automatisera kärnprocesser med AI utan att exportera data utanför EU.",
    },
    services: {
      description:
        "Vi levererar design, implementation och driftstöd för automation som knyter ihop era system med robust styrning.",
      eyebrow: "Tjänster",
      items: [
        {
          title: "AI-agenter & arbetsflöden",
          description:
            "Bygg AI-stödda processer för kundservice, intern support, dokumenthantering och beslutsstöd med tydliga guardrails.",
        },
        {
          title: "Integrationer & orkestrering",
          description:
            "Koppla CRM, ERP, ärendehantering, datalager och interna API:er i styrda flöden med övervakning och fallback-logik.",
        },
        {
          title: "Operativisering & enablement",
          description:
            "Sätt upp mätetal, ansvarsfördelning, incidentrutiner och utbildning så att automationen blir en trygg del av er verksamhet.",
        },
      ],
      title: "Teknisk leverans från strategi till produktion",
    },
    security: {
      description:
        "Varje lösning utformas för att stödja dataminimering, tydlig personuppgiftshantering och EU-baserad drift där det är möjligt och affärskritiskt.",
      eyebrow: "Säkerhet & compliance",
      points: [
        {
          title: "GDPR-anpassad design",
          description:
            "Vi kartlägger personuppgifter, lagringsytor och integrationspunkter för att minska exponering och underlätta DPIA/avtal.",
        },
        {
          title: "EU-hosting och data residency",
          description:
            "Vi prioriterar leverantörer och deploymentmönster som håller data inom EU och undviker onödig dataexport till USA.",
        },
        {
          title: "Säker drift",
          description:
            "Miljöseparation, sekretesshantering, åtkomstkontroller och loggning byggs in från start i dev, staging och prod.",
        },
        {
          title: "Tydlig ansvarsfördelning",
          description:
            "Vi dokumenterar vilka system som behandlar data, vad som skickas vidare och vilka kontroller som krävs vid förändring.",
        },
      ],
      title: "Compliance som en del av arkitekturen",
    },
    process: {
      description:
        "Vi arbetar iterativt med korta feedbackloopar och tydliga kvalitetssäkringar innan nya automatiseringar går live.",
      eyebrow: "Arbetsprocess",
      steps: [
        {
          title: "Kartläggning & prioritering",
          description:
            "Vi identifierar processer med hög automationseffekt, beroenden mellan system och vilka dataskyddskrav som måste mötas.",
        },
        {
          title: "Bygg & verifiera",
          description:
            "Vi utvecklar lösningen med testbar arkitektur, separata miljöer och verifierar funktion, spårbarhet och säkerhetskrav.",
        },
        {
          title: "Driftsätt & förbättra",
          description:
            "Efter lansering följer vi upp KPI:er, incidentmönster och nya automationsmöjligheter för att fortsätta öka värdet.",
        },
      ],
      title: "Ett leveransupplägg som passar reglerad verksamhet",
    },
    contact: {
      complianceDescription:
        "Kontaktförfrågningar skickas via en server-side proxy som läser EU-hostad endpoint från miljövariabler. Inga hemligheter exponeras i klienten.",
      complianceTitle: "Kontaktflöde med EU-hostad endpoint",
      description:
        "Berätta vilka processer ni vill automatisera så återkommer vi med ett första förslag på upplägg, teknikval och dataskyddsbedömning.",
      eyebrow: "Kontakta oss",
      form: {
        company: "Företag",
        email: "E-post",
        error: "Vi kunde inte skicka formuläret just nu. Försök igen om en stund.",
        message: "Vad vill ni automatisera?",
        name: "Namn",
        submit: "Skicka förfrågan",
        submitting: "Skickar...",
        success: "Tack! Vi återkommer så snart som möjligt.",
        validationMessage: "Kontrollera formuläret och försök igen.",
        website: "Webbplats",
      },
      title: "Redo att bygga er nästa AI-drivna process?",
    },
    cookieBanner: {
      accept: "Acceptera alla",
      alwaysActive: "Alltid aktiv",
      analyticsDescription: "Hjälper oss förstå hur sidan används så att vi kan förbättra upplevelsen.",
      analyticsLabel: "Tillåt analyscookies",
      analyticsTitle: "Analyscookies",
      ariaLabel: "Cookiebanner",
      description:
        "Vi använder nödvändiga cookies för språk- och samtyckesinställningar. Du kan även välja om analyscookies får användas.",
      necessaryDescription: "Behövs för att spara dina samtyckesval och leverera grundläggande funktionalitet.",
      necessaryTitle: "Nödvändiga cookies",
      reject: "Avvisa valfria",
      saveSettings: "Spara inställningar",
      settings: "Inställningar",
      title: "Hantera cookies",
    },
    privacy: {
      backToHome: "Till startsidan",
      introduction:
        "Hiristic behandlar personuppgifter med målet att minimera datamängd, tydliggöra ändamål och använda EU-baserad drift där det är möjligt.",
      sections: [
        {
          title: "Vilka uppgifter vi behandlar",
          body:
            "När du kontaktar oss behandlar vi normalt namn, e-post, företagstillhörighet och det meddelande du skickar. Uppgifterna används endast för att besvara förfrågan och planera fortsatt dialog.",
        },
        {
          title: "Hur uppgifter lagras",
          body:
            "Kontaktförfrågningar skickas till en EU-hostad endpoint via vår server-side proxy. Vi undviker att exponera API-nycklar i klienten och begränsar åtkomst till personer som behöver informationen för att hjälpa dig.",
        },
        {
          title: "Cookies och samtycke",
          body:
            "Vi lagrar ditt cookie-samtycke lokalt i webbläsaren och i en enkel cookie så att bannern inte visas i onödan. Nödvändiga cookies kan inte stängas av eftersom de krävs för grundläggande funktioner.",
        },
        {
          title: "Dina rättigheter",
          body:
            "Du kan begära information om vilka uppgifter vi behandlar, be om rättelse eller begära radering när det är tillämpligt. Kontakta privacy@hiristic.eu för frågor om integritet eller dataskydd.",
        },
      ],
      title: "Integritetspolicy",
    },
    footer: {
      copy: "© Hiristic. AI-automation med fokus på EU-hosting, dataskydd och mätbart affärsvärde.",
      home: "Startsida",
      privacy: "Integritet",
    },
  },
  en: {
    header: {
      contact: "Contact",
      process: "Process",
      security: "Security & compliance",
      services: "Services",
      tagline: "AI automation delivered with EU hosting",
    },
    hero: {
      badge: "GDPR-first • EU hosting • Production-ready delivery",
      cardEyebrow: "What you get",
      description:
        "Hiristic helps companies automate business-critical workflows with AI, orchestration, and integration tooling developed and operated within the EU.",
      highlights: [
        {
          title: "EU-based tooling stack",
          description:
            "We design solutions with models, databases, and automation tooling that can run in the EU to reduce legal and operational risk.",
        },
        {
          title: "Fast path to value",
          description:
            "From pilot to production with a focus on processes where automation creates measurable improvements in speed, quality, and scale.",
        },
        {
          title: "Governance and traceability",
          description:
            "Role-based access, logging, and clear integration boundaries make it safe for your internal teams to own and extend the solution.",
        },
      ],
      primaryCta: "Book a call",
      secondaryCta: "Read our privacy policy",
      title: "Automate core processes with AI without exporting data outside the EU.",
    },
    services: {
      description:
        "We deliver design, implementation, and operational support for automation programs that connect your systems with strong governance.",
      eyebrow: "Services",
      items: [
        {
          title: "AI agents & workflows",
          description:
            "Create AI-assisted processes for customer support, internal help desks, document handling, and decision support with clear guardrails.",
        },
        {
          title: "Integrations & orchestration",
          description:
            "Connect CRM, ERP, service desks, data platforms, and internal APIs in governed flows with monitoring and fallback logic.",
        },
        {
          title: "Operational rollout & enablement",
          description:
            "Define KPIs, ownership, incident routines, and training so automation becomes a reliable part of daily operations.",
        },
      ],
      title: "Technical delivery from strategy to production",
    },
    security: {
      description:
        "Every solution is designed to support data minimisation, explicit personal-data handling, and EU-based operations wherever feasible and business-critical.",
      eyebrow: "Security & compliance",
      points: [
        {
          title: "GDPR-aligned design",
          description:
            "We map personal-data flows, storage locations, and integrations to reduce exposure and simplify DPIA and contractual reviews.",
        },
        {
          title: "EU hosting and data residency",
          description:
            "We prioritise vendors and deployment patterns that keep data within the EU and avoid unnecessary exports to the United States.",
        },
        {
          title: "Secure operations",
          description:
            "Environment separation, secrets handling, access controls, and logging are built in from day one across dev, staging, and production.",
        },
        {
          title: "Clear accountability",
          description:
            "We document which systems process data, what gets forwarded, and which controls are required before changes are introduced.",
        },
      ],
      title: "Compliance embedded in the architecture",
    },
    process: {
      description:
        "We work iteratively with short feedback loops and explicit quality gates before new automations go live.",
      eyebrow: "Process",
      steps: [
        {
          title: "Discovery & prioritisation",
          description:
            "We identify processes with the highest automation upside, map system dependencies, and capture the data protection requirements that must be met.",
        },
        {
          title: "Build & verify",
          description:
            "We implement with a testable architecture, separate environments, and verification for functionality, traceability, and security requirements.",
        },
        {
          title: "Launch & improve",
          description:
            "After launch we track KPIs, incident patterns, and new automation opportunities to keep compounding value.",
        },
      ],
      title: "A delivery model suited for regulated operations",
    },
    contact: {
      complianceDescription:
        "Contact requests are sent through a server-side proxy that reads the EU-hosted endpoint from environment variables. No secrets are exposed in the client.",
      complianceTitle: "Contact flow using an EU-hosted endpoint",
      description:
        "Tell us which processes you want to automate and we will respond with an initial proposal covering delivery approach, technical options, and data protection considerations.",
      eyebrow: "Get in touch",
      form: {
        company: "Company",
        email: "Email",
        error: "We could not submit the form right now. Please try again shortly.",
        message: "What would you like to automate?",
        name: "Name",
        submit: "Send request",
        submitting: "Sending...",
        success: "Thank you! We will get back to you shortly.",
        validationMessage: "Please review the form and try again.",
        website: "Website",
      },
      title: "Ready to build your next AI-powered workflow?",
    },
    cookieBanner: {
      accept: "Accept all",
      alwaysActive: "Always active",
      analyticsDescription: "Helps us understand how the site is used so we can improve the experience.",
      analyticsLabel: "Allow analytics cookies",
      analyticsTitle: "Analytics cookies",
      ariaLabel: "Cookie banner",
      description:
        "We use necessary cookies for language and consent preferences. You can also choose whether analytics cookies may be used.",
      necessaryDescription: "Required to remember your consent choices and provide core functionality.",
      necessaryTitle: "Necessary cookies",
      reject: "Reject optional",
      saveSettings: "Save settings",
      settings: "Settings",
      title: "Manage cookies",
    },
    privacy: {
      backToHome: "Back to homepage",
      introduction:
        "Hiristic processes personal data with the goal of minimising data volumes, clarifying purpose, and using EU-based operations whenever possible.",
      sections: [
        {
          title: "What data we process",
          body:
            "When you contact us, we typically process your name, email address, company affiliation, and the message you send. The data is only used to respond to your request and manage the follow-up dialogue.",
        },
        {
          title: "How data is stored",
          body:
            "Contact requests are sent to an EU-hosted endpoint through our server-side proxy. We avoid exposing API keys in the client and limit access to people who need the information to help you.",
        },
        {
          title: "Cookies and consent",
          body:
            "We store your cookie consent locally in the browser and in a simple cookie so the banner is not shown unnecessarily. Necessary cookies cannot be disabled because they are required for essential functionality.",
        },
        {
          title: "Your rights",
          body:
            "You may request information about the data we process, ask for corrections, or request deletion when applicable. Contact privacy@hiristic.eu with privacy or data protection questions.",
        },
      ],
      title: "Privacy policy",
    },
    footer: {
      copy: "© Hiristic. AI automation focused on EU hosting, data protection, and measurable business value.",
      home: "Homepage",
      privacy: "Privacy",
    },
  },
};
