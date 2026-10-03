import fs from "node:fs";
import path from "node:path";
import { AutoVideo } from "./AutoVideo";

export const hasHeroVideo = () => fs.existsSync(path.join(process.cwd(), "public", "hero.mp4"));

// Showreel als achtergrond van de header. Uitsnede iets naar onder, zodat het product boven het logo staat.
export function HeroVideo() {
  return <AutoVideo src="/hero.mp4" poster="/hero-poster.webp" eager className="absolute inset-0 h-full w-full object-cover object-[50%_85%]" />;
}
