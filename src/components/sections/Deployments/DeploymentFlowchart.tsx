"use client";

import React from "react";
import { type ClientArchitectureFlow } from "@/lib/client-deployments";

interface DeploymentFlowchartProps {
  flow: ClientArchitectureFlow;
  deploymentId: string;
}

export function DeploymentFlowchart({ flow, deploymentId }: DeploymentFlowchartProps) {
  const { nodes, pathD, branchPathD, headline, description } = flow;

  return (
    <div className="w-full rounded-2xl bg-[#0c0906] border border-white/[0.08] p-3 sm:p-4 overflow-hidden">
      {/* Circuit Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2.5 mb-2.5 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#ffd426] animate-pulse" />
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
          <span className="text-emerald-400 flex items-center gap-1 font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" /> SYNCED
          </span>
        </div>
      </div>

      {/* SVG Canvas with Horizontal Scrollbar Prevention */}
      <div className="relative w-full overflow-x-auto scrollbar-none">
        <svg
          viewBox="0 0 840 180"
          className="w-full min-w-[620px] max-h-[175px] h-auto select-none"
          aria-label={`${headline} architecture circuit`}
        >
          <defs>
            {/* Grid Pattern */}
            <pattern
              id={`client-grid-${deploymentId}`}
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

            {/* Glowing Gradient for Line */}
            <linearGradient id={`client-line-grad-${deploymentId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffd426" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#ffd426" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ff9f1c" stopOpacity="0.25" />
            </linearGradient>

            {/* Node Background Gradient */}
            <linearGradient id={`client-node-grad-${deploymentId}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e1810" />
              <stop offset="100%" stopColor="#120e08" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id={`client-glow-${deploymentId}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Grid */}
          <rect width="840" height="180" fill={`url(#client-grid-${deploymentId})`} rx="8" />

          {/* Base Track Paths */}
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

          {/* Glowing Animated Signal Line */}
          <path
            d={pathD}
            fill="none"
            stroke={`url(#client-line-grad-${deploymentId})`}
            strokeWidth="2"
            strokeDasharray="18 120"
            className="animate-[dash_6s_linear_infinite]"
          />

          {/* Animated Glowing Packets */}
          <circle r="3.5" fill="#ffd426" filter={`url(#client-glow-${deploymentId})`}>
            <animateMotion dur="4.5s" repeatCount="indefinite" path={pathD} />
          </circle>
          <circle r="2.5" fill="#34d399" filter={`url(#client-glow-${deploymentId})`}>
            <animateMotion dur="5.5s" repeatCount="indefinite" path={pathD} begin="1.8s" />
          </circle>

          {/* Nodes */}
          {nodes.map((node, index) => {
            const isHighlight = node.highlight;
            const width = 110;
            const height = 44;
            const x = node.x - width / 2;
            const y = node.y - height / 2;

            return (
              <g key={index} className="cursor-default">
                {/* Outer Glow for Highlighted Nodes */}
                {isHighlight && (
                  <rect
                    x={x - 2}
                    y={y - 2}
                    width={width + 4}
                    height={height + 4}
                    rx="8"
                    fill="none"
                    stroke="#ffd426"
                    strokeWidth="1.5"
                    strokeOpacity="0.45"
                    filter={`url(#client-glow-${deploymentId})`}
                  />
                )}

                {/* Node Box */}
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  rx="6"
                  fill={`url(#client-node-grad-${deploymentId})`}
                  stroke={isHighlight ? "#ffd426" : "rgba(255, 255, 255, 0.12)"}
                  strokeWidth={isHighlight ? "1.5" : "1"}
                />

                {/* Status Dot */}
                <circle
                  cx={x + 12}
                  cy={y + 16}
                  r="2.5"
                  fill={isHighlight ? "#ffd426" : "#34d399"}
                  className="animate-pulse"
                />

                {/* Node Label */}
                <text
                  x={x + 20}
                  y={y + 19}
                  fill="#f5f3ee"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="600"
                  letterSpacing="0.02em"
                >
                  {node.name}
                </text>

                {/* Node Subtitle */}
                <text
                  x={x + 12}
                  y={y + 34}
                  fill="#b7ae9c"
                  fontSize="8.5"
                  fontFamily="monospace"
                >
                  {node.detail}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Telemetry Status Footer */}
      <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/[0.05] font-mono text-[9.5px] text-[#7d7566]">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>ALL NODES ONLINE // 0 LATENCY BREACHES</span>
        </div>
        <span className="hidden sm:inline-block">CONCURRENCY: UNBOUNDED // ASYNC BUFFER</span>
      </div>
    </div>
  );
}
