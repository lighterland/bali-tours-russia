# Bali Closer

Production website for a concierge-led Bali tour service built for travellers from the Russian market.

The site is available in Russian and English and includes curated journeys, Bali services, transparent pricing, trip planning, and direct enquiry handoff.

## Technology

- Next.js 16
- React 19
- TypeScript
- Static export for GitHub Pages
- Optional Resend enquiry endpoint for server-hosted deployments

## Getting started

Requirements:

- Node.js 22
- pnpm 11

```powershell
pnpm install
Copy-Item .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Public contact settings:

```text
NEXT_PUBLIC_WHATSAPP_NUMBER
NEXT_PUBLIC_TELEGRAM_URL
NEXT_PUBLIC_VK_URL
NEXT_PUBLIC_BUSINESS_EMAIL
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_HERO_VIDEO_URL
```

`NEXT_PUBLIC_HERO_VIDEO_URL` is optional. The site uses its local fallback when the value is empty.

The following server-only variables are required only when the Next.js enquiry API is deployed to a server:

```text
RESEND_API_KEY
RESEND_FROM_EMAIL
ENQUIRY_NOTIFICATION_EMAIL
```

Never expose secrets through a `NEXT_PUBLIC_` variable or commit `.env.local`.

## Quality checks

```powershell
pnpm typecheck
pnpm lint
pnpm build
```

## Deployment

Pushes to `main` are built and deployed automatically through GitHub Actions to:

[https://lighterland.github.io/bali-tours-russia/](https://lighterland.github.io/bali-tours-russia/)

The GitHub Pages build is a static export. Enquiries therefore use the client-side WhatsApp, Telegram, VK, or email fallbacks. The `/api/enquiries` endpoint is available only when the project is deployed to a platform that supports the Next.js server runtime and has the Resend variables configured.

## Repository scope

This repository contains only the production website:

- application source code;
- website copy and catalogue data;
- assets used by the website;
- build, quality, and deployment configuration;
- essential technical documentation.

Vendor production packs, physical merchandise designs, business planning, research notes, raw conversations, prototypes, and agent working files are intentionally maintained outside this repository.

## Publication requirements

- Russian customer-facing copy must be reviewed by a fluent Russian speaker.
- Package details, prices, and partner terms must be verified before publication.
- Customer names, contact details, travel dates, and special requests must never be committed.
- Only media with confirmed usage rights may be published.
