#!/usr/bin/env bash
root="$(git rev-parse --show-toplevel)"
cd "$root" || exit 1

[ ! -d node_modules ] && npm install
npm run build:publications
