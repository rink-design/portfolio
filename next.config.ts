import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Beelden zijn al webklaar (scripts/beelden.mjs). Vercel's beeld-optimalisatie
  // uit: op Hobby max. 5.000 omzettingen/maand (daarna 402 = geen beeld), en
  // bronnen hoger dan 8192 px (sites/bigpush, sites/santani) werken er nooit.
  images: { unoptimized: true },
};

export default nextConfig;
