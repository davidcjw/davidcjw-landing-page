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

## Content

All content lives in [`app/data.ts`](app/data.ts) — edit the `experiences` and `projects` arrays to update the page.

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
    PortfolioSection.tsx
    PortfolioCard.tsx
    Footer.tsx
  data.ts             experiences + projects content
blocks/               reusable animation primitives
```

See [`CODEBASE.md`](CODEBASE.md) for a full map of the repo.
