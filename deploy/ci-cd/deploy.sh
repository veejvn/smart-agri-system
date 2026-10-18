#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

DEPLOY_DIR="${DEPLOY_DIR:-/opt/smart-agri-system}"
NEW_TAG="${1:-}"
GHCR_USERNAME="${2:-}"
CURRENT_FILE="$DEPLOY_DIR/current-release"
PREVIOUS_FILE="$DEPLOY_DIR/previous-release"
COMPOSE_FILE="$DEPLOY_DIR/compose.prod.yml"
ENV_FILE="$DEPLOY_DIR/.env"

if [[ ! "$NEW_TAG" =~ ^[0-9a-f]{40}$ ]]; then
  echo "Deployment tag must be a full 40-character lowercase commit SHA." >&2
  exit 2
fi
if [[ -z "$GHCR_USERNAME" ]]; then
  echo "GHCR username is required." >&2
  exit 2
fi
if [[ ! -r "$ENV_FILE" || ! -r "$COMPOSE_FILE" ]]; then
  echo "Deployment environment or Compose file is missing in $DEPLOY_DIR." >&2
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

read -r GHCR_TOKEN || {
  echo "GHCR token was not provided on stdin." >&2
  exit 2
}
if [[ -z "$GHCR_TOKEN" ]]; then
  echo "GHCR token was empty." >&2
  exit 2
fi

DOCKER_CONFIG="$(mktemp -d)"
chmod 700 "$DOCKER_CONFIG"
export DOCKER_CONFIG
cleanup() {
  rm -rf -- "$DOCKER_CONFIG"
}
trap cleanup EXIT
trap 'cleanup; exit 129' HUP
trap 'cleanup; exit 130' INT
trap 'cleanup; exit 143' TERM

if ! printf '%s' "$GHCR_TOKEN" | docker login ghcr.io --username "$GHCR_USERNAME" --password-stdin >/dev/null; then
  unset GHCR_TOKEN
  echo "GHCR authentication failed." >&2
  exit 1
fi
unset GHCR_TOKEN

COMPOSE=(docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE")
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

write_state() {
  local path="$1"
  local value="$2"
  local tmp="${path}.tmp"
  printf '%s\n' "$value" > "$tmp"
  chmod 600 "$tmp"
  mv -f -- "$tmp" "$path"
}

apply_release() {
  local tag="$1"
  export IMAGE_TAG="$tag"
  if ! "${COMPOSE[@]}" config --quiet; then
    echo "Compose validation failed for release $tag." >&2
    return 1
  fi
  if ! docker image inspect postgres:15-alpine >/dev/null 2>&1; then
    if ! docker pull postgres:15-alpine; then
      echo "The PostgreSQL image could not be pulled." >&2
      return 1
    fi
  fi
  if ! "${COMPOSE[@]}" pull --quiet api-gateway discovery-service auth-service user-service; then
    echo "One or more application images could not be pulled for release $tag." >&2
    return 1
  fi
  if ! "${COMPOSE[@]}" up --detach --no-build --pull never --wait --wait-timeout 180; then
    echo "Compose health checks failed for release $tag." >&2
    return 1
  fi
  for attempt in {1..30}; do
    if curl --fail --silent --max-time 5 "http://127.0.0.1:${gateway_port}/actuator/health/readiness" --output /dev/null; then
      return 0
    fi
    sleep 2
  done
  echo "Gateway readiness probe failed for release $tag." >&2
  return 1
}

capture_failure_logs() {
  local tag="$1"
  local log_file="$DEPLOY_DIR/deploy-failure-${tag}.log"
  if "${COMPOSE[@]}" logs --no-color --tail 100 > "$log_file" 2>&1; then
    chmod 600 "$log_file"
    echo "Failure diagnostics saved on the VPS in $log_file (mode 600)." >&2
  else
    rm -f -- "$log_file"
    echo "Deployment failed; Compose diagnostics could not be captured." >&2
  fi
  "${COMPOSE[@]}" ps --format 'table {{.Service}}\t{{.State}}\t{{.Health}}' >&2 || true
}

previous_tag=""
if [[ -f "$CURRENT_FILE" ]]; then
  previous_tag="$(cat "$CURRENT_FILE")"
  if [[ ! "$previous_tag" =~ ^[0-9a-f]{40}$ ]]; then
    echo "Stored current release is invalid; refusing to deploy." >&2
    exit 2
  fi
fi

if ! apply_release "$NEW_TAG"; then
  capture_failure_logs "$NEW_TAG"
  if [[ -n "$previous_tag" ]]; then
    echo "Attempting automatic recovery to the previous successful release." >&2
    if apply_release "$previous_tag"; then
      echo "Previous release restored; deployment job will still fail." >&2
    else
      capture_failure_logs "$previous_tag"
      echo "Automatic recovery failed; inspect the restricted VPS diagnostic logs." >&2
    fi
  else
    echo "No previous successful release exists for automatic recovery." >&2
  fi
  exit 1
fi

if [[ -n "$previous_tag" && "$previous_tag" != "$NEW_TAG" ]]; then
  write_state "$PREVIOUS_FILE" "$previous_tag"
fi
write_state "$CURRENT_FILE" "$NEW_TAG"
echo "Deployment $NEW_TAG is healthy."
