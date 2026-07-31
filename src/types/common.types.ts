/**
 * Common Types - Genel Tip Tanımları
 * 
 * Uygulama genelinde kullanılan ortak tipler.
 */

/**
 * Genel Props Tipi
 * Tüm componentler için ortak props
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Link Props
 * İç ve dış linkler için
 */
export interface LinkProps {
  href: string;
  label: string;
  external?: boolean;
  icon?: React.ReactNode;
}

/**
 * Card Props
 * Card componentleri için temel yapı
 */
export interface CardProps extends BaseComponentProps {
  title?: string;
  description?: string;
  image?: string;
  href?: string;
}

/**
 * Button Variants
 * Button componentleri için stil varyantları
 */
export type ButtonVariant = 'default' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Animation Variants
 * Framer Motion için ortak animasyon tipleri
 */
export interface AnimationProps {
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
}
