// Tekst per case. Beeldvolgorde komt uit de bestandsnamen in /public/work/<slug>/.
// Elke sectie verschijnt vóór het beeld met nummer `before` (optioneel; anders gelijk verdeeld).

export type Section = { label: string; text: string };
// Set = één rij beelden met label. keys = beginletters van de bloknamen uit het manifest (bijv. "02-studio-black").
export type CaseSet = { name: string; note?: string; keys: string[]; layout?: "row" | "grid"; size?: "large"; overlap?: boolean }; // overlap = producten los, iets over elkaar // grid = archief, raster van 3
export type Site = { src: string; w: number; h: number; label: string; url?: string; tag?: string }; // tag = naam in het label (bijv. B2B Website) // url = echte site (klikbaar)
// Echt account van de klant: profielfoto, naam en cijfers van hun pagina (opgehaald 4 okt), grid = hun echte posts.
export type Insta = { handle: string; avatar: string; app?: "instagram" | "tiktok"; name?: string; posts?: string; followers?: string; following?: string; grid?: string[] };
// Opbouw van de case (tune-ronde 3 okt):
//  hero: "first" = eerste beeld van de case geheel in beeld (standaard; de cover is alléén een preview op de home) · "pair" = eerste twee beelden naast elkaar
//        "site" = eerste website in laptop · "phones" = telefoons op een rij · "none" = geen hero
export type CaseText = {
  statement: string; intro?: string; role?: string; sections: Section[];
  lines?: string[];        // regelval van het statement (zo staat hij groot op de pagina)
  hero?: "first" | "pair" | "site" | "phones" | "none";
  sites?: Site[];          // echte websites, scrollbaar in een laptop
  videosAsPhones?: boolean; // losse video's in iPhones i.p.v. in het grid
  heroNatural?: boolean;
  sitesFirst?: boolean;     // websites vóór het grid
  ig?: Insta;              // reels in de telefoons krijgen deze Instagram-omgeving
  sets?: CaseSet[];        // beeldsets onder de tekst (slider per set), in deze volgorde
  headerZoom?: number;     // header: hoe groot het product in het vlak staat (1 = past precies in de hoogte)
  headerShift?: number;    // header: beeld omlaag (+) of omhoog (−), in % van de hoogte
  book?: string;           // zin bij BRANDBOOK
  order?: ("sets" | "phones" | "sites" | "book")[]; // volgorde van de blokken onder de tekst
  centerGrid?: boolean;     // weinig beelden: in het midden    // hero-paar op eigen verhouding (meer ruimte, niet bijgesneden)
};

export const cases: Record<string, CaseText> = {
  jaja: {
    sets: [
      { name: "Products", note: "Cap, lighter, tray, papers and trade flyer.", keys: ["01-", "02-", "03-", "04-", "05-"] },
      { name: "Apparel", note: "Hoodie and joggers, front and back.", keys: ["06-"] },
    ],
    statement: "One brand. Every touchpoint.",
    lines: ["One brand.", "Every", "touchpoint."],
    role: "Creative Director & Designer, in-house. A family business: leading the creative side and creating products for other coffeeshops.",
    videosAsPhones: true,
    ig: { handle: "jajapaper", avatar: "/ig/jajapaper.jpg", name: "JaJa Rolling Paper", posts: "18", followers: "4,554", following: "2,732", grid: Array.from({ length: 9 }, (_, i) => `/ig/jajapaper/${i + 1}.webp`) },
    hero: "site",
    sites: [
      { src: "/sites/jaja-b2b.webp", w: 1440, h: 6873, label: "B2B — jaja.net", url: "https://jaja.net/", tag: "B2B Website" },
      { src: "/sites/jaja-b2c.webp", w: 1440, h: 6088, label: "B2C — jajashop.com", url: "https://jajashop.com/", tag: "B2C Website" },
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
    headerZoom: 1.82,
    sets: [{ name: "Products", note: "Papers, pouch and tube.", keys: ["01-", "02-"] }],
    book: "Logo, colour, type, pattern and material.",
    statement: "A rebrand with a premium taste.",
    lines: ["A rebrand", "with a", "premium taste."],
    role: "Rebrand of a coffeeshop with a new name. From concept to brand, a full product line and all brand assets.",
    sections: [
      { label: "Concept", text: "Premium and tasteful." },
      { label: "Brand Identity", text: "All brand assets: logo, type, patterns." },
      { label: "Packaging", text: "Premium on pack, across the range." },
      { label: "Product Development", text: "6+ products, made to fit." },
    ],
  },
  "purple-rain": {
    headerZoom: 2.05, headerShift: 6,
    sets: [{ name: "Products", note: "Bag, tips and grinders.", keys: ["02-", "03-"] }],
    statement: "Tradition, made exclusive.",
    lines: ["Tradition,", "made", "exclusive."],
    role: "Rebrand with an Arabic touch, inspired by culture and tradition. An exclusive, modern concept, the full brand identity and a consistent product line.",
    sections: [
      { label: "Concept", text: "Culture and tradition, made modern." },
      { label: "Brand Identity", text: "The full brand pack." },
      { label: "Packaging", text: "Exclusive on pack." },
      { label: "Product Development", text: "6+ products, one consistent line." },
    ],
  },
  "don-gelato": {
    headerZoom: 1.8, headerShift: 3, // header uitgeknipt op het lichte vlak, rest origineel
    sets: [
      { name: "Black", note: "Studio, back print, collar, hang tag, logo and print close-up.", keys: ["02-studio-black", "04-detail-black"] },
      { name: "White", note: "Studio, back print, collar, hang tag, logo and print close-up.", keys: ["02-studio-white", "03-detail-white"] },
      { name: "Packaging", note: "Box and pins.", keys: ["01-duo", "04-single"] },
    ],
    statement: "A new brand, art directed.",
    lines: ["A new", "brand, art", "directed."],
    role: "A new brand, built on prints by an artist. Designed the rolling papers and created the campaign photography with AI, in a studio setting.",
    sections: [
      { label: "Brand Identity", text: "Artist prints, developed into a brand." },
      { label: "Packaging", text: "Rolling papers and product packaging." },
      { label: "Art Direction", text: "The visual world of the brand." },
      { label: "Campaign Imagery", text: "Art directed and made with AI." },
    ],
  },
  "big-push": {
    book: "Story, logo, colour, type, gradients and visuals.",
    statement: "A new direction, designed and built.",
    lines: ["A new direction,", "designed", "and built."],
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
    sets: [{ name: "Campaign", note: "Lemon and Red Fruits.", keys: ["03-"], size: "large" }],
    order: ["sites", "sets"],
    statement: "A creative launch. Concept to social.",
    lines: ["A creative", "launch. Concept", "to social."],
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
    headerZoom: 1.5,
    statement: "A ladies’ edition with flair.",
    lines: ["A ladies’", "edition", "with flair."],
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
    headerZoom: 1.68,
    sets: [
      { name: "Products", note: "Papers and tips.", keys: ["01-", "02-", "03-"] },
      { name: "Merchandise", note: "Tote, beanie and bucket hat.", keys: ["04-"] },
    ],
    statement: "A rebrand, inspired by the sea.",
    lines: ["A rebrand,", "inspired by", "the sea."],
    role: "Rebrand of a coffeeshop. From concept to brand identity, a product line, merchandise and part of the interior.",
    sections: [
      { label: "Concept", text: "Inspired by the sea." },
      { label: "Brand Identity", text: "The new brand identity." },
      { label: "Product Development", text: "A product line and merchandise." },
      { label: "Interior", text: "Part of the interior." },
    ],
  },
  canajoy: {
    headerZoom: 1.4,
    statement: "A brand, from idea to pack.",
    lines: ["A brand,", "from idea", "to pack."],
    role: "Turned a client’s idea into a brand, a visual concept and a product.",
    hero: "pair",
    sections: [
      { label: "Brand Identity", text: "Look and tone." },
      { label: "Packaging", text: "The brand on pack." },
    ],
  },
  "coffeeshop-packaging": {
    sets: [{ name: "Archive", note: "Papers, tins and grinders.", keys: ["01-", "02-"], layout: "grid" }],
    statement: "A packaging archive, from idea to pack.",
    lines: ["A packaging", "archive, from", "idea to pack."],
    role: "Packaging for coffeeshops: turning ideas into products on the shelf.",
    hero: "none",
    videosAsPhones: true, // De Baron-video als TikTok, gepost door @jajapaper
    ig: { handle: "jajapaper", avatar: "/ig/jajapaper-tiktok.jpg", app: "tiktok" },
    intro: "De Baron · Shiva · Hakuna Matata · Central · Barbershop · Hunters · Dolphins · Highlife",
    sections: [],
  },
};
