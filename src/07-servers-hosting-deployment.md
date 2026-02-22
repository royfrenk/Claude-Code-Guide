## Chapter 7: Servers, Hosting, and Deployment

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
3. **Commit and push** — save your changes and push to GitHub (Chapter 6)
4. **Auto-deploy** — your hosting platform detects the push and deploys automatically
5. **Verify** — check the live URL to make sure it looks right

Most platforms give you a **preview URL** for every push — so you can check your changes before they go live to the main URL.

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
