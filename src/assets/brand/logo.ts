/**
 * Logo de Amply: una sola fuente de verdad para la web, los archivos de
 * marca (carpeta /brand) y las imágenes generadas (favicon, og.png).
 *
 * La "m" está dibujada a mano: el segundo arco es más alto (amplificar).
 * Las letras "a" y "ply" son Geist SemiBold convertida a trazos
 * (wordmark.json), así el logo se ve igual en cualquier programa.
 * Unidades: 1em = 36, línea base en y = 26.
 */
import wordmark from './wordmark.json' with { type: 'json' };

export const brandColors = {
  ink: '#0a0a0b',
  paper: '#f7f8f3',
  white: '#ffffff',
  light: '#eeeeea',
  dark: '#14170f',
  lime: '#c8f250',
  green: '#4a7a0c',
} as const;

const M_BASE = 'M1.9 26V15.4a6.5 6.5 0 0 1 13 0V26';
const M_ACCENT = 'M14.9 26V10.4a7.5 7.5 0 0 1 15 0V26';
const STROKE = 3.8;
const M_WIDTH = 32;

interface Colors {
  /** Color de las letras y del primer arco. */
  fg: string;
  /** Color del arco alto (el acento verde). */
  accent: string;
}

const m = ({ fg, accent }: Colors, x = 0) =>
  `<g transform="translate(${x} 0)" fill="none" stroke-width="${STROKE}">` +
  `<path d="${M_BASE}" stroke="${fg}"/><path d="${M_ACCENT}" stroke="${accent}"/></g>`;

const letters = ({ fg }: Colors, x = 0) =>
  `<path transform="translate(${x} 0)" d="${wordmark.letters}" fill="${fg}"/>`;

const svg = (viewBox: string, body: string, attrs = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"${attrs}>${body}</svg>`;

/** Símbolo: solo la "m". Con `background` queda como ícono de app / avatar. */
export function symbolSvg(colors: Colors, opts: { background?: string; radius?: number; attrs?: string } = {}) {
  if (!opts.background) return svg('-2.1 -4.5 36 36', m(colors), opts.attrs);
  const size = 52;
  const x = 15.9 - size / 2;
  const y = 13.5 - size / 2;
  const r = opts.radius ?? 0;
  return svg(
    `${x} ${y} ${size} ${size}`,
    `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="${r}" fill="${opts.background}"/>` + m(colors),
    opts.attrs,
  );
}

const textBox = `0 ${wordmark.top} ${wordmark.width} ${(wordmark.bottom - wordmark.top).toFixed(2)}`;

/** Proporción ancho/alto del wordmark (para fijar su tamaño en la página). */
export const wordmarkRatio = wordmark.width / (wordmark.bottom - wordmark.top);

/**
 * Wordmark: "amply" con la "m" de la marca. Es el logo principal.
 * El símbolo y el wordmark no se usan juntos: la "m" se repetiría.
 */
export function wordmarkSvg(colors: Colors, attrs = '') {
  return svg(textBox, letters(colors) + m(colors, wordmark.mX), attrs);
}
