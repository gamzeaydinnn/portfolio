/**
 * Format Utilities - Veri Formatlama
 * 
 * Tarih, sayı ve string formatlama fonksiyonları.
 */

/**
 * Tarih formatlama
 * Locale-aware tarih formatlama
 * 
 * @param date - Formatlanacak tarih
 * @param locale - Dil kodu (tr, en)
 * @returns string - Formatlanmış tarih
 */
export function formatDate(date: Date | string, locale: string = 'tr'): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Invalid date kontrolü
    if (isNaN(dateObj.getTime())) {
      return '';
    }
    
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dateObj);
  } catch (error) {
    console.error('Tarih formatlama hatası:', error);
    return '';
  }
}

/**
 * Sayı formatlama
 * Locale-aware sayı formatlama
 * 
 * @param num - Formatlanacak sayı
 * @param locale - Dil kodu
 * @returns string - Formatlanmış sayı
 */
export function formatNumber(num: number, locale: string = 'tr'): string {
  try {
    return new Intl.NumberFormat(locale).format(num);
  } catch (error) {
    console.error('Sayı formatlama hatası:', error);
    return num.toString();
  }
}

/**
 * String kısaltma
 * Uzun metinleri kısaltır ve ... ekler
 * 
 * @param str - Kısaltılacak string
 * @param maxLength - Maximum karakter sayısı
 * @returns string - Kısaltılmış string
 */
export function truncateString(str: string, maxLength: number): string {
  if (!str || str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength).trim() + '...';
}

/**
 * Slug oluşturma
 * URL-friendly string oluşturur
 * 
 * @param str - Slug'a çevrilecek string
 * @returns string - URL-safe slug
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Özel karakterleri kaldır
    .replace(/[\s_-]+/g, '-') // Boşluk ve _ karakterlerini - ile değiştir
    .replace(/^-+|-+$/g, ''); // Başta ve sondaki - karakterlerini kaldır
}

/**
 * Başlık formatı
 * Her kelimenin ilk harfini büyük yapar
 * 
 * @param str - Formatlanacak string
 * @returns string - Başlık formatında string
 */
export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
