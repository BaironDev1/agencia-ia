/**
 * Genera, a partir del logo (src/assets/brand/logo.ts):
 *   - La carpeta brand/ con todas las versiones del logo en SVG y PNG.
 *   - public/favicon.svg, public/favicon.ico y public/og.png (imagen para redes).
 *
 *   pnpm images
 */
import { mkdir, rm, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { brandColors as c, symbolSvg, wordmarkSvg } from '../src/assets/brand/logo.ts';

const root = new URL('../', import.meta.url);
const path = (p) => new URL(p, root).pathname;

const night = { fg: c.light, accent: c.lime };
const day = { fg: c.dark, accent: c.green };
const black = { fg: c.dark, accent: c.dark };
const white = { fg: c.white, accent: c.white };

/* ── brand/svg ── */
const svgs = {
  'simbolo-noche.svg': symbolSvg(night),
  'simbolo-dia.svg': symbolSvg(day),
  'simbolo-negro.svg': symbolSvg(black),
  'simbolo-blanco.svg': symbolSvg(white),
  'simbolo-app.svg': symbolSvg(night, { background: c.ink, radius: 12 }),
  'simbolo-app-lima.svg': symbolSvg({ fg: c.ink, accent: c.ink }, { background: c.lime, radius: 12 }),
  'wordmark-noche.svg': wordmarkSvg(night),
  'wordmark-dia.svg': wordmarkSvg(day),
  'wordmark-negro.svg': wordmarkSvg(black),
  'wordmark-blanco.svg': wordmarkSvg(white),
};

// Se regenera la carpeta completa para no dejar versiones obsoletas.
await rm(path('brand/svg'), { recursive: true, force: true });
await rm(path('brand/png'), { recursive: true, force: true });
await mkdir(path('brand/svg'), { recursive: true });
await mkdir(path('brand/png'), { recursive: true });
for (const [name, content] of Object.entries(svgs)) {
  await writeFile(path(`brand/svg/${name}`), content + '\n');
}

/* ── brand/png ── */
const png = (svg, width, file) => sharp(Buffer.from(svg), { density: 600 }).resize({ width }).png().toFile(path(file));

await png(svgs['simbolo-app.svg'], 1024, 'brand/png/avatar-1024.png'); // WhatsApp, LinkedIn, Instagram
await png(svgs['simbolo-app-lima.svg'], 1024, 'brand/png/avatar-lima-1024.png');
await png(svgs['simbolo-app.svg'], 512, 'brand/png/icono-512.png');
await png(svgs['simbolo-noche.svg'], 1024, 'brand/png/simbolo-noche-1024.png');
await png(svgs['simbolo-dia.svg'], 1024, 'brand/png/simbolo-dia-1024.png');
await png(svgs['wordmark-noche.svg'], 1600, 'brand/png/wordmark-noche-1600.png');
await png(svgs['wordmark-dia.svg'], 1600, 'brand/png/wordmark-dia-1600.png');
await png(svgs['wordmark-negro.svg'], 1600, 'brand/png/wordmark-negro-1600.png');
await png(svgs['wordmark-blanco.svg'], 1600, 'brand/png/wordmark-blanco-1600.png');

/* ── public/favicon.svg y favicon.ico ── */
await writeFile(path('public/favicon.svg'), svgs['simbolo-app.svg'] + '\n');

const icon32 = await sharp(Buffer.from(svgs['simbolo-app.svg']), { density: 600 }).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reservado
header.writeUInt16LE(1, 2); // tipo: icono
header.writeUInt16LE(1, 4); // cantidad de imágenes
header.writeUInt8(32, 6); // ancho
header.writeUInt8(32, 7); // alto
header.writeUInt16LE(1, 10); // planos
header.writeUInt16LE(32, 12); // bits por pixel
header.writeUInt32LE(icon32.length, 14); // tamaño
header.writeUInt32LE(22, 18); // offset
await writeFile(path('public/favicon.ico'), Buffer.concat([header, icon32]));
await sharp(Buffer.from(svgs['simbolo-app.svg']), { density: 600 }).resize(180, 180).png().toFile(path('public/apple-touch-icon.png'));
// Logo cuadrado público para Google y datos estructurados (schema.org "logo")
await sharp(Buffer.from(svgs['simbolo-app.svg']), { density: 600 }).resize(512, 512).png().toFile(path('public/icon-512.png'));

/* ── public/brand/firma-amply.png (logo para la firma de correo) ── */
// Wordmark -dia sobre placa blanca con margen: se lee en correos claros y, en el
// modo oscuro de Gmail (que no invierte imágenes), queda como una placa clara.
// Se muestra a 1/3 de su tamaño (≈122 × 54 px) para verse nítido en pantallas retina.
await mkdir(path('public/brand'), { recursive: true });
const sigPad = 18;
const sigWordmark = await sharp(Buffer.from(svgs['wordmark-dia.svg']), { density: 600 }).resize({ width: 330 }).png().toBuffer();
const { width: sigLogoW, height: sigLogoH } = await sharp(sigWordmark).metadata();
const sigW = sigLogoW + sigPad * 2;
const sigH = sigLogoH + sigPad * 2;
await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${sigW}" height="${sigH}"><rect width="${sigW}" height="${sigH}" rx="12" fill="${c.white}"/></svg>`))
  .composite([{ input: sigWordmark, left: sigPad, top: sigPad }])
  .png({ compressionLevel: 9 })
  .toFile(path('public/brand/firma-amply.png'));

/* ── public/og.png (1200×630) ── */
const logo = await sharp(Buffer.from(svgs['wordmark-noche.svg']), { density: 600 }).resize({ width: 280 }).png().toBuffer();
const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M64 0H0V64" fill="none" stroke="#ffffff" stroke-opacity=".07"/>
    </pattern>
    <radialGradient id="fade" cx="30%" cy="20%" r="80%">
      <stop offset="0" stop-color="#000" stop-opacity="0"/>
      <stop offset=".7" stop-color="${c.ink}" stop-opacity="1"/>
    </radialGradient>
    <radialGradient id="glow" cx="20%" cy="0%" r="60%">
      <stop offset="0" stop-color="${c.lime}" stop-opacity=".22"/>
      <stop offset="1" stop-color="${c.lime}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${c.ink}"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#fade)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <text x="80" y="330" font-family="Helvetica Neue, Arial, sans-serif" font-size="76" font-weight="500" letter-spacing="-3" fill="${c.light}">Software e IA que trabajan</text>
  <text x="80" y="418" font-family="Helvetica Neue, Arial, sans-serif" font-size="76" font-weight="500" letter-spacing="-3" fill="${c.light}">para tu negocio.</text>
  <text x="80" y="540" font-family="Menlo, monospace" font-size="24" letter-spacing="2" fill="#a1a1a7">SOFTWARE A MEDIDA · EMPLEADOS IA</text>
  <rect x="80" y="560" width="64" height="4" rx="2" fill="${c.lime}"/>
</svg>`;
await sharp(Buffer.from(og)).composite([{ input: logo, left: 80, top: 78 }]).png().toFile(path('public/og.png'));

console.log(`✓ brand/ (${Object.keys(svgs).length} SVG + 9 PNG), favicon, og.png y logo de firma generados`);
