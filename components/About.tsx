import { Reveal } from "@/components/motion/Reveal";
import { ScrollSentence } from "@/components/ScrollSentence";
import { MidFocus } from "@/components/MidFocus";
import { CountUp } from "@/components/motion/CountUp";
import { AboutPortrait } from "@/components/AboutPortrait";
import { ServiceList } from "@/components/ServiceList";
import { AboutTabs } from "@/components/AboutTabs";
import { about } from "@/content/about";

// Twee rijen, elk een eigen helft van de tools (geen dubbele tool boven elkaar). Tegels even breed,
// zodat de kolommen netjes onder elkaar vallen.
function ToolRow({ tools, reverse }: { tools: typeof about.tools; reverse?: boolean }) {
  const set = tools.map((t) => (
    <div key={t.name} className="flex w-[clamp(240px,26vw,400px)] shrink-0 items-center gap-4 bg-paper-2 py-3 pl-4 pr-6">
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

      <div className="wrap relative z-10 -mt-[10svh] md:-mt-[14svh]">
        <div className="grid-12">
          <AboutPortrait />
          <div className="col-span-4 mt-14 md:col-span-6 md:col-start-7 md:mt-0">
            <AboutTabs experience={about.experience} education={about.education} />
            {/* Zelfde witruimte boven Services als boven Tools */}
            <div className="mt-14 md:mt-24">
              <p className="t-label mb-6 text-ink-2">Services</p>
              <ServiceList items={about.services} />
            </div>
          </div>
        </div>

        <div className="mt-14 md:mt-24">
          <p className="t-label mb-6 text-ink-2">Tools</p>
        </div>
        <div className="tools -mx-[var(--gutter)] grid gap-[var(--gap)] overflow-hidden" role="list" aria-label={about.tools.map((t) => t.name).join(", ")}>
          <ToolRow tools={about.tools.slice(0, 5)} />
          <ToolRow tools={about.tools.slice(5)} reverse />
        </div>

        {/* Witruimte boven en onder de cijfers is even groot (128 px, mobiel 64 px) */}
        <div className="mt-16 md:mt-32">
          <p className="t-label mb-4 text-ink-2">In numbers</p>
          {/* Op het grid: links de linker projectkolom, rechts de rechterkolom (waar Experience begint) */}
          <div className="grid-12">
            {about.numbers.map((n, i) => (
              <Reveal key={n.label} delay={i * 0.1} className={i === 0 ? "col-span-2 md:col-span-6" : "col-span-2 md:col-span-6 md:col-start-7"}>
                <p className="t-display !text-[clamp(64px,11vw,200px)] !leading-[0.9] !tracking-[-0.05em]"><CountUp to={n.to} suffix="+" delay={i * 0.15} duration={2.2} settle /></p>
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
