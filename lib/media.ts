import fs from "node:fs";
import path from "node:path";

// Leest het manifest dat scripts/beelden.mjs per case maakt (public/work/<slug>/manifest.json).
export type Item = { src: string; w: number; h: number; video?: boolean; poster?: string };
export type Kind = "groot" | "duo" | "trio" | "set" | "layover" | "telefoon" | "telefoon-video" | "video"
  | "scroll" | "studio" | "detail" | "single" | "website";
export type Block = { key: string; kind: Kind; items: Item[] };

export function caseBlocks(slug: string): Block[] {
  const f = path.join(process.cwd(), "public", "work", slug, "manifest.json");
  if (!fs.existsSync(f)) return [];
  const blocks: Block[] = JSON.parse(fs.readFileSync(f, "utf8")).blocks;
  // Opeenvolgende LAYOVER-groepen worden één stapel.
  const out: Block[] = [];
  for (const b of blocks) {
    const prev = out[out.length - 1];
    if (b.kind === "layover" && prev?.kind === "layover") prev.items.push(...b.items);
    else out.push({ ...b, items: [...b.items] });
  }
  return out;
}
