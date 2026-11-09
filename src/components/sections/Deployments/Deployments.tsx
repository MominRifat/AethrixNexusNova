"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { type ClientDeployment, CLIENT_DEPLOYMENTS } from "@/lib/client-deployments";
import { DeploymentCard } from "./DeploymentCard";
import { DeploymentModal } from "./DeploymentModal";
import { cn } from "@/lib/utils";

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function Deployments() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedDeployment, setSelectedDeployment] =
    useState<ClientDeployment | null>(null);

  const total = CLIENT_DEPLOYMENTS.length;
  const currentDeployment = CLIENT_DEPLOYMENTS[currentIndex];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleSelect = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  return (
    <Section
      id="deployments"
      variant="bg-0"
      eyebrow="Proven Deployments"
      eyebrowDot
      title="Client Protocol & Production Ledger."
      description="Verifiable software architectures shipped to production. Explore active client deployments, infrastructure deliverables, and measured engineering impact."
      withTopDivider
    >
      <div className="w-full max-w-4xl mx-auto space-y-3.5 sm:space-y-6">
        {/* Top Progress & Node Indicator Bar */}
        <div className="flex items-center justify-between gap-2 px-1 sm:px-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-mono text-[11px] sm:text-xs uppercase px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#ffd426]/10 text-[#ffd426] border border-[#ffd426]/20 font-semibold tracking-wider whitespace-nowrap">
              CLIENT NODE 0{currentIndex + 1} &bull; 0{total}
            </span>
            <span className="font-mono text-[11px] sm:text-xs text-[#7d7566] uppercase truncate hidden xs:inline">
              {currentDeployment.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] sm:text-xs text-[#7d7566] whitespace-nowrap">
              {Math.round(((currentIndex + 1) / total) * 100)}% Shipped
            </span>
            <div className="w-20 sm:w-32 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#ffd426] to-[#ff9f1c] transition-all duration-300 ease-out"
                style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Carousel Showcase Card with AnimatePresence */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentDeployment.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <DeploymentCard
                deployment={currentDeployment}
                onOpenModal={(dep) => setSelectedDeployment(dep)}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation & Jump Controls Bar */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#120e08] border border-white/[0.06]">
          {/* Node Indicator Dots */}
          <div
            role="tablist"
            aria-label="Client showcase navigation"
            className="flex items-center gap-1.5 sm:gap-2"
          >
            {CLIENT_DEPLOYMENTS.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Show ${item.name}`}
                  onClick={() => handleSelect(idx)}
                  className={cn(
                    "transition-all duration-300 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd426]",
                    isActive
                      ? "w-6 sm:w-8 h-2 sm:h-2.5 bg-[#ffd426] shadow-[0_0_12px_rgba(255,212,38,0.5)]"
                      : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/20 hover:bg-white/40"
                  )}
                />
              );
            })}
          </div>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous client deployment"
              className="inline-flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.2] font-mono text-xs text-[#b7ae9c] hover:text-[#f5f3ee] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next client deployment"
              className="inline-flex items-center gap-1 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-lg sm:rounded-xl bg-[#ffd426]/10 hover:bg-[#ffd426] border border-[#ffd426]/30 hover:border-[#ffd426] font-mono text-xs font-bold text-[#ffd426] hover:text-[#0a0805] shadow-[0_2px_14px_rgba(255,212,38,0.15)] hover:shadow-[0_4px_20px_rgba(255,212,38,0.35)] transition-all cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Trust & Protocol SLA Footnote */}
        <Reveal index={2}>
          <div className="mt-8 p-5 rounded-2xl bg-[#120e08] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-1">
              <span className="font-mono text-xs font-semibold text-[#f5f3ee] tracking-wide">
                ENTERPRISE CONFIDENTIALITY &amp; CODE DEPLOYMENT PROTOCOL
              </span>
              <p className="text-xs text-[#7d7566] leading-relaxed max-w-2xl">
                Client architectures adhere strictly to mutual NDA protocols. Live platforms are showcased with verified authorization. Complete client source code and IP ownership transfer upon delivery.
              </p>
            </div>
            <a
              href="#contact"
              className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-mono text-[#ffd426] hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Request Custom Audit &rarr;
            </a>
          </div>
        </Reveal>
      </div>

      {/* Deep-Dive Inspection Modal: Architecture Flowchart & Verified Client Review */}
      <DeploymentModal
        deployment={selectedDeployment}
        isOpen={Boolean(selectedDeployment)}
        onClose={() => setSelectedDeployment(null)}
      />
    </Section>
  );
}
