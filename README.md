# Wildfire Atlas

An interactive Northern California wildfire-risk prototype. All risk predictions and environmental conditions are explicitly labeled synthetic sample data. This is not a trained model, operational forecast, or emergency-planning tool.

## Features

- Pan and zoom an interactive geographic sample grid; inspect individual cells.
- Jump to Redding, Paradise, Chico, Truckee, Sacramento, Ukiah, or Eureka.
- Switch wildfire-risk, maximum-temperature, fuel-dryness, and wind-speed layers.
- Compare 0.2-degree cells with 0.4-degree cells that aggregate fine-cell values.
- Explore seven daily predictions, September 15–21, 2026, through a slider and time-series chart.
- Responsive layout and keyboard-accessible controls.

## Run locally

Requires Node.js 22.13 or newer and pnpm 11.25.0 (declared in package.json).

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000.

```sh
pnpm build
pnpm start
```

## Deploy to Vercel

1. Import this private GitHub repository in Vercel.
2. Choose **Next.js** as the framework and the repository root as the root directory.
3. Use `pnpm install --frozen-lockfile` for installation and `pnpm build` for the build. Leave the output directory at its Next.js default.
4. Use Node.js **22.x**. This sample app requires no API keys or environment variables.
5. Configure Vercel Deployment Protection for every URL/audience you intend to keep private before sharing the deployment. A private GitHub repository does not itself protect a deployed website. Sites owner-only access does not transfer to Vercel.

Vercel access configuration is account-side and cannot be guaranteed by this repository. The app does not implement its own authentication. The original private Sites deployment remains separate; this export does not deploy anything to Vercel.

Official references: [Next.js deployment](https://nextjs.org/docs/app/getting-started/deploying), [Vercel Deployment Protection](https://vercel.com/docs/deployment-protection).

## Project structure

- `app/page.tsx`: interactive map, view state, controls, and location inspector.
- `app/globals.css`: responsive layout and visual styling.
- `app/layout.tsx`: page metadata.
- `lib/wildfire.ts`: deterministic synthetic conditions, sample grid, aggregation, and risk-index calculation.
- `components/ui/`: included UI component source, including components used by the prototype.
- `public/favicon.svg`: application favicon.
- `vendor/`: bundled styling and original license notices.

The complete original source is retained, including the unused Sites/Cloudflare adapters, scripts, and database examples. The default development, build, and production commands now use standard Next.js for Vercel. No live data feeds or database are required.

## Data limitations

The geographic boundary is simplified. Grid resolution is angular, so approximate distances vary by latitude. Risk is a relative 0–100 index combining illustrative heat, wind, low humidity, and fuel dryness; it is not a probability. The regional index always averages the fine grid. Coarse cells average their constituent fine-cell values.

The optional WebMCP view-control tool registers only in browsers that support it. Normal UI interaction does not depend on it.
