import type { Metadata } from "next";
import { site } from "@/data/site";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const normalizedPath = path.endsWith("/") ? path : `${path}/`;
  const canonicalUrl = new URL(normalizedPath, site.url).toString();

  return {
    title,
    description,
    openGraph: {
      type: "website",
      siteName: "Prakhar Jain",
      title,
      description,
      url: canonicalUrl,
    },
    alternates: { canonical: canonicalUrl },
  };
}
