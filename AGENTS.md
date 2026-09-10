# Repository Constitution

These rules apply to humans and coding agents working in this repository.

## Authority

Use this order when sources disagree:

1. A human decision recorded in the authoritative documentation.
2. Documents under `docs/00-product/`.
3. Accepted architecture decision records.
4. The approved GitHub issue.
5. The current implementation.

Do not silently resolve a product contradiction in code. Record the decision in the appropriate source before marking an issue ready.

## Issue and pull request workflow

- Every tracked change starts from an approved GitHub issue.
- Do not implement an issue that does not satisfy the Definition of Ready.
- Keep one coherent product outcome per branch and pull request.
- Link the pull request to its issue and include executed verification evidence.
- Agents and external contributors must not merge without Rafael's explicit approval.
- Labels describe state or requested work. They do not start background work.

Read [the delivery workflow](docs/03-delivery/github-workflow.md) before planning or implementation.

## Architecture

- Keep the deterministic game domain free of frameworks, persistence, networks, system clocks and uncontrolled randomness.
- Keep React and Phaser free of business rules.
- Put orchestration in application use cases and external behavior behind ports.
- Treat all AI output as untrusted input. AI may write narrative and bounded memory text but cannot choose numeric consequences.
- Keep the API authoritative. The client retains only an opaque resume token.
- Add abstractions only for a present boundary or demonstrated variation.

Read [the architecture rules](docs/01-architecture/clean-architecture.md) before changing dependency boundaries.

## Code comments

Code has zero explanatory comments. Use names, types and extracted functions to make behavior clear. Put product and architectural reasoning in documentation, issues and pull requests.

The only permitted comments are tool-required directives:

- `@ts-expect-error`, `@ts-ignore` and `@ts-nocheck`
- `eslint-disable`, `eslint-disable-next-line` and `eslint-disable-line`
- `prettier-ignore`

Every permitted directive requires an adjacent `reason:` directive. Remove any other code comment encountered in changed code.

## Verification

Run checks proportional to the change and report only commands that actually ran. The complete foundation gate is:

```bash
pnpm check
pnpm build
pnpm test:e2e
```

Never commit secrets, generated reports, local environment files or dependency caches.
