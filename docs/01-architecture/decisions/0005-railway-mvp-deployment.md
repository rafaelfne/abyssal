# ADR-0005: Railway Deployment Topology for the MVP

**Status:** Accepted  
**Date:** 2026-09-10  
**Decider:** Rafael Neves  
**Issue:** #2

## Context

The Abyssal MVP requires four runtime components:

- a mobile-first React/Vite web application;
- a Fastify HTTP API;
- a persistent pg-boss worker for narrative jobs;
- PostgreSQL for authoritative expedition state and durable jobs.

The MVP must ship within four weeks, keep operational overhead low and preserve the architecture defined by ADR-0002, ADR-0003 and ADR-0004.

The API and worker both depend on PostgreSQL. pg-boss stores durable jobs in PostgreSQL, so operating a separate Redis service would add cost and operational complexity without a current product need.

## Decision

Use Railway as the deployment platform for the MVP web application, Fastify API, pg-boss worker and managed PostgreSQL database.

The deployment topology is:

```text
Railway project
├── Web service
│   └── Vite production build and static assets
├── API service
│   └── Fastify HTTP server
├── Worker service
│   └── pg-boss narrative job consumer
└── PostgreSQL service
    ├── Authoritative expedition state
    └── Durable pg-boss jobs
```
