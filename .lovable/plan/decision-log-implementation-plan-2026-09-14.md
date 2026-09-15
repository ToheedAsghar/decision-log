# Decision Log — implementation plan

## Outcome

Build two connected, responsive experiences with one coherent archival-editorial design:

1. **Landing page at `/`** — the visually primary experience, using the supplied typography image as reference only.
2. **Interactive demo at `/demo/`** — a working decision record browser using in-memory data, with no sign-in, backend, database, or persistence.

Both experiences will be emitted as static Vite HTML entry points so direct navigation and refresh work on GitHub Pages, including when deployed beneath a repository base path such as `/decision-log/`.

## Visual system

- Use the brief’s strict palette: warm stone `#EFEDE6`, olive ink `#20221F`, bottle green `#2F4A3C`, and aged ochre `#8C6A3F`; derive only subtle neutral borders and muted states.
- Load legally available web fonts: **Archivo** for bold neo-grotesk display typography, **Newsreader** for decision records and editorial statements, and **IBM Plex Sans** for navigation, labels, controls, metadata, and body copy.
- Establish near-square geometry, thin horizontal rules, restrained status stamps, generous editorial spacing, and strong left alignment. Avoid gradients, decorative imagery, cards, pills, dashboards, and shadows except where a dialog needs separation.
- Add visible focus states, semantic structure, sufficient contrast, large touch targets, and reduced-motion alternatives.

## Landing page

- Create a compact editorial header with the requested navigation and a **Try Demo →** link derived from `import.meta.env.BASE_URL`; never hard-code root-relative `/demo/` navigation. Use the same base-path rule for every repository-relative link.
- Build the left-aligned opening composition with the exact headline and supporting copy in an asymmetric grid with a fully populated decision record—not a 50/50 split, illustration, browser mockup, or enclosing card.
- Animate the opening `ACTIVE` stamp once with the restrained opacity/scale/rotation treatment and disable it for reduced motion.
- Build the requested narrative sequence as one continuous composition, varying density, columns, type scale, rules, whitespace, and contrast rather than repeating identical section wrappers:
  - **Why:** “Decisions survive. Context doesn’t.” with dated project-history fragments.
  - **How it works:** an annotated real record explaining what, meaning, why, who, when, and status.
  - **History:** superseded-to-active chronology using only ochre and green status accents.
  - **People:** restrained initials and names as decision metadata.
  - **Example:** a presentation-safe composition made from the same decision row, detail, status, people, filter, and search components used by the real application.
- Finish with the dark-ink closing statement and a minimal footer.
- Keep sections asymmetric on larger screens and convert them to a deliberate single-column reading flow on mobile.

## Interactive demo

- Define the exact decision model and four-person team from the brief, plus four realistic seeded decisions with complete dates and decision makers.
- Build a quiet top bar and editorial index with search, status filters, and semantic full-row buttons with keyboard support and visible focus. Keep row-level controls separate so no interactive element is nested inside another.
- Make search case-insensitive across title, description, rationale, category, and decision-maker names; compose it with the current status filter and show a restrained text-only empty state when nothing matches.
- On desktop, show a stable list/detail split and select the first visible decision by default. If search or filtering hides the selection, move to the first remaining result.
- On mobile, begin on the list without automatic selection; selection opens a full-screen detail view and Back restores the existing search/filter state.
- Render detail pages as document-like records with Newsreader titles/statements, metadata blocks, rules, and subdued actions.
- Implement **New decision** as an accessible restrained dialog on desktop and a full-screen form/sheet on mobile, with labels, title, description, rationale, keyboard-accessible multi-person selection, optional category, and date. New records automatically start as Active.
- Validate creation, add the record first in newest-first order, and close the form without changing the active search or filter. If the record remains visible, select and reveal it on desktop; otherwise retain the current view and confirm that it was saved but is hidden by the current filters.
- Implement immediate in-memory creation, deletion, search, filtering, and status changes to Superseded or Reversed.
- Require a lightweight accessible confirmation before deletion, then choose the next sensible desktop selection or return to the mobile list.
- Announce save, status-change, and deletion confirmations through a shared polite ARIA live region; keep management actions secondary and clearly distinguish Reversed with an ink-only label/rule treatment without reducing title readability.
- Restore focus to the initiating control whenever the create form, delete confirmation, or mobile sheet closes.

## Structure, static entry points, and reuse

- Configure a multi-page static Vite build with `index.html` for `/` and `demo/index.html` for `/demo/`, each mounting shared React modules while remaining independently refreshable on GitHub Pages.
- Make internal navigation explicitly derive from `import.meta.env.BASE_URL`, and ensure font loading, scripts, styles, and other assets honor Vite’s configured `base`, with a repository-path production build used to verify deployment safety.
- Give each HTML document its own concise static title, description, Open Graph title/description/type, and Twitter card metadata, while leaving a clean path for a future social image.
- Create focused reusable pieces for status marks, people metadata, decision records, decision rows, detail view, filters, and the creation dialog so the landing-page preview and demo remain visually consistent.
- Keep all state client-side and intentionally reset it on refresh.
- Update shared tokens and typography while loading only the Archivo, Newsreader, and IBM Plex Sans weights actually used. Keep each small component within one clear font role rather than mixing all three.
- Prefer rules, whitespace, alignment, and grid structure over both rounded and square enclosing cards.

## Verification

- Run the available type/static checks, lint, and production build; fix meaningful failures.
- Exercise the production experience with keyboard and pointer: landing navigation and CTA, reduced motion, case-insensitive search, every filter, combined search/filter states, empty states, record selection, multi-person creation, creation hidden by the current filter, status changes, delete confirmation, ARIA live announcements, focus restoration, and mobile Back behavior.
- Test long titles, long rationale, multiple makers, missing categories, creation under an active filter, selected-record deletion, and mobile form overflow.
- Visually check approximately 375px mobile, tablet, and large desktop for typography, overflow, list/detail behavior, form fit, touch targets, and the absence of cards, gradients, large radii, excessive shadows, analytics, or generic SaaS patterns.
- Test both `/` and `/demo/` by direct navigation and refresh from the static production output under a simulated GitHub Pages repository base path; confirm all assets and internal links load correctly.
