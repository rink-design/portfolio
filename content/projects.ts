// Het werkoverzicht. Volgorde hier = volgorde op de site.
// layout: "large" = volle breedte, "pair" = twee naast elkaar, "wide" = brede afsluiter.

export type Project = {
  slug: string;
  number: string;
  title: string;
  disciplines: string;
  statement: string;
  layout: "large" | "pair" | "wide";
  cover?: string; // pad naar coverbeeld in /public/work/<slug>/
};

export const projects: Project[] = [
  { slug: "jaja", number: "01", title: "JAJA", disciplines: "Brand / Packaging / Digital", statement: "One brand. Every touchpoint.", layout: "large" },
  { slug: "soiree", number: "02", title: "SOIREE", disciplines: "Identity / Packaging", statement: "A complete rebrand. Idea to shelf.", layout: "pair" },
  { slug: "purple-rain", number: "03", title: "PURPLE RAIN", disciplines: "Identity / Packaging", statement: "Same disciplines. A different world.", layout: "pair" },
  { slug: "don-gelato", number: "04", title: "DON GELATO", disciplines: "Art Direction / Identity / Packaging / Photography", statement: "A visual story, directed.", layout: "pair" },
  { slug: "big-push", number: "05", title: "BIG PUSH", disciplines: "Identity / Digital", statement: "A new position, made visible.", layout: "pair" },
  { slug: "santani", number: "06", title: "SANTANI", disciplines: "Concept / Creative Direction / Social", statement: "A creative launch. Concept to social.", layout: "pair" },
  { slug: "the-cat", number: "07", title: "THE CAT", disciplines: "Concept / Packaging", statement: "One briefing. Two answers.", layout: "pair" },
  { slug: "purple", number: "08", title: "PURPLE", disciplines: "Rebrand / Identity / Product Development", statement: "A coffeeshop, rebranded.", layout: "pair" },
  { slug: "canajoy", number: "09", title: "CANAJOY", disciplines: "Product Development", statement: "", layout: "pair" },
  { slug: "coffeeshop-packaging", number: "10", title: "SELECTED COFFEESHOP PACKAGING", disciplines: "Packaging / Print / Production", statement: "A packaging archive.", layout: "wide" },
];

export const contact = {
  email: "rinkevanderakt@gmail.com",
  phone: "+31 6 199 70311",
  phoneHref: "tel:+31619970311",
  linkedin: "https://nl.linkedin.com/in/rinke-van-de-rakt-244045213",
};
