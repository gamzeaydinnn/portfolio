/**
 * Minimal Language Switcher
 * 
 * Floating Dock ile uyumlu minimal dil değiştirici.
 * Siyah-beyaz tema ile uyumlu.
 */

'use client';

import React from 'react';
import { useI18n } from '@/i18n/i18n-context';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function MinimalLanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="fixed top-8 right-8 z-50">
      <div className="flex gap-2 bg-black border border-white/[0.2] rounded-full p-1">
        <button
          onClick={() => setLocale('tr')}
          className={cn(
            'relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
            locale === 'tr'
              ? 'text-black'
              : 'text-white hover:text-white/70'
          )}
        >
          {locale === 'tr' && (
            <motion.div
              layoutId="language-indicator"
              className="absolute inset-0 bg-white rounded-full"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">TR</span>
        </button>
        
        <button
          onClick={() => setLocale('en')}
          className={cn(
            'relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
            locale === 'en'
              ? 'text-black'
              : 'text-white hover:text-white/70'
          )}
        >
          {locale === 'en' && (
            <motion.div
              layoutId="language-indicator"
              className="absolute inset-0 bg-white rounded-full"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">EN</span>
        </button>
      </div>
    </div>
  );
}
