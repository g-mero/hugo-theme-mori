# Hugo Theme Mori

A clean and elegant Hugo theme.

## Features

- Responsive design
- Syntax highlighting with customizable Chroma styles
- Clean and minimal layout
- Built with Hugo extended (SCSS support)

## Installation

### As a Hugo Module (recommended)

Initialize your site as a Hugo module:

```bash
hugo mod init github.com/yourusername/yoursite
```

Add the theme to your `hugo.toml`:

```toml
[module]
  [[module.imports]]
    path = "github.com/g-mero/hugo-theme-mori"
```

### As a Git Submodule

```bash
git submodule add https://github.com/g-mero/hugo-theme-mori.git themes/hugo-theme-mori
```

Then add to your `hugo.toml`:

```toml
theme = 'hugo-theme-mori'
```

### Manual Installation

Clone this repository into your `themes` directory:

```bash
cd themes
git clone https://github.com/g-mero/hugo-theme-mori.git
```

## Configuration

See `exampleSite/hugo.toml` for an example configuration.

### Extending the Theme

#### Custom Head Content

To add custom content to the `<head>` tag (e.g., custom analytics, meta tags):

1. Create `layouts/_partials/extend-head.html` in your site root
2. Add your custom HTML content

Example:

```html
<!-- Custom analytics -->
<script async src="https://cdn.example.com/analytics.js"></script>
```

#### Custom Footer Content

To extend the footer with additional content (e.g., ICP number, additional links):

1. Create `layouts/_partials/extend-footer.html` in your site root
2. Add your custom HTML content

Example:

```html
<p>
  <a href="https://beian.miit.gov.cn/">ICP: 12345678</a>
</p>
```

See `exampleSite/layouts/_partials/extend-footer.html` for a full example.

### Syntax Highlighting

This theme uses Chroma for syntax highlighting. The default style is GitHub.

To change the syntax highlighting style, regenerate the `_syntax.scss` file:

```bash
hugo gen chromastyles --style=monokai > assets/css/_syntax.scss
```

Available styles: `github`, `monokai`, `dracula`, `nord`, `solarized-dark`, `solarized-light`, `vim`, and more.

## Development

### Requirements

- Hugo Extended >= 0.146.0

### Running the Example Site

```bash
cd exampleSite
hugo server --themesDir ../..
```

## License

MIT License
