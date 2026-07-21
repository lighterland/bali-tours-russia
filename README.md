# Bali Tours — Russian Market

Production-oriented Next.js website for a concierge-first Bali tour service marketed directly to travellers from Russia.

## Local development

```powershell
Copy-Item .env.example .env.local
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Required environment variables

Public:

- `NEXT_PUBLIC_WHATSAPP_NUMBER` — international digits only; used for `wa.me`.
- `NEXT_PUBLIC_TELEGRAM_URL`
- `NEXT_PUBLIC_VK_URL`
- `NEXT_PUBLIC_BUSINESS_EMAIL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_HERO_VIDEO_URL` — optional; local `/media/hero-bali.mp4` or hosted URL.

Server-only:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` — must use a Resend-verified sending domain.
- `ENQUIRY_NOTIFICATION_EMAIL`

Never prefix secrets with `NEXT_PUBLIC_` or commit `.env.local`.

## Contact flows

1. Direct WhatsApp: `wa.me` opens a URL-encoded Russian template; the customer starts the conversation.
2. Website form: `POST /api/enquiries` validates input and sends a Resend notification; the business team starts follow-up using the customer’s required WhatsApp number or preferred channel.

The form includes server-side validation, conditional email requirement, consent, a honeypot, and a Resend idempotency key. Email is a notification, not the booking source of truth. Add durable rate limiting or CAPTCHA only if measured spam justifies the extra friction.

## Quality checks

```powershell
pnpm typecheck
pnpm lint
pnpm build
```

## Deployment

Deploy to Vercel, configure all environment variables separately for Development, Preview, and Production, then redeploy. Confirm the Resend domain and destination inbox before enabling the form publicly.

## Launch checklist

- Buy and confirm the final brand domain, with `balicloser.com` as the current candidate.
- Add the domain to Resend and verify the required SPF and DKIM DNS records.
- Configure `booking@balicloser.com` as the preferred sender and a reply-capable business inbox or forwarding destination.
- Set production values for `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `ENQUIRY_NOTIFICATION_EMAIL`; never expose the API key in browser code.
- Because GitHub Pages is static, choose and connect a separate serverless/backend endpoint before enabling Resend-powered form delivery. Until then, retain WhatsApp, Telegram, VK, and email-draft fallbacks.
- Replace temporary Pexels CDN URLs with locally downloaded assets; follow `docs/media-acquisition-guide.md`.
- Add the final WhatsApp Business number and fallback channel URLs.
- Verify at least the packages/prices intended for public sale; otherwise keep copy as indicative/on-request.
- Add the real operator/team image only with written permission.
- Have Russian copy reviewed by a fluent speaker.
- Complete legal review for privacy, payments, refunds, and Russia-facing data handling.
- Test form delivery and spam controls in Vercel Preview.
- Test keyboard, mobile, reduced-motion, and slow-network behaviour.
