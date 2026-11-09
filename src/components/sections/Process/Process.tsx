"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { DiscoveryBlueprintVisual } from "./visuals/DiscoveryBlueprintVisual";
import { PrototypingVisual } from "./visuals/PrototypingVisual";
import { FullStackVisual } from "./visuals/FullStackVisual";
import { DeploymentVisual } from "./visuals/DeploymentVisual";

export interface ProcessPhase {
  id: string;
  stepNumber: string;
  fullTitle: string;
  shortTitle: string;
  subtitle: string;
  deliverables: {
    name: string;
    description: string;
  }[];
  visual: React.ReactNode;
}

const PHASES: ProcessPhase[] = [
  {
    id: "discovery",
    stepNumber: "01",
    fullTitle: "01 Deep Discovery & Algorithmic Blueprinting",
    shortTitle: "Deep Discovery & Algorithmic Blueprinting",
    subtitle: "Mathematical modeling of core data invariants, state transitions, and concurrency limits.",
    deliverables: [
      {
        name: "Mathematical & Topological Domain Mapping",
        description: "Formal specification of data invariants, state transitions, and asynchronous concurrency boundaries.",
      },
      {
        name: "Latency & Throughput Budget Specifications",
        description: "Explicit SLA benchmarks for p95/p99 latency budgets, memory footprints, and network ingestion limits.",
      },
      {
        name: "System Boundary & API Contract Blueprints",
        description: "Standardized OpenAPI 3.1 & gRPC interface contracts with zero-trust perimeter threat modeling.",
      },
    ],
    visual: <DiscoveryBlueprintVisual />,
  },
  {
    id: "prototyping",
    stepNumber: "02",
    fullTitle: "02 Resilient Architecture & 3D Interactive Prototyping",
    shortTitle: "Resilient Architecture & 3D Interactive Prototyping",
    subtitle: "High-concurrency distributed topologies and hardware-accelerated 3D viewport validation.",
    deliverables: [
      {
        name: "Distributed Consensus & Partitioning Schemas",
        description: "Custom database sharding, leaderless replication configurations, and multi-region failover trees.",
      },
      {
        name: "Spatial Viewport & 3D WebGL Prototyping",
        description: "60-120 FPS interactive Three.js viewport testing, shader memory profiling, and Draco mesh compression.",
      },
      {
        name: "Data Isolation & RBAC Security Verification",
        description: "Row-level database security rules, cryptographic tenant keys, and zero-trust identity gateways.",
      },
    ],
    visual: <PrototypingVisual />,
  },
  {
    id: "engineering",
    stepNumber: "03",
    fullTitle: "03 Full-Stack Engineering & AI Optimization",
    shortTitle: "Full-Stack Engineering & AI Optimization",
    subtitle: "Low-latency runtime implementation with hardware-quantized neural model acceleration.",
    deliverables: [
      {
        name: "High-Performance Asynchronous Runtime",
        description: "Rust/Go core daemons, Next.js 16 edge handlers, and Kafka event streaming channels.",
      },
      {
        name: "Neural Model Quantization & Vector Acceleration",
        description: "TensorRT and WebAssembly engine deployment with local pgvector similarity indexing.",
      },
      {
        name: "Automated Invariant & End-to-End Test Harness",
        description: "Deterministic simulation testing for network partitions, edge cases, and high burst traffic.",
      },
    ],
    visual: <FullStackVisual />,
  },
  {
    id: "deployment",
    stepNumber: "04",
    fullTitle: "04 Zero-Downtime Deployment & Enterprise SLA",
    shortTitle: "Zero-Downtime Deployment & Enterprise SLA",
    subtitle: "Blue/Green continuous rollout, multi-region ingress, and 24/7 observability protocols.",
    deliverables: [
      {
        name: "Blue/Green Rollout with Automated Canary Analysis",
        description: "Gradual traffic routing via Envoy/Cloudflare with instant automated rollback on latency degradation.",
      },
      {
        name: "Multi-Region Active-Passive & Edge CDN Redundancy",
        description: "Global ingress distribution with sub-15ms edge routing and distributed failover trees.",
      },
      {
        name: "Real-Time OpenTelemetry Observability & SLA Protocol",
        description: "Distributed tracing, Prometheus metrics dashboards, and guaranteed 99.99% uptime availability.",
      },
    ],
    visual: <DeploymentVisual />,
  },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [activeMobileStep, setActiveMobileStep] = useState(0);

  // Desktop Framer Motion useScroll tracks container progress (0 -> 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Mobile Framer Motion useScroll tracks mobile container progress (0 -> 1)
  const { scrollYProgress: mobileScrollYProgress } = useScroll({
    target: mobileContainerRef,
    offset: ["start start", "end end"],
  });

  // Native scroll progress event listener for desktop
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = Math.min(Math.floor(latest * PHASES.length), PHASES.length - 1);
    if (step !== activeStep) {
      setActiveStep(step);
    }
  });

  // Native scroll progress event listener for mobile
  useMotionValueEvent(mobileScrollYProgress, "change", (latest) => {
    const step = Math.min(Math.floor(latest * PHASES.length), PHASES.length - 1);
    if (step !== activeMobileStep) {
      setActiveMobileStep(step);
    }
  });

  const handleStepClick = (index: number) => {
    if (!containerRef.current) return;
    const { top, height } = containerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const targetY = scrollY + top + (height / PHASES.length) * index;

    if (typeof window !== "undefined" && window.__lenisInstance) {
      window.__lenisInstance.scrollTo(targetY, { duration: 0.8 });
    } else {
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });
    }
  };

  const handleMobileStepClick = (index: number) => {
    if (!mobileContainerRef.current) return;
    const { top, height } = mobileContainerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const targetY = scrollY + top + (height / PHASES.length) * index + 10;

    if (typeof window !== "undefined" && window.__lenisInstance) {
      window.__lenisInstance.scrollTo(targetY, { duration: 0.8 });
    } else {
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });
    }
  };

  const activePhase = PHASES[activeStep];
  const activeMobilePhase = PHASES[activeMobileStep];

  return (
    <Section
      id="process"
      variant="bg-1"
      eyebrow="How We Build"
      title="The 4-Step Engineering Protocol."
      description="A disciplined, four-stage lifecycle designed to eliminate architectural debt and deliver deterministic enterprise resilience."
      withTopDivider
      className="relative"
    >
      {/* 1. DESKTOP STICKY-SCROLL WORKFLOW (Native scrolling, no scroll-jacking) */}
      <div
        ref={containerRef}
        className="hidden md:block relative h-[280vh] -mt-6"
      >
        <div className="sticky top-24 lg:top-28 h-[calc(100vh-120px)] flex items-center">
          <div className="w-full grid grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Vertical Timeline & Phase Navigation */}
            <div className="col-span-5 flex flex-col justify-center">
              <div className="mb-4">
                <Badge withDot className="bg-[#ffd426]/10 text-[#ffd426] border-[#ffd426]/30">
                  Execution Protocol // Phase {activePhase.stepNumber}
                </Badge>
              </div>

              <div className="relative pl-8 space-y-6">
                {/* Vertical Base Line */}
                <div
                  aria-hidden="true"
                  className="absolute left-2.5 top-3 bottom-3 w-[2px] bg-white/[0.08]"
                />

                {/* Animated Filling Progress Line */}
                <motion.div
                  aria-hidden="true"
                  className="absolute left-2.5 top-3 w-[2px] bg-gradient-to-b from-[#ffd426] to-[#ff9f1c] origin-top"
                  style={{
                    scaleY: scrollYProgress,
                    bottom: 12,
                  }}
                />

                {/* Phase Selectors */}
                {PHASES.map((phase, idx) => {
                  const isActive = activeStep === idx;
                  const isPassed = activeStep > idx;

                  return (
                    <button
                      key={phase.id}
                      onClick={() => handleStepClick(idx)}
                      className={cn(
                        "group relative flex items-start gap-4 text-left transition-all duration-300 w-full focus:outline-none cursor-pointer",
                        isActive ? "scale-[1.02]" : "opacity-60 hover:opacity-90"
                      )}
                    >
                      {/* Node Bullet */}
                      <div
                        className={cn(
                          "relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 -ml-8 bg-[#120e08]",
                          isActive
                            ? "border-[#ffd426] shadow-[0_0_12px_rgba(255,212,38,0.5)]"
                            : isPassed
                            ? "border-[#ffd426]/60 text-[#ffd426]"
                            : "border-white/20 text-[#7d7566]"
                        )}
                      >
                        <span
                          className={cn(
                            "h-2 w-2 rounded-full transition-all duration-300",
                            isActive
                              ? "bg-[#ffd426] scale-125"
                              : isPassed
                              ? "bg-[#ffd426]/70"
                              : "bg-white/20"
                          )}
                        />
                      </div>

                      {/* Phase Label */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "font-mono text-xs uppercase tracking-wider font-semibold transition-colors duration-200",
                              isActive ? "text-[#ffd426]" : "text-[#7d7566]"
                            )}
                          >
                            Phase {phase.stepNumber}
                          </span>
                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[#ffd426] animate-ping" />
                          )}
                        </div>
                        <h3
                          className={cn(
                            "font-heading text-lg lg:text-xl font-bold tracking-tight transition-colors duration-200 mt-0.5",
                            isActive ? "text-[#f5f3ee]" : "text-[#b7ae9c] group-hover:text-[#f5f3ee]"
                          )}
                        >
                          {phase.shortTitle}
                        </h3>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Scroll instruction indicator */}
              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-mono text-[#7d7566]">
                <ArrowRight className="h-3.5 w-3.5 text-[#ffd426] animate-pulse" />
                <span>Scroll down to advance protocol phases</span>
              </div>
            </div>

            {/* Right Column: Dynamic Content Panel & SVG Mini-Visual */}
            <div className="col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhase.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="rounded-2xl lg:rounded-3xl bg-gradient-to-b from-[#1e1810] to-[#17120a] border border-white/[0.09] p-5 sm:p-6 lg:p-6 shadow-2xl relative overflow-hidden"
                >
                  {/* Subtle Top-Right Ambient Glow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#ffd426]/10 blur-3xl"
                  />

                  {/* Phase Full Title */}
                  <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-white/[0.08]">
                    <h3 className="font-heading text-lg lg:text-xl font-bold tracking-tight text-[#f5f3ee]">
                      {activePhase.fullTitle}
                    </h3>
                    <span className="font-mono text-[11px] text-[#ffd426] px-2 py-0.5 rounded bg-[#ffd426]/10 border border-[#ffd426]/20 shrink-0">
                      PHASE {activePhase.stepNumber} OF 04
                    </span>
                  </div>

                  <p className="mt-2 text-xs sm:text-[13px] text-[#b7ae9c] leading-relaxed">
                    {activePhase.subtitle}
                  </p>

                  {/* SVG / CSS Mini-Visual */}
                  <div className="mt-3.5">
                    {activePhase.visual}
                  </div>

                  {/* 3 Bullet Deliverables */}
                  <div className="mt-3.5 pt-3 border-t border-white/[0.08] space-y-2">
                    <span className="font-mono text-[10.5px] uppercase tracking-wider text-[#ffd426] font-semibold block">
                      Target Deliverables &amp; Artefacts
                    </span>
                    {activePhase.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#ffd426] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs sm:text-[13px] font-semibold text-[#f5f3ee]">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-[#b7ae9c] leading-snug mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MOBILE INTERACTIVE STICKY-SCROLL WORKFLOW (< md) */}
      <div
        ref={mobileContainerRef}
        className="block md:hidden relative h-[240vh] mt-2"
      >
        <div className="sticky top-20 min-h-[calc(100dvh-88px)] flex flex-col justify-center max-w-md mx-auto">
          {/* Top Phase Stepper Node Bar */}
          <div className="w-full mb-3 px-1">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-[#ffd426] font-bold tracking-wider uppercase">
                Phase {activeMobilePhase.stepNumber} &bull; Protocol
              </span>
              <span className="font-mono text-[11px] text-[#7d7566]">
                {activeMobileStep + 1} of {PHASES.length}
              </span>
            </div>

            {/* 4 Connected Nodes with Animated Fill Bar */}
            <div className="relative flex items-center justify-between">
              {/* Background line */}
              <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-[2px] bg-white/[0.08]" />

              {/* Animated Progress line */}
              <div
                className="absolute left-3 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#ffd426] to-[#ff9f1c] transition-all duration-300 ease-out"
                style={{
                  width: `calc(${((activeMobileStep) / (PHASES.length - 1)) * 100}% - 8px)`,
                }}
              />

              {PHASES.map((phase, idx) => {
                const isActive = activeMobileStep === idx;
                const isPassed = activeMobileStep > idx;
                return (
                  <button
                    key={phase.id}
                    type="button"
                    onClick={() => handleMobileStepClick(idx)}
                    className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-[#120e08] border transition-all duration-300 cursor-pointer"
                    style={{
                      borderColor: isActive ? "#ffd426" : isPassed ? "rgba(255,212,38,0.6)" : "rgba(255,255,255,0.15)",
                      boxShadow: isActive ? "0 0 10px rgba(255,212,38,0.5)" : "none",
                    }}
                  >
                    <span
                      className={cn(
                        "font-mono text-[10px] font-bold transition-colors",
                        isActive ? "text-[#ffd426]" : isPassed ? "text-[#ffd426]/70" : "text-[#7d7566]"
                      )}
                    >
                      {phase.stepNumber}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Card for Active Step */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMobilePhase.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="rounded-2xl bg-gradient-to-b from-[#1e1810] to-[#17120a] border border-white/[0.09] p-4 shadow-2xl relative overflow-hidden"
            >
              {/* Subtle Ambient Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full bg-[#ffd426]/10 blur-2xl"
              />

              {/* Phase Full Title */}
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/[0.08]">
                <h3 className="font-heading text-base font-bold tracking-tight text-[#f5f3ee] line-clamp-1">
                  {activeMobilePhase.fullTitle}
                </h3>
                <span className="font-mono text-[10px] text-[#ffd426] px-2 py-0.5 rounded bg-[#ffd426]/10 border border-[#ffd426]/20 shrink-0">
                  PHASE {activeMobilePhase.stepNumber} OF 04
                </span>
              </div>

              <p className="mt-1.5 text-xs text-[#b7ae9c] leading-relaxed line-clamp-2">
                {activeMobilePhase.subtitle}
              </p>

              {/* SVG Mini-Visual */}
              <div className="mt-2.5">
                {activeMobilePhase.visual}
              </div>

              {/* Target Deliverables */}
              <div className="mt-2.5 pt-2 border-t border-white/[0.08] space-y-1.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#ffd426] font-semibold block">
                  Target Deliverables
                </span>
                {activeMobilePhase.deliverables.slice(0, 2).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#ffd426] shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-[#f5f3ee] truncate">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-[#b7ae9c] leading-tight line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile Scroll Hint */}
          <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[11px] font-mono text-[#7d7566]">
            <ArrowRight className="h-3 w-3 text-[#ffd426] rotate-90 animate-bounce" />
            <span>Scroll down to advance phase ({activeMobileStep + 1}/4)</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
