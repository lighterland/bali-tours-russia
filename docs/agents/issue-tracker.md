# Issue tracker: Local Markdown

Issues and specs for this repository live as Markdown files in `.scratch/`.

## Conventions

- One feature or effort per directory: `.scratch/<feature-slug>/`.
- Its spec is `.scratch/<feature-slug>/spec.md`.
- Implementation issues live at `.scratch/<feature-slug>/issues/<NN>-<slug>.md`.
- Each issue records `Status:` and, when applicable, `Blocked by:` near the top.
- Comments and history are appended under `## Comments`.

## Publishing and fetching

When a skill says to publish work, create the appropriate Markdown file under `.scratch/`. When it says to fetch a ticket, read the referenced local file.

## Wayfinding

- Map: `.scratch/<effort>/map.md`.
- Investigation tickets: `.scratch/<effort>/issues/<NN>-<slug>.md`.
- Ticket types: `research`, `prototype`, `grilling`, or `task`.
- Wayfinding status: `claimed` or `resolved`.
- Resolve blockers first and capture decisions in the map.

