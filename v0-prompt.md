# v0 Prompt: Working With AI Agents Guide Website

Build a Next.js documentation website for a guide called "Working With AI Agents: A Guide for Non-Technical People." The content comes from markdown files stored in `/src/` — the app reads and renders them directly. The design should feel like a premium online book: editorial, clean, and polished.

Reference site for quality level: https://studymate.live/en/

## Content Structure

The guide has 8 chapters, an introduction, and a glossary. Each markdown file follows this naming convention:

```
src/00-introduction.md
src/01-what-ai-agents-are.md
src/02-memory-and-context.md
src/03-tools-of-the-trade.md
src/04-setting-up.md
src/05-configuring-your-agent.md
src/06-your-first-project.md
src/07-working-with-files-and-code.md
src/08-servers-hosting-deployment.md
src/09-glossary.md
```

Each chapter has:
- A `## Chapter N: Title` heading
- A TL;DR blockquote at the top: `> **TL;DR:** summary text...`
- Sections (`###`) and sub-sections (`####`)
- Tables (comparison tables, feature tables)
- Code blocks (terminal commands, markdown examples, config files)
- Images referenced as `![alt](diagrams/filename.ext)` — SVGs, PNGs, and JPGs stored in `src/diagrams/`
- A `### Practical tips` section at the end, separated by a horizontal rule (`---`), where each tip is a blockquote with a bold lead: `> **Tip title.** Advice text...`

The glossary (chapter 09) is an alphabetical list of term definitions with bold terms.

## Layout

### Fixed Sidebar (Left)
- Guide title at top: "Working With AI Agents"
- Subtitle: "A Guide for Non-Technical People"
- Chapter list as nav links. Each shows the chapter number and short title (e.g., "1. What AI Agents Are"). The introduction shows as "Introduction" without a number. The glossary shows as "Glossary" at the bottom.
- Active chapter highlighted with a left border accent and background tint
- When a chapter is expanded/active, show its `###` sections as indented sub-links beneath it for in-page anchor navigation
- Reading progress indicator per chapter — a small checkmark or filled circle for completed chapters, empty circle for unread, half-filled or progress ring for the current chapter based on scroll position
- Sidebar is scrollable independently if the chapter list is long
- Sidebar collapses to a hamburger menu on mobile (slide-out drawer)
- Width: ~280px on desktop

### Top Bar
- Search icon/bar on the right — full-text search across all chapters. Shows results as a dropdown with chapter name, section, and a snippet of matching text. Clicking a result navigates to that chapter and scrolls to the match.
- PDF download button (icon + "Download PDF" label) — downloads the pre-built `guide.pdf`
- On mobile: hamburger menu button on the left, search icon on the right

### Content Area (Right)
- Max-width ~720px, centered in the remaining space with generous padding
- Chapter title rendered as a large heading
- Comfortable reading typography: ~18px body text, 1.7 line height, serif or clean sans-serif font (Inter or similar)
- Generous spacing between sections

## Markdown Rendering

Use a markdown renderer (react-markdown, next-mdx-remote, or similar) with these customizations:

### TL;DR Blockquotes
The first blockquote in each chapter (starting with `**TL;DR:**`) gets special styling:
- Light blue background (#f0f4fa)
- Blue left border (4px solid #4a86c8)
- Slightly larger text
- Rounded corners (6px)
- Padding: 1.25rem 1.5rem

### Practical Tips Blockquotes
Blockquotes inside the "Practical tips" section get different styling:
- Light green background (#f0fdf4)
- Green left border (4px solid #16a34a)
- Same rounded corners and padding as TL;DR
- Each tip starts with a bold title followed by a period

### Regular Blockquotes
Any other blockquotes use the blue TL;DR style (these are rare — mostly in Chapter 2 showing a markdown rendering example).

### Tables
- Full width within the content column
- Clean borders (light grey #e5e7eb)
- Header row with slightly darker background (#f9fafb) and bold text
- Zebra-striped body rows: alternating white and light grey (#f5f5f5)
- Horizontal scroll on mobile if the table overflows
- Rounded corners on the table container

### Code Blocks
- Syntax-highlighted (use a light theme — e.g., One Light or GitHub Light)
- Rounded corners, subtle border
- Light grey background (#f8f9fa)
- Copy button on hover (top-right corner)
- Language label if detectable

### Images
- Centered, max-width 100% of content area
- Subtle rounded corners (4px)
- Optional: light shadow or border
- SVG diagrams should render at a comfortable size (not too small)
- JPG images (movie stills) should have a caption rendered from the alt text

### Headings
- `##` — Large, bold, with generous top margin. These are chapter titles (only one per page).
- `###` — Section headings. Clear visual hierarchy below `##`. Each gets an `id` for anchor linking from the sidebar.
- `####` — Sub-section headings. Smaller but still distinct.

### Horizontal Rules
- Used to separate the "Practical tips" section from the main content
- Render as a subtle divider line with extra vertical spacing

## Features

### 1. Reading Progress
- Track which chapters the user has read using localStorage
- A chapter is "complete" when the user scrolls past 90% of it
- Show progress in the sidebar: empty circle (unread), progress ring (in progress), green checkmark (complete)
- Optional: a small progress bar at the very top of the page showing overall guide completion (e.g., "5 of 8 chapters")

### 2. Search
- Full-text search across all chapter content
- Triggered by clicking the search icon or pressing Cmd+K / Ctrl+K
- Opens a modal/overlay with a search input
- Results show: chapter name, section heading, and a text snippet with the match highlighted
- Clicking a result closes search, navigates to the chapter, and scrolls to the matching section
- Debounced input (300ms)

### 3. PDF Download
- A button in the top bar that downloads `guide.pdf` from the public directory
- Icon: download arrow or document icon
- Label: "Download PDF" (hidden on mobile, just icon)

### 4. Smooth Navigation
- Clicking a chapter in the sidebar loads that chapter's content (either via routing or client-side swap)
- Clicking a section sub-link in the sidebar smooth-scrolls to that section anchor
- Previous/Next chapter navigation at the bottom of each chapter's content
- Keyboard navigation: left/right arrows for prev/next chapter

## Design Details

### Color Palette
- Background: white (#ffffff)
- Sidebar background: very light grey (#fafafa) with a subtle right border (#e5e7eb)
- Text: near-black (#1a1a1a) for body, (#6b7280) for secondary text
- Accent blue: #4a86c8 (links, active states, TL;DR blockquotes)
- Accent green: #16a34a (practical tips, completion checkmarks)
- Hover states: subtle background shifts, smooth transitions (150ms)

### Typography
- Body: Inter, system-ui, or similar clean sans-serif. 18px, line-height 1.7
- Headings: Same family, bold weight. Chapter titles ~32px, sections ~24px, sub-sections ~20px
- Code: JetBrains Mono, Fira Code, or monospace. 14px
- Sidebar: 14px for chapter links, 13px for section sub-links

### Animations & Polish
- Sidebar active state transitions (background color, left border) — 150ms ease
- Content area fade-in on chapter change — subtle, 200ms
- Search modal backdrop blur
- Scroll progress updates smoothly (not jumpy)
- Hover effects on sidebar links, buttons, and table rows
- Focus rings on interactive elements for accessibility

### Responsive Behavior
- Desktop (>1024px): Sidebar visible, content centered
- Tablet (768-1024px): Sidebar collapsible, content fills width
- Mobile (<768px): Sidebar as slide-out drawer, hamburger menu, full-width content, reduced padding, tables scroll horizontally

## Technical Notes

- Use Next.js App Router
- Load markdown files from the filesystem at build time (or use dynamic imports)
- Images are in `src/diagrams/` — copy to `public/diagrams/` or configure the build to resolve them
- The `guide.pdf` file goes in `public/` for direct download
- Use CSS modules or Tailwind for styling
- Accessible: proper heading hierarchy, ARIA labels on nav, keyboard navigable, sufficient color contrast
