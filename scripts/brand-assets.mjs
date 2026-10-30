// Generates raster brand assets from the SVG sources in public/brand.
// Run: node scripts/brand-assets.mjs
import fs from 'node:fs';
import sharp from 'sharp';

const fav = fs.readFileSync('public/brand/favicon.svg');
const logo = fs.readFileSync('public/brand/logo.svg');

await sharp(fav, { density: 900 }).resize(180, 180).png().toFile('app/apple-icon.png');
await sharp(fav, { density: 900 }).resize(512, 512).png().toFile('public/brand/icon-512.png');
await sharp(fav, { density: 900 }).resize(192, 192).png().toFile('public/brand/icon-192.png');
// Logo on white with padding for structured data (Google wants a square-ish raster ≥112px).
await sharp({ create: { width: 600, height: 600, channels: 4, background: '#ffffff' } })
  .composite([{ input: await sharp(logo, { density: 600 }).resize(480).png().toBuffer(), gravity: 'center' }])
  .png()
  .toFile('public/brand/logo.png');
fs.copyFileSync('public/brand/favicon.svg', 'app/icon.svg');
console.log('Brand assets written.');
