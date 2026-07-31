/**
 * Root Layout - Ana Layout Component
 * 
 * Next.js App Router root layout.
 * Tüm sayfaları sarar ve global provider'ları ekler.
 * 
 * SORUMLULUKLAR:
 * - HTML/Body yapısı
 * - Global CSS import
 * - i18n Provider
 * - AppBar (navigation)
 * - SEO metadata
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { I18nProvider } from '@/i18n/i18n-context';
import { MinimalLanguageSwitcher } from '@/components/layout/MinimalLanguageSwitcher';
import './globals.css';

// Font optimization - Next.js built-in
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // FOUT önleme - Flash of Unstyled Text
  variable: '--font-inter',
});

/**
 * Metadata - SEO için
 * Her sayfa kendi metadata'sını override edebilir
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://gamzeaydinnn.github.io/portfolio'),
  title: {
    default: 'Gamze Aydın',
    template: '%s | Gamze Aydın',
  },
  description: 'Kişisel portfolyo websitem - Projelerim, yeteneklerim ve deneyimlerim',
  keywords: ['portfolio', 'web developer', 'software engineer', 'projects'],
  authors: [{ name: 'Gamze Aydın' }],
  creator: 'Gamze Aydın',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://gamzeaydinnn.github.io/portfolio/',
    siteName: 'Gamze Aydın Portfolio',
    title: 'Gamze Aydın - Portfolio',
    description: 'Kişisel portfolyo websitem',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Gamze Aydın Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gamze Aydın - Portfolio',
    description: 'Kişisel portfolyo websitem',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // TODO: Google Search Console verification
    // google: 'your-google-verification-code',
  },
};

/**
 * RootLayout Component
 * 
 * @param children - Sayfa içeriği (page.tsx)
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* i18n Provider - Tüm uygulamayı sarar */}
        <I18nProvider>
          {/* Language Switcher - Top right corner */}
          <MinimalLanguageSwitcher />
          
          {/* Main Content */}
          <main className="min-h-screen">
            {children}
          </main>
          
          {/* Footer - İsteğe bağlı, gelecekte eklenebilir */}
          {/* <Footer /> */}
        </I18nProvider>
      </body>
    </html>
  );
}
