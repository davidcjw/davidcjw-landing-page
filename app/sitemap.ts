import type { MetadataRoute } from "next";

const BASE_URL = "https://davidcjw.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/portfolio`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
