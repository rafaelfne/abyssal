---
name: plan-issue
description: Assess a ready Abyssal GitHub issue and produce a decision-complete technical implementation plan without changing code. Use when planning a specific issue, not when selecting the next task.
---

# Plan an Issue

Read `AGENTS.md`, the issue's authoritative product sources, relevant ADRs and the current implementation.

Confirm the issue satisfies the Definition of Ready. If it does not, stop with the exact missing decision or evidence and route it through `$refine-issue` when appropriate.

Ground the plan in current `origin/main`, open pull requests and actual package boundaries. Resolve repository facts through inspection. Ask only for a product choice that materially changes the outcome and is not documented.

The plan must specify:

- Observable outcome and scope boundary.
- Domain and application behavior.
- Contracts, persistence and adapter changes.
- Failure, fallback, idempotency and compatibility behavior.
- Security, privacy, mobile, accessibility, AI, cost and telemetry handling.
- Tests and acceptance evidence.
- Documentation or ADR updates.

Do not write code, create a branch or mutate GitHub unless the user explicitly asks to post the finished plan.
