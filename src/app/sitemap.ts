import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export const dynamic = "force-static";

const baseUrl =
  "https://prakharja.github.io/prakhar-jain-portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/projects/", ...projects.map(({ slug }) => `/projects/${slug}/`), "/about/", "/contact/"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
