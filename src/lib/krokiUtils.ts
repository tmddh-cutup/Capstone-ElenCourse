import pako from "pako";

/**
 * Encodes arbitrary source code for use with the Kroki.io API.
 * Compresses with zlib/deflate at max level, then converts to base64url.
 */
export function encodeKroki(source: string): string {
  const data = new TextEncoder().encode(source);
  const compressed = pako.deflate(data, { level: 9 });

  let binary = "";
  for (let i = 0; i < compressed.length; i++) {
    binary += String.fromCharCode(compressed[i]);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Wraps a block of TikZ code in a minimal standalone LaTeX document
 * and returns the Kroki SVG URL.
 */
export function buildTikzUrl(tikzCode: string): string {
  let code = tikzCode;
  if (!code.includes("\\documentclass")) {
    code = `\\documentclass[tikz, border=2mm, convert=pdf2svg]{standalone}
\\usetikzlibrary{arrows.meta,calc,patterns}
\\begin{document}
${code}
\\end{document}`;
  }
  return `https://kroki.io/tikz/svg/${encodeKroki(code)}`;
}
