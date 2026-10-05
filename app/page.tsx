import type { Viewport } from "next";
import { projects, contact } from "@/content/projects";
import { WorkCard } from "@/components/WorkCard";
import { Lines, Reveal } from "@/components/motion/Reveal";
import { RinkMark } from "@/components/RinkMark";
import { AfterLoad } from "@/components/motion/AfterLoad";
import { HeroVideo, hasHeroVideo } from "@/components/HeroVideo";
import { Availability } from "@/components/Availability";
import { About } from "@/components/About";
import { LiquidDrops } from "@/components/motion/LiquidDrops";
import { GetInTouch } from "@/components/GetInTouch";
import { LOGO_PATHS, LOGO_VIEWBOX } from "@/components/logo-paths";
import { Arrow } from "@/components/Arrow";

// Home begint donker (video): statusbalk op de telefoon kleurt mee, geen lichte balk boven de video.
export const viewport: Viewport = { viewportFit: "cover", themeColor: "#141311" };

export default function Home() {
  return (
    <main data-home>
      {/* 01 — HEADER: showreel als achtergrond, logo en labels in wit erbovenop */}
      <section id="top" data-tone="dark" className="relative flex h-svh min-h-[520px] flex-col justify-end overflow-hidden bg-ink">
        {hasHeroVideo() && <HeroVideo />}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/35 via-transparent to-ink/30" aria-hidden />
        <div className="wrap relative pb-5 text-paper md:pb-6">
          <RinkMark color="var(--color-paper)" />
          <AfterLoad delay={0.35}>
            {/* Eén regel. Mobiel: Packaging in het midden. Web: Packaging begint precies onder de N van INK (50,8% van de logobreedte). */}
            <div className="t-label relative mt-5 grid grid-cols-[1fr_auto_1fr] items-baseline whitespace-nowrap">
              <span>Brand</span>
              <span className="text-center md:absolute md:left-[50.82%] md:text-left">Packaging</span>
              <span className="text-right md:col-start-3">Art Direction</span>
            </div>
          </AfterLoad>
        </div>
      </section>

      {/* 03 — SELECTED WORK — vijf rijen van twee */}
      <section id="work" className="wrap mt-16 scroll-mt-16 md:mt-24">
        <div className="flex items-end justify-between pb-10">
          <h2 className="t-label">Selected projects</h2>
        </div>
        <div className="grid grid-cols-1 gap-x-[var(--gap)] gap-y-16 md:grid-cols-2 md:gap-y-24">
          {projects.map((p, i) => <WorkCard key={p.slug} p={p} delay={i % 2 ? 0.12 : 0} />)}
        </div>
      </section>

      {/* ABOUT — statement, services, experience, education, cijfers, tools */}
      <About />

      {/* 05 — CONTACT: vloeibaar inkt-en-cobalt vlak, Get in touch-menu, live klok */}
      {/* Precies één schermhoogte (lvh: ook als de Safari-balk op iPhone inklapt), gegevens onderaan, vrij van de thuisbalk */}
      <section id="contact" data-tone="dark" className="relative isolate mt-16 flex min-h-lvh flex-col overflow-hidden bg-ink text-paper md:mt-32">
        <LiquidDrops />
        <div className="wrap flex flex-1 flex-col gap-10 pt-16 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <Availability />
          <Lines className="t-display !leading-[0.86] !tracking-[-0.052em] text-[clamp(64px,min(15.5vw,22svh),260px)]" stagger={0.1}
            lines={["Let’s work", <>together<span key="d" className="ml-[0.06em] inline-block h-[0.17em] w-[0.17em] bg-accent" aria-hidden /></>]} />
          {/* Knop halverwege tussen de kop en de onderkant */}
          <Reveal className="my-auto">
            <GetInTouch />
          </Reveal>
          {/* Onderlijn: klein wit logo als ondertekening links, gegevens rechts naast elkaar.
              Geen Reveal: helemaal onderaan zou hij nooit 'in beeld' komen en onzichtbaar blijven. */}
          <div className="flex flex-col-reverse gap-8 md:flex-row md:items-end md:justify-between">
            <svg viewBox={`${LOGO_VIEWBOX.x} ${LOGO_VIEWBOX.y} ${LOGO_VIEWBOX.w} ${LOGO_VIEWBOX.h}`} className="block h-auto w-[64px]" aria-label="RINK">
              {LOGO_PATHS.map((d, i) => <path key={i} d={d} fill="var(--color-paper)" />)}
            </svg>
            <div className="t-body flex flex-col gap-2 md:flex-row md:gap-10 md:leading-none">
              <a href={`mailto:${contact.email}?subject=Project%20orientation%20-%20Rink%20Design`} className="link-line self-start">{contact.email}</a>
              <a href={contact.phoneHref} className="link-line self-start">{contact.phone}</a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="link-line self-start">LinkedIn <Arrow dir="ur" className="ml-1" /></a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
