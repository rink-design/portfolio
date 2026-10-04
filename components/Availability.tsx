"use client";
import { useEffect, useState } from "react";

// Bovenste regel van Contact: altijd beschikbaar (groene stip) + Amsterdamse tijd die meetikt.
const fmt = () => new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Amsterdam", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date());

export function Availability() {
  const [t, setT] = useState<string | null>(null);
  useEffect(() => {
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="t-label flex flex-wrap justify-between gap-x-6 gap-y-2">
      <span className="inline-flex items-center gap-2.5">
        <span className="avail-dot is-open" aria-hidden />
        <span>Available for new projects</span>
      </span>
      <span>Amsterdam <span className="tabular-nums">{t ?? "\u00a0"}</span></span>
    </div>
  );
}
