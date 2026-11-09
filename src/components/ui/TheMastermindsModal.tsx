"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, ChevronRight, ArrowLeft, ExternalLink, Sparkles } from "lucide-react";
import { LEADERSHIP_TEAM, type LeaderProfile } from "@/lib/team-leadership";
import { cn } from "@/lib/utils";

interface TheMastermindsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TheMastermindsModal({ isOpen, onClose }: TheMastermindsModalProps) {
  const [selectedLeader, setSelectedLeader] = useState<LeaderProfile | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape or click outside
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedLeader) {
          setSelectedLeader(null);
        } else {
          onClose();
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };

    const modalEl = modalRef.current;
    if (modalEl) {
      modalEl.addEventListener("wheel", handleWheel, { passive: true });
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      if (modalEl) {
        modalEl.removeEventListener("wheel", handleWheel);
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, selectedLeader, onClose]);

  const handleClose = () => {
    setSelectedLeader(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="masterminds-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-5 select-none"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0a0805]/85 backdrop-blur-md transition-opacity duration-300"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <motion.div
        ref={modalRef}
        data-lenis-prevent="true"
        initial={{ opacity: 0, scale: 0.96, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 14 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto overscroll-contain",
          "rounded-3xl bg-gradient-to-b from-[#1c160e] via-[#140f09] to-[#0f0b07]",
          "border border-[#ffd426]/35 shadow-[0_24px_80px_rgba(0,0,0,0.9)] p-5 sm:p-7 text-[#f5f3ee]"
        )}
      >
        {/* Ambient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#ffd426]/15 blur-3xl"
        />

        {!selectedLeader ? (
          /* VIEW 1: All Founders List */
          <div className="relative z-10 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#ffd426]/10 border border-[#ffd426]/30 flex items-center justify-center text-[#ffd426]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3
                    id="masterminds-title"
                    className="font-heading text-lg sm:text-xl font-bold text-[#f5f3ee] tracking-tight"
                  >
                    The Masterminds
                  </h3>
                  <span className="font-mono text-[10.5px] text-[#ffd426] tracking-wider uppercase">
                    Founding Leadership &amp; Engineering Council
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close dialog"
                className="w-9 h-9 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-[#b7ae9c] hover:text-[#f5f3ee] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-[13px] text-[#b7ae9c] leading-relaxed">
              The executive visionaries and system architects steering Aethrix Nexus Nova. Click a profile to inspect core engineering mandates and leadership focus.
            </p>

            {/* Founders Cards */}
            <div className="space-y-3 pt-1">
              {LEADERSHIP_TEAM.map((leader, idx) => (
                <button
                  key={leader.id}
                  type="button"
                  onClick={() => setSelectedLeader(leader)}
                  className={cn(
                    "group/card w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl text-left",
                    "bg-[#140f09] hover:bg-[#1f180f] border border-white/[0.08] hover:border-[#ffd426]/50",
                    "transition-all duration-200 cursor-pointer shadow-sm hover:translate-x-1"
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Avatar / Emoji Badge */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffd426]/20 to-[#ff9f1c]/10 border border-[#ffd426]/35 flex items-center justify-center text-xl shrink-0 shadow-[0_0_15px_rgba(255,212,38,0.18)] group-hover/card:scale-105 transition-transform">
                      {leader.emoji}
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs text-[#7d7566]">
                          0{idx + 1}.
                        </span>
                        <h4 className="font-heading text-sm sm:text-base font-bold text-[#f5f3ee] group-hover/card:text-white transition-colors">
                          {leader.name}
                        </h4>
                      </div>
                      <p className="font-mono text-xs text-[#ffd426] mt-0.5">
                        {leader.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 font-mono text-[11px] text-[#7d7566] group-hover/card:text-[#ffd426] transition-colors">
                    <span className="hidden sm:inline">Profile</span>
                    <ChevronRight className="w-4 h-4 group-hover/card:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-white/[0.06] text-[10px] font-mono text-[#7d7566]">
              <span>AETHRIX NEXUS NOVA</span>
              <span>VERIFIED DIRECTORS COUNCIL</span>
            </div>
          </div>
        ) : (
          /* VIEW 2: Detailed Founder Profile View */
          <div className="relative z-10 space-y-4 animate-in fade-in duration-200">
            {/* Back Navigation Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <button
                type="button"
                onClick={() => setSelectedLeader(null)}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#ffd426] hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Masterminds</span>
              </button>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close dialog"
                className="w-8 h-8 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-[#b7ae9c] hover:text-[#f5f3ee] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Card Header */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ffd426]/20 to-[#ff9f1c]/10 border border-[#ffd426]/40 flex items-center justify-center text-3xl shrink-0 shadow-[0_0_24px_rgba(255,212,38,0.25)]">
                <span>{selectedLeader.emoji}</span>
                <span className="absolute -bottom-1 -right-1 font-mono text-[9.5px] font-bold bg-[#ffd426] text-[#0a0805] px-1 rounded shadow">
                  {selectedLeader.monogram}
                </span>
              </div>

              <div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-[#f5f3ee]">
                  {selectedLeader.name}
                </h3>
                <div className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffd426]/10 border border-[#ffd426]/25 font-mono text-xs text-[#ffd426] font-semibold">
                  <span>{selectedLeader.role}</span>
                </div>
              </div>
            </div>

            {/* Role Description */}
            <div className="p-4 rounded-xl bg-[#140f09] border border-white/[0.06] space-y-1.5">
              <span className="font-mono text-[10px] text-[#7d7566] uppercase tracking-wider block">
                Core Mandate &amp; Role
              </span>
              <p className="text-xs sm:text-sm text-[#b7ae9c] leading-relaxed">
                {selectedLeader.bio}
              </p>
            </div>

            {/* Focus Areas */}
            <div>
              <span className="font-mono text-[10.5px] text-[#7d7566] uppercase tracking-wider block mb-2">
                Key Architectural Domains
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedLeader.coreFocus.map((focus) => (
                  <span
                    key={focus}
                    className="font-mono text-[11px] text-[#f5f3ee] bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-md"
                  >
                    {focus}
                  </span>
                ))}
              </div>
            </div>

            {/* Portfolio Action Button */}
            <div className="pt-3 flex items-center justify-between gap-3 border-t border-white/[0.06]">
              <span className="font-mono text-[10px] text-[#7d7566]">
                Verified Founding Officer
              </span>

              <a
                href={selectedLeader.portfolioUrl || "#"}
                target={selectedLeader.portfolioUrl !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 h-9 rounded-xl bg-[#ffd426] hover:bg-[#ffdf59] text-[#0a0805] font-sans text-xs font-semibold shadow-[0_2px_12px_rgba(255,212,38,0.2)] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>View Portfolio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
