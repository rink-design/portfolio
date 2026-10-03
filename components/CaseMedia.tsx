import Image from "next/image";
import type { MediaItem } from "@/lib/media";

// Eén beeld of video. Zonder bron: nette plaatshouder.
export function Asset({ m, ratio, sizes = "100vw", priority = false, label }:
  { m?: MediaItem; ratio: string; sizes?: string; priority?: boolean; label?: string }) {
  return (
    <div className="relative overflow-hidden bg-paper-2" style={{ aspectRatio: ratio }}>
      {m?.video ? (
        <video src={m.src} autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />
      ) : m ? (
        <Image src={m.src} alt={label ?? ""} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <span className="t-label absolute bottom-3 left-3 text-ink-2/70">{label}</span>
      )}
    </div>
  );
}

// Telefoonframe in code: strak, licht, scherp.
export function Phone({ m, label }: { m?: MediaItem; label?: string }) {
  return (
    <div className="mx-auto w-[min(72vw,340px)] rounded-[44px] bg-ink p-[10px] shadow-[0_30px_60px_-20px_rgba(20,19,17,0.35)]">
      <div className="overflow-hidden rounded-[34px]">
        <Asset m={m} ratio="9/19.5" sizes="340px" label={label} />
      </div>
    </div>
  );
}

// Laptopframe in code.
export function Laptop({ m, label }: { m?: MediaItem; label?: string }) {
  return (
    <div className="mx-auto w-full max-w-[1100px]">
      <div className="rounded-t-[14px] bg-ink p-[1.4%] pb-[2%]">
        <div className="overflow-hidden rounded-[4px]">
          <Asset m={m} ratio="16/10" sizes="(min-width: 1100px) 1100px, 100vw" label={label} />
        </div>
      </div>
      <div className="relative mx-[-6%] h-[clamp(10px,1.4vw,18px)] rounded-b-[14px] bg-gradient-to-b from-[#b9b4ab] to-[#8f8a82]">
        <div className="absolute left-1/2 top-0 h-1/2 w-[14%] -translate-x-1/2 rounded-b-[8px] bg-[#7d786f]" />
      </div>
    </div>
  );
}
