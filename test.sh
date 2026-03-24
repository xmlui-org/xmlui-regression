#!/bin/bash
# Regression test runner for xmlui-regression

APP_DIR="$(cd "$(dirname "$0")" && pwd)"
TRACE_TOOLS="$APP_DIR/trace-tools"

source "$TRACE_TOOLS/test-base.sh"
