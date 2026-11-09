"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  TECH_CATEGORIES,
  TECH_STACK,
  type TechCategory,
  type ProficiencyLevel,
} from "@/lib/tech-data";
import { cn } from "@/lib/utils";

function ProficiencyBar({ level }: { level: ProficiencyLevel }) {
  const getFilledCount = () => {
    switch (level) {
      case "Core":
        return 3;
      case "Advanced":
        return 2;
      case "Working":
        return 1;
    }
  };

  const filled = getFilledCount();

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[10px] uppercase text-[#7d7566] tracking-wider">
        Depth: {level}
      </span>
      <div className="flex gap-1" aria-label={`Proficiency level: ${level}`}>
        {[1, 2, 3].map((segment) => (
          <div
            key={segment}
            className={cn(
              "h-1.5 w-4 rounded-full transition-colors duration-200",
              segment <= filled
                ? level === "Core"
                  ? "bg-[#ffd426]"
                  : level === "Advanced"
                  ? "bg-[#ff9f1c]"
                  : "bg-[#b7ae9c]"
                : "bg-white/[0.08]"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function TechRadar() {
  const [activeCategory, setActiveCategory] = useState<TechCategory>("All");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const filteredItems =
    activeCategory === "All"
      ? TECH_STACK
      : TECH_STACK.filter((item) => item.category === activeCategory);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 12);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 12);

    const cardStep = Math.max(clientWidth * 0.8, 260);
    const index = Math.round(scrollLeft / cardStep);
    setActiveSlideIndex(Math.min(filteredItems.length - 1, Math.max(0, index)));
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const offset = scrollContainerRef.current.clientWidth * 0.82;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -offset : offset,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      setActiveSlideIndex(0);
      setCanScrollLeft(false);
      setCanScrollRight(filteredItems.length > 1);
    }
  }, [activeCategory, filteredItems.length]);

  return (
    <div className="w-full max-w-full overflow-hidden space-y-6 sm:space-y-8 mt-8 sm:mt-12">
      {/* Filter Pills with Horizontal Scroll on Mobile (Zero Page Overflow) */}
      <div
        role="group"
        aria-label="Filter technologies by discipline"
        className="flex items-center sm:justify-center gap-2 select-none overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 scrollbar-none w-full max-w-full"
      >
        {TECH_CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={(e) => {
                e.preventDefault();
                e.currentTarget.blur();
                setActiveCategory(category);
              }}
              className={cn(
                "px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-xs transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd426] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0805]",
                isActive
                  ? "bg-[#ffd426] text-[#1a1305] font-semibold shadow-[0_2px_12px_rgba(255,212,38,0.2)]"
                  : "bg-[#17120a] text-[#b7ae9c] border border-white/[0.08] hover:border-white/[0.2] hover:text-[#f5f3ee]"
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Cards: Mobile Horizontal Swipe Carousel / Desktop Responsive Grid */}
      <div className="relative w-full max-w-full overflow-hidden">
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-3 pt-1 scrollbar-none w-full max-w-full"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 w-full"
            >
              {filteredItems.map((tech) => (
                <div
                  key={tech.id}
                  className="w-[82vw] max-w-[310px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink p-4 sm:p-5 rounded-[18px] bg-gradient-to-b from-[#1e1810] to-[#17120a] border border-white/[0.07] hover:border-white/[0.14] transition-all duration-200 group flex flex-col justify-between h-[180px] sm:h-auto"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2 min-h-[26px]">
                      <h4 className="font-heading text-base sm:text-lg font-bold text-[#f5f3ee] tracking-tight group-hover:text-white transition-colors line-clamp-1">
                        {tech.name}
                      </h4>
                      <span className="font-mono text-[9.5px] sm:text-[10px] text-[#7d7566] uppercase bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06] whitespace-nowrap shrink-0">
                        {tech.category}
                      </span>
                    </div>

                    {tech.highlight && (
                      <p className="text-xs text-[#b7ae9c] leading-relaxed line-clamp-2 min-h-[34px] mb-3">
                        {tech.highlight}
                      </p>
                    )}
                  </div>

                  <div className="mt-auto pt-2.5 sm:pt-3 border-t border-white/[0.05] flex items-center justify-between">
                    <ProficiencyBar level={tech.proficiency} />
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Swipe Indicators & Thumb Navigation Controls */}
        <div className="flex sm:hidden items-center justify-between px-1 pt-2">
          <div className="flex items-center gap-1.5 font-mono text-xs text-[#7d7566]">
            <span className="text-[#ffd426] font-bold">
              {activeSlideIndex + 1}
            </span>
            <span>/</span>
            <span>{filteredItems.length}</span>
            <span className="text-[#7d7566] text-[10px] uppercase tracking-wider ml-1.5">
              Swipe to explore &rarr;
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous technology card"
              className="p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[#b7ae9c] disabled:opacity-25 disabled:pointer-events-none hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next technology card"
              className="p-1.5 rounded-lg bg-[#ffd426]/10 border border-[#ffd426]/30 text-[#ffd426] disabled:opacity-25 disabled:pointer-events-none hover:bg-[#ffd426] hover:text-[#0a0805] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
