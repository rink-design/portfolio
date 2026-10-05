import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { SITE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({ url: `${SITE}/work/${p.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.8 })),
  ];
}
