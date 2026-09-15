# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Checks

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

The demo is intentionally in-memory, so refreshing resets its records. The
GitHub Pages workflow builds the prerendered `/` and `/demo/` routes with the
repository base path and deploys `.output/public`.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
