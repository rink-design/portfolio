import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Providers } from "@/components/motion/Providers";
import { Cursor } from "@/components/motion/Cursor";

const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RINK — Brand, Packaging, Digital",
  description: "RINK Design — brand identity, packaging, digital design and art direction.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>
          <Nav />
          {children}
          <Cursor />
        </Providers>
      </body>
    </html>
  );
}
