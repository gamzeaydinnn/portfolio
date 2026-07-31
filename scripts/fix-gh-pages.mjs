/**
 * GitHub Pages (branch deploy) Jekyll'in _ ile başlayan klasörleri
 * yoksaymasına karşı _next -> next dönüşümü yapar.
 */
import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("out");
const fromDir = path.join(outDir, "_next");
const toDir = path.join(outDir, "next");

if (!fs.existsSync(outDir)) {
  console.error("out/ bulunamadı. Önce npm run build çalıştır.");
  process.exit(1);
}

// Boş .nojekyll
fs.writeFileSync(path.join(outDir, ".nojekyll"), "");

if (fs.existsSync(fromDir)) {
  if (fs.existsSync(toDir)) {
    fs.rmSync(toDir, { recursive: true, force: true });
  }
  fs.renameSync(fromDir, toDir);
  console.log("Renamed out/_next -> out/next");
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

const textExt = new Set([
  ".html",
  ".js",
  ".css",
  ".txt",
  ".json",
  ".map",
  ".xml",
  ".webmanifest",
]);

let changed = 0;
for (const file of walk(outDir)) {
  const ext = path.extname(file).toLowerCase();
  if (!textExt.has(ext)) continue;
  const original = fs.readFileSync(file, "utf8");
  const updated = original.replaceAll("/_next/", "/next/").replaceAll("\\/_next\\/", "\\/next\\/");
  if (updated !== original) {
    fs.writeFileSync(file, updated);
    changed += 1;
  }
}

console.log(`Updated ${changed} files for GitHub Pages compatibility`);
