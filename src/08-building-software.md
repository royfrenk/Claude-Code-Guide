## Chapter 8: Building Software with Agents

> **TL;DR:** The same process from Chapter 6 — orchestrator, explorer, actor, reviewer, iterate — scales to building software. The difference: instead of one agent wearing all the hats, specialized sub-agents divide the labor. A manager dispatches, an explorer researches the codebase, a developer writes code, and a reviewer checks quality. Gates pause the process for your approval.

---

Chapters 6 and 7 showed the recommended process and how to build a system for it — using a blog as the example. This chapter shows what happens when the same process scales up to building software. The shape is the same. The number of agents changes.

### From one agent to many

In the blog example, a single agent wore multiple hats — explorer, writer, researcher. That works for content, where the output is one file and the reviewer is one person.

Software is different. The codebase is larger, the work is more specialized, and mistakes are harder to undo. So instead of one agent doing everything, the roles get split across dedicated **sub-agents**. Think of it like a film crew: the director doesn't also hold the camera, do the lighting, and edit the footage.

### The cast

![Software feature process — multiple agents, dedicated roles](diagrams/diagram-sprint-process.svg)

| Process role | Agent | What it does |
|-------------|-------|-------------|
| **Orchestrator** | Manager | Dispatches agents, tracks progress, enforces gates |
| **Explorer** | Explorer | Reads the codebase, identifies what needs to change |
| **Actor** | Developer | Writes the code, runs tests, deploys |
| **Reviewer** | Reviewer | Checks quality, approves or sends back |

These are **custom agents** — the same concept from Chapter 5. Each is a markdown file that defines what the agent does, what it can access, and how it behaves.

### How it flows

**1. You brief.** "Add a search feature to the app." This goes to the manager agent.

**2. Orchestrator dispatches explorer.** Before anyone writes code, the explorer reads through the existing project — what's already built, what needs to change, where the new feature connects to existing pieces. Its findings go into a **spec file** — a tracking document that stays with the process.

**3. Explorer hands off to a planner.** Based on the findings, a plan gets written: what to build, in what order, what depends on what. You approve the plan before any code is written. This is a **gate** — the process pauses until you say "go."

**4. Developer builds.** The developer writes code in small steps — finishing one piece, testing it, then moving to the next. Progress gets logged in the spec file.

**5. Reviewer checks.** The reviewer reads the code, checks for quality issues, and either approves or sends it back with feedback. Another gate. If the work isn't right, it goes back to the developer — the iteration loop.

**6. You test.** The developer deploys to a preview environment. You test it. If something's wrong ("the search results are in the wrong order," "the filter doesn't work on mobile"), you give feedback and the developer iterates.

**7. Post-mortem.** After the work is done, a **sprint file** records what happened: which tasks were completed, what issues came up, what decisions were made. You review it. What went well? What took too long?

**8. Change process.** Learnings feed back into the rules and configuration. Maybe the explorer missed a database table — you add a step to the exploration checklist. Maybe the reviewer caught the same formatting issue three times — you add a rule. The system improves.

### Same process, more moving parts

The blog post used one agent wearing all the hats. The software sprint uses multiple agents, each in a dedicated role. But the recommended structure from Chapter 6 is the same: user input, orchestrator, explorer, actor, reviewer, iterate, post-mortem, change process. The number of agents changes. The complexity of the work changes. The process scales to fit.

---

### Practical tips

> **Start simple, add agents later.** Your first tasks should use a single agent with a command file. Get comfortable with the input-explore-work-review loop before introducing sub-agents. Most tasks don't need a five-agent team.

> **The iteration loop is where the value is.** The first draft is never the final version — for blog posts or software. Get comfortable giving specific feedback: not "this isn't right" but "the button should be on the left" or "the search results should show newest first." The agent improves with each round.

> **Gates exist to protect you.** Approving a plan before code gets written is not bureaucracy — it's the cheapest place to catch misunderstandings. Reviewing code before it ships is the second cheapest. The most expensive place to find a problem is in production.

> **Always do the post-mortem.** Even a quick scan of what happened tells you what to change. This is how your process gets better over time — not by reading documentation, but by reviewing your own work.
