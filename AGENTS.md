<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Working Agreement (Definition of Done) — ALWAYS FOLLOW

This is the required flow for every feature, fix, or change. Do not skip steps.

1. **Do it carefully, not fast.** Quality over speed. "I need the perfect, not fastly."
2. **Verify in a loop until it works smoothly.** Actually test, observe, adjust, re-test. Do not declare done on intent.
3. **Fix bugs/errors BEFORE and AFTER.** Run lint, typecheck, production build, and the audit/screenshot harnesses before asking to host/deploy. Never hand over something broken.
4. **Report every change.** When you add, remove, or modify anything, give the user a clear list of what changed and why.
5. **Never commit, push, or deploy unless the user explicitly asks.**
6. **Never touch the `main` branch.** Work happens on the agreed branch (currently `test01`).
7. Only send/host when it is clean, tested, and smooth.
