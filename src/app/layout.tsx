import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

const base = process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined;

export const metadata: Metadata = {
  metadataBase: base,
  title: { default: "Prakhar Jain — Software Developer", template: "%s | Prakhar Jain" },
  description: "Portfolio of Prakhar Jain, a software developer working across Salesforce development, web applications and automation.",
  openGraph: {
    type: "website",
    siteName: "Prakhar Jain",
    title: "Prakhar Jain — Software Developer",
    description: "Software development across Salesforce, web applications and automation.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>;
}
