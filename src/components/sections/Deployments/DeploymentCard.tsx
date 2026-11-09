"use client";

import React, { useRef, useState } from "react";
import { ExternalLink, ShieldCheck, Workflow, ArrowUpRight } from "lucide-react";
import { type ClientDeployment } from "@/lib/client-deployments";
import { cn } from "@/lib/utils";

export interface DeploymentCardProps {
  deployment: ClientDeployment;
  className?: string;
  onOpenModal?: (deployment: ClientDeployment) => void;
}

export function DeploymentCard({
  deployment,
  className,
  onOpenModal,
}: DeploymentCardProps) {
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

  const handleCardClick = () => {
    onOpenModal?.(deployment);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpenModal?.(deployment);
    }
  };

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className={cn(
        "group relative flex flex-col justify-between p-6 sm:p-8 rounded-[24px]",
        "bg-gradient-to-b from-[#1b150d] via-[#16110a] to-[#120e08]",
        "border border-white/[0.1] hover:border-[#ffd426]/50",
        "transition-all duration-300 ease-out hover:-translate-y-0.5 overflow-hidden shadow-2xl",
        "h-full w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ffd426] focus:ring-offset-2 focus:ring-offset-[#0a0805]",
        className
      )}
    >
      {/* Soft Cursor Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[24px] transition-opacity duration-300 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 380px at ${glowPos.x}px ${glowPos.y}px, rgba(255, 212, 38, 0.12), transparent 75%)`,
        }}
      />

      {/* Top Meta Header: Status Indicator + Category + Inspect Hint */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          {/* Pulsing Live Emerald Indicator */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>

          <span className="font-mono text-xs font-semibold text-emerald-400 tracking-wide uppercase">
            {deployment.status}
          </span>

          {deployment.badge && (
            <span className="hidden sm:inline-block font-mono text-[10px] text-[#ffd426] bg-[#ffd426]/10 px-2.5 py-0.5 rounded-full border border-[#ffd426]/25">
              {deployment.badge}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-[#7d7566] uppercase bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/[0.06] whitespace-nowrap">
            {deployment.category}
          </span>
          <span className="hidden md:inline-flex items-center gap-1 font-mono text-[11px] text-[#ffd426] bg-[#ffd426]/10 px-2.5 py-1 rounded-md border border-[#ffd426]/25 group-hover:bg-[#ffd426] group-hover:text-[#0a0805] transition-colors">
            <Workflow className="w-3 h-3" />
            <span>Inspect Blueprint</span>
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>

      {/* Title & Core Scope */}
      <div className="relative z-10 pt-4 flex-1 flex flex-col justify-start">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#f5f3ee] group-hover:text-white transition-colors">
            {deployment.name}
          </h3>
          <span className="font-mono text-[11px] text-[#ffd426] opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline-block">
            Click to open protocol &rarr;
          </span>
        </div>
        <p className="font-mono text-xs text-[#ffd426] tracking-wide mt-1">
          {deployment.clientType}
        </p>

        {/* Architecture Challenge Badge */}
        {deployment.challenge && (
          <div className="mt-3.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-[#b7ae9c]">
            <span className="text-[#ffd426] font-semibold text-[11px]">CORE ARCHITECTURE:</span>
            <span className="text-[#f5f3ee] line-clamp-1">{deployment.challenge}</span>
          </div>
        )}

        {/* Summary Description */}
        <p className="mt-3.5 text-sm sm:text-base text-[#b7ae9c] leading-relaxed">
          {deployment.summary}
        </p>

        {/* Tech Badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          {deployment.techStack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs text-[#b7ae9c] bg-white/[0.03] border border-white/[0.07] px-2.5 py-1 rounded-md select-none"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Measured Outcomes & Action Link */}
      <div className="relative z-10 mt-6 pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* KPI Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full sm:w-auto">
          {deployment.outcomes.map((outcome, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-mono text-[10px] text-[#7d7566] uppercase tracking-wider">
                {outcome.label}
              </span>
              <span className="font-mono text-base sm:text-lg font-bold text-[#ffd426]">
                {outcome.value}
              </span>
              {outcome.detail && (
                <span className="font-mono text-[10px] text-[#7d7566]">
                  {outcome.detail}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Action Button: stopPropagation so external link opens directly */}
        <div className="w-full sm:w-auto flex items-center justify-end gap-2.5">
          {deployment.isLiveSystem && deployment.liveUrl ? (
            <a
              href={deployment.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#ffd426] text-[#0a0805] font-mono text-xs font-bold hover:bg-[#ffdf59] shadow-[0_2px_14px_rgba(255,212,38,0.25)] hover:shadow-[0_4px_20px_rgba(255,212,38,0.4)] transition-all duration-200 cursor-pointer w-full sm:w-auto group/btn"
              aria-label={`Visit live deployment for ${deployment.name}`}
            >
              <span>Visit Live Platform</span>
              <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          ) : (
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#7d7566] bg-white/[0.02] border border-white/[0.06] px-3.5 py-2 rounded-lg select-none">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SLA Verified</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
