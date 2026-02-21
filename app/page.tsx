import { getAllChapters, getAdjacentChapters } from "@/lib/chapters";
import { GuideLayout } from "@/components/guide-layout";
import { ChapterPage } from "@/components/chapter-page";

export default function HomePage() {
  const chapters = getAllChapters();
  const introChapter = chapters.find((c) => c.slug === "00-introduction");
  const { prev, next } = getAdjacentChapters("00-introduction");

  if (!introChapter) {
    return <div>Chapter not found</div>;
  }

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
        slug={introChapter.slug}
        content={introChapter.content}
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
