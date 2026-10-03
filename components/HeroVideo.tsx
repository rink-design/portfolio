import fs from "node:fs";
import path from "node:path";

export const hasHeroVideo = () => fs.existsSync(path.join(process.cwd(), "public", "hero.mp4"));

// Showreel als achtergrond van de header (vult het hele vlak).
export function HeroVideo() {
  return (
    <video src="/hero.mp4" poster="/hero-poster.webp" autoPlay muted loop playsInline preload="auto" aria-hidden
      className="absolute inset-0 h-full w-full object-cover" />
  );
}
