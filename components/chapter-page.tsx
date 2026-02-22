"use client";

import { MarkdownRenderer } from "./markdown-renderer";
import { ChapterNav } from "./chapter-nav";
import { ReadingProgress } from "./reading-progress";
import { TtsControls } from "./tts-controls";
import { extractPlainText } from "@/lib/extract-plain-text";
import { useEffect, useMemo } from "react";

interface ChapterLink {
  slug: string;
  number: number | null;
  shortTitle: string;
}

interface ChapterPageProps {
  slug: string;
  content: string;
  prev: ChapterLink | null;
  next: ChapterLink | null;
}

export function ChapterPage({ slug, content, prev, next }: ChapterPageProps) {
  const plainText = useMemo(() => extractPlainText(content), [content]);

  // Handle keyboard navigation: left/right arrows
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't intercept when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      if (e.key === "ArrowLeft" && prev) {
        const href =
          prev.slug === "00-introduction" ? "/" : `/${prev.slug}`;
        window.location.href = href;
      } else if (e.key === "ArrowRight" && next) {
        const href =
          next.slug === "00-introduction" ? "/" : `/${next.slug}`;
        window.location.href = href;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  return (
    <article>
      <ReadingProgress slug={slug} />
      <TtsControls text={plainText} />
      <MarkdownRenderer content={content} />
      <ChapterNav prev={prev} next={next} />
    </article>
  );
}
