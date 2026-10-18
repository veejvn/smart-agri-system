# Render Deployment Implementation Plan

> **For agentic workers:** Inline execution was selected because the repository owner requested implementation directly.

**Goal:** Add a Render Blueprint for the minimal backend stack and document safe setup and operations.

**Architecture:** Define the public API Gateway as the only web service, internal services as private services, and two managed PostgreSQL databases. Use Render private host references and secret environment variables without changing VPS Compose.

**Tech Stack:** Render Blueprint YAML, existing Spring Boot Dockerfiles, Render managed PostgreSQL.

---

### Task 1: Verify Render Blueprint constraints and existing application settings

**Files:** Read existing Dockerfiles, selected Spring configs, production Compose, and deployment docs.

- [x] Confirm Docker contexts and internal ports.
- [x] Confirm Spring env names, health endpoints, and JWT format.
- [x] Confirm Render Blueprint field names and service/database references from official documentation.

### Task 2: Add minimal Render service declaration

**Files:** Create `render.yaml`.

- [x] Define exactly one public Gateway, three private Spring services, and two PostgreSQL databases.
- [x] Connect services through Render internal host/database properties.
- [x] Require the JWT key and CORS origin without hardcoded secrets.
- [x] Preserve existing ports and health endpoints.

### Task 3: Document Render setup and limitations

**Files:** Create `deploy/render/README.md`.

- [x] Document Blueprint setup, secrets, region, deploy, logs, health, and costs/limitations without promising free hosting.
- [x] Document that other services remain out of scope and VPS Compose remains separate.

### Task 4: Validate changes

- [x] Parse YAML and check the expected service graph and all cross-resource references.
- [x] Build all four Docker images using the contexts and Dockerfiles specified by the Blueprint.
- [x] Record that the Render CLI validator and a real Render account deploy were unavailable/not run.
