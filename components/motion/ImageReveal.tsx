"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Beeld vouwt open van onder naar boven en zoomt licht uit.
export function ImageReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={`overflow-hidden ${className}`}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }} whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 1.1, ease: EASE, delay }}>
      <motion.div initial={{ scale: 1.18 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 1.5, ease: EASE, delay }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

// Hero-beeld: groeit van ingesprongen naar volle breedte terwijl je scrollt.
export function HeroGrow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const inset = useTransform(scrollYProgress, [0, 1], ["inset(0% 9% 0% 9% round 0px)", "inset(0% 0% 0% 0% round 0px)"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  return (
    <div ref={ref}>
      <motion.div style={{ clipPath: inset }} className="overflow-hidden">
        <motion.div style={{ scale }}>{children}</motion.div>
      </motion.div>
    </div>
  );
}
