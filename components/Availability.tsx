"use client";
import { useEffect, useState } from "react";

// Groene stip ma–vr 10:00–18:00 (Amsterdamse tijd), anders grijs 'Offline'. Plus de lokale tijd.
function now() {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Amsterdam", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false, timeZoneName: "short" })
      .formatToParts(new Date()).map((x) => [x.type, x.value]),
  );
  const min = +parts.hour * 60 + +parts.minute;
  const zone = parts.timeZoneName === "GMT+2" ? "CEST" : parts.timeZoneName === "GMT+1" ? "CET" : parts.timeZoneName;
  return { open: !["Sat", "Sun"].includes(parts.weekday) && min >= 600 && min < 1080, time: `${parts.hour}:${parts.minute} ${zone}` };
}

export function Availability() {
  const [s, setS] = useState<ReturnType<typeof now> | null>(null);
  useEffect(() => {
    setS(now());
    const id = setInterval(() => setS(now()), 15000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="t-label flex flex-wrap justify-between gap-x-6 gap-y-2 text-paper/80">
      <span className="inline-flex items-center gap-2.5">
        <span className={`avail-dot ${s?.open ? "is-open" : ""}`} aria-hidden />
        <span>{s ? (s.open ? "Available for new projects" : "Offline") : " "}</span>
      </span>
      <span>Based in Amsterdam{s && <> · <span className="tabular-nums">{s.time}</span></>}</span>
    </div>
  );
}
