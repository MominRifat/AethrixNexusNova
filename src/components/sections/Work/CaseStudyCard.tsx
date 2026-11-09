"use client";

import React, { useRef, useState, useCallback } from "react";
import { ArrowUpRight, Cpu } from "lucide-react";
import { CaseStudy } from "@/lib/case-studies";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  onSelect: (cs: CaseStudy) => void;
  className?: string;
}

export function CaseStudyCard({ caseStudy, onSelect, className }: CaseStudyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined") {
      if (
        window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }
    }

    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Center coordinates (-1 to 1)
    const centerX = x / rect.width - 0.5;
    const centerY = y / rect.height - 0.5;

    // Max 6deg tilt per PROJECT_RULES.md
    const rotateY = centerX * 6;
    const rotateX = -centerY * 6;

    setTilt({ rotateX, rotateY });
    setGlowPos({ x, y });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(caseStudy);
    }
  };

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`View full blueprint for ${caseStudy.title}`}
      onClick={() => onSelect(caseStudy)}
      onKeyDown={handleKeyDown}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
      }}
      className={cn(
        "group relative flex flex-col justify-between p-6 sm:p-8 rounded-[24px] cursor-pointer",
        "bg-gradient-to-b from-[#1e1810] to-[#17120a]",
        "border border-white/[0.08] hover:border-[#ffd426]/40",
        "transition-[transform,border-color,box-shadow] duration-200 ease-out",
        "hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)] focus:outline-none focus:ring-2 focus:ring-[#ffd426]",
        "overflow-hidden select-none",
        className
      )}
    >
      {/* Dynamic Cursor Light Reflection */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[24px] transition-opacity duration-300 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 380px at ${glowPos.x}px ${glowPos.y}px, rgba(255, 212, 38, 0.12), transparent 70%)`,
        }}
      />

      {/* Top Meta Info */}
      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#ffd426] tracking-wider uppercase font-semibold">
              {caseStudy.code}
            </span>
            <span className="text-white/20">/</span>
            <span className="font-mono text-xs text-[#b7ae9c]">
              {caseStudy.clientType}
            </span>
          </div>

          <Badge className="bg-[#ffd426]/10 text-[#ffd426] border-[#ffd426]/30">
            {caseStudy.badge}
          </Badge>
        </div>

        {/* Title & Tagline */}
        <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#f5f3ee] group-hover:text-[#ffd426] transition-colors duration-200">
          {caseStudy.title}
        </h3>
        <p className="mt-3 text-sm text-[#b7ae9c] leading-relaxed line-clamp-3">
          {caseStudy.summary}
        </p>

        {/* Tech Badges */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {caseStudy.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] font-mono text-[11px] text-[#f5f3ee]/90"
            >
              {tag}
            </span>
          ))}
          {caseStudy.tags.length > 4 && (
            <span className="px-2 py-1 rounded-md bg-white/[0.02] border border-white/[0.04] font-mono text-[11px] text-[#7d7566]">
              +{caseStudy.tags.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* KPI Preview Strip & Trigger */}
      <div className="relative z-10 mt-8 pt-6 border-t border-white/[0.08]">
        {/* KPI Strip */}
        <div className="grid grid-cols-3 gap-2 pb-5">
          {caseStudy.kpis.map((kpi) => (
            <div key={kpi.id} className="flex flex-col">
              <span className="font-mono text-[10px] text-[#7d7566] uppercase truncate">
                {kpi.label}
              </span>
              <div className="mt-0.5 font-heading text-lg sm:text-xl font-bold text-[#f5f3ee] flex items-baseline gap-0.5">
                {kpi.prefix && (
                  <span className="text-xs text-[#ffd426]">{kpi.prefix}</span>
                )}
                <span>
                  {kpi.decimals !== undefined ? kpi.value.toFixed(kpi.decimals) : kpi.value}
                </span>
                <span className="text-xs font-mono text-[#ffd426] font-normal">
                  {kpi.suffix}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.04] text-xs font-mono text-[#b7ae9c] group-hover:text-[#ffd426] transition-colors">
          <div className="flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5 text-[#ffd426]" />
            <span>Interactive Architecture & Blueprint</span>
          </div>
          <div className="flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform duration-200">
            <span>Explore</span>
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
