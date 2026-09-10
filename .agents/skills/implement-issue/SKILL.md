---
name: implement-issue
description: Implement a ready Abyssal GitHub issue end to end, verify the outcome and open a linked pull request. Use only for an approved issue that satisfies the Definition of Ready.
---

# Implement an Issue

Read `AGENTS.md`, the approved issue, authoritative product documentation, relevant ADRs and the affected code before editing.

Verify the issue is open and `status:ready`, has no unresolved product decision and is not already delivered by `origin/main` or another pull request. Start from current `origin/main` with an agent branch named `codex/<type>-<issue>-<slug>`.

Implement only the accepted outcome. Preserve dependency direction, server authority, deterministic consequences and the narrative-only AI boundary. Update authoritative documentation in the same change when a durable rule changes.

Run focused tests while working, then the complete relevant gate. For interface work, verify 390×844 behavior, accessibility and connected interactions and capture readable visual evidence.

Open a pull request that closes the issue and reports only executed checks. Do not merge, apply approval labels or claim work is running merely because a label exists. Rafael must explicitly approve the merge.
