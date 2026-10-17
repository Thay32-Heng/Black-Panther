#!/usr/bin/env bash
# Full verification gate. Runs until every stage is green.
# Usage: bash tools/verify_all.sh [rounds]
set -uo pipefail
cd "$(dirname "$0")/.."

ROUNDS="${1:-1}"
FAILED=0

stage() {
  local name="$1"; shift
  printf '\n=== %s ===\n' "$name"
  if "$@" >/tmp/gate.log 2>&1; then
    tail -3 /tmp/gate.log
    printf '  -> PASS\n'
  else
    printf '  -> FAIL\n'; tail -20 /tmp/gate.log
    FAILED=1
  fi
}

run_all() {
  stage "typecheck"        npx tsc --noEmit
  stage "lint"             npx eslint
  stage "unit tests"       npm test
  stage "resume build"     python3 tools/build_resume.py
  stage "production build" npx next build
}

for i in $(seq 1 "$ROUNDS"); do
  printf '\n########## ROUND %s ##########\n' "$i"
  FAILED=0          # reset per round, or one flake condemns every later round
  run_all
  [ "$FAILED" -eq 0 ] && break
done

printf '\n########## RESUME CONTENT GATE ##########\n'
python3 - <<'PY'
import re, zlib, sys
raw = open('public/resume.pdf','rb').read()
text = ''
for m in re.finditer(rb'stream\r?\n(.*?)\r?\nendstream', raw, re.S):
    try: s = zlib.decompress(m.group(1))
    except Exception: s = m.group(1)
    for hit in re.findall(r'\((?:[^()\\]|\\.)*\)\s*Tj', s.decode('latin-1')):
        text += hit[1:hit.rfind(')')] + '\n'
bad = [k for k in ('XX','XXX','MOCK','TODO','TBD','LOREM') if k in text.upper()]
print('placeholders in shipped PDF:', bad or 'NONE')
print('has real figure 15,689.7:', '15,689.7' in text)
sys.exit(1 if bad else 0)
PY
if [ $? -eq 0 ]; then printf '  -> PASS\n'; else printf '  -> FAIL\n'; FAILED=1; fi

printf '\n================================\n'
if [ "$FAILED" -eq 0 ]; then echo "ALL GREEN"; else echo "SOMETHING IS RED"; fi
exit $FAILED
