"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ColorTheme = "blue" | "purple" | "green" | "yellow" | "pink";

const getColorClasses = (theme: ColorTheme) => {
  const colorMap = {
    blue: {
      beam: "from-blue-500 via-blue-400 to-transparent",
      explosionGlow: "via-blue-500",
      particles: "from-blue-400 to-blue-600",
    },
    purple: {
      beam: "from-purple-500 via-purple-400 to-transparent",
      explosionGlow: "via-purple-500",
      particles: "from-purple-400 to-purple-600",
    },
    green: {
      beam: "from-green-500 via-green-400 to-transparent",
      explosionGlow: "via-green-500",
      particles: "from-green-400 to-green-600",
    },
    yellow: {
      beam: "from-yellow-500 via-yellow-400 to-transparent",
      explosionGlow: "via-yellow-500",
      particles: "from-yellow-400 to-yellow-600",
    },
    pink: {
      beam: "from-pink-500 via-pink-400 to-transparent",
      explosionGlow: "via-pink-500",
      particles: "from-pink-400 to-pink-600",
    },
  };
  return colorMap[theme];
};

const KEYFRAME_ID = "beam-fall-keyframe";
if (typeof document !== "undefined" && !document.getElementById(KEYFRAME_ID)) {
  const style = document.createElement("style");
  style.id = KEYFRAME_ID;
  style.textContent =
    "@keyframes beamFall { from { transform: translateY(-200px); } to { transform: translateY(1900px); } }";
  document.head.appendChild(style);
}

export const BackgroundBeamsWithCollision = ({
  children,
  className,
  colorTheme = "blue",
}: {
  children: React.ReactNode;
  className?: string;
  colorTheme?: ColorTheme;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const beams = [
    { x: 10, duration: 7, delay: 2 },
    { x: 600, duration: 5, delay: 4 },
    { x: 1000, duration: 8, delay: 0, className: "h-12" },
    { x: 1200, duration: 6, delay: 3, className: "h-6" },
  ];

  return (
    <div
      ref={parentRef}
      className={cn(
        "min-h-screen bg-black relative w-full overflow-hidden",
        className,
      )}
    >
      {beams.map((beam, index) => (
        <CollisionMechanism
          key={index}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
          colorTheme={colorTheme}
        />
      ))}
      {children}
      <div
        ref={containerRef}
        className="absolute bottom-0 bg-neutral-100 w-full inset-x-0 pointer-events-none"
        style={{
          boxShadow:
            "0 0 24px rgba(34,42,53,0.06), 0 1px 1px rgba(0,0,0,0.05), 0 0 0 1px rgba(34,42,53,0.04), 0 0 4px rgba(34,42,53,0.08), 0 16px 68px rgba(47,48,55,0.05), 0 1px 0 rgba(255,255,255,0.1) inset",
        }}
      />
    </div>
  );
};

const CollisionMechanism = React.forwardRef<
  HTMLDivElement,
  {
    containerRef: React.RefObject<HTMLDivElement | null>;
    parentRef: React.RefObject<HTMLDivElement | null>;
    colorTheme: ColorTheme;
    beamOptions?: {
      x?: number;
      className?: string;
      duration?: number;
      delay?: number;
    };
  }
>(({ parentRef, containerRef, beamOptions = {}, colorTheme }) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<{ x: number; y: number } | null>(
    null,
  );
  const hitRef = useRef(false);
  const colorClasses = getColorClasses(colorTheme);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        hitRef.current ||
        !beamRef.current ||
        !containerRef.current ||
        !parentRef.current
      )
        return;
      const beamRect = beamRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const parentRect = parentRef.current.getBoundingClientRect();
      if (beamRect.bottom >= containerRect.top) {
        hitRef.current = true;
        setCollision({
          x: beamRect.left - parentRect.left + beamRect.width / 2,
          y: beamRect.bottom - parentRect.top,
        });
        // After explosion, just re-enable detection — beam keeps looping via CSS, no remount
        setTimeout(() => {
          setCollision(null);
          hitRef.current = false;
        }, 2000);
      }
    }, 150);
    return () => clearInterval(interval);
  }, [containerRef, parentRef]);

  return (
    <>
      {/* X position via 'left' so CSS keyframe only touches translateY and never resets X */}
      <div
        ref={beamRef}
        className={cn(
          "absolute top-0 h-14 w-px rounded-full bg-gradient-to-t",
          colorClasses.beam,
          beamOptions.className,
        )}
        style={{
          left: `${beamOptions.x || 0}px`,
          animation: `beamFall ${beamOptions.duration || 8}s linear ${beamOptions.delay || 0}s infinite`,
          willChange: "transform",
        }}
      />
      {collision && (
        <Explosion
          key={`${collision.x}-${collision.y}`}
          style={{
            left: `${collision.x}px`,
            top: `${collision.y}px`,
            transform: "translate(-50%, -50%)",
          }}
          colorClasses={colorClasses}
        />
      )}
    </>
  );
});

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = ({
  colorClasses,
  ...props
}: React.HTMLProps<HTMLDivElement> & {
  colorClasses: ReturnType<typeof getColorClasses>;
}) => {
  const spans = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    dx: Math.floor(Math.random() * 80 - 40),
    dy: Math.floor(Math.random() * -50 - 10),
    dur: Math.random() * 0.8 + 0.5,
  }));

  return (
    <div
      {...props}
      className={cn("absolute z-50 h-2 w-2", props.className as string)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={cn(
          "absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent to-transparent blur-sm",
          colorClasses.explosionGlow,
        )}
      />
      {spans.map((s) => (
        <motion.span
          key={s.id}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: s.dx, y: s.dy, opacity: 0 }}
          transition={{ duration: s.dur, ease: "easeOut" }}
          className={cn(
            "absolute h-1 w-1 rounded-full bg-gradient-to-b",
            colorClasses.particles,
          )}
        />
      ))}
    </div>
  );
};
