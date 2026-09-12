# Contributing

Thank you for helping build Abyssal Colony Manager.

## Before contributing

1. Read the [product requirements](docs/00-product/prd.md), [architecture](docs/01-architecture/overview.md) and [delivery workflow](docs/03-delivery/github-workflow.md).
2. Search existing issues and discussions before proposing new work.
3. Use the matching issue form. A maintainer will refine and mark executable work as `status:ready`.
4. Do not begin implementation until the issue satisfies the Definition of Ready.

## Development

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm build
```

Use Node.js 22 and the pnpm version declared in `package.json`. Keep changes focused and do not add dependencies without explaining the trade-off in the issue or an ADR.

## Branches and commits

All contributors (humans and coding agents) use `<type>/<issue>-<short-slug>`, such as `feat/42-crew-needs` or `fix/15-auth-token`. Allowed types are `feat`, `fix`, `docs`, `refactor`, `test` and `chore`.

Use Conventional Commit subjects. Pull requests are squash-merged after all required checks, resolved conversations and explicit maintainer approval.

## Pull requests

- Link the issue with `Closes #<number>`.
- Explain the observable outcome and architectural impact.
- Include executed test commands and visual evidence for user-interface changes.
- Update product documentation or ADRs when a durable rule changes.
- Keep unrelated cleanup outside the pull request.

Security vulnerabilities must follow [the private reporting process](SECURITY.md), not a public issue.
