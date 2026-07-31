/**
 * Validation Utilities - Input Validation
 * 
 * Form validasyonu ve kullanıcı girdi kontrolü.
 * OWASP güvenlik standartlarına uygun.
 */

/**
 * Email validasyonu
 * RFC 5322 standartına uygun regex
 * 
 * @param email - Kontrol edilecek email adresi
 * @returns boolean - Geçerli ise true
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * URL validasyonu
 * HTTP ve HTTPS protokollerini destekler
 * 
 * @param url - Kontrol edilecek URL
 * @returns boolean - Geçerli ise true
 */
export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * String sanitization
 * XSS saldırılarına karşı koruma
 * HTML special karakterleri escape eder
 * 
 * @param input - Temizlenecek string
 * @returns string - Güvenli hale getirilmiş string
 */
export function sanitizeString(input: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  const reg = /[&<>"'/]/gi;
  return input.replace(reg, (match) => map[match] || match);
}

/**
 * Telefon numarası validasyonu
 * Türkiye telefon formatı: 5XX XXX XX XX
 * 
 * @param phone - Kontrol edilecek telefon numarası
 * @returns boolean - Geçerli ise true
 */
export function isValidPhone(phone: string): boolean {
  // Türkiye formatı: 5XX XXX XX XX veya 05XX XXX XX XX
  const phoneRegex = /^(0)?5[0-9]{2}\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * String length validasyonu
 * Min ve max karakter kontrolü
 * 
 * @param str - Kontrol edilecek string
 * @param min - Minimum karakter sayısı
 * @param max - Maximum karakter sayısı
 * @returns boolean - Geçerli ise true
 */
export function isValidLength(str: string, min: number, max: number): boolean {
  const length = str.trim().length;
  return length >= min && length <= max;
}

/**
 * Required field kontrolü
 * Boş, null veya undefined kontrolü
 * 
 * @param value - Kontrol edilecek değer
 * @returns boolean - Dolu ise true
 */
export function isRequired(value: any): boolean {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return true;
}
