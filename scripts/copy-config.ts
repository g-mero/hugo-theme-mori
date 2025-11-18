import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "fs";
import { join } from "path";

/**
 * Copy config files from config/_default to exampleSite before development
 */
function copyConfig() {
  const rootDir = join(__dirname, "..");
  const sourceConfigDir = join(rootDir, "config", "_default");
  const targetConfigDir = join(rootDir, "exampleSite", "config", "_default");

  // Check if source directory exists
  if (!existsSync(sourceConfigDir)) {
    console.warn("⚠ Source config directory not found:", sourceConfigDir);
    return;
  }

  // Ensure target directory exists
  if (!existsSync(targetConfigDir)) {
    mkdirSync(targetConfigDir, { recursive: true });
  }

  // Read all files in the source directory
  const files = readdirSync(sourceConfigDir);

  let copiedCount = 0;
  let errorCount = 0;

  files.forEach((file) => {
    const sourceFile = join(sourceConfigDir, file);
    const targetFile = join(targetConfigDir, file);

    // Skip directories, only copy files
    if (statSync(sourceFile).isFile()) {
      try {
        copyFileSync(sourceFile, targetFile);
        console.log(`✓ Copied config/_default/${file}`);
        copiedCount++;
      } catch (error) {
        console.error(`✗ Failed to copy ${file}:`, error);
        errorCount++;
      }
    }
  });

  console.log(
    `\n📋 Summary: ${copiedCount} file(s) copied, ${errorCount} error(s)`
  );

  if (errorCount > 0) {
    process.exit(1);
  }
}

// Run the script
copyConfig();
