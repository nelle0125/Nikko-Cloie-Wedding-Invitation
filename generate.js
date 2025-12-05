import fs from "fs";

const folder = "./optimized";
const files = fs.readdirSync(folder)
  .filter(f => f.endsWith(".webp"))
  .map(f => `${folder}/${f}`);

// Save as JSON
fs.writeFileSync("photos.json", JSON.stringify(files, null, 2));
console.log("✅ photos.json generated with available WebP files");
