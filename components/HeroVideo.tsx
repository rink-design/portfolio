import fs from "node:fs";
import path from "node:path";
import { AutoVideo } from "./AutoVideo";

export const hasHeroVideo = () => fs.existsSync(path.join(process.cwd(), "public", "hero.mp4"));

// Showreel als achtergrond van de header. Desktop: uitsnede iets naar onder, zodat het product boven het logo staat.
// Mobiel: eigen staande video (9:16), gecentreerd.
export function HeroVideo() {
  return <AutoVideo src="/hero.mp4" poster="/hero-poster.webp" mobileSrc="/hero-mobile-ba462cc7.mp4" mobilePoster="/hero-mobile-poster-ba462cc7.webp" eager
    className="absolute inset-0 h-full w-full object-cover object-center md:object-[50%_85%]" />;
}
