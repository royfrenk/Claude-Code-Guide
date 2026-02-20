# Guide Styling Reference

Visual styling conventions for the PDF guide. This documents the CSS and structural patterns used when generating the PDF from markdown sources.

## PDF Generation Pipeline

1. **Pandoc** converts markdown to HTML:
   ```
   pandoc --standalone --embed-resources --section-divs \
     --resource-path=./src \
     --from=markdown --to=html5 \
     -o /tmp/guide-styled.html \
     src/00-introduction.md src/01-*.md src/02-*.md ... src/09-glossary.md
   ```
   The `--section-divs` flag wraps each heading's content in a `<section id="heading-slug">` element, which enables CSS targeting of specific sections (like practical tips).

2. **CSS injection** — custom styles are added to the HTML `<style>` block after pandoc generates it.

3. **Chrome headless** converts HTML to PDF:
   ```
   chrome --headless=new --disable-gpu --no-pdf-header-footer \
     --print-to-pdf=guide.pdf /tmp/guide-styled.html
   ```
   The `--no-pdf-header-footer` flag removes the default browser chrome (date, title, URL, page numbers).

## Page Layout

| Property | Value |
|----------|-------|
| Body font size (print) | 11pt |
| Body max-width (print) | none (full page) |
| Body padding | 50px all sides |
| Text color | #1a1a1a |
| Background (print) | white |

## Headers

| Level | Usage | Page break |
|-------|-------|------------|
| `##` (h2) | Chapter titles | `page-break-before: always` — each chapter starts on a new page |
| `###` (h3) | Section headings | `page-break-after: avoid` — keeps heading with following content |
| `####` (h4) | Sub-sections | `page-break-after: avoid` |

Orphan/widow control: `p, h2, h3 { orphans: 3; widows: 3; }` prevents isolated lines at page tops/bottoms.

## Blockquotes — TL;DR (Blue)

Used for chapter TL;DRs and general callouts.

| Property | Value |
|----------|-------|
| Border-left | 4px solid #4a86c8 |
| Background | #f0f4fa |
| Padding | 1em 1.2em |
| Border-radius | 4px |
| Text color | #1a1a1a |
| Page break | `page-break-inside: avoid` |

Headings inside blockquotes get `page-break-before: avoid` and reduced font sizes (h2/h3: 1.3em, h1: 1.5em) to prevent a blockquote from being split across pages by internal heading page-break rules.

## Blockquotes — Practical Tips (Green)

Used inside `### Practical tips` sections at the end of each chapter. Targeted via the CSS selector `section[id^="practical-tips"] blockquote` (requires pandoc `--section-divs`).

| Property | Value |
|----------|-------|
| Border-left | 4px solid #16a34a |
| Background | #f0fdf4 |

All other properties (padding, radius, text color, page-break) inherit from the base blockquote style.

## Tables

| Property | Value |
|----------|-------|
| Width | 100% |
| Border-collapse | collapse |
| Header border | 1px solid #1a1a1a (top) |
| Body borders | 1px solid #1a1a1a (top and bottom) |
| Cell padding (th) | 0.25em 0.5em |
| Cell padding (td) | 0.125em 0.5em |
| Zebra striping | `tr:nth-child(even) { background-color: #f0f0f0 }` |
| Page break | `page-break-inside: avoid` |

## Code Blocks

| Property | Value |
|----------|-------|
| Font family | Menlo, Monaco, Consolas, 'Lucida Console', monospace |
| Font size | 85% |
| Page break | `page-break-inside: avoid` (via `pre`) |

## Images

| Property | Value |
|----------|-------|
| Max width | 100% |
| Page break | `page-break-inside: avoid` |

Images are stored in `src/diagrams/` and referenced from markdown as `![alt](diagrams/filename.ext)`. Pandoc's `--resource-path=./src` resolves these paths. The `--embed-resources` flag base64-encodes images into the HTML.

## Horizontal Rules

Used to visually separate the "Practical tips" section from the chapter body.

| Property | Value |
|----------|-------|
| Border | none, 1px solid #1a1a1a top |
| Margin | 1em 0 |

## Chapter Structure Pattern

Every chapter follows this structure in markdown:

```markdown
## Chapter N: Title

> **TL;DR:** Summary in 2-3 sentences...

### Section heading
Content...

### Another section
Content...

---

### Practical tips

> **Tip title.** Tip content...

> **Another tip.** More content...
```

- The `## Chapter` heading triggers a page break
- The TL;DR blockquote renders with blue styling
- The `---` horizontal rule separates main content from tips
- The `### Practical tips` heading creates a `<section id="practical-tips-N">` (via `--section-divs`)
- Blockquotes inside that section render with green styling
