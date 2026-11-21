## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Branches and staging

- `main` is production: every push deploys to https://amply.cl. Only small, verified changes go straight to `main`.
- `staging` is a stable test branch: every push deploys to https://staging.amply.cl (Cloudflare Pages preview, same Functions and bindings as production, `noindex`). Larger features go to `staging` first (or a feature branch merged into `staging`), get tested there, and are merged into `main` only after Bairon approves.
- Other branches get a throwaway preview at `https://<branch>.amply-4fd.pages.dev`.
- The contact form works on staging and sends real email; subjects are prefixed with `[Prueba …]`.
- Never push or merge to `main` without Bairon's explicit OK.

## Design rules

Before changing any page, component, copy or style, read [DESIGN.md](DESIGN.md). Its rules are strict: concise copy in the voice of datawalt.cl, generous spacing, software before AI employees, day and night themes, theme tokens only, no invented testimonials or figures.

## Pending work (Linear)

All pending work for Amply lives in Linear: workspace **AmplyDev**, team **AMP**, project **Amply** (https://linear.app/amplydev/project/amply-de746bd05ea5). Never in TODO files, chat-only lists or the NavieraOrca workspace.

- **Before starting**, check the project for an existing issue (`list_issues`) and reuse it instead of creating a duplicate.
- **When you leave something pending**, create an issue in project Amply: a short title in Spanish, a plain-language description, and agent details (files, commands, findings) inside a collapsible `+++ Agent notes` section.
- **When you work on it**, move it to `In Progress`. When its scope, findings or blockers change, update the description or add a comment.
- **When it's done**, move it to `Done` with a comment saying what changed (commit, URL or setting). Use `Canceled` with the reason if it no longer applies.
- **Priority:** 1 Urgent = hurts site visitors today · 2 High = needed to start selling · 3 Medium = visibility and trust · 4 Low = setup and housekeeping.
- **Labels:** one area (`Web`, `Comercial`, `Infraestructura`, `SEO y marca`, `Legal`) plus `Requiere a Bairon` when it is blocked on a decision, data or a step in his own accounts.
- **Milestones** (project Amply): `1 · Listo para vender`, `2 · Primeros contactos`, `3 · Primer cliente`. Put new issues in the milestone they unblock; housekeeping stays without one.
- Don't put passwords, tokens or API keys in issues.

### Sales pipeline (project Ventas)

Project **Ventas** (https://linear.app/amplydev/project/ventas-687fce448cec) holds one issue per prospect. Before creating a prospect, search Ventas (including canceled issues) so a discarded company isn't prospected again.

- **Stage:** label group `Etapa`, one at a time: `1 · Por contactar` (Todo) → `2 · Contactado` / `3 · Demo` / `4 · Propuesta` (In Progress) → `5 · Ganado` (Done) or `6 · Perdido` (Canceled, with the reason).
- **Every contact is a comment** on the prospect's issue: date, channel, what was said or agreed. Keep a next step with a due date on active prospects.
- **Description sections:** Contacto, Lo que vimos, Qué ofrecerle, Siguiente paso. Only publicly listed or prospect-provided contact data.
- **Never send a message to a prospect** without Bairon's explicit approval; never in bulk.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
