/**
 * Generates a proper ICO file with 16x16, 32x32, and 48x48 sizes
 * from the SVG icon, then saves it as app/favicon.ico
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

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

// ICO format writer
function writeIco(images) {
  // images: array of { width, height, buffer (BGRA raw pixels) }
  const count = images.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = count * dirEntrySize;
  const dataOffset = headerSize + dirSize;

  let totalSize = dataOffset;
  for (const img of images) totalSize += img.buffer.length + 40; // 40 = BITMAPINFOHEADER size

  const ico = Buffer.alloc(totalSize);
  let offset = 0;

  // ICONDIR header
  ico.writeUInt16LE(0, offset);       // Reserved
  ico.writeUInt16LE(1, offset + 2);   // Type: 1 = ICO
  ico.writeUInt16LE(count, offset + 4);
  offset += 6;

  // Calculate image data offsets
  let imageOffset = dataOffset;
  const imageOffsets = [];
  for (const img of images) {
    const dataSize = 40 + img.buffer.length;
    imageOffsets.push({ offset: imageOffset, size: dataSize });
    imageOffset += dataSize;
  }

  // ICONDIRENTRY for each image
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    ico.writeUInt8(img.width === 256 ? 0 : img.width, offset);     // Width
    ico.writeUInt8(img.height === 256 ? 0 : img.height, offset + 1); // Height
    ico.writeUInt8(0, offset + 2);   // Color count
    ico.writeUInt8(0, offset + 3);   // Reserved
    ico.writeUInt16LE(1, offset + 4); // Planes
    ico.writeUInt16LE(32, offset + 6); // Bit count
    ico.writeUInt32LE(imageOffsets[i].size, offset + 8);  // Size of image data
    ico.writeUInt32LE(imageOffsets[i].offset, offset + 12); // Offset of image data
    offset += 16;
  }

  // Write each image: BITMAPINFOHEADER + pixel data
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const bmpOffset = offset;

    // BITMAPINFOHEADER (40 bytes)
    ico.writeUInt32LE(40, offset);              // Header size
    ico.writeInt32LE(img.width, offset + 4);    // Width
    ico.writeInt32LE(img.height * 2, offset + 8); // Height * 2 (ICO quirk)
    ico.writeUInt16LE(1, offset + 12);          // Planes
    ico.writeUInt16LE(32, offset + 14);         // Bit count
    ico.writeUInt32LE(0, offset + 16);          // Compression (none)
    ico.writeUInt32LE(img.buffer.length, offset + 20); // Image size
    ico.writeInt32LE(0, offset + 24);           // X pixels per meter
    ico.writeInt32LE(0, offset + 28);           // Y pixels per meter
    ico.writeUInt32LE(0, offset + 32);          // Colors used
    ico.writeUInt32LE(0, offset + 36);          // Colors important
    offset += 40;

    // Pixel data: ICO stores rows bottom-up, convert from top-down RGBA → bottom-up BGRA
    const w = img.width;
    const h = img.height;
    const rgba = img.buffer;

    for (let row = h - 1; row >= 0; row--) {
      for (let col = 0; col < w; col++) {
        const srcIdx = (row * w + col) * 4;
        // RGBA → BGRA
        ico.writeUInt8(rgba[srcIdx + 2], offset);     // B
        ico.writeUInt8(rgba[srcIdx + 1], offset + 1); // G
        ico.writeUInt8(rgba[srcIdx + 0], offset + 2); // R
        ico.writeUInt8(rgba[srcIdx + 3], offset + 3); // A
        offset += 4;
      }
    }
  }

  return ico;
}

async function main() {
  const sizes = [16, 32, 48];
  const images = [];

  for (const size of sizes) {
    const rawBuffer = await sharp(svgBuffer)
      .resize(size, size)
      .ensureAlpha()
      .raw()
      .toBuffer();
    images.push({ width: size, height: size, buffer: rawBuffer });
  }

  const icoData = writeIco(images);
  const outPath = path.join(__dirname, '..', 'app', 'favicon.ico');
  fs.writeFileSync(outPath, icoData);
  console.log(`favicon.ico written to ${outPath} (${icoData.length} bytes)`);
}

main().catch(console.error);
