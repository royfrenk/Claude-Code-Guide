"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BookOpen, X } from "lucide-react";
import { useEffect, useState } from "react";

interface SidebarChapter {
  slug: string;
  number: number | null;
  shortTitle: string;
  sections: { id: string; title: string }[];
}

interface SidebarProps {
  chapters: SidebarChapter[];
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ chapters, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [readChapters, setReadChapters] = useState<Record<string, number>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem("guide-progress");
      if (stored) setReadChapters(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  // Listen for progress updates from the content area
  useEffect(() => {
    const handler = () => {
      try {
        const stored = localStorage.getItem("guide-progress");
        if (stored) setReadChapters(JSON.parse(stored));
      } catch {
        // ignore
      }
    };
    window.addEventListener("progress-updated", handler);
    return () => window.removeEventListener("progress-updated", handler);
  }, []);

  const currentSlug = pathname.slice(1);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-full w-[280px] flex-col border-r border-border bg-sidebar",
          "transition-transform duration-200 ease-in-out",
          "lg:translate-x-0 lg:transition-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border px-5 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <BookOpen className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold text-sidebar-foreground leading-tight">
              Working With AI Agents
            </h1>
            <p className="text-xs text-sidebar-muted mt-0.5">
              A Guide for Non-Technical People
            </p>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden rounded-md p-1 text-sidebar-muted hover:text-sidebar-foreground hover:bg-border/50 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 overflow-y-auto py-3 px-3"
          aria-label="Guide chapters"
        >
          <ul className="space-y-0.5">
            {chapters.map((chapter, index) => {
              const href = `/${chapter.slug}`;
              const isActive = currentSlug === chapter.slug;
              const progress = readChapters[chapter.slug] || 0;

              // Section headers for the three parts
              const sectionLabel =
                chapter.number === 1
                  ? "Part A: Understanding Agents"
                  : chapter.number === 6
                    ? "Part B: Non-Technical Uses"
                    : chapter.number === 7
                      ? "Part C: Building Software"
                      : null;

              return (
                <li key={chapter.slug}>
                  {sectionLabel && (
                    <div
                      className={cn(
                        "px-3 pt-4 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-sidebar-muted",
                        chapter.number === 1 && index > 0 && "pt-4"
                      )}
                    >
                      {sectionLabel}
                    </div>
                  )}
                  <Link
                    href={href}
                    onClick={onClose}
                    className={cn(
                      "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-150",
                      isActive
                        ? "bg-accent-muted text-accent font-medium border-l-2 border-accent -ml-px"
                        : "text-sidebar-foreground hover:bg-border/40"
                    )}
                  >
                    {/* Progress indicator */}
                    <span className="flex-shrink-0">
                      {progress >= 90 ? (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green text-accent-foreground">
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                      ) : progress > 0 ? (
                        <span className="relative flex h-5 w-5 items-center justify-center">
                          <svg className="h-5 w-5 -rotate-90" viewBox="0 0 20 20">
                            <circle
                              cx="10"
                              cy="10"
                              r="8"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="text-border"
                            />
                            <circle
                              cx="10"
                              cy="10"
                              r="8"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeDasharray={`${(progress / 100) * 50.27} 50.27`}
                              className="text-accent"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span className="flex h-5 w-5 items-center justify-center">
                          <span className="h-2 w-2 rounded-full border-2 border-border" />
                        </span>
                      )}
                    </span>

                    <span className="flex-1 min-w-0">
                      {chapter.number !== null ? (
                        <span>
                          <span className="text-sidebar-muted font-normal">
                            {chapter.number}.
                          </span>{" "}
                          {chapter.shortTitle}
                        </span>
                      ) : (
                        chapter.shortTitle
                      )}
                    </span>
                  </Link>

                  {/* Section sub-links */}
                  {isActive && chapter.sections.length > 0 && (
                    <ul className="ml-11 mt-1 space-y-0.5 border-l border-border pl-3">
                      {chapter.sections.map((section) => (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            onClick={onClose}
                            className="block py-1 text-xs text-sidebar-muted hover:text-accent transition-colors leading-snug"
                          >
                            {section.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Overall Progress */}
        <OverallProgress chapters={chapters} readChapters={readChapters} />
      </aside>
    </>
  );
}

function OverallProgress({
  chapters,
  readChapters,
}: {
  chapters: SidebarChapter[];
  readChapters: Record<string, number>;
}) {
  const completed = chapters.filter(
    (c) => (readChapters[c.slug] || 0) >= 90
  ).length;
  const total = chapters.length;

  if (completed === 0) return null;

  return (
    <div className="border-t border-border px-5 py-4">
      <div className="flex items-center justify-between text-xs text-sidebar-muted mb-2">
        <span>Progress</span>
        <span>
          {completed} of {total} chapters
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-border overflow-hidden">
        <div
          className="h-full rounded-full bg-green transition-all duration-500 ease-out"
          style={{ width: `${(completed / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
