#!/usr/bin/env bash
#
# Remote deploy script executed on the VPS by .github/workflows/deploy.yml
# (via appleboy/ssh-action script_path). It only pulls + runs the image that
# CI already built and published to GHCR — it never builds.
#
# Expects these env vars to be forwarded over SSH (see the workflow `envs:`):
#   GHCR_TOKEN, GHCR_USER, IMAGE_TAG   image auth + tag to deploy
#   VPS_APP_DIR                        base dir on the VPS
#   GITHUB_REPO                        owner/repo, for the initial clone
#
# Safe to run more than once (the deploy retry re-invokes it): every step is
# idempotent and, thanks to `set -e`, a failed pull exits before the running
# app is touched, so production stays up.
set -euo pipefail

cd "$VPS_APP_DIR"

# Ensure the repo (compose file + .env.production + mongo-init) is present and current
mkdir -p production
cd production
if [ -d "santo-ambrosius" ] && [ ! -d "santo-ambrosius/.git" ]; then
  rm -rf santo-ambrosius
fi
if [ ! -d "santo-ambrosius" ]; then
  git clone "https://github.com/${GITHUB_REPO}.git" santo-ambrosius
fi
cd santo-ambrosius
git fetch origin
git reset --hard origin/main

# Restore .env.production from parent if missing
if [ ! -f ".env.production" ] && [ -f "../.env.production" ]; then
  cp ../.env.production .env.production
fi
if [ ! -f ".env.production" ]; then
  echo "ERROR: .env.production not found at $(pwd)!"
  exit 1
fi

# Pre-deploy MongoDB snapshot (best-effort; keep the last 10)
mkdir -p ../backups
if docker exec santo-ambrosius-mongo sh -c \
    'mongodump --username admin --password "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin --archive --gzip' \
    > "../backups/mongo-$(date +%F-%H%M%S).gz"; then
  echo "Pre-deploy MongoDB backup written."
else
  echo "WARNING: pre-deploy backup failed; continuing."
fi
ls -1t ../backups/mongo-*.gz 2>/dev/null | tail -n +11 | xargs -r rm -f || true

# Authenticate and pull the published image. With `set -e`, a failed
# pull exits here BEFORE touching the running app, so prod stays up.
echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USER" --password-stdin
export APP_IMAGE_TAG="$IMAGE_TAG"
docker compose -f docker-compose.yml pull app

# Recreate only the app container from the new image. Mongo and its
# named volume are untouched (no `down`, never `-v`).
docker compose -f docker-compose.yml up -d
docker logout ghcr.io || true

docker compose -f docker-compose.yml ps
