"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface BlobProjectCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Uiverse blob-bounce animasyonlu proje kartı (yeşil tema).
 * @see https://uiverse.io/dylanharriscameron
 */
export function BlobProjectCard({
  children,
  className,
  onClick,
}: BlobProjectCardProps) {
  return (
    <div
      className={cn("blob-project-card group/card", className)}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <div className="blob-project-card__blob" aria-hidden="true" />
      <div className="blob-project-card__bg">{children}</div>
    </div>
  );
}
