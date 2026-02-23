import Link from "next/link";
import { getAllChapters } from "@/lib/chapters";
import {
  BookOpen,
  ArrowRight,
  Brain,
  Terminal,
  Rocket,
  Settings,
  Workflow,
  Wrench,
  Code,
  Cog,
  FolderGit2,
  Globe,
  PenTool,
  Linkedin,
  Github,
} from "lucide-react";

const chapterIcons: Record<number, React.ReactNode> = {
  1: <Brain className="h-5 w-5" />,
  2: <BookOpen className="h-5 w-5" />,
  3: <Terminal className="h-5 w-5" />,
  4: <Rocket className="h-5 w-5" />,
  5: <Settings className="h-5 w-5" />,
  6: <Workflow className="h-5 w-5" />,
  7: <Wrench className="h-5 w-5" />,
  8: <PenTool className="h-5 w-5" />,
  9: <Code className="h-5 w-5" />,
  10: <Cog className="h-5 w-5" />,
  11: <FolderGit2 className="h-5 w-5" />,
  12: <Globe className="h-5 w-5" />,
};

export default function LandingPage() {
  const chapters = getAllChapters();
  const numbered = chapters.filter((c) => c.number !== null);

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <header className="fixed top-0 left-0 right-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <BookOpen className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold text-foreground">
              AI Agents Guide
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/00-introduction"
              className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Start Reading
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-24 left-1/2 -translate-x-1/2 h-[480px] w-[480px] rounded-full bg-accent/5 blur-3xl" />
        </div>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5 text-accent" />
            Free online guide &middot; 12 chapters
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Working With{" "}
            <span className="text-accent">AI Agents</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            A practical guide for non-technical people who want to understand
            and use AI coding agents to build real things.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/00-introduction"
              className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground shadow-sm transition-opacity hover:opacity-90 sm:w-auto"
            >
              Start Reading
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What you'll learn */}
      <section className="border-t border-border bg-muted/50 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              What you{"'"}ll learn
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              No coding background required. Go from zero understanding to
              confidently directing an AI agent through a real project.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {numbered.map((chapter) => (
              <Link
                key={chapter.slug}
                href={`/${chapter.slug}`}
                className="group relative rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/30 hover:shadow-sm"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  {chapterIcons[chapter.number ?? 0] ?? (
                    <BookOpen className="h-5 w-5" />
                  )}
                </div>
                <span className="text-xs font-medium text-accent">
                  Chapter {chapter.number}
                </span>
                <h3 className="mt-1 text-sm font-semibold text-card-foreground leading-snug">
                  {chapter.shortTitle}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {getChapterDescription(chapter.number)}
                </p>
                <ArrowRight className="absolute right-4 bottom-5 h-3.5 w-3.5 text-border transition-colors group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/50 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Ready to get started?
          </h2>
          <p className="mt-3 text-muted-foreground">
            The guide is free, takes about an hour to read, and will change
            how you think about building with AI.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/00-introduction"
              className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground shadow-sm transition-opacity hover:opacity-90 sm:w-auto"
            >
              Start the Guide
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="border-t border-border py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            About the author
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Written by Roy Frenkel. I built this guide after months of working
            with AI agents on real projects — hitting walls, learning what
            works, and wishing someone had organized the answers for me.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/royfrenk/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href="https://github.com/royfrenk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-5xl px-6 text-center text-xs text-muted-foreground">
          Working With AI Agents: A Guide for Non-Technical People
        </div>
      </footer>
    </div>
  );
}

function getChapterDescription(num: number | null): string {
  const descriptions: Record<number, string> = {
    1: "What AI agents are, how to direct them, and what engines power them.",
    2: "Context windows, what gets lost between sessions, and external memory layers.",
    3: "Three ways to work with AI: chat, platform, or agent-assisted tools.",
    4: "Installing Claude Code, configuring VS Code, and running your first command.",
    5: "Instruction files, rules, memory, custom agents, and MCP servers.",
    6: "The recommended process for agent work — from input to review to improvement.",
    7: "Step-by-step: building skills, commands, and a complete agent workflow.",
    8: "The craft of writing instruction files that actually work.",
    9: "The same process at scale — multiple agents building a software feature.",
    10: "A real software system broken down: agents, commands, rules, and project structure.",
    11: "Saving your work, going back to previous versions, and backing up online.",
    12: "Where your project lives and how people access it after you build it.",
  };
  return descriptions[num ?? 0] ?? "";
}
