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
