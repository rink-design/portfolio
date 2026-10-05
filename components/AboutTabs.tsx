"use client";
import { useState } from "react";
import { motion } from "motion/react";

type Row = { name: string; lines: string[] };
const EASE = [0.22, 1, 0.36, 1] as const;

// Compacte rijen: naam links, rol en duur rechts (op mobiel eronder). Internships: rol en vakgebied op één regel.
function Rows({ rows, group, active }: { rows: Row[]; group: string; active: boolean }) {
  return (
    <div className="group/rows">
      {rows.map((r, i) => {
        const meta = r.lines.length > 2 ? [r.lines.slice(0, -1).join(" · "), r.lines[r.lines.length - 1]] : r.lines;
        return (
          <motion.div key={r.name} data-mid={group} initial={false}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: active ? 0.6 : 0.2, ease: EASE, delay: active ? 0.1 + i * 0.06 : 0 }}>
            <div className="row group/row flex flex-col items-start gap-1 py-2.5 transition-opacity duration-300 group-has-[.row:hover]/rows:opacity-25 hover:opacity-100! md:flex-row md:items-baseline md:justify-between md:gap-[var(--gap)]">
              <p className="t-h1 !text-[clamp(30px,3.6vw,56px)] !leading-[0.98] md:whitespace-nowrap transition-colors duration-300 group-hover/row:text-accent">{r.name}</p>
              <div className="grid gap-[3px] transition-colors duration-300 group-hover/row:text-accent md:max-w-[46%] md:shrink-0 md:text-right">
                {meta.map((l) => <p key={l} className="t-label">{l}</p>)}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Tabs: Experience of Education. Beide lijsten staan op elkaar, dus de hoogte springt niet bij wisselen.
export function AboutTabs({ experience, education }: { experience: Row[]; education: Row[] }) {
  const [tab, setTab] = useState(0);
  const tabs = [{ id: "experience", label: "Experience", rows: experience }, { id: "education", label: "Education", rows: education }];
  return (
    <div>
      <div role="tablist" aria-label="Experience and education" className="mb-4 flex gap-1.5">
        {tabs.map((t, i) => (
          <button key={t.id} role="tab" type="button" id={`tab-${t.id}`} aria-selected={tab === i} aria-controls={`panel-${t.id}`} onClick={() => setTab(i)}
            className={`t-label px-4 py-2.5 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${tab === i ? "bg-ink text-paper" : "bg-paper-2 text-ink hover:bg-ink hover:text-paper"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="grid">
        {tabs.map((t, i) => (
          <div key={t.id} id={`panel-${t.id}`} role="tabpanel" aria-labelledby={`tab-${t.id}`} aria-hidden={tab !== i}
            className={`col-start-1 row-start-1 ${tab === i ? "visible" : "invisible delay-300 transition-[visibility]"}`}>
            <Rows rows={t.rows} group={t.id.slice(0, 3)} active={tab === i} />
          </div>
        ))}
      </div>
    </div>
  );
}
