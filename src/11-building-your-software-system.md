## Chapter 11: Commands, Skills, and Workflows

> **TL;DR:** Claude Code ships with built-in slash commands that manage your sessions, context, settings, and tools. These work out of the box — no setup required. Chapter 6 covered the configuration layer (rules, skills, agents, commands you create). This chapter covers the operational layer — the default commands you'll use every day.

---

Chapter 6 showed you how to configure your agent: instruction files, rules, memory, skills, custom agents, commands, hooks, and MCP servers. Those are things you build over time to make the agent work better for your project.

This chapter covers what's already there. Claude Code ships with a set of built-in slash commands — tools for managing your sessions, navigating your context, changing settings, and troubleshooting problems. You don't create these. They're just available from day one.

### How slash commands work

Type `/` in the Claude Code panel and a list appears. Start typing to filter it — `/m` shows `/memory`, `/model`, `/mcp`. Select one and it runs immediately.

There are two kinds of slash commands:

- **Built-in commands** — ship with Claude Code, always available, manage sessions and settings
- **Custom commands** — ones you create (Chapter 6), or community skills you install, that automate project-specific workflows

This chapter covers the built-in ones. They break into five categories.

### Session management

These control your conversation with the agent — clearing history, rewinding to a previous point, resuming old sessions.

| Command | What it does |
|---|---|
| `/clear` | Wipes the conversation history. Fresh start, same session. |
| `/compact` | Condenses the conversation to free up tokens. You can add focus instructions: `/compact keep the database schema discussion` |
| `/rewind` | Rolls back the conversation (and optionally code changes) to a previous point. Also triggered with `Esc Esc`. |
| `/resume` | Reopens a previous session by ID or name. Shows a picker if you don't specify. |
| `/rename` | Names the current session for easier identification later. |
| `/export` | Saves the conversation to a file or clipboard. |
| `/copy` | Copies the last response to your clipboard. |

The two you'll use most: `/compact` when the agent starts forgetting things mid-session (it's running out of context — Chapter 2), and `/clear` when you want a clean slate.

### Context and usage

These help you understand what's happening inside the session — how much context is used, what tokens cost, and what tasks are running.

| Command | What it does |
|---|---|
| `/context` | Shows a visual grid of your context window usage. Useful for spotting when you're running low. |
| `/cost` | Shows token usage for the current session. |
| `/todos` | Lists current TODO items the agent is tracking. |
| `/tasks` | Lists background tasks (commands running in the background). |
| `/stats` | Shows daily usage history, session counts, and model preferences. |
| `/usage` | Shows your plan's usage limits and rate limit status. |

### Settings and configuration

These change how Claude Code behaves — which model it uses, what permissions it has, what theme it displays.

| Command | What it does |
|---|---|
| `/model` | Switches the AI model. With Opus, you can also adjust the effort level using arrow keys. |
| `/config` | Opens the settings interface for customizing behavior. |
| `/permissions` | Views or updates what tools the agent can access. |
| `/memory` | Opens your CLAUDE.md memory files for editing. |
| `/init` | Scans your project and generates a CLAUDE.md file. The fastest way to set up a new project. |
| `/plan` | Enters plan mode — the agent analyzes code and proposes changes without executing them. You approve before anything happens. |
| `/theme` | Changes the color theme. |
| `/status` | Shows version, model, account info, and connectivity. |
| `/statusline` | Configures the terminal status line display. |

### Help and troubleshooting

When something isn't working right.

| Command | What it does |
|---|---|
| `/help` | General help for Claude Code commands and features. |
| `/debug` | Reads the session debug log. Add a description: `/debug the agent keeps timing out` |
| `/doctor` | Checks the health of your installation — dependencies, permissions, configuration. |

### Tools and connections

These manage external connections and cross-device sessions.

| Command | What it does |
|---|---|
| `/mcp` | Manages MCP server connections and authentication. |
| `/teleport` | Resumes a remote session from claude.ai in your terminal. |
| `/desktop` | Hands off the current CLI session to the Claude Code desktop app. |
| `/exit` | Closes the session. |

### Commands you'll actually use

Most sessions use the same handful: `/compact` when the context fills up, `/model` to switch between fast and thorough, `/clear` for a fresh start, and `/init` when starting a new project. The rest are there when you need them.

The real power comes when you combine built-in commands with the custom configuration from Chapter 6 — your own commands, skills, and agents layered on top of the defaults. Chapter 12 shows what that looks like at scale: a full software development system with seven custom agents, five commands, and rules that evolve with every project.

---

### Practical tips

> **Use `/compact` before the agent gets confused.** When responses start feeling off — missing context, repeating itself, forgetting decisions — the context window is full. Run `/compact` to condense the conversation. Add a focus phrase if there's something specific you want preserved.

> **Use `/init` on every new project.** It takes ten seconds and gives the agent a head start. You can always edit the generated CLAUDE.md later, but starting with something is always better than starting with nothing.

> **Use `/plan` for anything risky.** Plan mode lets the agent analyze and propose changes without executing them. You review the plan, approve or adjust, then it executes. For unfamiliar codebases or complex changes, this is the safest way to work.
