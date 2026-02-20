## Chapter 6: Your First Project

> **TL;DR:** This chapter walks you through building a real project from a blank folder to a working website. You'll create a business landing page step by step — giving instructions to your agent, reviewing its work, and learning the rhythm of working with AI.

---

Everything so far has been setup and theory. This chapter is where you actually build something.

We're going to create a landing page for a fictional dog grooming business called **Clean Paws**. It's simple enough to finish in one session, but real enough to teach you the workflow you'll use on every project going forward.

### Start with a folder

1. Create a new folder on your computer. Call it `clean-paws`.
2. Open it in VS Code: **File → Open Folder** → select the folder.

You should see an empty file explorer on the left. That's your blank canvas.

### Create the instruction file

Before building anything, give your agent context. In the Claude Code panel, type:

```
Create a CLAUDE.md for this project. It's a single-page landing page for
a dog grooming business called Clean Paws. Tech stack: plain HTML, CSS,
and JavaScript — no frameworks. The design should be clean and minimal:
white background, dark text, blue accents.
```

The agent will create a CLAUDE.md file. Click it in the file explorer to see what it wrote. Read through it — does it capture what you want? If something is off, tell the agent:

```
Update the CLAUDE.md — add a rule that all images go in an /assets folder
```

This is your project's foundation. Every future session starts by reading this file.

### Build the page structure

Now, build the skeleton:

```
Create the landing page with these sections:
- A header with the business name and a navigation bar
- A hero section with a large heading, a tagline, and a "Book Now" button
- A services section showing three services (Bath & Brush, Full Groom, Puppy's First)
- A contact section with the address, phone number, and hours
- A footer with a copyright notice
```

The agent will create your HTML file. Once it's done, let's see it in a browser.

### Preview your work

You need to see what the page actually looks like. Ask the agent:

```
How do I preview this page in my browser?
```

For a simple HTML page, the answer is usually: right-click `index.html` in the file explorer and select **"Open with Live Server"** (if you have that extension) or just open the file directly in your browser.

You should see an unstyled page — just text, no colors, no layout. That's expected. The structure is there; the design comes next.

### Add styling

```
Style the page. Use the blue accent color from the CLAUDE.md. Make the
header stick to the top. The hero section should be tall with centered
text. The services section should show the three services in a row on
desktop and stacked on mobile. Keep it clean and professional.
```

Refresh your browser. Now you should see something that looks like a real website. If something doesn't look right, be specific:

```
The services section looks cramped — add more spacing between the three
cards. And make the "Book Now" button bigger.
```

This is the core loop: **instruct → review → adjust**. You'll do this dozens of times per session.

### Add interactivity

A static page is fine, but let's add some life:

```
When someone clicks the "Book Now" button, scroll smoothly down to the
contact section. Also add a simple mobile menu — on small screens, the
navigation should collapse into a hamburger menu that opens on tap.
```

Check it in your browser. Resize the window to see if the mobile menu works. Click the button to test the scroll.

### What just happened

Let's pause and look at what you have. Open your file explorer:

```
clean-paws/
├── CLAUDE.md        — your agent's instructions
├── index.html       — the page structure
├── styles.css       — how it looks
└── script.js        — the interactive parts
```

Four files. A complete landing page. You didn't write any code — you described what you wanted, and the agent built it. But the files are right there on your computer, in a folder you control. You can open them, read them, edit them, or move them anywhere.

### Save your work

Now is the time to set up Git (Chapter 7) and save everything. But for now, a quick save:

```
Initialize a Git repository and commit everything with the message
"Initial landing page for Clean Paws"
```

Your project is now tracked. You can always come back to this point.

### Make it yours

Here's where it gets fun. The landing page works, but it's generic. Start customizing:

```
Change the hero heading to "Your Dog Deserves the Best" and the tagline
to "Professional grooming in downtown Portland since 2019"
```

```
Add a testimonials section between services and contact. Show three
customer quotes with names and star ratings.
```

```
The color scheme feels too corporate. Make it warmer — try a soft cream
background instead of pure white, and use a teal accent instead of blue.
```

Each instruction changes the page. Each change is immediately visible in your browser. This is how real projects evolve — not in one giant leap, but in dozens of small, reviewable steps.

### Try breaking something (on purpose)

This is a safe space to learn. Try asking for something ambitious:

```
Add a photo gallery with a lightbox effect — clicking a photo opens it
full-screen with previous/next navigation
```

It might work perfectly. It might not. If something breaks:

```
The gallery isn't working — the images don't open when I click them.
Check the console for errors and fix it.
```

This is normal. Building software is iterative. Things break, you fix them, you move on. The agent handles the debugging — you just need to describe what's wrong.

### Deploy it

When you're happy with the page, put it on the internet. This is a preview of Chapter 8:

```
Deploy this to Vercel so I can share the link
```

The agent will walk you through connecting Vercel (free account, one-time setup). When it's done, you'll have a live URL — a real website that anyone can visit.

### The workflow you just learned

This is the workflow for every project, not just this one:

1. **Create a folder** and open it in VS Code
2. **Set up CLAUDE.md** — give the agent context about what you're building
3. **Build the structure first** — get the skeleton right before styling
4. **Style and refine** — iterate visually, checking the browser after each change
5. **Add features** — one at a time, testing each one
6. **Commit often** — save your progress at meaningful milestones
7. **Deploy** — put it online when it's ready

The project is different every time. The workflow stays the same.

### What to build next

Now that you've done it once, try something on your own:

- **A personal portfolio** — a page about you, your work, and how to reach you
- **A restaurant menu** — sections for appetizers, mains, desserts, with prices
- **An event page** — date, location, schedule, and an RSVP button
- **A simple blog** — a few posts with a clean reading layout

---

### Practical tips

> **Start with the structure, then fill in details.** Don't try to build a complete page in one shot. Build the skeleton first: "Create the basic page structure with a header, main content area, and footer. No styling yet." Then add content, then style it. Each step is reviewable. If the structure is wrong, you fix it before investing time in styling.

> **Use a reference.** If you know what you want it to look like, say so: "Make the pricing section look similar to Stripe's pricing page — three columns, each with a plan name, price, feature list, and a button." The agent has seen thousands of websites. A reference gives it a target instead of guessing.

> **Review in the browser, not just in code.** After the agent makes changes, open your project in a browser and look at it. The code might be perfect, but the visual result might not be what you expected. Fonts, spacing, colors, layout — these are easier to judge visually than by reading code.

> **Let the agent manage files, but review what it changed.** As projects grow, the agent works across many files. You don't need to specify which files to create or modify — the agent knows. But after a task, ask: "What files did you modify?" Spot-check the important ones. If a file is doing too many things, ask the agent to split it up.

> **Undo mistakes quickly.** If the agent made a change you didn't want, ask it to undo: "Undo the last change you made to index.html." Or, if you committed before the change: "Revert to the last commit."

> **Be specific about what's wrong.** "This doesn't look right" gives the agent nothing to work with. "The header text is too small — make it bigger. And the button is overlapping the paragraph below it — add some spacing" tells it exactly what to fix.

> **Ask the agent to investigate.** When something breaks and you don't know why: "Something broke — the page shows a blank white screen. Check the console for errors and figure out what went wrong." The agent can read error messages, trace the problem, and fix it. But it needs to know something is broken.

> **Describe the problem, not the solution.** When you're stuck: "I want to add a way for visitors to book appointments on the website. I'm not sure how to approach this. What are my options?" The agent will suggest approaches, explain the tradeoffs, and help you pick one. You don't have to know the technical solution.

Pick one. Create a folder. Write a CLAUDE.md. Start building. You know the workflow now.
