# ADR-0003: Server-Authoritative Deterministic Engine

**Status:** Accepted  
**Date:** 2026-09-10  
**Decider:** Rafael Neves

## Context

Anonymous players need recoverable progress, deterministic fallback and consistent consequences. The PRD permits AI narrative but prohibits AI control of core rules.

## Decision

Persist authoritative expedition state on the server and store only an opaque resume token in the browser. Make simulation results reproducible from initial state, rules version, seed and ordered commands. Calculate all numeric consequences before narrative generation.

## Options considered

| Option                            | Recovery | Integrity | Offline support | Complexity |
| --------------------------------- | -------- | --------- | --------------- | ---------- |
| Browser-authoritative             | Fragile  | Low       | High            | Low        |
| Dual local and server authority   | Complex  | Medium    | High            | High       |
| Server authority with local token | Strong   | High      | Low             | Medium     |

## Consequences

- A network connection is required for authoritative actions.
- Anonymous tokens require secret handling and isolation tests.
- AI latency and failure cannot block state progression.
- Offline-first synchronization remains outside the MVP.
