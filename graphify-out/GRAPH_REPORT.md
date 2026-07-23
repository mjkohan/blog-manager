# Graph Report - . (2026-07-23)

## Corpus Check

- 14 files · ~38,744 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary

- 696 nodes · 1079 edges · 72 communities (34 shown, 38 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 25 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)

- constants.ts
- cn()
- ControlSize
- utils.ts
- auth-api.ts
- posts-api.ts
- Icon.tsx
- compilerOptions
- scripts
- Button.tsx
- Input.tsx
- README — Blog Admin Dashboard
- dependencies
- LinkButton.tsx
- Component authoring convention (presenta
- Checkbox.tsx
- Section.stories.tsx
- Toast.tsx
- AuthCard.tsx
- devDependencies
- Foundations.stories.tsx
- .prettierrc.json
- Spinner.tsx
- useMediaQuery.test.ts
- Chevron Down Icon
- create/page.tsx
- src/proxy.ts
- Design Tokens (tokens.css / @theme)
- Next.js Logo
- preview.tsx
- commitlint.config.mjs
- @commitlint/config-conventional
- eslint
- eslint.config.mjs
- eslint-config-next
- eslint-plugin-storybook
- husky
- jsdom
- lint-staged
- msw
- next.config.ts
- @playwright/test
- prettier
- prettier-plugin-tailwindcss
- storybook
- @storybook/addon-a11y
- @storybook/addon-docs
- @storybook/nextjs-vite
- tailwindcss
- @tailwindcss/postcss
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event
- @types/node
- typescript
- vite
- @vitejs/plugin-react
- postcss.config.mjs
- Check Circle Icon
- Ellipsis Icon
- Info Icon
- main.ts
- Design System
- File Document Icon
- Globe Icon

## God Nodes (most connected - your core abstractions)

1. `cn()` - 48 edges
2. `compilerOptions` - 16 edges
3. `scripts` - 16 edges
4. `ControlSize` - 13 edges
5. `ArticleRow` - 12 edges
6. `ROUTES` - 10 edges
7. `slugify()` - 9 edges
8. `README — Blog Admin Dashboard` - 9 edges
9. `getCurrentUser()` - 8 edges
10. `include` - 7 edges

## Surprising Connections (you probably didn't know these)

- `CI Format Check Gate` --conceptually_related_to--> `cn() class composer (clsx + tailwind-merge)` [AMBIGUOUS]
  .github/workflows/ci.yml → docs/DESIGN-SYSTEM.md
- `Server-Side Pagination (limit 10, skip)` --conceptually_related_to--> `getArticles Server Loader` [INFERRED]
  CLAUDE.md → docs/API-MAPPING.md
- `pnpm Setup Step` --conceptually_related_to--> `pnpm Workspace Config` [INFERRED]
  .github/workflows/ci.yml → pnpm-workspace.yaml
- `Blog Admin Dashboard UI Kit (Introduction)` --conceptually_related_to--> `Component authoring convention (presentational, all states)` [INFERRED]
  src/Introduction.mdx → docs/DESIGN-SYSTEM.md
- `a11y Addon (violations fail)` --conceptually_related_to--> `Storybook (nextjs-vite, a11y addon)` [INFERRED]
  src/Introduction.mdx → docs/DESIGN-SYSTEM.md

## Import Cycles

- None detected.

## Hyperedges (group relationships)

- **Reads on Server, Writes on Client** — rsc_reads, react_query_writes, session_overlay, get_articles_loader, simulated_writes [INFERRED 0.85]
- **httpOnly-Cookie Auth Flow** — httponly_cookie_auth, session_management, auth_api, proxy_route_guard [INFERRED 0.85]
- **Design ↔ API Mismatch Handling** — slug_to_id_mapping, synthetic_date, excerpt_derivation, author_username_lookup, alphabetical_tag_list [INFERRED 0.85]
- **CI Quality Gates** — github_workflows_ci_typecheck_gate, github_workflows_ci_lint_gate, github_workflows_ci_format_check_gate, github_workflows_ci_build_gate [EXTRACTED 0.90]
- **Chevron Directional Navigation Set** — public_icons_chevron_up_icon, public_icons_chevron_down_icon, public_icons_chevron_left_icon, public_icons_chevron_right_icon [INFERRED 0.85]
- **Status and Action UI Icon Set** — public_icons_info_icon, public_icons_warning_icon, public_icons_ellipsis_icon [INFERRED 0.75]
- **Framework and Brand Asset Set** — public_next_logo, public_vercel_logo, public_window_icon [INFERRED 0.75]

## Communities (72 total, 38 thin omitted)

### Community 0 - "constants.ts"

Cohesion: 0.06
Nodes (32): metadata, geistMono, inter, metadata, metadata, Home(), metadata, QueryProvider() (+24 more)

### Community 1 - "cn()"

Cohesion: 0.07
Nodes (32): Menu(), Default, LoadingMore, Sizes, Story, MenuItem(), sizeClasses, Modal() (+24 more)

### Community 2 - "ControlSize"

Cohesion: 0.06
Nodes (32): ButtonProps, ControlSize, MenuItemProps, Pagination(), PaginationProps, getPaginationRange(), PageItem, sizeClasses (+24 more)

### Community 3 - "utils.ts"

Cohesion: 0.09
Nodes (30): metadata, ArticlesList(), ArticlesListProps, renderList(), rows, Wrapper(), ArticlesTable(), ArticlesTableProps (+22 more)

### Community 4 - "auth-api.ts"

Cohesion: 0.10
Nodes (27): DashboardLayout(), addUser(), getMe(), login(), refresh(), getCurrentUser(), AddUserResponse, addUserResponseSchema (+19 more)

### Community 5 - "posts-api.ts"

Cohesion: 0.09
Nodes (30): EditArticlePage(), metadata, deletePost(), getPost(), getPostIdBySlug(), getPosts(), getTagList(), getUsername() (+22 more)

### Community 6 - "Icon.tsx"

Cohesion: 0.10
Nodes (24): Shell(), ShellProps, { usePathnameMock }, Sidebar(), SidebarProps, { usePathnameMock }, CheckCircleIcon, ChevronDownIcon (+16 more)

### Community 7 - "compilerOptions"

Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/\*.mts, .next/dev/types/**/_.ts, next-env.d.ts, .next/types/\**/_.ts, node_modules (+20 more)

### Community 8 - "scripts"

Cohesion: 0.07
Nodes (27): engines, node, lint-staged, *.{json,css,md,mjs}, *.{ts,tsx}, name, packageManager, private (+19 more)

### Community 9 - "Button.tsx"

Cohesion: 0.09
Nodes (19): Button(), ButtonVariant, sizeClasses, Danger, Disabled, IconOnly, Loading, Primary (+11 more)

### Community 10 - "Input.tsx"

Cohesion: 0.11
Nodes (18): Field(), FieldProps, Default, Required, Story, WithError, WithHint, Input() (+10 more)

### Community 11 - "README — Blog Admin Dashboard"

Cohesion: 0.13
Nodes (25): Alphabetical Tag List (getTagList), lib/api-client.ts Single Network Choke Point, ArticleForm (RHF + Zod), Articles Routing (/articles vs /articles/page/:page), features/auth/api/auth-api.ts, Author @username Lookup (getUsername, cache()), CLAUDE.md — Blog Admin Dashboard Guide, API Mapping — DummyJSON ↔ App (+17 more)

### Community 12 - "dependencies"

Cohesion: 0.10
Nodes (21): clsx, @hookform/resolvers, next, dependencies, clsx, @hookform/resolvers, next, react (+13 more)

### Community 13 - "LinkButton.tsx"

Cohesion: 0.15
Nodes (12): AnchorProps, ButtonProps, LinkButton(), LinkButtonProps, sizeClasses, SizedProps, AsLink, Default (+4 more)

### Community 14 - "Component authoring convention (presenta"

Cohesion: 0.16
Nodes (15): cn() class composer (clsx + tailwind-merge), Component authoring convention (presentational, all states), ControlSize (sm/md/lg shared type), Responsive by default (fluid base UI), Storybook (nextjs-vite, a11y addon), CI Build Gate, CI Workflow (quality job), CI Format Check Gate (+7 more)

### Community 15 - "Checkbox.tsx"

Cohesion: 0.16
Nodes (9): Checkbox(), CheckboxProps, sizeClasses, Indeterminate, Off, On, Sizes, Story (+1 more)

### Community 16 - "Section.stories.tsx"

Cohesion: 0.21
Nodes (8): Section(), SectionProps, HeaderOnly, Story, WithContent, WithoutDivider, SectionHeader(), SectionHeaderProps

### Community 17 - "Toast.tsx"

Cohesion: 0.21
Nodes (9): Error, Story, Success, TitleOnly, WithAction, Toast(), ToastProps, ToastType (+1 more)

### Community 18 - "AuthCard.tsx"

Cohesion: 0.24
Nodes (7): AuthCard(), AuthCardProps, SignIn, SignInFailed, SignUp, Story, WithFieldError

### Community 19 - "devDependencies"

Cohesion: 0.22
Nodes (9): @commitlint/cli, devDependencies, @commitlint/cli, @types/react, @types/react-dom, vitest, @types/react, @types/react-dom (+1 more)

### Community 20 - "Foundations.stories.tsx"

Cohesion: 0.22
Nodes (6): BlueRamp, meta, Radius, NOTE: Tailwind 4 scans source for _literal_ class strings — interpolated names, SemanticColors, Story

### Community 21 - ".prettierrc.json"

Cohesion: 0.25
Nodes (7): plugins, printWidth, semi, singleQuote, tabWidth, trailingComma, prettier-plugin-tailwindcss

### Community 22 - "Spinner.tsx"

Cohesion: 0.36
Nodes (4): Spinner(), Default, Sizes, Story

### Community 24 - "Chevron Down Icon"

Cohesion: 0.50
Nodes (4): Chevron Down Icon, Chevron Left Icon, Chevron Right Icon, Chevron Up Icon

### Community 26 - "src/proxy.ts"

Cohesion: 0.67
Nodes (3): config, proxy(), PUBLIC_PATHS

### Community 27 - "Design Tokens (tokens.css / @theme)"

Cohesion: 0.67
Nodes (3): Inverted color ramps (100=darkest, 0=white), Semantic state tokens, Design Tokens (tokens.css / @theme)

### Community 28 - "Next.js Logo"

Cohesion: 0.67
Nodes (3): Next.js Logo, Vercel Logo, Window Icon

## Ambiguous Edges - Review These

- `CI Format Check Gate` → `cn() class composer (clsx + tailwind-merge)` [AMBIGUOUS]
  .github/workflows/ci.yml · relation: conceptually_related_to

## Knowledge Gaps

- **270 isolated node(s):** `semi`, `singleQuote`, `trailingComma`, `printWidth`, `tabWidth` (+265 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **38 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `CI Format Check Gate` and `cn() class composer (clsx + tailwind-merge)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `cn()` connect `cn()` to `ControlSize`, `utils.ts`, `Icon.tsx`, `Button.tsx`, `Input.tsx`, `LinkButton.tsx`, `Section.stories.tsx`, `Toast.tsx`, `AuthCard.tsx`, `Spinner.tsx`?**
  _High betweenness centrality (0.139) - this node is a cross-community bridge._
- **Why does `ROUTES` connect `constants.ts` to `Icon.tsx`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `scripts`, `@commitlint/config-conventional`, `eslint`, `eslint-config-next`, `eslint-plugin-storybook`, `husky`, `jsdom`, `lint-staged`, `msw`, `@playwright/test`, `prettier`, `prettier-plugin-tailwindcss`, `storybook`, `@storybook/addon-a11y`, `@storybook/addon-docs`, `@storybook/nextjs-vite`, `tailwindcss`, `@tailwindcss/postcss`, `@testing-library/jest-dom`, `@testing-library/react`, `@testing-library/user-event`, `@types/node`, `typescript`, `vite`, `@vitejs/plugin-react`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `semi`, `singleQuote`, `trailingComma` to the rest of the system?**
  _270 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `constants.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06110102843315184 - nodes in this community are weakly interconnected._
- **Should `cn()` be split into smaller, more focused modules?**
  _Cohesion score 0.07197763801537387 - nodes in this community are weakly interconnected._
