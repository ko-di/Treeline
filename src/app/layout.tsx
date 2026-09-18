import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "forest-kit · scale design without losing craft",
  description:
    "forest-kit takes an idea through research, requirements, a design direction and a build, to something you can push. Six camps, inside Claude Code. From k-d studio.",
  metadataBase: new URL("https://treeline-sand.vercel.app"),
  openGraph: {
    title: "forest-kit · scale design without losing craft",
    description:
      "An idea through research, requirements, a design direction and a build. Six camps, inside Claude Code.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "forest-kit",
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
      </body>
    </html>
  );
}
