"use client";

import React from "react";
import { useReducedMotion } from "framer-motion";
import {
  Code2,
  Database,
  Cpu,
  Layers,
  Sparkles,
  Server,
  Box,
  Terminal,
  Activity,
} from "lucide-react";

interface TechChip {
  name: string;
  icon: React.ReactNode;
}

const ROW_1_CHIPS: TechChip[] = [
  { name: "Next.js 16", icon: <Layers className="w-3.5 h-3.5 text-[#ffd426]" /> },
  { name: "Python 3.14", icon: <Terminal className="w-3.5 h-3.5 text-[#ff9f1c]" /> },
  { name: "PyTorch", icon: <Sparkles className="w-3.5 h-3.5 text-[#ffd426]" /> },
  { name: "Django Core", icon: <Server className="w-3.5 h-3.5 text-[#b7ae9c]" /> },
  { name: "Three.js WebGL", icon: <Box className="w-3.5 h-3.5 text-[#ffd426]" /> },
  { name: "PostgreSQL pgvector", icon: <Database className="w-3.5 h-3.5 text-[#b7ae9c]" /> },
  { name: "Gemini 2.5 API", icon: <Sparkles className="w-3.5 h-3.5 text-[#ffd426]" /> },
  { name: "TypeScript 5", icon: <Code2 className="w-3.5 h-3.5 text-[#b7ae9c]" /> },
  { name: "Docker Containers", icon: <Box className="w-3.5 h-3.5 text-[#b7ae9c]" /> },
];

const ROW_2_CHIPS: TechChip[] = [
  { name: "Ollama Local LLM", icon: <Terminal className="w-3.5 h-3.5 text-[#ffd426]" /> },
  { name: "Redis In-Memory", icon: <Database className="w-3.5 h-3.5 text-[#ff9f1c]" /> },
  { name: "Celery Workers", icon: <Activity className="w-3.5 h-3.5 text-[#b7ae9c]" /> },
  { name: "Tailwind CSS v4", icon: <Layers className="w-3.5 h-3.5 text-[#b7ae9c]" /> },
  { name: "Kubernetes Cluster", icon: <Server className="w-3.5 h-3.5 text-[#b7ae9c]" /> },
  { name: "LangChain Agents", icon: <Sparkles className="w-3.5 h-3.5 text-[#ffd426]" /> },
  { name: "FastAPI Endpoints", icon: <Code2 className="w-3.5 h-3.5 text-[#b7ae9c]" /> },
  { name: "Edge Microcontrollers", icon: <Cpu className="w-3.5 h-3.5 text-[#ffd426]" /> },
  { name: "WebSocket Telemetry", icon: <Activity className="w-3.5 h-3.5 text-[#34d399]" /> },
];

export function Marquee() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="flex flex-wrap gap-2.5 justify-center py-6">
        {[...ROW_1_CHIPS, ...ROW_2_CHIPS].map((chip) => (
          <div
            key={chip.name}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17120a] border border-white/[0.08] text-xs font-mono text-[#f5f3ee]"
          >
            {chip.icon}
            <span>{chip.name}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden py-4 select-none"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      {/* Row 1: Leftward Infinite Marquee (Doubled for seamless loop) */}
      <div className="flex w-max gap-4 hover:[animation-play-state:paused] animate-[marqueeLeft_32s_linear_infinite] mb-3.5 will-change-transform">
        {[...ROW_1_CHIPS, ...ROW_1_CHIPS].map((chip, idx) => (
          <div
            key={`${chip.name}-${idx}`}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#17120a] border border-white/[0.07] hover:border-[#ffd426]/40 transition-colors shadow-sm"
          >
            {chip.icon}
            <span className="font-mono text-xs text-[#f5f3ee] tracking-tight">
              {chip.name}
            </span>
          </div>
        ))}
      </div>

      {/* Row 2: Rightward Infinite Marquee (Doubled for seamless loop) */}
      <div className="flex w-max gap-4 hover:[animation-play-state:paused] animate-[marqueeRight_34s_linear_infinite] will-change-transform">
        {[...ROW_2_CHIPS, ...ROW_2_CHIPS].map((chip, idx) => (
          <div
            key={`${chip.name}-${idx}`}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#17120a] border border-white/[0.07] hover:border-[#ffd426]/40 transition-colors shadow-sm"
          >
            {chip.icon}
            <span className="font-mono text-xs text-[#f5f3ee] tracking-tight">
              {chip.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
