"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

// Menu verkleurt mee: wit boven donkere vlakken (video, contact, next project), zwart op licht.
// Donkere secties dragen data-tone="dark".
export function Nav() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const check = () => {
      const els = document.elementsFromPoint(window.innerWidth / 2, 28);
      setDark(els.some((el) => (el as HTMLElement).closest?.('[data-tone="dark"]')));
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    const t = setInterval(check, 800); // vangnet bij paginawissel
    return () => { window.removeEventListener("scroll", check); window.removeEventListener("resize", check); clearInterval(t); };
  }, []);
  return (
    <header className={`wrap fixed inset-x-0 top-0 z-50 flex items-center justify-between py-4 transition-colors duration-300 ${dark ? "text-paper" : "text-ink"}`}>
      <Link href="/" className="t-label !font-bold !tracking-[0.04em]" aria-label="RINK — home">RINK</Link>
      <nav className="t-label flex gap-5 md:gap-8">
        <Link href="/#work">Work</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
    </header>
  );
}
