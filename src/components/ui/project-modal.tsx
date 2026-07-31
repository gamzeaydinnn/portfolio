/**
 * ProjectModal Component
 * 
 * Proje kartına tıklandığında açılan detaylı görünüm modalı.
 * Animasyonlu açılış/kapanış, responsive tasarım ve tam detay gösterimi.
 * 
 * Özellikler:
 * - Scale ve fade animasyonu ile açılış/kapanış
 * - Backdrop blur efekti
 * - Scroll kilitlemesi (body scroll disabled)
 * - ESC tuşu ile kapatma
 * - Dışarı tıklayarak kapatma
 * - YouTube video veya görsel carousel
 * - Detaylı bilgi bölümleri (Overview, Features, Tech Details, Learnings)
 * - GitHub ve Demo butonları
 * 
 * Teknik Detaylar:
 * - createPortal ile body'ye render (z-index sorunlarını önler)
 * - useEffect ile keyboard event listener
 * - Framer Motion benzeri CSS transitions
 * - Accessibility (ARIA labels, focus trap)
 * 
 * @author Gamze Aydın
 */

'use client';

import React, { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { ProjectData } from '@/types/i18n.types';
import { ImageCarousel } from './image-carousel';

/**
 * Component Props Interface
 */
interface ProjectModalProps {
  /** Modal açık mı? */
  isOpen: boolean;
  /** Kapatma callback'i */
  onClose: () => void;
  /** Proje verisi */
  project: ProjectData | null;
  /** Renk teması */
  colorTheme?: 'green' | 'blue' | 'purple' | 'pink' | 'yellow';
  /** Çeviri metinleri */
  translations: {
    sourceCode: string;
    liveDemo: string;
    technologies: string;
    close: string;
    // Modal başlıkları
    overview: string;
    features: string;
    techDetails: string;
    learningOutcomes: string;
  };
}

/**
 * Renk teması mapping
 */
const themeColors: Record<string, { 
  accent: string; 
  border: string; 
  bg: string;
  hover: string;
  text: string;
}> = {
  green: {
    accent: 'text-green-400',
    border: 'border-green-500/30',
    bg: 'bg-green-500/10',
    hover: 'hover:bg-green-500/20',
    text: 'text-green-300',
  },
  blue: {
    accent: 'text-blue-400',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    hover: 'hover:bg-blue-500/20',
    text: 'text-blue-300',
  },
  purple: {
    accent: 'text-purple-400',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/10',
    hover: 'hover:bg-purple-500/20',
    text: 'text-purple-300',
  },
  pink: {
    accent: 'text-pink-400',
    border: 'border-pink-500/30',
    bg: 'bg-pink-500/10',
    hover: 'hover:bg-pink-500/20',
    text: 'text-pink-300',
  },
  yellow: {
    accent: 'text-yellow-400',
    border: 'border-yellow-500/30',
    bg: 'bg-yellow-500/10',
    hover: 'hover:bg-yellow-500/20',
    text: 'text-yellow-300',
  },
};

/**
 * ProjectModal Component
 * 
 * Portal kullanarak body'ye render edilir.
 * Animasyonlu açılış/kapanış sağlar.
 */
export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  project,
  colorTheme = 'green',
  translations,
}) => {
  // Animasyon state'i (enter/leave için)
  const [isVisible, setIsVisible] = useState(false);
  // Portal mount kontrolü
  const [mounted, setMounted] = useState(false);

  const colors = themeColors[colorTheme] || themeColors.green;

  // Client-side mount kontrolü (SSR için)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animasyon ve scroll kilitleme
  useEffect(() => {
    if (isOpen) {
      // Küçük delay ile animasyon başlat
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
      // Body scroll'u kilitle
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      // Body scroll'u aç
      document.body.style.overflow = '';
    }

    // Cleanup
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /**
   * ESC tuşu ile kapatma
   */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  /**
   * Backdrop'a tıklayınca kapatma
   */
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  // Modal kapalı veya proje yok ise render etme
  if (!isOpen || !project || !mounted) return null;

  // Modal içeriği
  const modalContent = (
    <div
      className={`
        fixed inset-0 z-[9999] flex items-center justify-center p-4
        transition-all duration-300 ease-out
        ${isVisible ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'}
      `}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal Container */}
      <div
        className={`
          relative w-full max-w-4xl max-h-[90vh] overflow-y-auto
          bg-gray-900/95 backdrop-blur-lg rounded-2xl
          border ${colors.border}
          shadow-2xl shadow-black/50
          transform transition-all duration-300 ease-out
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
          ${isVisible 
            ? 'scale-100 opacity-100 translate-y-0' 
            : 'scale-95 opacity-0 translate-y-4'
          }
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Kapatma butonu */}
        <button
          onClick={onClose}
          className={`
            absolute top-4 right-4 z-50
            w-10 h-10 rounded-full
            ${colors.bg} ${colors.border} border
            flex items-center justify-center
            transition-all duration-200
            ${colors.hover}
            hover:scale-110
          `}
          aria-label={translations.close}
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header - Görsel/Video */}
        <div className="relative w-full h-64 md:h-80">
          <ImageCarousel
            images={project.images}
            youtubeUrl={project.youtubeUrl}
            height={320}
            colorTheme={colorTheme}
            alt={project.title}
            className="rounded-t-2xl"
          />
          
          {/* Durum badge */}
          <div className={`absolute top-4 left-4 z-20`}>
            <span className={`
              px-3 py-1 rounded-full text-xs font-medium
              ${project.status === 'completed' 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : project.status === 'in-progress'
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
              }
            `}>
              {project.status === 'completed' ? '✓ Tamamlandı' : project.status === 'in-progress' ? '⏳ Devam Ediyor' : '📋 Planlandı'}
            </span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8">
          {/* Başlık */}
          <h2 
            id="modal-title" 
            className={`text-2xl md:text-3xl font-bold ${colors.accent} mb-4`}
          >
            {project.title}
          </h2>

          {/* Kategoriler */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.categories.map((category, index) => (
              <span
                key={index}
                className={`
                  px-3 py-1 rounded-full text-xs font-medium uppercase
                  ${colors.bg} ${colors.text} ${colors.border} border
                `}
              >
                {category}
              </span>
            ))}
          </div>

          {/* Overview */}
          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${colors.accent} mb-3`}>
              📝 {translations.overview}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {project.detailedInfo.overview}
            </p>
          </div>

          {/* Özellikler */}
          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${colors.accent} mb-3`}>
              ✨ {translations.features}
            </h3>
            <ul className="space-y-2">
              {project.detailedInfo.features.map((feature, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-2 text-gray-300 text-sm"
                >
                  <span className={`${colors.accent} mt-1 shrink-0`}>•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Teknik Detaylar */}
          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${colors.accent} mb-3`}>
              🛠️ {translations.techDetails}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(project.detailedInfo.techDetails).map(([category, techs]) => (
                <div 
                  key={category}
                  className={`p-4 rounded-xl ${colors.bg} ${colors.border} border`}
                >
                  <h4 className={`text-sm font-semibold ${colors.text} mb-2`}>
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {techs.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-black/30 rounded text-xs text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Öğrenilen Konular */}
          <div className="mb-8">
            <h3 className={`text-lg font-semibold ${colors.accent} mb-3`}>
              🎓 {translations.learningOutcomes}
            </h3>
            <ul className="space-y-2">
              {project.detailedInfo.learningOutcomes.map((outcome, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-2 text-gray-300 text-sm"
                >
                  <span className="text-green-400 mt-1 shrink-0">✓</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-800">
            {/* GitHub Button */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-xl
                  bg-gray-800 hover:bg-gray-700
                  text-white font-medium
                  transition-all duration-200
                  hover:scale-105 hover:shadow-lg
                `}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                </svg>
                {translations.sourceCode}
              </a>
            )}

            {/* Demo Button */}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-xl
                  ${colors.bg} ${colors.border} border
                  ${colors.text} font-medium
                  transition-all duration-200
                  hover:scale-105 hover:shadow-lg
                  ${colors.hover}
                `}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {translations.liveDemo}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // createPortal ile body'ye render
  return createPortal(modalContent, document.body);
};

export default ProjectModal;
