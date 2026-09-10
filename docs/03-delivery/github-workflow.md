# GitHub Delivery Workflow

## Sources of truth

Issues describe bounded work and link to authoritative product documents. Pull requests deliver one approved outcome. The public GitHub Project visualizes roadmap state but does not replace issue content or start agent work.

## Lifecycle

1. Capture a request with the matching issue form.
2. Refine it against product documentation and dependencies.
3. Apply `status:ready` only when the Definition of Ready is satisfied.
4. Assign a person or explicitly invoke an agent before considering work active.
5. Create a branch from current `origin/main`.
6. Implement the approved scope and collect executed evidence.
7. Open a linked pull request and move the Project item to In Review.
8. Resolve review findings and required checks.
9. Rafael explicitly approves agent and external contributions.
10. Squash merge, close the issue and move the item to Done.

## Definition of Ready

An issue is ready only when it has:

- A concrete user or engineering objective.
- A link to its authoritative product or architecture origin.
- Testable acceptance criteria.
- Explicit exclusions and a bounded outcome.
- Resolved product questions.
- Named dependencies and their current state.
- Security and privacy impact.
- Mobile and accessibility impact.
- AI, latency and cost impact.
- Instrumentation expectations.
- Verification scenarios.

Use `needs-human` when a missing product, legal, credential or external decision prevents readiness. Use `status:blocked` when an accepted issue cannot proceed because a named dependency is unresolved.

## Definition of Done

- Acceptance criteria are demonstrated.
- Relevant checks ran and their results appear in the pull request.
- Product rules and ADRs reflect durable decisions.
- Security, privacy and isolation behavior is covered when relevant.
- AI features include validation, budget handling and deterministic fallback.
- User-interface changes include accessibility checks and visual evidence.
- Instrumentation is implemented and verified when required.
- No unrelated work or undocumented compatibility decision remains.

## Branches and pull requests

Humans use `<type>/<issue>-<slug>`. Coding agents use `codex/<type>-<issue>-<slug>`. Allowed types are `feat`, `fix`, `docs`, `refactor`, `test` and `chore`.

Every pull request includes `Closes #<issue>`, a concise outcome, architecture impact, executed tests, visual evidence when relevant and an explicit list of deferred work.

## Labels

- `type:*` identifies the nature of work.
- `area:*` identifies the affected subsystem.
- `priority:*` communicates ordering.
- `status:needs-refinement`, `status:ready` and `status:blocked` communicate readiness.
- `needs-human` identifies a decision that only a person or external authority can provide.
- `agent:plan`, `agent:implement` and `agent:review` indicate a requested agent workflow.

Labels and Project columns are metadata, not automation. Active work requires an assignee, explicit invocation or an open linked pull request.

## Roadmap

The “Abyssal MVP” Project uses Status, Target Week, Area and Priority. Milestones represent Foundation and Weeks 1–4. Every MVP issue maps to one or more PRD sections and names its dependencies.
