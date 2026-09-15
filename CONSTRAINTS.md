# Decision Log quality constraints

Derived from the user's production-readiness brief, 2026-09-15.

## Floor

- No new type/lint suppression comments, skipped tests, removed assertions, unimplemented stubs or secrets.
- Preserve the Lovable design and published Git history.
- No backend, authentication, database or persistence requirements.
- Do not weaken checks to make changes pass.

## Release gates

| Dimension     | Rule and reason                                                 | Command                        | When                   |
| ------------- | --------------------------------------------------------------- | ------------------------------ | ---------------------- |
| Types         | Zero errors; preserve strict types                              | `npm run typecheck`            | Each slice, CI         |
| Lint          | Zero errors; retain existing rules                              | `npm run lint`                 | Each slice, CI         |
| Behavior      | All browser regressions pass; no skipped tests                  | `npm test`                     | Relevant slice, CI     |
| Accessibility | Zero serious/critical axe findings; keyboard flows pass         | `npm test`                     | Final static build, CI |
| Static output | Root and demo HTML exist; base-path navigation and refresh pass | `npm run build` and `npm test` | Release, CI            |

Performance is measured before optimization, not assigned an arbitrary budget. Baseline generated client files: 378.42 kB entry JS, 141.93 kB shared demo JS, 95.52 kB CSS (118.01, 46.53, 17.26 kB gzip respectively).
