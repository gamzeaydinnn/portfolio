/**
 * ImageCarousel Component
 * 
 * Proje kartları için otomatik geçişli görsel carousel.
 * YouTube video embed desteği ile birlikte çalışır.
 * 
 * Özellikler:
 * - 3 saniyede bir otomatik görsel geçişi
 * - YouTube video embed desteği (video varsa carousel yerine video gösterilir)
 * - Smooth fade animasyonu
 * - Görsel indicator noktaları
 * - Hover'da duraklatma
 * - Fallback placeholder desteği
 * 
 * Teknik Detaylar:
 * - useEffect ile interval yönetimi
 * - useCallback ile memory leak önleme
 * - CSS transitions ile performanslı animasyon
 * - Lazy loading ile optimizasyon
 * 
 * @author Gamze Aydın
 */

'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { withBasePath } from '@/lib/path';

/**
 * Component Props Interface
 */
interface ImageCarouselProps {
  /** Görsel URL listesi */
  images: string[];
  /** YouTube video URL'si (varsa carousel yerine video gösterilir) */
  youtubeUrl?: string;
  /** Geçiş süresi (ms) - varsayılan 3000ms */
  interval?: number;
  /** Carousel yüksekliği */
  height?: number;
  /** Renk teması (indicator için) */
  colorTheme?: 'green' | 'blue' | 'purple' | 'pink' | 'yellow';
  /** Ek CSS sınıfları */
  className?: string;
  /** Proje başlığı (alt tag için) */
  alt?: string;
}

/**
 * YouTube video ID'sini URL'den çıkar
 * Farklı YouTube URL formatlarını destekler
 */
const extractYoutubeId = (url: string): string | null => {
  if (!url) return null;
  
  // youtube.com/watch?v=ID formatı
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return watchMatch[1];
  
  // youtu.be/ID formatı
  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) return shortMatch[1];
  
  // youtube.com/embed/ID formatı
  const embedMatch = url.match(/embed\/([^?]+)/);
  if (embedMatch) return embedMatch[1];
  
  return null;
};

/**
 * Renk teması için indicator renkleri
 */
const indicatorColors: Record<string, { active: string; inactive: string }> = {
  green: { active: 'bg-green-400', inactive: 'bg-green-400/30' },
  blue: { active: 'bg-blue-400', inactive: 'bg-blue-400/30' },
  purple: { active: 'bg-purple-400', inactive: 'bg-purple-400/30' },
  pink: { active: 'bg-pink-400', inactive: 'bg-pink-400/30' },
  yellow: { active: 'bg-yellow-400', inactive: 'bg-yellow-400/30' },
};

/**
 * ImageCarousel Component
 * 
 * Görsel carousel veya YouTube video embed gösterir.
 */
export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images = [],
  youtubeUrl,
  interval = 3000,
  height = 180,
  colorTheme = 'green',
  className = '',
  alt = 'Project image',
}) => {
  // Aktif görsel index'i
  const [currentIndex, setCurrentIndex] = useState(0);
  // Hover durumu (duraksatma için)
  const [isPaused, setIsPaused] = useState(false);
  // Görsel yükleme durumu
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  // YouTube video ID'sini çıkar
  const youtubeId = useMemo(() => extractYoutubeId(youtubeUrl || ''), [youtubeUrl]);

  // Indicator renkleri
  const colors = indicatorColors[colorTheme] || indicatorColors.green;

  /**
   * Sonraki görsele geçiş fonksiyonu
   * useCallback ile gereksiz re-render'ları önle
   */
  const goToNext = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  /**
   * Otomatik geçiş için interval
   * isPaused durumunda interval çalışmaz
   */
  useEffect(() => {
    // YouTube video varsa veya tek görsel varsa carousel çalışmasın
    if (youtubeId || images.length <= 1 || isPaused) return;

    const timer = setInterval(goToNext, interval);

    // Cleanup - memory leak önleme
    return () => clearInterval(timer);
  }, [goToNext, interval, isPaused, youtubeId, images.length]);

  /**
   * Görsel yükleme hatası handler'ı
   */
  const handleImageError = useCallback((index: number) => {
    setImageError((prev) => ({ ...prev, [index]: true }));
  }, []);

  /**
   * Manuel slide değişimi
   */
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // YouTube video varsa embed göster
  if (youtubeId) {
    return (
      <div 
        className={`relative w-full overflow-hidden rounded-lg ${className}`}
        style={{ height }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0&modestbranding=1`}
          title={alt}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  // Görsel yoksa placeholder göster
  if (images.length === 0) {
    return (
      <div 
        className={`
          relative w-full overflow-hidden rounded-lg 
          bg-gradient-to-br from-gray-800 to-gray-900
          flex items-center justify-center
          ${className}
        `}
        style={{ height }}
      >
        {/* Placeholder icon */}
        <div className="text-gray-600 flex flex-col items-center">
          <svg 
            className="w-12 h-12 mb-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          <span className="text-xs">No preview</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative w-full overflow-hidden rounded-lg ${className}`}
      style={{ height }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Görseller container */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`
              absolute inset-0 w-full h-full
              transition-opacity duration-700 ease-in-out
              ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}
            `}
          >
            {/* Görsel veya hata durumunda placeholder */}
            {imageError[index] ? (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <span className="text-gray-500 text-xs">Image unavailable</span>
              </div>
            ) : (
              <>
                {/* Blur background - resmin scale ve blur edilmiş versiyonu */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <Image
                    src={withBasePath(image)}
                    alt=""
                    fill
                    className="object-cover scale-110 blur-2xl opacity-40"
                    onError={() => handleImageError(index)}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    aria-hidden="true"
                  />
                </div>

                {/* Ana görsel - object-contain ile tam görünür */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                  <Image
                    src={withBasePath(image)}
                    alt={`${alt} - ${index + 1}`}
                    fill
                    className="object-contain"
                    onError={() => handleImageError(index)}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Indicator noktaları (birden fazla görsel varsa) */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`
                w-1.5 h-1.5 rounded-full transition-all duration-300
                hover:scale-125
                ${index === currentIndex 
                  ? `${colors.active} w-4` 
                  : colors.inactive
                }
              `}
              aria-label={`Görsel ${index + 1}'e git`}
            />
          ))}
        </div>
      )}

      {/* Gradient overlay (alt kısım için okunabilirlik) */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default ImageCarousel;
