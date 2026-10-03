import type { Item } from "@/lib/media";
import { Visual } from "./Visual";

// Telefoonframe in code; beeld of video.
export function Phone({ it, alt }: { it: Item; alt: string }) {
  return (
    <div className="mx-auto w-[min(72vw,360px)] rounded-[46px] bg-ink p-[10px] shadow-[0_30px_60px_-20px_rgba(20,19,17,0.35)]">
      <div className="relative overflow-hidden rounded-[36px]">
        <Visual it={it} alt={alt} ratio="9/19.5" sizes="360px" className="[&_img]:object-top" />
        <div className="absolute left-1/2 top-2.5 h-6 w-24 -translate-x-1/2 rounded-full bg-ink" aria-hidden />
      </div>
    </div>
  );
}

// Laptopframe in code.
export function Laptop({ it, alt }: { it: Item; alt: string }) {
  return (
    <div className="mx-auto w-full max-w-[1100px]">
      <div className="rounded-t-[14px] bg-ink p-[1.4%] pb-[2%]">
        <div className="overflow-hidden rounded-[4px]">
          <Visual it={it} alt={alt} ratio="16/10" sizes="(min-width: 1100px) 1100px, 100vw" className="[&_img]:object-top" />
        </div>
      </div>
      <div className="relative mx-[-6%] h-[clamp(10px,1.4vw,18px)] rounded-b-[14px] bg-gradient-to-b from-[#b9b4ab] to-[#8f8a82]">
        <div className="absolute left-1/2 top-0 h-1/2 w-[14%] -translate-x-1/2 rounded-b-[8px] bg-[#7d786f]" />
      </div>
    </div>
  );
}
