# AGENTS.md — Invoice Maker

> AI assistants: read this first. It tells you how to work with this codebase efficiently.

## Stack

Next.js 16 (App Router) + React 19 + TypeScript + Tailwind/DaisyUI + Redux Toolkit + RTK Query → Express 4 + Mongoose 7 + MongoDB Atlas. Auth: client-side Firebase (Google + Email/Password). Backend has no auth middleware.

## Project Layout

```
frontend/          Next.js app (:3000)
  src/redux/       slices/ + api/ (RTK Query)
  src/app/         (dashboard)/ = protected, (public)/ = login/register
  src/components/  layouts/ (Navbar, Sidebar), shared/ (ProtectedRoute)
backend/           Express API (:5000 or Vercel serverless)
  routes/          All logic inline (no controllers layer)
  models/          Mongoose schemas (User model is empty — Firebase handles auth)
```

## Key Rules

### Frontend

- **All state in Redux.** Use `useAppSelector`/`useAppDispatch` from `@/redux/hooks` (typed).
- **All API calls via RTK Query** (`invoiceApi`, `productApi`, `featureApi`). Tags: `Invoice`, `Product`, `Dashboard`.
- **Auth user is serialized.** Firebase `UserImpl` → `{uid, email, displayName, photoURL, emailVerified, phoneNumber}`. Use `serializeUser()` from authSlice.
- **Path alias `@/*`** → `frontend/src/*`.
- **Tailwind + DaisyUI.** Dark mode via `dark:` prefix + `darkModeSlice`. DaisyUI components for modals, buttons, drawers.
- **Invoice flow:** Build draft in `invoiceSlice` → save via `useCreateInvoiceMutation`.
- **Invoice number:** Auto-generated format `CN-YYYYMMDD-XXX` via `useInvoice` hook.
- **PDF/Print:** Client-side only (html2canvas + jsPDF + react-to-print).

### Backend

- **Routes are self-contained.** No separate controller files. Add logic directly in `routes/*.js`.
- **No auth checks.** Backend trusts `userEmail` from request params/body. Add auth middleware if security needed.
- **Config files in `configs/` are empty.** Use `process.env` directly.
- **Vercel-aware.** `app.js` checks `VERCEL` env var and skips `app.listen()`.

## File Reference (most edited)

| File                                                     | What's in it                                                     |
| -------------------------------------------------------- | ---------------------------------------------------------------- |
| `frontend/src/redux/slices/authSlice.ts`                 | Auth state, Firebase thunks, `serializeUser`, `initAuthListener` |
| `frontend/src/redux/slices/invoiceSlice.ts`              | Draft invoice state + reducers                                   |
| `frontend/src/redux/api/invoiceApi.ts`                   | Invoice CRUD endpoints                                           |
| `frontend/src/redux/api/productApi.ts`                   | Product CRUD endpoints                                           |
| `frontend/src/app/(dashboard)/invoices/page.tsx`         | Invoice list with search, select, delete                         |
| `frontend/src/app/(dashboard)/invoices/new/page.tsx`     | Create invoice form                                              |
| `frontend/src/app/(dashboard)/invoices/preview/page.tsx` | Preview before save                                              |
| `frontend/src/app/(dashboard)/products/page.tsx`         | Product list                                                     |
| `backend/routes/invoice.js`                              | Invoice CRUD + latest invoice number                             |
| `backend/routes/products.js`                             | Product CRUD                                                     |
| `backend/models/invoice.js`                              | Invoice Mongoose schema                                          |
| `backend/models/products.js`                             | Product Mongoose schema                                          |

## Environment

- `NEXT_PUBLIC_API_URL` — frontend API base
- `DB_ATLAS` — MongoDB connection string
- `PORT` — backend port (default 5000)
- No `.env` files committed; Firebase config is hardcoded.

## Commands

```
npm run dev          # both (concurrently)
npm run dev:frontend # frontend only
npm run dev:backend  # backend only
```
