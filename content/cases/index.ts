// Tekst per case. Beeldvolgorde komt uit de bestandsnamen in /public/work/<slug>/.
// Elke sectie verschijnt vóór het beeld met nummer `before` (optioneel; anders gelijk verdeeld).

export type Section = { label: string; text: string };
export type Site = { src: string; w: number; h: number; label: string; url?: string }; // url = echte site (klikbaar)
// Echt account van de klant: profielfoto, naam en cijfers van hun pagina (opgehaald 4 okt), grid = hun echte posts.
export type Insta = { handle: string; avatar: string; app?: "instagram" | "tiktok"; name?: string; posts?: string; followers?: string; following?: string; grid?: string[] };
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
  ig?: Insta;              // reels in de telefoons krijgen deze Instagram-omgeving
  centerGrid?: boolean;     // weinig beelden: in het midden    // hero-paar op eigen verhouding (meer ruimte, niet bijgesneden)
};

export const cases: Record<string, CaseText> = {
  jaja: {
    statement: "One brand. Every touchpoint.",
    role: "In-house designer at JAJA. I evolved the existing identity and carried it through products, production, campaigns, social and both websites.",
    videosAsPhones: true,
    ig: { handle: "jajapaper", avatar: "/ig/jajapaper.jpg", name: "JaJa Rolling Paper", posts: "18", followers: "4,554", following: "2,732", grid: Array.from({ length: 9 }, (_, i) => `/ig/jajapaper/${i + 1}.webp`) },
    hero: "site",
    sites: [
      { src: "/sites/jaja-b2b.webp", w: 1440, h: 6873, label: "B2B — jaja.net", url: "https://jaja.net/" },
      { src: "/sites/jaja-b2c.webp", w: 1440, h: 6088, label: "B2C — jajashop.com", url: "https://jajashop.com/" },
    ],
    sections: [
      { label: "Identity", text: "The existing identity, evolved." },
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
    role: "The complete rebrand: concept, identity, graphics and packaging.",
    sections: [
      { label: "Concept", text: "Smoking accessories, repositioned for the evening. Premium, after dark." },
      { label: "Identity", text: "A premium evening identity: logo, type, colour." },
      { label: "Graphics", text: "Patterns and elements that carry the night." },
      { label: "Packaging", text: "Premium on pack, across the range." },
      { label: "Application", text: "Across every touchpoint." },
    ],
  },
  "purple-rain": {
    statement: "Same disciplines. A different world.",
    role: "The complete rebrand: concept, identity, graphics and packaging.",
    sections: [
      { label: "Identity", text: "Dreamy and exclusive, inspired by the sea." },
      { label: "Graphics", text: "Fluid elements, drawn from the sea." },
      { label: "Packaging", text: "Exclusive on pack." },
      { label: "Application", text: "Across every touchpoint." },
    ],
  },
  "don-gelato": {
    statement: "A visual story, directed.",
    role: "A new brand, with art direction and photography. Campaign imagery made with AI.",
    sections: [
      { label: "Art Direction", text: "The visual world of a clothing and accessories brand." },
      { label: "Identity", text: "Type, colour, tone." },
      { label: "Packaging", text: "Pack and product presentation for the collection." },
      { label: "Application", text: "Across applications." },
      { label: "Campaign Imagery", text: "Made with AI, art directed by RINK." },
    ],
  },
  "big-push": {
    statement: "A new position, made visible.",
    role: "Concept, identity and the website, designed and built.",
    hero: "site",
    sites: [{ src: "/sites/bigpush.webp", w: 1440, h: 8371, label: "bigpush.nl", url: "https://www.bigpush.nl/" }],
    sections: [
      { label: "Concept", text: "An existing company, a new direction. Repositioned from the ground up." },
      { label: "Identity", text: "A new graphic foundation to match." },
      { label: "Website & Assets", text: "Designed and built. Desktop, mobile, digital assets." },
    ],
  },
  santani: {
    statement: "A creative launch. Concept to social.",
    hero: "phones",
    ig: { handle: "santaniorganics", avatar: "/ig/santaniorganics.jpg", name: "Santani I Organic Soda", posts: "209", followers: "3,704", following: "832", grid: Array.from({ length: 9 }, (_, i) => `/ig/santaniorganics/${i + 1}.webp`) },
    sitesFirst: true,
    centerGrid: true,
    sites: [{ src: "/sites/santani.webp", w: 1440, h: 9000, label: "santani.vercel.app", url: "https://santani.vercel.app/" }],
    role: "Launch only: concept, project management and graphics, with fellow students during my internship at Code d’Azur. I worked on Santani for its first 10 weeks.",
    sections: [
      { label: "Concept", text: "The creative idea behind a new canned drink." },
      { label: "Launch", text: "How the can was introduced to the market." },
      { label: "Creative Direction", text: "Visual direction." },
      { label: "Social Content", text: "Launch content." },
    ],
  },
  "the-cat": {
    statement: "One briefing. Two answers.",
    role: "Concept, graphics and packaging. Two directions, one brief.",
    hero: "pair",
    heroNatural: true,
    intro: "The brief: a ladies’ edition. Ladies Bag.",
    sections: [
      { label: "Concept 01", text: "Concept → Graphics → Packaging → Final visual" },
      { label: "Concept 02", text: "Concept → Graphics → Packaging → Final visual" },
      { label: "Side by side", text: "" },
    ],
  },
  purple: {
    statement: "A coffeeshop, rebranded.",
    role: "Rebrand, identity, merchandise, products and part of the interior.",
    intro: "Coffeeshop in Vlissingen.",
    sections: [
      { label: "Identity", text: "The new identity." },
      { label: "Product Development", text: "Merchandise, products and part of the interior." },
    ],
  },
  canajoy: {
    statement: "A brand, from idea to pack.",
    role: "Brand and packaging.",
    hero: "pair",
    sections: [
      { label: "Identity", text: "Look and tone." },
      { label: "Packaging", text: "The brand on pack." },
    ],
  },
  "coffeeshop-packaging": {
    statement: "A packaging archive.",
    hero: "none",
    videosAsPhones: true, // De Baron-video als TikTok, gepost door @jajapaper
    ig: { handle: "jajapaper", avatar: "/ig/jajapaper-tiktok.jpg", app: "tiktok" },
    intro: "De Baron · Shiva · Highlife · Smokey · and more.",
    sections: [],
  },
};
