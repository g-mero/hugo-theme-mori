import { writeFileSync } from "node:fs";
import * as sass from "sass-embedded";
import { transform, browserslistToTargets } from "lightningcss";
import browserslist from "browserslist";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import chokidar from "chokidar";

const __dirname = process.cwd();

const appSassPath = "./assets/css/app.scss";
const appCssOutputPath = "./assets/css/compiled/app.css";
const syntaxSassPath = "./assets/css/syntax.scss";
const syntaxCssOutputPath = "./assets/css/compiled/syntax.css";

// Parse command line arguments
const args = process.argv.slice(2);
const isDev = args.includes("dev") || args.includes("--dev");
const isWatch = args.includes("watch") || args.includes("--watch");

async function buildAppSass() {
  const result = await sass.compileAsync(appSassPath);
  return result.css;
}
async function buildSyntaxSass() {
  const result = await sass.compileAsync(syntaxSassPath);
  return result.css;
}

// Read browserslist config from package.json or use default
const targets = browserslistToTargets(browserslist());

async function minifyCss(cssCode: string) {
  const { code } = transform({
    filename: "minify-css",
    code: Buffer.from(cssCode),
    minify: true,
    targets,
    sourceMap: false,
  });

  return code;
}

async function processCss(cssCode: string): Promise<string> {
  if (isDev) {
    // In dev mode, only transform for browser compatibility, don't minify
    const { code } = transform({
      filename: "transform-css",
      code: Buffer.from(cssCode),
      minify: false,
      targets,
      sourceMap: false,
    });
    return code.toString();
  } else {
    // In production mode, minify
    const minified = await minifyCss(cssCode);
    return minified.toString();
  }
}

async function ensureDir(filePath: string) {
  const dir = dirname(filePath);
  await mkdir(dir, { recursive: true });
}

async function build() {
  try {
    const timestamp = new Date().toLocaleTimeString();
    console.log(
      `[${timestamp}] Building CSS... (${
        isDev ? "development" : "production"
      } mode)`
    );

    // Build app.css
    const appCss = await buildAppSass();
    const processedAppCss = await processCss(appCss);
    await ensureDir(appCssOutputPath);
    writeFileSync(appCssOutputPath, processedAppCss);
    console.log(`[${timestamp}] ✓ app.css written to ${appCssOutputPath}`);

    // Build syntax.css
    const syntaxCss = await buildSyntaxSass();
    const processedSyntaxCss = await processCss(syntaxCss);
    await ensureDir(syntaxCssOutputPath);
    writeFileSync(syntaxCssOutputPath, processedSyntaxCss);
    console.log(
      `[${timestamp}] ✓ syntax.css written to ${syntaxCssOutputPath}`
    );

    console.log(`[${timestamp}] CSS build complete!`);
  } catch (error) {
    console.error("Error building CSS:", error);
    if (!isWatch) {
      process.exit(1);
    }
  }
}

async function startWatch() {
  console.log("👀 Watching for changes in assets/css/...\n");

  // Initial build
  await build();
  console.log("\n");

  const watchPath = join(__dirname, "assets", "css");

  const watcher = chokidar.watch(watchPath, {
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    interval: 300,
    awaitWriteFinish: {
      stabilityThreshold: 200,
      pollInterval: 100,
    },
    ignored: (path) => path.includes("compiled"),
    depth: 10,
  });

  watcher
    .on("change", (path) => {
      console.log(`\n📝 File changed: ${path}`);
      build();
    })
    .on("add", (path) => {
      console.log(`\n➕ File added: ${path}`);
      build();
    })
    .on("error", (error) => {
      console.error(`❌ Watcher error:`, error);
    });
}

if (isWatch) {
  startWatch();
} else {
  build();
}
