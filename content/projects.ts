// Het werkoverzicht. Volgorde hier = volgorde op de site (vijf rijen van twee).

export type Project = {
  slug: string;
  number: string;
  title: string;
  disciplines: string;
  statement: string;
  cover?: string; // pad naar coverbeeld in /public/work/<slug>/
};

export const projects: Project[] = [
  { slug: "jaja", number: "01", title: "JAJA", disciplines: "Brand / Packaging / Digital", statement: "One brand. Every touchpoint." },
  { slug: "soiree", number: "02", title: "SOIREE", disciplines: "Identity / Packaging", statement: "A complete rebrand. Idea to shelf." },
  { slug: "purple-rain", number: "03", title: "PURPLE RAIN", disciplines: "Identity / Packaging", statement: "Same disciplines. A different world." },
  { slug: "don-gelato", number: "04", title: "DON GELATO", disciplines: "Art Direction / Identity / Packaging / Photography", statement: "A visual story, directed." },
  { slug: "big-push", number: "05", title: "BIG PUSH", disciplines: "Identity / Digital", statement: "A new position, made visible." },
  { slug: "santani", number: "06", title: "SANTANI", disciplines: "Concept / Creative Direction / Social", statement: "A creative launch. Concept to social." },
  { slug: "the-cat", number: "07", title: "THE CAT", disciplines: "Concept / Packaging", statement: "One briefing. Two answers." },
  { slug: "purple", number: "08", title: "PURPLE", disciplines: "Rebrand / Identity / Product Development", statement: "A coffeeshop, rebranded." },
  { slug: "canajoy", number: "09", title: "CANAJOY", disciplines: "Product Development", statement: "" },
  { slug: "coffeeshop-packaging", number: "10", title: "SELECTED COFFEESHOP PACKAGING", disciplines: "Packaging / Print / Production", statement: "A packaging archive." },
];

export const contact = {
  email: "rinkevanderakt@gmail.com",
  phone: "+31 6 199 70311",
  phoneHref: "tel:+31619970311",
  linkedin: "https://nl.linkedin.com/in/rinke-van-de-rakt-244045213",
};
