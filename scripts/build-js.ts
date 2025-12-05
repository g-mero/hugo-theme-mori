import { build } from "tsdown";

const args = process.argv.slice(2);
const isDev = args.includes("dev") || args.includes("--dev");

async function buildJs() {
  await build({
    entry: "./assets/js/app.ts",
    unbundle: false,
    target: "es2015",
    platform: "browser",
    outputOptions: () => ({
      file: "./assets/js/compiled/app.js",
      format: "iife",
      dir: undefined,
    }),
    clean: true,
    minify: !isDev,
    sourcemap: false,
    watch: isDev ? "./assets/**/*.ts" : undefined,
  });
}

buildJs();
