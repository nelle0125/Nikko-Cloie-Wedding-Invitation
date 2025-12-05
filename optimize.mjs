import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputDir = "./photos";
const outputDir = "./optimized";

// Create output directory if not exist
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

const files = fs.readdirSync(inputDir);

(async () => {
  for (const file of files) {
    // Only process jpg/jpeg/png
    if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;

    // Safely join paths (handles special chars)
    const inputPath = path.resolve(inputDir, file);
    const outputPath = path.resolve(outputDir, `${path.parse(file).name}.webp`);

    try {
      await sharp(inputPath)
        .resize({ width: 1920 })
        .webp({ quality: 85 })
        .toFile(outputPath);

      console.log(`✅ Optimized: ${file}`);
    } catch (err) {
      console.error(`❌ Failed: ${file}`, err);
    }
  }

  console.log("\n🎉 All images optimized successfully!");
})();
