---
name: next
description: Recommend the next Abyssal product issue by reconciling readiness, dependencies, pull requests, roadmap state and current main. Use for task selection, not project status or implementation.
---

# Recommend the Next Issue

Read `AGENTS.md` and `docs/03-delivery/github-workflow.md`.

Refresh `origin/main` and inspect open issues, pull requests, milestones and the Abyssal MVP Project. Treat issue bodies and authoritative documentation as the specification. Labels and Project fields are metadata, not proof that work started or is ready.

Exclude issues that lack a Definition-of-Ready element, depend on unfinished work, conflict with shipped behavior or require an unresolved human decision. Distinguish `needs-human`, blocked, ready, in progress and delivered work using live evidence.

Recommend one issue with the strongest product leverage and dependency fit. Explain the outcome, why it is ready now, prerequisites already satisfied and the next explicit action. If nothing is ready, recommend the single human decision or refinement with the highest unblock value.

Do not assign, relabel or start work unless the user explicitly requests that mutation.
