"use client";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

// Laat iets binnenkomen zodra het laadscherm klaar is.
export function AfterLoad({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (document.documentElement.dataset.loaded === "1") { setReady(true); return; }
    const on = () => setReady(true);
    window.addEventListener("rink:loaded", on);
    return () => window.removeEventListener("rink:loaded", on);
  }, []);
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 16 }} animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: ready ? delay : 0 }}>
      {children}
    </motion.div>
  );
}
