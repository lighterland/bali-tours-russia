import fs from "node:fs/promises";
import path from "node:path";

const sharpModule = process.env.SHARP_MODULE_PATH || "sharp";
const { default: sharp } = await import(sharpModule);

const sourceDirectory = process.argv[2];
const outputDirectory = process.argv[3];

if (!sourceDirectory || !outputDirectory) {
  throw new Error("Usage: node scripts/optimize-gallery.mjs <source-directory> <output-directory>");
}

const gallery = [
  ["rice-terraces.jpg", "rice-terraces"],
  ["nusa-penida.jpg", "nusa-penida"],
  ["tanah-lot.jpg", "tanah-lot"],
  ["bali-temple.jpg", "bali-temple"],
  ["surfing.jpg", "bali-surfing"],
  ["craft.jpg", "craft-studio"],
  ["snorkeling.jpg", "bali-snorkeling"],
  ["rice-mountain.jpg", "rice-mountain"],
  ["ubud-landscape.jpg", "ubud-landscape"],
  ["water-sports.jpg", "bali-water-sports"],
  ["northwest-bali.jpg", "northwest-bali"],
  ["fishing.jpg", "bali-fishing"],
  ["turtle-island.jpg", "turtle-island"],
  ["bali-safari.jpg", "bali-safari"],
  ["mount-batur.jpg", "mount-batur"],
  ["ocean-adventure.jpg", "ocean-adventure"],
  ["atv.jpg", "atv-adventure"],
  ["bali-road.jpg", "bali-road"],
];

await fs.mkdir(outputDirectory, { recursive: true });
const manifest = [];

for (const [filename, slug] of gallery) {
  const input = path.join(sourceDirectory, filename);
  const metadata = await sharp(input).metadata();
  const maximumWidth = Math.min(1200, metadata.width || 1200);
  const widths = [...new Set([Math.min(360, maximumWidth), maximumWidth])];
  const files = [];

  for (const width of widths) {
    for (const format of ["avif", "webp"]) {
      const outputName = `${slug}-${width}.${format}`;
      const outputPath = path.join(outputDirectory, outputName);
      const pipeline = sharp(input).rotate().resize({ width, withoutEnlargement: true });
      if (format === "avif") await pipeline.avif({ quality: 50, effort: 6 }).toFile(outputPath);
      else await pipeline.webp({ quality: 78, effort: 5 }).toFile(outputPath);
      const stat = await fs.stat(outputPath);
      files.push({ format, width, file: outputName, bytes: stat.size });
    }
  }

  manifest.push({ slug, source: filename, width: metadata.width, height: metadata.height, files });
}

await fs.writeFile(path.join(outputDirectory, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Optimized ${manifest.length} gallery images in ${outputDirectory}`);
