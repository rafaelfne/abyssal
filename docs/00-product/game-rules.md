# Authoritative Game Rules

## Purpose

This document is the source of truth for exact deterministic simulation behavior. The PRD defines product intent; this document defines implementable game rules after balancing decisions are approved.

## Fixed invariants

- The server owns the authoritative expedition state.
- Every expedition begins with exactly three crew members in the MVP.
- The only resources are power, oxygen, food and recovered materials.
- The only global priorities are survival, power, research and exploration.
- The deterministic engine selects triggers and computes every numeric consequence.
- AI text cannot add entities, actions, resources or state changes.
- An AI failure never blocks a cycle or player decision.
- A recorded cycle can be replayed from its initial state, seed and ordered commands.

## Required balancing decisions

Before the first gameplay engine issue becomes ready, its issue must record:

- Initial and bounded values for every resource and crew need.
- Cycle duration and action ordering.
- Production, consumption and repair values.
- Need thresholds and automatic task precedence.
- Morale and safety effects.
- Event trigger weights and cooldowns.
- Expedition completion and failure conditions.

These values must not be introduced as unexplained constants. Once accepted, update this document in the same pull request as the implementation.

## Consequence authority

An event definition contains allowed choices and deterministic effects. The engine applies those effects before narrative generation. The AI request contains the resulting facts; the validated response may only provide narrative and bounded memory text.

## Versioning

Persisted expeditions carry a rules version. A rules change must state whether existing expeditions continue on their original version, migrate, or restart. The implementing issue owns that compatibility decision.
