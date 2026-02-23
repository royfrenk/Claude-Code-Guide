## Chapter 6: How It All Comes Together

> **TL;DR:** Chapter 5 introduced the building blocks — commands, skills, agents, rules, memory. This chapter shows how they orchestrate a real task. A command triggers the mission, sub-agents divide the work, skills shape how it's done, and a tracking file records everything along the way.

---

In Chapter 5, you learned about the configuration layers: CLAUDE.md for standing instructions, skills for reusable expertise, rules for constraints, commands for workflows, and custom agents for specialized roles. Each one does one thing. But the real power shows up when they work together as a system.

This chapter walks through two real examples — one simple, one complex — to show how the pieces orchestrate a complete mission from start to finish.

### The tracking file: your mission's stenographer

Before we get to the examples, there's one concept that ties everything together: the **tracking file**.

Throughout any mission, the agent writes to a file that captures what's happening. Not just the output — the decisions, the research done, the iterations. Think of it as a court stenographer who records everything while the work happens. The agent does the work; the file records the trail.

This file serves three purposes:

1. **During the mission** — gives context. What's been done, what's next, what was decided. If the agent loses its place (it happens — context windows have limits), the tracking file gets it back on track.
2. **After the mission** — enables review. What worked, what didn't, where time was spent. You can scan it in two minutes and know exactly what happened.
3. **For the next mission** — feeds improvements. If the same mistake keeps showing up, you add a rule. If a step was missing, you update the command. The tracking file is how your process gets better over time.

What the tracking file looks like depends on the mission:

| Context | Tracking file | What it captures |
|---------|---------------|------------------|
| Blog writing | The draft + an archive of previous posts | Research done, voice applied, revisions |
| Software project | A spec file + a sprint file | Requirements, decisions, test results, iterations |
| Data cleanup | A log file | Rules applied, exceptions flagged, manual decisions |

The format doesn't matter. What matters is that the agent writes to it as it works — not after.

### Example 1: Writing a blog post

A friend of mine writes a blog about flags (we'll see more of this in Chapter 7). He set up a system where typing a single command produces a full draft in his voice. Here's what happens when he types:

```
/write-post Poland
```

**Step 1: The command orchestrates.** The command file (`.claude/commands/write-post.md`) contains the recipe — a sequence of steps the agent follows. It's not code. It's a plain-text checklist:

```markdown
Write a blog post about the flag of $TOPIC.

Steps:
1. Check archive.md — has this flag been covered before?
2. Read editorial-guide.md for what to include.
3. Search the web for current information about this flag.
4. Write the post using the voice skill for tone and style.
5. Present the draft for review.
```

One file. Five steps. The agent reads it and follows it.

**Step 2: The agent explores.** First instruction in the command: check the archive. The agent reads `archive.md` — a file containing every previous post — to see if Poland's flag has been covered. If it has, the agent notes what exists and looks for new angles. If not, it proceeds with a clean slate.

**Step 3: A skill shapes the work.** The command tells the agent to use the **voice skill**. This skill (`.claude/skills/voice.md`) describes how the author writes — sentence patterns, tone, vocabulary, what to avoid. The agent reads it and writes in that style. Without it, the output would be generic. With it, the output sounds like him.

**Step 4: The agent works.** Armed with research, archive context, and the voice skill, the agent writes the post. The draft itself is the tracking document — it captures what the agent produced and can be revised.

**Step 5: You review and iterate.** The agent presents the draft. The author gives feedback: "Too formal in the opening," "The coat of arms section needs more detail." The agent revises. Two or three rounds and he has a publishable post.

**Step 6: The archive updates.** After publishing, the new post gets added to `archive.md` — so next time the agent writes, it knows what's been covered. The living memory grows with every mission.

#### What orchestrated this?

| Piece | What it did | Config layer (Ch5) |
|-------|-------------|-------------------|
| `/write-post` | Triggered the workflow | Command |
| `archive.md` | Checked for previous coverage | Reference data |
| `voice.md` | Shaped the writing style | Skill |
| `editorial-guide.md` | Defined what makes a good post | Rule / project doc |
| The draft file | Captured the work in progress | Tracking file |

One command. Four reference files. A clear workflow. The agent handled the research and writing; the human handled direction and review.

### Example 2: Building a software feature

When the task is bigger — building a feature, not writing a post — the same orchestration applies, but with more moving parts. Instead of one agent doing everything, specialized **sub-agents** divide the labor. Think of it like a film crew: the director doesn't also hold the camera, do the lighting, and edit the footage. Each person has a role.

#### The cast

| Agent | Role | Like... |
|-------|------|---------|
| Manager | Orchestrates the mission, assigns tasks | Director |
| Explorer | Researches the codebase and requirements | Research assistant |
| Planner | Creates the implementation plan | Architect |
| Developer | Writes the code | Builder |
| Reviewer | Checks quality before shipping | Editor |

These are **custom agents** — the same concept from Chapter 5. Each one is a markdown file that defines what the agent does, what it can access, and how it behaves.

#### How it flows

![How a Mission Works — the stages of a task, from brief to done](diagrams/diagram-mission-workflow.svg)

**1. You brief.** "Add a search feature to the app." This goes to the manager agent, which orchestrates the rest.

**2. The manager dispatches the explorer.** Before anyone writes code, the explorer reads through the existing project — what's already built, what needs to change, where the new feature connects to existing pieces. Its findings go into a **spec file** — the tracking document for this mission.

**3. The planner creates a plan.** Based on the explorer's findings, the planner writes an implementation plan: what to build, in what order, what depends on what. This goes into the same spec file. You approve the plan before any code is written. This is a **gate** — the mission pauses until you say "go."

**4. The developer builds.** Following the plan, the developer writes code in small steps — finishing one piece, testing it, then moving to the next. Each step gets logged in the spec file. Progress is visible.

**5. The reviewer checks.** Before anything ships, the reviewer reads the code, checks for quality issues, and either approves or sends it back with feedback. This is another gate — work doesn't proceed until the reviewer signs off.

**6. You test.** The developer deploys to a preview environment. You test it. If something's wrong, you give feedback ("the search results are in the wrong order," "the filter doesn't work on mobile") and the developer iterates.

**7. The sprint file captures everything.** Throughout all of this, a **sprint file** records what happened: which tasks were completed, what issues came up during testing, what decisions were made, how iterations went. When the mission is done, this file is a complete record of the entire process.

**8. Post-mortem.** After the mission, you review the sprint file. What went well? What took too long? What should change for next time? These learnings feed back into the rules and configuration files — so the next mission runs smoother. This is the loop that makes agent-assisted work improve over time.

#### The tracking files

| File | When it's written | What it captures |
|------|-------------------|------------------|
| Spec file | Exploration through development | Requirements, plan, progress, test results |
| Sprint file | Throughout the entire mission | Decisions, iterations, blockers, final status |

#### Same pattern, bigger scale

The blog post used one command, one skill, and one tracking file. The software sprint uses multiple agents, multiple rules, and two tracking files. But the shape is identical:

**Brief → Explore → Work → Review → Iterate → Document**

You don't need to understand the software details to see the pattern. Brief clearly, let specialists do their part, review before shipping, and document everything. That pattern works whether you're writing blog posts or building apps.

---

### Practical tips

> **Start simple, add agents later.** Your first missions should use a single agent with a command file. Get comfortable with the brief-explore-work-review loop before introducing sub-agents. Most tasks don't need a five-agent team.

> **The tracking file is the highest-leverage habit.** Whether it's a draft, a spec file, or a simple log — having the agent write to a tracking file as it works means you always know what happened. Tell the agent: "Keep a running log of what you do and why."

> **Review the tracking file after every mission.** Even a quick scan tells you where time was spent, what went wrong, and what to change. This is how your process gets better over time — not by reading documentation, but by reviewing your own missions.
