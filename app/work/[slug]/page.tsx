import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { cases, type Section } from "@/content/cases";
import { caseBlocks, type Block, type Item } from "@/lib/media";
import { Visual } from "@/components/blocks/Visual";
import { Layover } from "@/components/blocks/Layover";
import { HScroll } from "@/components/blocks/HScroll";
import { Phone, Laptop } from "@/components/blocks/Frames";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Lines, Reveal } from "@/components/motion/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.title} — RINK`, description: `${p.title} — ${p.disciplines}. ${cases[slug]?.statement ?? ""}` } : {};
}

const half = "(min-width: 768px) 50vw, 100vw";
const third = "(min-width: 768px) 33vw, 100vw";

function BlockView({ b, alt }: { b: Block; alt: (i: number) => string }) {
  const it = b.items;
  switch (b.kind) {
    case "layover":
      return <Layover items={it} alt={alt} />;
    case "scroll":
      return <HScroll items={it} alts={it.map((_, i) => alt(i))} />;
    case "groot":
      return <div className="wrap"><ImageReveal><Visual it={it[0]} alt={alt(0)} /></ImageReveal></div>;
    case "duo":
    case "studio":
    case "video":
      if (it.length === 1) return <div className="wrap grid-12"><div className="col-span-4 md:col-span-8 md:col-start-3"><ImageReveal><Visual it={it[0]} alt={alt(0)} sizes="66vw" /></ImageReveal></div></div>;
      return (
        <div className="wrap grid grid-cols-1 gap-[var(--gap)] md:grid-cols-2">
          {it.map((x, i) => <ImageReveal key={x.src} delay={i * 0.1}><Visual it={x} alt={alt(i)} ratio={b.kind === "video" ? "9/16" : "4/5"} sizes={half} /></ImageReveal>)}
        </div>
      );
    case "trio":
      return (
        <div className="wrap grid grid-cols-1 gap-[var(--gap)] md:grid-cols-3">
          {it.map((x, i) => <ImageReveal key={x.src} delay={i * 0.08}><Visual it={x} alt={alt(i)} ratio="4/5" sizes={third} /></ImageReveal>)}
        </div>
      );
    case "detail":
      return (
        <div className="wrap grid grid-cols-2 gap-[var(--gap)] md:grid-cols-3">
          {it.map((x, i) => <ImageReveal key={x.src} delay={(i % 3) * 0.08}><Visual it={x} alt={alt(i)} ratio="1/1" sizes={third} /></ImageReveal>)}
        </div>
      );
    case "set":
      // Beeldwand: eerste groot, de rest eromheen.
      return (
        <div className="wrap grid grid-cols-2 gap-[var(--gap)] md:grid-cols-4">
          {it.map((x, i) => (
            <ImageReveal key={x.src} delay={(i % 4) * 0.06} className={i === 0 ? "col-span-2 row-span-2" : ""}>
              <Visual it={x} alt={alt(i)} ratio="1/1" sizes={i === 0 ? half : "(min-width: 768px) 25vw, 50vw"} />
            </ImageReveal>
          ))}
        </div>
      );
    case "telefoon":
    case "telefoon-video":
      return <div className="wrap bg-paper-2/60 py-20 md:py-28"><Reveal><Phone it={it[0]} alt={alt(0)} /></Reveal></div>;
    case "website":
      return <div className="wrap overflow-x-clip py-16 md:py-24"><Reveal><Laptop it={it[0]} alt={alt(0)} /></Reveal></div>;
    default:
      return <div className="wrap grid-12"><div className="col-span-4 md:col-span-8 md:col-start-3"><ImageReveal><Visual it={it[0]} alt={alt(0)} sizes="66vw" /></ImageReveal></div></div>;
  }
}

function SectionText({ group }: { group: { s: Section; n: number }[] }) {
  return (
    <section className="wrap grid-12 gap-y-12 pt-24 pb-14 md:pt-36 md:pb-20">
      {group.map(({ s, n }, gi) => (
        <div key={s.label} className={`col-span-4 grid grid-cols-subgrid ${group.length > 1 ? "md:col-span-6" : "md:col-span-12"}`}>
          <p className="t-label col-span-4 text-ink-2 md:col-span-1">{String(n + 1).padStart(2, "0")}</p>
          <div className={`col-span-4 mt-4 md:mt-0 ${group.length > 1 ? "md:col-span-5" : "md:col-span-9 md:col-start-4"}`}>
            <Lines as="h2" className="t-h2" lines={[s.label]} />
            {s.text && <Reveal delay={0.1 + gi * 0.08}><p className="t-body mt-4 max-w-[520px] text-ink-2">{s.text}</p></Reveal>}
          </div>
        </div>
      ))}
    </section>
  );
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx < 0) notFound();
  const p = projects[idx];
  const c = cases[slug];
  const next = projects[(idx + 1) % projects.length];
  const blocks = caseBlocks(slug);
  const sections = c?.sections ?? [];

  // Secties gelijk verdeeld vóór de beeldblokken.
  const per = blocks.length / Math.max(sections.length, 1);
  const at = sections.map((_, n) => Math.min(blocks.length - 1, Math.round(n * per)));
  const hero: Item | undefined = p.cover ? { src: p.cover, w: 16, h: 9, video: p.cover.endsWith(".mp4"), poster: p.poster } : undefined;
  let k = 0;
  const alt = () => { k++; return `${p.title} — ${p.disciplines.split(" / ")[0]}, beeld ${String(k).padStart(2, "0")}`; };

  return (
    <main>
      {/* KOP */}
      <section className="wrap pt-28 md:pt-36">
        <div className="grid-12 items-end">
          <p className="t-label col-span-4 text-ink-2 md:col-span-2">{p.number} / {String(projects.length).padStart(2, "0")}</p>
          <p className="t-label col-span-4 mt-2 text-ink-2 md:col-span-10 md:mt-0 md:text-right">{p.disciplines}</p>
        </div>
        <Lines as="h1" className="t-display mt-6 -ml-[0.04em] text-[clamp(56px,13.5vw,240px)] !leading-[0.84]" lines={[p.title]} />
      </section>
      {hero && (
        <section className="mt-8 md:mt-12">
          <Visual it={hero} alt={`${p.title} — hero`} ratio="16/9" priority className="max-md:!aspect-[4/5]" />
        </section>
      )}

      {/* INTRO */}
      <section className="wrap grid-12 py-24 md:py-36">
        <Reveal className="col-span-4 md:col-span-3"><p className="t-label text-ink-2">{c?.intro ?? "(Case)"}</p></Reveal>
        <div className="col-span-4 mt-6 md:col-span-9 md:mt-0">
          <Lines as="h2" className="t-h1" lines={[c?.statement ?? ""]} />
          {c?.role && (
            <Reveal delay={0.15} className="mt-12 max-w-[640px]">
              <p className="t-label text-ink-2">My role</p>
              <p className="t-body mt-3">{c.role}</p>
            </Reveal>
          )}
        </div>
      </section>

      {/* BLOKKEN */}
      <div className="space-y-[var(--gap)]">
        {blocks.map((b, bi) => (
          <div key={b.key}>
            {at.includes(bi) && <SectionText group={sections.map((s, n) => ({ s, n })).filter((_, n) => at[n] === bi)} />}
            <BlockView b={b} alt={alt} />
          </div>
        ))}
        {blocks.length === 0 && <p className="wrap t-label text-ink-2">Beeld volgt.</p>}
      </div>

      {/* NEXT PROJECT */}
      <Link href={`/work/${next.slug}`} className="group wrap mt-28 block bg-ink pt-6 pb-10 text-paper md:mt-40" data-cursor="Next">
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
