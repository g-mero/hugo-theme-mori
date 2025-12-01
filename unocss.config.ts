import { defineConfig, presetWind3 } from "unocss";

export default defineConfig({
  cli: {
    entry: {
      patterns: ["./layouts/**/*.html"],
      outFile: "./assets/css/_unocss.css",
    },
  },
  theme: {
    colors: {
      body: "var(--color-body)", // body-bg
      fg1: "var(--color-fg1)", // text
      fg2: "var(--color-fg2)", // text-dark
      fg3: "var(--color-fg3)", // text-light
      bd1: "var(--color-bd1)", // border
      bd2: "var(--color-bd2)", // border-dark
      code: "var(--color-code)", // code-bg
      main: "var(--color-main)", // main color
      bg1: "var(--color-bg1)", // main-bg
    },
    fontSize: {
      xs: "var(--fs-xs)", // smaller
      sm: "var(--fs-sm)", // small
      base: "var(--fs-base)", // base
      md: "var(--fs-md)", // medium
      lg: "var(--fs-lg)", // large
      xl: "var(--fs-xl)", // extra large
      "2xl": "var(--fs-2xl)", // 2x extra large
      "3xl": "var(--fs-3xl)", // 3x extra large
      "4xl": "var(--fs-4xl)", // 4x extra large
    },
    lineHeight: {
      tight: "var(--lh-tight)", // tight
      base: "var(--lh-base)", // base
      relaxed: "var(--lh-relaxed)", // relaxed
    },
    spacing: {
      xs: "8px",
      sm: "12px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      "2xl": "48px",
      "3xl": "64px",
    },
    fontFamily: {
      mono: '"Menlo", "Meslo LG", monospace',
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif',
    },
    breakpoints: {
      md: "768px", // ≥768px
    },
    borderRadius: {
      sm: "4px",
      md: "8px",
      lg: "12px",
    },
  },

  presets: [
    presetWind3({
      preflight: false,
    }),
  ],

  rules: [
    // Multi-line ellipsis: line-clamp-{n}
    // Usage: line-clamp-2, line-clamp-3, etc.
    [
      /^line-clamp-(\d+)$/,
      ([, lines]) => ({
        display: "-webkit-box",
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": lines,
        "line-clamp": lines,
        overflow: "hidden",
      }),
    ],
    [
      /^fs-(xs|sm|base|md|lg|xl|2xl|3xl|4xl)$/,
      ([, size]) => ({
        "font-size": `var(--fs-${size})`,
      }),
    ],
  ],
});
