## Chapter 9: Writing Effective Instructions

> **TL;DR:** Skills, agents, and commands are just markdown files — but how you write them matters. This chapter covers the craft: conditional logic, sub-agent dispatching, orchestration, blocking gates, skill sizing, skill composition, and using files as external memory.

---

Chapters 5 through 7 introduced the building blocks and showed a working system. This chapter covers the craft of writing instruction files that actually work — the wording patterns, structural techniques, and sizing guidance that make the difference between instructions that produce useful output and instructions that produce generic mush.

### Conditional logic

Agents follow instructions literally. If your instruction says "research this topic," the agent will do something — but you can't predict what. If your instruction says "if there's a design spec, read it first; if not, proceed with the technical spec," the agent knows exactly which path to take.

The pattern is simple: **state the condition, then state what to do in each case.**

```markdown
Before implementing, check for a design spec:
- If `docs/design-specs/` contains a file for this feature:
  read it first and follow the component specs exactly.
- If no design spec exists:
  proceed with the technical spec only.
```

For decisions with more than two paths, use a table:

```markdown
Choose the research approach based on the topic:

| Topic type | Approach |
|-----------|----------|
| Flag with existing coverage | Focus on new angles only |
| Flag never covered before | Full research, all categories |
| Flag redesign or controversy | Prioritize the human story |
```

Two common mistakes:

**Too vague:** "Research the topic appropriately." The agent has no idea what "appropriately" means for your domain.

**Too rigid:** A ten-level nested decision tree. If the conditions are that complex, split them into separate skills or agents instead of cramming everything into one file.

The sweet spot is 2-4 conditions per decision point. If you need more, you need a different structure.

### Sub-agent dispatching

When your command file needs to launch another agent, be explicit about three things: **which agent**, **when to launch it**, and **what to pass it**.

```markdown
1. Spawn the researcher agent:
   - Trigger: always (first step in the workflow)
   - Context: pass the topic from $ARGUMENTS
   - Skills: use .claude/skills/blog-post.md for categories
   - Output: save findings to research-notes.md

2. Spawn the writer agent:
   - Trigger: after researcher completes
   - Context: read research-notes.md
   - Skills: use .claude/skills/voice.md for tone
   - Output: save draft to posts/
```

Compare that to the vague version: "Have an agent do the research, then have another agent write the post." The explicit version tells the orchestrator exactly what to do. The vague version forces it to guess.

**Conditional dispatching** adds a decision before launching:

```markdown
Check if this feature involves UI changes:
- If yes: spawn the design-planner agent first,
  then spawn the explorer agent.
- If no: spawn the explorer agent directly.
```

The key is naming agents explicitly. "Spawn the researcher" is clear. "Have something do the research" is not.

### Orchestration

Orchestration is how you wire multiple agents together. The command file is the recipe — it defines the order, the handoffs, and where you step in.

Three patterns cover most workflows:

**Sequential** — agents run one after another, each reading what the previous one produced:

```markdown
Steps:
1. Researcher gathers data → saves to research-notes.md
2. Writer reads research-notes.md → drafts post in posts/
3. Present draft for review.
```

**Conditional** — different agents run depending on the situation:

```markdown
Steps:
1. Check the feature type:
   - If UI work: spawn design-planner first
   - If backend only: skip to step 2
2. Explorer reads the codebase → creates spec file
3. Developer builds from the spec
```

**Parallel** — independent agents run at the same time:

```markdown
Steps:
1. In parallel:
   - Explorer A: research the frontend components
   - Explorer B: research the database schema
2. After both complete: planner reads both findings
```

The handoff point is the shared file. Agent A writes to `research-notes.md`, agent B reads from `research-notes.md`. The file is the contract between them — it doesn't matter how agent A produced the research, as long as agent B can read the result.

### Blocking gates

A gate is a point where the process stops and waits for your approval. Without gates, agents will barrel through the entire workflow — research, plan, build, deploy — without checking if they're on the right track.

Mark gates explicitly so the agent can't miss them:

```markdown
3. Present the plan to the user for approval.

   **GATE — Do not proceed until the user approves.**

   If the user requests changes, update the plan and
   present again. Only continue to step 4 after approval.
```

The formatting matters. A gate buried in a paragraph gets skipped. A gate on its own line, in bold, with explicit consequences, gets respected.

For critical operations, add a verification step:

```markdown
4. Update the sprint file with the completed tasks.

   **Verify:** Read back the sprint file to confirm the
   update appears. If it was NOT updated, stop and retry.
   Do not proceed to step 5 until verified.
```

Verification loops prevent silent failures — the agent does something, checks that it actually worked, and only continues if it did. Without them, an agent might "update" a file that didn't actually change and keep going as if everything's fine.

### Skill file sizing

A skill file that's three lines long doesn't give the agent enough context. A skill file that's fifty pages long buries the important parts in noise. How big should they be?

**The guideline:** A skill should be long enough to capture the specific patterns that matter, and short enough that every line earns its place.

In practice:

| Use case | Typical size | Example |
|----------|-------------|---------|
| Voice/tone | 1-3 pages | Writing style, sentence patterns, what to avoid |
| Research playbook | 1-2 pages | Categories to search for, quality standards |
| Design tokens | 3-5 pages | Colors, spacing, typography, component specs |
| Domain reference | 5-10 pages | Comprehensive domain knowledge for a specific field |

The voice skill from Chapter 8 was about a page — tone, sentence patterns, signature tools, what not to do. That's enough to make the output sound like the author instead of generic AI text.

If a skill file keeps growing past 5 pages, that's a signal to split it. A design system, for example, might split into a core skill (tokens and universal rules) plus context-specific skills (marketing pages, application screens, dashboards). The core loads every time; the specific one loads based on what you're building.

**The test:** If you removed a section from the skill, would the output noticeably degrade? If yes, keep it. If you're not sure, it's probably filler.

### Skill nesting and composition

Skills can reference other skills. This is how you build a system of reusable knowledge without duplicating content.

**The core + specific pattern:** One base skill contains the universal rules. Context-specific skills add to it.

```markdown
# In your command file:
Steps:
1. Load .claude/skills/design-core.md (always)
2. Load .claude/skills/design-marketing.md (for this task)
3. Build the landing page using both skills.
```

The core skill defines the design tokens — colors, spacing, typography. The marketing skill defines landing page patterns — hero sections, CTAs, social proof. The agent reads both and combines them.

**Reference chains:** A skill can point to other files for specific tasks:

```markdown
# In the researcher agent definition:
When researching, follow these guides:
- For research categories: read .claude/skills/blog-post.md
- For quality standards: read .claude/skills/research-standards.md
- For previous coverage: check archive.md
```

**Ownership markers** make clear who reads what:

```markdown
Key files:
- `docs/roadmap.md` — YOU read and update
- `docs/technical-specs/` — Explorer creates, Developer reads
- `docs/sprints/` — Developer updates, you review
```

This prevents agents from reading files they shouldn't modify, or ignoring files they need. Explicit ownership is especially important when multiple agents share a project.

**When to split vs combine:** If two skills are always loaded together, they might be one skill. If a skill is loaded by some agents but not others, it should be separate. The goal is reusability — each skill should be useful on its own, not dependent on another skill to make sense.

### State management

Agents don't remember anything between sessions. A conversation ends, and the next one starts fresh. If your workflow spans multiple sessions — or if a session gets interrupted — any progress that wasn't written to a file is lost.

The fix: use markdown files as **external memory**.

A **spec file** records what the explorer found and what the developer built:

```markdown
## Feature: Add search to episodes

### Explorer findings
- Episodes table has title and description columns
- No search endpoint exists yet
- Frontend uses Tailwind CSS

### Plan (approved)
1. Add GET /api/episodes/search endpoint
2. Add search bar component above episode list

### Progress
- [x] Search endpoint (commit a1b2c3d)
- [ ] Search bar component
- [ ] Filter by episode length
```

A **sprint file** records what happened during a work session:

```markdown
## Sprint 2025-02-23

### Completed
- Search endpoint: working, tested
- Search bar: renders, connected to API

### Issues found
- Description field is HTML, not plain text — search
  doesn't work well on raw HTML

### Change process
- Added to explorer checklist: "verify field format
  (plain text vs HTML vs markdown)"
```

The key rule: **update the file immediately after each step, not at the end.** If the session gets interrupted between steps, the file should reflect everything that was completed. "I'll update it all at once when I'm done" is a recipe for lost progress.

**Checkpoint format** — a structured block that any future session can parse:

```markdown
## Checkpoint: 2025-02-23 14:30

Status: In progress
Completed: Search endpoint, search bar
Next: Filter by episode length
Blocked: Description HTML issue (needs backend fix)
```

This turns files into the persistent brain that the agent itself lacks. The agent forgets everything — but the files remember.

---

### Practical tips

> **Start with conditionals.** The single most common improvement to an instruction file is replacing "do the right thing" with "if X, do A; if Y, do B." Specificity eliminates guesswork.

> **Name your agents explicitly.** "Spawn the researcher agent" works. "Have something handle the research" doesn't. Agents respond to clear role assignments.

> **Gates are cheap insurance.** A two-line gate that pauses for your approval costs nothing. Fixing a wrong direction after the agent has built half the feature costs a lot. Add gates before expensive operations.

> **Files are the agent's memory.** Anything important should be in a file — not in the conversation. Conversations end. Files persist. Design your workflow around files, and session interruptions become harmless.

> **Split skills when they grow.** One page is fine. Three pages is fine. Ten pages means you should split into a core skill and context-specific skills. The test: would any agent load this whole file and use all of it? If not, split.
