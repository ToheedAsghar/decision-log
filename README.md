# Decision Log

Decision Log is a small project-memory app for recording what a
team decided, why it was decided, and how that decision changed over time.

The repository currently contains a public landing page and an interactive
demo. The demo is deliberately client-side and in-memory: it is useful for
exploring the workflow, but it does not provide authentication, a database, or
persistent storage.

## Features

- Browse a chronological list of project decisions.
- Filter records by active or superseded status.
- Open a decision to read its rationale and related history.
- Create new decisions during a session.
- Supersede an existing decision while preserving the link between the old and
  new records.
- Archive records from the current session.
- Use the interface with keyboard navigation and responsive layouts.

## Routes

| Route    | Description                                                         |
| -------- | ------------------------------------------------------------------- |
| `/`      | Product landing page with the Decision Log principles and examples. |
| `/demo/` | Interactive in-memory decision browser.                             |

## Requirements

- Node.js and npm

The repository also includes a Bun lockfile, so Bun can be used if preferred.

## Local development

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, then choose **Try demo** or visit
`/demo/` directly.

To preview a production build locally:

```bash
npm run build
npm run preview
```

## Scripts

| Command             | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Start the development server.            |
| `npm run build`     | Create the production/prerendered build. |
| `npm run build:dev` | Create a development-mode build.         |
| `npm run preview`   | Serve the production build locally.      |
| `npm run typecheck` | Run TypeScript without emitting files.   |
| `npm run lint`      | Run ESLint.                              |
| `npm test`          | Run the Playwright browser tests.        |
| `npm run format`    | Format the repository with Prettier.     |

Run the main checks together before handing off a change:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Playwright starts the development server automatically for the test suite. To
test a different running instance, set `TEST_URL`:

```bash
TEST_URL=http://127.0.0.1:8080/ npm test
```

## Static deployment

The Vite/TanStack Start configuration prerenders `/` and `/demo/` into
`.output/public`. When deploying beneath a repository or subdirectory, set
`VITE_BASE_PATH` during the build so asset URLs and navigation use the correct
base path. For example, a GitHub Pages project site named `decision-log` can
be built with:

```bash
VITE_BASE_PATH=/decision-log/ npm run build
```

Deploy the contents of `.output/public` using the hosting provider's static
site workflow. The base path should match the deployed subdirectory, including
the leading and trailing slash.

## Project structure

```text
src/
├── atoms/             Reusable low-level UI components
├── molecules/         Composed UI components and decision records/forms
├── pages/              Landing page and interactive demo screens
├── routes/             TanStack Router route definitions
├── common/             Shared types and decision utilities
├── constants/          Seed decision data used by the demo
└── assets/             Global stylesheets
tests/                  Playwright browser behavior tests
```

The sample records live in `src/constants/decisions.ts`. A refresh resets all
changes made in the demo because the current implementation stores state only
in React memory.

## Technology

- React 19 and TypeScript
- TanStack Start and TanStack Router
- Vite
- Tailwind CSS with Radix UI primitives
- Playwright for browser tests
