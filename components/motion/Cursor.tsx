"use client";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

// Cobalt "View case"-bolletje dat de muis volgt boven werk (alleen met muis, niet op touch).
export function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const [label, setLabel] = useState<string | null>(null);
  const [fine, setFine] = useState(false);

  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches);
    const move = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      setLabel(el ? el.dataset.cursor ?? null : null);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!fine) return null;
  return (
    <motion.div className="pointer-events-none fixed left-0 top-0 z-[60]" style={{ x: sx, y: sy }}>
      <AnimatePresence>
        {label && (
          <motion.div key="c" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="t-label flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-center text-paper">
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
