# Decision Log implementation plan

## Constraints and decisions

- The ZIP is the immutable Lovable baseline. Extraction checked paths, symlinks, metadata, and collisions.
- Preserve React 19, TypeScript, TanStack Start/Router, Vite, Tailwind and the existing landing composition (including its final serif hero and carousel).
- Use the user's `demo_folder_heirarchy` as a structural reference: atoms, molecules, pages, layout, common, constants, assets/stylesheets. Retain TanStack's route entry files. Do not import the reference application's business logic or dependencies.
- Follow the current brief for the demo: readable chronological ledger, All/Active/Superseded, simplified form, linked supersession, in-memory data.
- No Git repository or remote was supplied. Preserve the ZIP and reference folder, exclude both from submission, and request the destination before touching remote history.

## Ordered slices

1. Baseline and structure: inspect, run existing checks and browser, capture screenshots; move existing modules and update paths without visual changes.
2. Ledger: regression tests first; display full reasoning, sort by date, expose all states and history links; retain shared record styling.
3. Creation and supersession: fresh local date, field errors, replacement context, stable IDs/numbers, focus restoration, deliberate deletion cleanup.
4. Shipping: verify current prerender output under a repository base, correct root-relative links, add CI/Pages workflow and static preview/test commands.
5. Review: desktop/mobile screenshots, keyboard and axe, console/network, all checks, five-axis diff review and targeted simplification.

## Baseline

- `npx tsc --noEmit`: passes.
- `npx eslint src vite.config.ts eslint.config.js`: zero errors, six existing fast-refresh warnings in UI primitives.
- `npm run build`: passes; `.output/public/index.html` and `demo/index.html` prerendered. Bundler emits upstream configuration warnings.
- No tests or Actions workflow in the ZIP.

## Verification

Each slice gets type/lint checks and relevant tests. Final browser tests exercise the built static site at `/` and `/decision-log/`, direct demo navigation/refresh, every core lifecycle, mobile and keyboard. Review output before publishing. Public deployment depends on the repository destination and available access.
