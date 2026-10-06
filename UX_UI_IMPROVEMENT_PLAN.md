# Data Portfolio UX/UI Improvement Plan

## 1. Product Goal

Build a premium Data Engineer / Data Scientist portfolio that:

- Communicates expertise within the first screen.
- Makes featured work easy to find and verify.
- Uses cyberpunk visuals without reducing readability.
- Provides honest, functional interactions.
- Performs well across desktop and mobile devices.
- Remains accessible to keyboard and reduced-motion users.

---

## 2. Recommended Information Architecture

### Global Header

- Brand / home link
- Projects
- Architecture
- Experience
- Writing
- Contact
- Availability status
- Compact mobile navigation

### Page Sections

1. **Hero**
   - Professional role
   - Primary value proposition
   - Short supporting statement
   - Explore Projects CTA
   - Download CV CTA
   - Panther visual
   - Fog and particle effects

2. **About**
   - Short biography
   - Portrait
   - Three core strengths

3. **Featured Projects**
   - Two or three strongest projects
   - Real screenshots or diagrams
   - Problem, strategy, and measurable result
   - Repository and live demo links

4. **Stack and Architecture**
   - Technology stack
   - Data pipeline diagram
   - Architecture decisions and trade-offs

5. **Experience**
   - Career timeline
   - Responsibilities
   - Outcomes and technical scope

6. **Writing and Lessons**
   - Engineering articles
   - Selected post-mortems
   - Real article destinations

7. **Credentials**
   - Certifications
   - Relevant achievements
   - Verification links

8. **Contact**
   - Email
   - LinkedIn
   - GitHub
   - Availability

### Optional Experiences

- Interactive data sandbox
- Live telemetry
- Panther AI portfolio guide

These should only appear when they provide real functionality.

---

## 3. Phase 1 — Content and Trust

### Objective

Remove placeholder behavior and make every claim verifiable.

### Tasks

- [ ] Replace the generic GitHub URL with the real profile.
- [ ] Replace the generic LinkedIn URL with the real profile.
- [ ] Replace `hello@example.com` with the real email address.
- [ ] Add the real CV PDF to `public/resume.pdf`.
- [ ] Make the Download CV button download the PDF.
- [ ] Give each featured project a unique repository URL.
- [ ] Give each featured project a unique demo or case-study URL.
- [ ] Replace placeholder experience entries with real roles and dates.
- [ ] Replace sample certifications with real certifications.
- [ ] Add verification links for certifications.
- [ ] Verify every project metric and business result.
- [ ] Remove claims that cannot be verified.

### Acceptance Criteria

- Every visible link has a valid destination.
- No button points to an unrelated section.
- No placeholder contact information remains.
- All professional claims are accurate.

---

## 4. Phase 2 — Navigation and Page Structure

### Objective

Make the long portfolio easy to scan and navigate.

### Tasks

- [x] Add stable IDs to all primary sections.
- [x] Add desktop navigation to the header.
- [x] Add an accessible mobile menu.
- [x] Make the header sticky after leaving the Hero.
- [x] Add an active-section indicator.
- [x] Add smooth scrolling with reduced-motion support.
- [x] Keep a visible Skip to Content link for keyboard users.
- [x] Ensure the Return to Origin link moves focus correctly.
- [x] Merge Tech Stack and Architecture into one primary section.
- [x] Merge Writing and Post-Mortems into one editorial section.
- [x] Convert Telemetry and Credentials into compact subsections.

### Suggested Navigation

```text
Projects  /  Architecture  /  Experience  /  Writing  /  Contact
```

### Acceptance Criteria

- Any primary section is reachable in one action.
- Keyboard users can access and close the mobile menu.
- The page no longer feels like an unstructured sequence of cards.

---

## 5. Phase 3 — Hero Refinement

### Objective

Keep the Panther as the primary visual without sacrificing readability.

### Tasks

- [x] Keep the Hero at full viewport width.
- [x] Keep the content constrained to the primary layout container.
- [x] Preserve clear separation between headline and Panther.
- [x] Reduce particle density behind important text.
- [x] Reduce fog brightness behind the headline.
- [x] Keep the Panther image transparent and optimized.
- [x] Hide decorative particle labels on small screens.
- [x] Prevent the chat toggle from covering the Panther’s face.
- [x] Confirm both CTA buttons remain visible at 320px width.
- [x] Add a WebGL capability check.
- [x] Provide a static Panther fallback only when WebGL fails.

### Desktop Layout

```text
┌─────────────────────────────────────────────────────────────┐
│ Header                                                      │
├──────────────────────────────┬──────────────────────────────┤
│ Role                         │                              │
│ Headline                     │       Panther Visual         │
│ Supporting copy              │       + Data Network         │
│ Primary CTA / Secondary CTA  │                              │
└──────────────────────────────┴──────────────────────────────┘
```

### Mobile Layout

```text
┌──────────────────────────────┐
│ Role                         │
│ Headline                     │
│ Supporting copy              │
│ Primary CTA                  │
│ Secondary CTA                │
│ Panther Visual               │
└──────────────────────────────┘
```

### Acceptance Criteria

- The headline remains the first readable element.
- The Panther is visible without covering text or buttons.
- The Hero does not produce horizontal scrolling.
- The Hero remains usable without animation.

---

## 6. Phase 4 — Projects and Case Studies

### Objective

Turn visual project cards into evidence of engineering ability.

### Project Card Structure

```text
Project title
One-sentence outcome

The Fog
What problem existed?

The Strategy
What architecture or model was implemented?

The Vision
What measurable result was delivered?

Role / Scale / Stack / Duration

[ View Case Study ] [ View Code ]
```

### Tasks

- [ ] Select the strongest two or three projects.
- [ ] Add a real visual for every project.
- [ ] State personal responsibility clearly.
- [ ] Add dataset or event scale.
- [ ] Add architecture decisions.
- [ ] Add constraints and trade-offs.
- [ ] Add measurable outcomes.
- [ ] Add repository and case-study links.
- [ ] Ensure confidential work is anonymized properly.

### Acceptance Criteria

- Each project communicates value within 15 seconds.
- Every result includes meaningful context.
- Project buttons lead to unique destinations.

---

## 7. Phase 5 — Readability and Accessibility

### Objective

Preserve the technical aesthetic while making the interface readable.

### Typography Rules

- Body text: minimum `16px`
- Supporting text: minimum `14px`
- Important metadata: minimum `11–12px`
- Decorative metadata: minimum `10px`
- Avoid meaningful text at `5–9px`

### Tasks

- [x] Increase the size of meaningful microcopy.
- [x] Increase contrast for secondary text.
- [x] Keep purely decorative labels hidden from screen readers.
- [x] Add visible focus states to every interactive element.
- [x] Convert clickable cards into semantic links or buttons.
- [x] Ensure hover behavior has a keyboard equivalent.
- [x] Ensure all controls meet a 44px touch target.
- [x] Validate heading order.
- [x] Validate image alternative text.
- [x] Test keyboard navigation from top to bottom.
- [ ] Test with a screen reader.
- [x] Test at 200% browser zoom.

### Acceptance Criteria

- Meaningful text meets WCAG AA contrast.
- The site is fully operable without a mouse.
- Focus never becomes trapped in the chatbot or mobile menu.

---

## 8. Phase 6 — Motion and Performance

### Objective

Keep cinematic effects without harming load time or battery life.

### Tasks

- [x] Lazy-load Vanta and Three.js.
- [x] Load the particle engine only when the Hero enters the viewport.
- [x] Pause Vanta when the Hero leaves the viewport.
- [x] Pause particles when the page is hidden.
- [x] Disable WebGL effects under `prefers-reduced-motion`.
- [x] Use a lightweight particle bundle with only required plugins.
- [x] Migrate from deprecated `react-tsparticles` when practical.
- [x] Convert the Panther asset to optimized transparent WebP or AVIF.
- [x] Preload only critical Hero assets.
- [x] Lazy-load images below the fold.
- [x] Split large sections into lazy-loaded chunks.
- [x] Avoid animating expensive filters continuously.

### Performance Targets

- Largest Contentful Paint: under 2.5 seconds
- Interaction to Next Paint: under 200ms
- Cumulative Layout Shift: under 0.1
- Initial JavaScript: under 300KB compressed where practical
- Mobile Lighthouse performance: 80 or higher

### Acceptance Criteria

- Scrolling remains smooth on a mid-range mobile device.
- WebGL stops rendering when not visible.
- Reduced-motion users receive a stable experience.

---

## 9. Phase 7 — Real Interactive Features

### Data Sandbox

- [x] Use a clearly identified real or sample dataset.
- [ ] Explain what changes when selecting a period.
- [x] Add accessible chart descriptions.
- [x] Support keyboard interaction.
- [x] Do not label data as live unless it is live.

### Telemetry

- [ ] Connect GitHub activity to the GitHub API.
- [ ] Cache API responses.
- [ ] Display the last successful update time.
- [ ] Handle rate limits and network errors.
- [ ] Remove Spotify status unless a real integration exists.
- [ ] Add a visible offline or unavailable state.

### Panther AI

Choose one implementation:

#### Option A — Real AI Assistant

- Connect to a secured server-side endpoint.
- Ground answers in portfolio data.
- Add loading, error, and retry states.
- Prevent prompt injection from exposing private data.

#### Option B — Portfolio Guide

- Offer predefined questions.
- Return authored answers.
- Avoid implying that it is a live AI model.

### Acceptance Criteria

- Every “live” label represents live or recently cached data.
- All interactive features have loading and failure states.
- Users understand whether data is real, simulated, or unavailable.

---

## 10. Phase 8 — Responsive QA

### Required Viewports

- [x] 320 × 568
- [x] 390 × 844
- [x] 768 × 1024
- [x] 1024 × 768
- [x] 1440 × 900
- [x] 1920 × 1080
- [x] Ultrawide desktop

### QA Checklist

- [x] No horizontal overflow.
- [x] No text overlaps the Panther.
- [x] Chat widget does not cover CTAs.
- [x] Buttons remain readable and tappable.
- [x] Cards stack in the correct order.
- [x] Timelines remain understandable.
- [x] Charts remain legible.
- [x] Footer content does not collide.
- [x] External links open safely.
- [x] Internal links move focus correctly.

---

## 11. Phase 9 — Publishing

### Tasks

- [x] Set the final page title.
- [x] Add a concise meta description.
- [x] Add a favicon.
- [x] Add an Open Graph image.
- [ ] Add canonical URL metadata.
- [x] Add a custom 404 page.
- [x] Add privacy-friendly analytics if required.
- [x] Verify robots and sitemap behavior.
- [x] Run Lighthouse.
- [x] Run an accessibility audit.
- [ ] Test Chrome, Safari, Firefox, and Edge.
- [ ] Test iOS Safari and Android Chrome.

---

## 12. Recommended Implementation Order

### Sprint 1 — Trust and Functionality

1. Real links and contact details
2. Real CV download
3. Accurate project and experience data
4. Working project actions

### Sprint 2 — Navigation and Structure

1. Header navigation
2. Mobile menu
3. Section consolidation
4. Active-section state

### Sprint 3 — Responsive and Accessible UI

1. Typography and contrast
2. Keyboard interactions
3. Mobile Hero refinement
4. Chat widget collision fixes

### Sprint 4 — Performance

1. WebGL lifecycle management
2. Reduced-motion behavior
3. Image optimization
4. Code splitting

### Sprint 5 — Interactive Features

1. Real telemetry
2. Data sandbox refinement
3. Panther assistant implementation

### Sprint 6 — Final QA and Launch

1. Cross-browser testing
2. Lighthouse
3. Accessibility audit
4. Metadata and deployment

---

## 13. Definition of Done

The portfolio is ready to publish when:

- [ ] Every link and CTA works.
- [ ] All content is accurate.
- [x] Navigation works on desktop and mobile.
- [ ] No section has placeholder functionality.
- [x] No meaningful text is too small to read.
- [x] Keyboard navigation works across the entire page.
- [x] Reduced-motion behavior is implemented.
- [x] WebGL effects pause when offscreen.
- [x] Mobile layouts have no overlap or overflow.
- [x] Lighthouse and accessibility targets are met.
- [ ] The site has been tested in major browsers.
