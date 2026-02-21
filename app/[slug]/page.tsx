import { notFound } from "next/navigation";
import {
  getAllChapters,
  getChapterContent,
  getChapterBySlug,
  getAdjacentChapters,
} from "@/lib/chapters";
import { GuideLayout } from "@/components/guide-layout";
import { ChapterPage } from "@/components/chapter-page";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const chapters = getAllChapters();
  return chapters
    .filter((c) => c.slug !== "00-introduction")
    .map((chapter) => ({
      slug: chapter.slug,
    }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    return { title: "Chapter Not Found" };
  }

  return {
    title: `${chapter.title} | Working With AI Agents`,
    description: `${chapter.title} - A Guide for Non-Technical People`,
  };
}

export default async function ChapterRoute({ params }: PageProps) {
  const { slug } = await params;
  const chapters = getAllChapters();
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    notFound();
  }

  const content = getChapterContent(slug);
  const { prev, next } = getAdjacentChapters(slug);

  return (
    <GuideLayout chapters={chapters} currentSlug={slug}>
      <ChapterPage
        title={chapter.title}
        content={content}
        prev={prev}
        next={next}
      />
    </GuideLayout>
  );
}
