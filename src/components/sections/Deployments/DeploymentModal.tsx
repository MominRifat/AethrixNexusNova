"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  X,
  ExternalLink,
  Cpu,
  ShieldCheck,
  Zap,
  Star,
  Quote,
  Workflow,
  MessageSquareQuote,
  CheckCircle2,
} from "lucide-react";
import { type ClientDeployment } from "@/lib/client-deployments";
import { DeploymentFlowchart } from "./DeploymentFlowchart";
import { cn } from "@/lib/utils";

interface DeploymentModalProps {
  deployment: ClientDeployment | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DeploymentModal({ deployment, isOpen, onClose }: DeploymentModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [activeTab, setActiveTab] = useState<"flowchart" | "review">("flowchart");

  // Lock body scroll and prevent Lenis smooth scroll on window from intercepting modal scroll
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const modalEl = modalRef.current;
    const handleWheel = (e: WheelEvent) => {
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

  // Handle Escape key and focus trap
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

  if (!isOpen || !deployment) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-deployment-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0a0805]/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Container with Lenis Interception Prevention */}
      <div
        ref={modalRef}
        data-lenis-prevent="true"
        className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto overscroll-contain rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#1e1810] via-[#17120a] to-[#120e08] border border-white/[0.14] shadow-[0_24px_80px_rgba(0,0,0,0.85)] p-4 sm:p-6 md:p-8 text-[#f5f3ee] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-white/[0.08]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-xs font-semibold text-emerald-400 uppercase tracking-wide">
              {deployment.status}
            </span>
            {deployment.badge && (
              <span className="font-mono text-[10px] text-[#ffd426] bg-[#ffd426]/10 px-2 py-0.5 rounded-full border border-[#ffd426]/25">
                {deployment.badge}
              </span>
            )}
            <span className="text-white/20">/</span>
            <span className="font-mono text-xs text-[#7d7566] uppercase">
              {deployment.category}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close client protocol dialog"
            className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.1] text-[#b7ae9c] hover:text-[#f5f3ee] hover:bg-white/[0.1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ffd426]"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Title & Client Type */}
        <div className="mt-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3
              id="modal-deployment-title"
              className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#f5f3ee]"
            >
              {deployment.name}
            </h3>
            {deployment.isLiveSystem && deployment.liveUrl && (
              <a
                href={deployment.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-[#ffd426] hover:underline"
              >
                <span>{deployment.liveUrl.replace(/^https?:\/\//, "")}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <p className="mt-1 text-xs sm:text-sm text-[#ffd426] font-mono tracking-wide">
            {deployment.clientType}
          </p>
        </div>

        {/* Top KPI Metrics Strip */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-[#120e08]/90 border border-white/[0.08]">
          {deployment.outcomes.map((outcome, idx) => (
            <div
              key={idx}
              className="flex flex-col px-3 py-1.5 rounded-lg bg-[#17120a] border border-white/[0.05]"
            >
              <span className="font-mono text-[10px] text-[#7d7566] uppercase tracking-wider">
                {outcome.label}
              </span>
              <span className="font-heading text-lg font-bold text-[#ffd426] mt-0.5">
                {outcome.value}
              </span>
              {outcome.detail && (
                <span className="font-mono text-[9.5px] text-[#b7ae9c] truncate">
                  {outcome.detail}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Interactive Tab Selector (Flowchart vs Review) */}
        <div className="mt-6 flex items-center gap-2 p-1 rounded-xl bg-[#120e08] border border-white/[0.08]">
          <button
            type="button"
            onClick={() => setActiveTab("flowchart")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-mono text-xs font-semibold transition-all duration-200 cursor-pointer",
              activeTab === "flowchart"
                ? "bg-[#ffd426] text-[#0a0805] shadow-[0_2px_12px_rgba(255,212,38,0.25)]"
                : "text-[#b7ae9c] hover:text-[#f5f3ee] hover:bg-white/[0.04]"
            )}
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>Architecture Flowchart</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("review")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-mono text-xs font-semibold transition-all duration-200 cursor-pointer",
              activeTab === "review"
                ? "bg-[#ffd426] text-[#0a0805] shadow-[0_2px_12px_rgba(255,212,38,0.25)]"
                : "text-[#b7ae9c] hover:text-[#f5f3ee] hover:bg-white/[0.04]"
            )}
          >
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Verified Client Review</span>
            <span
              className={cn(
                "hidden sm:inline-block font-mono text-[10px] px-1.5 py-0.2 rounded",
                activeTab === "review"
                  ? "bg-[#0a0805] text-[#ffd426]"
                  : "bg-[#ffd426]/10 text-[#ffd426]"
              )}
            >
              5.0 ★
            </span>
          </button>
        </div>

        {/* Tab 1 Content: Architecture Flowchart & Technical Deep Dive */}
        {activeTab === "flowchart" && (
          <div className="mt-5 space-y-5 animate-in fade-in duration-200">
            {/* SVG Interactive Architecture Flowchart */}
            <DeploymentFlowchart
              flow={deployment.architectureFlow}
              deploymentId={deployment.id}
            />

            {/* Deep-Dive Narrative Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#120e08]/90 border border-white/[0.07]">
                <div className="flex items-center gap-2 mb-2 text-[#ffd426]">
                  <Cpu className="h-4 w-4" />
                  <h4 className="font-mono text-xs uppercase tracking-wider font-semibold">
                    Architectural Challenge
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#b7ae9c] leading-relaxed">
                  {deployment.challenge}
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#120e08]/90 border border-white/[0.07]">
                <div className="flex items-center gap-2 mb-2 text-emerald-400">
                  <ShieldCheck className="h-4 w-4" />
                  <h4 className="font-mono text-xs uppercase tracking-wider font-semibold">
                    Engineered Solution
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#b7ae9c] leading-relaxed">
                  {deployment.solution}
                </p>
              </div>
            </div>

            {/* Tech Stack Badges */}
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-2.5">
                <Zap className="h-3.5 w-3.5 text-[#ffd426]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#b7ae9c]">
                  Verified Production Stack
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {deployment.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] font-mono text-xs text-[#f5f3ee]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2 Content: Verified Client Review & Impact */}
        {activeTab === "review" && (
          <div className="mt-5 space-y-5 animate-in fade-in duration-200">
            {/* Testimonial Hero Quote Box */}
            <div className="relative p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#1b150d] via-[#141009] to-[#0f0b07] border border-[#ffd426]/30 shadow-xl overflow-hidden">
              {/* Decorative Background Quote Watermark */}
              <Quote
                className="absolute right-4 bottom-4 w-28 h-28 text-[#ffd426]/5 pointer-events-none select-none"
                aria-hidden="true"
              />

              {/* Verified Rating & Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#ffd426] text-[#ffd426]" />
                  ))}
                  <span className="font-mono text-xs font-bold text-[#ffd426] ml-1.5">
                    5.0 / 5.0
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Direct Delivery</span>
                </div>
              </div>

              {/* Quote Body */}
              <blockquote className="mt-4 text-base sm:text-lg text-[#f5f3ee] font-serif italic leading-relaxed">
                &ldquo;{deployment.review.quote}&rdquo;
              </blockquote>

              {/* Author Info */}
              <div className="mt-6 flex items-center gap-3.5 pt-4 border-t border-white/[0.06]">
                <div className="w-11 h-11 rounded-full bg-[#ffd426]/10 border border-[#ffd426]/30 flex items-center justify-center font-mono font-bold text-sm text-[#ffd426]">
                  {deployment.review.avatarText}
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-[#f5f3ee]">
                    {deployment.review.author}
                  </h4>
                  <p className="font-mono text-xs text-[#b7ae9c]">
                    {deployment.review.role} &bull; {deployment.review.company}
                  </p>
                </div>
              </div>
            </div>

            {/* Delivered Business Impact Metrics */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-[#ffd426]" />
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#b7ae9c] font-semibold">
                  Delivered Business Impact &amp; SLA
                </h4>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {deployment.review.impactMetrics.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#120e08]/90 border border-white/[0.06] flex flex-col justify-between"
                  >
                    <span className="font-mono text-[10px] text-[#7d7566] uppercase tracking-wide">
                      {item.label}
                    </span>
                    <span className="font-mono text-xl sm:text-2xl font-bold text-[#ffd426] my-1">
                      {item.value}
                    </span>
                    <span className="font-mono text-[9.5px] text-[#b7ae9c] leading-tight">
                      {item.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal Actions Footer */}
        <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[#7d7566] font-mono text-center lg:text-left">
            * Client architecture delivered under mutual NDA and verification agreement.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5 w-full lg:w-auto">
            {/* 1. Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center h-10 px-4 rounded-[12px] bg-transparent text-[#f5f3ee] border border-white/[0.14] hover:bg-white/[0.08] hover:border-white/[0.25] font-sans text-xs font-semibold tracking-tight whitespace-nowrap transition-all duration-200 cursor-pointer"
            >
              Close Protocol
            </button>

            {/* 2. Visit Live Platform Button */}
            {deployment.isLiveSystem && deployment.liveUrl && (
              <a
                href={deployment.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-[12px] bg-[#ffd426] hover:bg-[#ffdf59] text-[#1a1305] font-sans text-xs font-semibold tracking-tight shadow-[0_2px_14px_rgba(255,212,38,0.2)] hover:shadow-[0_4px_20px_rgba(255,212,38,0.35)] whitespace-nowrap transition-all duration-200 cursor-pointer"
              >
                <span>Visit Live Platform</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>
            )}

            {/* 3. Consult Similar Button */}
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-[12px] bg-transparent text-[#ffd426] border border-[#ffd426]/35 hover:bg-[#ffd426]/10 hover:border-[#ffd426] font-sans text-xs font-semibold tracking-tight whitespace-nowrap transition-all duration-200 cursor-pointer"
            >
              <span>Consult On Similar Architecture</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
