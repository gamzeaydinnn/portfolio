/**
 * Translation Dictionary - Merkezi Çeviri Yönetimi
 * 
 * Tüm dillerin çevirilerini birleştiren ana sözlük.
 * Yeni bir dil eklendiğinde buraya import edilmelidir.
 */

import { TranslationDictionary } from '@/types/i18n.types';
import { tr } from './locales/tr';
import { en } from './locales/en';

export const translations: TranslationDictionary = {
  tr,
  en,
};

// Default dil - TypeScript için tip güvenliği
export const defaultLocale = 'tr' as const;

// Desteklenen dillerin listesi - UI'da dil seçici için
export const supportedLocales = Object.keys(translations) as Array<keyof typeof translations>;

// Dil adları - Dropdown için
export const localeNames: Record<keyof typeof translations, string> = {
  tr: 'Türkçe',
  en: 'English',
};
