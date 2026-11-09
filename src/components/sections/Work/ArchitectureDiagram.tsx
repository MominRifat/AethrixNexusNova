"use client";

import React from "react";
import { ArchitectureFlow } from "@/lib/case-studies";

interface ArchitectureDiagramProps {
  flow: ArchitectureFlow;
  caseId: string;
}

export function ArchitectureDiagram({ flow, caseId }: ArchitectureDiagramProps) {
  const { nodes, pathD, branchPathD, headline, description } = flow;

  return (
    <div className="w-full rounded-2xl bg-[#0c0906] border border-white/[0.08] p-3 sm:p-4 overflow-hidden">
      {/* Blueprint Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2.5 mb-2.5 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ffd426] animate-pulse" />
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#ffd426] font-semibold">
              Live Architectural Circuit // {headline}
            </h4>
          </div>
          <p className="mt-0.5 text-[11px] text-[#b7ae9c] max-w-xl line-clamp-1">{description}</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-[10px] text-[#7d7566]">
          <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
            SVG TELEMETRY
          </span>
          <span className="text-[#34d399] flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-[#34d399]" /> SYNCED
          </span>
        </div>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="relative w-full overflow-x-auto scrollbar-none">
        <svg
          viewBox="0 0 840 180"
          className="w-full min-w-[620px] max-h-[175px] h-auto select-none"
          aria-label={`${headline} architecture diagram`}
        >
          <defs>
            {/* Grid Pattern */}
            <pattern
              id={`grid-${caseId}`}
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="rgba(255, 212, 38, 0.03)"
                strokeWidth="1"
              />
            </pattern>

            {/* Glowing Gradient for Active Line */}
            <linearGradient id={`line-grad-${caseId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffd426" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#ffd426" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ff9f1c" stopOpacity="0.25" />
            </linearGradient>

            {/* Node Background Gradient */}
            <linearGradient id={`node-grad-${caseId}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e1810" />
              <stop offset="100%" stopColor="#120e08" />
            </linearGradient>

            {/* Filter for glowing packet */}
            <filter id={`glow-${caseId}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Grid */}
          <rect width="840" height="180" fill={`url(#grid-${caseId})`} rx="8" />

          {/* Static Circuit Base Track (Main & Branch) */}
          <path
            d={pathD}
            fill="none"
            stroke="rgba(255, 255, 255, 0.09)"
            strokeWidth="2.5"
            strokeDasharray="5 4"
          />
          {branchPathD && (
            <path
              d={branchPathD}
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          )}

          {/* Active Highlight Tracks */}
          <path
            d={pathD}
            fill="none"
            stroke={`url(#line-grad-${caseId})`}
            strokeWidth="2"
            opacity="0.75"
          />
          {branchPathD && (
            <path
              d={branchPathD}
              fill="none"
              stroke={`url(#line-grad-${caseId})`}
              strokeWidth="1.6"
              opacity="0.6"
            />
          )}

          {/* Animated Data Packets Traveling Along Primary Path */}
          <circle r="3.5" fill="#ffd426" filter={`url(#glow-${caseId})`}>
            <animateMotion
              path={pathD}
              dur="4s"
              repeatCount="indefinite"
              rotate="auto"
            />
          </circle>
          <circle r="2" fill="#ffffff">
            <animateMotion
              path={pathD}
              dur="4s"
              repeatCount="indefinite"
              rotate="auto"
            />
          </circle>
          <circle r="2.8" fill="#ff9f1c" filter={`url(#glow-${caseId})`}>
            <animateMotion
              path={pathD}
              dur="4s"
              begin="2s"
              repeatCount="indefinite"
              rotate="auto"
            />
          </circle>

          {/* Animated Data Packet Traveling Along Branch Path (if present) */}
          {branchPathD && (
            <circle r="3" fill="#34d399" filter={`url(#glow-${caseId})`}>
              <animateMotion
                path={branchPathD}
                dur="4.5s"
                begin="0.8s"
                repeatCount="indefinite"
                rotate="auto"
              />
            </circle>
          )}

          {/* All 6 Nodes Rendering */}
          {nodes.map((node) => {
            const width = 118;
            const height = 40;
            const rx = node.x - width / 2;
            const ry = node.y - height / 2;

            const isAccent = node.type === "processor" || node.type === "output";

            return (
              <g key={node.id} className="transition-all duration-200">
                {/* Node Box */}
                <rect
                  x={rx}
                  y={ry}
                  width={width}
                  height={height}
                  rx="8"
                  fill={`url(#node-grad-${caseId})`}
                  stroke={isAccent ? "rgba(255, 212, 38, 0.35)" : "rgba(255, 255, 255, 0.12)"}
                  strokeWidth="1.2"
                />

                {/* Subtle Inner Highlight */}
                <line
                  x1={rx + 8}
                  y1={ry + 1}
                  x2={rx + width - 8}
                  y2={ry + 1}
                  stroke={isAccent ? "rgba(255, 212, 38, 0.45)" : "rgba(255, 255, 255, 0.15)"}
                  strokeWidth="1"
                />

                {/* Status Dot */}
                <circle
                  cx={rx + 12}
                  cy={ry + 15}
                  r="2.5"
                  fill={isAccent ? "#ffd426" : "#34d399"}
                />

                {/* Node Label */}
                <text
                  x={rx + 20}
                  y={ry + 19}
                  fill="#f5f3ee"
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="var(--font-jetbrains-mono, monospace)"
                >
                  {node.label}
                </text>

                {/* Node Subtitle */}
                <text
                  x={rx + 20}
                  y={ry + 31}
                  fill="#b7ae9c"
                  fontSize="8"
                  fontFamily="var(--font-plus-jakarta-sans, sans-serif)"
                >
                  {node.sub}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Compact Telemetry Footer */}
      <div className="flex items-center justify-between text-[9.5px] font-mono text-[#7d7566] border-t border-white/[0.06] pt-1.5 mt-2">
        <span className="flex items-center gap-1">
          <span className="h-1 w-1 rounded-full bg-[#34d399]" />
          ALL NODES ONLINE // 0 LATENCY BREACHES
        </span>
        <span className="hidden sm:inline">CONCURRENCY: UNBOUNDED // ASYNC BUFFER</span>
      </div>
    </div>
  );
}
