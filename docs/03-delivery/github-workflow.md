# GitHub Delivery Workflow

## Sources of truth

Issues describe bounded work and link to authoritative product documents. Pull requests deliver one approved outcome. The public GitHub Project visualizes roadmap state but does not replace issue content or start agent work.

## Lifecycle and Project Stages

Tracked work moves sequentially through five defined GitHub Project stages:

1. **Refining**: Captured issue is being analyzed, drafted, or awaiting human decisions (`needs-human`).
2. **Ready**: Issue satisfies the Definition of Ready (`status:ready`) with resolved scope and dependencies.
3. **In Progress**: Active implementation on a feature branch (`<type>/<issue>-<slug>`).
4. **InReview**: Linked pull request (`Closes #<issue>`) is open, passing checks, and awaiting Rafael's review.
5. **Done**: Pull request is squash-merged, issue is closed, and value is delivered on `main`.

## Copilot Issue Assignment Workflow

When Copilot (or Copilot Cloud Agent) is assigned directly to an issue on GitHub:

1. **Initial Assessment (`Refining`)**:
   - Read the issue body, linked product specifications (`docs/00-product/`), architecture decisions (`docs/01-architecture/`), and existing implementation.
   - Evaluate the issue against the Definition of Ready.
2. **Handling Blockers and Questions (`Refining` + `needs-human`)**:
   - If product decisions, credentials, external facts, or acceptance criteria are missing or ambiguous:
     - Post a clear, structured comment on the issue detailing the exact questions and choices for Rafael.
     - Apply the `needs-human` label and keep or set the Project stage to `Refining`.
     - Stop execution and await a response from Rafael in the issue comments.
3. **Promoting to Ready (`Ready`)**:
   - Once all questions are resolved and all Definition of Ready requirements are satisfied:
     - Update the issue body with complete, testable criteria and scope boundaries.
     - Apply `status:ready` (removing `needs-human` and `status:needs-refinement`).
     - Set the Project stage to `Ready`.
4. **Implementation (`In Progress`)**:
   - When assigned to implement a `Ready` issue, set the Project stage to `In Progress`.
   - Create a branch off current `origin/main` using `<type>/<issue>-<slug>` (e.g. `feat/42-crew-needs`).
   - Implement the approved scope adhering to clean architecture and code standards.
   - Collect executed test evidence.
5. **Review and Verification (`InReview`)**:
   - Open a linked pull request (`Closes #<issue>`) reporting executed check results.
   - Move the Project item and pull request to `InReview`.
   - Address any review feedback or CI check failures on the branch while keeping the stage in `InReview`.
6. **Completion (`Done`)**:
   - Rafael explicitly approves and squash-merges the pull request.
   - Close the issue and set the Project stage to `Done`.

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

All branches (human contributors and AI agents) follow the convention `<type>/<issue>-<slug>`, such as `feat/42-crew-needs` or `fix/15-auth-token`. Allowed types are `feat`, `fix`, `docs`, `refactor`, `test` and `chore`.

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
