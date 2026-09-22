import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forest · scale design without losing craft",
  description:
    "Forest takes an idea through research, requirements, a design direction and a build, to something you can push. 6 camps, inside Claude Code. From k-d studio.",
  metadataBase: new URL(SITE),
  openGraph: {
    title: "Forest · scale design without losing craft",
    description:
      "An idea through research, requirements, a design direction and a build. 6 camps, inside Claude Code.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forest",
    description: "Scale design without losing craft.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body>
        {/*
          Deliberately synchronous. This must set data-theme before the first
          paint, or a stored choice flashes the other theme on every load.
          Deferring it is precisely the bug it exists to prevent.
        */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme-init.js" />
        {children}
        {/* Cookieless page counts. No banner needed, and none shown. */}
        <Analytics />
      </body>
    </html>
  );
}
