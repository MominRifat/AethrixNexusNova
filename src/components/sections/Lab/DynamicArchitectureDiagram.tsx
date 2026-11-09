"use client";

import React from "react";
import { ArchitectureLayer } from "@/lib/architect/types";

interface DynamicArchitectureDiagramProps {
  layers: ArchitectureLayer[];
}

export function DynamicArchitectureDiagram({ layers }: DynamicArchitectureDiagramProps) {
  // SVG Canvas Dimensions
  const width = 840;
  const layerHeight = 56;
  const gap = 18;
  const topPadding = 24;
  const totalHeight = topPadding * 2 + layers.length * layerHeight + (layers.length - 1) * gap;

  return (
    <div className="w-full rounded-2xl bg-[#0a0805] border border-white/[0.08] p-3 sm:p-5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06] text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffd426] animate-pulse" />
          <span className="text-[#ffd426] font-semibold uppercase tracking-wider">
            Synthesized System Topology
          </span>
        </div>
        <span className="text-[#34d399] flex items-center gap-1 font-mono text-[10px]">
          <span className="h-1 w-1 rounded-full bg-[#34d399]" />
          STRUCTURED SVG BUS
        </span>
      </div>

      {/* SVG Canvas with Dynamic Auto-Layout */}
      <div className="relative w-full overflow-x-auto scrollbar-none">
        <svg
          viewBox={`0 0 ${width} ${totalHeight}`}
          className="w-full min-w-[680px] h-auto select-none"
          aria-label="Generated multi-layer architecture diagram"
        >
          <defs>
            {/* Subtle Grid Pattern */}
            <pattern id="arch-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="rgba(255, 212, 38, 0.025)"
                strokeWidth="1"
              />
            </pattern>

            {/* Glowing filter for bus packet */}
            <filter id="bus-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="bus-line-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffd426" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ff9f1c" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="layer-header-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e1810" />
              <stop offset="100%" stopColor="#17120a" />
            </linearGradient>
          </defs>

          {/* Background Grid */}
          <rect width={width} height={totalHeight} fill="url(#arch-grid)" rx="8" />

          {/* Central Vertical Connector Spine */}
          <line
            x1={width / 2}
            y1={topPadding + 20}
            x2={width / 2}
            y2={totalHeight - topPadding - 20}
            stroke="url(#bus-line-grad)"
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.6"
          />

          {/* Animated Packet Traveling Down Spine */}
          <circle r="3.5" fill="#ffd426" filter="url(#bus-glow)">
            <animate
              attributeName="cx"
              values={`${width / 2};${width / 2}`}
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values={`${topPadding + 20};${totalHeight - topPadding - 20}`}
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Render Each Architectural Layer */}
          {layers.map((layer, idx) => {
            const y = topPadding + idx * (layerHeight + gap);
            const isAI = layer.name.toLowerCase().includes("ai");
            const isData = layer.name.toLowerCase().includes("data");

            const layerBorderColor = isAI
              ? "rgba(255, 212, 38, 0.4)"
              : isData
              ? "rgba(52, 211, 153, 0.3)"
              : "rgba(255, 255, 255, 0.1)";

            const layerBg = isAI
              ? "rgba(255, 212, 38, 0.04)"
              : "rgba(255, 255, 255, 0.02)";

            // Dynamic Auto-Layout Calculations
            const layerX = 18;
            const layerWidth = width - 36;
            const startX = 172;
            const endX = layerX + layerWidth - 12; // 810px
            const availableWidth = endX - startX; // 638px
            const count = Math.max(layer.components.length, 1);
            const compGap = count > 3 ? 8 : 12;
            const compWidth = Math.floor((availableWidth - (count - 1) * compGap) / count);

            return (
              <g key={layer.name || idx}>
                {/* Layer Container Box */}
                <rect
                  x={layerX}
                  y={y}
                  width={layerWidth}
                  height={layerHeight}
                  rx="10"
                  fill={layerBg}
                  stroke={layerBorderColor}
                  strokeWidth="1.2"
                />

                {/* Layer Name Tag (Left) */}
                <rect
                  x="28"
                  y={y + 12}
                  width="132"
                  height="32"
                  rx="6"
                  fill="url(#layer-header-grad)"
                  stroke="rgba(255,255,255,0.08)"
                />
                <circle
                  cx="40"
                  cy={y + 28}
                  r="3"
                  fill={isAI ? "#ffd426" : isData ? "#34d399" : "#ff9f1c"}
                />
                <text
                  x="50"
                  y={y + 32}
                  fill="#f5f3ee"
                  fontSize="9.5"
                  fontWeight="bold"
                  fontFamily="var(--font-jetbrains-mono, monospace)"
                >
                  {layer.name}
                </text>

                {/* Layer Components (Dynamically Sized to ALWAYS fit perfectly inside layerWidth) */}
                {layer.components.map((comp, cIdx) => {
                  const compX = startX + cIdx * (compWidth + compGap);
                  const isCompact = count >= 4;
                  // If string is longer than available width, cleanly format with ellipsis
                  const maxChars = isCompact ? 22 : 28;
                  const displayLabel =
                    comp.length > maxChars ? `${comp.slice(0, maxChars - 1)}…` : comp;

                  return (
                    <g key={cIdx} className="transition-all duration-200">
                      <rect
                        x={compX}
                        y={y + 12}
                        width={compWidth}
                        height="32"
                        rx="6"
                        fill="#1a150e"
                        stroke="rgba(255, 255, 255, 0.09)"
                        strokeWidth="1"
                        className="hover:stroke-[#ffd426]/50 transition-colors"
                      />
                      <text
                        x={compX + compWidth / 2}
                        y={y + 32}
                        fill="#b7ae9c"
                        fontSize={isCompact ? "8" : "9"}
                        textAnchor="middle"
                        fontFamily="var(--font-jetbrains-mono, monospace)"
                      >
                        {displayLabel}
                      </text>
                      <title>{comp}</title>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
