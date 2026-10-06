import { SITE } from "@/lib/site";

export const ORIGIN =
  (typeof import.meta !== "undefined" &&
    (import.meta.env.VITE_SITE_URL as string | undefined)) ||
  SITE.url;

export const PAGES = {
  home: {
    path: "/",
    title: "Pegasus MedFlight | Medical Courier, Phoenix & San Diego",
    description:
      "Pegasus MedFlight is a medical logistics intelligence system with courier execution. Target markets: Phoenix and San Diego. Documented chain of custody, STAT and scheduled trips, PEGA1 telemetry. Not an air ambulance. Reliable. Traceable. Compliant.",
  },
  stack: {
    path: "/stack",
    title: "The Stack — THE SKY, CAPTAIN, PEGA1 | Pegasus MedFlight",
    description:
      "THE SKY, SKY Bay, SKY Linq, CAPTAIN, and PEGA1: the vertically integrated medical courier stack. Live telemetry, FSD, Sentry Mode, and AI-assisted dispatch on Phoenix and San Diego trips.",
  },
  system: {
    path: "/system",
    title: "Medical Logistics Intelligence — Execute, Analyze, Forecast | Pegasus MedFlight",
    description:
      "How Pegasus MedFlight turns documented medical courier trips into operational insight: Execute, Analyze, Forecast. Trip history first. EHR and FHIR connections later, with permission.",
  },
  partners: {
    path: "/partners",
    title: "Launch Program — Phoenix & San Diego | Pegasus MedFlight",
    description:
      "Apply for a defined, paid medical logistics Launch Program in Phoenix or San Diego. One route, corridor, or STAT backup — not a demo.",
  },
  request: {
    path: "/request",
    title: "Get Started — Medical Partners & Drivers | Pegasus MedFlight",
    description:
      "Apply as a Medical Partner or as a PEGA1 driver for Pegasus MedFlight in Phoenix or San Diego. Tell us cargo, frequency, certifications, and when to call.",
  },
} as const;

export type PageKey = keyof typeof PAGES;

export function seoHead(key: PageKey) {
  const page = PAGES[key];
  const url = `${ORIGIN}${page.path}`;
  const image = `${ORIGIN}/og.jpg`;
  return {
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      {
        name: "keywords",
        content:
          "Pegasus MedFlight, medical courier Phoenix, medical courier San Diego, medical logistics intelligence, STAT courier Arizona, STAT courier San Diego, lab specimen transport, chain of custody courier, HIPAA medical courier, PEGA1, CAPTAIN, THE SKY",
      },
      { name: "author", content: SITE.legal.entity },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "googlebot", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE.name },
      { property: "og:locale", content: "en_US" },
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: `${SITE.name} — ${SITE.tagline}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@medflight23" },
      { name: "twitter:title", content: page.title },
      { name: "twitter:description", content: page.description },
      { name: "twitter:image", content: image },
      { name: "theme-color", content: "#070f18" },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", type: "text/plain", href: `${ORIGIN}/llms.txt`, title: "LLM context" },
    ],
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${ORIGIN}/#org`,
        name: SITE.name,
        legalName: SITE.legal.entity,
        alternateName: [SITE.shortName, SITE.legal.dba],
        url: ORIGIN,
        image: `${ORIGIN}/og.jpg`,
        logo: `${ORIGIN}/images/pegasus-official.png`,
        description: SITE.oneLiner,
        slogan: SITE.tagline,
        email: SITE.email,
        foundingDate: String(SITE.founded),
        founder: {
          "@type": "Person",
          name: SITE.legal.founder,
          jobTitle: SITE.legal.role,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Chandler",
          addressRegion: "AZ",
          addressCountry: "US",
        },
        areaServed: [
          "Phoenix",
          "Tempe",
          "Mesa",
          "Chandler",
          "Gilbert",
          "Scottsdale",
          "Queen Creek",
          "Phoenix metro",
          "San Diego",
          "La Jolla",
          "Hillcrest",
          "Kearny Mesa",
          "Chula Vista",
          "Oceanside",
          "San Diego County",
        ],
        knowsAbout: [
          "medical courier",
          "medical logistics intelligence",
          "chain of custody",
          "STAT delivery",
          "laboratory specimen transport",
          "HIPAA-aware logistics",
        ],
        disambiguatingDescription:
          "Ground medical courier and logistics intelligence company. Not an air ambulance.",
      },
      {
        "@type": "WebSite",
        "@id": `${ORIGIN}/#website`,
        url: ORIGIN,
        name: SITE.name,
        description: SITE.description,
        publisher: { "@id": `${ORIGIN}/#org` },
        inLanguage: "en-US",
      },
      {
        "@type": "Service",
        "@id": `${ORIGIN}/#service`,
        name: "Medical courier and logistics intelligence",
        serviceType: "Medical courier",
        provider: { "@id": `${ORIGIN}/#org` },
        areaServed: ["Phoenix, Arizona", "San Diego, California"],
        offers: {
          "@type": "Offer",
          name: "Phoenix and San Diego Launch Program",
          url: `${ORIGIN}/partners`,
          description:
            "Defined, paid medical logistics engagement with written scope, PEGA1 trips, and chain-of-custody records.",
        },
      },
    ],
  };
}

export function breadcrumbJsonLd(key: PageKey) {
  const page = PAGES[key];
  const items = [
    { name: SITE.name, path: "/" },
    ...(key === "home" ? [] : [{ name: page.title.split("|")[0].trim(), path: page.path }]),
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${ORIGIN}${item.path}`,
    })),
  };
}
