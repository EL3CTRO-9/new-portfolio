// Regenerate the favicon raster set from public/favicon.svg.
//
//   node scripts/gen-favicons.mjs
//
// Renders each PNG at its exact target pixel size straight from the SVG (no
// upscaling), then assembles a multi-size .ico (16 + 32) by packing the two
// PNGs into an ICO container. The bone tile in favicon.svg is fully opaque, so
// every export keeps its bone backdrop (no transparency behind the red dot).
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const SVG = join(PUBLIC, "favicon.svg");

const BONE = { r: 0xf5, g: 0xf3, b: 0xec, alpha: 1 };

// [filename, size, flatten]
// Tab icons keep the rounded tile's transparent corners; apple-touch-icon and
// the PWA icon are flattened onto bone (those contexts must be fully opaque —
// transparent areas render black and get OS-masked anyway).
const PNGS = [
  ["favicon-16.png", 16, false],
  ["favicon-32.png", 32, false],
  ["apple-touch-icon.png", 180, true],
  ["icon-512.png", 512, true],
];

async function renderPng(size, flatten = false) {
  // density scales the SVG raster so the target size is rendered crisply.
  let img = sharp(SVG, { density: 384 }).resize(size, size, { fit: "fill" });
  if (flatten) img = img.flatten({ background: BONE });
  return img.png().toBuffer();
}

// Build a PNG-based .ico (supported by all modern browsers + IE Vista+).
function buildIco(entries) {
  const count = entries.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(count, 4);

  const dir = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;
  const dirEntries = [];
  entries.forEach(({ size, data }, i) => {
    const b = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, b + 0); // width (0 => 256)
    dir.writeUInt8(size >= 256 ? 0 : size, b + 1); // height
    dir.writeUInt8(0, b + 2); // palette
    dir.writeUInt8(0, b + 3); // reserved
    dir.writeUInt16LE(1, b + 4); // color planes
    dir.writeUInt16LE(32, b + 6); // bits per pixel
    dir.writeUInt32LE(data.length, b + 8); // size of image data
    dir.writeUInt32LE(offset, b + 12); // offset of image data
    offset += data.length;
    dirEntries.push(data);
  });

  return Buffer.concat([header, dir, ...dirEntries]);
}

const sizesForIco = [16, 32];

for (const [name, size, flatten] of PNGS) {
  const buf = await renderPng(size, flatten);
  await writeFile(join(PUBLIC, name), buf);
  console.log(`wrote public/${name} (${size}x${size})${flatten ? " [opaque bone]" : ""}`);
}

const icoEntries = await Promise.all(
  sizesForIco.map(async (size) => ({ size, data: await renderPng(size) }))
);
await writeFile(join(PUBLIC, "favicon.ico"), buildIco(icoEntries));
console.log(`wrote public/favicon.ico (${sizesForIco.join(" + ")})`);
