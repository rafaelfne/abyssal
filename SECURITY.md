# Security Policy

## Supported versions

Only the latest commit on `main` is supported before the first public release. Release support rules will be documented when versioned releases begin.

## Reporting a vulnerability

Do not open a public issue. Use GitHub's private vulnerability reporting for this repository. Include affected behavior, reproduction steps, impact and any suggested mitigation.

The maintainer will acknowledge a report within five business days, assess severity and coordinate disclosure after a fix or documented risk decision.

## Security boundaries

- The API is authoritative for expedition state.
- Anonymous resume tokens are secrets and must not appear in URLs, logs or analytics.
- AI output is untrusted and cannot directly modify game state.
- Secrets stay in runtime environment configuration and never use the `VITE_` prefix.
- Logs and analytics must avoid narrative text, resume tokens and unnecessary user data.
