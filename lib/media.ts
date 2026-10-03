import fs from "node:fs";
import path from "node:path";

// Leest de beelden van een case uit /public/work/<slug>/ .
// Bestandsnaam = volgorde + optioneel weergave-woord:
//   01.jpg · 04-groot.jpg · 05-duo.jpg · 07-telefoon.mp4 · 08-laptop.mp4
export type Kind = "groot" | "duo" | "telefoon" | "laptop" | "standaard";
export type MediaItem = { src: string; video: boolean; kind: Kind; n: number };

const IMG = /\.(jpe?g|png|webp|avif|gif)$/i;
const VID = /\.(mp4|webm)$/i;

export function caseMedia(slug: string): MediaItem[] {
  const dir = path.join(process.cwd(), "public", "work", slug);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMG.test(f) || VID.test(f))
    .map((f): MediaItem => {
      const base = f.replace(/\.[^.]+$/, "").toLowerCase();
      const n = parseInt(base, 10);
      const word = (["groot", "duo", "telefoon", "laptop"] as const).find((w) => base.includes(w));
      return { src: `/work/${slug}/${f}`, video: VID.test(f), kind: word ?? "standaard", n: isNaN(n) ? 999 : n };
    })
    .sort((a, b) => a.n - b.n || a.src.localeCompare(b.src));
}
