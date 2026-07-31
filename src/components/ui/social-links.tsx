/**
 * Social Links Component
 * 
 * Sosyal medya hesaplarına yönlendiren interaktif ikonlar.
 * Hover animasyonu ve tooltip efektleri içerir.
 * 
 * Desteklenen platformlar:
 * - GitHub
 * - LinkedIn
 * - WhatsApp
 * 
 * @author Gamze Aydın
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Sosyal medya link'i için tip tanımı
 * Her platform için özel renk ve ikon içerir
 */
interface SocialLink {
  platform: 'github' | 'linkedin' | 'whatsapp' | 'email';
  url: string;
  tooltip: string;
  onClick?: () => void; // Email için özel handler
}

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
  onEmailClick?: () => void; // Email tıklaması için callback
}

/**
 * SVG İkonları - Her platform için optimize edilmiş
 */
const SocialIcons = {
  github: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  whatsapp: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  ),
  email: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22 6 12 13 2 6" />
    </svg>
  ),
};

/**
 * SocialLinks Component
 * 
 * Hover efektli sosyal medya ikonları
 * Her ikon kendi platform rengine dönüşür
 * 
 * Uiverse.io david-mohseni tasarımından ilham alındı
 * Z-index: 3D Card içinde tıklanabilirlik için yüksek değer
 */
export const SocialLinks: React.FC<SocialLinksProps> = ({
  links,
  className,
  onEmailClick,
}) => {
  const handleClick = (e: React.MouseEvent, link: SocialLink) => {
    // Email için özel davranış
    if (link.platform === 'email' && onEmailClick) {
      e.preventDefault();
      onEmailClick();
    }
    // Diğer platformlar için normal link davranışı
  };

  return (
    <ul className={cn('flex items-center justify-start gap-3', className)}>
      {links.map((link) => (
        <li
          key={link.platform}
          className="relative z-50"
        >
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block"
            aria-label={link.tooltip}
            style={{ pointerEvents: 'auto' }}
            onClick={(e) => handleClick(e, link)}
          >
            {/* Tooltip - Hover'da yukarı kayar ve görünür */}
            <span
              className={cn(
                'absolute -top-12 left-1/2 -translate-x-1/2 z-[60]',
                'px-3 py-1.5 rounded-md text-xs font-semibold text-white',
                'opacity-0 invisible group-hover:opacity-100 group-hover:visible',
                'transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]',
                'group-hover:-top-14',
                'pointer-events-none whitespace-nowrap',
                'shadow-lg',
                // Platform bazlı arka plan rengi
                link.platform === 'github' && 'bg-gradient-to-r from-pink-500 to-pink-600',
                link.platform === 'linkedin' && 'bg-[#0077b5]',
                link.platform === 'email' && 'bg-[#ea4335]',
                link.platform === 'whatsapp' && 'bg-[#25d366]'
              )}
            >
              {link.tooltip}
              {/* Tooltip ok işareti */}
              <span
                className={cn(
                  'absolute -bottom-1 left-1/2 -translate-x-1/2',
                  'w-2 h-2 rotate-45',
                  link.platform === 'github' && 'bg-gradient-to-r from-pink-500 to-pink-600',
                  link.platform === 'linkedin' && 'bg-[#0077b5]',
                  link.platform === 'email' && 'bg-[#ea4335]',
                  link.platform === 'whatsapp' && 'bg-[#25d366]'
                )}
              />
            </span>

            {/* İkon Container - Pink tema ile uyumlu tasarım */}
            <div
              className={cn(
                'relative w-12 h-12 rounded-full',
                'flex items-center justify-center',
                'bg-gradient-to-br from-pink-500/20 to-pink-600/20',
                'border-2 border-pink-500/40',
                'backdrop-blur-sm',
                'cursor-pointer',
                'transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]',
                'shadow-[0_8px_16px_rgba(236,72,153,0.15)]',
                'hover:shadow-[0_12px_24px_rgba(236,72,153,0.3)]',
                'hover:scale-110 hover:-translate-y-1',
                'text-pink-300',
                // Platform bazlı hover renkleri
                link.platform === 'github' && 'hover:bg-gradient-to-br hover:from-pink-500 hover:to-pink-600 hover:text-white hover:border-pink-500 hover:shadow-[0_12px_24px_rgba(236,72,153,0.4)]',
                link.platform === 'linkedin' && 'hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] hover:shadow-[0_12px_24px_rgba(0,119,181,0.4)]',
                link.platform === 'email' && 'hover:bg-[#ea4335] hover:text-white hover:border-[#ea4335] hover:shadow-[0_12px_24px_rgba(234,67,53,0.4)]',
                link.platform === 'whatsapp' && 'hover:bg-[#25d366] hover:text-white hover:border-[#25d366] hover:shadow-[0_12px_24px_rgba(37,211,102,0.4)]'
              )}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400/0 via-pink-400/20 to-pink-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {SocialIcons[link.platform]}
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
