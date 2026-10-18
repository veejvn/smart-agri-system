# Deployment (Kubernetes)

The CI workflow builds and pushes only the four services in the minimal
production Compose deployment after all required test jobs pass on a push to
`main`. Images are tagged with the full commit SHA; the production workflow does
not publish or deploy `latest`:

```
ghcr.io/veejvn/smart-agri-system/<service>:<full-commit-sha>
```

The Compose VPS rollout and rollback procedures are documented in
[`ci-cd/README.md`](ci-cd/README.md). The Kubernetes manifests below remain
unchanged. They include additional services which are outside this CI/CD
deployment milestone; those images must be published by a later pipeline before
applying the staging overlay.

## Apply with Kustomize

```bash
kubectl apply -k deploy/k8s/overlays/staging
```

Render locally without a cluster:

```bash
kubectl kustomize deploy/k8s/overlays/staging
```

Layout:

- `base/` — namespace, shared ConfigMap + Secret, and one Deployment + Service per
  backend service (discovery-service, api-gateway, auth-service, user-service,
  crop-service, weather-service, forum-service, notification-service).
- `overlays/staging/` — sets the image tag and replica counts for staging.

## Configuration and secrets

Non-secret configuration lives in the `smart-agri-config` ConfigMap; secrets in
`smart-agri-secrets`. The committed secret values are **placeholders** — never
commit real secrets. In a real environment source them from an external secret
manager, for example:

- External Secrets Operator backed by AWS Secrets Manager / GCP Secret Manager, or
- HashiCorp Vault (Agent injector or CSI driver), or
- Sealed Secrets.

Required secret keys: `APP_JWT_SECRET` (64 hex chars, shared by api-gateway and
auth-service), `EUREKA_PASSWORD`, `DB_PASSWORD`, `MONGO_PASSWORD`.

## Infrastructure assumptions

PostgreSQL (`postgres-auth`, `postgres-user`, `postgres-crop`,
`postgres-notification`), MongoDB (`mongodb`) and Kafka (`kafka`) are expected to
be reachable in the namespace (managed services or separate releases). This chart
does not deploy them. `api-gateway` is exposed through a `LoadBalancer` Service on
port 80 → container 8080; the other services are cluster-internal.

## Health probes

Every Deployment uses the Spring Boot actuator probe groups enabled in Phase 5:

- readiness: `/actuator/health/readiness`
- liveness: `/actuator/health/liveness`
