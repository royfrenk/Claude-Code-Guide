---
description: Start an editorial workflow to add, modify, or improve guide content. Spawns an Editor orchestrator with Explorer, Writer, and Reviewer agents.
---

# Edit Command

Start a multi-agent editorial workflow for the Claude Code Guide.

## Usage

```
/edit                              # Start a new edit (Editor will ask what to change)
/edit Add open claw to chapter 11  # Start with a description
```

## Workflow

### Step 1: Gather Chapter List

Run `ls src/*.md` to get all chapter files. The Editor needs this for context.

### Step 2: Spawn Editor Agent

Use the Task tool to spawn the Editor orchestrator:

```
subagent_type: "general-purpose"
description: "Editorial workflow orchestrator"
prompt: |
  You are the Editor orchestrator. Read and follow your instructions in .claude/agents/editor.md

  User's request: $ARGUMENTS
  (If empty, ask the user what they'd like to change.)

  All chapter files:
  [list from Step 1]

  Start the editorial workflow:
  1. Create the edit file
  2. Clarify the change (if needed)
  3. Spawn Explorer for research
  4. Present plan to user for approval (wait for confirmation)
  5. Spawn Writer for content
  6. Spawn Reviewer for review
  7. Iterate if needed
  8. Report back with summary
```

### Step 3: Editor Handles the Rest

The Editor orchestrator manages the full workflow and reports back when complete. The edit file in `docs/edits/` serves as the audit trail.
