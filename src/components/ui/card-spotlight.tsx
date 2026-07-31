"use client";

import React, { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#60a5fa",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const divRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  // Cache rect so getBoundingClientRect isn't called on every pixel
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseEnter = useCallback(() => {
    // Cache rect once on enter — it won't change while hovering
    if (divRef.current)
      rectRef.current = divRef.current.getBoundingClientRect();
    if (spotRef.current) spotRef.current.style.opacity = "1";
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (spotRef.current) spotRef.current.style.opacity = "0";
    rectRef.current = null;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!spotRef.current || !rectRef.current) return;
      if (rafRef.current) return; // skip if frame already queued
      const cx = e.clientX;
      const cy = e.clientY;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (!spotRef.current || !rectRef.current) return;
        const x = cx - rectRef.current.left;
        const y = cy - rectRef.current.top;
        spotRef.current.style.background = `radial-gradient(${radius}px circle at ${x}px ${y}px, ${color}, transparent 40%)`;
      });
    },
    [radius, color],
  );

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-xl border border-neutral-800 bg-black p-8",
        className,
      )}
      {...props}
    >
      <div
        ref={spotRef}
        className="pointer-events-none absolute -inset-px"
        style={{
          opacity: 0,
          transition: "opacity 0.3s ease",
          willChange: "background, opacity",
          transform: "translateZ(0)",
        }}
      />
      {children}
    </div>
  );
};
