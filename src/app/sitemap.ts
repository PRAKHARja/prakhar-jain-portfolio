import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (!base) return [];
  const root = base.replace(/\/$/, "");
  const routes = ["", "/projects", "/projects/attendly", "/projects/no-stress-study", "/projects/visionos", "/projects/clinic-website", "/projects/clinic-website/demo", "/about", "/contact"];
  return routes.map((route) => ({ url: `${root}${route}`, lastModified: new Date() }));
}
