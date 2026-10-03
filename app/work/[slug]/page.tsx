import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { cases, type Section } from "@/content/cases";
import { caseMedia, type MediaItem } from "@/lib/media";
import { Asset, Phone, Laptop } from "@/components/CaseMedia";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.title} — RINK`, description: `${p.title} — ${p.disciplines}. ${cases[slug]?.statement ?? ""}` } : {};
}

// Voorbeeldreeks zolang er nog geen beelden zijn — laat het systeem zien.
const DEMO: MediaItem["kind"][] = ["groot", "standaard", "duo", "duo", "groot", "telefoon", "standaard", "laptop", "duo", "duo", "groot"];

type Block =
  | { t: "full"; m?: MediaItem; i: number }
  | { t: "inset"; m?: MediaItem; i: number; side: "l" | "r" }
  | { t: "duo"; a?: MediaItem; b?: MediaItem; i: number }
  | { t: "phone"; m?: MediaItem; i: number }
  | { t: "laptop"; m?: MediaItem; i: number }
  | { t: "text"; s: Section; n: number };

function buildBlocks(media: (MediaItem | undefined)[], kinds: MediaItem["kind"][], sections: Section[]): Block[] {
  const blocks: Block[] = [];
  let inset = 0;
  for (let i = 0; i < kinds.length; i++) {
    const k = kinds[i], m = media[i];
    if (k === "duo" && kinds[i + 1] === "duo") { blocks.push({ t: "duo", a: m, b: media[i + 1], i }); i++; continue; }
    if (k === "groot") blocks.push({ t: "full", m, i });
    else if (k === "telefoon") blocks.push({ t: "phone", m, i });
    else if (k === "laptop") blocks.push({ t: "laptop", m, i });
    else blocks.push({ t: "inset", m, i, side: inset++ % 2 ? "r" : "l" });
  }
  // Secties verdelen: expliciet via `before`, anders gelijk verspreid tussen de beeldblokken.
  const out: Block[] = [];
  const per = blocks.length / Math.max(sections.length, 1);
  const at = sections.map((s, n) => s.before !== undefined
    ? Math.max(0, blocks.findIndex((b) => "i" in b && b.i + 1 >= s.before!))
    : Math.round(n * per));
  blocks.forEach((b, bi) => {
    sections.forEach((s, n) => { if (at[n] === bi) out.push({ t: "text", s, n }); });
    out.push(b);
  });
  return out;
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx < 0) notFound();
  const p = projects[idx];
  const c = cases[slug];
  const next = projects[(idx + 1) % projects.length];

  const all = caseMedia(slug);
  const hero = all[0];
  const rest = all.slice(1);
  const hasMedia = all.length > 0;
  const finale = rest.length > 2 ? rest[rest.length - 1] : undefined;
  const body = finale ? rest.slice(0, -1) : rest;
  const kinds = hasMedia ? body.map((m) => m.kind) : DEMO;
  const blocks = buildBlocks(hasMedia ? body : [], kinds, c?.sections ?? []);
  const alt = (i: number) => `${p.title} — beeld ${String(i + 2).padStart(2, "0")}`;

  return (
    <main className="pb-0">
      {/* HERO */}
      <section className="wrap pt-28 md:pt-36">
        <div className="grid-12 items-end">
          <p className="t-label col-span-4 text-ink-2 md:col-span-2">{p.number} / {String(projects.length).padStart(2, "0")}</p>
          <p className="t-label col-span-4 mt-2 text-ink-2 md:col-span-10 md:mt-0 md:text-right">{p.disciplines}</p>
        </div>
        <h1 className="t-display mt-6 -ml-[0.04em] text-[clamp(56px,13.5vw,240px)] !leading-[0.84] break-words">{p.title}</h1>
      </section>
      <section className="mt-8 md:mt-12">
        <Asset m={hero} ratio="16/9" priority label={hero ? `${p.title} — hero` : `${p.title} — hero, beeld volgt`} />
      </section>

      {/* INTRO */}
      <section className="wrap grid-12 py-24 md:py-36">
        <p className="t-label col-span-4 text-ink-2 md:col-span-3">{c?.intro ?? "(Case)"}</p>
        <div className="col-span-4 mt-6 md:col-span-9 md:mt-0">
          <h2 className="t-h1">{c?.statement}</h2>
          {c?.role && (
            <div className="mt-12 max-w-[640px] border-t border-line pt-4">
              <p className="t-label text-ink-2">My role</p>
              <p className="t-body mt-3">{c.role}</p>
            </div>
          )}
        </div>
      </section>

      {/* BLOKKEN */}
      <div className="space-y-[var(--gap)]">
        {blocks.map((b, k) => {
          switch (b.t) {
            case "text":
              return (
                <section key={k} className="wrap grid-12 !mt-24 border-t border-line pt-4 pb-14 md:!mt-36 md:pb-20">
                  <p className="t-label col-span-4 text-ink-2 md:col-span-3">{String(b.n + 1).padStart(2, "0")}</p>
                  <div className="col-span-4 mt-4 md:col-span-9 md:mt-0">
                    <h3 className="t-h2">{b.s.label}</h3>
                    {b.s.text && <p className="t-body mt-4 max-w-[520px] text-ink-2">{b.s.text}</p>}
                  </div>
                </section>
              );
            case "full":
              return <section key={k} className="wrap"><Asset m={b.m} ratio="16/9" label={alt(b.i)} /></section>;
            case "inset":
              return (
                <section key={k} className="wrap grid-12">
                  <div className={`col-span-4 md:col-span-8 ${b.side === "r" ? "md:col-start-5" : ""}`}>
                    <Asset m={b.m} ratio="3/2" sizes="(min-width: 768px) 66vw, 100vw" label={alt(b.i)} />
                  </div>
                </section>
              );
            case "duo":
              return (
                <section key={k} className="wrap grid grid-cols-1 gap-[var(--gap)] md:grid-cols-2">
                  <Asset m={b.a} ratio="4/5" sizes="(min-width: 768px) 50vw, 100vw" label={alt(b.i)} />
                  <Asset m={b.b} ratio="4/5" sizes="(min-width: 768px) 50vw, 100vw" label={alt(b.i + 1)} />
                </section>
              );
            case "phone":
              return <section key={k} className="wrap bg-paper-2/60 py-20 md:py-28"><Phone m={b.m} label={alt(b.i)} /></section>;
            case "laptop":
              return <section key={k} className="wrap overflow-x-clip py-16 md:py-24"><Laptop m={b.m} label={alt(b.i)} /></section>;
          }
        })}
      </div>

      {/* SLOTBEELD */}
      <section className="mt-[var(--gap)]">
        <Asset m={finale} ratio="16/9" label={`${p.title} — slotbeeld${finale ? "" : ", beeld volgt"}`} />
      </section>

      {/* NEXT PROJECT */}
      <Link href={`/work/${next.slug}`} className="group wrap block bg-ink pt-6 pb-10 text-paper">
        <div className="flex justify-between">
          <span className="t-label text-paper/60">Next project</span>
          <span className="t-label text-paper/60">{next.number}</span>
        </div>
        <p className="t-display mt-16 text-[clamp(48px,11vw,200px)] !leading-[0.86] transition-colors duration-300 group-hover:text-accent">
          {next.title} →
        </p>
      </Link>
    </main>
  );
}
