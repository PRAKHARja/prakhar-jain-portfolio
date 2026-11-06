import type { Metadata } from "next";
import type { ReactNode } from "react";
import { site } from "@/data/site";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

const base = new URL(site.url);

export const metadata: Metadata = {
  metadataBase: base,
  title: { default: "Prakhar Jain — Salesforce Developer", template: "%s | Prakhar Jain" },
  description: "Salesforce Developer at Wipro contributing to ServiceMax enhancements, with full-stack software, data, and computer vision experience.",
  openGraph: {
    type: "website",
    siteName: "Prakhar Jain",
    title: "Prakhar Jain — Salesforce Developer",
    description: "Salesforce development, full-stack applications, data systems, and computer vision projects.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>;
}
