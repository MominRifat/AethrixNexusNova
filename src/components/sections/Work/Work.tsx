"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { CASE_STUDIES, CaseStudy } from "@/lib/case-studies";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CaseStudyCard } from "./CaseStudyCard";
import { CaseStudyModal } from "./CaseStudyModal";
import { cn } from "@/lib/utils";

export function Work() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  // Update scroll navigation buttons and active index
  const updateScrollState = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 20);

    // Calculate which card is closest to the left offset
    const cardWidth = 440; // approx card width + gap
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), CASE_STUDIES.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    updateScrollState();

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollTo = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.75;

    scrollRef.current.scrollTo({
      left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const cards = scrollRef.current.querySelectorAll<HTMLElement>("[data-case-card]");
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }
  };

  return (
    <Section
      id="work"
      variant="bg-0"
      eyebrow="Proof of Work"
      title="Engineered systems, measured outcomes."
      description="Reference architectures engineered for sub-millisecond throughput, zero-downtime reliability, and verifiable enterprise scale."
      withTopDivider
      className="overflow-hidden"
    >
      {/* Top Track Controls & Honesty Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-[#ffd426]" />
          <span className="font-mono text-xs text-[#b7ae9c] uppercase tracking-wider">
            Enterprise Architecture Showcase
          </span>
          <span className="text-white/20">|</span>
          <span className="font-mono text-xs text-[#ffd426]">
            {String(activeIndex + 1).padStart(2, "0")} / {String(CASE_STUDIES.length).padStart(2, "0")}
          </span>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-3">
          {/* Segmented Progress Indicators */}
          <div className="flex items-center gap-1.5 mr-2">
            {CASE_STUDIES.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                aria-label={`Jump to case study ${i + 1}`}
                className={cn(
                  "h-1.5 transition-all duration-300 rounded-full",
                  activeIndex === i
                    ? "w-8 bg-[#ffd426]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                )}
              />
            ))}
          </div>

          <button
            onClick={() => scrollTo("left")}
            disabled={!canScrollLeft}
            aria-label="Previous case study"
            className={cn(
              "w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border transition-all duration-200",
              canScrollLeft
                ? "bg-[#17120a] border-white/10 text-[#f5f3ee] hover:border-[#ffd426]/50 hover:bg-[#1e1810]"
                : "bg-white/[0.02] border-white/[0.04] text-[#7d7566] cursor-not-allowed opacity-40"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            onClick={() => scrollTo("right")}
            disabled={!canScrollRight}
            aria-label="Next case study"
            className={cn(
              "w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border transition-all duration-200",
              canScrollRight
                ? "bg-[#17120a] border-white/10 text-[#f5f3ee] hover:border-[#ffd426]/50 hover:bg-[#1e1810]"
                : "bg-white/[0.02] border-white/[0.04] text-[#7d7566] cursor-not-allowed opacity-40"
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll-Snap Track */}
      <Reveal index={0}>
        <div
          ref={scrollRef}
          role="region"
          aria-label="Case studies horizontal carousel"
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none focus:outline-none -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              data-case-card
              className="w-[85vw] sm:w-[460px] md:w-[500px] lg:w-[540px] shrink-0 snap-start"
            >
              <CaseStudyCard
                caseStudy={cs}
                onSelect={(selected) => setSelectedCase(selected)}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </Reveal>

      {/* Micro-guide hint for touch/drag */}
      <div className="mt-4 flex items-center justify-between text-xs font-mono text-[#7d7566]">
        <span>← Swipe or use arrow keys to navigate blueprints →</span>
        <span className="hidden sm:inline-block">Click card to inspect full system blueprint</span>
      </div>

      {/* Blueprint Detail Modal */}
      <CaseStudyModal
        caseStudy={selectedCase}
        isOpen={Boolean(selectedCase)}
        onClose={() => setSelectedCase(null)}
      />
    </Section>
  );
}
