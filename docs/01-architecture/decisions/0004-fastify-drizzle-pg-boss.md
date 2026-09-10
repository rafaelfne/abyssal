# ADR-0004: Fastify, Drizzle and pg-boss Baseline

**Status:** Accepted  
**Date:** 2026-09-10  
**Decider:** Rafael Neves

## Context

The MVP needs a TypeScript API, validated JSON, PostgreSQL persistence and durable asynchronous AI work. Operating Redis in addition to PostgreSQL would add cost and deployment complexity.

## Decision

Use Fastify for HTTP delivery, Zod for boundary schemas, Drizzle with explicit SQL migrations for data access and pg-boss for durable jobs stored in PostgreSQL.

## Options considered

| Area  | Selected | Alternatives           | Primary trade-off                                                    |
| ----- | -------- | ---------------------- | -------------------------------------------------------------------- |
| HTTP  | Fastify  | Hono, NestJS           | Explicit and light without edge-first or framework-heavy constraints |
| Data  | Drizzle  | Prisma, direct SQL     | Typed explicit SQL with less generated runtime                       |
| Queue | pg-boss  | BullMQ, custom polling | One operated datastore instead of Redis or custom locking            |

## Consequences

- PostgreSQL is both the application database and queue dependency.
- Queue pressure must be isolated and observed.
- Vendor APIs remain behind ports so the choices can be replaced.
- A future scale threshold may justify a dedicated queue service.
