// Het werkoverzicht. Volgorde hier = volgorde op de site (vijf rijen van twee).

export type Project = {
  slug: string;
  number: string;
  title: string;
  disciplines: string;
  statement: string;
  cover?: string; // coverbeeld of -video in /public/work/<slug>/ (grid + hero van de case)
  poster?: string; // stilstaand beeld bij een video-cover
  coverPos?: string; // uitsnede van de cover, bv. "82% 50%"
};

export const projects: Project[] = [
  { slug: "jaja", number: "01", title: "JAJA", disciplines: "Brand / Packaging / Digital", statement: "One brand. Every touchpoint.", cover: "/work/jaja/09-video-1.mp4", poster: "/work/jaja/09-video-1.webp" },
  { slug: "soiree", number: "02", title: "SOIREE", disciplines: "Identity / Packaging", statement: "A complete rebrand. Idea to shelf.", cover: "/work/soiree/01-groot-1.webp" },
  { slug: "purple-rain", number: "03", title: "PURPLE RAIN", disciplines: "Identity / Packaging", statement: "Same disciplines. A different world.", cover: "/work/purple-rain/01-groot-1.webp" },
  { slug: "don-gelato", number: "04", title: "DON GELATO", disciplines: "Art Direction / Identity / Packaging / Photography", statement: "A visual story, directed.", cover: "/work/don-gelato/02-studio-black-2.webp" },
  { slug: "big-push", number: "05", title: "BIG PUSH", disciplines: "Identity / Digital", statement: "A new position, made visible.", cover: "/work/big-push/02-scroll-1-p12.webp", coverPos: "82% 50%" },
  { slug: "santani", number: "06", title: "SANTANI", disciplines: "Concept / Creative Direction / Social", statement: "A creative launch. Concept to social.", cover: "/work/santani/03-duo-1.webp" },
  { slug: "the-cat", number: "07", title: "THE CAT", disciplines: "Concept / Packaging", statement: "One briefing. Two answers.", cover: "/work/the-cat/01-duo-1.webp" },
  { slug: "purple", number: "08", title: "PURPLE", disciplines: "Rebrand / Identity / Product Development", statement: "A coffeeshop, rebranded.", cover: "/work/purple/01-groot-1.webp" },
  { slug: "canajoy", number: "09", title: "CANAJOY", disciplines: "Product Development", statement: "", cover: "/work/canajoy/01-duo-1.webp" },
  { slug: "coffeeshop-packaging", number: "10", title: "SELECTED COFFEESHOP PACKAGING", disciplines: "Packaging / Print / Production", statement: "A packaging archive.", cover: "/work/coffeeshop-packaging/03-video-1.mp4", poster: "/work/coffeeshop-packaging/03-video-1.webp" },
];

export const contact = {
  email: "rinkevanderakt@gmail.com",
  phone: "+31 6 199 70311",
  phoneHref: "tel:+31619970311",
  linkedin: "https://nl.linkedin.com/in/rinke-van-de-rakt-244045213",
};
