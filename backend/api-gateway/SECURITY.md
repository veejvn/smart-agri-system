# Gateway JWT handling

The API gateway requires an `Authorization: Bearer <JWT>` header on protected routes. It validates the JWT signature and expiration using the same Base64-decoded HS256 `app.jwt.secret` as auth-service; a missing, malformed, invalid, or expired token receives HTTP 401.

These paths are public and do not require a token:

- `/api/auth/**`
- `/error`
- `/actuator/health` and `/actuator/health/**`

Before forwarding, the gateway removes every client-supplied header whose name begins with `X-User-` (case-insensitively). For authenticated requests it sets identity headers from JWT claims:

- `X-User-Id`: `userId` claim (with `id` as a compatibility fallback)
- `X-Username`: `sub` claim (with `username` as a fallback)
- `X-Roles`: `roles` claim, serialized as comma-separated values when it is an array

Claim assumption: T1 access tokens provide `userId` and `roles` claims, with the username in `sub` or `username`. The gateway does not query auth-service to supplement missing claims. `APP_JWT_SECRET` can override this service's default secret; configure it to the same value used by auth-service. The current auth-service configuration stores the shared secret as a Base64-compatible string and decodes it with JJWT's Base64 decoder.
