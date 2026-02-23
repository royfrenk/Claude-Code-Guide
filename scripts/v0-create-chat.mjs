#!/usr/bin/env node

/**
 * v0 Platform API — Create Chat
 *
 * Creates a v0.dev chat with the guide website prompt and returns a browser URL.
 *
 * Usage:
 *   node scripts/v0-create-chat.mjs
 *
 * Environment:
 *   V0_API_KEY — Required.
 */

import { v0 } from 'v0-sdk'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const SYSTEM_PROMPT = [
  'You are building a documentation website for "Working With AI Agents: A Guide for Non-Technical People."',
  'Tech stack: Next.js 14 App Router + Tailwind CSS + shadcn/ui.',
  'The repo (royfrenk/Claude-Code-Guide) is connected to this v0 project.',
  'Content is in markdown files under src/ — the app reads and renders them.',
  'Images are in src/diagrams/ — SVGs, PNGs, and JPGs.',
  'Design should feel like a premium online book: editorial, clean, polished.',
  'Light theme. Blue (#4a86c8) for TL;DR callouts. Green (#16a34a) for practical tips.',
  'Fixed left sidebar with chapter navigation. Full-text search (Cmd+K). Reading progress tracking.',
].join(' ')

async function main() {
  const apiKey = process.env.V0_API_KEY
  if (!apiKey) {
    console.error('ERROR: V0_API_KEY not set.')
    console.error('Export it: export V0_API_KEY="your_key"')
    process.exit(1)
  }

  // Read the prompt file
  const promptPath = resolve(ROOT, 'v0-prompt.md')
  const prompt = readFileSync(promptPath, 'utf-8')

  // Read a sample chapter to include as context
  const sampleChapter = readFileSync(resolve(ROOT, 'src/02-memory-and-context.md'), 'utf-8')

  const fullPrompt = [
    prompt,
    '',
    '## Sample Chapter (for reference — this is what the markdown looks like)',
    '',
    '```markdown',
    sampleChapter,
    '```',
  ].join('\n')

  console.error('Creating v0.dev chat...')
  console.error(`  Prompt length: ${fullPrompt.length} chars`)

  try {
    const chat = await v0.chats.create({
      message: fullPrompt,
      system: SYSTEM_PROMPT,
    })

    const webUrl = chat.webUrl
    const demoUrl = chat.latestVersion?.demoUrl ?? '(not available)'

    // stdout: just the URL
    console.log(webUrl)

    // stderr: metadata
    console.error('')
    console.error('--- v0.dev Chat Created ---')
    console.error(`  Chat ID:  ${chat.id}`)
    console.error(`  Web URL:  ${webUrl}`)
    console.error(`  Demo URL: ${demoUrl}`)
    console.error('')
    console.error('Open the Web URL in your browser to iterate visually.')
  } catch (error) {
    console.error(`ERROR: ${error.message}`)
    if (error.message.includes('401') || error.message.includes('auth')) {
      console.error('Check that your V0_API_KEY is valid.')
    }
    process.exit(1)
  }
}

main()
