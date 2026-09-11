# ADR-0006: Google Gemini Flash Narrative Provider

**Status:** Proposed  
**Date:** 2026-09-10  
**Decider:** Rafael Neves  
**Issue:** [#3](https://github.com/rafaelfne/abyssal/issues/3)

## Context

The MVP needs a production narrative provider for short event narratives and bounded crew memories. The provider must support structured output, low latency and predictable cost while remaining behind the existing narrative port.

The server-authoritative deterministic engine remains responsible for all state transitions and numeric consequences. AI output is untrusted content and cannot choose gameplay consequences.

## Decision

Use the Google Gemini API with a Gemini Flash model for production narrative generation in the MVP.

The provider will be called only by the backend worker through the existing `NarrativeGenerator` port. The browser will never call Gemini directly and will never receive the API key.

The implementation must pin an exact Gemini Flash model identifier available to the `Abyssal` Google Cloud project. It must not use a `latest` alias. The exact identifier and its current price must be recorded before implementation begins.

## Account and billing boundary

Use a dedicated Google Cloud project named `Abyssal` for the MVP. Google One benefits are not treated as Gemini API credits.

The current account evidence records:

- Gemini API billing level: Paid 1;
- prepaid credit balance: R$30.00;
- automatic recharge: R$30.00 when the balance falls below R$1.00;
- monthly automatic recharge limit: R$60.00.

The billing account identifier and API key are operational secrets and must not be committed to the repository, issue body or ADR.

The monthly recharge limit is a billing safeguard, not an application budget. The application must enforce its own request, token and estimated-cost limits.

## Narrative boundary

- Send only bounded event context and approved narrative facts to Gemini.
- Request structured JSON matching the narrative contract.
- Validate the response with `@abyssal/contracts` before accepting it.
- Ignore or reject fields outside the approved narrative and memory schema.
- Never send or accept numeric consequences, state transitions or rule decisions through the model.
- Use the deterministic fallback when the provider is unavailable, times out, exceeds a budget, refuses, or returns invalid content.

## Runtime policy

- Configure the exact model identifier through backend environment configuration.
- Set a bounded request timeout compatible with the event interaction budget.
- Allow at most one retry for a transient provider failure.
- Enforce a per-request output-token limit.
- Enforce a per-session and application-level estimated-cost budget.
- Record provider, exact model identifier, latency, token usage, estimated cost, validation outcome and fallback use.
- Do not record API keys, resume tokens or unnecessary player-identifying data.

## Cost planning

The working MVP estimate assumes four narrative calls per session, approximately 1,500 input tokens and 350 output tokens per call. The implementation must replace this assumption with the exact selected-model pricing before production use.

For planning only, the current estimate is approximately 560 sessions per R$30.00 of credit. A safer operating forecast is 400 sessions per R$30.00, leaving margin for larger prompts, retries, pricing changes and currency variation.

At five sessions per user per month, that forecast corresponds to approximately 80 users per R$30.00 credit. The automatic recharge limit of R$60.00 would represent approximately 800 conservative sessions, or 160 users at five sessions each, if actual usage matches the forecast.

These figures are estimates, not guarantees. Actual cost depends on the selected model, tokenization, retries, prompt size, output size and provider pricing.

## Options considered

| Option                     | Advantages                                                                                    | Rejected or deferred because                                                    |
| -------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Google Gemini Flash        | Structured JSON output, suitable latency and low expected cost for short narrative generation | Selected; exact model and price still require confirmation                      |
| OpenAI economical model    | Mature structured-output tooling and Zod integration                                          | Deferred because the project already has Gemini billing configured              |
| Anthropic economical model | Strong narrative quality and structured output support                                        | Deferred because it would require a separate provider account and billing setup |

## Security and privacy

- Store the Gemini API key only in local secret storage and Railway backend secrets.
- Restrict the key to the Generative Language API or use the provider's current authorization-key flow.
- Do not expose the key in Vite, React, Phaser, browser storage, logs or source control.
- Use synthetic prompts during development until data handling and retention are confirmed.
- Keep prompts free of direct personal data.
- Review the selected tier's data-use and retention terms before production traffic.

## Consequences

### Positive

- The MVP has one selected narrative provider and an existing billing project.
- Flash-class latency and pricing fit short event narratives.
- Structured output can map to the existing Zod contract.
- The provider remains replaceable because application code depends on a port.

### Negative

- The project depends on Google's API availability, limits and pricing.
- Prepaid credits expire and automatic recharge can create recurring charges.
- Exact model availability and pricing must be revalidated before implementation and launch.
- Provider-specific response behavior still requires validation and deterministic fallback.

## Verification before implementation

1. Confirm the exact Gemini Flash model identifier available in the `Abyssal` project.
2. Record current input and output prices for that identifier.
3. Confirm the billing mode, prepaid balance and automatic-recharge limit.
4. Recalculate cost using measured prompt and response sizes.
5. Confirm structured JSON output supports the narrative contract.
6. Confirm provider data-use and retention terms for the selected billing tier.

## Related decisions

- [ADR-0003: Server-Authoritative Deterministic Engine](0003-server-authoritative-deterministic-engine.md)
- [ADR-0004: Fastify, Drizzle and pg-boss Baseline](0004-fastify-drizzle-pg-boss.md)
