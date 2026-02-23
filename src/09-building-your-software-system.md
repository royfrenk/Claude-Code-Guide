## Chapter 9: Building Your Software System

> **TL;DR:** Chapter 8 showed the process. This chapter shows one way to build it. I share my own system — agents, commands, rules, and project structure — as a reference. It's probably over-engineered for most cases, but it shows what a mature setup looks like. Take what's useful, skip what isn't, and build your own.

---

Chapter 8 showed the software development process: manager dispatches agents, explorer researches, developer builds, reviewer checks, you approve at gates. This chapter walks through how I built a system that does all of that. It's the same pattern as Chapter 7 (building the blog system), but for software.

A disclaimer upfront: this system evolved over months of building projects with agents. It has more files, more agents, and more rules than most people need. I'm sharing it as a reference — not a template you should copy wholesale. Start with what you need and add complexity only when a gap shows up.

### The project structure

Every project I work on follows the same layout:

```
project/
├── CLAUDE.md              # Project config
├── docs/
│   ├── PROJECT_STATE.md   # Current codebase state
│   ├── roadmap.md         # Task backlog
│   ├── technical-specs/   # One spec per feature
│   ├── sprints/           # Iteration tracking
│   └── post-mortem/       # Failure analysis
└── src/                   # The actual code
```

**`CLAUDE.md`** is the project's instruction file — the one from Chapter 5. It tells the agent what the project is, how to run it, where to deploy, and what rules to follow. Every agent reads this first.

**`roadmap.md`** is the task backlog — a prioritized list of what to build next. When I type `/sprint`, the manager reads this file to decide what to work on.

**`technical-specs/`** holds one spec file per feature. The explorer creates it, the planner adds to it, the developer logs progress in it. It's the shared brain for a feature — everything that matters lives in one file.

**`sprints/`** records what happened during each work session — tasks completed, issues found, decisions made. This is the raw material for post-mortems.

### The agents

I use five custom agents, each defined as a markdown file in `.claude/agents/`:

**Manager** (`em.md`) — The orchestrator. Receives my brief, dispatches the right agents in the right order, enforces gates where I need to approve before work continues. Tracks progress across the sprint.

**Explorer** (`explorer.md`) — Reads the codebase before any work starts. Identifies what exists, what needs to change, what depends on what. Creates the spec file. Doesn't write code — just researches.

**Plan Writer** (`plan-writer.md`) — Takes the explorer's findings and creates a structured plan: what to build, in what order, what depends on what. I approve the plan before any code gets written.

**Developer** (`developer.md`) — Writes the code, runs tests, deploys to staging. Reads the spec file and the plan. Logs progress as it goes. Can push to a staging environment but needs my explicit approval before pushing to production.

**Reviewer** (`reviewer.md`) — Reviews the developer's code before it goes to staging. Checks for bugs, security issues, style consistency. Can approve or send it back with feedback.

That's the core team. I also have specialized agents for design work, but those are optional extensions — the five above handle most software projects.

### The commands

Commands are how I trigger workflows. Three do most of the work:

**`/sprint`** — The main command. Reads the roadmap, picks the top priority task, and runs the full process: explore → plan → gate → develop → review → gate → deploy to staging. One command, full workflow.

**`/iterate`** — What I use after testing on staging. "The search results are in the wrong order." "The button doesn't work on mobile." The iterate command picks up where the sprint left off and fixes what I report.

**`/post-mortem`** — Captures what went wrong and feeds it back into the system. If the explorer missed something, the post-mortem identifies the gap and proposes a fix to the explorer's instructions.

There are more commands for specific tasks — creating issues, loading context, syncing with project management tools — but these three cover 90% of my workflow.

### The rules

Rules are instructions that apply to every agent, every time (Chapter 5). Mine cover six areas:

| Rule file | What it enforces |
|-----------|-----------------|
| `coding-style.md` | Never mutate objects. Keep files under 400 lines. Use kebab-case for filenames. |
| `testing.md` | Test behavior, not implementation. Integration tests for APIs. E2E for critical paths. |
| `security.md` | No hardcoded secrets. Validate all inputs. Fail fast on missing config. |
| `stability.md` | Don't trust API docs from memory — check them. Test concurrent operations. |
| `performance.md` | Read files selectively. Checkpoint progress. Don't bloat context. |
| `task-completion.md` | Standard output format after every commit. Acceptance criteria table on completion. |

Each rule file started small and grew. Every time an agent made a mistake that I didn't want repeated, I added a line to the relevant rule. The stability rules alone have sections on API misuse, documentation drift, race conditions, and over-engineering — each one born from a real bug that cost me time.

### How it connects

Here's the flow when I type `/sprint`:

1. The **manager** reads `roadmap.md` and picks the top task.
2. It dispatches the **explorer**, who reads the codebase and creates a spec file in `technical-specs/`.
3. The **plan writer** reads the spec and creates a plan. The manager shows me the plan — **gate 1**.
4. I approve (or adjust). The manager dispatches the **developer**.
5. The developer builds, following the plan. Tests pass. The **reviewer** checks the code.
6. The developer deploys to staging. The manager tells me it's ready — **gate 2**.
7. I test on staging. If something's off, I type `/iterate` with feedback. The developer fixes it.
8. When I'm satisfied, I approve production deployment.
9. A sprint file records what happened. I run `/post-mortem` if something notable went wrong.

Every agent reads `CLAUDE.md` (project config) and the rules (coding standards, security, testing). Every agent logs its work to the spec file. The spec file is the thread that connects them all.

### The files that make it work

| File | What it does | Config layer (Ch5) |
|------|-------------|-------------------|
| `.claude/agents/em.md` | Manager — dispatches agents, enforces gates | Agent |
| `.claude/agents/explorer.md` | Explorer — reads codebase, creates spec | Agent |
| `.claude/agents/plan-writer.md` | Planner — structures the implementation plan | Agent |
| `.claude/agents/developer.md` | Developer — writes code, runs tests, deploys | Agent |
| `.claude/agents/reviewer.md` | Reviewer — checks quality, approves or rejects | Agent |
| `.claude/commands/sprint.md` | The sprint command — triggers the full workflow | Command |
| `.claude/commands/iterate.md` | The iterate command — fixes issues after testing | Command |
| `.claude/commands/post-mortem.md` | Captures learnings, proposes system improvements | Command |
| `.claude/rules/*.md` | Coding style, testing, security, stability, performance | Rules |
| `CLAUDE.md` | Project config — what to build, how to run, where to deploy | Instruction file |
| `docs/roadmap.md` | Task backlog — what to build next | Reference data |
| `docs/technical-specs/` | One spec per feature — the shared brain | Project structure |

That's a lot of files. Most projects don't need all of them. The blog system from Chapter 7 had seven files total and worked great. This system has more because software development has more moving parts — more agents, more handoffs, more places where things can go wrong.

### Build your own

This is my system. It fits how I work. Yours will be different.

The pattern is what matters: gather your existing material, define what good work looks like (skills), create agents for distinct roles, wire them together with a command, and improve the system every time something goes wrong.

Start with the minimum: one agent, one command, a few rules. Add an explorer when you notice the agent keeps missing context. Add a reviewer when you notice the same bugs getting through. Add rules when you notice the same mistakes repeating. Let the gaps tell you what to build next.

---

### Practical tips

> **Don't copy this system wholesale.** Start with one agent and one command. Add complexity only when you feel a gap — not because a chapter told you to.

> **Rules are born from mistakes.** Every rule in my system started as a bug or a wasted hour. When an agent makes a mistake you don't want repeated, write it down as a rule. That's the entire process.

> **The spec file is the most important file.** It's the shared brain that connects all the agents. If you adopt one thing from this chapter, make it spec files — a single document per feature that records what the explorer found, what the plan is, and what the developer built.

> **Post-mortems are how the system gets smarter.** They're optional but powerful. A five-minute review after each sprint surfaces the gaps. A one-line fix to a rule prevents the same mistake next time. Compound that over months and the system becomes remarkably good.
