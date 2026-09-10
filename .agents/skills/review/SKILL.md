---
name: review
description: Review an Abyssal pull request or branch for correctness, architecture, security, mobile UX, AI boundaries and verification gaps. Use for review and risk assessment, not implementation.
---

# Review a Change

Read `AGENTS.md`, the linked issue, product source, relevant ADRs and the complete diff. Reconcile the branch with current `origin/main` and inspect connected callers, tests and migrations.

Prioritize findings that can cause incorrect game state, authorization failure, data loss, AI control of rules, missing fallback, mobile inaccessibility, cost leakage or architectural coupling.

Verify:

- Acceptance criteria and exclusions match the issue.
- Domain behavior is deterministic and framework-free.
- The API remains authoritative and anonymous tokens remain isolated.
- Contracts validate all external input and adapters translate vendor failures.
- AI output cannot change numeric state and has bounded fallback.
- UI behavior works without hover at 390×844 and remains keyboard accessible.
- Migrations, job retries, telemetry and redaction are safe when relevant.
- Reported tests actually cover the changed behavior.

Report findings first with exact file and line references, ordered by severity. If none exist, state that explicitly and list residual risks or unverified checks. Do not edit code or merge unless separately requested.
