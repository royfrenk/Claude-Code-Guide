## Glossary

Quick reference for terms used in this guide, listed alphabetically.

**Agent** — A piece of software that can take actions autonomously: creating files, writing code, running commands, and making decisions to complete a task. Unlike a chatbot, an agent doesn't just respond — it acts.

**Agentic loop** — The cycle an agent follows: read instruction → decide what to do → do it → check the result → decide next step → repeat until done.

**API (Application Programming Interface)** — A way for one piece of software to talk to another. In this guide, it usually means the direct connection to an AI model that you pay for per use, as opposed to a subscription.

**API key** — A password-like string that identifies your account to a service. You need one to use AI models via API access. Keep it secret — anyone with your key can use your account and run up your bill.

**CI/CD (Continuous Integration / Continuous Deployment)** — Automated systems that test your code and deploy it whenever you make changes. Advanced concept — not needed for beginners, but mentioned in comparison tables.

**CLAUDE.md** — A markdown file in your project that Claude Code reads automatically at the start of every session. Contains standing instructions: what the project is, what rules to follow, what to avoid.

**CLI (Command Line Interface)** — A text-only way to interact with your computer. You type commands, press Enter, get results. No buttons or menus.

**Commit** — A saved snapshot of your project at a point in time, with a short message describing what changed. Created using Git.

**Commit message** — The short note attached to a commit describing what changed and why. Good commit messages help the next session's agent understand the project's history.

**Context window** — The fixed-size memory an agent has during a session. It holds your conversation, files the agent has read, and instructions. Typical size: 100,000–200,000 tokens. When full, early information gets dropped.

**Deploy / Deployment** — The process of making your project accessible on the internet. Moving it from your computer to a server where people can use it.

**Framework** — A pre-built structure of code that provides common functionality so you don't start from scratch. React, Next.js, and Vue are JavaScript frameworks. Django and Flask are Python frameworks.

**Git** — A version control system that tracks changes to your files over time. Think of it as an infinite undo button that also lets multiple people work on the same project. Every saved checkpoint is called a commit.

**Hook** — An automated action that fires at a specific moment in the agent's workflow (e.g., before executing a command, after finishing a task). Used for automated guardrails and quality checks.

**Hosting** — Keeping your project running on a server so people can access it via the internet. Can be free (Vercel free tier) or paid, depending on the service and your project's needs.

**IDE (Integrated Development Environment)** — A visual application for writing code, with features like syntax highlighting, file management, error detection, and code execution. VS Code, Cursor, and Windsurf are IDEs.

**LLM (Large Language Model)** — The AI model that powers an agent. It reads your instructions, reasons about them, and generates responses. Claude, GPT, and Gemini are all LLMs.

**Markdown (.md)** — A simple text format that uses plain characters for formatting: `#` for headings, `**bold**` for bold, `-` for bullet points. Easy to write in any text editor, and renders with nice formatting in tools like VS Code and GitHub. Software projects use markdown files everywhere — READMEs, documentation, instruction files.

**MCP (Model Context Protocol)** — A standard protocol that connects Claude Code to external tools and services. An MCP server is the bridge — one for GitHub, one for Slack, one for your database, etc.

**MCP server** — A specific integration that implements MCP for one tool or service. Adding an MCP server lets the agent interact with that tool directly.

**Node.js** — A program that lets you run JavaScript outside a web browser. Some older Claude Code installation methods required it. The current native installer does not.

**Platform** — The tool layer between you and the AI model. It handles the interface, file management, and deployment. Claude Code, Cursor, and Replit are all platforms with different tradeoffs.

**Railway** — A cloud platform for hosting back-end services, databases, and full-stack applications. Alternative to Vercel for projects that need server-side infrastructure.

**Skill** — A reusable bundle of instructions (stored as a SKILL.md file) that teaches the agent how to handle a specific type of task. Like a recipe card the agent can reference.

**Sub-agent** — A smaller agent spawned by a main agent to handle a specific sub-task in parallel. Claude Code uses sub-agents to work on multiple things simultaneously.

**Subscription** — A monthly fee ($20/mo is the common entry point) that gives you access to an AI model through a product interface. Usage is included up to a limit. The alternative to API access.

**Terminal** — The application that provides a CLI. On Mac: Terminal or iTerm. On Windows: PowerShell or Command Prompt. On Linux: any terminal emulator. Same concept as CLI, different word.

**Token** — The unit models use to measure text. One token is roughly 3/4 of a word. A 1,000-word document is about 1,333 tokens. Models charge per token and have token limits on how much they can process at once.

**Vercel** — A cloud platform for hosting websites and web applications. Popular with front-end developers. Offers free tier for small projects.

**VS Code (Visual Studio Code)** — A free, widely-used IDE made by Microsoft. Claude Code runs inside it as an extension.

---

### More reading

- [The 2026 Guide to Prompt Engineering (IBM)](https://www.ibm.com/think/prompt-engineering) — A clear reference covering AI and software terminology, with practical explanations of how each concept works.
- [Prompt Engineering Guide (promptingguide.ai)](https://www.promptingguide.ai/) — An open-source reference covering AI concepts, techniques, and terminology, maintained by the community and regularly updated.
