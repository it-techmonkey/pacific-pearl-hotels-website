import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.pacificpearlhotels.com";
  const routes = [
    "",
    "/about",
    "/services",
    "/hotels",
    "/events",
    "/faq",
    "/testimonials",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
