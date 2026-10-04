import { Reveal } from "@/components/motion/Reveal";
import { ScrollSentence } from "@/components/ScrollSentence";
import { MidFocus } from "@/components/MidFocus";
import { CountUp } from "@/components/motion/CountUp";
import { AboutPortrait } from "@/components/AboutPortrait";
import { ServiceList } from "@/components/ServiceList";
import { about } from "@/content/about";

// Compacte rijen: naam links, rol en duur rechts (op mobiel eronder). Internships: rol en vakgebied op één regel.
function Rows({ rows, group }: { rows: typeof about.experience; group: string }) {
  return (
    <div className="group/rows">
      {rows.map((r) => {
        const meta = r.lines.length > 2 ? [r.lines.slice(0, -1).join(" · "), r.lines[r.lines.length - 1]] : r.lines;
        return (
          <div key={r.name} data-mid={group}
            className="row group/row flex flex-col items-start gap-1 py-2.5 transition-opacity duration-300 group-has-[.row:hover]/rows:opacity-25 hover:opacity-100! md:flex-row md:items-baseline md:justify-between md:gap-[var(--gap)]">
            <p className="t-h1 !text-[clamp(30px,3.6vw,56px)] !leading-[0.98] transition-colors duration-300 group-hover/row:text-accent">{r.name}</p>
            <div className="grid gap-[3px] transition-colors duration-300 group-hover/row:text-accent md:max-w-[58%] md:shrink-0 md:text-right">
              {meta.map((l) => <p key={l} className="t-label">{l}</p>)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ToolRow({ reverse }: { reverse?: boolean }) {
  const set = about.tools.map((t) => (
    <div key={t.name} className="flex shrink-0 items-center gap-4 bg-paper-2 py-3 pl-4 pr-6">
      {t.logo
        // eslint-disable-next-line @next/next/no-img-element
        ? <img src={t.logo} alt="" width={48} height={48} className="size-12 shrink-0 object-contain" />
        : <span className="grid size-12 shrink-0 place-items-center bg-ink text-[18px] font-bold tracking-[-0.04em] text-paper" style={{ fontVariationSettings: '"opsz" 32' }}>{t.mark}</span>}
      <span className="t-h2 !text-[clamp(20px,1.8vw,28px)] !font-semibold whitespace-nowrap">{t.name}</span>
    </div>
  ));
  return (
    <div className={`tools-track flex w-max gap-[var(--gap)] ${reverse ? "tools-track-rev" : ""}`} aria-hidden>
      <div className="flex gap-[var(--gap)]">{set}</div>
      <div className="flex gap-[var(--gap)]">{set}</div>
      <div className="flex gap-[var(--gap)]">{set}</div>
      <div className="flex gap-[var(--gap)]">{set}</div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-mt-16" aria-label="About">
      <ScrollSentence text={about.statement} />

      <div className="wrap -mt-[10svh] md:-mt-[14svh]">
        <div className="grid-12">
          <AboutPortrait />
          <div className="col-span-4 mt-8 md:col-span-6 md:col-start-7 md:mt-0">
            <p className="t-label mb-3 text-ink-2">Experience</p>
            <Rows rows={about.experience} group="exp" />
            <p className="t-label mb-3 mt-8 text-ink-2 md:mt-10">Education</p>
            <Rows rows={about.education} group="edu" />
          </div>
        </div>

        <div className="mt-14 md:mt-20">
          <p className="t-label mb-6 text-ink-2">Services</p>
          <ServiceList items={about.services} />
        </div>

        <div className="mt-14 md:mt-24">
          <p className="t-label mb-6 text-ink-2">Tools</p>
        </div>
        <div className="tools -mx-[var(--gutter)] grid gap-[var(--gap)] overflow-hidden" role="list" aria-label={about.tools.map((t) => t.name).join(", ")}>
          <ToolRow />
          <ToolRow reverse />
        </div>

        {/* Witruimte boven en onder de cijfers is even groot (128 px, mobiel 64 px) */}
        <div className="mt-16 md:mt-32">
          <p className="t-label mb-4 text-ink-2">In numbers</p>
          <div className="grid grid-cols-2 gap-x-[var(--gap)] md:grid-cols-4">
            {about.numbers.map((n, i) => (
              <Reveal key={n.label} delay={i * 0.1}>
                <p className="t-h1 !text-[clamp(28px,4.6vw,76px)] !leading-[1.02]"><CountUp to={n.to} suffix="+" delay={i * 0.15} duration={2.2} settle /></p>
                <p className="t-label mt-3 text-ink-2">{n.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <MidFocus rootId="about" />
    </section>
  );
}
