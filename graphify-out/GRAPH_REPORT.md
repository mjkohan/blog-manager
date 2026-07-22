# Graph Report - . (2026-07-22)

## Corpus Check

- 11 files · ~26,901 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary

- 700 nodes · 1116 edges · 74 communities (33 shown, 41 thin omitted)
- Extraction: 97% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)

- actions.ts
- cn()
- utils.ts
- scripts
- ArticleRow
- Icon.tsx
- compilerOptions
- Session Overlay (useArticleOverlay / app
- Input.tsx
- Pagination.tsx
- Component authoring convention (presenta
- Toaster/index.ts
- LinkButton.tsx
- MenuItem.tsx
- SidebarItem.tsx
- Toast.tsx
- AuthCard.tsx
- Button.stories.tsx
- ControlSize
- Header.stories.tsx
- Foundations.stories.tsx
- .prettierrc.json
- Button.tsx
- Spinner.tsx
- devDependencies
- Checkbox.stories.tsx
- getArticleForm loader
- useMediaQuery.test.ts
- Chevron Down Icon
- create/page.tsx
- Design Tokens (tokens.css / @theme)
- Next.js Logo
- preview.tsx
- @commitlint/cli
- commitlint.config.mjs
- Design System
- eslint
- eslint.config.mjs
- eslint-config-next
- eslint-plugin-storybook
- husky
- lint-staged
- msw
- next.config.ts
- prettier
- prettier-plugin-tailwindcss
- storybook
- @storybook/addon-a11y
- @storybook/addon-docs
- @storybook/nextjs-vite
- tailwindcss
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event
- @types/node
- @types/react
- @types/react-dom
- typescript
- vite
- @vitejs/plugin-react
- vitest
- postcss.config.mjs
- Check Circle Icon
- Ellipsis Icon
- Info Icon
- Authentication (Server Action + httpOnly
- main.ts
- File Document Icon
- Globe Icon
- Vercel Deploy
- Simulated Writes (DummyJSON non-persiste

## God Nodes (most connected - your core abstractions)

1. `cn()` - 52 edges
2. `compilerOptions` - 16 edges
3. `ControlSize` - 15 edges
4. `scripts` - 14 edges
5. `ROUTES` - 12 edges
6. `ArticleRow` - 12 edges
7. `slugify()` - 9 edges
8. `getCurrentUser()` - 8 edges
9. `include` - 7 edges
10. `Button()` - 7 edges

## Surprising Connections (you probably didn't know these)

- `CI Format Check Gate` --conceptually_related_to--> `cn() class composer (clsx + tailwind-merge)` [AMBIGUOUS]
  .github/workflows/ci.yml → docs/DESIGN-SYSTEM.md
- `Next.js Agent Rules (breaking-change warning)` --conceptually_related_to--> `Blog Admin Dashboard UI Kit (Introduction)` [AMBIGUOUS]
  AGENTS.md → src/Introduction.mdx
- `pnpm Setup Step` --conceptually_related_to--> `pnpm Workspace Config` [INFERRED]
  .github/workflows/ci.yml → pnpm-workspace.yaml
- `Blog Admin Dashboard UI Kit (Introduction)` --conceptually_related_to--> `Component authoring convention (presentational, all states)` [INFERRED]
  src/Introduction.mdx → docs/DESIGN-SYSTEM.md
- `a11y Addon (violations fail)` --conceptually_related_to--> `Storybook (nextjs-vite, a11y addon)` [INFERRED]
  src/Introduction.mdx → docs/DESIGN-SYSTEM.md

## Import Cycles

- None detected.

## Hyperedges (group relationships)

- **Article write path: mutation + optimistic overlay + refresh** — docs_api_mapping_session_overlay, docs_api_mapping_use_create_article, docs_api_mapping_use_update_article, docs_api_mapping_delete_post, docs_api_mapping_simulated_writes [INFERRED 0.85]
- **Server-component list read path** — docs_api_mapping_articles_view, docs_api_mapping_get_articles, docs_api_mapping_get_posts, docs_api_mapping_get_username, docs_api_mapping_article_row [INFERRED 0.85]
- **Auth session flow (login → cookies → guard)** — docs_api_mapping_login_action, docs_api_mapping_login, docs_api_mapping_session, docs_api_mapping_get_current_user, docs_api_mapping_middleware [INFERRED 0.85]
- **CI Quality Gates** — github_workflows_ci_typecheck_gate, github_workflows_ci_lint_gate, github_workflows_ci_format_check_gate, github_workflows_ci_build_gate [EXTRACTED 0.90]
- **Chevron Directional Navigation Set** — public_icons_chevron_up_icon, public_icons_chevron_down_icon, public_icons_chevron_left_icon, public_icons_chevron_right_icon [INFERRED 0.85]
- **Status and Action UI Icon Set** — public_icons_info_icon, public_icons_warning_icon, public_icons_ellipsis_icon [INFERRED 0.75]
- **Framework and Brand Asset Set** — public_next_logo, public_vercel_logo, public_window_icon [INFERRED 0.75]

## Communities (74 total, 41 thin omitted)

### Community 0 - "actions.ts"

Cohesion: 0.05
Nodes (53): config, proxy(), PUBLIC_PATHS, DashboardLayout(), metadata, Home(), metadata, useToast() (+45 more)

### Community 1 - "cn()"

Cohesion: 0.06
Nodes (39): createIcon(), Modal(), ModalProps, ModalSize, sizeClasses, Danger, Default, ErrorMessage (+31 more)

### Community 2 - "utils.ts"

Cohesion: 0.07
Nodes (44): EditArticlePage(), metadata, Textarea(), TextareaProps, deletePost(), getPost(), getPostIdBySlug(), getPosts() (+36 more)

### Community 3 - "scripts"

Cohesion: 0.05
Nodes (44): clsx, @hookform/resolvers, next, dependencies, clsx, @hookform/resolvers, next, react (+36 more)

### Community 4 - "ArticleRow"

Cohesion: 0.10
Nodes (19): metadata, metadata, ArticlesList(), ArticlesListProps, renderList(), rows, Wrapper(), ArticlesTable() (+11 more)

### Community 5 - "Icon.tsx"

Cohesion: 0.11
Nodes (23): Shell(), ShellProps, { usePathnameMock }, Sidebar(), SidebarProps, { usePathnameMock }, CheckCircleIcon, ChevronDownIcon (+15 more)

### Community 6 - "compilerOptions"

Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/\*.mts, .next/dev/types/**/_.ts, next-env.d.ts, .next/types/\**/_.ts, node_modules (+20 more)

### Community 7 - "Session Overlay (useArticleOverlay / app"

Cohesion: 0.09
Nodes (28): API Mapping — DummyJSON ↔ App, addUser (POST /users/add), api-client (src/lib/api-client.ts), ArticleForm (RHF + Zod), ArticleRow view model, ArticlesView, auth-api (features/auth/api/auth-api.ts), createPost (POST /posts/add) (+20 more)

### Community 8 - "Input.tsx"

Cohesion: 0.11
Nodes (18): Field(), FieldProps, Default, Required, Story, WithError, WithHint, Input() (+10 more)

### Community 9 - "Pagination.tsx"

Cohesion: 0.13
Nodes (13): Pagination(), PaginationProps, getPaginationRange(), PageItem, sizeClasses, AsLinks, Default, Disabled (+5 more)

### Community 10 - "Component authoring convention (presenta"

Cohesion: 0.15
Nodes (16): Next.js Agent Rules (breaking-change warning), cn() class composer (clsx + tailwind-merge), Component authoring convention (presentational, all states), ControlSize (sm/md/lg shared type), Responsive by default (fluid base UI), Storybook (nextjs-vite, a11y addon), CI Build Gate, CI Workflow (quality job) (+8 more)

### Community 11 - "Toaster/index.ts"

Cohesion: 0.21
Nodes (9): geistMono, inter, metadata, QueryProvider(), ToastContext, ToastContextValue, ToastOptions, ActiveToast (+1 more)

### Community 12 - "LinkButton.tsx"

Cohesion: 0.15
Nodes (12): AnchorProps, ButtonProps, LinkButton(), LinkButtonProps, sizeClasses, SizedProps, AsLink, Default (+4 more)

### Community 13 - "MenuItem.tsx"

Cohesion: 0.23
Nodes (8): Menu(), Default, LoadingMore, Sizes, Story, MenuItem(), MenuItemProps, sizeClasses

### Community 14 - "SidebarItem.tsx"

Cohesion: 0.19
Nodes (9): SidebarItem(), SidebarItemProps, sizeClasses, Default, List, Selected, Sizes, Story (+1 more)

### Community 15 - "Toast.tsx"

Cohesion: 0.21
Nodes (9): Error, Story, Success, TitleOnly, WithAction, Toast(), ToastProps, ToastType (+1 more)

### Community 16 - "AuthCard.tsx"

Cohesion: 0.24
Nodes (7): AuthCard(), AuthCardProps, SignIn, SignInFailed, SignUp, Story, WithFieldError

### Community 17 - "Button.stories.tsx"

Cohesion: 0.18
Nodes (9): Danger, Disabled, IconOnly, Loading, Primary, Secondary, Sizes, Story (+1 more)

### Community 18 - "ControlSize"

Cohesion: 0.29
Nodes (4): Checkbox(), CheckboxProps, sizeClasses, ControlSize

### Community 19 - "Header.stories.tsx"

Cohesion: 0.27
Nodes (6): Header(), HeaderProps, Default, GreetingOnly, Story, WithoutTitle

### Community 20 - "Foundations.stories.tsx"

Cohesion: 0.22
Nodes (6): BlueRamp, meta, Radius, NOTE: Tailwind 4 scans source for _literal_ class strings — interpolated names, SemanticColors, Story

### Community 21 - ".prettierrc.json"

Cohesion: 0.25
Nodes (7): plugins, printWidth, semi, singleQuote, tabWidth, trailingComma, prettier-plugin-tailwindcss

### Community 22 - "Button.tsx"

Cohesion: 0.36
Nodes (5): Button(), ButtonProps, ButtonVariant, sizeClasses, variantClasses

### Community 23 - "Spinner.tsx"

Cohesion: 0.36
Nodes (4): Spinner(), Default, Sizes, Story

### Community 24 - "devDependencies"

Cohesion: 0.29
Nodes (7): @commitlint/config-conventional, jsdom, devDependencies, @commitlint/config-conventional, jsdom, @tailwindcss/postcss, @tailwindcss/postcss

### Community 25 - "Checkbox.stories.tsx"

Cohesion: 0.29
Nodes (6): Indeterminate, Off, On, Sizes, Story, WithLabel

### Community 26 - "getArticleForm loader"

Cohesion: 0.40
Nodes (5): getArticleForm loader, getPost (GET /posts/{id}), getPostIdBySlug (GET /posts?limit=0&select=title), getTagList (GET /posts/tag-list), slugify (lib/utils.ts)

### Community 28 - "Chevron Down Icon"

Cohesion: 0.50
Nodes (4): Chevron Down Icon, Chevron Left Icon, Chevron Right Icon, Chevron Up Icon

### Community 30 - "Design Tokens (tokens.css / @theme)"

Cohesion: 0.67
Nodes (3): Inverted color ramps (100=darkest, 0=white), Semantic state tokens, Design Tokens (tokens.css / @theme)

### Community 31 - "Next.js Logo"

Cohesion: 0.67
Nodes (3): Next.js Logo, Vercel Logo, Window Icon

## Ambiguous Edges - Review These

- `CI Format Check Gate` → `cn() class composer (clsx + tailwind-merge)` [AMBIGUOUS]
  .github/workflows/ci.yml · relation: conceptually_related_to
- `Next.js Agent Rules (breaking-change warning)` → `Blog Admin Dashboard UI Kit (Introduction)` [AMBIGUOUS]
  AGENTS.md · relation: conceptually_related_to

## Knowledge Gaps

- **273 isolated node(s):** `semi`, `singleQuote`, `trailingComma`, `printWidth`, `tabWidth` (+268 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **41 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `CI Format Check Gate` and `cn() class composer (clsx + tailwind-merge)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Next.js Agent Rules (breaking-change warning)` and `Blog Admin Dashboard UI Kit (Introduction)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `cn()` connect `cn()` to `utils.ts`, `ArticleRow`, `Icon.tsx`, `Input.tsx`, `Pagination.tsx`, `LinkButton.tsx`, `MenuItem.tsx`, `SidebarItem.tsx`, `Toast.tsx`, `AuthCard.tsx`, `ControlSize`, `Header.stories.tsx`, `Button.tsx`, `Spinner.tsx`?**
  _High betweenness centrality (0.153) - this node is a cross-community bridge._
- **Why does `ROUTES` connect `actions.ts` to `ArticleRow`, `Icon.tsx`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `scripts`, `@commitlint/cli`, `eslint`, `eslint-config-next`, `eslint-plugin-storybook`, `husky`, `lint-staged`, `msw`, `prettier`, `prettier-plugin-tailwindcss`, `storybook`, `@storybook/addon-a11y`, `@storybook/addon-docs`, `@storybook/nextjs-vite`, `tailwindcss`, `@testing-library/jest-dom`, `@testing-library/react`, `@testing-library/user-event`, `@types/node`, `@types/react`, `@types/react-dom`, `typescript`, `vite`, `@vitejs/plugin-react`, `vitest`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `semi`, `singleQuote`, `trailingComma` to the rest of the system?**
  _273 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `actions.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05289450484866295 - nodes in this community are weakly interconnected._
