"use client";
import { useEffect, useState } from "react";

// Amsterdamse tijd die per seconde meetikt.
const fmt = () => new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Amsterdam", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date());

export function LocalClock() {
  const [t, setT] = useState<string | null>(null);
  useEffect(() => {
    setT(fmt());
    const id = setInterval(() => setT(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div>
      <p className="t-h1 !text-[clamp(44px,7vw,104px)] tabular-nums" suppressHydrationWarning>{t ?? " "}</p>
      <p className="t-label mt-3 text-paper/60">Amsterdam, local time</p>
    </div>
  );
}
