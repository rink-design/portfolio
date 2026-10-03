// Maakt beelden webklaar en schrijft per case een manifest.
// Gebruik: node scripts/beelden.mjs "<map met projectmappen>"
// Originelen blijven onaangeroerd. Uitvoer: public/work/<slug>/ + manifest.json
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const SRC = process.argv[2];
const OUT = path.join(process.cwd(), "public", "work");
const MAX = 2400;
// Kleine correcties op bronbestanden (alleen randjes, nooit het beeld zelf bijsnijden).
const TRIM = { "01_GROOT_Free-Pick-8ee.png": { top: 14 } }; // Soiree: blauw randje bovenaan

// Mapnaam → slug op de site
const SLUGS = {
  "jaja": "jaja", "soiree": "soiree", "purple rain": "purple-rain", "don gelato": "don-gelato",
  "big push": "big-push", "santani": "santani", "the cat": "the-cat", "purple": "purple",
  "canajoy": "canajoy", "coffeeshop items": "coffeeshop-packaging",
};

// Bestandsnaam → { n, kind, variant }
function parse(file) {
  const base = path.parse(file).name.replace(/\.png$/i, "").toUpperCase();
  const t = base.split("_");
  const n = parseInt(t[0], 10);
  const has = (w) => t.includes(w);
  let kind = "single", variant = "";
  if (has("LAYOVER")) kind = "layover";
  else if (has("TELEFOON")) kind = has("VIDEO") ? "telefoon-video" : "telefoon";
  else if (has("VIDEO")) kind = "video";
  else if (has("SCROLL-PDF")) kind = "scroll";
  else if (has("DETAIL-GRID")) { kind = "detail"; variant = t[2] ?? ""; }
  else if (has("STUDIO")) { kind = "studio"; variant = t[2] ?? ""; }
  else if (has("TRIO")) kind = "trio";
  else if (has("DUO")) kind = "duo";
  else if (has("SET")) kind = "set";
  else if (has("GROOT")) kind = "groot";
  else if (has("WEBSITE")) kind = "website";
  return { n, kind, variant, base };
}

const isVid = (f) => /\.(mp4|mov|m4v)$/i.test(f);
const isPdf = (f) => /\.pdf$/i.test(f);

async function img(src, dest) {
  const input = /\.psd$/i.test(src) ? execFileSync("convert", [`${src}[0]`, "png:-"], { maxBuffer: 1 << 30 }) : src;
  let pipe = sharp(input, { limitInputPixels: false }).rotate();
  const t = TRIM[path.basename(src)];
  if (t) { const m = await sharp(input).metadata(); pipe = sharp(await pipe.extract({ left: 0, top: t.top, width: m.width, height: m.height - t.top }).toBuffer()); }
  const info = await pipe
    .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 }).toFile(dest);
  return { w: info.width, h: info.height };
}

function vid(src, dest, poster) {
  execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-i", src, "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "26",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-vf", "scale='if(gt(iw,ih),min(1280,iw),-2)':'if(gt(iw,ih),-2,min(1280,ih))'", dest]);
  execFileSync("ffmpeg", ["-loglevel", "error", "-y", "-ss", "0.5", "-i", dest, "-frames:v", "1", "-q:v", "3", poster.replace(/\.webp$/, ".jpg")]);
  const p = poster.replace(/\.webp$/, ".jpg");
  return sharp(p).webp({ quality: 78 }).toFile(poster).then((i) => { fs.unlinkSync(p); return { w: i.width, h: i.height }; });
}

async function pdfPages(src, dir, prefix) {
  const tmp = path.join(dir, "_pdf");
  fs.mkdirSync(tmp, { recursive: true });
  execFileSync("pdftoppm", ["-png", "-scale-to", "2000", src, path.join(tmp, "p")]);
  const pages = fs.readdirSync(tmp).sort();
  const out = [];
  for (let i = 0; i < pages.length; i++) {
    const name = `${prefix}-p${String(i + 1).padStart(2, "0")}.webp`;
    const d = await img(path.join(tmp, pages[i]), path.join(dir, name));
    out.push({ file: name, ...d });
  }
  fs.rmSync(tmp, { recursive: true });
  return out;
}

for (const folder of fs.readdirSync(SRC)) {
  const slug = SLUGS[folder.toLowerCase()];
  if (!slug) { console.log("overgeslagen:", folder); continue; }
  const dir = path.join(OUT, slug);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const files = fs.readdirSync(path.join(SRC, folder)).filter((f) => !f.startsWith(".")).sort();
  const groups = new Map();
  for (const f of files) {
    const p = parse(f);
    const key = `${String(p.n).padStart(2, "0")}-${p.kind}${p.variant ? "-" + p.variant.toLowerCase() : ""}`;
    if (!groups.has(key)) groups.set(key, { key, n: p.n, kind: p.kind, items: [] });
    const src = path.join(SRC, folder, f);
    const idx = groups.get(key).items.length + 1;
    const stem = `${key}-${idx}`;
    if (isVid(f)) {
      const d = await vid(src, path.join(dir, `${stem}.mp4`), path.join(dir, `${stem}.webp`));
      groups.get(key).items.push({ file: `${stem}.mp4`, poster: `${stem}.webp`, video: true, ...d });
    } else if (isPdf(f)) {
      groups.get(key).items.push(...(await pdfPages(src, dir, stem)));
    } else {
      const d = await img(src, path.join(dir, `${stem}.webp`));
      groups.get(key).items.push({ file: `${stem}.webp`, ...d });
    }
  }
  const blocks = [...groups.values()].sort((a, b) => a.n - b.n || a.key.localeCompare(b.key))
    .map(({ key, kind, items }) => ({ key, kind, items: items.map((i) => ({ ...i, src: `/work/${slug}/${i.file}`, poster: i.poster ? `/work/${slug}/${i.poster}` : undefined })) }));
  fs.writeFileSync(path.join(dir, "manifest.json"), JSON.stringify({ slug, blocks }, null, 2));
  const size = fs.readdirSync(dir).reduce((s, f) => s + fs.statSync(path.join(dir, f)).size, 0);
  console.log(`${slug}: ${blocks.length} blokken, ${blocks.reduce((s, b) => s + b.items.length, 0)} bestanden, ${(size / 1e6).toFixed(1)} MB`);
}
