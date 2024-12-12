#!/bin/bash

# Kill processes on port 3000-3010
for port in {3000..3010}; do
  lsof -ti :$port | xargs kill -9 2>/dev/null || true
done

# Kill processes on specific ports
lsof -ti :5000-5010,8000-8010,3333 | xargs kill -9 2>/dev/null || true
