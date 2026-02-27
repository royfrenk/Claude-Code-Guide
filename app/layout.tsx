import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://claudeguide.xyz"),
  title: "Working With AI Agents: A Guide for Non-Technical People",
  description:
    "A practical guide to understanding and working with AI coding agents like Claude Code, Cursor, and GitHub Copilot. Written for non-technical people who want to build with AI.",
  openGraph: {
    title: "Working With AI Agents: A Guide for Non-Technical People",
    description:
      "A practical guide to understanding and working with AI coding agents like Claude Code, Cursor, and GitHub Copilot. Written for non-technical people who want to build with AI.",
    type: "website",
    siteName: "Working With AI Agents",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4a86c8",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Working With AI Agents",
  url: "https://claudeguide.xyz",
  description:
    "A practical guide for non-technical people who want to understand and use AI coding agents to build real things.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
