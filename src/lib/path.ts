/**
 * GitHub Pages basePath ile uyumlu public asset yolu üretir.
 */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!path.startsWith("/")) return path;
  return `${base}${path}`;
}
