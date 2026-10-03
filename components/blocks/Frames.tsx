import Image from "next/image";
import type { Item } from "@/lib/media";
import type { Site } from "@/content/cases";
import { Visual } from "./Visual";

// Telefoonframe in code; beeld of video.
export function Phone({ it, alt }: { it: Item; alt: string }) {
  return (
    <div className="w-full rounded-[13%/6%] bg-ink p-[3%] shadow-[0_30px_60px_-20px_rgba(20,19,17,0.35)]">
      <div className="relative overflow-hidden rounded-[10.5%/5%]">
        <Visual it={it} alt={alt} ratio="9/19.5" sizes="(min-width: 768px) 25vw, 50vw" className="[&_img]:object-top" />
        <div className="absolute left-1/2 top-[1.6%] h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-ink" aria-hidden />
      </div>
    </div>
  );
}

// Laptop met een échte website die je in het scherm kunt scrollen.
export function SiteLaptop({ site }: { site: Site }) {
  return (
    <figure className="w-full">
      <div className="rounded-t-[1.2vw] bg-ink p-[1.4%] pb-[2%]">
        <div className="site-screen relative aspect-[16/10] overflow-y-auto overscroll-contain bg-white" tabIndex={0} aria-label={`${site.label} — scroll to explore`}>
          <Image src={site.src} alt={`${site.label} website`} width={site.w} height={site.h} sizes="(min-width: 768px) 50vw, 100vw" className="block h-auto w-full" />
        </div>
      </div>
      <div className="relative mx-[-5%] h-[clamp(8px,1.1vw,16px)] rounded-b-[1vw] bg-gradient-to-b from-[#b9b4ab] to-[#8f8a82]" />
      <figcaption className="t-label mt-5 flex justify-between text-ink-2"><span>{site.label}</span><span>Scroll ↓</span></figcaption>
    </figure>
  );
}
