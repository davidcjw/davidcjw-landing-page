import type { MetadataRoute } from "next";

const BASE_URL = "https://davidcjw.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
