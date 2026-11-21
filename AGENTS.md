## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

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
- Don't put passwords, tokens or API keys in issues.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
