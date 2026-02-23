# Claude Code Project Guide

> Start here when working on this project.

## Quick Start

1. **Read project state:** `docs/PROJECT_STATE.md`
2. **Check roadmap:** `docs/roadmap.md`

## Running the Project

```bash
npm run dev      # Development (localhost:3000)
npm run build    # Build
npm run lint     # Lint
```

## Issue Prefix

Use `CCG` for issue IDs (e.g., `CCG-01`). Spec files go in `docs/technical-specs/CCG-##.md`.

## Deployment

| Environment | Branch | URL |
|-------------|--------|-----|
| Production | `main` | https://claudeguide.xyz |

Hosted on Vercel. Pushes to `main` auto-deploy.

**v0 Project ID:** Check v0 dashboard if needed.

## Before You Commit

- [ ] `npm run build` passes
- [ ] No unintended changes
- [ ] Commit message describes "why"
- [ ] Ask before pushing to main — push to staging first when available
