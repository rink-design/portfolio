"use client";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Services in twee kolommen: regel voor regel omhoog uit een masker; hover dimt de rest.
export function ServiceList({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  return (
    <motion.ul className="group/ul grid grid-cols-2 gap-x-[var(--gap)] gap-y-0.5" initial="hidden" whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }} transition={{ staggerChildren: 0.07 }}>
      {items.map((s, i) => (
        <li key={s} tabIndex={0} data-mid="svc"
          className="svc t-h1 cursor-default overflow-hidden pb-[0.06em] !text-[clamp(28px,4.6vw,76px)] !leading-[1.02] transition-[opacity,color,transform] duration-500 group-has-[.svc:hover]/ul:opacity-20 hover:translate-x-2.5 hover:text-accent hover:opacity-100! focus-visible:text-accent focus-visible:outline-none">
          <motion.span className="block" variants={reduce ? undefined : { hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 0.9, ease: EASE } } }}>
            {s}{i === items.length - 1 ? <span className="text-accent">.</span> : ","}
          </motion.span>
        </li>
      ))}
    </motion.ul>
  );
}
