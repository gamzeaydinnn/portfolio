/**
 * Sparkles Test Page
 * 
 * Sparkles'ın çalışıp çalışmadığını test etmek için basit sayfa.
 */

'use client';

import { SparklesCore } from '@/components/ui/sparkles';

export default function TestPage() {
  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden relative">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="test-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      
      <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
        Sparkles Test ✨
      </h1>
    </div>
  );
}
