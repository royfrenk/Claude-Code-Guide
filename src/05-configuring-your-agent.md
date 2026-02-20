## Chapter 5: Configuring Your Agent

> **TL;DR:** Claude Code reads configuration files to know how to behave. The instruction file (CLAUDE.md) is where you start. Rules, custom agents, skills, hooks, memory, and MCP servers add more power as you need it. The best part: you don't have to create any of these files by hand — just ask Claude to set them up for you.

---

Chapter 4 got Claude Code running. This chapter is about making it work *well* — giving it the right context, the right tools, and the right guardrails before you hand it a real task.

### Where everything lives: the .claude folder

All of Claude Code's configuration lives in a folder called `.claude`. The dot at the beginning means it's a **hidden folder** — it won't show up in Finder or File Explorer by default, but VS Code shows it in your file explorer.

There are two levels:

| Level | Location | Who it affects | What goes here |
|---|---|---|---|
| **Project** | `my-project/.claude/` | Just this project | Project-specific rules, agents, skills, settings |
| **Global** | `~/.claude/` (your home folder) | Every project on your machine | Personal preferences, global rules, your memory file |

The `~` symbol means your home folder — `/Users/yourname` on Mac, `C:\Users\yourname` on Windows. You don't need to create these folders yourself. Claude Code creates them when needed.

**The key idea:** Project-level configuration is shared with your team (it lives in the project). Global configuration is personal to you.

### You don't have to create files by hand

This is important: **you can ask Claude to set up any of this configuration for you.** You don't need to know the exact folder structure or file format. Just tell the agent what you want:

- "Create a CLAUDE.md for this project"
- "Add a rule that all code should use TypeScript"
- "Set up a custom agent for code review"
- "Create a skill for deploying to production"

Claude knows where these files go and how to format them. As you get more comfortable, you might want to edit them directly — but you never have to.

### The configuration layers

There are seven layers, from most essential to most advanced. You only need the first one to start:

1. **The instruction file (CLAUDE.md)** — Standing orders for every session
2. **Rules** — Organized instructions by topic
3. **Memory** — Notes the agent keeps across sessions
4. **Custom agents** — Specialized agents for specific tasks
5. **Skills** — Reusable commands you can invoke
6. **Hooks** — Automated actions at specific moments
7. **MCP servers** — Connections to external tools

### 1. The instruction file (CLAUDE.md)

This is the most important configuration you'll make. CLAUDE.md is a text file that Claude Code reads automatically at the start of every session — before you say anything. It's your agent's standing orders.

#### What goes in it

Think of CLAUDE.md as a brief for a new team member who joins the project every morning with no memory of yesterday. What would you tell them?

- What this project is and who it's for
- What technologies it uses
- What commands to run (build, test, deploy)
- What files or folders to never touch
- Coding style and naming conventions
- Known issues or quirks

#### A real example

```markdown
# Project: Clean Paws Website

A single-page website for a dog grooming business.

## Tech stack
- HTML, CSS, vanilla JavaScript
- No frameworks, no build tools
- Hosted on Vercel

## Commands
- Preview locally: open index.html in browser
- Deploy: push to main branch (Vercel auto-deploys)

## Rules
- Never delete or modify /assets/images — these are client-provided
- Use plain CSS, not Tailwind or Bootstrap
- All text content is in English
- Keep the design minimal: white background, dark text, blue accents (#2563EB)

## File structure
- index.html — main page
- styles.css — all styles
- script.js — form validation and booking logic
- /assets/images — client photos (do not modify)
```

#### How to create it

The fastest way — just ask Claude:

```
Create a CLAUDE.md file for this project
```

Claude will scan your project and generate one based on what it finds — detected languages, file structure, build tools. Edit it from there.

You can also run the shortcut command `/init` in the Claude Code panel, which does the same thing.

#### Where it lives

| Location | Scope |
|---|---|
| Your project root (`/my-project/CLAUDE.md`) | Read for this project only |
| Inside the .claude folder (`/my-project/.claude/CLAUDE.md`) | Same — project only |
| Your home folder (`~/.claude/CLAUDE.md`) | Read for every project on your machine |

Most people use a project-level CLAUDE.md. If you have rules that apply everywhere ("never commit .env files"), put those in the global one.

There's also a **local** variant — `.claude/CLAUDE.local.md` — for personal preferences you don't want to share with your team. This file is ignored by Git, so it stays on your machine.

### 2. Rules

As your CLAUDE.md grows, you might want to organize it. Instead of one giant file, you can split instructions into **rules** — separate files organized by topic.

```
my-project/.claude/rules/
├── code-style.md      — naming conventions, formatting
├── testing.md         — how to write and run tests
├── security.md        — input validation, secret handling
└── deployment.md      — how to deploy, what to check
```

Each rule is a plain markdown file. Claude reads all of them automatically, just like CLAUDE.md. The advantage is organization — when you want to update your testing rules, you edit one focused file instead of hunting through a giant instruction document.

Rules can also live globally (`~/.claude/rules/`) for instructions you want across all projects.

**To create rules:** Just ask Claude — "Create a rule for code style in this project" — and it will create the file in the right place.

### 3. Memory

Remember Chapter 2 — the memory problem? Memory is one of the solutions.

Claude Code has an **auto memory** system. As you work, it can save notes to a file called `MEMORY.md` that persists across sessions. Next time you start a new session, Claude reads this file and remembers what it learned.

What goes in memory:
- Patterns it discovered about your project ("this codebase uses Tailwind for styling")
- Debugging insights ("the auth system requires a restart after config changes")
- Your preferences ("user prefers concise commit messages")

Memory lives at `~/.claude/projects/<your-project>/memory/MEMORY.md`. You can also ask Claude to remember things explicitly:

```
Remember that I always want you to run tests before committing
```

And it will save that to its memory file. You can also tell it to forget things:

```
Stop remembering the thing about Tailwind — we switched to plain CSS
```

### 4. Custom agents

A **custom agent** is a specialized version of Claude that you define for a specific type of task. Think of it as creating a team member with a specific role: one agent for code review, another for writing tests, another for planning.

Each agent is a markdown file with a name, description, and instructions:

```markdown
---
name: code-reviewer
description: Reviews code for quality and security issues
---

You are a code review specialist. When reviewing code:
1. Check for security issues first
2. Check for logic errors
3. Verify naming conventions match the project style
4. Summarize findings in a clear table
```

Custom agents live in `.claude/agents/` (project) or `~/.claude/agents/` (global). When Claude Code needs to handle a task that matches an agent's description, it can dispatch that agent — or you can invoke one directly.

**To create one:** Ask Claude — "Create a custom agent for code review" — and it will set it up.

#### Why use custom agents?

The main agent can do everything. But custom agents are useful when:
- You want consistent behavior for a specific task (always review code the same way)
- You want to run tasks in parallel (one agent researches while another writes code)
- You want a restricted agent that can only read files, not modify them

### 5. Skills

A **skill** is a reusable command that teaches the agent how to do a specific type of task. Think of it as a recipe card you can invoke by name.

Skills are markdown files that live in `.claude/skills/<skill-name>/SKILL.md`:

```markdown
---
name: deploy
description: Deploy the project to production
---

# Deployment Steps

1. Run all tests — stop if any fail
2. Build the project
3. Push to the main branch
4. Verify the deployment URL responds
5. Report the result
```

Once created, you invoke a skill by typing its name with a slash: `/deploy`. The agent reads the instructions and follows them.

**Built-in skills** come with Claude Code. You can also install community skills or create your own. Creating your own becomes useful when you find yourself giving the agent the same instructions repeatedly.

### 6. Hooks

**Hooks** are automated actions that run at specific moments in the agent's workflow — like tripwires. You set them up once, and they fire every time that moment occurs.

| Hook event | When it fires | Example use |
|---|---|---|
| `PreToolUse` | Before the agent runs a command | Block dangerous commands |
| `PostToolUse` | After the agent edits a file | Auto-format the code |
| `Stop` | When the agent finishes a task | Run tests automatically |
| `SessionStart` | When a new session begins | Check prerequisites |

Say you want the agent to automatically format code after every edit. You'd create a hook that fires after each file change (`PostToolUse`) and runs your code formatter.

You can set up hooks by typing `/hooks` inside Claude Code — it opens an interactive menu.

**Who needs hooks?** Not beginners. Hooks are a power feature for when you're running agents more autonomously and want automated guardrails. Come back to this when you need it.

### 7. MCP servers

**MCP** stands for **Model Context Protocol**. An MCP server is a bridge that connects Claude Code to an external tool or service — like GitHub, Slack, a database, or a project management tool.

Without MCP, the agent can only work with files on your computer. With MCP servers, it can:

- Read and create GitHub issues and pull requests
- Query your database directly
- Pull designs from Figma
- Access your project management tools (like Linear or Jira)

To add one, you can ask Claude:

```
Connect to GitHub using MCP
```

Or use the command directly:

```
claude mcp add --transport http github https://mcp.github.com
```

**Who needs MCP servers?** Anyone working on a project that connects to external services. If your project uses GitHub for code or a database for data, MCP servers let the agent interact with those tools directly.

### The configuration stack at a glance

| Layer | What it does | When to set it up | How to create it |
|---|---|---|---|
| **CLAUDE.md** | Standing instructions for every session | Day one — before your first real task | Ask Claude or run `/init` |
| **Rules** | Organized instructions by topic | When your CLAUDE.md gets too long | Ask Claude to create a rule |
| **Memory** | Notes that persist across sessions | Automatic — Claude learns as you work | Ask Claude to remember something |
| **Custom agents** | Specialized agents for specific tasks | When you want consistent behavior for a task type | Ask Claude to create an agent |
| **Skills** | Reusable commands you invoke by name | When you repeat the same instructions | Ask Claude to create a skill |
| **Hooks** | Automated checks and actions | When you want automated guardrails | Type `/hooks` in Claude Code |
| **MCP servers** | Connections to external tools | When your project uses external services | Ask Claude to connect a service |

### Global vs. project: what goes where

| Put it in **project** (`.claude/`) when... | Put it in **global** (`~/.claude/`) when... |
|---|---|
| It's specific to this project | It applies to all your projects |
| Your team should see it | It's a personal preference |
| It references project files or structure | It's about how *you* work, not the project |

**Examples:**
- "Use Tailwind for styling" → project rule (specific to this project)
- "Always explain your changes before making them" → global rule (your preference everywhere)
- A deploy skill for this project → project skill
- A code review agent you use everywhere → global agent

---

### Practical tips

> **Don't skip the CLAUDE.md.** Starting without a CLAUDE.md is like hiring someone and not telling them what the project is. The agent will work — but it'll make assumptions about your tech stack, style, and preferences that might not match yours. Five minutes writing a CLAUDE.md saves hours of corrections.
