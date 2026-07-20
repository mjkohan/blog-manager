# Graph Report - . (2026-07-20)

## Corpus Check

- 7 files · ~13,850 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary

- 438 nodes · 596 edges · 59 communities (24 shown, 35 thin omitted)
- Extraction: 97% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)

- Modal, Section & Utils
- Package Manifest & Core Deps
- TypeScript Config
- Button & Header
- Field & Input
- Pagination & Media-Query Hook
- Design-System Docs & CI
- Icon Set
- Menu & Spinner
- Auth Screens (Login/Register)
- Checkbox
- LinkButton
- Placeholder & Section Stories
- Toast
- SidebarItem
- Design Foundations Stories
- Prettier Config
- Commitlint & Test Deps
- Root Layout
- Chevron Icons
- Logo Assets
- Storybook Preview
- Commitlint Config
- ESLint
- ESLint Config
- eslint-config-next
- eslint-plugin-storybook
- Husky
- jsdom
- lint-staged
- Next Config
- Prettier
- prettier-plugin-tailwindcss
- Storybook
- storybook-addon-a11y
- storybook-addon-docs
- storybook-nextjs-vite
- Tailwind CSS
- tailwindcss-postcss
- testing-library/react
- testing-library/user-event
- @types/node
- @types/react
- @types/react-dom
- TypeScript
- Vite
- vitejs-plugin-react
- Vitest
- PostCSS Config
- Check Icons
- Ellipsis & Minus Icons
- Info & Warning Icons
- README
- Storybook Main
- File Icon
- Globe Icon

## God Nodes (most connected - your core abstractions)

1. `cn()` - 44 edges
2. `compilerOptions` - 16 edges
3. `scripts` - 14 edges
4. `Button()` - 7 edges
5. `Pagination()` - 7 edges
6. `Placeholder()` - 7 edges
7. `Spinner()` - 7 edges
8. `include` - 7 edges
9. `Input()` - 6 edges
10. `ModalHeader()` - 6 edges

## Surprising Connections (you probably didn't know these)

- `Next.js Agent Rules (breaking-change warning)` --conceptually_related_to--> `Blog Admin Dashboard UI Kit (Introduction)` [AMBIGUOUS]
  AGENTS.md → src/Introduction.mdx
- `a11y Addon (violations fail)` --semantically_similar_to--> `Responsive by Default` [INFERRED] [semantically similar]
  src/Introduction.mdx → docs/DESIGN-SYSTEM.md
- `CI Format Check Gate` --conceptually_related_to--> `cn() helper (clsx + tailwind-merge)` [AMBIGUOUS]
  .github/workflows/ci.yml → docs/DESIGN-SYSTEM.md
- `pnpm Setup Step` --conceptually_related_to--> `pnpm Workspace Config` [INFERRED]
  .github/workflows/ci.yml → pnpm-workspace.yaml
- `Blog Admin Dashboard UI Kit (Introduction)` --conceptually_related_to--> `Component Authoring Convention` [INFERRED]
  src/Introduction.mdx → docs/DESIGN-SYSTEM.md

## Import Cycles

- None detected.

## Hyperedges (group relationships)

- **CI Quality Gates** — github_workflows_ci_typecheck_gate, github_workflows_ci_lint_gate, github_workflows_ci_format_check_gate, github_workflows_ci_build_gate [EXTRACTED 0.90]
- **Component Authoring Pattern** — docs_design_system_component_convention, docs_design_system_component_states, docs_design_system_cn_helper, docs_design_system_storybook, docs_design_system_vitest_rtl [INFERRED 0.75]
- **Design Token Pipeline** — docs_design_system_tokens, docs_design_system_color_ramps, docs_design_system_semantic_tokens, docs_design_system_theme_directive [INFERRED 0.75]
- **Chevron Directional Navigation Set** — public_icons_chevron_up_icon, public_icons_chevron_down_icon, public_icons_chevron_left_icon, public_icons_chevron_right_icon [INFERRED 0.85]
- **Status and Action UI Icon Set** — public_icons_info_icon, public_icons_warning_icon, public_icons_ellipsis_icon [INFERRED 0.75]
- **Framework and Brand Asset Set** — public_next_logo, public_vercel_logo, public_window_icon [INFERRED 0.75]

## Communities (59 total, 35 thin omitted)

### Community 0 - "Modal, Section & Utils"

Cohesion: 0.09
Nodes (27): Modal(), ModalProps, ModalSize, sizeClasses, Danger, Default, ErrorMessage, Large (+19 more)

### Community 1 - "Package Manifest & Core Deps"

Cohesion: 0.06
Nodes (34): clsx, next, dependencies, clsx, next, react, react-dom, tailwind-merge (+26 more)

### Community 2 - "TypeScript Config"

Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/\*.mts, .next/dev/types/**/_.ts, next-env.d.ts, .next/types/\**/_.ts, node_modules (+20 more)

### Community 3 - "Button & Header"

Cohesion: 0.10
Nodes (18): Button(), ButtonProps, ButtonVariant, Danger, Disabled, IconOnly, Loading, Primary (+10 more)

### Community 4 - "Field & Input"

Cohesion: 0.11
Nodes (18): Field(), FieldProps, Default, Required, Story, WithError, WithHint, Input() (+10 more)

### Community 5 - "Pagination & Media-Query Hook"

Cohesion: 0.13
Nodes (13): Pagination(), PaginationProps, getPaginationRange(), PageItem, AsLinks, Default, Disabled, FewPages (+5 more)

### Community 6 - "Design-System Docs & CI"

Cohesion: 0.12
Nodes (22): Next.js Agent Rules (breaking-change warning), Design System, cn() helper (clsx + tailwind-merge), Color Ramps (inverted scale), Component Authoring Convention, All Component States (default/hover/focus/filled/disabled/error), Responsive by Default, Semantic State Tokens (+14 more)

### Community 7 - "Icon Set"

Cohesion: 0.19
Nodes (15): CheckCircleIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, createIcon(), EllipsisIcon, IconName (+7 more)

### Community 8 - "Menu & Spinner"

Cohesion: 0.18
Nodes (10): Menu(), Default, LoadingMore, Story, MenuItem(), MenuItemProps, Spinner(), Default (+2 more)

### Community 9 - "Auth Screens (Login/Register)"

Cohesion: 0.15
Nodes (9): metadata, metadata, AuthCard(), AuthCardProps, SignIn, SignInFailed, SignUp, Story (+1 more)

### Community 10 - "Checkbox"

Cohesion: 0.19
Nodes (7): Checkbox(), CheckboxProps, Indeterminate, Off, On, Story, WithLabel

### Community 11 - "LinkButton"

Cohesion: 0.19
Nodes (9): AnchorProps, ButtonProps, LinkButton(), LinkButtonProps, AsLink, Default, Disabled, States (+1 more)

### Community 12 - "Placeholder & Section Stories"

Cohesion: 0.21
Nodes (8): Placeholder(), CustomLabel, Default, Story, HeaderOnly, Story, WithContent, WithoutDivider

### Community 13 - "Toast"

Cohesion: 0.21
Nodes (9): Error, Story, Success, TitleOnly, WithAction, Toast(), ToastProps, ToastType (+1 more)

### Community 14 - "SidebarItem"

Cohesion: 0.24
Nodes (7): SidebarItem(), SidebarItemProps, Default, List, Selected, Story, WithDescription

### Community 15 - "Design Foundations Stories"

Cohesion: 0.22
Nodes (6): BlueRamp, meta, Radius, NOTE: Tailwind 4 scans source for _literal_ class strings — interpolated names, SemanticColors, Story

### Community 16 - "Prettier Config"

Cohesion: 0.25
Nodes (7): plugins, printWidth, semi, singleQuote, tabWidth, trailingComma, prettier-plugin-tailwindcss

### Community 17 - "Commitlint & Test Deps"

Cohesion: 0.29
Nodes (7): @commitlint/cli, @commitlint/config-conventional, devDependencies, @commitlint/cli, @commitlint/config-conventional, @testing-library/jest-dom, @testing-library/jest-dom

### Community 18 - "Root Layout"

Cohesion: 0.40
Nodes (3): geistMono, inter, metadata

### Community 19 - "Chevron Icons"

Cohesion: 0.50
Nodes (4): Chevron Down Icon, Chevron Left Icon, Chevron Right Icon, Chevron Up Icon

### Community 20 - "Logo Assets"

Cohesion: 0.67
Nodes (3): Next.js Logo, Vercel Logo, Window Icon

## Ambiguous Edges - Review These

- `CI Format Check Gate` → `cn() helper (clsx + tailwind-merge)` [AMBIGUOUS]
  .github/workflows/ci.yml · relation: conceptually_related_to
- `Next.js Agent Rules (breaking-change warning)` → `Blog Admin Dashboard UI Kit (Introduction)` [AMBIGUOUS]
  AGENTS.md · relation: conceptually_related_to

## Knowledge Gaps

- **219 isolated node(s):** `semi`, `singleQuote`, `trailingComma`, `printWidth`, `tabWidth` (+214 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `CI Format Check Gate` and `cn() helper (clsx + tailwind-merge)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Next.js Agent Rules (breaking-change warning)` and `Blog Admin Dashboard UI Kit (Introduction)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `cn()` connect `Modal, Section & Utils` to `Button & Header`, `Field & Input`, `Pagination & Media-Query Hook`, `Icon Set`, `Menu & Spinner`, `Checkbox`, `LinkButton`, `Placeholder & Section Stories`, `Toast`, `SidebarItem`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Commitlint & Test Deps` to `Package Manifest & Core Deps`, `ESLint`, `eslint-config-next`, `eslint-plugin-storybook`, `Husky`, `jsdom`, `lint-staged`, `Prettier`, `prettier-plugin-tailwindcss`, `Storybook`, `storybook-addon-a11y`, `storybook-addon-docs`, `storybook-nextjs-vite`, `Tailwind CSS`, `tailwindcss-postcss`, `testing-library/react`, `testing-library/user-event`, `@types/node`, `@types/react`, `@types/react-dom`, `TypeScript`, `Vite`, `vitejs-plugin-react`, `Vitest`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `Button()` connect `Button & Header` to `Modal, Section & Utils`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `semi`, `singleQuote`, `trailingComma` to the rest of the system?**
  _219 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Modal, Section & Utils` be split into smaller, more focused modules?**
  _Cohesion score 0.09042553191489362 - nodes in this community are weakly interconnected._
