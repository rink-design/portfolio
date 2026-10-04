import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { cases, type CaseSet, type Insta, type Site } from "@/content/cases";
import { caseBlocks, type Block, type Item } from "@/lib/media";
import { Visual } from "@/components/blocks/Visual";
import { Phone, SiteIMac } from "@/components/blocks/Frames";
import { BlockLabel } from "@/components/blocks/BlockLabel";
import { SetRow } from "@/components/blocks/SetRow";
import { BookGrid } from "@/components/blocks/BookGrid";
import { ArchiveGrid } from "@/components/blocks/ArchiveGrid";
import { Lines, Reveal } from "@/components/motion/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.title} — RINK`, description: `${p.title} — ${p.disciplines}. ${cases[slug]?.statement ?? ""}` } : {};
}

const isPlaceholder = (t?: string) => !t || t.includes("[…]");
const PHONE_KINDS = ["telefoon", "telefoon-video"];
const host = (u?: string) => (u ? u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") : "");

// Telefoons op een rij, overal even groot.
function Phones({ items, alt, ig }: { items: Item[]; alt: (i: number) => string; ig?: Insta }) {
  return (
    <div className="flex flex-wrap justify-center gap-[4vw] px-[var(--gutter)] md:gap-[2.5vw]">
      {items.map((x, i) => <Reveal key={x.src} delay={i * 0.08} className="w-[42vw] md:w-[min(21vw,270px)]"><Phone it={x} alt={alt(i)} ig={ig} /></Reveal>)}
    </div>
  );
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx < 0) notFound();
  const p = projects[idx];
  const c = cases[slug] ?? { statement: "", sections: [] };
  const next = projects[(idx + 1) % projects.length];
  const blocks = caseBlocks(slug);

  // Indelen: brandbook (pdf), telefoons, websites, en de rest = beelden voor de sets.
  const book = blocks.filter((b) => b.kind === "scroll").flatMap((b) => b.items);
  const phones = blocks.filter((b) => PHONE_KINDS.includes(b.kind) || (c.videosAsPhones && b.kind === "video")).flatMap((b) => b.items);
  const mockSites: Site[] = blocks.filter((b) => b.kind === "website").flatMap((b) => b.items)
    .map((x) => ({ src: x.src, w: x.w, h: x.h, label: `${p.title} website` }));
  const sites = c.sites ?? mockSites;
  const imageBlocks: Block[] = blocks.filter((b) => !["scroll", "website", ...PHONE_KINDS].includes(b.kind) && !(c.videosAsPhones && b.kind === "video"));

  // Header: schermbreed vlak, vullend, niet te diep.
  const mode = c.hero ?? "first";
  let headerItems: Item[] = [];
  const firstImages = imageBlocks.flatMap((b) => b.items);
  if (mode === "first" && firstImages[0]) headerItems = [firstImages[0]];
  if (mode === "pair") headerItems = firstImages.slice(0, 2);
  const headerSite = mode === "site" ? sites[0] : undefined;
  const restSites = mode === "site" ? sites.slice(1) : sites;

  // Sets: per case vastgelegd (content/cases); anders alles wat over is in één set.
  // Eigen sets mogen het headerbeeld herhalen; zonder eigen sets komt alles wat níet in de header staat in één set.
  const pick = (keys: string[]) => imageBlocks.filter((b) => keys.some((k) => b.key.startsWith(k))).flatMap((b) => b.items);
  const inHeader = new Set(headerItems.map((x) => x.src));
  const sets = c.sets
    ? c.sets.map((d) => ({ ...d, items: pick(d.keys) })).filter((d) => d.items.length > 0)
    : ([{ name: "Images", keys: [""], items: firstImages.filter((x) => !inHeader.has(x.src)) }] as (CaseSet & { items: Item[] })[]).filter((d) => d.items.length > 0);

  let k = 0;
  const alt = () => { k++; return `${p.title} — ${p.disciplines.split(" / ")[0]}, image ${k}`; };
  const app = c.ig?.app === "tiktok" ? "TikTok" : "Instagram";

  const parts = {
    sets: sets.map((s) => (
      <section key={s.name} className="wrap">
        <BlockLabel name={s.name} note={s.note} />
        {s.layout === "grid"
          ? <ArchiveGrid items={s.items} alts={s.items.map(() => alt())} />
          : <SetRow items={s.items} alts={s.items.map(() => alt())} size={s.size} overlap={s.overlap} />}
      </section>
    )),
    phones: phones.length > 0 && mode !== "phones" ? [(
      <section key="phones">
        <div className="wrap"><BlockLabel name="Social" note={c.ig ? `${app} @${c.ig.handle}` : undefined} href={c.ig ? (c.ig.app === "tiktok" ? `https://www.tiktok.com/@${c.ig.handle}` : `https://www.instagram.com/${c.ig.handle}/`) : undefined} /></div>
        <Phones items={phones} alt={alt} ig={c.ig} />
      </section>
    )] : [],
    sites: restSites.map((s) => (
      <section key={s.src} className="wrap">
        <BlockLabel name={s.tag ?? "Website"} note={host(s.url) || s.label} href={s.url} />
        <div className="mx-auto max-w-[1000px]"><SiteIMac site={s} bare /></div>
      </section>
    )),
    book: book.length > 0 ? [(
      <section key="book" className="wrap">
        <BlockLabel name="Brandbook" note={c.book} />
        <BookGrid items={book} alts={book.map(() => alt())} />
      </section>
    )] : [],
  };
  const order = c.order ?? ["sets", "phones", "sites", "book"];
  const rest = (["sets", "phones", "sites", "book"] as const).filter((x) => !order.includes(x));

  return (
    <main>
      {/* KOP */}
      <section className="wrap pt-28 md:pt-36">
        <p className="t-label text-ink-2">{p.disciplines}</p>
        <Lines as="h1" className="t-display mt-6 -ml-[0.04em] text-[clamp(56px,13.5vw,240px)] !leading-[0.84]" lines={[p.title]} />
      </section>

      {/* HEADER — schermbreed, vullend, iets dieper (16:7; mobiel 4:3) */}
      <div className="mt-8 md:mt-12">
        {headerItems.length > 0 && (
          <div className="relative grid aspect-[4/3] overflow-hidden bg-product md:aspect-[16/7]" style={{ gridTemplateColumns: `repeat(${headerItems.length}, minmax(0, 1fr))` }}>
            {headerItems.map((x) => (
              <div key={x.src} className="relative h-full overflow-hidden">
                <Image src={x.hdr ?? x.src} alt={`${p.title} — header`} fill priority unoptimized={x.product || x.hdrProduct} sizes={headerItems.length > 1 ? "50vw" : "100vw"}
                  className={x.product || x.hdrProduct ? "object-contain" : "object-cover"}
                  style={x.product || x.hdrProduct
                    ? { ["--z" as string]: c.headerZoom ?? (headerItems.length > 1 ? 1.1 : 1.25), ["--zm" as string]: Math.min(c.headerZoom ?? 1.25, headerItems.length > 1 ? 1.35 : 1.3), transform: `translateY(${c.headerShift ?? 0}%) scale(var(--zh))` }
                    : { objectPosition: `50% ${50 - (c.headerShift ?? 0) * 2}%` }} />
              </div>
            ))}
          </div>
        )}
        {headerSite && (
          <div className="wrap">
            <BlockLabel name={headerSite.tag ?? "Website"} note={host(headerSite.url) || headerSite.label} href={headerSite.url} />
            <div className="mx-auto w-[min(100%,calc(min(56vw,72svh)*1058/915))]"><SiteIMac site={headerSite} bare /></div>
          </div>
        )}
        {mode === "phones" && phones.length > 0 && <Phones items={phones} alt={alt} ig={c.ig} />}
      </div>

      {/* TEKST — statement + My role (de onderdelen staan als steekwoorden boven de titel) */}
      <section className="wrap grid-12 items-end gap-y-10 pt-[var(--block)]">
        {/* grote titel links, My role ernaast rechts */}
        <div className="col-span-4 md:col-span-8">
          {!isPlaceholder(c.statement) && (
            <Lines as="h2" className="t-h1 statement [&>span]:whitespace-nowrap" lines={c.lines ?? [c.statement]}
              style={{ ["--chars" as string]: Math.max(...(c.lines ?? [c.statement]).map((l) => l.length)) }} />
          )}
        </div>
        <div className="col-span-4 md:col-span-4 md:col-start-9">
          {c.intro && <Reveal delay={0.1}><p className="t-label mb-8 text-ink-2">{c.intro}</p></Reveal>}
          {c.role && (
            <Reveal delay={0.15} className="max-w-[460px]">
              <p className="t-label text-ink-2">My role</p>
              <p className="t-body mt-2">{c.role}</p>
            </Reveal>
          )}
        </div>
      </section>

      {/* BEELD — elk blok met label, overal dezelfde witruimte */}
      <div className="flex flex-col gap-[var(--block)] py-[var(--block)]">
        {[...order, ...rest].flatMap((x) => parts[x])}
      </div>

      {/* NEXT PROJECT */}
      <Link href={`/work/${next.slug}`} data-tone="dark" className="group wrap block bg-ink pt-6 pb-10 text-paper" data-cursor="Next">
        <span className="t-label text-paper/60">Next project</span>
        <p className="t-display mt-16 text-[clamp(48px,11vw,200px)] !leading-[0.86] transition-colors duration-300 group-hover:text-accent">
          {next.title} →
        </p>
      </Link>
    </main>
  );
}
