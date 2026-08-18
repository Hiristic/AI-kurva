import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hiristic.eu"),
  title: "Hiristic | AI automation hosted in the EU",
  description:
    "Hiristic helps companies automate operations with AI, orchestration, and EU-hosted tooling built for GDPR-compliant delivery.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
