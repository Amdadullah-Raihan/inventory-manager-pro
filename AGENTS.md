# AGENTS.md — Invoice Maker

> AI assistants: read this first. It tells you how to work with this codebase efficiently.

## Stack

Next.js 16 (App Router) + React 19 + TypeScript + Tailwind/DaisyUI + Redux Toolkit + RTK Query → Express 4 + Mongoose 7 + MongoDB Atlas. Auth: JWT-based (bcryptjs + jsonwebtoken) with OTP email verification for registration. Backend has auth middleware for protected routes.

## Project Layout

```
frontend/          Next.js app (:3000)
  src/redux/       slices/ + api/ (RTK Query)
  src/app/         (dashboard)/ = protected, (public)/ = login/register
  src/components/  layouts/ (Navbar, Sidebar), shared/
  src/middleware.ts Next.js middleware — route protection via cookie check
backend/           Express API (:5000 or Vercel serverless)
  routes/          Thin route files — map HTTP verbs → controller functions
  controllers/     Business logic (invoiceController, productController, userController, featureController)
  models/          Mongoose schemas (User, OTP — auto-expiring)
```

## Key Rules

### Frontend

- **All state in Redux.** Use `useAppSelector`/`useAppDispatch` from `@/redux/hooks` (typed).
- **All API calls via RTK Query** (`invoiceApi`, `productApi`, `featureApi`, `authApi`). Tags: `Invoice`, `Product`, `Dashboard`, `User`.
- **Auth user:** `{id, email, name}` from JWT. Token stored in a `token` cookie. Auth mutations in `authApi` (RTK Query): `useSendOtpMutation`, `useRegisterMutation`, `useLoginMutation`, `useChangePasswordMutation`. App init uses `useGetMeQuery`. Auth slice holds pure state; dispatch `setUser`/`setToken` after successful mutations.
- **Registration:** 2-step: (1) send OTP to email via `POST /api/user/send-otp`, (2) verify OTP + create account via `POST /api/user/register` with `{ name, email, password, otp }`.
- **All invoice/product/feature routes are protected** with `authMiddleware`. User identity comes from JWT (`req.user.email`), not from URL params.
- **Route protection:** `src/middleware.ts` checks the `token` cookie. No `ProtectedRoute` component needed — middleware runs server-side before rendering, zero flash. Public paths: `/login`, `/register`.
- **JWT token** is sent via `Authorization: Bearer <token>` header (see `baseApi.ts` prepareHeaders — reads from cookie first, falls back to localStorage).
- **Path alias `@/*`** → `frontend/src/*`.
- **Tailwind + DaisyUI.** Dark mode via `dark:` prefix + `darkModeSlice`. DaisyUI components for modals, buttons, drawers.
- **Invoice flow:** Build draft in `invoiceSlice` → save via `useCreateInvoiceMutation`.
- **Invoice number:** Auto-generated format `CN-YYYYMMDD-XXX` via `useInvoice` hook.
- **PDF/Print:** Client-side only (html2canvas + jsPDF + react-to-print).

### Backend

- **Routes are thin, controllers hold logic.** Route files just map HTTP methods to controller functions. All async handlers are wrapped with `catchAsync()` from `utils/catchAsync.js` which forwards errors to the global error handler in `app.js`.
- **Global error handler** in `app.js` catches all errors and returns `{ success: false, error: message }`.
- **Auth middleware available.** `backend/utils/authMiddleware.js` verifies JWT and attaches `req.user`. Apply to routes that need protection.
- **Auth routes:** POST `/api/user/send-otp`, POST `/api/user/register`, POST `/api/user/login`, GET `/api/user/me`, PUT `/api/user/change-password`.
- **Config files in `configs/` are empty.** Use `process.env` directly.
- **Vercel-aware.** `app.js` checks `VERCEL` env var and skips `app.listen()`.

## File Reference (most edited)

| File                                                     | What's in it                                                                          |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `frontend/src/redux/slices/authSlice.ts`                 | Auth state (pure slice — `setUser`, `setToken`, `setLoading`, `logout`, `clearError`) |
| `frontend/src/redux/api/authApi.ts`                      | Auth RTK Query endpoints (`login`, `register`, `sendOtp`, `getMe`, `changePassword`)  |
| `frontend/src/redux/slices/invoiceSlice.ts`              | Draft invoice state + reducers                                                        |
| `frontend/src/redux/api/invoiceApi.ts`                   | Invoice CRUD endpoints                                                                |
| `frontend/src/redux/api/productApi.ts`                   | Product CRUD endpoints                                                                |
| `frontend/src/app/(dashboard)/invoices/page.tsx`         | Invoice list with search, select, delete                                              |
| `frontend/src/app/(dashboard)/invoices/new/page.tsx`     | Create invoice form                                                                   |
| `frontend/src/app/(dashboard)/invoices/preview/page.tsx` | Preview before save                                                                   |
| `frontend/src/app/(dashboard)/products/page.tsx`         | Product list                                                                          |
| `backend/routes/invoice.js`                              | Thin routes → `controllers/invoiceController.js`                                      |
| `backend/routes/products.js`                             | Thin routes → `controllers/productController.js`                                      |
| `backend/controllers/invoiceController.js`               | Invoice business logic (getAll, getById, create, deleteOne, deleteMany, getLatest)    |
| `backend/controllers/productController.js`               | Product business logic (getAll, getById, create, update, deleteOne, deleteMany)       |
| `backend/models/invoice.js`                              | Invoice Mongoose schema                                                               |
| `backend/models/products.js`                             | Product Mongoose schema                                                               |

## Environment

- `JWT_SECRET` — JWT signing secret (default: `invoice-maker-jwt-secret`)
- `NEXT_PUBLIC_API_URL` — frontend API base
- `DB_ATLAS` — MongoDB connection string
- `PORT` — backend port (default 5000)
- `EMAIL_USER` — Gmail address for sending OTP emails (optional, OTP logged to console in dev)
- `EMAIL_PASS` — Gmail app password for sending OTP emails (optional)
- No `.env` files committed.

## Commands

```
npm run dev          # both (concurrently)
npm run dev:frontend # frontend only
npm run dev:backend  # backend only
```
