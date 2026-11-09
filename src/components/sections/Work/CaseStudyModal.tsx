"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, ExternalLink, Cpu, ShieldCheck, Zap, ArrowDown } from "lucide-react";
import { CaseStudy, KPI } from "@/lib/case-studies";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Animated KPI Counter that respects prefers-reduced-motion.
 */
function KpiCounter({ kpi }: { kpi: KPI }) {
  const [currentVal, setCurrentVal] = useState<number>(0);

  useEffect(() => {
    let frameId: number;
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      frameId = requestAnimationFrame(() => {
        setCurrentVal(kpi.value);
      });
      return () => cancelAnimationFrame(frameId);
    }

    let startTimestamp: number | null = null;
    const duration = 1000; // ms
    const target = kpi.value;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // ease-out cubic curve
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrentVal(eased * target);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCurrentVal(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [kpi.value]);

  const display =
    kpi.decimals !== undefined
      ? currentVal.toFixed(kpi.decimals)
      : Math.round(currentVal).toString();

  return (
    <div className="flex flex-col px-2.5 py-1.5 rounded-lg bg-[#17120a] border border-white/[0.05]">
      <span className="font-mono text-[9.5px] text-[#7d7566] uppercase tracking-wider truncate">
        {kpi.label}
      </span>
      <div className="mt-0.5 font-heading text-base sm:text-xl font-bold tracking-tight text-[#f5f3ee] flex items-baseline gap-1">
        {kpi.prefix && <span className="text-[#ffd426] text-sm">{kpi.prefix}</span>}
        <span>{display}</span>
        <span className="text-[#ffd426] text-xs font-normal font-mono">{kpi.suffix}</span>
      </div>
      <span className="text-[9.5px] text-[#b7ae9c] leading-tight truncate hidden sm:block">
        {kpi.caption}
      </span>
    </div>
  );
}

export function CaseStudyModal({ caseStudy, isOpen, onClose }: CaseStudyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll and isolate wheel events when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button on open
    closeButtonRef.current?.focus();

    const modalEl = modalRef.current;
    const handleWheel = (e: WheelEvent) => {
      // Prevent Lenis smooth scroll on window from intercepting modal scroll
      e.stopPropagation();
    };

    if (modalEl) {
      modalEl.addEventListener("wheel", handleWheel, { passive: true });
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      if (modalEl) {
        modalEl.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isOpen]);

  // Handle Escape key & Focus Trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !caseStudy) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-case-title"
      aria-describedby="modal-case-summary"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0a0805]/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Container */}
      <div
        ref={modalRef}
        data-lenis-prevent="true"
        className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto overscroll-contain rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#1e1810] via-[#17120a] to-[#120e08] border border-white/[0.14] shadow-[0_24px_80px_rgba(0,0,0,0.85)] p-4 sm:p-6 md:p-7 text-[#f5f3ee] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-[#ffd426] tracking-wider uppercase font-semibold">
              {caseStudy.code}
            </span>
            <span className="text-white/20">/</span>
            <Badge className="bg-[#ffd426]/10 text-[#ffd426] border-[#ffd426]/30 text-[11px] py-0.5">
              {caseStudy.badge}
            </Badge>
            <span className="text-xs font-mono text-[#b7ae9c] hidden sm:inline-block">
              {caseStudy.clientType}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close case study blueprint dialog"
            className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.1] text-[#b7ae9c] hover:text-[#f5f3ee] hover:bg-white/[0.1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ffd426]"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Title & Tagline */}
        <div className="mt-3.5">
          <h3
            id="modal-case-title"
            className="font-heading text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#f5f3ee]"
          >
            {caseStudy.title}
          </h3>
          <p
            id="modal-case-summary"
            className="mt-1 text-xs sm:text-sm text-[#b7ae9c] leading-relaxed line-clamp-2 max-w-3xl"
          >
            {caseStudy.tagline}
          </p>
        </div>

        {/* KPI Tiles (Count-up Animation in Slim Horizontal Strip) */}
        <div className="mt-3.5 grid grid-cols-3 gap-2 p-2 sm:p-2.5 rounded-xl bg-[#120e08]/90 border border-white/[0.08]">
          {caseStudy.kpis.map((kpi) => (
            <KpiCounter key={kpi.id} kpi={kpi} />
          ))}
        </div>

        {/* Inline SVG Architecture Diagram (Now 100% visible on screen without scroll!) */}
        <div className="mt-3.5">
          <ArchitectureDiagram flow={caseStudy.architecture} caseId={caseStudy.id} />
        </div>

        {/* Scroll Continuation Indicator */}
        <div className="mt-3 flex items-center justify-center gap-1.5 text-[10.5px] font-mono text-[#ffd426]/75 select-none">
          <ArrowDown className="h-3 w-3 animate-bounce" />
          <span>Scroll down for Architectural Challenge, Engineered Solution & Full Tech Stack</span>
        </div>

        {/* Deep Dive Narrative Sections */}
        <div className="mt-6 pt-5 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#120e08]/80 border border-white/[0.06]">
            <div className="flex items-center gap-2 mb-2 text-[#ffd426]">
              <Cpu className="h-4 w-4" />
              <h4 className="font-mono text-xs uppercase tracking-wider font-semibold">
                Architectural Challenge
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-[#b7ae9c] leading-relaxed">
              {caseStudy.keyChallenge}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#120e08]/80 border border-white/[0.06]">
            <div className="flex items-center gap-2 mb-2 text-[#34d399]">
              <ShieldCheck className="h-4 w-4" />
              <h4 className="font-mono text-xs uppercase tracking-wider font-semibold">
                Engineered Solution
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-[#b7ae9c] leading-relaxed">
              {caseStudy.solutionArchitecture}
            </p>
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="mt-6 pt-5 border-t border-white/[0.08]">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4 text-[#ffd426]" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#b7ae9c]">
              Verified Production Stack
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {caseStudy.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] font-mono text-[11px] text-[#f5f3ee]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#7d7566] font-mono text-center sm:text-left">
            * Benchmark metrics simulated for enterprise demonstration.
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close Blueprint
            </Button>
            <Button
              variant="primary"
              size="sm"
              href="#estimator"
              onClick={onClose}
              className="gap-1.5"
            >
              Consult On Similar Architecture
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
