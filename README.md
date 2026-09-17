# treeline

The public site for [forest-kit](https://github.com/ko-di/forest-kit).

A treeline is the visible edge where the forest meets open ground — where strangers first see the territory. This is that page.

## Where the copy is

Four pages. The copy that repeats across them lives in [`src/lib/content.ts`](./src/lib/content.ts) — the six camps, the checkpoints, the command list, the use cases. Page-specific prose sits in the page file itself.

Everything here describes [forest-kit](https://github.com/ko-di/forest-kit). The kit is the source of truth: if the two disagree, the site is wrong. Camp names, file paths and command names should all be checkable against the kit's `.claude/skills/`.

| Page | Covers |
|---|---|
| `/` | What it is, the camps at a glance, how it fits together, install |
| `/stages` | Each camp in full, and where it asks for more |
| `/after` | What happens once the early camps are filled in, and who it suits |
| `/setup` | Requirements, install, the first session, project structure |

| File | Holds |
|---|---|
| `src/lib/content.ts` | Camps, checkpoints, commands, use cases — anything used on more than one page |
| `src/components/Banner.tsx` | The pixel banner. Generated — edit the scene in `scripts/banner.mjs` and re-run it, do not hand-edit the path |
| `src/components/Flow.tsx` | The six-camp diagram |
| `src/components/ThemeToggle.tsx` | Light/dark toggle. Stateless by design — CSS picks the icon, so there is nothing to hydrate |
| `src/components/Nav.tsx` | Page links |
| `src/app/globals.css` | Reset, tokens, type, tables, and the diagram styles |
| `public/theme-init.js` | Applies a stored theme before first paint. Must stay a real file loaded with `<script src>` — React will not execute an inline script rendered from a component |

Both illustrations are inline SVG using `currentColor`, so they follow the theme and cost no requests.

**This describes a product that changes.** Nothing links the two, so when the kit gains or loses something the copy here goes stale silently. Worth a read-through whenever the kit ships anything a stranger would notice.

## Design

Built on the [Next.js portfolio](https://vercel.com/templates/next.js/nextjs-portfolio-pageview-counter) template by [chronark](https://github.com/chronark), whose terms ask that their personal content be removed before deploying. It is, entirely — only the design language carries over.

620px measure, 14px body, small headings. Body text is grey and headings near-white, so emphasis comes from weight and contrast rather than size. System font stack, no webfont. Dash markers instead of discs. Hairline rules as the only depth method.

The one departure: the accent stays our warm ochre rather than the template's periwinkle. Dark leads; light follows the system.

## Stack

Next.js 16 with the App Router and Turbopack, TypeScript, plain CSS custom properties. The build is fully static and ships no webfont.

## Develop

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

If a CSS change does not appear, that is a known trap rather than a caching quirk. A stray `package-lock.json` in the home folder makes Turbopack infer the wrong workspace root and watch the wrong directory. `next.config.ts` pins the root to fix it; if it recurs, look there first.

## Deploy

Pushes to `main` build and promote to production automatically — the GitHub repo is connected to the Vercel project. Live at [treeline-sand.vercel.app](https://treeline-sand.vercel.app).

## License

[MIT](./LICENSE).
