# Minimal production Compose deployment

This directory contains a separate Docker Compose deployment for the first VPS
milestone. It runs the API Gateway, Eureka, Auth, User, and one PostgreSQL
instance for each of Auth and User. Existing Kubernetes manifests and the larger
development Compose stacks remain available and unchanged.

## Architecture

All six containers attach to the Compose `backend` bridge network, which is
marked `internal`. Compose DNS names (`discovery-service`, `postgres-auth`, and
`postgres-user`) provide service discovery; no fixed addresses are used.
PostgreSQL volumes persist independently as `auth-postgres-data` and
`user-postgres-data`. Only `api-gateway` publishes a port, bound by default to
`127.0.0.1:8080`. The registry and application ports are not published on the
host. There is no host-facing Docker network because a host reverse proxy can
reach the loopback-bound Gateway directly.

The Gateway routes `/api/auth/**` to `auth-service` and `/api/users/**` to
`user-service` through Eureka. Other platform services, Kafka, MongoDB, Redis,
the AI API, and the frontend are later deployment phases and are not started
here. Their Gateway routes are not enabled in this minimal profile.

## Prerequisites

- Linux VPS with Docker Engine and the Docker Compose v2 plugin.
- Git checkout containing this repository; Docker builds use local source.
- OpenSSL for generating random credentials.
- A frontend origin name for CORS. The frontend itself is not deployed here.
- Host-level HTTPS reverse proxy (for example, a separately managed Nginx or
  Caddy installation) if this Gateway will serve Internet traffic. Configure
  its upstream as `http://127.0.0.1:8080`, and keep the Gateway bind address on
  loopback.

## Environment configuration

Create the private environment file on the VPS:

```sh
cp deploy/compose/.env.example deploy/compose/.env
chmod 600 deploy/compose/.env
```

Edit `deploy/compose/.env` and set every required value. Generate separate
database passwords and URL-safe Eureka credentials with `openssl rand -hex 32`
(the Eureka username can use `openssl rand -hex 12`). The current clients put
Eureka credentials in the registry URL, so use only URL-safe alphanumeric
credentials for `EUREKA_USER` and `EUREKA_PASSWORD`. Generate the shared JWT
secret with:

```sh
openssl rand -base64 32
```

The JWT value must be valid Base64 that decodes to at least 32 random bytes.
Copy the same `APP_JWT_SECRET` to the Auth and Gateway configuration. Do not
check in the completed `.env` file. Compose `.env` files are not a secret manager:
they are readable by Docker and anyone with sufficient host access. Keep the
file mode at `600`, restrict VPS accounts and backups, and plan migration to a
managed secret store if the deployment grows.

| Variable | Required | Purpose |
| --- | --- | --- |
| `AUTH_DB_USER` | Yes | PostgreSQL login and database owner for `auth_db`. |
| `AUTH_DB_PASSWORD` | Yes | Password for the Auth database role. |
| `USER_DB_USER` | Yes | PostgreSQL login and database owner for `user_db`. |
| `USER_DB_PASSWORD` | Yes | Password for the User database role. |
| `EUREKA_USER` | Yes | HTTP Basic username for the private registry. |
| `EUREKA_PASSWORD` | Yes | HTTP Basic password for the private registry. |
| `APP_JWT_SECRET` | Yes | Shared Base64 HS256 signing and validation key. |
| `CORS_ALLOWED_ORIGINS` | Yes | Exact browser origin(s), comma-separated if needed. |
| `GATEWAY_BIND_ADDRESS` | No | Host bind address; defaults to `127.0.0.1`. |
| `GATEWAY_HOST_PORT` | No | Host loopback port; defaults to `8080`. |

Database names and internal ports are verified fixed settings: `auth_db` and
`user_db`, each on PostgreSQL port `5432`. The services receive their database
host, port, and credentials through `DB_HOST`, `DB_PORT`, `DB_USER`, and
`DB_PASSWORD`; Eureka clients use `EUREKA_HOST`, `EUREKA_USER`, and
`EUREKA_PASSWORD`. These internal application settings are set by Compose and do
not need duplicate entries in `.env`.

Compose rejects empty required variables. A malformed JWT key also prevents the
applications from signing or validating tokens at startup or request time.

## Validate, build, and start

From the repository root, validate the Compose model without printing resolved
environment values:

```sh
docker compose --env-file deploy/compose/.env -f deploy/compose/compose.prod.yml config --quiet
```

In this repository checkout, Compose configuration was parsed with a temporary
non-production test environment. The check confirmed the six intended services,
the sole Gateway host port, both named database volumes, the internal backend
network, and rejection of empty required variables. Docker image builds and live
container health checks were not run in that environment because its Docker
Engine was unavailable; Maven builds were not run because Maven was not installed.

Build the four local Spring Boot images and start the minimal stack:

```sh
docker compose --env-file deploy/compose/.env -f deploy/compose/compose.prod.yml up --build -d
```

PostgreSQL health checks wait for each configured database to accept connections.
Auth and User wait for their database and the authenticated Eureka health check;
the Gateway waits for Eureka and both application readiness checks. Auth and
User readiness include the database health indicator, so they do not report
ready before their database is available. All Spring images run as a non-root
user and include `curl` for their container health checks.

Inspect container state and health without dumping the resolved Compose config:

```sh
docker compose --env-file deploy/compose/.env -f deploy/compose/compose.prod.yml ps
docker compose --env-file deploy/compose/.env -f deploy/compose/compose.prod.yml logs --tail=100
curl --fail http://127.0.0.1:8080/actuator/health
```

Only `/actuator/health` on the Gateway is intentionally reachable through its
published loopback port; it reports status without detailed component data. The
Eureka dashboard and its health endpoint are private to the Docker network.

Stop containers while retaining named database volumes:

```sh
docker compose --env-file deploy/compose/.env -f deploy/compose/compose.prod.yml down
```

Do not add `--volumes`/`-v` when stopping a deployment that should retain data.

## Database backup and restore

Create plain SQL backups on the host. The commands use the role and database
names already present inside each PostgreSQL container, so no password appears
in the command line:

```sh
docker compose --env-file deploy/compose/.env -f deploy/compose/compose.prod.yml exec -T postgres-auth sh -c 'pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB"' > auth_db.sql
docker compose --env-file deploy/compose/.env -f deploy/compose/compose.prod.yml exec -T postgres-user sh -c 'pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB"' > user_db.sql
```

Restore each dump into an empty target database after stopping the corresponding
application service and confirming the dump is from the intended environment.
Do not pipe a dump into a populated database as a replacement strategy; use a
reviewed restore procedure and take a current backup first:

```sh
docker compose --env-file deploy/compose/.env -f deploy/compose/compose.prod.yml stop auth-service
cat auth_db.sql | docker compose --env-file deploy/compose/.env -f deploy/compose/compose.prod.yml exec -T postgres-auth sh -c 'psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" "$POSTGRES_DB"'

docker compose --env-file deploy/compose/.env -f deploy/compose/compose.prod.yml stop user-service
cat user_db.sql | docker compose --env-file deploy/compose/.env -f deploy/compose/compose.prod.yml exec -T postgres-user sh -c 'psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" "$POSTGRES_DB"'
```

Store backups outside the VPS or on encrypted, access-controlled storage and
test restores periodically. The Compose volumes are persistence, not backups.

## Ports and limitations

The only published port is `127.0.0.1:${GATEWAY_HOST_PORT:-8080}` to container
port `8080`. Container ports `8761`, `8081`, `8082`, and database port `5432`
remain private. Do not change `GATEWAY_BIND_ADDRESS` to `0.0.0.0` unless a
separately reviewed network design requires it.

This is a single-host, single-instance setup. Compose `.env` values are not
managed secrets; there is no TLS termination, automated backup, database
migration framework, or deployment automation here. Auth and User currently use
Hibernate `ddl-auto: update`, which should be replaced with managed schema
migrations before relying on controlled production schema changes. Requests for
crop, weather, forum, notification, or AI features will not be served until those
services and their dependencies are included in later phases.

## Next deployment milestones

1. Provision and harden the VPS, install Docker, configure firewall rules, and
   deploy a host-level HTTPS reverse proxy to `127.0.0.1:8080`.
2. Add tested backup scheduling, off-host retention, monitoring, alerting, and a
   secret-management strategy.
3. Add schema migrations and review single-host resource limits and recovery.
4. Design later phases for the remaining microservices and their data stores.
5. Implement CI/CD and controlled VPS deployment in a separate task.
