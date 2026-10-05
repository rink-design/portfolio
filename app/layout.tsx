import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Providers } from "@/components/motion/Providers";
import { Cursor } from "@/components/motion/Cursor";
import { Loader } from "@/components/motion/Loader";
import { JsonLd } from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { SITE, PERSON, BRAND, TITLE, DESCRIPTION, siteJsonLd } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: `%s | ${BRAND}` },
  description: DESCRIPTION,
  applicationName: BRAND,
  authors: [{ name: PERSON, url: SITE }],
  creator: PERSON,
  keywords: ["freelance designer Amsterdam", "freelance brand designer", "packaging design", "brand identity", "art direction", "product development", "Rinke van de Rakt", "RINK Design"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { title: TITLE, description: DESCRIPTION, siteName: BRAND, type: "website", url: SITE, locale: "en_NL" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

// Mobiel: beeld mag doorlopen tot bovenin het scherm (ook achter de statusbalk).
export const viewport: Viewport = { viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <noscript><style>{`.rink-loader{display:none!important}`}</style></noscript>
        <Providers>
          <Nav />
          {children}
          <Cursor />
          <Loader />
          <JsonLd data={siteJsonLd} />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
