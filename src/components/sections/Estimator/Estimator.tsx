"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  ShoppingBag,
  LayoutDashboard,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import {
  PROJECT_TYPES,
  SCALE_TIERS,
  TIMELINE_OPTIONS,
  BUDGET_BANDS,
  TYPICAL_DELIVERABLES,
} from "@/lib/estimator-config";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { prefillContactForm } from "@/lib/contact-prefill";
import { cn } from "@/lib/utils";

export function Estimator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0].id);
  const [selectedScale, setSelectedScale] = useState(SCALE_TIERS[1].id);
  const [selectedTimeline, setSelectedTimeline] = useState(TIMELINE_OPTIONS[1].id);
  const [selectedBudget, setSelectedBudget] = useState(BUDGET_BANDS[1].id);

  const totalSteps = 4;
  const progressRatio = currentStep / totalSteps;

  const currentTypeObj = PROJECT_TYPES.find((t) => t.id === selectedType) || PROJECT_TYPES[0];
  const currentScaleObj = SCALE_TIERS.find((s) => s.id === selectedScale) || SCALE_TIERS[1];
  const currentTimelineObj =
    TIMELINE_OPTIONS.find((t) => t.id === selectedTimeline) || TIMELINE_OPTIONS[1];
  const currentBudgetObj =
    BUDGET_BANDS.find((b) => b.id === selectedBudget) || BUDGET_BANDS[1];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedType(PROJECT_TYPES[0].id);
    setSelectedScale(SCALE_TIERS[1].id);
    setSelectedTimeline(TIMELINE_OPTIONS[1].id);
    setSelectedBudget(BUDGET_BANDS[1].id);
  };

  const handleBookConsultation = () => {
    prefillContactForm({
      scopeText: `[Discovery Scope Configuration]\nType: ${currentTypeObj.title}\nScale: ${currentScaleObj.title}\nTarget Timeline: ${currentTimelineObj.title}\nEstimated Budget: ${currentBudgetObj.range}`,
      budgetBand: currentBudgetObj.id,
      source: "estimator",
    });
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case "Globe":
        return <Globe className="h-6 w-6 text-[#ffd426]" />;
      case "ShoppingBag":
        return <ShoppingBag className="h-6 w-6 text-[#ffd426]" />;
      case "LayoutDashboard":
        return <LayoutDashboard className="h-6 w-6 text-[#ffd426]" />;
      case "Sparkles":
        return <Sparkles className="h-6 w-6 text-[#ffd426]" />;
      default:
        return <Globe className="h-6 w-6 text-[#ffd426]" />;
    }
  };

  return (
    <Section
      id="estimator"
      variant="bg-1"
      eyebrow="Discovery Configurator"
      title="Project Scope & Architecture Estimator"
      description="Calibrate system discipline, target scale, and production timelines to synthesize an indicative architecture benchmark."
      withTopDivider
      className="relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        <Card className="p-0 border border-white/[0.12] bg-[#140f09] rounded-3xl overflow-hidden shadow-2xl">
          {/* Top Progress Tracker */}
          <div className="relative w-full bg-[#1e1810] border-b border-white/[0.08] px-6 sm:px-8 py-4 flex items-center justify-between">
            {/* scaleX Progress Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/[0.06]">
              <div
                className="h-full bg-gradient-to-r from-[#ffd426] to-[#ff9f1c] origin-left transition-transform duration-300 ease-out"
                style={{ transform: `scaleX(${progressRatio})` }}
              />
            </div>

            <div className="flex items-center gap-3">
              <Badge className="bg-[#ffd426]/10 text-[#ffd426] border-[#ffd426]/30">
                Step {currentStep} of {totalSteps}
              </Badge>
              <span className="font-heading text-sm font-bold text-[#f5f3ee] hidden sm:inline">
                {currentStep === 1 && "Select Project Category"}
                {currentStep === 2 && "Define Scale & Feature Tier"}
                {currentStep === 3 && "Timeline & Budget Horizon"}
                {currentStep === 4 && "Architecture Scope Review"}
              </span>
            </div>

            <span className="font-mono text-xs text-[#7d7566]">
              {Math.round(progressRatio * 100)}% Configured
            </span>
          </div>

          {/* Configurator Step Body */}
          <div className="p-6 sm:p-8 min-h-[380px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {/* STEP 1: Project Type */}
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#f5f3ee]">
                      What type of website or platform are you looking to build?
                    </h3>
                    <p className="mt-1 text-sm text-[#b7ae9c]">
                      Choose the category that best matches your project scope and business goals.
                    </p>
                  </div>

                  <div
                    role="radiogroup"
                    aria-label="Select Project Type"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2"
                  >
                    {PROJECT_TYPES.map((type) => {
                      const isSelected = selectedType === type.id;
                      return (
                        <div
                          key={type.id}
                          role="radio"
                          aria-checked={isSelected}
                          tabIndex={0}
                          onClick={() => setSelectedType(type.id)}
                          onKeyDown={(e) => {
                            if (e.key === " " || e.key === "Enter") {
                              e.preventDefault();
                              setSelectedType(type.id);
                            }
                          }}
                          className={cn(
                            "p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-200 select-none flex flex-col justify-between",
                            isSelected
                              ? "bg-gradient-to-b from-[#1e1810] to-[#17120a] border-[#ffd426] shadow-[0_0_20px_rgba(255,212,38,0.15)] ring-1 ring-[#ffd426]"
                              : "bg-[#120e08] border-white/[0.08] hover:border-white/[0.2] hover:bg-[#17120a]"
                          )}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                                {renderIcon(type.iconName)}
                              </div>
                              {isSelected && (
                                <span className="h-2 w-2 rounded-full bg-[#ffd426] shadow-[0_0_8px_#ffd426]" />
                              )}
                            </div>
                            <h4 className="font-heading text-base font-bold text-[#f5f3ee]">
                              {type.title}
                            </h4>
                            <p className="mt-1.5 text-xs text-[#b7ae9c] leading-relaxed">
                              {type.tagline}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                            <span className="text-[#7d7566]">Indicative Base:</span>
                            <span className="text-[#ffd426] font-semibold">{type.baseRange}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Concurrency & Scale */}
              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#f5f3ee]">
                      What scale and feature tier do you require?
                    </h3>
                    <p className="mt-1 text-sm text-[#b7ae9c]">
                      System architecture and technical depth adjust based on feature complexity and traffic needs.
                    </p>
                  </div>

                  <div
                    role="radiogroup"
                    aria-label="Select System Scale"
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2"
                  >
                    {SCALE_TIERS.map((tier) => {
                      const isSelected = selectedScale === tier.id;
                      return (
                        <div
                          key={tier.id}
                          role="radio"
                          aria-checked={isSelected}
                          tabIndex={0}
                          onClick={() => setSelectedScale(tier.id)}
                          onKeyDown={(e) => {
                            if (e.key === " " || e.key === "Enter") {
                              e.preventDefault();
                              setSelectedScale(tier.id);
                            }
                          }}
                          className={cn(
                            "p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-200 select-none flex flex-col justify-between",
                            isSelected
                              ? "bg-gradient-to-b from-[#1e1810] to-[#17120a] border-[#ffd426] shadow-[0_0_20px_rgba(255,212,38,0.15)] ring-1 ring-[#ffd426]"
                              : "bg-[#120e08] border-white/[0.08] hover:border-white/[0.2] hover:bg-[#17120a]"
                          )}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-white/[0.06] text-[#b7ae9c]">
                                {tier.badge}
                              </span>
                              {isSelected && (
                                <span className="h-2 w-2 rounded-full bg-[#ffd426] shadow-[0_0_8px_#ffd426]" />
                              )}
                            </div>
                            <h4 className="font-heading text-base font-bold text-[#f5f3ee]">
                              {tier.title}
                            </h4>
                            <p className="mt-2 text-xs text-[#b7ae9c] leading-relaxed">
                              {tier.description}
                            </p>
                          </div>

                          <div className="mt-5 pt-3 border-t border-white/[0.06] font-mono text-[11px] text-[#7d7566] flex items-center justify-between">
                            <span>SLA Target:</span>
                            <span className="text-[#34d399]">
                              {tier.id === "enterprise"
                                ? "99.99% Multi-Region"
                                : tier.id === "growth"
                                ? "99.9% Production"
                                : "99.0% Staging"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Timeline & Budget Band */}
              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="space-y-6"
                >
                  {/* Timeline Selection */}
                  <div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#f5f3ee]">
                      Delivery Timeline & Investment Range
                    </h3>
                    <p className="mt-1 text-sm text-[#b7ae9c]">
                      Select your target deployment horizon and indicative investment bracket.
                    </p>

                    <div className="mt-4">
                      <span className="font-mono text-xs text-[#ffd426] uppercase font-semibold block mb-2">
                        Target Time Horizon
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {TIMELINE_OPTIONS.map((time) => {
                          const isSelected = selectedTimeline === time.id;
                          return (
                            <button
                              key={time.id}
                              onClick={() => setSelectedTimeline(time.id)}
                              className={cn(
                                "p-3 rounded-xl border text-left transition-all duration-200 select-none",
                                isSelected
                                  ? "bg-[#1e1810] border-[#ffd426] text-[#ffd426]"
                                  : "bg-[#120e08] border-white/[0.08] text-[#b7ae9c] hover:border-white/20 hover:text-[#f5f3ee]"
                              )}
                            >
                              <div className="font-mono text-xs font-bold">{time.title}</div>
                              <div className="text-[10px] text-[#7d7566] mt-0.5 truncate">
                                {time.tagline}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Budget Bands */}
                  <div>
                    <span className="font-mono text-xs text-[#ffd426] uppercase font-semibold block mb-2">
                      Indicative Budget Band (Configurable)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {BUDGET_BANDS.map((band) => {
                        const isSelected = selectedBudget === band.id;
                        return (
                          <div
                            key={band.id}
                            onClick={() => setSelectedBudget(band.id)}
                            className={cn(
                              "p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between",
                              isSelected
                                ? "bg-[#1e1810] border-[#ffd426] shadow-[0_0_15px_rgba(255,212,38,0.15)] ring-1 ring-[#ffd426]"
                                : "bg-[#120e08] border-white/[0.08] hover:border-white/20"
                            )}
                          >
                            <div>
                              <div className="font-heading text-sm font-bold text-[#f5f3ee]">
                                {band.range}
                              </div>
                              <div className="text-[11px] text-[#b7ae9c] mt-0.5">
                                {band.description}
                              </div>
                            </div>
                            {isSelected && (
                              <CheckCircle2 className="h-4 w-4 text-[#ffd426] shrink-0 ml-2" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Scope Summary & Benchmark */}
              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.08]">
                    <div>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#f5f3ee]">
                        Architecture Scope & Benchmark
                      </h3>
                      <p className="mt-0.5 text-xs text-[#b7ae9c]">
                        Summary computed from configured technical parameters.
                      </p>
                    </div>
                    <Badge className="bg-[#34d399]/10 text-[#34d399] border-[#34d399]/30 self-start sm:self-auto">
                      Ready for Discovery
                    </Badge>
                  </div>

                  {/* Selections Overview Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="p-3 rounded-xl bg-[#120e08] border border-white/[0.06]">
                      <span className="font-mono text-[10px] text-[#7d7566] uppercase block">
                        Category
                      </span>
                      <span className="font-heading text-xs font-bold text-[#f5f3ee] mt-1 block truncate">
                        {currentTypeObj.title}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#120e08] border border-white/[0.06]">
                      <span className="font-mono text-[10px] text-[#7d7566] uppercase block">
                        Scale Tier
                      </span>
                      <span className="font-heading text-xs font-bold text-[#f5f3ee] mt-1 block truncate">
                        {currentScaleObj.title}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#120e08] border border-white/[0.06]">
                      <span className="font-mono text-[10px] text-[#7d7566] uppercase block">
                        Timeline
                      </span>
                      <span className="font-heading text-xs font-bold text-[#ffd426] mt-1 block truncate">
                        {currentTimelineObj.title}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#120e08] border border-white/[0.06]">
                      <span className="font-mono text-[10px] text-[#7d7566] uppercase block">
                        Indicative Range
                      </span>
                      <span className="font-heading text-xs font-bold text-[#34d399] mt-1 block truncate">
                        {currentBudgetObj.range}
                      </span>
                    </div>
                  </div>

                  {/* What's Typically Included */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#120e08] border border-white/[0.06]">
                    <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[#ffd426]">
                      <ShieldCheck className="h-4 w-4" />
                      <span className="font-semibold uppercase tracking-wider">
                        Standard Project Deliverables
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#b7ae9c]">
                      {TYPICAL_DELIVERABLES.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#34d399] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Indicative Disclaimer */}
                  <div className="text-[11px] font-mono text-[#7d7566] pt-1">
                    * <span className="text-[#b7ae9c]">Disclaimer:</span> Indicative range, final scope confirmed after formal discovery session.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Navigation Buttons */}
            <div className="mt-8 pt-5 border-t border-white/[0.08] flex items-center justify-between gap-4">
              {currentStep > 1 && currentStep < totalSteps ? (
                <Button variant="ghost" size="sm" onClick={handleBack} className="gap-1.5">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              ) : currentStep === totalSteps ? (
                <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1.5">
                  <RotateCcw className="h-4 w-4" />
                  Start over
                </Button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-3">
                {currentStep < totalSteps ? (
                  <Button variant="primary" size="md" onClick={handleNext} className="gap-1.5">
                    Next Step
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleBookConsultation}
                    className="gap-2"
                  >
                    Book a Consultation
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
