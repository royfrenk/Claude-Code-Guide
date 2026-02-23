## Chapter 6: Agents Beyond Code

> **TL;DR:** AI agents aren't just for building software. They can write content, organize research, manage data, and automate repetitive knowledge work. This chapter shows how — with a real example of someone who used an agent to revive a dormant blog.

---

Most of this guide uses software development as its lens. That's because coding agents are the most mature category right now — the tools are built for it. But the same principles (clear instructions, structured memory, iterative workflows) apply to work that has nothing to do with code.

If you can describe what you want in plain language, and the work involves text, files, or data, an agent can probably help.

### What agents can do outside of code

Here are a few categories where agents are already useful:

| Use case | What the agent does | What you provide |
|---|---|---|
| **Content writing** | Research, draft, edit, and publish blog posts or articles in your voice | A voice guide, editorial standards, source material |
| **Bookkeeping** | Categorize transactions, reconcile accounts, generate reports from CSV/Excel exports | Bank exports, category rules, chart of accounts |
| **Research** | Search the web, summarize findings, compile structured notes | A research question and output format |
| **Data cleanup** | Parse messy spreadsheets, normalize formats, deduplicate entries | The messy file and rules for what "clean" looks like |
| **Document management** | Organize, rename, tag, and summarize large collections of files | The files and your organizational scheme |

The pattern is the same every time: you give the agent context (what you're working with, what you want, how you want it), and it does the repetitive or research-heavy parts while you make the decisions.

### Case study: The flag blog

A friend of mine had a blog about flags — vexillology, the study of flag design and symbolism. He'd been writing about it for years: the history behind each flag's colors, the meaning of symbols, stories about redesigns and controversies. Good niche content with a loyal audience.

Then life happened. He stopped writing, the blog sat dormant for two years, and he wanted to bring it back on a new site. The old content was still good — he just needed to migrate it and start producing new posts again.

Here's how he used an AI agent to do it. No code was involved.

#### Step 1: Download the archive

First, he needed all his old content in one place. He asked the agent:

```
Go to my old blog at [URL] and download every post. Save them all into a single
markdown file called archive.md, organized by date with the title as a heading.
```

The agent crawled the site, pulled every post, and produced a single `archive.md` file — his entire body of work in one document. This became the **archive**: the raw material the agent could reference when writing new content.

#### Step 2: Capture his voice

Next, he created a file that described how he writes. Not what he writes about — how he sounds. Sentence length, tone, whether he uses first person, how formal or casual, what kind of humor (if any). He did this by asking the agent:

```
Read through archive.md and analyze my writing style. Create a document called
voice.md that describes how I write — sentence patterns, tone, vocabulary level,
recurring phrases, structure of a typical post.
```

The agent read all his old posts and produced a style guide specific to him. He reviewed it, made corrections ("I'm more sarcastic than that" or "I never use bullet lists"), and saved it.

He then turned `voice.md` into a **skill** — a reusable file the agent can load on demand (we covered skills in Chapter 5). It lived in `.claude/skills/voice.md` so he could invoke it whenever he needed the agent to write in his style.

#### Step 3: Define editorial standards

He created another file: `editorial-guide.md`. This wasn't about voice — it was about substance. What makes a good flag post? What should the agent look for when researching a flag?

His editorial guide included things like:

- Always cover the flag's history, symbolism, and design elements
- Note any controversies or recent redesigns
- Compare to similar flags in the region when relevant
- Include the adoption date and designer (if known)
- Mention vexillological principles when they apply (rule of tincture, etc.)

This file was the agent's editorial compass — the difference between a generic Wikipedia summary and a post that matched his blog's depth and angle.

#### Step 4: Build a command

Finally, he created a **command** — a reusable prompt that chained everything together. The command file (`.claude/commands/write-post.md`) contained instructions like:

```markdown
Write a blog post about the flag of $TOPIC.

Steps:
1. Check archive.md — has this flag been covered before? If yes, note what exists
   and focus on new angles or updates.
2. Read editorial-guide.md for what to include and what makes a good post.
3. Search the web for current information about this flag.
4. Write the post using the voice skill for tone and style.
5. Present the draft for review.
```

Now, whenever he wanted a new post, he'd type:

```
/write-post Poland
```

The agent would check the archive, read the editorial guide, research online, write a draft in his voice, and present it. He'd review, give feedback ("The section on the coat of arms needs more detail", "Too formal in the opening"), and the agent would revise. Two or three rounds of this and he had a publishable post.

#### What made it work

This wasn't a single prompt. It was a small system of files working together:

| File | Purpose | Claude Code concept |
|---|---|---|
| `archive.md` | All old content in one place | Reference data |
| `.claude/skills/voice.md` | How he writes | Skill (Chapter 5) |
| `editorial-guide.md` | What makes good content | Project documentation |
| `.claude/commands/write-post.md` | The workflow that ties it all together | Command (Chapter 5) |

Each file did one thing. The command orchestrated them. The human reviewed the output and iterated. This is the same pattern you'd use for software development — the only difference is the subject matter.

### Accounting example: categorizing transactions

Here's a simpler example. Say you're a freelancer who tracks expenses in a spreadsheet. Every month, you download a CSV from your bank and manually categorize each transaction: office supplies, software subscriptions, travel, meals, etc.

An agent can do this. You'd set it up like:

1. **A CLAUDE.md** that explains your chart of accounts — what categories you use, what goes where, edge cases ("Uber is travel unless it's during a client dinner, then it's meals")
2. **A rules file** with your categorization logic — "anything from Amazon under $50 is office supplies, over $50 requires manual review"
3. **A command** like `/categorize` that: reads the CSV, applies the rules, flags ambiguous transactions for your review, and outputs a clean categorized spreadsheet

The agent does the tedious sorting. You review the flagged items and make the judgment calls. What used to take an afternoon takes fifteen minutes.

### The common pattern

Every non-coding agent workflow follows the same structure:

1. **Give the agent your source material** — archive of old content, bank statements, research papers, whatever you're working with
2. **Define how you want the work done** — voice, style, rules, standards (these become skills and rules files)
3. **Create a repeatable workflow** — a command that chains the steps together
4. **Review and iterate** — the agent drafts, you refine

If you went through Chapter 5, you'll recognize these as the same configuration layers: CLAUDE.md for context, skills for reusable expertise, rules for constraints, commands for workflows. The tools don't care whether you're writing TypeScript or writing about flags.

---

### Practical tips

> **Start with the archive.** Whatever your domain, the first step is always getting your existing material into files the agent can read. Old blog posts, past invoices, reference documents, templates — dump it all into markdown files. The agent can only work with what it can see.

> **Your voice file is the highest-leverage investment.** If you're doing any kind of writing or communication work, spend the time to get your voice file right. Have the agent analyze your existing writing, then correct it. A good voice file turns generic AI output into something that sounds like you.

> **Commands are just prompts with structure.** Don't overthink them. Write the steps you'd follow yourself, put them in a markdown file in `.claude/commands/`, and now you've got a repeatable workflow. You can always refine it after a few uses.

> **Use Wispr Flow for voice input.** If you're working with agents on writing or content tasks, [Wispr Flow](https://wisprflow.com) lets you dictate instead of type. Speak your instructions, edits, or feedback naturally — it transcribes in real time. Faster than typing for long-form direction, especially during the review-and-iterate loop.
