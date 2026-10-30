#!/usr/bin/env bash
# Restart the local production server on port 3100 (used by screenshots and smoke tests).
fuser -k 3100/tcp >/dev/null 2>&1
sleep 1
nohup npx next start -p 3100 > "${TMPDIR:-/tmp}/activesite-next.log" 2>&1 &
for i in $(seq 1 30); do curl -s -o /dev/null localhost:3100 && exit 0; sleep 1; done
echo "server did not start"; exit 1
