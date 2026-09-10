# Testing Strategy

## Priorities

1. Deterministic game rules and replay.
2. Anonymous expedition isolation and data integrity.
3. AI validation, fallback, idempotency and budget behavior.
4. Mobile interaction, accessibility and critical user flows.
5. Adapter and deployment smoke behavior.

## Test layers

### Unit

Use Vitest for domain policies, use cases, contract schemas and pure presentation behavior. The same state, seed, clock and commands must produce the same ordered result.

### Integration

Test Fastify through injection and adapters against PostgreSQL. Cover migrations from an empty database, transaction behavior, opaque-token isolation, pg-boss retry and idempotency, and translation of infrastructure failures.

### Contract

Validate every HTTP, job and AI payload with its owning Zod schema. Include rejected unknown, oversized and structurally invalid payloads.

### End to end

Use Playwright for critical mobile flows at 390×844, keyboard access, touch-sized targets, focus behavior, no horizontal overflow and fallback behavior. Real iOS Safari and Android Chrome checks are required before launch.

### Visual

Capture readable evidence for connected user-interface changes. Visual evidence supplements behavior assertions and does not replace them.

## Coverage policy

Do not optimize for a repository-wide percentage. Require complete branch coverage for deterministic consequence policies, authorization and budget enforcement. Test observable behavior rather than framework implementation details.

## Required regression scenarios

- AI unavailable, slow, malformed and over budget.
- Duplicate command and duplicate narrative job.
- Resume token for a different expedition.
- Resource and need values at minimum and maximum bounds.
- The same seed replayed after process restart.
- Narrow viewport, reduced motion and keyboard-only navigation.
