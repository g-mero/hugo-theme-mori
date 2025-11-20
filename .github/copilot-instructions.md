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

### Styling: Prioritize UnoCSS Over SCSS

**Always use UnoCSS classes in HTML first. Only use SCSS for:**

- Complex selectors (`:hover`, `:focus`, pseudo-elements)
- Markdown/article content styling

**UnoCSS Color Classes (use `c-xx` not `text-xx` for text color):**

```
c-fg1       text (default)
c-fg2       text-dark
c-fg3       text-light
c-fg4       text-lighter
c-main      accent color
bg-bg1      background
bg-bg2      background light
bg-code     code background
border-bd1  border
border-bd2  border dark
```

**UnoCSS Font Size Classes (from theme.fontSize):**

```
fs-xs       0.85rem
fs-sm       0.9rem
fs-base     base size
fs-md       medium
fs-lg       1.2rem
fs-xl       1.8rem
fs-2xl      2rem
```

**UnoCSS Line Height Classes (from theme.lineHeight):**

```
lh-tight    tight line height
lh-base     base line height
lh-relaxed  relaxed line height
```

**Where to add styles:**

- Colors → Use `c-fg1`, `c-fg2`, `c-fg3`, `c-fg4`, `c-main` classes
- Font sizing → Use `fs-xs`, `fs-sm`, `fs-base`, `fs-md`, `fs-lg`, `fs-xl`, `fs-2xl` classes
- Line height → Use `lh-tight`, `lh-base`, `lh-relaxed` classes instead of leading
- Complex interactions → `_article.scss` (for markdown content)
- Responsive layouts → Use `sm:` and `md:` breakpoints in UnoCSS

### UnoCSS Configuration (DO NOT MODIFY)

**Important**: The `unocss.config.ts` file should NEVER be modified without explicit permission. All standard utilities are already available:

- Color classes (`c-xx`, `bg-xx`, `border-xx`)
- Font size classes (`fs-xx`)
- Line height classes (`lh-xx`)
- Spacing and responsive utilities

Only custom rules (like `line-clamp-{n}` for multi-line ellipsis) should be in the config.

### Config System

1. **Theme defaults**: `config/_default/` (copied on `pnpm dev`)
2. **User overrides**: `exampleSite/config/_default/` (auto-generated, gitignored)
3. **Site config**: `exampleSite/hugo.toml` (languages, site title)

## AI Agent Guidelines

**DO NOT create documentation files unless explicitly requested.**

When user asks questions:

- ✅ Answer directly with explanations
- ✅ Show code examples inline
- ✅ Make code changes directly
- ❌ Create new .md files to explain concepts
- ❌ Create guide/tutorial files
- ❌ Create example files unless specifically asked

## Common Mistakes

❌ Edit `app.scss` directly (import-only)  
❌ Hardcode menu names (use `identifier`)  
❌ Translate user content in `i18n/*.toml`  
❌ Edit `exampleSite/config/_default/*` (gets overwritten)  
❌ Run `hugo server` directly (use `pnpm dev`)
❌ Create documentation files without being asked
❌ Modify `unocss.config.ts` (standard utilities are built-in)
❌ Use `text-xx` for text colors (use `c-xx` instead)
❌ Hardcode breakpoints (use `sm:` and `md:` utilities)

✅ Edit theme's `config/_default/*` for defaults  
✅ Use UnoCSS utility classes in HTML templates
✅ Use `c-xx` for text colors, `fs-xx` for font sizes, `lh-xx` for line heights
✅ Use `sm:` and `md:` breakpoints for responsive design
✅ Only modify SCSS for markdown content and complex selectors
✅ Test both `/` and `/zh-cn/` routes
✅ Answer questions directly without creating files
