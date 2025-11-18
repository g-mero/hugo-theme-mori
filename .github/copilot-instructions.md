# Mori Theme Development Guide

## Project Language Policy

**English is the primary language for this project.** Unless explicitly stated otherwise:

- Code comments must be in English
- Documentation must be in English
- Commit messages must be in English
- Variable/function names must be in English

Exception: User-facing content files (like `exampleSite/content/*.zh-cn.md`) can be in their target language.

## Architecture Overview

**Mori** is a minimal Hugo theme with:

- **Sidebar + Content layout**: Flex layout (desktop) → stacked (mobile)
- **Modular SCSS**: 7 modules (`_variables`, `_mixins`, `_base`, `_layout`, `_components`, `_pages`, `_article`)
- **Minimal i18n**: Only translates UI elements via menu identifiers, never user content
- **Auto-sync config**: `config/_default/` → `exampleSite/config/_default/` on every dev start

## Critical Patterns

### SCSS: Never Edit `app.scss` Directly

```scss
// app.scss only imports - add styles to specific modules:
@import "variables"; // Colors, spacing, fonts, breakpoints
@import "mixins"; // Responsive: @mixin mobile/tablet/desktop
@import "base"; // Reset, HTML elements
@import "layout"; // .container, .sidebar, .content
@import "components"; // .logo, .nav, .footer, .lang-switcher
@import "pages"; // .profile, .posts, .article-header
@import "article"; // Markdown content
```

**Where to add styles:**

- Color/spacing change → `_variables.scss`
- New component → `_components.scss`
- Markdown styling → `_article.scss`
- Responsive → Use mixins: `@include tablet { flex-direction: column; }`

### Style Conventions

- Use variables for colors, spacing, fonts
- Do not use 'rem' for font sizes; use 'em' or pixels instead

### Config System

1. **Theme defaults**: `config/_default/` (copied on `pnpm dev`)
2. **User overrides**: `exampleSite/config/_default/` (auto-generated, gitignored)
3. **Site config**: `exampleSite/hugo.toml` (languages, site title)

## Development Workflows

```bash
# Start dev server (required - auto-copies config)
pnpm dev

# Add new language
# 1. Create i18n/ja.toml (menu identifiers only)
# 2. Create config/_default/menus.ja.toml
# 3. Add to exampleSite/hugo.toml: [languages.ja]
# 4. Create content/*. ja.md files

# Change syntax theme
hugo gen chromastyles --style=monokai > assets/css/syntax.scss
```

## Key Conventions

**Variables** (`_variables.scss`):

- Use: `$color-text`, `$spacing-md`, `$breakpoint-desktop`
- Not: Hardcoded colors/pixels

**Responsive**:

- Use: `@include mobile { }`, `@include tablet { }`, `@include desktop { }`
- Not: Raw `@media` queries

**Classes**: Simple semantic names (`.post-item`, `.article-header`), no BEM

**Templates**:

- Pass context: `{{ partial "menu.html" (dict "page" . "menuID" "main") }}`
- i18n UI only: `{{ i18n "recent_posts" }}`
- Dates: `{{ .Date.Format "2006-01-02" }}`

## Critical Files

- `scripts/copy-config.ts` - Syncs config on dev start
- `assets/css/_variables.scss` - All colors/spacing/breakpoints
- `layouts/baseof.html` - Container structure (sidebar + content)
- `layouts/_partials/menu.html` - Menu with i18n translation

## AI Agent Guidelines

**DO NOT create documentation files unless explicitly requested.**

When user asks questions:

- ✅ Answer directly with explanations
- ✅ Show code examples inline
- ✅ Make code changes directly
- ❌ Create new .md files to explain concepts
- ❌ Create guide/tutorial files
- ❌ Create example files unless specifically asked

**Only create documentation when user says:**

- "create a guide/documentation for..."
- "write documentation about..."
- "add this to documentation"

## Common Mistakes

❌ Edit `app.scss` directly (import-only)  
❌ Hardcode menu names (use `identifier`)  
❌ Translate user content in `i18n/*.toml`  
❌ Edit `exampleSite/config/_default/*` (gets overwritten)  
❌ Run `hugo server` directly (use `pnpm dev`)
❌ Create documentation files without being asked

✅ Edit theme's `config/_default/*` for defaults  
✅ Use spacing variables (`$spacing-md`)  
✅ Use responsive mixins  
✅ Test both `/` and `/zh-cn/` routes
✅ Answer questions directly without creating files
