# Copilot Repository Instructions

This repository follows strict Clean Architecture rules, deterministic domain logic, and a structured GitHub delivery workflow.

## Project Stages

Issues move through 5 GitHub Project stages: `Refining` > `Ready` > `In Progress` > `InReview` > `Done`.

## Copilot Issue Assignment Protocol

When assigned directly to an issue on GitHub:

1. **Refining (`Refining`)**:
   - Analyze the issue body, authoritative specifications in `docs/00-product/`, architecture guidelines in `docs/01-architecture/`, and current code.
   - Evaluate against the **Definition of Ready** (`docs/03-delivery/github-workflow.md`).
   - If questions, ambiguities, or missing human decisions exist:
     - Post a structured comment on the issue with specific questions and choices for Rafael.
     - Apply the `needs-human` label and keep/set the Project stage to `Refining`.
     - Stop execution and await Rafael's response in issue comments.
2. **Ready (`Ready`)**:
   - Once all questions are resolved and the Definition of Ready is met, update the issue body with complete, testable criteria and scope boundaries.
   - Apply `status:ready` (removing `needs-human` / `status:needs-refinement`) and set the Project stage to `Ready`.
3. **In Progress (`In Progress`)**:
   - When assigned to implement a `Ready` issue, set the Project stage to `In Progress`.
   - Create a branch off `origin/main` using `<type>/<issue>-<slug>` (e.g. `feat/42-crew-needs`).
   - Implement the approved scope following Clean Architecture and repository rules.
4. **In Review (`InReview`)**:
   - Open a pull request linking the issue (`Closes #<issue>`) with executed test evidence.
   - Set the Project stage to `InReview`.
   - Fix review feedback or CI check failures on the branch while keeping the stage in `InReview`.
5. **Done (`Done`)**:
   - Wait for Rafael's explicit approval and squash merge. Never merge pull requests directly.

## Architecture and Code Rules

- **Deterministic Domain**: No frameworks, persistence, network, or system clocks in `@abyssal/domain`.
- **Zero Explanatory Comments**: Code must contain no comments except tool directives (`@ts-expect-error`, `@ts-ignore`, `@ts-nocheck`, `eslint-disable`, `prettier-ignore`), each requiring an adjacent `reason:` directive.
- **Verification**: Run `pnpm check`, `pnpm build`, and `pnpm test:e2e` to verify changes.
