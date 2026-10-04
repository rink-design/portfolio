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
    role: "Creative Director & Designer, in-house. A family business: leading the creative side and creating products for other coffeeshops.",
    videosAsPhones: true,
    ig: { handle: "jajapaper", avatar: "/ig/jajapaper.jpg", name: "JaJa Rolling Paper", posts: "18", followers: "4,554", following: "2,732", grid: Array.from({ length: 9 }, (_, i) => `/ig/jajapaper/${i + 1}.webp`) },
    hero: "site",
    sites: [
      { src: "/sites/jaja-b2b.webp", w: 1440, h: 6873, label: "B2B — jaja.net", url: "https://jaja.net/" },
      { src: "/sites/jaja-b2c.webp", w: 1440, h: 6088, label: "B2C — jajashop.com", url: "https://jajashop.com/" },
    ],
    sections: [
      { label: "Brand Identity", text: "The existing identity, made current." },
      { label: "Products", text: "100+ products, every product line." },
      { label: "Production", text: "From graphic to material, print and finishes." },
      { label: "Campaigns", text: "Campaigns and activations." },
      { label: "Digital Design", text: "All digital brand assets." },
      { label: "Social Content", text: "Social formats and content." },
      { label: "Web Design", text: "Two websites, designed and built." },
    ],
  },
  soiree: {
    statement: "A rebrand with a premium taste.",
    role: "Rebrand of a coffeeshop with a new name. From concept to brand, a full product line and all brand assets.",
    sections: [
      { label: "Concept", text: "Premium and tasteful." },
      { label: "Brand Identity", text: "All brand assets: logo, type, patterns." },
      { label: "Packaging", text: "Premium on pack, across the range." },
      { label: "Product Development", text: "6+ products, made to fit." },
    ],
  },
  "purple-rain": {
    statement: "Tradition, made exclusive.",
    role: "Rebrand with an Arabic touch, inspired by culture and tradition. An exclusive, modern concept, the full brand identity and a consistent product line.",
    sections: [
      { label: "Concept", text: "Culture and tradition, made modern." },
      { label: "Brand Identity", text: "The full brand pack." },
      { label: "Packaging", text: "Exclusive on pack." },
      { label: "Product Development", text: "6+ products, one consistent line." },
    ],
  },
  "don-gelato": {
    statement: "A new brand, art directed.",
    role: "A new brand, built on prints by an artist. Designed the rolling papers and created the campaign photography with AI, in a studio setting.",
    sections: [
      { label: "Brand Identity", text: "Artist prints, developed into a brand." },
      { label: "Packaging", text: "Rolling papers and product packaging." },
      { label: "Art Direction", text: "The visual world of the brand." },
      { label: "Campaign Imagery", text: "Art directed and made with AI." },
    ],
  },
  "big-push": {
    statement: "A new direction, designed and built.",
    role: "Graphic designer. Concept, a new brand identity and the web design. Website built with AI.",
    hero: "site",
    sites: [{ src: "/sites/bigpush.webp", w: 1440, h: 8371, label: "bigpush.nl", url: "https://www.bigpush.nl/" }],
    sections: [
      { label: "Concept", text: "Existing company, new direction." },
      { label: "Brand Identity", text: "A new brand identity." },
      { label: "Web Design", text: "Designed and built with AI." },
    ],
  },
  santani: {
    statement: "A creative launch. Concept to social.",
    hero: "phones",
    ig: { handle: "santaniorganics", avatar: "/ig/santaniorganics.jpg", name: "Santani I Organic Soda", posts: "209", followers: "3,704", following: "832", grid: Array.from({ length: 9 }, (_, i) => `/ig/santaniorganics/${i + 1}.webp`) },
    sitesFirst: true,
    centerGrid: true,
    sites: [{ src: "/sites/santani.webp", w: 1440, h: 9000, label: "santani.vercel.app", url: "https://santani.vercel.app/" }],
    role: "Internship at Code d’Azur. Together with fellow interns, created the concept to launch Santani. After the internship, a short period supporting social content and part of the graphics to help launch the brand.",
    sections: [
      { label: "Concept", text: "The idea behind a canned drink." },
      { label: "Launch", text: "Introducing the can." },
      { label: "Creative Direction", text: "Visual direction." },
      { label: "Social Content", text: "Launch content." },
    ],
  },
  "the-cat": {
    statement: "A ladies’ edition with flair.",
    role: "Asked, as RINK, to create the Ladies Bag for The Cat. A new edition every few months: concept, graphics and packaging design, focused on women.",
    hero: "pair",
    heroNatural: true,
    sections: [
      { label: "Concept", text: "Designed for women, edition after edition." },
      { label: "Brand Identity", text: "Graphics for every edition." },
      { label: "Packaging", text: "Every edition, on pack." },
    ],
  },
  purple: {
    statement: "A rebrand, inspired by the sea.",
    role: "Rebrand of a coffeeshop. From concept to brand identity, a product line, merchandise and part of the interior.",
    sections: [
      { label: "Concept", text: "Inspired by the sea." },
      { label: "Brand Identity", text: "The new brand identity." },
      { label: "Product Development", text: "A product line and merchandise." },
      { label: "Interior", text: "Part of the interior." },
    ],
  },
  canajoy: {
    statement: "A brand, from idea to pack.",
    role: "Turned a client’s idea into a brand, a visual concept and a product.",
    hero: "pair",
    sections: [
      { label: "Brand Identity", text: "Look and tone." },
      { label: "Packaging", text: "The brand on pack." },
    ],
  },
  "coffeeshop-packaging": {
    statement: "A packaging archive, from idea to pack.",
    role: "Packaging for coffeeshops: turning ideas into products on the shelf.",
    hero: "none",
    videosAsPhones: true, // De Baron-video als TikTok, gepost door @jajapaper
    ig: { handle: "jajapaper", avatar: "/ig/jajapaper-tiktok.jpg", app: "tiktok" },
    intro: "De Baron · Shiva · Hakuna Matata · Central · Barbershop · Hunters · Dolphins · Highlife",
    sections: [],
  },
};
