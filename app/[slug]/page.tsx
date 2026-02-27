import { notFound } from "next/navigation";
import {
  getAllChapters,
  getChapterContent,
  getChapterBySlug,
  getAdjacentChapters,
  getSearchData,
} from "@/lib/chapters";
import { GuideLayout } from "@/components/guide-layout";
import { ChapterPage } from "@/components/chapter-page";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const chapters = getAllChapters();
  return chapters.map((chapter) => ({
    slug: chapter.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    return { title: "Chapter Not Found" };
  }

  const description =
    chapter.description ||
    `${chapter.title} - A Guide for Non-Technical People`;

  return {
    title: `${chapter.title} | Working With AI Agents`,
    description,
    openGraph: {
      title: `${chapter.title} | Working With AI Agents`,
      description,
      type: "article",
    },
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
  const searchData = getSearchData();

  return (
    <GuideLayout chapters={chapters} searchData={searchData}>
      <ChapterPage
        slug={slug}
        content={content}
        prev={prev}
        next={next}
      />
    </GuideLayout>
  );
}
