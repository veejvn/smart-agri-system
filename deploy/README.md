# Deployment (Kubernetes)

Container images are built and pushed to GHCR by the `images` job in
`.github/workflows/ci.yml` on every push to `main`:

```
ghcr.io/<owner>/smart-agri-system/<service>:<sha>
ghcr.io/<owner>/smart-agri-system/<service>:latest
```

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
