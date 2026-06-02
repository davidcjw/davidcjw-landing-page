<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project context

- **Next.js 16** + **React 19** — both are recent, check docs before assuming APIs
- **Tailwind CSS v4** — config-less; uses `@tailwindcss/postcss`, no `tailwind.config.js`
- **Framer Motion v12** — primary animation library; `useSpring`, `useTransform`, `motion.*`
- All page content (experience, projects) lives in `app/data.ts` — edit there, not in components
- See `CODEBASE.md` for a full repo map with file:line pointers before exploring
