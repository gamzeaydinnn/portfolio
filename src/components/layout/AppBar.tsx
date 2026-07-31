/**
 * AppBar Component - Ana Navigasyon Çubuğu
 * 
 * Tüm sayfalarda görünen navigation bar.
 * 
 * ÖZELLİKLER:
 * - Sticky position (scroll'da üstte sabit kalır)
 * - Responsive (mobile'da hamburger menu)
 * - Active link highlighting
 * - Smooth animations
 * - Language switcher entegrasyonu
 * - Glassmorphism effect
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/i18n/i18n-context';
import { LanguageSwitcher } from './LanguageSwitcher';
import { cn } from '@/lib/utils';

// Navigation route yapısı
interface NavRoute {
  href: string;
  labelKey: keyof typeof import('@/i18n/locales/tr').tr.navigation;
}

// Tüm navigation routeları - type-safe
const routes: NavRoute[] = [
  { href: '/', labelKey: 'home' },
  { href: '/personal-info', labelKey: 'personalInfo' },
  { href: '/experience', labelKey: 'experience' },
  { href: '/projects', labelKey: 'projects' },
  { href: '/skills', labelKey: 'skills' },
  { href: '/education', labelKey: 'education' },
];

export function AppBar() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  /**
   * Scroll event handler - navbar'a backdrop blur eklemek için
   * Performance: throttle ile optimize edilebilir
   */
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 10);
    }

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Mobile menu toggle
   * Açık olduğunda body scroll'unu engelle (UX)
   */
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  /**
   * Route değiştiğinde mobile menu'yü kapat
   */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  /**
   * Active link kontrolü
   * Exact match ve nested route desteği
   */
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full border-b',
          'transition-all duration-300',
          isScrolled
            ? 'bg-background/80 backdrop-blur-md border-border shadow-sm'
            : 'bg-background border-transparent'
        )}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Brand */}
            <Link
              href="/"
              className="flex items-center space-x-2 group"
            >
              <img
                src="/logo.png"
                alt="Gamze Aydın"
                className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-200"
              />
              <span className="font-semibold text-lg hidden sm:inline-block">
                Gamze Aydın
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium',
                    'transition-all duration-200',
                    'hover:bg-accent hover:text-accent-foreground',
                    isActive(route.href)
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {t.navigation[route.labelKey]}
                </Link>
              ))}
            </div>

            {/* Right side - Language Switcher & Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Desktop Language Switcher */}
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>
              {/* Mobile Language Switcher - Küçük */}
              <div className="md:hidden">
                <LanguageSwitcher size="small" />
              </div>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'md:hidden p-2.5 rounded-lg',
                  'hover:bg-accent transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-ring'
                )}
                aria-label="Menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  // Close icon
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  // Hamburger icon
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={cn(
            'fixed top-16 left-0 right-0 bottom-0 z-40',
            'bg-background border-t border-border',
            'md:hidden overflow-y-auto',
            'animate-slide-in-from-top'
          )}
        >
          <nav className="container-custom py-4">
            <div className="flex flex-col space-y-2">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    'px-4 py-3 rounded-lg text-base font-medium',
                    'transition-all duration-200',
                    'hover:bg-accent hover:text-accent-foreground',
                    isActive(route.href)
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {t.navigation[route.labelKey]}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
