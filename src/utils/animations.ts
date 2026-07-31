/**
 * Animation Variants - Framer Motion Presets
 * 
 * Ortak animasyon pattern'leri - kod tekrarını önler.
 * Aceternity UI componentleri ile kullanılacak.
 */

import { Variants } from 'framer-motion';

/**
 * Fade In Animation
 * Opacity 0'dan 1'e geçiş
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * Slide In from Bottom
 * Aşağıdan yukarı kayarak giriş
 */
export const slideInFromBottom: Variants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * Slide In from Top
 * Yukarıdan aşağı kayarak giriş
 */
export const slideInFromTop: Variants = {
  hidden: {
    y: -50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * Slide In from Left
 * Soldan sağa kayarak giriş
 */
export const slideInFromLeft: Variants = {
  hidden: {
    x: -50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * Slide In from Right
 * Sağdan sola kayarak giriş
 */
export const slideInFromRight: Variants = {
  hidden: {
    x: 50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * Scale In
 * Küçükten büyüğe scale animasyonu
 */
export const scaleIn: Variants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * Stagger Container
 * Child elementler için sıralı animasyon
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Stagger Item
 * Container içindeki item animasyonu
 */
export const staggerItem: Variants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};
