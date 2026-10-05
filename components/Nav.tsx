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
      const foot = document.getElementById("contact");
      // Bij de footer wordt ook de pagina-achtergrond (en de browserbalk) inkt, zodat de footer echt tot het eind loopt.
      const inFoot = !!foot && foot.getBoundingClientRect().top < innerHeight * 0.6;
      document.documentElement.style.backgroundColor = inFoot ? "var(--color-ink)" : "";
      let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
      if (!meta) { meta = document.createElement("meta"); meta.name = "theme-color"; document.head.appendChild(meta); }
      meta.content = inFoot ? "#141311" : "#ebe8e2";
      if (foot && foot.getBoundingClientRect().top < 56) setHidden(true); // nooit over de footer heen
      else if (y < 80) setHidden(false);
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
          <Link key={id} href={`/#${id}`} className="uppercase">{id}</Link>
        ))}
      </nav>
    </header>
  );
}
