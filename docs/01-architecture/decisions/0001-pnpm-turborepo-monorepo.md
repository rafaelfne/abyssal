# ADR-0001: pnpm and Turborepo Monorepo

**Status:** Accepted  
**Date:** 2026-09-10  
**Decider:** Rafael Neves

## Context

The MVP has a web application, an API and independently testable domain and transport boundaries. It must ship in four weeks and remain approachable to external contributors.

## Decision

Use one repository with pnpm workspaces and Turborepo. Keep deployable applications under `apps`, reusable runtime packages under `packages` and shared build configuration under `tooling`.

## Options considered

| Option               | Complexity    | Build coordination            | Boundary clarity                         |
| -------------------- | ------------- | ----------------------------- | ---------------------------------------- |
| Single application   | Low initially | Simple                        | Poor for domain and transport separation |
| pnpm workspaces only | Low           | Manual scripts                | Good                                     |
| pnpm with Turborepo  | Medium-low    | Cached dependency-aware tasks | Good                                     |

## Consequences

- One lockfile and command surface support all components.
- Package boundaries are visible and testable.
- Turborepo adds configuration and cache behavior that contributors must understand.
- Applications may be deployed separately without splitting repositories.
