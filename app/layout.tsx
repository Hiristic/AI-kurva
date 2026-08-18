import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hiristic.eu"),
  title: "Hiristic | AI automation hosted in the EU",
  description:
    "Hiristic helps companies automate operations with AI, orchestration, and EU-hosted tooling built for GDPR-compliant delivery.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sv" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
