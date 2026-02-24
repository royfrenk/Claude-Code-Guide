## Chapter 13: Servers, Hosting, and Deployment

> **TL;DR:** Building something is half the job. The other half is putting it somewhere people can access it. This chapter explains what servers are, where your project can live, and how to get it from your computer to the internet.

---

### What is a server?

Your computer runs your project while you're working on it. But when you close your laptop, nobody else can see it. A **server** is a computer that's always on, always connected to the internet, always ready to serve your project to anyone who visits.

When you type a website address into your browser, your browser sends a request to a server somewhere in the world. That server sends back the website — the HTML, the images, the code. Every website you've ever visited is running on a server.

### Two kinds of projects

How you deploy depends on what you built:

**Static sites** — Files that don't change. HTML, CSS, JavaScript, images. A blog, a landing page, a portfolio. The server just hands files to the browser. Simple, cheap, fast.

**Dynamic apps** — Code that runs on the server. A login system, a database, a payment form. The server does work — checking passwords, saving data, processing orders — before sending a response. More complex, more expensive, more powerful.

Most beginner projects are static or lightly dynamic. If your project is a website with no user accounts and no database — it's static.

### Frontend and backend

A web project has two sides:

The **frontend** is what users see and interact with — buttons, text, images, forms, animations. It runs in the browser on the user's device. When you look at a website, you're looking at the frontend. Technologies: HTML, CSS, JavaScript, and frameworks like React or Next.js.

The **backend** is what runs on the server — the stuff users never see. It handles business logic: checking passwords, saving data, processing payments, sending emails. When you click "Log in," the frontend sends your credentials to the backend. The backend checks them against a database and sends back "yes" or "no." Technologies: Node.js, Python, Ruby, Go, and others.

Some projects have both. An e-commerce site has a frontend (the product pages you browse) and a backend (the server that processes your credit card and updates inventory). Other projects are frontend-only — a personal blog, a landing page, a portfolio. No backend needed because there's no data to process.

When people say "full-stack," they mean someone who works on both sides.

### Databases

A **database** is where an application stores its data permanently. User accounts, orders, messages, settings — anything that needs to survive a page refresh or a server restart lives in a database.

Think of it as a collection of spreadsheets. A "users" table has rows for each user — name, email, password (encrypted). An "orders" table has rows for each purchase — what was bought, when, by whom. Tables connect to each other: an order row points to the user who placed it.

Two main types:

**Relational databases** (PostgreSQL, MySQL, SQLite) — Data lives in structured tables with defined columns. Like a well-organized spreadsheet. Best for data with clear relationships: users have orders, orders have items, items have categories.

**Document databases** (MongoDB, Firebase) — Data lives in flexible documents (like JSON files). Each document can have a different structure. Best for data that varies a lot or doesn't fit neatly into tables.

For most projects, **PostgreSQL** is the default choice. It's free, well-supported, and handles everything from a small personal project to a large application. Services like Supabase and Railway give you a PostgreSQL database with a few clicks.

If your project doesn't need to store user data — no accounts, no forms that save, no content that changes — you don't need a database. A static site works fine.

### Production and staging

When you're building something, you don't want mistakes to show up on the live site. That's why most projects have two environments:

**Staging** is the test version. It looks and works exactly like the real thing, but only you (and your team) can see it. You deploy here first, test everything, and catch problems before they reach real users. Staging URLs look like `my-project-staging.vercel.app` or `develop-my-project.vercel.app`.

**Production** is the live version — the real URL that actual users visit. `www.cleanpaws.com`. You only deploy here after you've tested on staging and everything works.

The workflow: make changes → deploy to staging → test → if it works, deploy to production. If something breaks on staging, no one notices except you. If something breaks in production, your users see it. That's the whole reason staging exists — it's your safety net.

In practice, this usually maps to Git branches (Chapter 5). You push to a `develop` branch, which auto-deploys to staging. When you're satisfied, you merge into `main`, which auto-deploys to production. Two branches, two environments, one safety net.

### Where to host

#### For static sites

These platforms host static files for free or near-free. You push your code, they handle the rest.

| Platform | What it does | Price | How to deploy |
|---|---|---|---|
| **Vercel** | Hosts static sites and simple apps. Automatic deploys when you push to GitHub. | Free tier (generous) | Connect your GitHub repo, push code, it deploys automatically |
| **Netlify** | Similar to Vercel. Hosts static sites with automatic deploys. | Free tier | Connect GitHub repo, it deploys on push |
| **GitHub Pages** | Hosts static sites directly from a GitHub repository. | Free | Enable in your repo settings |

**Recommended for beginners: Vercel.** It's free, fast, and integrates with GitHub. Push your code, it builds and deploys automatically. You get a URL like `your-project.vercel.app` that anyone can visit.

#### Self-hosting: your own mini server

You don't have to use a cloud platform. A small computer like a **Raspberry Pi** or a **Mac Mini** sitting in your home can serve a website to the internet. It's always on, always connected, and you own it completely.

This is a great option for small personal sites, home dashboards, or projects where you want total control without monthly fees. The tradeoff: you're responsible for keeping it running, connected, and secure. If your internet goes down, your site goes down.

Your agent can help you set this up — configuring a web server, opening the right ports, and getting a domain pointed to your home IP address. It's more hands-on than cloud hosting, but for a small site it works surprisingly well.

#### For dynamic apps

These platforms run your server-side code — Node.js, Python, databases, background jobs.

| Platform | What it does | Price | Notes |
|---|---|---|---|
| **Railway** | Runs apps with databases. Simple setup. | Free trial; from \$5/mo | Good balance of simplicity and power |
| **Render** | Hosts web services, databases, cron jobs. | Free tier (limited); from \$7/mo | Similar to Railway, slightly more manual |
| **Fly.io** | Runs apps close to your users globally. | Free tier; from \$5/mo | More control, slightly more complex |
| **Supabase** | Database and authentication as a service. | Free tier; from \$25/mo | Use alongside a static host for your frontend |

### Deploying with your agent

You don't need to figure out deployment commands yourself. Claude can handle it:

```
Deploy this project to Vercel
```

For a first deployment, Claude will walk you through:
1. Connecting your account (usually opening a browser to sign in)
2. Linking your project
3. Pushing the code
4. Verifying the deployment

After the first time, deployments happen automatically when you push to GitHub — or you can ask Claude to deploy manually.

### The deployment workflow

Once set up, here's the typical flow:

1. **Build locally** — work on your project with Claude
2. **Test** — make sure it works on your machine
3. **Commit and push** — save your changes and push to GitHub (Chapter 5)
4. **Auto-deploy to staging** — your hosting platform detects the push and deploys to the staging environment
5. **Test on staging** — check the staging URL to make sure it works in a real environment
6. **Deploy to production** — merge to the main branch, which auto-deploys to the live URL
7. **Verify** — check the production URL to make sure it looks right

Most platforms give you a **preview URL** for every push — so you can check your changes before they go live.

### Domains

When you first deploy, you get a free URL from the platform — something like `my-project.vercel.app` or `my-project.netlify.app`. That works fine for testing and sharing.

When you're ready for a real domain (like `www.cleanpaws.com`), you:

1. Buy a domain from a **registrar** (Namecheap, Google Domains, Cloudflare — around \$10-15/year)
2. Point it to your hosting platform (the platform's docs explain how)
3. The platform handles the SSL certificate (the padlock icon in browsers) automatically

Your agent can help with the configuration:

```
Help me connect the domain cleanpaws.com to my Vercel deployment
```

### Environment variables

Some projects need secrets — API keys, database passwords, service credentials. You never put these in your code (anyone who sees your code would see your secrets). Instead, you store them as **environment variables** on the hosting platform.

Every hosting platform has a settings page where you add environment variables — key-value pairs like:

```
DATABASE_URL = postgres://user:password@host:5432/mydb
API_KEY = sk-abc123...
```

Your code reads these at runtime. The values never appear in your code or on GitHub.

```
Add the environment variables from my .env file to Vercel
```

### What can go wrong

| Problem | What happened | Fix |
|---|---|---|
| Site works locally but not when deployed | Missing environment variables, or the build command is different | Check the platform's deploy logs; add missing env vars |
| "Page not found" on refresh | Single-page apps need a redirect rule | Ask Claude to add the redirect configuration for your platform |
| Site is slow | Large images, no caching, server far from users | Ask Claude to optimize images and add caching headers |
| Deploy fails | Build error — usually a dependency issue | Check the build logs; ask Claude to fix the error |

### Static vs. dynamic: how to choose

| If your project... | You need... | Start with... |
|---|---|---|
| Has no database, no user accounts, no server logic | Static hosting | Vercel or Netlify (free) |
| Has a database or user authentication | Dynamic hosting + database | Railway or Render |
| Is a simple API or backend service | Dynamic hosting | Railway or Fly.io |
| Is a frontend that talks to a separate API | Static hosting for frontend + dynamic for API | Vercel (frontend) + Railway (API) |

If you're not sure, start static. You can always add a backend later.

---

### Practical tips

> **Always deploy to staging first.** Never push straight to production. Even for "small" changes. The five minutes you spend testing on staging will save you from the panicked fix you'd need when a broken change goes live.

> **You don't need a database until you do.** Start without one. If your project is a blog, a portfolio, or a landing page — static hosting is enough. Add a database when you actually need to store user data, not because you think you might need it someday.

> **Frontend and backend can live on different platforms.** A common pattern: host your frontend on Vercel (free, fast) and your backend on Railway or Render. They talk to each other over the internet. You don't need to put everything in one place.

> **Environment variables are how you keep secrets safe.** Never put API keys, passwords, or credentials in your code. Store them as environment variables on your hosting platform. Your agent can help you set this up.
