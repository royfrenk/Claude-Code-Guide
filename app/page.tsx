import { getAllChapters, getChapterContent, getAdjacentChapters } from "@/lib/chapters";
import { GuideLayout } from "@/components/guide-layout";
import { ChapterPage } from "@/components/chapter-page";

export default function HomePage() {
  const chapters = getAllChapters();
  const introChapter = chapters.find((c) => c.slug === "00-introduction");
  const { prev, next } = getAdjacentChapters("00-introduction");

  if (!introChapter) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading guide...</p>
      </div>
    );
  }

  const content = getChapterContent("00-introduction");

  return (
    <GuideLayout chapters={chapters} currentSlug="00-introduction">
      <ChapterPage
        title={introChapter.title}
        content={content}
        prev={prev}
        next={next}
      />
    </GuideLayout>
  );
}
