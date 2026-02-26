# Edit 002: Add Missing Images and Screenshots

**Date:** 2026-02-25
**Target:** All chapters (src/00-introduction.md through src/15-glossary.md)
**Status:** Complete

---

## 1. Brief

Review all chapter content and identify where images and screenshots are missing. Add visual metaphor images (chapter openers) and system screenshots where relevant. The guide currently has images for Chapter 1 (Fantasia) and Chapter 2 (Memento) but most chapters lack visual content.

---

## 2. Research

### Current Image Inventory

**Chapters WITH images:**

| Chapter | Images | Type |
|---------|--------|------|
| Ch0 Introduction | 0 images | -- |
| Ch1 What AI Agents Are | 2: Fantasia opener + Agentic Loop SVG | Cultural metaphor + diagram |
| Ch2 Memory and Context | 2: Memento opener + Memory Layers SVG | Cultural metaphor + diagram |
| Ch3 Tools of the Trade | 5: Landscape SVG + chat.png + cli.png + ide.png + ide3.png | Diagram + screenshots |
| Ch4 Setting Up | 1: VS Code Overview SVG | Diagram |
| Ch5 Git and GitHub | 1: Git Workflow SVG | Diagram |
| Ch6 Configuring Your Agent | 0 images | -- |
| Ch7 The Meta-Process | 1: Mission Workflow SVG | Diagram |
| Ch8 Content Writing Example | 1: Blog Process SVG | Diagram |
| Ch9 Writing Effective Instructions | 0 images | -- |
| Ch10 Personal AI Agents | 0 images | -- |
| Ch11 Building Software | 1: Sprint Process SVG | Diagram |
| Ch12 Claude Built-in Capabilities | 0 images | -- |
| Ch13 Roy's Claude Config | 1: Roy's Sprint SVG | Diagram |
| Ch14 Servers, Hosting, Deployment | 0 images | -- |
| Ch15 Glossary | 0 images | -- |

### Chapters Missing Chapter-Opener Images (Cultural Metaphors)

Only Ch1 and Ch2 have chapter-opener cultural metaphor images. The following chapters would benefit from one:

1. **Ch5 Git and GitHub** -- Concept: version control, undo, saving history. Metaphor ideas: time travel, branching paths, Groundhog Day.
2. **Ch6 Configuring Your Agent** -- Concept: setting up rules and context for a new team member. Metaphor ideas: briefing a new hire, mission control, a cockpit instrument panel.
3. **Ch7 The Meta-Process** -- Concept: the recommended structure for agent work (orchestrator, explorer, actor, reviewer). Metaphor ideas: a factory assembly line, an orchestra conductor, a film production set.
4. **Ch9 Writing Effective Instructions** -- Concept: the craft of writing instruction files. Metaphor ideas: a recipe book, architectural blueprints, a playbook.
5. **Ch10 Personal AI Agents** -- Concept: autonomous agents running on your hardware 24/7. Metaphor ideas: a robot butler, HAL 9000, Ex Machina.
6. **Ch11 Building Software** -- Concept: scaling from two agents to many specialized roles. Metaphor ideas: construction site with specialized workers, a film crew, a pit crew.
7. **Ch14 Servers, Hosting, Deployment** -- Concept: putting your project on the internet. Metaphor ideas: launch pad, opening a store, a lighthouse.

### Chapters Where System Screenshots Would Add Value

1. **Ch4 Setting Up** -- Currently has the VS Code overview SVG. Would benefit from: the Claude Code extension in the VS Code marketplace, the Claude Code panel with a conversation, the status bar modes.
2. **Ch5 Git and GitHub** -- Could use: a GitHub repo page, a pull request view.
3. **Ch6 Configuring Your Agent** -- Could use: a .claude/ folder structure in VS Code sidebar, a CLAUDE.md file open in the editor.
4. **Ch12 Claude Built-in Capabilities** -- Could use: the slash command menu in Claude Code, the /context grid, the /model picker.

### Chapters That Do NOT Need Images

- **Ch0 Introduction** -- Table of contents, no visual content needed.
- **Ch3 Tools of the Trade** -- Already well-covered with 5 images.
- **Ch8 Content Writing Example** -- Has a process diagram. Content is code/text-heavy.
- **Ch13 Roy's Claude Config** -- Has a process diagram. Content is configuration listings.
- **Ch15 Glossary** -- Reference document, no images needed.

---

## 3. Approved Plan

**Cultural metaphor images (7 chapters):** Ch5, Ch6, Ch7, Ch9, Ch10, Ch11, Ch14
**System screenshots (4 chapters):** Ch4, Ch5, Ch6, Ch12

Approved by user on 2026-02-25. Proceeding with Image Finder and Screenshot agents.

---

## 4a. Image Finder Results

### Cultural Metaphor Images Downloaded

| Chapter | File | Image | Metaphor | Dimensions |
|---------|------|-------|----------|------------|
| Ch5 Git and GitHub | groundhog-day.jpg | Movie poster from Groundhog Day (1993) | Living the same day over and over, with the ability to undo and redo -- version control | 259x385 |
| Ch6 Configuring Your Agent | apollo-13-mission-control.jpg | NASA Mission Control during Apollo 13 (1970) | A room full of experts at consoles, each with a role, all coordinated by standing procedures -- configuring your agent system | 1919x1235 |
| Ch7 The Meta-Process | bernstein-conducting.jpg | Leonard Bernstein conducting the NY Philharmonic at the UN (1965) | A conductor orchestrating many musicians -- the orchestrator coordinating agents | 495x640 |
| Ch9 Writing Effective Instructions | blueprint-instructions.jpg | Architect drawing technical plans by hand | Precise technical drawings that become real buildings -- instruction files that become real agent behavior | 1200x675 |
| Ch10 Personal AI Agents | ex-machina-ava.jpg | Movie poster from Ex Machina (2014) showing Ava | An autonomous AI that runs on its own -- personal agents on your hardware | 370x278 |
| Ch11 Building Software | construction-crew.jpg | Construction workers with specialized roles on a building site | Each worker has a specific role and tools -- agents with dedicated specializations | 1200x795 |
| Ch14 Servers, Hosting, Deployment | apollo-11-launch.jpg | Apollo 11 Saturn V rocket liftoff (1969) | Launching something you built into the sky -- deploying your project to the internet | 1564x1920 |

All images saved to both src/diagrams/ and public/diagrams/.

### Proposed Captions and Placement

Each image goes after the TL;DR, before the first content section (matching Ch1 and Ch2 pattern).

| Chapter | Proposed alt text / caption |
|---------|---------------------------|
| Ch5 | Groundhog Day (1993) -- Bill Murray reliving the same day, over and over, until he gets it right |
| Ch6 | NASA Mission Control during Apollo 13 (1970) -- every console has a role, every role has procedures |
| Ch7 | Leonard Bernstein conducting the New York Philharmonic at the United Nations (1965) |
| Ch9 | An architect drafting plans by hand -- precise instructions that become real structures |
| Ch10 | Ava from Ex Machina (2014) -- an autonomous AI that doesn't wait for your commands |
| Ch11 | A construction site -- specialized workers, each with a defined role, building something together |
| Ch14 | Liftoff of the Apollo 11 Saturn V rocket, July 16, 1969 (NASA) |

---

## 4b. Screenshot Shot List (Manual Capture Needed)

These screenshots require manual capture of live UI. Each entry describes exactly what to capture.

### Shot 1: Claude Code Extension in VS Code Marketplace
- **Save to:** src/diagrams/vscode-claude-extension.png (also copy to public/diagrams/)
- **For chapter:** Ch4 Setting Up (src/04-setting-up.md)
- **Tool:** VS Code
- **What to show:** The Extensions sidebar open, with "Claude Code" in the search box. The Claude Code extension by Anthropic visible with the Install button and verified checkmark.
- **Window size:** 1280x800
- **Key elements:** Search box with "Claude Code" typed, the Anthropic publisher name, the verified badge, the Install button
- **Caption:** The Claude Code extension in the VS Code marketplace
- **Placement:** After "Click Install" in Step 2 (around line 28)

### Shot 2: Claude Code Panel with a Conversation
- **Save to:** src/diagrams/claude-code-panel.png (also copy to public/diagrams/)
- **For chapter:** Ch4 Setting Up (src/04-setting-up.md)
- **Tool:** VS Code with Claude Code extension
- **What to show:** VS Code with a project open. The Claude Code panel visible on the right side. A short conversation in the panel -- a user message like "Change the heading to Hello from Claude Code" and the agent's response showing the file edit.
- **Window size:** 1280x800
- **Key elements:** File explorer on left, editor in center with a file open, Claude Code panel on right with a visible conversation
- **Caption:** The Claude Code panel -- your conversation with the agent appears alongside your files
- **Placement:** After Step 4 (around line 43), or in the "Getting to know VS Code" section

### Shot 3: GitHub Repository Page
- **Save to:** src/diagrams/github-repo-page.png (also copy to public/diagrams/)
- **For chapter:** Ch5 Git and GitHub (src/05-git-and-github.md)
- **Tool:** Web browser (GitHub)
- **What to show:** A GitHub repository page (e.g., royfrenk/my-first-project). Show the file list, the README preview, the green Code button.
- **Window size:** 1280x800
- **Key elements:** Repository name, file list, README preview, green "Code" button
- **Caption:** A GitHub repository -- your project's files, history, and backup in one place
- **Placement:** After "Create a GitHub repository" section (around line 113)

### Shot 4: .claude/ Folder Structure in VS Code
- **Save to:** src/diagrams/vscode-claude-folder.png (also copy to public/diagrams/)
- **For chapter:** Ch6 Configuring Your Agent (src/06-configuring-your-agent.md)
- **Tool:** VS Code
- **What to show:** VS Code file explorer showing an expanded .claude/ folder with subfolders: agents/, commands/, rules/, skills/. A CLAUDE.md file should be visible at the project root. Optionally have one of the files (like CLAUDE.md or a rule file) open in the editor.
- **Window size:** 1280x800
- **Key elements:** .claude/ folder expanded, subfolders visible, CLAUDE.md in the root
- **Caption:** The .claude folder -- where all your agent configuration lives
- **Placement:** After "Where everything lives" section (around line 22)

### Shot 5: Slash Command Menu in Claude Code
- **Save to:** src/diagrams/slash-command-menu.png (also copy to public/diagrams/)
- **For chapter:** Ch12 Claude Built-in Capabilities (src/12-building-your-software-system.md)
- **Tool:** VS Code with Claude Code extension
- **What to show:** The Claude Code panel with "/" typed in the input, showing the dropdown menu of available slash commands. The list should show several built-in commands.
- **Window size:** 800x600 (cropped to the Claude Code panel)
- **Key elements:** The "/" in the input box, the command dropdown list with at least 5-6 visible commands
- **Caption:** The slash command menu -- type "/" to see all available commands
- **Placement:** After "How slash commands work" section (around line 14)

---

## 5. Review -- Iteration 1

### Image-Fit Review

| Chapter | Image | Metaphor Strength | Emotional Tone | Recognition | Visual Quality | Verdict |
|---------|-------|-------------------|---------------|-------------|----------------|---------|
| Ch5 | groundhog-day.jpg | Strong -- reliving/undoing maps directly to version control | Match -- light/comedic fits a practical chapter | Iconic -- universally known film | Acceptable -- movie poster, small (259x385) but recognizable | Workable |
| Ch6 | apollo-13-mission-control.jpg | Strong -- a control room with specialized consoles = configuring an agent system | Match -- serious/focused fits the configuration topic | Iconic -- one of the most famous NASA photos | Excellent -- high-res B&W, visually striking | Strong Fit |
| Ch7 | bernstein-conducting.jpg | Strong -- conductor orchestrating musicians = orchestrator coordinating agents | Match -- focused/authoritative | Recognizable -- Bernstein is well-known; the image reads "conductor with orchestra" even without recognition | Acceptable -- B&W, medium resolution, dramatic composition | Strong Fit |
| Ch9 | blueprint-instructions.jpg | Strong -- architect drafting precise plans = writing precise agent instructions | Match -- focused/craftsmanly | Recognizable -- the act of drafting plans is universally understood | Excellent -- high-res color, well-composed | Strong Fit |
| Ch10 | ex-machina-ava.jpg | Strong -- autonomous AI that runs independently = personal agents on your hardware | Match -- slightly ominous, fits the "risks are real" theme | Iconic -- critically acclaimed, visually memorable film | Acceptable -- movie poster, small (370x278) but striking | Workable |
| Ch11 | construction-crew.jpg | Strong -- specialized workers on a building site = multiple agents with defined roles | Match -- active/productive | Recognizable -- construction site is universally understood | Excellent -- high-res, well-composed aerial shot | Strong Fit |
| Ch14 | apollo-11-launch.jpg | Strong -- rocket launch = deploying your project to the internet | Match -- dramatic/aspirational | Iconic -- the most famous rocket launch in history | Excellent -- high-res color NASA photo, dramatic composition | Strong Fit |

### Editorial Review of Changes

**Overall:** Strong

#### Coherence: Pass
- All 7 images are placed consistently: after TL;DR blockquote, before the `---` divider
- Captions connect the image to the chapter topic via em-dash explanation
- No contradictions or disconnects introduced

#### Repetition: Pass
- No duplication. Each image is unique to its chapter's concept.
- No overlap with existing images in other chapters.

#### Cohesion: Pass
- Caption style is consistent across all 7 insertions: "[Subject description] -- [connection to chapter concept]"
- Image placement pattern is consistent (TL;DR -> image -> --- -> content)
- Note: This differs slightly from Ch1 and Ch2 where images are woven into narrative intro paragraphs. The new pattern works for standalone openers.

#### Clarity: Pass
- All captions are descriptive enough to convey the metaphor even if the image doesn't load
- Source/date attribution included where relevant (NASA photos, film years)

#### Structure: Pass
- Images don't break the chapter flow
- No structural disruptions to existing content
- Build passes successfully

### Recommended Changes
None. The insertions are clean and consistent.

### Notes
- Two images are on the smaller side: groundhog-day.jpg (259x385) and ex-machina-ava.jpg (370x278). These are movie posters which are naturally tall/narrow. They will render at a reasonable size in the guide but won't fill the full content width the way the other images do.
- Screenshots require manual capture (5 shots listed in section 4b). These cannot be automated.

---

## 6. Summary

**Status:** Complete
**Iterations:** 1 (no revision needed)
**Files changed:**
- src/05-git-and-github.md -- added Groundhog Day opener image
- src/06-configuring-your-agent.md -- added Apollo 13 Mission Control opener image
- src/07-how-it-all-comes-together.md -- added Bernstein conducting opener image
- src/09-writing-effective-instructions.md -- added blueprint/architect opener image
- src/10-personal-ai-agents.md -- added Ex Machina opener image
- src/11-building-software.md -- added construction crew opener image
- src/14-servers-hosting-deployment.md -- added Apollo 11 launch opener image

**New image files (7):**
- src/diagrams/groundhog-day.jpg (+ public/diagrams/)
- src/diagrams/apollo-13-mission-control.jpg (+ public/diagrams/)
- src/diagrams/bernstein-conducting.jpg (+ public/diagrams/)
- src/diagrams/blueprint-instructions.jpg (+ public/diagrams/)
- src/diagrams/ex-machina-ava.jpg (+ public/diagrams/)
- src/diagrams/construction-crew.jpg (+ public/diagrams/)
- src/diagrams/apollo-11-launch.jpg (+ public/diagrams/)

**Images:** 7 cultural metaphor images added. 5 system screenshots require manual capture (shot list provided).
**Screenshots:** Shot list created for 5 manual captures across Ch4, Ch5, Ch6, Ch12.
**Final review status:** Pass
