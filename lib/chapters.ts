import fs from "fs";
import path from "path";

export interface Chapter {
  slug: string;
  number: number | null;
  title: string;
  shortTitle: string;
  description: string;
  content: string;
  sections: { id: string; title: string }[];
}

const chapterFiles = [
  {
    file: "00-introduction.md",
    number: null,
    title: "Working With AI Agents: A Guide for Non-Technical People",
    shortTitle: "Introduction",
  },
  {
    file: "01-what-ai-agents-are.md",
    number: 1,
    title: "What AI Agents Are (and Aren't)",
    shortTitle: "What AI Agents Are (and Aren't)",
  },
  {
    file: "02-memory-and-context.md",
    number: 2,
    title: "Memory and Context",
    shortTitle: "Memory and Context",
  },
  {
    file: "03-tools-of-the-trade.md",
    number: 3,
    title: "Tools of the Trade",
    shortTitle: "Tools of the Trade",
  },
  {
    file: "04-setting-up.md",
    number: 4,
    title: "Setting Up",
    shortTitle: "Setting Up",
  },
  {
    file: "05-git-and-github.md",
    number: 5,
    title: "Git and GitHub",
    shortTitle: "Git and GitHub",
  },
  {
    file: "06-configuring-your-agent.md",
    number: 6,
    title: "Configuring Your Agent",
    shortTitle: "Configuring Your Agent",
  },
  {
    file: "07-how-it-all-comes-together.md",
    number: 7,
    title: "The Meta-Process",
    shortTitle: "The Meta-Process",
  },
  {
    file: "08-content-writing-example.md",
    number: 8,
    title: "Content Writing Example",
    shortTitle: "Content Writing Example",
  },
  {
    file: "09-writing-effective-instructions.md",
    number: 9,
    title: "Writing Effective Instructions",
    shortTitle: "Writing Effective Instructions",
  },
  {
    file: "10-openclaw.md",
    number: 10,
    title: "OpenClaw",
    shortTitle: "OpenClaw",
  },
  {
    file: "11-building-software.md",
    number: 11,
    title: "Building Software with Agents",
    shortTitle: "Building Software with Agents",
  },
  {
    file: "12-claude-built-in-capabilities.md",
    number: 12,
    title: "Claude Built-in Capabilities",
    shortTitle: "Claude Built-in Capabilities",
  },
  {
    file: "13-roys-claude-config.md",
    number: 13,
    title: "Roy's Claude Config",
    shortTitle: "Roy's Claude Config",
  },
  {
    file: "14-servers-hosting-deployment.md",
    number: 14,
    title: "Servers, Hosting, and Deployment",
    shortTitle: "Servers, Hosting, and Deployment",
  },
  {
    file: "15-glossary.md",
    number: null,
    title: "Glossary",
    shortTitle: "Glossary",
  },
];

function extractTldr(content: string): string {
  const match = content.match(/^> \*\*TL;DR:\*\*\s*(.+?)(?=\n\n)/m);
  if (!match) return "";
  return match[1]
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/\n> /g, " ")
    .trim();
}

function extractSections(content: string): { id: string; title: string }[] {
  const sections: { id: string; title: string }[] = [];
  const lines = content.split("\n");

  for (const line of lines) {
    const match = line.match(/^### (.+)$/);
    if (match) {
      const title = match[1].trim();
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      sections.push({ id, title });
    }
  }

  return sections;
}

function getSlug(file: string): string {
  return file.replace(".md", "");
}

export function getAllChapters(): Chapter[] {
  const srcDir = path.join(process.cwd(), "src");

  return chapterFiles.map(({ file, number, title, shortTitle }) => {
    const filePath = path.join(srcDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const sections = extractSections(content);

    return {
      slug: getSlug(file),
      number,
      title,
      shortTitle,
      description: extractTldr(content),
      content,
      sections,
    };
  });
}

export function getChapterBySlug(slug: string): Chapter | undefined {
  const chapters = getAllChapters();
  return chapters.find((c) => c.slug === slug);
}

export function getChapterContent(slug: string): string {
  const chapter = getChapterBySlug(slug);
  return chapter?.content ?? "";
}

export function getSearchData(): { slug: string; title: string; content: string }[] {
  return getAllChapters().map((c) => ({
    slug: c.slug,
    title: c.title,
    content: c.content,
  }));
}

export function getChapterSlugs(): string[] {
  return chapterFiles.map(({ file }) => getSlug(file));
}

export function getAdjacentChapters(slug: string): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getAllChapters();
  const index = chapters.findIndex((c) => c.slug === slug);

  return {
    prev: index > 0 ? chapters[index - 1] : null,
    next: index < chapters.length - 1 ? chapters[index + 1] : null,
  };
}
