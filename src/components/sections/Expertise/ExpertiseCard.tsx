"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExpertiseCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  visual: React.ReactNode;
  className?: string;
}

export function ExpertiseCard({
  icon,
  title,
  description,
  tags,
  visual,
  className,
}: ExpertiseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGlowPos({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className={cn(
        "group relative flex flex-col justify-between p-6 sm:p-8 rounded-[24px]",
        "bg-gradient-to-b from-[#1e1810] to-[#17120a]",
        "border border-white/[0.07] hover:border-white/[0.14]",
        "transition-transform duration-300 ease-out hover:-translate-y-1 overflow-hidden",
        "h-full w-full",
        className
      )}
    >
      {/* Cursor-Following Soft Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[24px] transition-opacity duration-300 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 320px at ${glowPos.x}px ${glowPos.y}px, rgba(255, 212, 38, 0.12), transparent 75%)`,
        }}
      />

      {/* Top Section: Icon Tile + Header + Description */}
      <div className="relative z-10 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          {/* Icon tile (48px, accent-soft bg) */}
          <div className="w-12 h-12 rounded-[12px] flex items-center justify-center bg-[rgba(255,212,38,0.08)] border border-[rgba(255,212,38,0.22)] text-[#ffd426] transition-transform duration-200 group-hover:scale-105">
            {icon}
          </div>

          {/* Direct Arrow Action Link to #contact */}
          <Link
            href="#contact"
            className="flex items-center gap-1 text-xs font-mono text-[#7d7566] group-hover:text-[#ffd426] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd426] rounded px-2 py-1"
            aria-label={`Discuss ${title} consultation`}
          >
            <span>Discuss this</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="min-h-[96px] sm:min-h-[110px] flex flex-col justify-start">
          <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-[#f5f3ee] group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="mt-2 text-sm text-[#b7ae9c] leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Middle: Embedded Micro-Visual */}
      <div className="relative z-10 my-4 sm:my-6 flex-1 flex items-center justify-center w-full">
        {visual}
      </div>

      {/* Bottom: Mono Tag Pills */}
      <div className="relative z-10 mt-auto flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/[0.05] min-h-[58px]">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[11px] leading-tight text-[#b7ae9c] bg-white/[0.03] border border-white/[0.07] px-2.5 py-1 rounded-full select-none"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
