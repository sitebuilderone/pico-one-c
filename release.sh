#!/bin/bash
set -euo pipefail

THEME_DIR="$(cd "$(dirname "$0")" && pwd)"
STAGING_DIR="$(mktemp -d "${TMPDIR:-/tmp}/pico-one-c-release.XXXXXX")"
trap 'rm -rf "$STAGING_DIR"' EXIT

if [[ ! -s "$THEME_DIR/css-output/bundle.css" ]]; then
  echo 'Missing CSS. Run npm run build before packaging.' >&2
  exit 1
fi

mkdir "$STAGING_DIR/pico-one-c"
rsync -a --exclude='.git' --exclude='.DS_Store' --exclude='node_modules' \
  --exclude='*.zip' --exclude='.codex' --exclude='.agents' \
  "$THEME_DIR/" "$STAGING_DIR/pico-one-c/"
(
  cd "$STAGING_DIR"
  zip -qr pico-one-c.zip pico-one-c
)
mv "$STAGING_DIR/pico-one-c.zip" "$THEME_DIR/pico-one-c.zip"
echo "Created $THEME_DIR/pico-one-c.zip"
