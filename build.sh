#!/bin/sh

set -e

OUTFILE="date-extensions.min.js"

echo "Building $OUTFILE..."

npx esbuild src/date-extensions.js \
    --bundle \
    --minify \
    --platform=browser \
    --outfile="$OUTFILE"

echo "Done: $OUTFILE ($(wc -c < "$OUTFILE") bytes)"
