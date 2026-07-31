/** @type {import('next').NextConfig} */
const nextConfig = {
  // React strict mode - development sırasında potential problemleri yakalar
  reactStrictMode: true,
  
  // SWC minification - daha hızlı build
  swcMinify: true,
  
  // Performans optimizasyonu
  poweredByHeader: false,
  
  // GitHub Pages için static export
  output: 'export',
  
  // GitHub Pages base path (repo name)
  //basePath: '/Portfolio',
  
  // Asset prefix for GitHub Pages
  //assetPrefix: '/Portfolio',
  
  // Image optimization ayarları - static export için unoptimized gerekli
  images: {
    unoptimized: true,
  },
  
  // Trailing slash for GitHub Pages
  trailingSlash: true,
  
  // Production build için ESLint'i bypass et
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // TypeScript hatalarını da bypass et (production için)
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
