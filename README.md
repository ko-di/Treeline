# treeline

The public site for [forest-kit](https://github.com/ko-di/forest-kit).

A treeline is the visible edge where the forest meets open ground — where strangers first see the territory. This is that page.

## Where the copy is

Four pages. The copy that repeats across them lives in [`src/lib/content.ts`](./src/lib/content.ts) — the six camps, the checkpoints, the command list, the use cases. Page-specific prose sits in the page file itself.

Everything here describes [forest-kit](https://github.com/ko-di/forest-kit). The kit is the source of truth: if the two disagree, the site is wrong. Camp names, file paths and command names should all be checkable against the kit's `.claude/skills/`.

| Page | Covers |
|---|---|
| `/` | What it is, the camps at a glance, how it fits together, install |
| `/camps` | Each camp in full, and where it asks for more |
| `/after` | What happens once the early camps are filled in, and who it suits |
| `/setup` | Requirements, install, the first session, project structure |

| File | Holds |
|---|---|
| `src/lib/content.ts` | Camps, checkpoints, commands, use cases — anything used on more than one page |
| `src/components/Banner.tsx` | The pixel banner. Generated — edit the scene in `scripts/banner.mjs`, run it and paste the output in; do not hand-edit the path |
| `src/components/Flow.tsx` | The six-camp diagram: a row on wide screens, a column on phones |
| `src/components/ThemeToggle.tsx` | Light/dark toggle. Stateless by design — CSS picks the icon, so there is nothing to hydrate |
| `src/components/Nav.tsx`, `NavMenu.tsx` | Page links, and the menu they collapse into on a phone |
| `src/components/sections.tsx` | Pieces shared by every page: the footer, the next-page link, and `<Ticks>`, which renders `backticks` in the copy as code |
| `scripts/check-kit-version.mjs` | Runs before every build, and as `npm run check`. Fails if the version the site states differs from the plugin's `plugin.json`: the copy beside this repo when there is one, otherwise the one on GitHub |
| `src/app/opengraph-image.tsx` | The preview image for shared links, drawn from the banner path at build time |
| `src/app/sitemap.ts`, `robots.ts` | For search engines. Add new routes to the sitemap |
| `.github/workflows/checks.yml` | Lint, types and a full build on every push |
| `src/app/globals.css` | Reset, tokens, type, tables, and the diagram styles |
| `public/theme-init.js` | Applies a stored theme before first paint. Must stay a real file loaded with `<script src>` — React will not execute an inline script rendered from a component |

Both illustrations are inline SVG using `currentColor`, so they follow the theme and cost no requests.

**This describes a product that changes.** Nothing links the two, so when the kit gains or loses something the copy here goes stale silently. Worth a read-through whenever the kit ships anything a stranger would notice.

## Design

Built on the [Next.js portfolio](https://vercel.com/templates/next.js/nextjs-portfolio-pageview-counter) template by [chronark](https://github.com/chronark), whose terms ask that their personal content be removed before deploying. It is, entirely — only the design language carries over.

700px measure, 16px body, small headings. Body text is grey and headings near-white, so emphasis comes from weight and contrast rather than size. System font stack, no webfont. Dash markers instead of discs. Hairline rules as the only depth method.

The accent is a muted periwinkle. Dark leads; light follows the system, and a toggle overrides it.

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
