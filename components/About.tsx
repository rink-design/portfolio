import { Reveal } from "@/components/motion/Reveal";
import { ScrollSentence } from "@/components/ScrollSentence";
import { MidFocus } from "@/components/MidFocus";
import { CountUp } from "@/components/motion/CountUp";
import { AboutPortrait } from "@/components/AboutPortrait";
import { about } from "@/content/about";

// Label links (kolom 1–3), inhoud rechts (vanaf kolom 4) — zelfde lijn voor alle blokken.
const lab = "col-span-4 mb-4 md:col-span-6 md:mb-0";
const body = "col-span-4 md:col-span-6 md:col-start-7";
const block = "grid-12";

function Rows({ rows, group }: { rows: typeof about.experience; group: string }) {
  return (
    <div className="group/rows">
      {rows.map((r) => (
        <div key={r.name} data-mid={group}
          className="row group/row flex flex-col items-start py-3 transition-opacity duration-300 group-has-[.row:hover]/rows:opacity-25 hover:opacity-100! md:py-4">
          <p className="t-h1 !text-[clamp(40px,5.2vw,84px)] !leading-[0.98] transition-colors duration-300 group-hover/row:text-accent">{r.name}</p>
          <div className="mt-3 grid gap-1 transition-colors duration-300 group-hover/row:text-accent">
            {r.lines.map((l) => <p key={l} className="t-label">{l}</p>)}
          </div>
        </div>
      ))}
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
        <div className={block}>
          <AboutPortrait />
          <div className="col-span-4 mt-8 md:col-span-6 md:col-start-7 md:mt-0">
            <p className="t-label mb-6 text-ink-2">Services</p>
            <ul className="group/ul">
              {about.services.map((s) => (
                <li key={s} tabIndex={0} data-mid="svc"
                  className="svc t-h1 cursor-default py-[0.04em] !text-[clamp(40px,5.2vw,84px)] !leading-[0.98] transition-all duration-500 group-has-[.svc:hover]/ul:opacity-20 hover:translate-x-3 hover:text-accent hover:opacity-100! focus-visible:text-accent focus-visible:outline-none">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`${block} mt-14 md:mt-24`}>
          <div className={lab}><p className="t-label pt-[15px] text-ink-2">Experience</p></div>
          <div className={body}><Rows rows={about.experience} group="exp" /></div>
        </div>

        <div className={`${block} mt-3 md:mt-4`}>
          <div className={lab}><p className="t-label pt-[15px] text-ink-2">Education</p></div>
          <div className={body}><Rows rows={about.education} group="edu" /></div>
        </div>

        <div className="mt-14 md:mt-24">
          <p className="t-label mb-6 text-ink-2">Tools</p>
        </div>
        <div className="tools -mx-[var(--gutter)] grid gap-[var(--gap)] overflow-hidden" role="list" aria-label={about.tools.map((t) => t.name).join(", ")}>
          <ToolRow />
          <ToolRow reverse />
        </div>

        <div className={`${block} mt-14 md:mt-24`}>
          <div className={lab}><p className="t-label pt-[13px] text-ink-2">In numbers</p></div>
          <div className={`${body} grid grid-cols-2 gap-x-[var(--gap)]`}>
            {about.numbers.map((n, i) => (
              <Reveal key={n.label} delay={i * 0.1}>
                <p className="t-h1 !text-[clamp(40px,5.2vw,84px)] !leading-[0.98]"><CountUp to={n.to} suffix="+" delay={i * 0.15} duration={2.2} settle /></p>
                <p className="t-label mt-4 text-ink-2">{n.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <MidFocus rootId="about" />
    </section>
  );
}
