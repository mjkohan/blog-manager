# Design System

How the blog-manager design kit is structured, tokened, and authored.

## Source of truth: tokens

All design values live in **`src/styles/tokens.css`** (imported by `src/app/globals.css`).
Tailwind 4 exposes them as utilities via `@theme` — there is **no `tailwind.config.js`**.
Never hard-code hex/px in components; use a token utility.

### Color ramps

Four ramps: `blue` (the teal primary), `gray`, `green` (success), `red` (error).
**The scale is inverted vs. stock Tailwind:** `100` = darkest (`#000`), `0` = white (`#fff`),
with `50` as the mid/base. So `bg-blue-50` is the primary teal, `bg-blue-2` is a faint tint.

### Semantic tokens (prefer these in components)

Ramps are raw material; components should use the **semantic state tokens** so states are
consistent and re-themeable. Each has `-hover` / `-focus` / `-press` (and often `-disable`,
sometimes `-selected`) variants:

| Group      | Tokens                                                 | Use for                                                      |
| ---------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| Primary    | `primary-bg1*`, `primary-bg2*`, `primary-fg1*`         | teal surfaces / text, e.g. primary button (`bg-primary-bg2`) |
| Success    | `success-bg1*`, `success-bg2*`, `success-fg1*`         | positive surfaces / toasts                                   |
| Error      | `error-bg1*`, `error-bg2*`, `error-fg1*`, `error-fg2*` | invalid inputs, destructive actions, `Required field`        |
| Neutral bg | `bg1*`, `bg2*`                                         | page/card/control surfaces                                   |
| Neutral fg | `fg1*` (primary text), `fg2*` (muted), `fg3` (on-dark) | text                                                         |
| Stroke     | `st1*`, `st2*`, `st3*`                                 | borders / dividers (st1 strongest → st3 faintest)            |

Example: `className="bg-primary-bg2 hover:bg-primary-bg2-hover text-error-fg2 disabled:bg-primary-bg2-disable"`.

### Radius

`rounded-1..6` (2/4/8/12/16/20px) + `rounded-circular` (pill). Aliases: `rounded-xs..xxl`.

### Spacing

Design `space-0X` maps 1:1 onto stock Tailwind spacing keys — no redefinition. `space-02` = `p-2` (8px), etc.

### Typography

Derived **per component** as Figma specs arrive (no speculative scale). When a component needs
a type style not yet tokened, add it to `@theme` in `globals.css` and use it — don't inline.

## Component authoring convention

Base UI lives in `src/components/ui/<Name>/` and is **presentational only** — no data fetching,
no domain logic (that belongs in `src/features/*`). Each component folder ships:

```
<Name>/
  <Name>.tsx          # named export; classes via cn(); every state driven by props
  <Name>.stories.tsx  # one story per state: default / hover / focus / filled / disabled / error
  <Name>.test.tsx     # render + behavior/a11y assertions (Vitest + RTL)
  index.ts            # re-export
```

Rules:

- **Named exports**, `UpperCamelCase` file names.
- Compose classes with `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge); no inline
  `style` objects unless the value is truly dynamic.
- Build **all states**: default / hover / focus / filled / disabled / **error**. Grading checks these.
- **LTR / English** UI (`dir="ltr"`). Still prefer logical props (`ms-*`/`me-*`, `text-start`) for
  clean direction-agnostic layout, but no RTL mirroring is required.
- **Responsive by default** — see below.
- a11y is non-negotiable: labels, roles, visible focus rings, keyboard support.

### Responsive by default (required)

Every component and layout must work from mobile → tablet → desktop. Mobile was **not** designed,
so our responsive decisions are graded — treat this as a first-class requirement, not an afterthought.

- **Never hard-code a width/height on the component itself.** Base UI is fluid: default to `w-full`
  and let the parent constrain size. Fixed Figma frame sizes (e.g. 408px) belong in the **story
  decorator**, not the component. (See `Input`/`Field` — component is `w-full`; 408 lives in the story.)
- Prefer **fluid + intrinsic** sizing: `w-full`, `max-w-*`, `min-w-0`, `flex-1`, `grid`/`flex` with
  wrapping. Use `max-w-full` on anything that could overflow (images, media, wide text).
- Add breakpoints **mobile-first**: unprefixed = mobile, then `sm:` / `md:` / `lg:` to enhance.
  Don't ship desktop-only layouts.
- Layout patterns (from CLAUDE.md §8): table → stacked cards on mobile; sidebar → drawer on
  mobile/tablet. Tap targets ≥ 40px; no horizontal page scroll.
- Verify each component in Storybook at narrow viewports (toolbar viewport addon) before done.

## Storybook

Component workshop for building/QA-ing states in isolation.

```bash
pnpm storybook        # dev server on http://localhost:6006
pnpm build-storybook  # static build -> storybook-static/ (gitignored)
```

- Framework: `@storybook/nextjs-vite` (Vite builder — React 19 / Next 16 compatible).
- Tailwind 4 tokens are available in stories: `globals.css` is imported in `.storybook/preview.ts`.
- The **a11y addon** is enabled — check the Accessibility panel for each story.
- Author stories per the convention above (one per state).

## Tests

```bash
pnpm test       # vitest watch
pnpm test:run   # vitest once (CI)
```

- Vitest + React Testing Library + jsdom. Setup: `vitest.config.ts`, `vitest.setup.ts`.
- Unit-test pure utils (`cn`, later `slugify`/`excerpt`/pagination math) and key base components.
- Co-locate `*.test.tsx` with the component. Mock the network with MSW (added with feature work).
