# Graph Report - . (2026-07-22)

## Corpus Check

- 87 files · ~26,062 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary

- 671 nodes · 1091 edges · 73 communities (35 shown, 38 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)

- actions.ts
- posts-api.ts
- scripts
- Modal.stories.tsx
- compilerOptions
- utils.ts
- Input.tsx
- ArticlesList.tsx
- Icon.tsx
- Pagination.tsx
- Component authoring convention (presenta
- getArticles (server loader)
- Shell.tsx
- Toaster/index.ts
- LinkButton.tsx
- Checkbox.tsx
- ControlSize
- SidebarItem.tsx
- Toast.tsx
- MenuItem.tsx
- AuthCard.tsx
- Button.stories.tsx
- Header.stories.tsx
- cn()
- Foundations.stories.tsx
- .prettierrc.json
- Button.tsx
- devDependencies
- Section.stories.tsx
- useMediaQuery.test.ts
- Chevron Down Icon
- Blog Admin Dashboard (Arvancloud Challen
- Next.js Logo
- preview.tsx
- commitlint.config.mjs
- @commitlint/config-conventional
- Optimistic delete, no refetch
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
- main.ts
- File Document Icon
- Globe Icon
- Vercel Deploy

## God Nodes (most connected - your core abstractions)

1. `cn()` - 52 edges
2. `compilerOptions` - 16 edges
3. `ControlSize` - 15 edges
4. `scripts` - 14 edges
5. `ROUTES` - 13 edges
6. `useToast()` - 11 edges
7. `getCurrentUser()` - 10 edges
8. `ArticleRow` - 9 edges
9. `getArticles()` - 8 edges
10. `include` - 7 edges

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

- **Article list read pipeline (server loader → posts-api/getUsername → view model)** — docs_api_mapping_get_articles, docs_api_mapping_posts_api, docs_api_mapping_get_username, docs_api_mapping_synthetic_date [EXTRACTED 0.90]
- **Auth session flow (login → httpOnly cookies → route guard)** — readme_authentication, docs_api_mapping_auth_flow, docs_api_mapping_httponly_cookie_session, readme_route_guard_middleware [EXTRACTED 0.90]
- **CI Quality Gates** — github_workflows_ci_typecheck_gate, github_workflows_ci_lint_gate, github_workflows_ci_format_check_gate, github_workflows_ci_build_gate [EXTRACTED 0.90]
- **Chevron Directional Navigation Set** — public_icons_chevron_up_icon, public_icons_chevron_down_icon, public_icons_chevron_left_icon, public_icons_chevron_right_icon [INFERRED 0.85]
- **Status and Action UI Icon Set** — public_icons_info_icon, public_icons_warning_icon, public_icons_ellipsis_icon [INFERRED 0.75]
- **Framework and Brand Asset Set** — public_next_logo, public_vercel_logo, public_window_icon [INFERRED 0.75]

## Communities (73 total, 38 thin omitted)

### Community 0 - "actions.ts"

Cohesion: 0.06
Nodes (47): config, proxy(), PUBLIC_PATHS, metadata, Home(), metadata, AuthActionState, loginAction() (+39 more)

### Community 1 - "posts-api.ts"

Cohesion: 0.09
Nodes (38): CreateArticlePage(), EMPTY, metadata, EditArticlePage(), metadata, Textarea(), TextareaProps, useToast() (+30 more)

### Community 2 - "scripts"

Cohesion: 0.05
Nodes (44): clsx, @hookform/resolvers, next, dependencies, clsx, @hookform/resolvers, next, react (+36 more)

### Community 3 - "Modal.stories.tsx"

Cohesion: 0.10
Nodes (22): Modal(), ModalProps, ModalSize, sizeClasses, Danger, Default, ErrorMessage, Large (+14 more)

### Community 4 - "compilerOptions"

Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/\*.mts, .next/dev/types/**/_.ts, next-env.d.ts, .next/types/\**/_.ts, node_modules (+20 more)

### Community 5 - "utils.ts"

Cohesion: 0.11
Nodes (16): metadata, metadata, Spinner(), Default, Sizes, Story, getPosts(), getUsername() (+8 more)

### Community 6 - "Input.tsx"

Cohesion: 0.11
Nodes (18): Field(), FieldProps, Default, Required, Story, WithError, WithHint, Input() (+10 more)

### Community 7 - "ArticlesList.tsx"

Cohesion: 0.14
Nodes (17): deletePost(), ArticlesList(), ArticlesListProps, renderList(), rows, Wrapper(), ArticlesPagination(), ArticlesPaginationProps (+9 more)

### Community 8 - "Icon.tsx"

Cohesion: 0.18
Nodes (17): CheckCircleIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, DocumentIcon, EllipsisIcon, IconName (+9 more)

### Community 9 - "Pagination.tsx"

Cohesion: 0.13
Nodes (13): Pagination(), PaginationProps, getPaginationRange(), PageItem, sizeClasses, AsLinks, Default, Disabled (+5 more)

### Community 10 - "Component authoring convention (presenta"

Cohesion: 0.15
Nodes (16): Next.js Agent Rules (breaking-change warning), cn() class composer (clsx + tailwind-merge), Component authoring convention (presentational, all states), ControlSize (sm/md/lg shared type), Responsive by default (fluid base UI), Storybook (nextjs-vite, a11y addon), CI Build Gate, CI Workflow (quality job) (+8 more)

### Community 11 - "getArticles (server loader)"

Cohesion: 0.13
Nodes (16): api-client (single fetch wrapper), Session & auth flow (login/refresh/logout), Excerpt (first 20 words of body), getArticles (server loader), getUsername (author resolution, cached per userId), httpOnly cookie session (session.ts), posts-api (getPosts/getPost/getTagList/createPost/updatePost/deletePost), Slug → id resolution (getPostIdBySlug) (+8 more)

### Community 12 - "Shell.tsx"

Cohesion: 0.18
Nodes (8): DashboardLayout(), Shell(), ShellProps, { usePathnameMock }, Sidebar(), SidebarProps, { usePathnameMock }, LogoutButton()

### Community 13 - "Toaster/index.ts"

Cohesion: 0.21
Nodes (9): geistMono, inter, metadata, QueryProvider(), ToastContext, ToastContextValue, ToastOptions, ActiveToast (+1 more)

### Community 14 - "LinkButton.tsx"

Cohesion: 0.15
Nodes (12): AnchorProps, ButtonProps, LinkButton(), LinkButtonProps, sizeClasses, SizedProps, AsLink, Default (+4 more)

### Community 15 - "Checkbox.tsx"

Cohesion: 0.16
Nodes (9): Checkbox(), CheckboxProps, sizeClasses, Indeterminate, Off, On, Sizes, Story (+1 more)

### Community 16 - "ControlSize"

Cohesion: 0.20
Nodes (9): ControlSize, MenuItemProps, Placeholder(), PlaceholderProps, sizeClasses, CustomLabel, Default, Sizes (+1 more)

### Community 17 - "SidebarItem.tsx"

Cohesion: 0.19
Nodes (9): SidebarItem(), SidebarItemProps, sizeClasses, Default, List, Selected, Sizes, Story (+1 more)

### Community 18 - "Toast.tsx"

Cohesion: 0.21
Nodes (9): Error, Story, Success, TitleOnly, WithAction, Toast(), ToastProps, ToastType (+1 more)

### Community 19 - "MenuItem.tsx"

Cohesion: 0.26
Nodes (7): Menu(), Default, LoadingMore, Sizes, Story, MenuItem(), sizeClasses

### Community 20 - "AuthCard.tsx"

Cohesion: 0.24
Nodes (7): AuthCard(), AuthCardProps, SignIn, SignInFailed, SignUp, Story, WithFieldError

### Community 21 - "Button.stories.tsx"

Cohesion: 0.18
Nodes (9): Danger, Disabled, IconOnly, Loading, Primary, Secondary, Sizes, Story (+1 more)

### Community 22 - "Header.stories.tsx"

Cohesion: 0.27
Nodes (6): Header(), HeaderProps, Default, GreetingOnly, Story, WithoutTitle

### Community 23 - "cn()"

Cohesion: 0.33
Nodes (6): createIcon(), Section(), SectionProps, SectionHeader(), SectionHeaderProps, cn()

### Community 24 - "Foundations.stories.tsx"

Cohesion: 0.22
Nodes (6): BlueRamp, meta, Radius, NOTE: Tailwind 4 scans source for _literal_ class strings — interpolated names, SemanticColors, Story

### Community 25 - ".prettierrc.json"

Cohesion: 0.25
Nodes (7): plugins, printWidth, semi, singleQuote, tabWidth, trailingComma, prettier-plugin-tailwindcss

### Community 26 - "Button.tsx"

Cohesion: 0.36
Nodes (5): Button(), ButtonProps, ButtonVariant, sizeClasses, variantClasses

### Community 27 - "devDependencies"

Cohesion: 0.29
Nodes (7): @commitlint/cli, jsdom, devDependencies, @commitlint/cli, jsdom, @tailwindcss/postcss, @tailwindcss/postcss

### Community 28 - "Section.stories.tsx"

Cohesion: 0.40
Nodes (4): HeaderOnly, Story, WithContent, WithoutDivider

### Community 30 - "Chevron Down Icon"

Cohesion: 0.50
Nodes (4): Chevron Down Icon, Chevron Left Icon, Chevron Right Icon, Chevron Up Icon

### Community 31 - "Blog Admin Dashboard (Arvancloud Challen"

Cohesion: 0.67
Nodes (3): DummyJSON API Mapping, Design System, Blog Admin Dashboard (Arvancloud Challenge)

### Community 32 - "Next.js Logo"

Cohesion: 0.67
Nodes (3): Next.js Logo, Vercel Logo, Window Icon

## Ambiguous Edges - Review These

- `CI Format Check Gate` → `cn() class composer (clsx + tailwind-merge)` [AMBIGUOUS]
  .github/workflows/ci.yml · relation: conceptually_related_to
- `Next.js Agent Rules (breaking-change warning)` → `Blog Admin Dashboard UI Kit (Introduction)` [AMBIGUOUS]
  AGENTS.md · relation: conceptually_related_to

## Knowledge Gaps

- **262 isolated node(s):** `semi`, `singleQuote`, `trailingComma`, `printWidth`, `tabWidth` (+257 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **38 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `CI Format Check Gate` and `cn() class composer (clsx + tailwind-merge)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Next.js Agent Rules (breaking-change warning)` and `Blog Admin Dashboard UI Kit (Introduction)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `cn()` connect `cn()` to `posts-api.ts`, `Modal.stories.tsx`, `utils.ts`, `Input.tsx`, `ArticlesList.tsx`, `Icon.tsx`, `Pagination.tsx`, `Shell.tsx`, `LinkButton.tsx`, `Checkbox.tsx`, `ControlSize`, `SidebarItem.tsx`, `Toast.tsx`, `MenuItem.tsx`, `AuthCard.tsx`, `Header.stories.tsx`, `Button.tsx`?**
  _High betweenness centrality (0.159) - this node is a cross-community bridge._
- **Why does `ROUTES` connect `actions.ts` to `posts-api.ts`, `Shell.tsx`, `utils.ts`, `ArticlesList.tsx`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `scripts`, `@commitlint/config-conventional`, `eslint`, `eslint-config-next`, `eslint-plugin-storybook`, `husky`, `lint-staged`, `msw`, `prettier`, `prettier-plugin-tailwindcss`, `storybook`, `@storybook/addon-a11y`, `@storybook/addon-docs`, `@storybook/nextjs-vite`, `tailwindcss`, `@testing-library/jest-dom`, `@testing-library/react`, `@testing-library/user-event`, `@types/node`, `@types/react`, `@types/react-dom`, `typescript`, `vite`, `@vitejs/plugin-react`, `vitest`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `semi`, `singleQuote`, `trailingComma` to the rest of the system?**
  _262 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `actions.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.061815336463223784 - nodes in this community are weakly interconnected._
