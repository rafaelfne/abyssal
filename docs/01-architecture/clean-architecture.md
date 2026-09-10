# Clean Architecture

## Dependency rule

Dependencies point toward policy:

```text
delivery and presentation → application → domain
infrastructure adapters  → application ports
web and API              → transport contracts
```

The domain cannot depend on applications, transport schemas, frameworks or external packages. Contracts cannot depend on either application. The web application cannot import API internals.

## Domain

The domain contains entities, value objects, deterministic policies and domain events. Domain functions receive every value that can vary between runs, including time and seeded randomness. They perform no I/O and return explicit outcomes.

Expected rule failures are values with meaningful names, not thrown infrastructure exceptions. Do not add framework decorators, database records or Zod schemas to domain objects.

## Application

Application use cases coordinate domain behavior and define ports next to the code that consumes them. A port exists for a current external boundary, not as a generic abstraction exercise.

Use cases own transaction intent, authorization intent, idempotency intent and the ordering of external effects. They do not know Fastify, Drizzle, pg-boss, Phaser or a specific AI SDK.

## Adapters

Inbound adapters validate transport data and translate it into application input. Outbound adapters implement application ports for PostgreSQL, jobs, AI, telemetry and other services.

Adapters translate vendor errors into application-level failures. Vendor response types do not cross the adapter boundary.

## Composition

The API composition root creates concrete adapters and injects them into use cases. Do not use global service locators or import initialized infrastructure from inner layers.

## Frontend

Organize the web application by user-facing feature. React owns navigation, accessibility and interface composition. Phaser owns rendering, camera and pointer gestures. Phaser communicates through typed intents and snapshots rather than mutating React or server state directly.

## Pragmatic limits

- Do not create an interface for a pure function with one implementation.
- Do not create generic repositories that erase domain language.
- Do not split code into a new package without an independent dependency or lifecycle boundary.
- Do not introduce an event bus for local function calls.
- Extract shared code only after its semantics are genuinely shared.

## Enforcement

Dependency Cruiser enforces package-level boundaries and circular-dependency rules. TypeScript runs in strict mode. Tests prove deterministic behavior, adapter translation and contract validation. Architectural exceptions require an ADR and cannot be hidden by a lint suppression.
