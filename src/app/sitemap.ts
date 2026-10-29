import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const paths = ["/", "/about", "/contact", "/privacy"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return paths.map((path) => ({
    url: path === "/" ? site.url : `${site.url}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
