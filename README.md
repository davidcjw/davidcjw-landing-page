# davidcjw.com — Personal Landing Page

Portfolio site for David Chong, a software engineer based in Singapore. Deployed at [davidcjw.com](https://davidcjw.com).

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** (config-less, via PostCSS)
- **Framer Motion v12** — animations and spring physics
- **Figtree** — Google Font
- TypeScript, deployed on Vercel

## Development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run lint      # eslint
```

## Routes

- `/` — single-page home (hero, experience, portfolio teaser, contact)
- `/portfolio` — dedicated "building in public" portfolio page: stats, filterable
  project grid, and build principles. Sourced from the same `projects` array.

## Content

All content lives in [`app/data.ts`](app/data.ts) — edit the `experiences` and `projects` arrays to update the page. The `/portfolio` page and the home portfolio section both read from `projects`, so one edit updates both.

## Structure

```
app/
  layout.tsx          root layout (font, metadata)
  page.tsx            home page (composes all sections)
  icon.tsx            favicon (32×32 PNG, generated)
  globals.css         global styles
  components/
    Navbar.tsx
    HalideTopoHero.tsx
    ExperienceSection.tsx
    ExperienceCard.tsx
    PortfolioSection.tsx      home portfolio teaser
    PortfolioCard.tsx         shared project card
    PortfolioPageHero.tsx     /portfolio header + stats
    PortfolioExplorer.tsx     /portfolio filterable grid
    BuildPrinciples.tsx       /portfolio "how I build" strip
    Footer.tsx
  portfolio/
    page.tsx          /portfolio route
  data.ts             experiences + projects content
blocks/               reusable animation primitives
```

See [`CODEBASE.md`](CODEBASE.md) for a full map of the repo.
