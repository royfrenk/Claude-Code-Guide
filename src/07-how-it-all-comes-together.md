## Chapter 7: The Meta-Process

> **TL;DR:** Every agent project follows the same shape: user input, orchestrator, explorer, actor, reviewer, iterate. Add a post-mortem and a change process, and the system gets better every time you use it. This chapter defines the framework. Chapter 8 shows it in action.

![Leonard Bernstein conducting the New York Philharmonic at the United Nations (1965)](diagrams/bernstein-conducting.jpg)

---

Chapter 6 introduced the building blocks: CLAUDE.md, rules, skills, agents, commands. Each one does one thing. This chapter defines the process that ties them together — the recommended structure for any agent work, regardless of domain.

### The recommended process

Here's a best practice for structuring agent work. You don't have to follow it rigidly — but the more of it you adopt, the better your results will be:

![The Agent Process — a recommended structure for agent work](diagrams/diagram-mission-workflow.svg)

Five roles, one loop:

1. **User input.** You start the process — a prompt, a spec, a command. This is the brief.
2. **Orchestrator.** Something coordinates the work. In a simple process, this is a command file (the recipe from Chapter 6). In a complex one, it's a manager agent that dispatches sub-agents.
3. **Explorer.** Before any work happens, someone gathers context. What already exists? What are the constraints? What needs to change? The explorer does the homework.
4. **Actor.** The one who does the work — writes the code, drafts the post, cleans the data. This is the developer, the writer, the doer.
5. **Reviewer.** Someone checks the output. In simple tasks, that's you. In complex ones, it might be a reviewer agent followed by you. If the work isn't right, it goes back to the actor — this is the **iteration loop**. It runs until the reviewer approves.

After the work is done, two more steps are recommended:

- **Post-mortem.** Review what happened. What went well? What took too long? What broke?
- **Change process.** Feed those learnings back into the system — update a rule, fix a command, add a guardrail. The next run is smoother because this one happened.

You can start with just the first five roles and skip the post-mortem entirely. But if you want your agent work to get better over time — not just task by task, but structurally — the last two steps are what make that happen.

### The process scales

This same framework works at every level of complexity:

- **Simple task.** You type a prompt, the agent does the work, you review. The orchestrator is just you. The explorer is the agent reading the codebase. The actor is the agent writing code. The reviewer is you.
- **Content writing.** A command file dispatches a researcher and a writer — two sub-agents, each with its own skill. Chapter 8 walks through this setup using a real blog as the example.
- **Software development.** A manager agent dispatches an explorer, a developer, and a reviewer — four or more sub-agents in a structured flow. Chapter 11 covers this.

The number of agents changes. The complexity of the work changes. The process stays the same.

---

### Practical tips

> **Start simple, add agents later.** Your first tasks should use a single agent with a command file. Get comfortable with the input-explore-work-review loop before introducing sub-agents. Most tasks don't need a five-agent team.

> **The iteration loop is where the value is.** The first draft is never the final version — for blog posts or software. Get comfortable giving specific feedback: not "this isn't right" but "the introduction is too formal" or "the button should be on the left." The agent improves with each round.

> **Always do the post-mortem.** Even a quick scan of what happened tells you what to change. This is how your process gets better over time — not by reading documentation, but by reviewing your own work.

---

### More reading

- [Building Effective AI Agents (Anthropic)](https://www.anthropic.com/research/building-effective-agents) — Anthropic's guide to composable agent patterns: prompting, chaining, routing, orchestration, and evaluation. The foundational reference for the process described in this chapter.
- [How We Built Our Multi-Agent Research System (Anthropic)](https://www.anthropic.com/engineering/multi-agent-research-system) — A detailed look at how Anthropic built a real multi-agent system with an orchestrator-worker pattern, including how agents coordinate and share context.
- [AI Agent Orchestration Patterns (Microsoft)](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns) — Microsoft's reference for agent design patterns: sequential, parallel, supervisor, and group chat. Useful for understanding the architectural options behind any orchestration workflow.
