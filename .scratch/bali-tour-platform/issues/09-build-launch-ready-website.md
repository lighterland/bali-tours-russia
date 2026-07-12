# Build the launch-ready concierge website

Type: task
Status: claimed
Blocked by: 03, 05

Rewrite the selected concierge-first direction as one deployable Next.js website for the Russian market. Include the development catalogue, premium atmosphere, trust/process proof, a direct `wa.me` path, and an enquiry form backed by a server-only Resend route.

## Done when

- There is one production app with no prototype switcher or A/B/C framing.
- The page is responsive on mobile and desktop.
- Russian is primary and the structure is localization-ready for English/Indonesian later.
- The catalogue uses clearly managed indicative content and assisted availability.
- The form requires WhatsApp, conditionally requires email, records consent, validates server-side, includes spam protection, and notifies the business through Resend.
- WhatsApp direct CTA uses `wa.me` with a URL-encoded Russian template and a configured business number.
- Secrets remain server-side and deployment configuration is documented.
- Pexels download slots and a premium video shot/keyword brief are documented.
- Typecheck, lint, production build, and mobile/desktop QA pass.

## Comments

- 2026-07-12: Claimed after Erland explicitly moved the work from prototype comparison to a single launch-oriented implementation. Partner verification may revise content later but does not block development; unsupported operational claims must remain conservative until confirmed.
- 2026-07-12: Production implementation created with Next.js 16 App Router, TypeScript, one concierge-first page, typed development catalogue, direct `wa.me` message generation, and a server-only Resend enquiry route. Media acquisition/video guidance is at `docs/media-acquisition-guide.md`.
- 2026-07-12: Quality commands passed after two-axis code review and fixes: `pnpm typecheck`, `pnpm lint`, and `pnpm build`. Build output includes static `/`, `/privacy`, `/robots.txt`, `/sitemap.xml`, plus dynamic `/api/enquiries`.
- 2026-07-12: Remaining publication gates: configure real environment values and Resend domain/inbox; replace or approve final media; obtain fluent-Russian copy review; complete legal/privacy/payment review; and record direct mobile/desktop visual QA. Ticket stays claimed until those gates are evidenced.
