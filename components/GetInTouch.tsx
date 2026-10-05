"use client";
import { useEffect, useRef, useState } from "react";
import { contact } from "@/content/projects";
import { Arrow } from "@/components/Arrow";

// Cobalt knop die openklapt met Mail · Call · WhatsApp. Trekt licht naar de muis toe (magnetisch).
const wa = `https://wa.me/${contact.phoneHref.replace(/\D/g, "")}`;
const items = [
  { label: "Mail", sub: contact.email, href: `mailto:${contact.email}?subject=Project%20orientation%20-%20Rink%20Design` },
  { label: "Call", sub: contact.phone, href: contact.phoneHref },
  { label: "WhatsApp", sub: <>Chat <Arrow dir="ur" /></>, href: wa, ext: true },
];

export function GetInTouch() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null), btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const out = (e: MouseEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("click", out); document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("click", out); document.removeEventListener("keydown", esc); };
  }, []);
  const pull = (e: React.MouseEvent) => {
    if (open || !btn.current) return;
    const b = btn.current.getBoundingClientRect();
    btn.current.style.transform = `translate(${(e.clientX - b.left - b.width / 2) * 0.18}px,${(e.clientY - b.top - b.height / 2) * 0.35}px)`;
  };
  return (
    <div ref={wrap} className="relative inline-block w-full max-w-[340px]" onMouseMove={pull} onMouseLeave={() => btn.current && (btn.current.style.transform = "")}>
      <div role="menu" className={`absolute inset-x-0 bottom-full z-10 grid bg-paper text-ink transition-[clip-path] duration-500 ease-[var(--ease-out-rink)] ${open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(100%_0_0_0)]"}`}>
        {items.map((it) => (
          <a key={it.label} role="menuitem" tabIndex={open ? 0 : -1} href={it.href} {...(it.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex items-baseline justify-between gap-4 px-6 py-4 text-[clamp(20px,2vw,28px)] font-semibold tracking-[-0.03em] transition-all duration-300 hover:bg-ink hover:pl-8 hover:text-paper focus-visible:bg-ink focus-visible:text-paper">
            {it.label} <span className="t-label truncate text-ink-2">{it.sub}</span>
          </a>
        ))}
      </div>
      <button ref={btn} type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-8 bg-accent px-6 py-[22px] text-[clamp(16px,1.4vw,20px)] font-semibold tracking-[-0.01em] text-paper transition-transform duration-300 ease-[var(--ease-out-rink)]">
        Get in touch <span className={`inline-block transition-transform duration-500 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
    </div>
  );
}
