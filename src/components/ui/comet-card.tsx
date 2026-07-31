"use client";

import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface CometCardProps {
  children: React.ReactNode;
  className?: string;
  cometColors?: string[];
  cometCount?: number;
}

export function CometCard({
  children,
  className,
  cometColors = ["#a78bfa", "#818cf8", "#38bdf8", "#f472b6", "#34d399"],
  cometCount = 6,
}: CometCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -10;
      const rotateY = ((x - cx) / cx) * 10;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;

      if (glowRef.current) {
        glowRef.current.style.left = `${x - 100}px`;
        glowRef.current.style.top = `${y - 100}px`;
      }
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    if (cardRef.current) {
      cardRef.current.style.transition =
        "transform 0.1s ease, border-color 0.3s ease, box-shadow 0.3s ease";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transition =
        "transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease";
      cardRef.current.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const comets = Array.from({ length: cometCount }, (_, i) => {
    const color = cometColors[i % cometColors.length];
    const delay = i * 0.35;
    const duration = 1.6 + i * 0.25;
    return { color, delay, duration, id: i, top: `${10 + ((i * 18) % 80)}%` };
  });

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d]/80 backdrop-blur-sm cursor-pointer",
        hovered && "border-white/20 shadow-[0_0_30px_rgba(139,92,246,0.2)]",
        className,
      )}
      style={{
        transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)",
        transition:
          "transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        willChange: "transform",
      }}
    >
      {/* Comet streaks */}
      {comets.map((comet) => (
        <span
          key={comet.id}
          className="absolute pointer-events-none"
          style={{
            width: "110px",
            height: "1.5px",
            background: `linear-gradient(90deg, transparent, ${comet.color})`,
            borderRadius: "9999px",
            top: comet.top,
            left: "-110px",
            animation: hovered
              ? `cometMove ${comet.duration}s linear ${comet.delay}s infinite`
              : "none",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            boxShadow: `0 0 8px 2px ${comet.color}99`,
          }}
        />
      ))}

      {/* Radial glow – moved via ref, no re-render */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 200,
          height: 200,
          background:
            "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          left: 0,
          top: 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
