# Decision Log landing and demo revision

## Landing page (`/theme-preview/`)

- Keep the existing copy and sections, while rebuilding their presentation as a consistently left-aligned editorial layout.
- Remove the hero eyebrow, fake search control, decorative dot line, tilted decision-card fan, and every hero-area button. Keep **Try demo** in the navigation as the only above-the-fold action.
- Shorten the hero headline to **“Every decision. One clear record.”** and place one complete, app-authentic `DecisionRecord` directly beneath the supporting copy.
- Reduce the hero height and the gap into the following section so the next content begins without a screen of empty space.
- Replace the vague section heading with **“The final decision, its reasoning, and what applies now.”**
- Apply the editorial serif to all landing headlines, decision titles, descriptions, and reasoning. Reserve the sans for navigation, controls, metadata, labels, and status marks.
- Left-align section headings and the closing message/action. Restyle the closing section with the normal page background, dark text, and thin rules instead of a dark band.
- Preserve the current navigation, content sections, demo preview, footer, base-path-safe links, responsive behavior, and restrained motion.

## Interactive demo (`/demo/` and embedded preview)

- Simplify decision status to **Active** and **Superseded** only; remove `Reversed` from types, seed data, controls, actions, and styling.
- Replace the current filter/search control row with two plain-text status toggles: **Active** and **Superseded**. Remove the search field so no empty grey control remains.
- Seed exactly five realistic decisions across product, engineering, operations, design, and customer support. Include an existing superseded-to-replacement relationship visible on first load.
- Give each decision a stable display number and optional replacement reference so a superseded record can show **“Superseded by #N”** as a working link that selects/opens the replacement while preserving the old reasoning.
- Replace status mutation actions with a **Supersede decision** flow available only on active records. Its dialog asks for the replacement decision, creates that replacement, marks the old record superseded, links both records, announces success, and focuses the initiating control when closed.
- Reduce **New decision** to four required fields: title, why we decided this, date defaulted to today, and status. Render text, date, and status controls with underlined styling rather than boxed fields.
- Preserve in-memory-only behavior, deletion confirmation, polite live announcements, mobile detail navigation, focus restoration, and active filter state after changes.
- When there are no stored decisions, show exactly: **“No decisions recorded yet. Add the first one.”** For non-empty filtered results, use a separate concise no-results message.

## Technical details

- Extend the shared decision model and components rather than introducing separate landing/demo representations.
- Keep decision rows as single semantic buttons and render replacement links outside those row buttons, avoiding nested interactive controls.
- Update the embedded app preview to reflect the two-filter interface and the new five-record data model.
- Keep all repository-relative navigation derived from `import.meta.env.BASE_URL`.

## Verification

- Run lint, TypeScript checks, and the production build.
- Exercise creation, both filters, superseding, replacement navigation, deletion, empty state, announcements, and dialog focus restoration.
- Inspect `/theme-preview/` and `/demo/` at desktop and mobile sizes for alignment, clipping, overflow, typography consistency, and console errors.
