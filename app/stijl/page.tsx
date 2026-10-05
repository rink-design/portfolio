import type { Metadata } from "next";
import { Arrow } from "@/components/Arrow";

export const metadata: Metadata = { title: "RINK — Stijlpagina", robots: { index: false } };

const neutrals = [
  { name: "Paper", token: "paper", hex: "#EBE8E2", note: "Basis — warm gebroken wit" },
  { name: "Paper 2", token: "paper-2", hex: "#E0DCD4", note: "Vlakken, kaders" },
  { name: "Line", token: "line", hex: "#CFCAC1", note: "Lijnen" },
  { name: "Ink 2", token: "ink-2", hex: "#6F6B64", note: "Secundaire tekst" },
  { name: "Ink", token: "ink", hex: "#141311", note: "Tekst — bijna-zwart" },
];

const accents = [
  { id: "A", name: "Signal Orange", hex: "#FF4F00", note: "Energiek, opvallend op het schap. Knalt op warm wit." },
  { id: "B", name: "Cobalt", hex: "#2D3BFF", note: "Digitaal, fris. Sterk contrast met de warme basis." },
  { id: "C", name: "Bordeaux", hex: "#6E1A26", note: "Premium en tactiel. Ingetogen, voelt als drukwerk." },
];

function Label({ children }: { children: React.ReactNode }) {
  return <p className="t-label text-ink-2">{children}</p>;
}

export default function Stijl() {
  return (
    <main className="wrap pt-24 pb-32">
      <Label>RINK — Designsysteem / v1</Label>

      {/* Typografie */}
      <section className="mt-16 border-t border-line pt-6">
        <Label>01 — Typografie · Inter Display</Label>
        <div className="mt-10 space-y-14">
          <div>
            <p className="t-label mb-3 text-ink-2">Display — RINK, over de volle breedte</p>
            <p className="t-display text-[calc((100vw-2*var(--gutter))/2.065)] -ml-[0.054em]">RINK</p>
          </div>
          <div>
            <p className="t-label mb-3 text-ink-2">H1 — casetitel</p>
            <h1 className="t-h1">Don Gelato</h1>
          </div>
          <div className="grid-12">
            <div className="col-span-4 md:col-span-6">
              <p className="t-label mb-3 text-ink-2">H2 — statement</p>
              <h2 className="t-h2">One briefing.<br />Two answers.</h2>
            </div>
            <div className="col-span-4 mt-10 md:col-span-4 md:col-start-8 md:mt-0">
              <p className="t-label mb-3 text-ink-2">Body</p>
              <p className="t-body">Concept, project management and graphics, with fellow students during my internship at Code d&apos;Azur.</p>
              <p className="t-label mt-8 mb-3 text-ink-2">Label</p>
              <p className="t-label">Brand / Packaging / Digital</p>
            </div>
          </div>
        </div>
      </section>

      {/* Neutrals */}
      <section className="mt-28 border-t border-line pt-6">
        <Label>02 — Basiskleuren</Label>
        <div className="mt-10 grid grid-cols-2 gap-[var(--gap)] md:grid-cols-5">
          {neutrals.map((c) => (
            <div key={c.token}>
              <div className="aspect-[4/5] border border-line" style={{ background: c.hex }} />
              <p className="t-label mt-3">{c.name}</p>
              <p className="t-label text-ink-2">{c.hex}</p>
              <p className="mt-1 text-[13px] text-ink-2">{c.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Accenten */}
      <section className="mt-28 border-t border-line pt-6">
        <Label>03 — Accentkleur · kies er één</Label>
        <div className="mt-10 space-y-[var(--gap)]">
          {accents.map((a) => (
            <div key={a.id} className="grid-12 items-end border-b border-line pb-[var(--gap)]">
              <div className="col-span-4 md:col-span-3">
                <p className="t-h2" style={{ color: a.hex }}>{a.id}</p>
                <p className="t-label mt-2">{a.name} · {a.hex}</p>
                <p className="mt-1 text-[13px] text-ink-2">{a.note}</p>
              </div>
              {/* Zo zou het accent gebruikt worden */}
              <div className="col-span-4 mt-6 md:col-span-9 md:mt-0">
                <div className="grid grid-cols-3 gap-[var(--gap)]">
                  <div className="flex aspect-[16/10] items-end p-3" style={{ background: a.hex }}>
                    <span className="t-label text-paper">Let&apos;s work together</span>
                  </div>
                  <div className="flex aspect-[16/10] flex-col justify-between bg-paper-2 p-3">
                    <span className="t-label">01 — JAJA</span>
                    <span className="t-label" style={{ color: a.hex }}>View case <Arrow dir="r" /></span>
                  </div>
                  <div className="flex aspect-[16/10] items-center justify-center bg-ink p-3">
                    <span className="t-h2 text-paper">RINK<span style={{ color: a.hex }}>.</span></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="mt-28 border-t border-line pt-6">
        <Label>04 — Grid · 12 kolommen desktop / 4 mobiel</Label>
        <div className="grid-12 mt-10 h-48">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={`${i >= 4 ? "hidden md:flex" : "flex"} items-end bg-paper-2 p-2`}>
              <span className="t-label text-ink-2">{i + 1}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[13px] text-ink-2">Buitenmarge 16 px (mobiel) / 24 px (desktop) · kolomafstand 12 / 20 px</p>
      </section>

      {/* Werkgrid-proef */}
      <section className="mt-28 border-t border-line pt-6">
        <Label>05 — Werkoverzicht (proef, zonder beeld)</Label>
        <div className="mt-10 space-y-[var(--gap)]">
          <div className="aspect-[16/9] bg-paper-2" />
          <div className="flex justify-between"><span className="t-label">01 — JAJA</span><span className="t-label text-ink-2">Brand / Packaging / Digital</span></div>
          <div className="grid grid-cols-1 gap-[var(--gap)] pt-8 md:grid-cols-2">
            {["02 — SOIREE", "03 — PURPLE RAIN"].map((t) => (
              <div key={t}>
                <div className="aspect-[4/5] bg-paper-2" />
                <div className="mt-3 flex justify-between"><span className="t-label">{t}</span><span className="t-label text-ink-2">Identity / Packaging</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
