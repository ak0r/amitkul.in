# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## 0.3.0 - 2026-03-18

### Added

- Anthropic Slate scale (`--color-slate-000` through `--color-slate-1000`) in `tokens.css` — raw color primitives used as theme token inputs
- Muul semantic token system in `theme.css`: three-tier tokens for background (`--background`, `--background-subtle`, `--background-minimal`), foreground (`--foreground`, `--foreground-subtle`, `--foreground-minimal`), border (`--border`, `--border-subtle`, `--border-minimal`), and accent (`--accent`, `--accent-subtle`, `--accent-minimal`)
- All semantic tokens resolve via native CSS `light-dark()` — no separate `:root` / `.dark` overrides required

### Changed

- `tokens.css` expanded: previously only held layout scale and named accent colors; now also contains the full Anthropic Slate primitive scale and system colors (`--color-focus`, `--color-error`)
- `theme.css` fully rewritten: replaced BasecoatUI shadcn-style dual-block (`:root` + `.dark {}`) with a single `:root` block using `light-dark()` for every semantic token; `@theme inline` block trimmed to Muul tokens only
- Dark mode mechanism changed from `.dark` class on `<html>` to `style.colorScheme` property on `:root` (`document.documentElement.style.colorScheme = 'dark' | 'light'`)
- `ThemeInit.astro` updated: sets `style.colorScheme` instead of toggling `.dark` class
- `Header.astro` theme toggle updated: reads/writes `style.colorScheme` instead of `classList`
- `components.css` + `typography.css` token sweep: `text-muted-foreground` → `text-foreground-subtle`, `bg-muted` → `bg-background-subtle`, `text-secondary-foreground` → `text-foreground-subtle`
- `components.css` raw var sweep: `var(--muted-foreground)` → `var(--foreground-subtle)`, `var(--color-muted-foreground)` → `var(--color-foreground-subtle)`, `var(--color-travel)` → `var(--color-olive)`, `var(--color-tech)` → `var(--color-sky)`, gallery focus outline changed from `var(--accent)` → `var(--color-focus)`
- Icon visibility selectors updated: `html.dark .icon-*` → `:root[style*="dark"] .icon-*`
- `base.css` rewritten: removed BasecoatUI-sourced `* { @apply border-border outline-ring/50; }` universal reset; focus ring now uses `var(--color-focus)` directly instead of `@apply outline-primary`
- `Tag.astro` no longer applies `badge-outline` class (BasecoatUI-specific utility)

### Removed

- `basecoat-css` npm dependency
- All BasecoatUI-specific tokens: `--card`, `--popover`, `--primary`, `--secondary`, `--muted`, `--destructive`, `--input`, `--ring`, `--chart-1` through `--chart-5`, `--sidebar-*` family
- `@custom-variant dark` declaration
- Tailwind bridge entries for all removed tokens
- `--color-travel` and `--color-tech` aliases in `@theme inline` (replaced by direct `--color-olive` and `--color-sky` references)

## 0.2.0 - 2026-03-17

### Added

- `ContentHeader.astro` — replacement for `PageHeader`; uses BEM class naming (`.content-header`, `.content-header__title`, `.content-header__meta`); styles live in `components.css`
- `pagefind` and `@pagefind/default-ui` added as explicit dependencies
- Build script now runs `pagefind --site dist` post-build and copies the index to `public/` automatically

### Changed

- `PageHeader.astro` replaced by `ContentHeader.astro` across all consumers: `BlogLayout`, `PageLayout`, `posts/[...page]`, `search.astro`, `tags/index.astro`, `tags/[tag].astro`
- Header BEM rename: `site-nav` → `site-header__nav`, `brand` → `site-header__brand`, `nav-desktop` → `site-header__desktop`, `nav-end` → `site-header__end`, `nav-mobile-toggle` → `site-header__mobile-toggle`, `nav-mobile` → `site-header__mobile`
- Pagination BEM rename: `pagination-link` → `pagination__link`, `is-disabled` → `pagination__link--disabled`, `pagination-info` → `pagination__info`; inline `<style>` removed, styles in `components.css`
- SeriesNav BEM rename: all `series-*` flat classes → `series-nav__*`; inline `<style>` removed, styles in `components.css`
- `Search.astro` inline `<style>` removed; Pagefind UI CSS custom property overrides centralized in `components.css`
- `ThemeInit` moved from `BaseLayout.astro` into `Head.astro` — FOUC-prevention script now co-located with `<head>` setup
- Global CSS resets (`* { border-border; outline-ring/50 }`, `body { bg-background text-foreground }`) moved from `theme.css` into `base.css`
- Site URL updated from `agrima.amitkul.in` → `base.amitkul.in`; package name updated from `agrima` → `astro-base`
- Related posts list changed from `<ul>` to `<div>` for semantic consistency with `PostList`

### Fixed

- SeriesNav ordered counter pseudo-element (`::before`) was using `@apply text-muted` which maps to the background-toned `--muted` color token, making counter numbers invisible; replaced with `color: var(--muted-foreground)`

### Removed

- `PageHeader.astro` component (superseded by `ContentHeader.astro`)
- Stray `import mdx` removed from `src/site.config.ts`

## [0.1.0] - 2026-03-14

### Added

- Astro 6 blog with MDX content support
- Content collections: `posts` and `pages` with Zod schemas (draft filtering, series, tags, cover, order)
- Layout hierarchy: `BaseLayout` → `BlogLayout` / `PageLayout`
- Full component set: `Head`, `Header`, `Footer`, `Container`, `PageHeader`, `SEO`, `ThemeInit`, `PostMeta`, `PostItem`, `PostList`, `Tag`, `TagList`, `Pagination`, `SeriesNav`, `Search`
- TailwindCSS v4 styling with semantic CSS class convention (`@apply`-based)
- Two-layer typography system: `@layer base` global element defaults in `typography.css`, `@layer components` `.post-content` overrides
- Light/dark mode via `.dark` class with FOUC-free toggle via `ThemeInit` inline script; preference persisted to localStorage
- Expressive Code syntax highlighting with `everforest-dark` / `everforest-light` themes keyed by `[data-theme]` attribute
- Custom fonts via Astro font API: Rubik (headings), Poppins (body), Newsreader (prose), Fira Code (code)
- Series navigation with ordered post listing and prev/next links
- Related posts by tag matching with fallback to recent posts
- Tag index and per-tag filtered post lists
- Paginated post archive at `/posts` with configurable `postsPerPage`
- Pagefind full-text search with URL query persistence at `/search`
- RSS feed at `/rss.xml` via `@astrojs/rss`
- XML sitemap via `@astrojs/sitemap`
- Reading time calculation (200 wpm default)
- `siteConfig` central config: site URL, title, author, nav, social links, pagination constants, container width settings (`pageWidth`, `contentWidth`)
- `@/` path alias mapping to `src/`
- Content Security Policy headers via Astro config
- Experimental features: Rust compiler, content intellisense, queued rendering
