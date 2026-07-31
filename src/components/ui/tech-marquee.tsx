/**
 * TechMarquee Component
 * 
 * Haber kanallarındaki alt yazılar gibi sürekli sola kayan teknoloji bandı.
 * CSS animasyonu ile akıcı, sonsuz döngü sağlar.
 * 
 * Özellikler:
 * - Infinite scroll animasyonu (CSS ile performanslı)
 * - Hover'da duraklatma özelliği
 * - Responsive tasarım
 * - Özelleştirilebilir hız ve renk teması
 * 
 * Teknik Detaylar:
 * - GPU hızlandırmalı transform animasyonu
 * - Double-buffer tekniği ile kesintisiz döngü
 * - will-change optimizasyonu
 * 
 * @author Gamze Aydın
 */

'use client';

import React, { useMemo } from 'react';

/**
 * Component Props Interface
 * Tip güvenliği ve otomatik tamamlama için
 */
interface TechMarqueeProps {
  /** Gösterilecek teknoloji listesi */
  technologies: string[];
  /** Animasyon hızı (saniye cinsinden - düşük = hızlı) */
  speed?: number;
  /** Renk teması */
  colorTheme?: 'green' | 'blue' | 'purple' | 'pink' | 'yellow';
  /** Ek CSS sınıfları */
  className?: string;
  /** Hover'da duraksın mı? */
  pauseOnHover?: boolean;
}

/**
 * Renk teması mapping
 * Her tema için uygun gradient ve text renkleri
 */
const themeColors: Record<string, { bg: string; text: string; border: string }> = {
  green: {
    bg: 'bg-green-500/10',
    text: 'text-green-300',
    border: 'border-green-500/20',
  },
  blue: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-300',
    border: 'border-blue-500/20',
  },
  purple: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-300',
    border: 'border-purple-500/20',
  },
  pink: {
    bg: 'bg-pink-500/10',
    text: 'text-pink-300',
    border: 'border-pink-500/20',
  },
  yellow: {
    bg: 'bg-yellow-500/10',
    text: 'text-yellow-300',
    border: 'border-yellow-500/20',
  },
};

/**
 * TechMarquee Component
 * 
 * Teknolojileri sürekli sola kayan bir bant şeklinde gösterir.
 * Double-buffer tekniği ile kesintisiz animasyon sağlar.
 */
export const TechMarquee: React.FC<TechMarqueeProps> = ({
  technologies,
  speed = 20,
  colorTheme = 'green',
  className = '',
  pauseOnHover = true,
}) => {
  // Boş teknoloji listesi kontrolü
  if (!technologies || technologies.length === 0) {
    return null;
  }

  // Tema renklerini al
  const colors = themeColors[colorTheme] || themeColors.green;

  /**
   * Animasyon süresi hesaplama
   * Teknoloji sayısına göre dinamik süre ayarlama
   */
  const animationDuration = useMemo(() => {
    // Her teknoloji için yaklaşık 2 saniye ekle
    const baseDuration = technologies.length * 2;
    // Minimum 10 saniye, speed parametresi ile çarpılır
    return Math.max(baseDuration, 10) * (speed / 20);
  }, [technologies.length, speed]);

  /**
   * Teknoloji öğelerini render et
   * İki kez render edilir (kesintisiz döngü için)
   */
  const renderTechItems = () => (
    <>
      {technologies.map((tech, index) => (
        <span
          key={`tech-${index}`}
          className={`
            inline-flex items-center px-3 py-1 mx-2
            ${colors.bg} ${colors.text} ${colors.border}
            rounded-full text-xs font-medium
            border backdrop-blur-sm
            whitespace-nowrap
            transition-all duration-200
            hover:scale-105
          `}
        >
          {tech}
        </span>
      ))}
    </>
  );

  return (
    <div
      className={`
        relative overflow-hidden w-full
        ${className}
      `}
      // Erişilebilirlik için aria label
      aria-label="Kullanılan teknolojiler"
    >
      {/* Sol ve sağ kenar fade efekti */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none" />

      {/* Marquee container */}
      <div
        className={`
          flex items-center
          ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}
        `}
        style={{
          // CSS custom properties ile animasyon kontrolü
          animation: `marquee-scroll ${animationDuration}s linear infinite`,
          // GPU hızlandırma için will-change
          willChange: 'transform',
        }}
      >
        {/* İlk set - asıl içerik */}
        <div className="flex items-center shrink-0">
          {renderTechItems()}
        </div>
        
        {/* İkinci set - kesintisiz döngü için kopya */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {renderTechItems()}
        </div>
      </div>

      {/* Keyframe animasyonu için inline style */}
      <style jsx>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default TechMarquee;
