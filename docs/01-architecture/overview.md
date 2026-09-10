# Architecture Overview

## Goals

- Deliver a mobile-first MVP in four weeks without coupling game rules to presentation or infrastructure.
- Keep every session playable when AI is unavailable.
- Make deterministic behavior reproducible and auditable.
- Minimize operated services while preserving replaceable boundaries.
- Make cost, latency and failure observable at the AI boundary.

## System context

```text
Player
  │
  ▼
React interface ── Phaser renderer
  │
  ▼
Fastify HTTP API
  │
  ├── Application use cases ── Deterministic domain
  │
  ├── Drizzle adapter ── PostgreSQL
  └── pg-boss adapter ── Narrative worker ── AI provider
```

The browser sends intent and renders authoritative snapshots. Phaser emits interaction intent and displays the map; React owns interface state, navigation and accessibility. The API validates requests, invokes use cases and returns transport contracts from `@abyssal/contracts`.

## Runtime components

### Web application

The Vite PWA contains React features, shared interface elements and a Phaser rendering adapter. It may cache static assets and local presentation preferences. It must not calculate authoritative state or persist a competing expedition copy.

### API and worker

Fastify is the HTTP delivery adapter and the application composition root. The same application can start a worker process that consumes pg-boss jobs. Use cases define ports for persistence, queues, narrative generation, time and randomness when those boundaries become necessary.

### Deterministic domain

`@abyssal/domain` owns game state transitions, policies, invariants and domain events. It receives commands, a seeded random source and explicit time. It returns the next state and ordered facts without performing I/O.

### Contracts

`@abyssal/contracts` owns Zod schemas used across process boundaries and derives TypeScript types from those schemas. Domain objects do not become transport contracts implicitly.

### Data and jobs

PostgreSQL stores authoritative expeditions and pg-boss jobs. Drizzle owns application migrations and typed queries. The queue adapter provides durability, idempotency and retry behavior without leaking pg-boss types into application use cases.

### AI

The application sends bounded facts to a narrative port. A provider adapter parses all responses through Zod. A deterministic fallback implements the same port. Numeric state changes never enter through the AI response.

## Public foundation interface

`GET /health` returns:

```json
{
  "service": "abyssal-api",
  "status": "ok",
  "version": "0.1.0"
}
```

Gameplay endpoints are introduced only by approved feature issues.

## Decisions

- [ADR-0001: pnpm and Turborepo monorepo](decisions/0001-pnpm-turborepo-monorepo.md)
- [ADR-0002: Pragmatic Clean Architecture](decisions/0002-pragmatic-clean-architecture.md)
- [ADR-0003: Server-authoritative deterministic engine](decisions/0003-server-authoritative-deterministic-engine.md)
- [ADR-0004: Fastify, Drizzle and pg-boss baseline](decisions/0004-fastify-drizzle-pg-boss.md)

## Revisit after the MVP

Reassess service separation, queue infrastructure, offline synchronization and domain package distribution only when observed scale, reliability or team needs justify the additional operational cost.
