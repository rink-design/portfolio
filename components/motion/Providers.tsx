"use client";
import { MotionConfig } from "motion/react";

// "Minder beweging" op het apparaat = beweging uit.
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
