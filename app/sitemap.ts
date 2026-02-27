import type { MetadataRoute } from "next";
import { getAllChapters } from "@/lib/chapters";

export default function sitemap(): MetadataRoute.Sitemap {
  const chapters = getAllChapters();

  const chapterEntries = chapters.map((chapter) => ({
    url: `https://claudeguide.xyz/${chapter.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: chapter.number === null ? 0.5 : 0.8,
  }));

  return [
    {
      url: "https://claudeguide.xyz",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...chapterEntries,
  ];
}
