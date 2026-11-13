const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// SVG icon — "N" monogram with violet-to-cyan gradient background
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#7c3aed"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="128" fill="url(#bg)"/>
  <path d="M100 110 L100 402 L168 402 L168 220 L344 402 L412 402 L412 110 L344 110 L344 292 L168 110 Z" fill="white"/>
</svg>`;

const svgBuffer = Buffer.from(svg);

async function generate() {
  const appDir = path.join(__dirname, '..', 'app');
  const publicDir = path.join(__dirname, '..', 'public');

  // 32x32 favicon.ico replacement (as PNG, Next.js accepts PNG favicon)
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(appDir, 'favicon.png'));

  // Also save a 192x192 for apple-touch / PWA
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));

  // 512x512 large icon
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon-512.png'));

  console.log('Icons generated successfully!');
}

generate().catch(console.error);
