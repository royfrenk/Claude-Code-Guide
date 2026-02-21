import { notFound } from "next/navigation";
import {
  getAllChapters,
  getChapterBySlug,
  getChapterSlugs,
  getAdjacentChapters,
} from "@/lib/chapters";
import { GuideLayout } from "@/components/guide-layout";
import { ChapterPage } from "@/components/chapter-page";

export async function generateStaticParams() {
  const slugs = getChapterSlugs();
  return slugs
    .filter((slug) => slug !== "00-introduction")
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  if (!chapter) return {};

  return {
    title: `${chapter.title} — Working With AI Agents`,
    description: `Chapter ${chapter.number || ""}: ${chapter.title}. A guide for non-technical people.`,
  };
}

export default async function ChapterRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter || slug === "00-introduction") {
    notFound();
  }

  const chapters = getAllChapters();
  const { prev, next } = getAdjacentChapters(slug);

  const sidebarData = chapters.map((c) => ({
    slug: c.slug,
    number: c.number,
    shortTitle: c.shortTitle,
    sections: c.sections,
  }));

  const searchData = chapters.map((c) => ({
    slug: c.slug,
    title: c.shortTitle,
    content: c.content,
  }));

  return (
    <GuideLayout chapters={sidebarData} searchData={searchData}>
      <ChapterPage
        slug={chapter.slug}
        content={chapter.content}
        prev={
          prev
            ? { slug: prev.slug, number: prev.number, shortTitle: prev.shortTitle }
            : null
        }
        next={
          next
            ? { slug: next.slug, number: next.number, shortTitle: next.shortTitle }
            : null
        }
      />
    </GuideLayout>
  );
}
