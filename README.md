# Resolve — Complaint Management System

A complete, extensible React front end for submitting, tracking, and resolving
complaints, with a member dashboard and an admin panel. Runs entirely on mock
data out of the box — no backend required to explore the full flow.

## Stack

- React 18 (functional components + hooks)
- React Router v6
- Context API for state (Auth, Complaints, Notifications) — see note below on Redux
- Tailwind CSS for styling
- Vite for tooling

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. Demo accounts (also shown on the login page):

| Role   | Email               | Password    |
|--------|----------------------|-------------|
| Member | priya@example.com    | password123 |
| Admin  | admin@example.com    | admin123    |

## Project structure

```
src/
  api/            Mock-backed API modules — one file per resource
    client.js         fetch wrapper (USE_MOCKS flag lives here)
    mockData.js        sample users / complaints / notifications
    authApi.js         login, signup, session lookup
    complaintApi.js     CRUD + status change + assignment
    notificationApi.js  fetch / mark read / push
  context/         React Context providers (global state)
  hooks/           Thin hooks re-exporting context (useAuth, useComplaints, useNotifications, useDebounce)
  constants/       Enums shared across forms, filters, badges
  utils/           Validators and formatters
  components/
    common/        Generic UI: Button, Input, Select, Modal, Badge, Spinner, EmptyState, AlertBanner, Pagination
    layout/         Navbar, AppLayout, ProtectedRoute
    complaints/     Domain components: form, card, table, filters, badges, audit trail, assign/status modals
    notifications/  Bell + dropdown list
  pages/           Route-level screens: Login, Signup, Dashboard, SubmitComplaint, ComplaintDetail, AdminPanel, NotFound
  App.jsx          Route definitions
  main.jsx         Provider tree + render root
```

## Connecting a real backend

Everything currently runs against in-memory mock data so you can see the app
work end-to-end immediately. To connect real endpoints:

1. Copy `.env.example` to `.env` and set `VITE_API_BASE_URL`.
2. In `src/api/client.js`, set `USE_MOCKS = false`.
3. In each `src/api/*Api.js` file, the real `request(...)` call is already
   written and commented out directly below the mock implementation —
   uncomment it and delete the mock branch.

Expected REST endpoints (adjust paths/names to match your backend):

```
POST   /auth/login          { email, password } -> { user, token }
POST   /auth/signup         { name, email, password } -> { user, token }
GET    /auth/me             -> { user }

GET    /complaints?status=&category=&priority=&search=&dateFrom=&dateTo=&mine=
GET    /complaints/:id
POST   /complaints          { title, description, category, priority, attachments }
PATCH  /complaints/:id/status   { status, comment }
PATCH  /complaints/:id/assign   { assigneeId }

GET    /notifications?userId=
PATCH  /notifications/:id/read
```

For file attachments, wire `AttachmentUploader`'s `onChange` handler in
`ComplaintForm` to upload to your storage endpoint and store the returned
URL instead of just the file name/size.

## Real-time notifications

Notifications currently use short polling (`NotificationContext.jsx`,
`POLL_INTERVAL_MS`) plus an instant local push (`addLocal`) right after a
status change, so you see feedback without waiting for the next poll. Swap
the polling `useEffect` for a WebSocket or Server-Sent Events subscription
when your backend supports one — no other file depends on how notifications
arrive.

## State management note

The brief left the choice between Redux Toolkit and Context API open. This
scaffold uses Context API: the state graph here (auth, a complaint list with
filters, a notification feed) is shallow and doesn't need normalized-store
features like RTK Query caching or the Redux DevTools time-travel debugger.
If the app grows to need optimistic updates across many interdependent
entities, or you want the built-in caching/invalidation of RTK Query, moving
each context's reducer into a Redux slice is a mechanical refactor — the
`hooks/` layer already isolates every component from *where* the state lives.

## Accessibility

- All interactive elements are reachable by keyboard with a visible focus ring.
- Form fields have associated labels and `aria-describedby` error/hint text.
- Status/priority conveyed with both color and text (not color alone).
- Modals trap Escape-to-close and use `role="dialog"` / `aria-modal`.
- `prefers-reduced-motion` is respected globally.

## What's not included (by design, ready to extend)

- Password reset / email verification flows
- Role management UI (roles are seeded in mock data)
- File upload to real storage (see note above)
- Automated tests
- Pagination happens client-side over the mock dataset; swap for
  server-side pagination params once a real API is connected.
