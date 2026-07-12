# Prototype the customer and operator journey

Type: prototype
Status: resolved
Blocked by: 03

Prototype package discovery, enquiry or booking, confirmation, customer notes, and operational handoff. Decide whether the MVP needs direct booking or a WhatsApp-led enquiry.

## Comments

- 2026-07-12: Scope updated after the pilot-first decision in `Define packages, pricing, and fulfilment`. Legal/payment validation and demand testing remain required before activation or public launch, but they do not block prototyping the assisted journey with explicit placeholders. Direct checkout is out of scope for the pilot; use the decided WhatsApp/form enquiry flow.
- 2026-07-12: Claimed to prototype three structurally different assisted journeys on a single local route. All variants retain the selected premium concierge-first direction with catalogue and trust proof; they compare how customers move from package discovery into enquiry and how booking/handoff state is surfaced. No real submission, payment, persistence, or partner commitment is included.
- 2026-07-12: Prototype created at `prototype/booking-journey/` with A Guided concierge, B Catalogue to brief, and C Journey transparency. Package selection, enquiry form simulation, structured booking summary, state progression, and customer/operator views are interactive in memory. Syntax and desktop interactions were verified; final verdict and direct mobile visual review remain pending. See `prototype/booking-journey/NOTES.md` and `MEDIA.md`.

## Resolution

Resolved on 2026-07-12. The final direction is a single production-oriented experience built from the previously selected concierge-first Variant C in `prototype/partner-website`, augmented with the structured catalogue and trust proof already decided. The live site must provide both assisted contact paths: a website form that notifies the business so the team initiates contact, and a direct `wa.me` path where the customer initiates WhatsApp. Booking remains assisted rather than instant checkout. The exploratory variants are historical references only; production code must be rewritten and mobile-friendly.
