# Project State

> Updated after each deployment.
> Last updated: 2026-02-21

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 15.3.6 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Markdown | react-markdown + remark-gfm + rehype-raw + rehype-slug |
| Icons | lucide-react |
| Hosting | Vercel |

## File Structure

```
project/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout (metadata, fonts)
│   ├── globals.css           # Tailwind + CSS variables
│   ├── not-found.tsx         # 404 page
│   └── [slug]/
│       └── page.tsx          # Chapter pages (dynamic route)
├── components/
│   ├── guide-layout.tsx      # Layout wrapper (sidebar, search, keyboard nav)
│   ├── sidebar.tsx           # Chapter list + reading progress
│   ├── top-bar.tsx           # Mobile nav header
│   ├── chapter-page.tsx      # Chapter content wrapper (TTS, progress, nav)
│   ├── chapter-nav.tsx       # Previous/next chapter navigation
│   ├── markdown-renderer.tsx # ReactMarkdown with custom component map
│   ├── reading-progress.tsx  # Scroll-based progress tracking (localStorage)
│   ├── search-modal.tsx      # Full-text search across chapters
│   └── tts-controls.tsx      # Text-to-speech (Web Speech API)
├── lib/
│   ├── chapters.ts           # Content loading from src/*.md
│   ├── extract-plain-text.ts # Markdown → plain text for TTS
│   └── utils.ts              # cn() utility (clsx + tailwind-merge)
├── src/
│   ├── 00-introduction.md    # Chapter 0: Introduction
│   ├── 01-what-ai-agents-are.md
│   ├── 02-memory-and-context.md
│   ├── 03-tools-of-the-trade.md
│   ├── 04-setting-up.md
│   ├── 05-configuring-your-agent.md
│   ├── 06-your-first-project.md
│   ├── 07-working-with-files-and-code.md
│   ├── 08-servers-hosting-deployment.md
│   ├── 09-glossary.md
│   └── diagrams/             # Source SVG/PNG/JPG diagrams
├── public/
│   └── diagrams/             # Served diagram files (copied from src/diagrams)
├── docs/
│   ├── PROJECT_STATE.md      # This file
│   ├── roadmap.md            # Task index
│   ├── technical-specs/      # Spec files per issue
│   ├── sprints/              # Sprint iteration tracking
│   └── evals/                # Quality evaluation criteria
└── CLAUDE.md                 # Agent entry point
```

## Content Architecture

- **9 chapters + glossary** in `src/*.md`, numbered 00–09
- Markdown files are loaded at build time via `lib/chapters.ts` using `fs.readFileSync`
- Dynamic route `app/[slug]/page.tsx` renders each chapter
- Images referenced as `diagrams/filename.ext` in markdown, rewritten to `/diagrams/filename.ext` by the renderer
- Source-of-truth diagrams live in `src/diagrams/`, served from `public/diagrams/`

## Key Patterns

- **Static generation:** All pages are statically generated via `generateStaticParams()`
- **Reading progress:** Scroll position tracked per chapter in localStorage (`guide-progress` key)
- **Keyboard navigation:** Left/right arrows navigate between chapters
- **Search:** Client-side full-text search across all chapter content
- **TTS:** Browser-native Web Speech API, no external dependencies

## Recent Changes

| Date | Change | Commit |
|------|--------|--------|
| 2026-02-21 | Remove PDF download buttons from landing page | fb6b7ec |
| 2026-02-21 | Add text-to-speech read aloud feature | fbf32a6 |
| 2026-02-21 | Fix broken SVG diagrams, remove learning curve section | 09ff283 |
| 2026-02-20 | Redesign landing page, update sidebar navigation | 3a4a399 |
| 2026-02-20 | Add Next.js web app for guide content | 9b32b41 |
