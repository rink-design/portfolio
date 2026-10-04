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
  { slug: "jaja", tag: "Brand world", number: "01", title: "JAJA", disciplines: "Brand / Packaging / Digital", statement: "One brand. Every touchpoint.", cover: "/covers/jaja.webp" },
  { slug: "soiree", tag: "Rebrand", number: "02", title: "SOIRÉE", disciplines: "Identity / Packaging", statement: "A rebrand with a premium taste.", cover: "/covers/soiree.webp" },
  { slug: "purple-rain", tag: "Packaging", number: "03", title: "PURPLE RAIN", disciplines: "Identity / Packaging", statement: "Same disciplines. A different world.", cover: "/covers/purple-rain.webp" },
  { slug: "don-gelato", tag: "Art direction", number: "04", title: "DON GELATO", disciplines: "Art Direction / Identity / Packaging / Photography", statement: "A visual story, directed.", cover: "/covers/don-gelato.webp" },
  { slug: "the-cat", tag: "Ladies edition", number: "07", title: "THE CAT", disciplines: "Concept / Packaging", statement: "One briefing. Two answers.", cover: "/covers/the-cat.webp" },
  { slug: "purple", tag: "Coffeeshop rebrand", number: "08", title: "PURPLE", disciplines: "Rebrand / Identity / Product Development", statement: "A coffeeshop, rebranded.", cover: "/covers/purple.webp" },
  { slug: "canajoy", tag: "New brand", number: "09", title: "CANAJOY", disciplines: "Brand / Packaging", statement: "A brand, from idea to pack.", cover: "/covers/canajoy.webp" },
  { slug: "coffeeshop-packaging", tag: "Packaging archive", number: "10", title: "SELECTED COFFEESHOP PACKAGING", disciplines: "Packaging / Print / Production", statement: "A packaging archive.", cover: "/covers/coffeeshop-packaging.webp" },
  { slug: "santani", tag: "Drink launch", number: "06", title: "SANTANI", disciplines: "Concept / Creative Direction / Social", statement: "A creative launch. Concept to social.", cover: "/covers/santani.webp" },
  { slug: "big-push", tag: "Repositioning", number: "05", title: "BIG PUSH", disciplines: "Identity / Digital", statement: "A new position, made visible.", cover: "/covers/big-push.webp" },
];

// Semi-cv onder About: Experience en Education met duur; de rest als één regel met puntjes.
export const experience = [
  { what: "JAJA Rolling Paper — Creative Director & Designer", time: "7 years" },
  { what: "Freelance — Digital & Packaging Design", time: "3 years" },
  { what: "Code d’Azur — Internship", time: "½ year" },
  { what: "Wessel de Groot — Internship", time: "½ year" },
];

export const education = [
  { what: "AMFI — Fashion & Branding", time: "4 years" },
  { what: "Sint Lucas — Graphic Design & Photography", time: "4 years" },
];

export const cv = [
  { label: "Services", items: ["Brand Identity", "Packaging Design", "Art Direction", "Graphic Design", "Digital Design", "Websites", "Social Content", "Product Development"] },
  { label: "Tools", items: ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign", "Figma", "CapCut", "Shopify", "Claude", "ChatGPT", "Midjourney", "Magnific", "Automation tools"] },
  { label: "Languages", items: ["Dutch", "English"] },
];

export const contact = {
  email: "rinkevanderakt@gmail.com",
  phone: "+31 6 199 70311",
  phoneHref: "tel:+31619970311",
  linkedin: "https://nl.linkedin.com/in/rinke-van-de-rakt-244045213",
};
