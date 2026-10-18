#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

DEPLOY_DIR="${DEPLOY_DIR:-/opt/smart-agri-system}"
CURRENT_FILE="$DEPLOY_DIR/current-release"
PREVIOUS_FILE="$DEPLOY_DIR/previous-release"
COMPOSE_FILE="$DEPLOY_DIR/compose.prod.yml"
ENV_FILE="$DEPLOY_DIR/.env"

if [[ ! -r "$ENV_FILE" || ! -r "$COMPOSE_FILE" || ! -r "$CURRENT_FILE" || ! -r "$PREVIOUS_FILE" ]]; then
  echo "Compose, environment, or release state is missing in $DEPLOY_DIR." >&2
  exit 2
fi
rootless_socket="/run/user/$(id -u)/docker.sock"
if [[ -z "${DOCKER_HOST:-}" && -S "$rootless_socket" ]]; then
  export DOCKER_HOST="unix://$rootless_socket"
fi
env_mode="$(stat -c '%a' "$ENV_FILE")"
if [[ "$env_mode" != "600" && "$env_mode" != "400" ]]; then
  echo "The deployment .env file must have mode 600 or 400." >&2
  exit 2
fi

current_tag="$(cat "$CURRENT_FILE")"
target_tag="$(cat "$PREVIOUS_FILE")"
if [[ ! "$current_tag" =~ ^[0-9a-f]{40}$ || ! "$target_tag" =~ ^[0-9a-f]{40}$ ]]; then
  echo "Stored release tags must be full commit SHAs." >&2
  exit 2
fi
if [[ "$current_tag" == "$target_tag" ]]; then
  echo "Current and previous release tags are identical; refusing rollback." >&2
  exit 2
fi

COMPOSE=(docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE")
export IMAGE_TAG="$target_tag"
if ! "${COMPOSE[@]}" config --quiet; then
  echo "Compose validation failed for rollback target." >&2
  exit 1
fi
mapfile -t images < <("${COMPOSE[@]}" config --images)
for image in "${images[@]}"; do
  if ! docker image inspect "$image" >/dev/null 2>&1; then
    echo "Rollback image is not cached locally: $image. Restore GHCR access and pull it first." >&2
    exit 1
  fi
done

gateway_port="$(sed -n 's/^GATEWAY_HOST_PORT=//p' "$ENV_FILE" | tail -n 1)"
gateway_bind="$(sed -n 's/^GATEWAY_BIND_ADDRESS=//p' "$ENV_FILE" | tail -n 1)"
gateway_port="${gateway_port:-8080}"
gateway_bind="${gateway_bind:-127.0.0.1}"
if [[ ! "$gateway_port" =~ ^[0-9]{1,5}$ ]] || (( gateway_port < 1 || gateway_port > 65535 )); then
  echo "GATEWAY_HOST_PORT in .env must be a port from 1 to 65535." >&2
  exit 2
fi
if [[ "$gateway_bind" != "127.0.0.1" ]]; then
  echo "GATEWAY_BIND_ADDRESS must remain 127.0.0.1 for this deployment." >&2
  exit 2
fi

if ! "${COMPOSE[@]}" up --detach --no-build --pull never --wait --wait-timeout 180; then
  log_file="$DEPLOY_DIR/rollback-failure-${target_tag}.log"
  if "${COMPOSE[@]}" logs --no-color --tail 100 > "$log_file" 2>&1; then
    chmod 600 "$log_file"
  else
    rm -f -- "$log_file"
  fi
  echo "Rollback health checks failed; inspect restricted diagnostics on the VPS." >&2
  exit 1
fi

ready=0
for attempt in {1..30}; do
  if curl --fail --silent --max-time 5 "http://127.0.0.1:${gateway_port}/actuator/health/readiness" --output /dev/null; then
    ready=1
    break
  fi
  sleep 2
done
if (( ready == 0 )); then
  echo "Gateway readiness probe failed after rollback; release state was not changed." >&2
  exit 1
fi

printf '%s\n' "$current_tag" > "${PREVIOUS_FILE}.tmp"
chmod 600 "${PREVIOUS_FILE}.tmp"
mv -f -- "${PREVIOUS_FILE}.tmp" "$PREVIOUS_FILE"
printf '%s\n' "$target_tag" > "${CURRENT_FILE}.tmp"
chmod 600 "${CURRENT_FILE}.tmp"
mv -f -- "${CURRENT_FILE}.tmp" "$CURRENT_FILE"
echo "Rolled back to $target_tag; the previous release is $current_tag."
