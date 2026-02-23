## Chapter 7: Building Your Agent System

> **TL;DR:** Chapter 6 showed the process. This chapter shows how to build it. Using a real blog about flags as the example, we walk through every step: gathering source material, generating a voice skill, defining a research playbook, and wiring it all together with a command.

---

Chapter 6 introduced the recommended process — orchestrator, explorer, actor, reviewer, iterate, improve — and showed how it maps to a blog about flags. This chapter walks through how that system was actually built. Not the output — the setup. By the end, you'll know how to build something like it for your own work.

### The starting point

A friend of mine had a blog about flags — vexillology, the study of flag design and symbolism. He'd been writing about it for years: the history behind each flag's colors, the meaning of symbols, stories about redesigns and controversies. Good niche content with a loyal audience.

Then life happened. He stopped writing, the blog sat dormant for two years, and he wanted to bring it back. The old content was still good — he just needed to start producing new posts again. Here's how he used an agent to build a system that does most of the work.

### Step 1: Gather the archive

Whatever your domain, the first step is the same: get your existing material into files the agent can read.

He asked the agent:

```
Go to my old blog at [URL] and download every post. Save them all into a single
markdown file called archive.md, organized by date with the title as a heading.
```

The agent crawled the site, pulled every post, and produced a single `archive.md` file — 89 posts spanning several years. This became the raw material for everything that followed: the voice skill, the archive checks, the context for new posts. The agent can only work with what it can see. This step makes everything visible.

### Step 2: Generate a voice skill

The archive wasn't just a reference — it was a training dataset for voice. He asked the agent:

```
Read through archive.md and analyze my writing style. Create a document called
voice.md that describes how I write — sentence patterns, tone, vocabulary level,
humor style, recurring phrases, structure of a typical post.
```

The agent read all 89 posts and produced a style guide. Here's a sample of what it captured:

```markdown
## Tone
"Expert-Casual" — two enthusiastic flag-nerd friends telling stories in a pub.
Visible enthusiasm. Everyday language. Controlled vulnerability — willing to say
"we don't know everything."

## Sentence patterns
- Mix short dramatic sentences ("That's it. Done.") with longer narrative ones
- Fragments are fine: "Cool, right?"
- Three dots for drama: "Gone! Gone forever? Maybe..."

## Signature tools
- Parenthetical asides: "(we don't know if he really existed, but the story's
  too beautiful not to tell)"
- Rhetorical questions answered immediately: "So why is it so common?"
- Self-aware humor: "Yeah, we're thinking about a YouTube channel. No, it won't
  be called 'fun with flags.'"

## What NOT to do
- No academic language ("It should be noted...")
- No condescension
- No emoji
- Never a fact-list — always a narrative
```

He reviewed it, made corrections ("I'm more sarcastic than that," "I never use bullet lists"), and saved it as `.claude/skills/shay-voice.md`. Now any time the agent needs to write in his voice, it loads this skill. The voice file is the single highest-leverage piece of configuration — it's what makes the output sound like him instead of generic AI text.

### Step 3: Define the research playbook

Telling an agent "research Poland's flag" is too vague. You'll get a generic Wikipedia summary. The fix: define what "interesting research" means for your domain.

He created a second skill — `.claude/skills/blog-post.md` — that lists 10 specific categories of trivia he cares about:

1. **Origin story and historical drama** — who designed it, why, what political deal was behind it
2. **Surprising connections to other flags** — influences, "flag families," unexpected relationships
3. **Hidden symbolism** — color meanings, heraldic elements, religious symbols
4. **Design oddities** — unusual shapes, rare colors, exotic elements
5. **Human stories** — the designer, the seamstress, the flag thief
6. **Flag protocol and customs** — how to raise it, local traditions, half-mast rules
7. **Failed redesign attempts** — referenda, rejected proposals, political debates
8. **Trivia** — conversation-starter facts, pop culture connections
9. **Cultural-emotional context** — how people relate to their flag, controversies
10. **Professional vexillology terminology** — terms that make the reader feel smarter

The skill also defines quality standards: find what Wikipedia doesn't cover, prioritize human stories, source every fact. When the explorer agent runs, it uses this file as its playbook — searching for each category independently, producing organized research instead of a generic blob.

This is the difference between "do research" and "here's what interesting research looks like for us."

### Step 4: Build the command

The command file (`.claude/commands/hadaglan.md`) is the orchestrator — the recipe that chains everything together. It's not code. It's a plain-text checklist:

```markdown
Write a new blog post about: $ARGUMENTS

Steps:
1. Read .claude/skills/blog-post.md for research categories.
2. Search the web for information about this flag, organized by those categories.
3. Check hadaglan_full_archive.md — has this flag been covered before?
   If yes, note what exists and focus on new angles.
4. Write the post using the voice skill (.claude/skills/shay-voice.md).
5. Save to posts/ and present the draft for review.
```

That's it. The command references two skills (research playbook and voice), one reference file (the archive), and defines the order. When the author types `/hadaglan Poland`, the agent follows this checklist top to bottom.

### Step 5: Run it, review, improve

Here's what happens when the author types the command:

The agent reads the research skill and searches the web for Poland's flag — origin stories, symbolism, design oddities, the eagle that lost its crown during communism and got it back in 1989. It checks the archive to see if Poland was covered before. Then it loads the voice skill and writes the post — opening with an intriguing riddle (the blog's signature move), weaving in humor and parenthetical asides, ending with a sign-off.

The author reads the draft. "The section about the crown needs more historical context." "The opening riddle gives away too much." The agent revises. Two or three rounds and the post is ready.

After a few posts, the author noticed the agent kept missing adoption dates. He added a line to the research skill: "always include the adoption date and the designer if known." Next post, the agent got it right. This is the change process from Chapter 6 — surfacing a gap and fixing it in the configuration, not in a one-off prompt.

### The files that make it work

| File | What it does | Config layer (Ch5) |
|------|-------------|-------------------|
| `.claude/commands/hadaglan.md` | The command — triggers the workflow, defines the steps | Command |
| `.claude/skills/blog-post.md` | The research playbook — 10 categories of trivia to look for | Skill |
| `.claude/skills/shay-voice.md` | The voice — how the author writes (generated from old posts) | Skill |
| `hadaglan_full_archive.md` | The archive — 89 previous posts for context and dedup | Reference data |
| `posts/` | Output directory — where drafts get saved | Project structure |

One command. Two skills. An archive. Five files total. The author types a single command and gets a draft in his voice, informed by his research standards, that doesn't repeat what he's already written. The hard part wasn't any individual piece — it was knowing which pieces to create and how they connect.

---

### Practical tips

> **Start with the archive.** Whatever your domain, the first step is always getting your existing material into files the agent can read. Old blog posts, past invoices, reference documents, templates — dump it all into markdown files. The agent can only work with what it can see.

> **Your voice file is the highest-leverage investment.** If you're doing any kind of writing work, spend the time to get your voice file right. Have the agent analyze your existing writing, then correct it. A good voice file turns generic AI output into something that sounds like you.

> **Don't just say "do research" — define what good research means.** A research playbook that lists specific categories produces organized, useful output. A vague "research this topic" produces a Wikipedia summary. The more specific your skill, the better the results.

> **Commands are just prompts with structure.** Don't overthink them. Write the steps you'd follow yourself, put them in a markdown file in `.claude/commands/`, and now you've got a repeatable workflow. You can always refine it after a few runs.
