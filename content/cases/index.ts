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
    videosAsPhones: true,
    hero: "site",
    sites: [
      { src: "/sites/jaja-b2b.webp", w: 1440, h: 6873, label: "B2B — jaja.net" },
      { src: "/sites/jaja-b2c.webp", w: 1440, h: 6088, label: "B2C — jajashop.com" },
    ],
    sections: [
      { label: "Identity", text: "The visual identity." },
      { label: "Products", text: "One identity, every product line." },
      { label: "Production", text: "Materials, print, finishes." },
      { label: "Campaigns", text: "Campaigns and activations." },
      { label: "Digital Design", text: "Digital brand assets." },
      { label: "Social", text: "Social formats and content." },
      { label: "Websites — B2B & B2C", text: "Two websites, one brand world." },
    ],
  },
  soiree: {
    statement: "A complete rebrand. Idea to shelf.",
    sections: [
      { label: "Concept", text: "The idea behind the rebrand." },
      { label: "Identity", text: "Logo, type, colour." },
      { label: "Graphic", text: "Patterns, elements, systems." },
      { label: "Packaging", text: "The identity on pack." },
      { label: "Application", text: "Across every touchpoint." },
    ],
  },
  "purple-rain": {
    statement: "Same disciplines. A different world.",
    sections: [
      { label: "Concept", text: "[…]" },
      { label: "Identity", text: "Logo, type, colour." },
      { label: "Graphic", text: "Patterns, elements, systems." },
      { label: "Packaging", text: "The identity on pack." },
      { label: "Application", text: "Across every touchpoint." },
    ],
  },
  "don-gelato": {
    statement: "A visual story, directed.",
    sections: [
      { label: "Art Direction", text: "The visual world." },
      { label: "Graphic Identity", text: "Type, colour, brand language." },
      { label: "Packaging", text: "Pack and product presentation." },
      { label: "Application", text: "Across applications." },
      { label: "Campaign Photography", text: "Photography, styling, campaign imagery." },
    ],
  },
  "big-push": {
    statement: "A new position, made visible.",
    hero: "site",
    sites: [{ src: "/sites/bigpush.webp", w: 1440, h: 8371, label: "bigpush.nl" }],
    sections: [
      { label: "Concept", text: "New positioning and direction." },
      { label: "Identity", text: "The graphic foundation." },
      { label: "Website & Assets", text: "Desktop, mobile, digital assets." },
    ],
  },
  santani: {
    statement: "A creative launch. Concept to social.",
    hero: "phones",
    sitesFirst: true,
    centerGrid: true,
    sites: [{ src: "/sites/santani.webp", w: 1440, h: 9000, label: "santani.vercel.app" }],
    role: "Concept, project management and graphics, with fellow students during my internship at Code d’Azur. Later, social content independently, as part of my job.",
    sections: [
      { label: "Concept", text: "The creative foundation." },
      { label: "Launch", text: "How it was introduced." },
      { label: "Creative Direction", text: "Visual direction." },
      { label: "Social Content", text: "Launch content." },
    ],
  },
  "the-cat": {
    statement: "One briefing. Two answers.",
    hero: "pair",
    heroNatural: true,
    intro: "Ladies Bag",
    sections: [
      { label: "Concept 01", text: "Concept → Graphics → Packaging → Final visual" },
      { label: "Concept 02", text: "Concept → Graphics → Packaging → Final visual" },
      { label: "Side by side", text: "" },
    ],
  },
  purple: {
    statement: "A coffeeshop, rebranded.",
    intro: "Coffeeshop in Vlissingen.",
    sections: [
      { label: "Concept Development", text: "[…]" },
      { label: "Identity", text: "The new house style." },
      { label: "Product Development", text: "[…]" },
    ],
  },
  canajoy: {
    statement: "[…]",
    hero: "pair",
    sections: [{ label: "Product Development", text: "[…]" }],
  },
  "coffeeshop-packaging": {
    statement: "A packaging archive.",
    hero: "none",
    intro: "De Baron · Shiva · Highlife · Smokey · and more.",
    sections: [],
  },
};
