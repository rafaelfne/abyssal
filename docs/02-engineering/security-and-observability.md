# Security and Observability

## Security baseline

- Generate high-entropy anonymous resume tokens and persist only a cryptographic hash.
- Scope every expedition read and write by the resolved anonymous or future authenticated subject.
- Never place tokens in URLs, analytics, logs or narrative prompts.
- Validate request size, shape and allowed command type before application use cases.
- Rate-limit by session and network signals without treating IP addresses as identity.
- Keep AI provider credentials and database credentials server-only.
- Treat provider output as hostile data and reject unknown fields.
- Use dependency review and private vulnerability reporting.

## Observability baseline

Structured logs must correlate request, expedition and narrative job through non-secret identifiers. Record latency, outcome and error category without recording resume tokens or unnecessary narrative content.

Track the product events listed in the PRD with an explicit schema. AI telemetry includes provider, model, latency, estimated input and output tokens, estimated cost, validation outcome, retry count and fallback use.

## Reliability targets

- The deterministic action path does not wait for narrative completion.
- Job retries are bounded and idempotent.
- Failed narrative work resolves to predefined text.
- Health endpoints distinguish process health from future dependency readiness when operational needs require it.

Alert thresholds and provider-specific redaction rules belong to the deployment and AI provider decision issues.
