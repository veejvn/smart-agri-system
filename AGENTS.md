# Repository Guidelines

## Project Structure & Module Organization

This repository contains a distributed agriculture platform. `backend/` holds eight independent Spring Boot services (`api-gateway`, `auth-service`, `user-service`, `crop-service`, `weather-service`, `forum-service`, `notification-service`, and `discovery-service`), each with its own `pom.xml` and `src/main` tree. `frontend/` is a Next.js app; its routes are in `src/app`, shared UI in `src/components`, and static assets in `public/`. `ai-service/app/` contains the FastAPI service. `docker/docker-compose.yml` defines local infrastructure and services. Architecture and security notes live in `docs/`.

## Build, Test, and Development Commands

- `docker compose -f docker/docker-compose.yml up -d` — start the local stack.
- `cd frontend; npm ci; npm run dev` — install frontend dependencies and run Next.js locally.
- `cd frontend; npm run build` — create a production frontend build; `npm run lint` runs ESLint.
- `cd backend/auth-service; mvn test` — run a service’s Maven tests; use the equivalent module directory for other services. `mvn package` builds that service.
- Run the Python service with `uvicorn app.main:app --reload` from `ai-service` after installing `requirements.txt`.

## Coding Style & Naming Conventions

Follow the neighboring code when editing: Java uses package paths under `com.agriculture`, PascalCase classes, and camelCase members; React/TypeScript uses PascalCase component names and camelCase variables. Keep components and service logic in their existing module directories. Use descriptive names, preserve existing formatting, and run `npm run lint` for frontend changes. No repository-wide formatter configuration was found.

## Testing Guidelines

Java services use Maven and Spring Boot’s test dependencies where configured; add tests under `src/test` and name them `*Test.java`. The frontend currently defines lint and build scripts but no test script. The AI service has no test runner configured in its requirements. Run the checks relevant to the changed module and report any unavailable checks.

## Commit & Pull Request Guidelines

Recent history includes `feat(...)`, `fix(...)`, and `docs(...)` subjects alongside merge commits. Prefer a concise type-prefixed subject, such as `fix(gateway): validate forwarded identity`. Pull requests should describe the change and affected service, link related issues when available, list validation commands and results, and include screenshots for visible frontend changes. Call out configuration or security impacts.

## Security & Configuration

Keep credentials and local overrides in `.env` or other ignored environment files; do not commit secrets. Check `docs/security/` and service-specific security documentation before changing authentication, identity headers, or service-to-service access.
