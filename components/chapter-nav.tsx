"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ChapterLink {
  slug: string;
  number: number | null;
  shortTitle: string;
}

interface ChapterNavProps {
  prev: ChapterLink | null;
  next: ChapterLink | null;
}

export function ChapterNav({ prev, next }: ChapterNavProps) {
  return (
    <nav className="mt-16 flex items-stretch gap-4 border-t border-border pt-8">
      {prev ? (
        <Link
          href={prev.slug === "00-introduction" ? "/" : `/${prev.slug}`}
          className="group flex flex-1 flex-col rounded-lg border border-border px-5 py-4 transition-all hover:border-accent/40 hover:bg-accent-muted"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
            <ChevronLeft className="h-3 w-3" />
            Previous
          </span>
          <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
            {prev.number !== null && `${prev.number}. `}
            {prev.shortTitle}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={next.slug === "00-introduction" ? "/" : `/${next.slug}`}
          className="group flex flex-1 flex-col items-end rounded-lg border border-border px-5 py-4 transition-all hover:border-accent/40 hover:bg-accent-muted"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
            Next
            <ChevronRight className="h-3 w-3" />
          </span>
          <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
            {next.number !== null && `${next.number}. `}
            {next.shortTitle}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
