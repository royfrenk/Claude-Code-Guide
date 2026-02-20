## Chapter 4: Setting Up

> **TL;DR:** You need three things: VS Code (free), the Claude Code extension (free), and a Claude subscription ($20/mo). This chapter walks through every step — downloading, installing, and running your first command.

---

Setting up takes about ten minutes. No terminal commands, no technical knowledge required. Just downloading, clicking, and signing in.

### Step 1: Download VS Code

VS Code is the free editor we recommended in Chapter 3. It's where you'll do all your work.

1. Go to [code.visualstudio.com](https://code.visualstudio.com)
2. Click the big download button — it detects your operating system automatically
3. Open the downloaded file and follow the installer

Once it's installed, open VS Code. You'll see an editor with a sidebar on the left and a welcome tab. That's your workspace.

### Step 2: Install the Claude Code extension

Extensions are add-ons that give VS Code new abilities. The Claude Code extension is what connects you to the AI agent.

1. In VS Code, click the **Extensions** icon in the left sidebar (it looks like four small squares)
2. In the search box at the top, type **Claude Code**
3. Find the one by **Anthropic** (look for the verified checkmark)
4. Click **Install**

That's it. Once installed, you'll see a small Claude icon in the sidebar. Click it to open the Claude Code panel.

### Step 3: Get a Claude subscription

Claude Code needs a Claude account to work. If you don't have one yet:

1. Go to [claude.ai](https://claude.ai) and create an account
2. Subscribe to **Claude Pro** (\$20/mo) or **Claude Max** (\$100–200/mo) — Claude Code is included with both

The difference: Pro gives you a generous amount of usage for everyday work. Max gives you significantly more — useful if you're working on bigger projects or using the agent heavily throughout the day.

### Step 4: Sign in

1. Click the Claude icon in the VS Code sidebar to open the Claude Code panel
2. It will prompt you to sign in — click the link and log in with your Claude account
3. Once connected, you'll see a text input where you can type instructions

### Getting to know VS Code

When you first open VS Code, it can look overwhelming — buttons everywhere, panels, icons. Here's what you're actually looking at. There are only four areas that matter:

![The four main areas of VS Code](diagrams/vscode-overview.svg)

**Activity Bar** (far left, the thin strip of icons). This is your navigation. Each icon opens a different panel in the sidebar. The main ones:
- **File explorer** (top icon) — shows your project's files and folders
- **Search** — find text across your entire project
- **Extensions** (four squares icon) — where you installed Claude Code
- **Claude Code icon** (at the bottom) — opens the agent panel

**File Explorer** (the sidebar next to the activity bar). This shows every file and folder in your project. Think of it like Finder on Mac or File Explorer on Windows — but built into the editor. Click any file to open it.

**Editor Area** (the center). This is where files open when you click them. You can have multiple files open at once — each one gets a tab at the top, just like browser tabs. This is where you read and edit code (or any text file).

**Agent Panel** (the right side, next to the editor). This is Claude Code. You type instructions here, and the agent responds. It can read your files, create new ones, and make changes — all from this panel. You see the agent's work on the right while your files are open on the left.

**Terminal** (the bottom panel, below the editor). A text command line built into VS Code. You won't need it much at first — Claude Code runs commands for you — but it's there when you need it. More on this in the next section.

**The basic workflow:** Click a file in the sidebar to see it in the editor. Type instructions in the agent panel on the right. The agent edits the file, and you see the changes appear in the editor on the left. That's the loop.

### Step 5: Your first command

Let's make sure everything works. First, create a project folder:

1. Create a new folder on your computer (anywhere — Desktop is fine). Call it something like **my-first-project**
2. In VS Code, go to **File → Open Folder** and select that folder

Now, in the Claude Code panel, type:

```
Create a file called hello.txt with the text "Hello from Claude Code"
```

The agent will create the file. You'll see it appear in the VS Code file explorer on the left. Click it — the text should be there.

That's it. You have a working agent.

### Working with the terminal

VS Code has a built-in terminal — that text-based command line we described in Chapter 3. You don't need to open a separate app. It lives right inside VS Code, in the same bottom panel area as Claude Code.

To open it: go to **Terminal → New Terminal** in the menu bar, or press `` Ctrl+` `` (that's the backtick key, usually above Tab).

You won't need the terminal much at the start. Claude Code handles most commands for you — when it needs to run something, it does it automatically. But as your projects grow, you'll occasionally want to run commands yourself: installing a package, starting a local server, or checking the status of your files in Git.

The terminal is always there when you need it. For now, just know where it is.

### Recommended extensions

While you're in the Extensions panel, there are a few other extensions worth installing. None of these are required, but they make the experience better:

| Extension | What it does | Why you'd want it |
|---|---|---|
| **Markdown Preview Enhanced** | Shows a live preview of markdown files side by side with the raw text | Useful for reading and editing CLAUDE.md and other documentation files. You'll be writing these in Chapter 5. |
| **GitLens** | Shows who changed what and when in your code | Helpful once you start using Git (Chapter 7) — makes version history visual instead of text-based. |
| **Error Lens** | Shows error messages directly in your code, right next to the line that caused them | Catches problems as you type instead of making you hunt through a separate panel. |

To install any of these: search for the name in the Extensions panel, find the right one, click Install. Same process as Claude Code.

### If something goes wrong

| Problem | Fix |
|---|---|
| Can't find the Claude Code extension | Make sure VS Code is up to date: go to **Help → Check for Updates**. Claude Code requires a recent version. |
| Can't sign in | Make sure you have a Claude account at [claude.ai](https://claude.ai). Claude Code requires at least a Pro subscription (\$20/mo). |
| Agent responds but can't create files | Check that you've opened a folder in VS Code (File → Open Folder), not just a single file. The agent needs a project folder to work in. |
| Extension installed but no icon in sidebar | Try restarting VS Code (close it completely and reopen). Sometimes extensions need a restart to appear. |
