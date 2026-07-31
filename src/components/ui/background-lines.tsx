"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * BackgroundLines - Animated diagonal lines with moving light beams.
 * Uses Canvas for smooth, high-performance rendering.
 * Zero React re-renders after mount.
 */
export function BackgroundLines({
  children,
  className,
  color = [168, 139, 250],
  lineCount = 30,
  speed = 1,
}: {
  children?: React.ReactNode;
  className?: string;
  color?: [number, number, number];
  lineCount?: number;
  speed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let w = 0;
    let h = 0;

    // Line data: each line has an x offset, angle, and phase
    const lines: {
      x: number;
      phase: number;
      speed: number;
      opacity: number;
    }[] = [];
    for (let i = 0; i < lineCount; i++) {
      lines.push({
        x: (i / lineCount) * 2 - 0.3, // spread across -0.3 to 1.7
        phase: Math.random() * Math.PI * 2,
        speed: (0.3 + Math.random() * 0.7) * speed,
        opacity: 0.03 + Math.random() * 0.07,
      });
    }

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    let time = 0;
    const draw = () => {
      time += 0.008;
      ctx.clearRect(0, 0, w, h);

      for (const line of lines) {
        const x = line.x * w;
        // Moving highlight position along each line
        const highlightY =
          ((time * line.speed * 80 + line.phase * h) % (h * 1.6)) - h * 0.3;

        // Base line (very subtle)
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${line.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Moving highlight glow
        const gradient = ctx.createLinearGradient(
          x,
          highlightY - 80,
          x,
          highlightY + 80,
        );
        gradient.addColorStop(
          0,
          `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`,
        );
        gradient.addColorStop(
          0.5,
          `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.35)`,
        );
        gradient.addColorStop(
          1,
          `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`,
        );

        ctx.beginPath();
        ctx.moveTo(x, highlightY - 80);
        ctx.lineTo(x, highlightY + 80);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Bright center dot
        const dotGradient = ctx.createRadialGradient(
          x,
          highlightY,
          0,
          x,
          highlightY,
          20,
        );
        dotGradient.addColorStop(
          0,
          `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`,
        );
        dotGradient.addColorStop(
          1,
          `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`,
        );
        ctx.fillStyle = dotGradient;
        ctx.fillRect(x - 20, highlightY - 20, 40, 40);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [color, lineCount, speed]);

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
