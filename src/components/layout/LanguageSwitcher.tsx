/**
 * Language Switcher Component - Dil Değiştirici
 * 
 * Kullanıcının dil tercihini değiştirmesini sağlar.
 * Dropdown menu ile TR/EN seçimi.
 * 
 * ÖZELLİKLER:
 * - Animated dropdown
 * - Keyboard navigation (a11y)
 * - Current language indicator
 * - Click outside to close
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '@/i18n/i18n-context';
import { localeNames, supportedLocales } from '@/i18n';
import { Locale } from '@/types/i18n.types';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ size = 'default' }: { size?: 'small' | 'default' }) {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Size'a göre class'ları belirle
  const sizeClasses = size === 'small' 
    ? 'px-1 py-0.5' 
    : 'gap-2 px-4 py-2 text-sm';
  const iconSize = size === 'small' ? 'w-0 h-0' : 'w-5 h-5'; // Mobilde ikon gizli
  const chevronSize = size === 'small' ? 'w-0 h-0' : 'w-4 h-4'; // Mobilde chevron gizli

  /**
   * Click outside handler - dropdown'ı kapatmak için
   * useEffect ile event listener yönetimi
   */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    // Dropdown açıkken listener ekle
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup - memory leak önleme
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  /**
   * Dil değiştirme handler
   * Dropdown'ı kapat ve yeni dili set et
   */
  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  /**
   * Keyboard navigation - a11y için
   * Escape: dropdown'ı kapat
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex items-center rounded-lg',
          sizeClasses,
          'bg-secondary hover:bg-secondary/80',
          'text-secondary-foreground',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'border border-border'
        )}
        aria-label="Dil seçimi"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {size === 'default' && (
          <svg
            className={iconSize}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
            />
          </svg>
        )}
        <span className={cn("font-medium uppercase", size === 'small' ? 'text-[9px] leading-none' : '')}>{locale}</span>
        {size === 'default' && (
          <svg
            className={cn(
              chevronSize,
              'transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            'absolute right-0 mt-2 w-40 rounded-lg',
            'bg-popover border border-border shadow-lg',
            'animate-slide-in-from-top',
            'z-50'
          )}
          role="menu"
          aria-orientation="vertical"
        >
          {supportedLocales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className={cn(
                'w-full px-4 py-3 text-left',
                'hover:bg-accent transition-colors duration-150',
                'first:rounded-t-lg last:rounded-b-lg',
                'focus:outline-none focus:bg-accent',
                locale === loc && 'bg-accent font-semibold'
              )}
              role="menuitem"
            >
              <div className="flex items-center justify-between">
                <span>{localeNames[loc]}</span>
                {locale === loc && (
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
