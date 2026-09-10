# ADR-0002: Pragmatic Clean Architecture

**Status:** Accepted  
**Date:** 2026-09-10  
**Decider:** Rafael Neves

## Context

The product combines a deterministic simulation with browser rendering, persistence, durable jobs and an unreliable AI boundary. Framework coupling would make the game harder to test and the fallback harder to trust, while ceremonial layering would threaten the four-week schedule.

## Decision

Apply Clean Architecture at actual external boundaries. Keep a pure domain package, application use cases and ports inside the API, and concrete delivery and infrastructure adapters outside them. Organize code by feature within those boundaries.

## Options considered

| Option                           | Testability | Initial speed | Long-term coupling |
| -------------------------------- | ----------- | ------------- | ------------------ |
| Framework-first application      | Medium      | High          | High               |
| Strict layer for every operation | High        | Low           | Low                |
| Pragmatic boundary-driven layers | High        | High          | Low                |

## Consequences

- Core rules run without Fastify, React, Phaser, PostgreSQL or AI.
- Ports are introduced only for real I/O or variability.
- Boundary tests become required CI evidence.
- Contributors must distinguish domain types from transport schemas.
