# Edit 001: Add "More Reading" Sections to All Chapters

**Date:** 2026-02-25
**Target:** All chapter files in src/*.md (16 chapters)
**Status:** Complete

---

## 1. Brief

Review every chapter and add a "More Reading" section at the bottom of each. Find interesting articles that expand on the concepts detailed in each chapter. The sections should contain curated links to external articles, blog posts, and resources that help readers go deeper on the topics covered.

**Scope:** Add new "More Reading" section to all 16 chapters.

---

## 2. Research

Web search research conducted across 14 search queries covering all chapter topics. Sources prioritized: official documentation (Anthropic, OpenAI, Microsoft), reputable tech publications (MIT Technology Review, Fortune, Pragmatic Engineer), developer blogs from recognized engineers (Addy Osmani, Simon Willison), and community resources (freeCodeCamp, DEV Community, GitHub repos).

Key source categories:
- **Official docs:** Anthropic (Claude Code best practices, skills guide, agent patterns), OpenAI (agent building guide), Microsoft (agent orchestration patterns)
- **Expert blogs:** Simon Willison (agentic loops, lethal trifecta), Addy Osmani (LLM coding workflow, spec writing), Pragmatic Engineer (vibe coding)
- **Security analysis:** Fortune, Cisco, Gen Digital on OpenClaw risks
- **Tool comparisons:** DEV Community, HumAI, MIT Technology Review
- **Beginner resources:** GitHub Blog, freeCodeCamp, Unito, IBM

---

## 3. Changes

**Files modified:** All 16 chapter files in `src/`

**What changed:**
- Each chapter received a new `### More reading` section appended after the existing content
- Sections are preceded by a horizontal rule (`---`) for visual separation
- Each entry follows the format: `[Title (Source)](URL) — One-sentence description`
- 3-4 curated articles per chapter, chosen to expand on that chapter's specific topics
- Articles are relevant to the guide's non-technical audience where possible
- Mix of official documentation, expert analysis, and practical guides

**Article counts per chapter:**
| Chapter | Articles | Focus |
|---------|----------|-------|
| Ch 0: Introduction | 3 | General AI agent guides from IBM, OpenAI, Anthropic |
| Ch 1: What AI Agents Are | 4 | Agentic loops, autonomous agents, vibe coding distinction, beginner course |
| Ch 2: Memory and Context | 4 | Context windows, LLM memory types, performance degradation, infinite context |
| Ch 3: Tools of the Trade | 3 | Tool comparisons (Cursor/Windsurf/Claude Code), AI coding landscape |
| Ch 4: Setting Up | 3 | Official quickstart, beginner tutorials, non-developer setup guide |
| Ch 5: Git and GitHub | 3 | GitHub's own beginner guide, non-developer GitHub guide, freeCodeCamp tutorial |
| Ch 6: Configuring Your Agent | 4 | Official best practices, skills guide, real-world config, MCP setup |
| Ch 7: The Meta-Process | 3 | Anthropic agent patterns, multi-agent system, Microsoft orchestration patterns |
| Ch 8: Content Writing Example | 3 | CrewAI blog writing, n8n brand voice automation, skills guide |
| Ch 9: Writing Effective Instructions | 4 | Agent prompt engineering, 11 techniques, spec writing, long-running agents |
| Ch 10: Personal AI Agents | 4 | OpenClaw security coverage, lethal trifecta, Cisco risk analysis, safety guide |
| Ch 11: Building Software | 4 | LLM coding workflow, vibe coding, agentic coding trends, agent building guide |
| Ch 12: Claude Built-in Capabilities | 3 | Official slash commands docs, usage tips, CLI cheatsheet |
| Ch 13: Roy's Claude Config | 4 | Complete system guide, awesome-claude-code, sub-agent templates, agentic loops |
| Ch 14: Servers and Deployment | 3 | Hosting platform comparison, static hosting guide, CDN deployment mechanics |
| Ch 15: Glossary | 2 | IBM prompt engineering guide, promptingguide.ai reference |

**Total:** 54 curated article links across 16 chapters.

**Intentional duplicates (3):**
- Anthropic "Building Effective Agents" appears in Ch 0 (intro overview) and Ch 7 (where the pattern is taught)
- OpenAI "Practical Guide to Building Agents" appears in Ch 0 (intro overview) and Ch 11 (software development context)
- Anthropic "Skills Guide" appears in Ch 6 (configuration) and Ch 8 (content writing example)
These are intentional — each chapter needs to be self-sufficient for readers who skip around.

---

## 4. Review

**Coherence:** PASS — Each section's articles directly relate to the chapter's content.
**Repetition:** PASS — Three intentional duplicates noted above, all justified by different chapter contexts.
**Cohesion:** PASS — Consistent formatting across all 16 chapters. Link descriptions follow Roy's voice (pithy, practical).
**Clarity:** PASS — Article descriptions are one-sentence summaries that tell the reader what they'll get.
**Structure:** PASS — Horizontal rule + `### More reading` + bullet list. Placed after Practical tips (or after content for intro/glossary).

**Build status:** PASS — `npm run build` completes successfully.

---

## 5. Summary

**Iterations:** 1 (research -> write -> review)
**Files changed:** 16 (all chapter files in src/)
**Key changes:**
- Added "More Reading" section to every chapter
- 54 total curated links to external articles, blog posts, and official documentation
- Sources span official docs (Anthropic, OpenAI, Microsoft), expert blogs (Willison, Osmani), security analysis (Fortune, Cisco), and beginner resources (freeCodeCamp, GitHub Blog)
- Consistent formatting and placement across all chapters

**Final review status:** Pass
