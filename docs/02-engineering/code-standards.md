# Code Standards

## Principles

- Optimize for clear domain language and observable behavior.
- Keep functions focused on one outcome without arbitrary line-count limits.
- Prefer immutable values and pure transformations in the domain.
- Validate unknown data exactly once at each boundary.
- Make illegal states difficult to represent with discriminated unions and constrained value objects.
- Avoid `any`, unsafe casts, hidden global state and boolean parameters with unclear meaning.
- Delete dead code instead of preserving speculative extension points.

## Naming and modules

Use English names. Name commands as actions, events as facts that happened and ports by the capability the application needs. Keep exports narrow and avoid default exports except tool configuration files.

Feature modules may contain domain, application and adapter substructure when the feature becomes large enough. Do not create horizontal dumping grounds named `helpers`, `utils` or `common`.

## Errors

Represent expected domain and application failures explicitly. Throw only for programming errors, unavailable infrastructure or a failed invariant at a trusted boundary. Translate vendor and database errors before they leave an adapter.

Do not expose stack traces, SQL details, provider payloads, secrets or resume tokens to clients.

## Comments

Code contains no explanatory comments, headers, JSDoc or JSX comments. Improve names and structure or record external reasoning in documentation. Tool-required suppression directives need an adjacent `reason:` directive and must be the narrowest possible exception.

## Dependencies

Add a dependency only when it removes meaningful implementation or operational risk. Record durable technology changes in an ADR. Keep production dependencies in the consuming workspace and commit the lockfile.

## Formatting and static analysis

Prettier owns formatting. ESLint owns language rules. TypeScript strict mode owns type safety. Dependency Cruiser owns package boundaries. Project scripts own the comment and documentation policies.
