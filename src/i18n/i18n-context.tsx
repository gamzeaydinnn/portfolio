/**
 * i18n Context - Çoklu Dil State Management
 * 
 * React Context API kullanarak global dil yönetimi.
 * LocalStorage ile tercih kalıcılığı sağlanır.
 * 
 * NEDEN CONTEXT API?
 * - Global state için prop drilling'den kaçınmak
 * - Performance: Sadece dil değiştiğinde re-render
 * - Type-safe: TypeScript ile tam tip güvenliği
 */

'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Locale, Translations } from '@/types/i18n.types';
import { translations, defaultLocale } from '@/i18n';

// Context tipi - dışarıya açılan API
interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

// Context oluşturma - initial value undefined (provider zorunlu)
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// LocalStorage key - dil tercihini kaydetmek için
const LOCALE_STORAGE_KEY = 'portfolio-locale';

/**
 * I18nProvider Component
 * 
 * Tüm uygulamayı sarar ve dil state'ini sağlar.
 * LocalStorage'dan dil tercihini okur ve kaydeder.
 */
export function I18nProvider({ children }: { children: React.ReactNode }) {
  // State - varsayılan olarak defaultLocale
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [isHydrated, setIsHydrated] = useState(false);

  // Component mount olduğunda LocalStorage'dan oku
  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
      
      // Kaydedilmiş dil varsa ve geçerliyse kullan
      if (savedLocale && (savedLocale === 'tr' || savedLocale === 'en')) {
        setLocaleState(savedLocale);
      }
    } catch (error) {
      // LocalStorage erişim hatası (private mode vs.) - sessizce devam et
      console.error('LocalStorage okuma hatası:', error);
    } finally {
      // Hydration tamamlandı - SSR/CSR mismatch önleme
      setIsHydrated(true);
    }
  }, []);

  /**
   * setLocale - Dil değiştirme fonksiyonu
   * 
   * Hem state'i günceller hem de LocalStorage'a kaydeder.
   * useCallback ile re-render optimizasyonu.
   */
  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    } catch (error) {
      // LocalStorage yazma hatası - sessizce devam et
      console.error('LocalStorage yazma hatası:', error);
    }
  }, []);

  /**
   * Mevcut dilin çevirileri
   * useMemo ile performans optimizasyonu - sadece locale değiştiğinde yeniden hesapla
   */
  const t = useMemo(() => translations[locale], [locale]);

  // Context value - useMemo ile reference stability
  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
    }),
    [locale, setLocale, t]
  );

  // Hydration tamamlanana kadar null döndür (SSR/CSR mismatch önleme)
  if (!isHydrated) {
    return null;
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/**
 * useI18n Hook - i18n Context'e erişim
 * 
 * Custom hook - component'lerde kullanım için.
 * Provider dışında kullanılırsa hata fırlatır (güvenlik).
 * 
 * @throws Error - Provider olmadan kullanılırsa
 * @returns I18nContextType - locale, setLocale, t
 * 
 * KULLANIM ÖRNEĞİ:
 * const { t, locale, setLocale } = useI18n();
 * <h1>{t.pageTitle.home}</h1>
 */
export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  
  // Context undefined ise provider eksik demektir
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  
  return context;
}
