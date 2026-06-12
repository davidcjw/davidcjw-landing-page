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

## Easter egg: KBD Dragon

An OSRS-inspired King Black Dragon pixel-art sprite lives in the bottom-right corner of every page (mounted in `app/layout.tsx`).

- `app/components/KBDDragon.tsx` — canvas-based 18×12 px sprite at SCALE=4 (72×48 on screen)
- Keyframe animations (`kbd-float`, `kbd-pop-in`) live in `app/globals.css`
- Palette: 7 colors (0=transparent, 1=outline, 2=body, 3=highlight, 4=wing, 5=green-eye, 6=horn/tooth)
- Three heads with horns + green eyes across cols 0–13; wings at cols 0–1 and 14–15; 3 legs; tail tip
- Blink loop replaces eye pixels; roar loop swaps jaw row to show more teeth
- Clicking triggers immediate roar + OSRS-flavoured quip bubble; quip also fires on its own every 20–60s
- Uses Tailwind classes for positioning (`fixed bottom-6 right-6 z-40`); no CSS Modules
