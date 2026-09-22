/**
 * GitHub Pages basePath ile uyumlu public asset yolu üretir.
 * Dev ve production modlarında /portfolio prefix'ini doğru ekler.
 */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "/portfolio";
  if (!path.startsWith("/")) return path;
  return `${base}${path}`;
}
