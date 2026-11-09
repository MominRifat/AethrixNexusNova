"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

export interface LoadingSpinnerProps {
  /**
   * Preset size or custom pixel diameter:
   * - "xs": 18px (ideal for compact buttons & badges)
   * - "sm": 28px (compact cards, tables, inputs)
   * - "md": 48px (standard section / card loader)
   * - "lg": 72px (modal / heavy panel loader)
   * - "xl": 104px (full-page / route transit loader)
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  /** Primary label displayed beneath the spinner */
  label?: string;
  /** Secondary micro-copy or telemetry status readout */
  sublabel?: string;
  /** If true, wraps the spinner in a fixed, blurred obsidian backdrop */
  fullScreen?: boolean;
  /** Optional custom container CSS classes */
  className?: string;
}

const SIZE_MAP: Record<"xs" | "sm" | "md" | "lg" | "xl", number> = {
  xs: 18,
  sm: 28,
  md: 48,
  lg: 72,
  xl: 104,
};

export function LoadingSpinner({
  size = "md",
  label,
  sublabel,
  fullScreen = false,
  className,
}: LoadingSpinnerProps) {
  const rawId = useId();
  // Sanitize id for SVG attribute safety
  const safeId = rawId.replace(/[^a-zA-Z0-9-_]/g, "");
  const gradientId = `amber-spin-grad-${safeId}`;
  const glowFilterId = `amber-spin-glow-${safeId}`;

  const pixelSize = typeof size === "number" ? size : SIZE_MAP[size] || 48;
  const isCompact = pixelSize <= 28;

  const spinnerSvg = (
    <div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: pixelSize, height: pixelSize }}
      role="status"
      aria-label={label || "Loading"}
    >
      {/* Ambient Radial Glow Behind Spinner */}
      <div
        className="absolute inset-0 rounded-full bg-[#ffd426]/15 blur-md animate-pulse-glow pointer-events-none"
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative w-full h-full select-none"
      >
        <defs>
          {/* Amber to Ember Sweep Arc Gradient */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd426" stopOpacity="1" />
            <stop offset="60%" stopColor="#ff9f1c" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ff9f1c" stopOpacity="0" />
          </linearGradient>

          {/* Precision Neon Amber Glow Filter */}
          <filter id={glowFilterId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={isCompact ? "1" : "2.5"} result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Outer Inactive Rail (Obsidian Substrate) */}
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={isCompact ? 4.5 : 3.5}
        />

        {/* 2. Main Outer Active Arc (Clockwise Rotation) */}
        <g className="animate-spin-clockwise origin-center">
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke={`url(#${gradientId})`}
            strokeWidth={isCompact ? 5.5 : 4}
            strokeLinecap="round"
            strokeDasharray="180 85"
            filter={`url(#${glowFilterId})`}
          />
          {/* Leading Satellite Orbital Node */}
          {!isCompact && (
            <circle
              cx="92"
              cy="50"
              r="2.8"
              fill="#ffd426"
              filter={`url(#${glowFilterId})`}
            />
          )}
        </g>

        {/* 3. Middle Counter-Rotating Radar Dashed Ring (Omitted in XS for crispness) */}
        {!isCompact && (
          <g className="animate-spin-counter origin-center">
            <circle
              cx="50"
              cy="50"
              r="30"
              stroke="rgba(255, 159, 28, 0.45)"
              strokeWidth="1.75"
              strokeDasharray="5 7"
            />
            <circle
              cx="50"
              cy="20"
              r="1.75"
              fill="#ff9f1c"
            />
          </g>
        )}

        {/* 4. Inner Reticle Circle */}
        <circle
          cx="50"
          cy="50"
          r={isCompact ? 22 : 18}
          stroke="rgba(255, 212, 38, 0.35)"
          strokeWidth={isCompact ? 2 : 1.25}
          strokeDasharray={isCompact ? "4 4" : "3 4"}
        />

        {/* 5. Center Pulsing Quantum Core (Geometric Rhombus) */}
        <g className="animate-pulse-core origin-center">
          <polygon
            points="50,43 57,50 50,57 43,50"
            fill="#ffd426"
            filter={`url(#${glowFilterId})`}
          />
          <circle
            cx="50"
            cy="50"
            r="2"
            fill="#0a0805"
          />
        </g>
      </svg>
    </div>
  );

  const content = (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 text-center",
        className
      )}
    >
      {spinnerSvg}

      {(label || sublabel) && (
        <div className="flex flex-col items-center gap-1">
          {label && (
            <span className="font-heading font-semibold text-xs sm:text-sm text-[#f5f3ee] tracking-wider uppercase">
              {label}
            </span>
          )}
          {sublabel && (
            <span className="font-mono text-[11px] text-[#7d7566] tracking-widest uppercase">
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0805]/85 backdrop-blur-md p-6 select-none animate-in fade-in duration-300">
        {content}
      </div>
    );
  }

  return content;
}
