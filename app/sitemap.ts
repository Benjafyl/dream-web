import type { MetadataRoute } from "next";
import { paths, projects, siteUrl } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [...Object.values(paths.es), ...Object.values(paths.en)];
  const projectPages = projects
    .filter((project) => project.published)
    .flatMap((project) => [
      `${paths.es.projects}/${project.slug}`,
      `${paths.en.projects}/${project.slug}`,
    ]);

  return [...pages, ...projectPages].map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: path === "/" || path === "/en" ? "monthly" : "yearly",
    priority: path === "/" || path === "/en" ? 1 : 0.7,
  }));
}
