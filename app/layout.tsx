import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Providers } from "@/components/motion/Providers";
import { Cursor } from "@/components/motion/Cursor";
import { Loader } from "@/components/motion/Loader";

const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.byrink.com"),
  title: "RINK — Brand, Packaging, Art Direction",
  description: "RINK Design — brand identity, packaging and art direction by RINK, based in Amsterdam.",
  openGraph: {
    title: "RINK — Brand, Packaging, Art Direction",
    description: "Brand identity, packaging and art direction by RINK, based in Amsterdam.",
    siteName: "RINK Design",
    type: "website",
  },
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
        </Providers>
      </body>
    </html>
  );
}
