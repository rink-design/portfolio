// Tekst per case. Beeldvolgorde komt uit de bestandsnamen in /public/work/<slug>/.
// Elke sectie verschijnt vóór het beeld met nummer `before` (optioneel; anders gelijk verdeeld).

export type Section = { label: string; text: string };
export type Site = { src: string; w: number; h: number; label: string };
// Opbouw van de case (tune-ronde 3 okt):
//  hero: "first" = eerste beeld van de case geheel in beeld (standaard; de cover is alléén een preview op de home) · "pair" = eerste twee beelden naast elkaar
//        "site" = eerste website in laptop · "phones" = telefoons op een rij · "none" = geen hero
export type CaseText = {
  statement: string; intro?: string; role?: string; sections: Section[];
  hero?: "first" | "pair" | "site" | "phones" | "none";
  sites?: Site[];          // echte websites, scrollbaar in een laptop
  videosAsPhones?: boolean; // losse video's in iPhones i.p.v. in het grid
  heroNatural?: boolean;
  sitesFirst?: boolean;     // websites vóór het grid
  centerGrid?: boolean;     // weinig beelden: in het midden    // hero-paar op eigen verhouding (meer ruimte, niet bijgesneden)
};

export const cases: Record<string, CaseText> = {
  jaja: {
    statement: "One brand. Every touchpoint.",
    role: "Creative Director & Designer, in-house.",
    videosAsPhones: true,
    hero: "site",
    sites: [
      { src: "/sites/jaja-b2b.webp", w: 1440, h: 6873, label: "B2B — jaja.net" },
      { src: "/sites/jaja-b2c.webp", w: 1440, h: 6088, label: "B2C — jajashop.com" },
    ],
    sections: [
      { label: "Identity", text: "The existing identity, evolved." },
      { label: "Products", text: "One identity, every product line." },
      { label: "Production", text: "Materials, print, finishes." },
      { label: "Campaigns", text: "Campaigns and activations." },
      { label: "Digital Design", text: "Digital brand assets." },
      { label: "Social", text: "Social formats and content." },
      { label: "Websites — B2B & B2C", text: "Two websites, designed and built." },
    ],
  },
  soiree: {
    statement: "A rebrand with a premium taste.",
    role: "Designer, full rebrand.",
    sections: [
      { label: "Concept", text: "Warm, premium repositioning." },
      { label: "Identity", text: "Logo, type and colour." },
      { label: "Graphics", text: "Patterns and elements." },
      { label: "Packaging", text: "Premium on pack, across the range." },
    ],
  },
  "purple-rain": {
    statement: "Same disciplines. A different world.",
    role: "Designer, full rebrand.",
    sections: [
      { label: "Concept", text: "Dreamy, exclusive, inspired by the sea." },
      { label: "Identity", text: "Logo, type and colour." },
      { label: "Graphics", text: "Fluid elements, drawn from the sea." },
      { label: "Packaging", text: "Exclusive on pack." },
    ],
  },
  "don-gelato": {
    statement: "A visual story, directed.",
    role: "Art Director & Designer.",
    sections: [
      { label: "Identity", text: "Type, colour and tone." },
      { label: "Packaging", text: "Pack and product presentation." },
      { label: "Art Direction", text: "The visual world of the brand." },
      { label: "Campaign Imagery", text: "Made with AI, art directed." },
    ],
  },
  "big-push": {
    statement: "A new position, made visible.",
    role: "Designer & Developer.",
    hero: "site",
    sites: [{ src: "/sites/bigpush.webp", w: 1440, h: 8371, label: "bigpush.nl" }],
    sections: [
      { label: "Concept", text: "Existing company, new direction." },
      { label: "Identity", text: "A new graphic foundation." },
      { label: "Website & Assets", text: "Designed and built, desktop and mobile." },
    ],
  },
  santani: {
    statement: "A creative launch. Concept to social.",
    hero: "phones",
    sitesFirst: true,
    centerGrid: true,
    sites: [{ src: "/sites/santani.webp", w: 1440, h: 9000, label: "santani.vercel.app" }],
    role: "Concept, project management and graphics. Team project, internship at Code d’Azur.",
    sections: [
      { label: "Concept", text: "The idea behind a canned drink." },
      { label: "Launch", text: "Introducing the can." },
      { label: "Creative Direction", text: "Visual direction." },
      { label: "Social Content", text: "Launch content, later made solo." },
    ],
  },
  "the-cat": {
    statement: "One briefing. Two answers.",
    role: "Designer, two concepts.",
    hero: "pair",
    heroNatural: true,
    intro: "The brief: a ladies’ edition. Ladies Bag.",
    sections: [
      { label: "Concept", text: "Two directions for a ladies’ edition." },
      { label: "Graphics", text: "Two graphic worlds." },
      { label: "Packaging", text: "Both concepts, on pack." },
    ],
  },
  purple: {
    statement: "A coffeeshop, rebranded.",
    role: "Designer, full rebrand.",
    intro: "Coffeeshop in Vlissingen.",
    sections: [
      { label: "Identity", text: "The new identity." },
      { label: "Product Development", text: "Merchandise, products, part of the interior." },
    ],
  },
  canajoy: {
    statement: "A brand, from idea to pack.",
    role: "Designer, brand and packaging.",
    hero: "pair",
    sections: [
      { label: "Identity", text: "Look and tone." },
      { label: "Packaging", text: "The brand on pack." },
    ],
  },
  "coffeeshop-packaging": {
    statement: "A packaging archive.",
    hero: "none",
    intro: "De Baron · Shiva · Highlife · Smokey · and more.",
    sections: [],
  },
};
