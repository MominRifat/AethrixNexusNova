"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Clock, Cpu, Layers, Sparkles } from "lucide-react";
import { ArchitecturePlan } from "@/lib/architect/types";
import { Button } from "@/components/ui/Button";
import { DynamicArchitectureDiagram } from "./DynamicArchitectureDiagram";
import { prefillContactForm } from "@/lib/contact-prefill";

interface ArchitectureOutputProps {
  plan: ArchitecturePlan;
  provider: "live" | "demo";
}

export function ArchitectureOutput({ plan, provider }: ArchitectureOutputProps) {
  const [visibleStage, setVisibleStage] = useState(1);

  // Staged reveal simulating progressive architectural synthesis
  useEffect(() => {
    // If user prefers reduced motion, render all stages immediately
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const frame = requestAnimationFrame(() => setVisibleStage(5));
      return () => cancelAnimationFrame(frame);
    }

    const t1 = setTimeout(() => setVisibleStage(2), 250);
    const t2 = setTimeout(() => setVisibleStage(3), 500);
    const t3 = setTimeout(() => setVisibleStage(4), 750);
    const t4 = setTimeout(() => setVisibleStage(5), 1000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [plan]);

  const handleDiscussWithEngineers = () => {
    prefillContactForm({
      scopeText: `[AI Blueprint Discovery]\nSummary: ${plan.summary}\nTarget Stack: ${plan.stack.slice(0, 5).join(", ")}\nTimeline: ${plan.milestones[plan.milestones.length - 1]?.weeks || "Phased"}`,
      budgetBand: "band-3",
      source: "lab",
    });
  };

  return (
    <div
      aria-live="polite"
      className="mt-8 space-y-6 pt-6 border-t border-white/[0.08]"
    >
      {/* Stage 1: Executive Summary */}
      <div className="rounded-2xl bg-[#120e08] border border-white/[0.08] p-5 sm:p-6 transition-opacity duration-300">
        <div className="flex items-center justify-between mb-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#ffd426]">
            <Sparkles className="h-4 w-4" />
            <span className="font-semibold uppercase tracking-wider">
              Stage 01 // Executive Architectural Specification
            </span>
          </div>
          <span className="text-[10px] text-[#7d7566] uppercase">
            Provider: {provider === "live" ? "Gemini 2.0 API" : "Deterministic Engine"}
          </span>
        </div>
        <p className="text-sm sm:text-base text-[#f5f3ee] leading-relaxed font-sans">
          {plan.summary}
        </p>
      </div>

      {/* Stage 2: Inline SVG Dynamic Architecture Diagram */}
      {visibleStage >= 2 && (
        <div className="transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
          <DynamicArchitectureDiagram layers={plan.layers} />
        </div>
      )}

      {/* Stage 3: Recommended Production Tech Stack */}
      {visibleStage >= 3 && (
        <div className="rounded-2xl bg-[#120e08] border border-white/[0.08] p-5 sm:p-6 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[#ffd426]">
            <Cpu className="h-4 w-4" />
            <span className="font-semibold uppercase tracking-wider">
              Stage 03 // Recommended Production Technology Stack
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {plan.stack.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] font-mono text-xs text-[#f5f3ee] hover:border-[#ffd426]/40 transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stage 4: Milestone Delivery Timeline */}
      {visibleStage >= 4 && (
        <div className="rounded-2xl bg-[#120e08] border border-white/[0.08] p-5 sm:p-6 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[#ffd426]">
            <Clock className="h-4 w-4" />
            <span className="font-semibold uppercase tracking-wider">
              Stage 04 // Phased Delivery Milestones
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {plan.milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#17120a] border border-white/[0.06] flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-[10px] text-[#ffd426] uppercase font-bold">
                    M{idx + 1}
                  </span>
                  <span className="font-mono text-[10px] text-[#34d399] bg-[#34d399]/10 px-2 py-0.5 rounded border border-[#34d399]/20">
                    {m.weeks}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-[#f5f3ee] leading-snug">
                  {m.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stage 5: Architectural Assumptions, Disclaimer & Closing Action */}
      {visibleStage >= 5 && (
        <div className="rounded-2xl bg-[#17120a] border border-white/[0.08] p-5 sm:p-6 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
          {/* Assumptions */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#b7ae9c]">
              <Layers className="h-4 w-4 text-[#ffd426]" />
              <span className="uppercase tracking-wider font-semibold">
                Architectural Assumptions & Boundary Conditions
              </span>
            </div>
            <ul className="space-y-1.5 pl-1">
              {plan.assumptions.map((assumption, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[#b7ae9c]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#34d399] shrink-0 mt-0.5" />
                  <span>{assumption}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Engineering Disclaimer */}
          <div className="pt-3 border-t border-white/[0.06] text-[11px] font-mono text-[#7d7566]">
            ⚠️ <span className="text-[#b7ae9c]">Disclaimer:</span> AI-generated starting point, not a final estimate. Production scoping requires formal security & latency audit.
          </div>

          {/* Closing CTA */}
          <div className="mt-5 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono text-[#b7ae9c] text-center sm:text-left">
              Ready to convert this blueprint into production software?
            </span>
            <Button
              variant="primary"
              size="md"
              onClick={handleDiscussWithEngineers}
              className="w-full sm:w-auto gap-2"
            >
              Discuss this with our engineers
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
