// Het werkoverzicht. Volgorde hier = volgorde op de site (vijf rijen van twee).

export type Project = {
  slug: string;
  number: string;
  title: string;
  disciplines: string;
  tag: string; // 1–2 steekwoorden onder de cover op de home
  statement: string;
  cover?: string; // coverbeeld of -video in /public/work/<slug>/ (grid + hero van de case)
  poster?: string; // stilstaand beeld bij een video-cover
  coverPos?: string; // uitsnede van de cover, bv. "82% 50%"
};

export const projects: Project[] = [
  { slug: "jaja", tag: "Brand World", number: "01", title: "JAJA", disciplines: "Identity / Products / Production / Campaigns / Digital Design / Social Content / Websites", statement: "One brand. Every touchpoint.", cover: "/covers/jaja.webp" },
  { slug: "soiree", tag: "Rebrand", number: "02", title: "SOIRÉE", disciplines: "Concept / Identity / Graphics / Packaging", statement: "A rebrand with a premium taste.", cover: "/covers/soiree.webp" },
  { slug: "purple-rain", tag: "Packaging", number: "03", title: "PURPLE RAIN", disciplines: "Concept / Identity / Graphics / Packaging", statement: "A rebrand, inspired by the sea.", cover: "/covers/purple-rain.webp" },
  { slug: "don-gelato", tag: "Art Direction", number: "04", title: "DON GELATO", disciplines: "Identity / Packaging / Art Direction / Campaign Imagery", statement: "A new brand, art directed.", cover: "/covers/don-gelato.webp" },
  { slug: "the-cat", tag: "Ladies Edition", number: "07", title: "THE CAT", disciplines: "Concept / Graphics / Packaging", statement: "Ladies’ editions, with flair.", cover: "/covers/the-cat.webp" },
  { slug: "purple", tag: "Coffeeshop Rebrand", number: "08", title: "PURPLE", disciplines: "Identity / Product Development", statement: "A coffeeshop, rebranded.", cover: "/covers/purple.webp" },
  { slug: "canajoy", tag: "New Brand", number: "09", title: "CANAJOY", disciplines: "Identity / Packaging", statement: "A brand, from idea to pack.", cover: "/covers/canajoy.webp" },
  { slug: "coffeeshop-packaging", tag: "Packaging Archive", number: "10", title: "SELECTED COFFEESHOP PACKAGING", disciplines: "Packaging / Print / Production", statement: "A packaging archive.", cover: "/covers/coffeeshop-packaging.webp" },
  { slug: "santani", tag: "Drink Launch", number: "06", title: "SANTANI", disciplines: "Concept / Launch / Creative Direction / Social Content", statement: "A creative launch. Concept to social.", cover: "/covers/santani.webp" },
  { slug: "big-push", tag: "Repositioning", number: "05", title: "BIG PUSH", disciplines: "Concept / Identity / Website", statement: "A new direction, designed and built.", cover: "/covers/big-push.webp" },
];

// Semi-cv onder About; de rest als één regel met puntjes.
// Duur alleen bij werk; stages en studies zonder jaartallen.
export const experience: { what: string; time?: string }[] = [
  { what: "JAJA Rolling Paper — Creative Director & Designer", time: "7 years" },
  { what: "Freelance — Digital & Packaging Design", time: "3 years" },
  { what: "Code d’Azur — Internship" },
  { what: "Wessel de Groot — Internship" },
];

export const education: { what: string; time?: string }[] = [
  { what: "AMFI — Fashion & Branding" },
  { what: "Sint Lucas — Graphic Design & Photography" },
];

export const cv = [
  { label: "Services", items: ["Brand Identity", "Packaging", "Product Development", "Art Direction", "Graphic Design", "Digital Design", "Web Design", "Social Content"] },
  { label: "Tools", items: ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign", "Figma", "CapCut", "Shopify", "Claude", "ChatGPT", "Midjourney", "Magnific", "Automation tools"] },
];

export const contact = {
  email: "rinkevanderakt@gmail.com",
  phone: "+31 6 199 70311",
  phoneHref: "tel:+31619970311",
  linkedin: "https://nl.linkedin.com/in/rinke-van-de-rakt-244045213",
};
