# Phase A — Architecture Blueprint & Post-Mortem

**Project:** Black Panther Portfolio (V2)
**Date:** 17 October 2026
**Branch:** `Hero+Panther`
**Status:** Phase A complete and verified. Nothing committed yet.

This document has two jobs:

1. Record what was built today and why it is shaped this way.
2. Record what our plan got wrong *before* we built, and the mistakes that
   happened *while* we built — so the same ones do not happen again.

---

## 1. What Phase A Actually Was

Not a redesign. Not a rebuild.

The portfolio already had **11 sections**, routing, SEO, API routes and tests.
Phase A did exactly one thing: it added her *visual language* — the design
system behind rinlayheang.me — **without touching a single line of the existing
hand-tuned CSS**.

### The core rule

```
ADDS ONLY. Every new class is namespaced `rin-`.
Her CSS must stay byte-identical forever.
```

Verified mechanically:

```bash
git diff --stat components/panther-dark/panther-dark.css app/globals.css
# → EMPTY
```

That command is the proof. If it ever prints a filename, the rule was broken.

---

## 2. Architecture

### 2.1 Why a separate file, not an edit to the existing one

The instinct is to open `panther-dark.css` and add rules at the bottom. That
was rejected because of **cascade order and blast radius**:

- One 6,649-line file means every new rule competes with every old rule in the
  same cascade context. A typo in a selector silently changes an existing card.
- A separate file gives us a **verifiable boundary**. We can ask "did we break
  anything?" and get a one-command answer.
- If Phase A ever has to be reverted, it is `rm` one file plus three imports.

### 2.2 Why every selector needs a namespace

We checked the existing codebase before naming anything. Real collisions
already existed:

| Class we wanted | Already existed in | Consequence |
|---|---|---|
| `.hero` | `panther-dark.css` | Hero layout rewrite |
| `.about` | both stylesheets | About section restyle |
| `.contact` | both stylesheets | Contact section restyle |
| `.hud-label` | `panther-dark.css:746` | HUD repositioned |
| `.nav` | (planned) | Header rewritten |

`.hud-label` is the trap. It already existed as `position: absolute`. If we had
copied her `.hud-label` (a plain block), we would have detached four HUD labels
from their corners — and the page would still have *built fine*.

**This is the single most important lesson of Phase A:**

> A CSS collision does not throw an error. It silently restyles something
> else. Type checking, linting and the build will all pass green.

Hence `rin-`. Reviewer then mechanically intersected all three stylesheets:
**0 selector collisions, 0 custom-property collisions.**

### 2.3 File map

```
Black Panther V2/
├── app/
│   ├── page.tsx                    MODIFIED  +3   CSS import
│   └── not-found.tsx               MODIFIED  +2   CSS import
├── components/panther-dark/
│   ├── panther-dark.css            UNTOUCHED       her hand-tuning
│   ├── rin-tokens.css              NEW      320    the design system
│   ├── contourPaths.ts             NEW      120    pure geometry
│   ├── Contours.tsx                NEW       40    render the geometry
│   └── useRinReveal.ts             NEW       90    scroll reveal hook
├── tests/
│   └── contourPaths.test.ts        NEW       95    7 tests
└── tools/verify_all.sh             UNTOUCHED       the gate we ran
```

Total: **+22 lines modified, 5 files added, 0 existing rules rewritten.**

### 2.4 Token layer

Tokens are the whole trick. Instead of hardcoding colours in 30 rules, one set
of variables drives a whole subtree.

```css
:root {
  --rin-paper: #eef3f4;   --rin-ink: #0b1026;   --rin-teal: #0a7a8c;
  --rin-yellow: #ffd43b;  --rin-rule: #0b102624;
}
```

A "tone" is just a token override on a container:

```css
.rin-tone-ink  { --rin-paper: #0b1026; --rin-ink: #eef3f4; --rin-teal: #ffd43b; }
.rin-tone-yellow { /* … */ }
.rin-tone-teal { /* … */ }
```

This is how she does her dark/light *sections* without a theme switcher — and
it is why a theme toggle is a small addition later, not a rewrite.

### 2.5 Contour geometry

Her hero background is a topographic map. Rather than copying her generated
paths (stolen art), we reimplemented the **algorithm**:

```
3 blob centres × 7 rings × 64 samples
radius × (1 + 0.16·sin(3θ + phase) + 0.08·cos(5θ − phase))
```

The two harmonics are what stop it looking like plain circles. Phase shifts per
ring and per centre stop the rings looking like copies.

It is a **pure function** — same input, same output — which is why server and
client render byte-identical markup and there is no hydration mismatch.

### 2.6 Reveal system

```
useRinReveal()  →  adds .rin-reveal-ready to container
                 →  sets --rin-i (stagger index) per element
                 →  IntersectionObserver adds .rin-is-visible
CSS             →  does all the actual animating
```

Split this way so `prefers-reduced-motion` can switch motion off in **one CSS
block** rather than by branching inside JavaScript.

---

## 3. THE PLAN WAS WRONG — corrections before building

These are the rules our plan (`UX_UI_IMPROVEMENT_PLAN.md`) did **not** contain,
and should have.

| # | Missing rule | Why it matters |
|---|---|---|
| 1 | **Grep for the class name before using it** | `.hud-label` would have detached 4 labels silently |
| 2 | **Namespace every new class with a prefix** | Turns a silent regression into a grep |
| 3 | **Decide additive vs rewrite, in writing, before coding** | Ambiguity here costs hours |
| 4 | **Keep new CSS in a separate file** | Makes blast radius measurable |
| 5 | **Run the repo's own gate, not just tsc/lint** | `tools/verify_all.sh` exists. Use it. |
| 6 | **Test globs go stale** | `npm test` ran *one* file. My new tests were invisible until I fixed the glob. A green test run can mean "nothing ran". |
| 7 | **Screenshot the render, don't trust the build** | Build green ≠ looks right |
| 8 | **Get an independent review before claiming done** | Caught 14 bugs (section 4) |
| 9 | **Check the machine's memory budget** | Build OOM'd. See 4.6. |
| 10 | **Check `clip-path` before using `outline` for focus** | Silent WCAG failure |

Rule 6 deserves emphasis: **"tests pass" is only true if the tests ran.** Check
the count, not the exit code.

---

## 4. MISTAKES WE MADE — post-mortem

### 4.1 `clip-path` ate the focus ring (WCAG 2.4.7)

We wrote:

```css
.rin-cut-btn { clip-path: var(--rin-cut); }
.rin-cut-btn:focus-visible { outline: 2px solid var(--rin-teal); }
```

`clip-path` clips the element's **entire** rendering, including `outline` and any
outer `box-shadow`. The outline was drawn outside the clip region and never
appeared. Keyboard users got **no visible focus indicator at all** — and no
error anywhere.

```css
/* fixed */
.rin-cut-btn:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 2px var(--rin-teal);  /* inset stays inside the clip */
}
```

**Lesson:** any visual effect that clips (`clip-path`, `overflow: hidden`,
`mask`) also clips focus rings. Use `inset` shadows or an inner ring.

### 4.2 The `transition` shorthand would have killed 45 hover animations

We wrote `transition: opacity …, translate …` on `[data-rin-reveal]`.

`transition` is a **shorthand — it replaces the entire declaration.** The
existing stylesheet sets `transition` on ~45 rules (`.hero-switch`, buttons,
cards). Tag any of those elements and its hover animation dies for the entire
life of the page. Green build. No warning.

```css
/* fixed — longhands, claiming only what we animate */
transition-property: opacity, translate;
transition-duration: var(--rin-dur-reveal);
transition-timing-function: var(--rin-ease);
transition-delay: var(--rin-d);
```

**Lesson:** never use the `transition` shorthand in an additive layer.

### 4.3 The footer could never become visible

```ts
IntersectionObserver(..., { rootMargin: "0px 0px -10% 0px", threshold: 0.1 })
```

The bottom 10% of the viewport is excluded. An element of height `h` can only
reach an intersection of `h − 0.1·vh`, so it can only satisfy `≥ 0.1h` when
`h ≥ 0.111·vh` — roughly 100px on a 900px screen.

The footer is **72px** and is the last thing in the document, so it can never
scroll out of that strip. It stayed at `opacity: 0` **forever.**

```ts
threshold: 0   // any pixel counts; the rootMargin still delays the trigger
```

**Lesson:** a non-zero `threshold` is a minimum element size. Short elements at
the end of a page will never reveal.

### 4.4 `points: 0` wrote `MNaN NaNZ` into the DOM

`(i / points)` with `points = 0` → `0/0 = NaN`. All 21 paths became garbage.
The SVG renders nothing and reports no error. Our original test only checked
default options, so it gave false confidence.

Fixed by sanitising **every** numeric input at the top of the function — a
`positive(value, fallback)` helper for viewBox, points, rings, step and scale.
Plus a test that runs 7 degenerate cases.

**Lesson:** a test that only covers the happy path proves almost nothing. Test
the garbage.

### 4.5 Two reveal systems fighting each other

Every existing section already animates in through **framer-motion**
(`MotionSection.tsx`: `initial={{opacity:0, y:28}}` + `whileInView`).

We were about to build a second, parallel CSS reveal. Tagging anything inside a
`MotionSection` would run two animations at once — compounded delay, visible
double fade. And because framer-motion writes **inline** styles, its opacity
would beat our stylesheet, so the CSS fallback state was inert anyway.

**Lesson:** before adding a system, check whether one already exists. Two
systems owning the same property is a race, not a feature. This is now
documented as a warning comment directly above the reveal CSS.

### 4.6 The build died on memory, not on code

```
Error [TurbopackInternalError]: Cannot allocate memory (os error 12)
```

This machine has **3.7 GB RAM, ~1.4 GB free, swap 75% full**, and Node's default
heap limit is **1940 MB** — larger than the free memory. Node thrashed swap, then
died.

```bash
NODE_OPTIONS="--max-old-space-size=1280" npm run build   # passes
```

**Lesson:** an OOM error is an environment fact, not a code fact. Before
debugging code, check `free -h` and the heap limit.

### 4.7 A false comment shipped

We wrote "costs no client JavaScript" on `Contours.tsx`. It is a server
component — but it is rendered inside `HeroSection`, which is `"use client"`, so
the generator **does** ship to the client bundle. The comment was wrong.

Fixed the comment and explained how it becomes true for free if the hero ever
becomes a server component.

**Lesson:** a comment claiming a performance property is a claim. Verify it or
do not write it.

### 4.8 Hidden elements stayed focusable

Revealed elements used `opacity: 0` + `translate`. Both leave the element in the
tab order — a keyboard user could focus something invisible. Added
`visibility: hidden`, which flips in the same frame so the transition still plays.

---

## 5. What the review pass caught

An independent review of the changed files found **14 real bugs**, of which
4.1, 4.2, 4.3 and 4.4 were serious and all invisible to the compiler.

Two motion guidelines were also checked against this CSS before it shipped:

- *Excessive Motion* — "animate 1–2 key elements per view maximum". We were
  animating every tagged element with an uncapped stagger. → clamped to 4 steps.
- *Duration Timing* — "use shared motion tokens". We had hardcoded `0.9s` in
  three places. → tokenized as `--rin-dur-fast/base/reveal`.

For the 3D phase, an existing *Interactive 3D Analytics Dashboard Card* pattern
is the reference. Her site has a 3D **portrait**; we build a 3D **data** scene,
which is the actual differentiator.

---

## 6. Verification — what actually passed

`tools/verify_all.sh`, the repo's own gate:

```
typecheck         PASS
lint              PASS
unit tests        17/17 PASS
resume build      PASS
production build  PASS
resume gate       PASS
ALL GREEN
```

Plus manual checks:

| Check | Result |
|---|---|
| Contour paths server-rendered | 21 (3 × 7) |
| All paths closed, no `NaN` | Yes |
| Visible in Chrome | Yes, faint rings behind hero |
| Her CSS diff | **empty** |
| Original repo untouched | 0 modified files |

---

## 7. The rules we are taking forward

1. **Grep the class name before you use it.** Always.
2. **Prefix every new class.** `rin-`. Non-negotiable.
3. **Separate file for new CSS.** Blast radius must be measurable.
4. **Never the `transition` shorthand** in an additive layer.
5. **Never `outline` for focus inside a `clip-path`.** Use inset shadow.
6. **`threshold: 0`** on reveal observers.
7. **Test the garbage, not just the happy path.**
8. **Check the test count**, not just the exit code.
9. **`free -h` before debugging an OOM.**
10. **Screenshot the page.** Build green ≠ correct.
11. **Check for an existing system** before adding a second one.
12. **No comment claims a property you have not verified.**

---

## 8. Phase B — what is still missing from the blueprint

Not yet built. This is the scaffolding Phase A leaves behind.

| Piece | State | Note |
|---|---|---|
| `.rin-cut-btn` | built, unused | No markup uses it yet |
| `.rin-hud` | built, unused | Ditto |
| `.rin-cond` | built, unused | Ditto |
| `.rin-section` / `.rin-sec-*` | built, unused | Ditto |
| `.rin-tone-*` | built, used once | Hero only |
| `useRinReveal` | built, unused | No `[data-rin-reveal]` anywhere yet |

**Phase A is deliberately inert.** It is a foundation with one visible proof
(contours). Phase B is where it gets used — and where we must respect:

- Do not tag anything inside a `MotionSection` (4.5).
- Only 4 stagger steps before things cascade (4.1).
- Every cut-btn needs a focus story (4.1).

### Planned Phase B

| Step | Work | Beats her? |
|---|---|---|
| B.1 | Cut-buttons and HUD cards across sections | — |
| B.2 | Dark/light theme toggle via `data-theme` | ✅ |
| B.3 | Khmer/EN language toggle | ✅ |
| B.4 | Tone system applied per section | — |
| B.5 | Reveal applied outside the framer-motion system | — |

**Not yet:** 3D data scene (Phase F), case-study routes, live charts.

---

## 9. Commit checklist — YOUR step

Nothing has been committed. Per the working agreement, commits are the owner's
action.

```bash
cd "Black Panther V2"
git add -A
git commit -m "Phase A: add rin- namespaced design system, contour generator, reveal hook"
git push -u origin Hero+Panther
```

Files waiting: 5 new, 4 modified.

---

## 10. One-paragraph summary

We added her visual language to a portfolio that already had eleven sections,
without rewriting a single line of its hand-tuned CSS, and proved it with one
command. The interesting part is not the code — it is that **nine of the
eleven bugs we found were invisible to every automated check we had.** CSS
collisions, a clipped focus ring, a dead footer, and a shorthand that would have
silently killed forty-five hover animations all passed typecheck, lint, and
build. A proper review pass caught fourteen of them. The lesson to keep is
narrow and unglamorous: **grep the name, prefix the class, test the garbage,
and look at the actual page.**