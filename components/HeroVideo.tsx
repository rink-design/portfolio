import fs from "node:fs";
import path from "node:path";

export const hasHeroVideo = () => fs.existsSync(path.join(process.cwd(), "public", "hero.mp4"));

// Showreel-loop onder de naam. Zet het bestand neer als /public/hero.mp4 (stil, kort, < 10 MB).
export function HeroVideo() {
  const has = fs.existsSync(path.join(process.cwd(), "public", "hero.mp4"));
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
      {has ? (
        <video src="/hero.mp4" poster="/hero-poster.webp" autoPlay muted loop playsInline preload="auto" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <span className="t-label absolute bottom-3 left-[var(--gutter)] text-ink-2">Showreel-video volgt</span>
      )}
    </div>
  );
}
