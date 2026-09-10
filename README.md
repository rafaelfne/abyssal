# Abyssal Colony Manager

A mobile-first web management and survival game set on a floating research station above an alien ocean. The player manages resources, modules and three crew members while deterministic systems produce consequences and AI adds bounded narrative context.

The repository is an open-source product engineering project maintained by Rafael Neves with support from coding agents.

## Current state

The project foundation is operational. The web application is a non-playable commissioning shell, the API exposes only `GET /health`, and gameplay is delivered through the [MVP roadmap](docs/03-delivery/github-workflow.md).

## Quick start

Requirements:

- Node.js 22
- Corepack
- PostgreSQL 16 or newer for migrations

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

The web app runs at `http://localhost:5173` and the API at `http://localhost:3001`.

Run the complete local verification suite:

```bash
pnpm check
pnpm build
pnpm test:e2e
```

Apply database migrations:

```bash
cp apps/api/.env.example apps/api/.env
pnpm --filter @abyssal/api db:migrate
```

## Documentation

- [Accepted product requirements](docs/00-product/prd.md)
- [Authoritative game rules](docs/00-product/game-rules.md)
- [Architecture overview](docs/01-architecture/overview.md)
- [Engineering standards](docs/02-engineering/code-standards.md)
- [GitHub delivery workflow](docs/03-delivery/github-workflow.md)
- [Contributing](CONTRIBUTING.md)
- [Security policy](SECURITY.md)

## License

[MIT](LICENSE)
