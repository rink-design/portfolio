"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Menu in exact dezelfde stijl en op dezelfde plek als de tekst van het laadscherm ("Design by RINK" + teller).
// Verdwijnt bij naar beneden scrollen, komt terug bij naar boven scrollen.
// Verkleurt mee: wit boven donkere vlakken (data-tone="dark"), zwart op licht.
const SECTIONS = ["work", "about", "contact"];

export function Nav() {
  const [dark, setDark] = useState(true);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  useEffect(() => {
    const check = () => {
      const els = document.elementsFromPoint(window.innerWidth / 2, 28);
      setDark(els.some((el) => (el as HTMLElement).closest?.('[data-tone="dark"]')));
    };
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      if (y < 80) setHidden(false);
      else if (dy > 6) setHidden(true);
      else if (dy < -6) setHidden(false);
      if (Math.abs(dy) > 6 || y < 80) lastY.current = y;
      check();
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", check);
    const t = setInterval(check, 800); // vangnet bij paginawissel
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", check); clearInterval(t); };
  }, []);
  return (
    <header
      className={`wrap t-label fixed inset-x-0 top-0 z-50 flex items-start justify-between pt-5 pb-4 transition-[color,transform] duration-500 ease-[var(--ease-out-rink)] ${dark ? "text-paper" : "text-ink"} ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      onFocusCapture={() => setHidden(false)}
    >
      <Link href="/" aria-label="Design by RINK — home">Design by RINK</Link>
      <nav className="flex gap-5 md:gap-8">
        {SECTIONS.map((id) => (
          <Link key={id} href={`/#${id}`} className="capitalize">{id}</Link>
        ))}
      </nav>
    </header>
  );
}
