---
name: refine-issue
description: Refine an Abyssal idea or incomplete GitHub issue into a bounded, testable issue that satisfies the repository Definition of Ready. Use for issue drafting and readiness work, not implementation.
---

# Refine an Issue

Read `AGENTS.md`, the relevant source under `docs/00-product/` and `docs/03-delivery/github-workflow.md`.

Inspect the current issue, related issues, accepted ADRs and shipped behavior before drafting. Resolve discoverable facts from the repository and GitHub instead of asking the user.

Produce or update an issue with:

- Objective and user or engineering value.
- Exact product or architecture origin.
- Testable acceptance criteria.
- Explicit exclusions.
- Dependencies and current state.
- Security, privacy, mobile, accessibility, AI, cost and instrumentation impacts.
- Verification scenarios.

Separate missing human decisions from technical choices. Apply `needs-human` only when a person, credential owner or external authority must decide. Do not apply `status:ready` while a product question or dependency remains unresolved.

Draft first. Mutate GitHub only when the user explicitly asked to create or update the issue. Do not implement code.
