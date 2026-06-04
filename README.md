# FROGS Indonesia — Frontend Demo

Standalone Next.js frontend that replicates the Laravel HR demo UI. All data is dummy/client-side (Zustand + localStorage). No backend required.

## Quick start

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you will be redirected to `/login`. Use any email/password to sign in (mock auth).

## Deploy to Vercel

1. Push this repo to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set **Root Directory** to `frontend`
4. Deploy (framework preset: Next.js)

Or via CLI from repo root:

```bash
cd frontend
npx vercel
```

## Features

- Login / Register (mock)
- Dashboard
- Employee FSI & ISTI — list, create, detail, inline edit, resign, delete
- PKWT FSI & ISTI — list, create, edit modal, delete
- Surat, Ticket — list, create, filter, delete
- OKR, Form, SOP, Memo — 7 department pages each
- Settings — company division, menu access

## Tech stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Zustand (persisted to localStorage)
- Heroicons
