import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Working With AI Agents: A Guide for Non-Technical People",
  description:
    "A practical guide to understanding and working with AI coding agents like Claude Code, Cursor, and GitHub Copilot. Written for non-technical people who want to build with AI.",
  openGraph: {
    title: "Working With AI Agents: A Guide for Non-Technical People",
    description:
      "A practical guide to understanding and working with AI coding agents.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4a86c8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
