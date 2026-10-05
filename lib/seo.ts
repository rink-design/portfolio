// Alles voor zoekmachines op één plek: naam, adres, gegevens en de verborgen JSON-LD.
import { contact, projects } from "@/content/projects";
import { about } from "@/content/about";

export const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.byrink.com";
export const PERSON = "Rinke van de Rakt";
export const BRAND = "RINK Design";
export const TITLE = "RINK Design — Freelance Brand & Packaging Designer in Amsterdam";
export const DESCRIPTION =
  "Rinke van de Rakt (RINK Design) is a freelance brand, packaging and art direction designer in Amsterdam, working in the Randstad and remote.";

const AREA = ["Amsterdam", "Randstad", "Netherlands"].map((name) => ({ "@type": "Place", name }));

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: BRAND,
      inLanguage: "en",
      publisher: { "@id": `${SITE}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE}/#person`,
      name: PERSON,
      alternateName: [BRAND, "RINK"],
      url: SITE,
      jobTitle: "Freelance Brand & Packaging Designer",
      email: contact.email,
      telephone: contact.phone,
      sameAs: [contact.linkedin],
      address: { "@type": "PostalAddress", addressLocality: "Amsterdam", addressCountry: "NL" },
      knowsAbout: about.services,
      alumniOf: about.education.map((e) => ({ "@type": "EducationalOrganization", name: e.name })),
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#service`,
      name: BRAND,
      url: SITE,
      image: `${SITE}/opengraph-image.png`,
      description: DESCRIPTION,
      email: contact.email,
      telephone: contact.phone,
      founder: { "@id": `${SITE}/#person` },
      address: { "@type": "PostalAddress", addressLocality: "Amsterdam", addressCountry: "NL" },
      areaServed: AREA,
      sameAs: [contact.linkedin],
      knowsAbout: about.services,
      makesOffer: about.services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
    },
  ],
};

export function caseJsonLd(slug: string, description: string) {
  const p = projects.find((x) => x.slug === slug);
  if (!p) return null;
  const url = `${SITE}/work/${slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        url,
        name: p.title,
        description,
        image: p.cover ? `${SITE}${p.cover}` : undefined,
        genre: p.disciplines.split(" / "),
        creator: { "@id": `${SITE}/#person` },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: BRAND, item: SITE },
          { "@type": "ListItem", position: 2, name: p.title, item: url },
        ],
      },
    ],
  };
}
