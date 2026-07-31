/**
 * Encrypted Text Component - Aceternity UI
 * 
 * Hacker tarzı şifreli metin efekti.
 * Karakterler reveal olurken gibberish animasyonu gösterir.
 * 
 * KAYNAK: https://ui.aceternity.com/components/encrypted-text
 */

'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface EncryptedTextProps {
  text: string;
  className?: string;
  revealDelayMs?: number;
  charset?: string;
  flipDelayMs?: number;
  encryptedClassName?: string;
  revealedClassName?: string;
}

export const EncryptedText: React.FC<EncryptedTextProps> = ({
  text,
  className,
  revealDelayMs = 50,
  charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?',
  flipDelayMs = 50,
  encryptedClassName,
  revealedClassName,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [revealedCount, setRevealedCount] = useState(0);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    currentIndexRef.current = 0;
    setRevealedCount(0);
    const textLength = text.length;

    // İlk başta tüm karakterleri gibberish yap
    const initialGibberish = text
      .split('')
      .map((char) => (char === ' ' ? ' ' : charset[Math.floor(Math.random() * charset.length)]))
      .join('');
    setDisplayText(initialGibberish);

    // Her karakteri sırayla reveal et
    const revealInterval = setInterval(() => {
      if (currentIndexRef.current < textLength) {
        currentIndexRef.current++;
        setRevealedCount(currentIndexRef.current);
      } else {
        clearInterval(revealInterval);
      }
    }, revealDelayMs);

    // Reveal edilmemiş karakterleri animasyonla değiştir
    const flipInterval = setInterval(() => {
      setDisplayText((prev) => {
        const chars = prev.split('');
        for (let i = currentIndexRef.current; i < textLength; i++) {
          if (text[i] !== ' ') {
            chars[i] = charset[Math.floor(Math.random() * charset.length)];
          }
        }
        // Reveal edilmiş karakterleri doğru yap
        for (let i = 0; i < currentIndexRef.current; i++) {
          chars[i] = text[i];
        }
        return chars.join('');
      });
    }, flipDelayMs);

    return () => {
      clearInterval(revealInterval);
      clearInterval(flipInterval);
    };
  }, [text, charset, revealDelayMs, flipDelayMs]);

  // Her karakter için ayrı span oluştur
  const renderText = () => {
    return displayText.split('').map((char, index) => {
      const isRevealed = index < revealedCount;
      return (
        <span
          key={index}
          className={cn(
            isRevealed ? revealedClassName : encryptedClassName
          )}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <span className={cn('inline', className)}>
      {renderText()}
    </span>
  );
};
