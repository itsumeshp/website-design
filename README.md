# Fexo Company Website

Dynamic company website built from the Fexo theme — **Next.js (App Router) + Payload CMS 3 + PostgreSQL**.
See [`../PLAN.md`](../PLAN.md) for the full migration plan and phase breakdown.

## Stack

- Next.js 16 (App Router, React 19, TypeScript)
- Payload CMS 3 (admin at `/admin`, REST + GraphQL API)
- PostgreSQL (via `@payloadcms/db-postgres`)
- Tailwind CSS v4 (Fexo design tokens in `src/app/(frontend)/styles.css`)
- Fonts: Ubuntu (headings) + DM Sans (body) via `next/font`

## Local development

```bash
# 1. Start Postgres
docker compose up -d

# 2. Configure env (first time)
cp .env.example .env          # then set PAYLOAD_SECRET (openssl rand -hex 32)

# 3. Install + run
npm install
npm run dev                   # http://localhost:3000  (admin: /admin)
```

First visit to `/admin` prompts creating the initial admin user.

## Useful scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server (schema auto-pushed to Postgres) |
| `npm run devsafe` | Dev server with a clean `.next` |
| `npm run build` | Production build |
| `npm run generate:types` | Regenerate `src/payload-types.ts` after config changes |
| `npm run generate:importmap` | Regenerate admin import map after adding custom components |
| `npm run lint` | ESLint |

## Environment variables

| Var | Purpose |
|-----|---------|
| `DATABASE_URI` | Postgres connection string |
| `PAYLOAD_SECRET` | Payload encryption secret |
| `NEXT_PUBLIC_SERVER_URL` | Public site URL |
| `RESEND_API_KEY` | Contact-form email (Phase 3) |
| `CONTACT_TO_EMAIL` | Where contact leads are sent (Phase 3) |

## Status

**Phase 0 (scaffold) — complete.** Next: Phase 1 — content model (collections + globals) and admin.
