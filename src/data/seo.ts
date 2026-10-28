import type { Metadata } from "next";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const canonicalUrl = siteUrl ? new URL(path, siteUrl).toString() : undefined;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      siteName: "Prakhar Jain",
      title,
      description,
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
    },
    ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  };
}
