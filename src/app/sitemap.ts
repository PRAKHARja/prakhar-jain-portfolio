import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl =
  "https://PRAKHARja.github.io/prakhar-jain-portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/projects",
    "/projects/attendly",
    "/projects/no-stress-study",
    "/projects/visionos",
    "/projects/clinic-website",
    "/projects/clinic-website/demo",
    "/about",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}