"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  const filteredItems =
    activeCategory === "All"
      ? TECH_STACK
      : TECH_STACK.filter((item) => item.category === activeCategory);

  return (
    <div className="w-full space-y-8 mt-12">
      {/* Filter Pills with Accessible Keyboard Focus */}
      <div
        role="group"
        aria-label="Filter technologies by discipline"
        className="flex flex-wrap items-center justify-center gap-2 select-none"
      >
        {TECH_CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full font-mono text-xs transition-all duration-200 cursor-pointer",
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

      {/* Filterable Grid of Tech Cards with Smooth Layout Animation */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((tech) => (
            <motion.div
              layout
              key={tech.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="p-5 rounded-[18px] bg-gradient-to-b from-[#1e1810] to-[#17120a] border border-white/[0.07] hover:border-white/[0.14] transition-all duration-200 group flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2 min-h-[28px]">
                  <h4 className="font-heading text-lg font-bold text-[#f5f3ee] tracking-tight group-hover:text-white transition-colors line-clamp-1">
                    {tech.name}
                  </h4>
                  <span className="font-mono text-[10px] text-[#7d7566] uppercase bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06] whitespace-nowrap shrink-0">
                    {tech.category}
                  </span>
                </div>

                {tech.highlight && (
                  <p className="text-xs text-[#b7ae9c] leading-relaxed line-clamp-2 min-h-[36px] mb-4">
                    {tech.highlight}
                  </p>
                )}
              </div>

              <div className="mt-auto pt-3 border-t border-white/[0.05] flex items-center justify-between">
                <ProficiencyBar level={tech.proficiency} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
