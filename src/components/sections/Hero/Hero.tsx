"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MobiusRibbon } from "@/components/three/MobiusRibbon";

function HeroStatCounter({
  target,
  suffix = "",
  duration = 1400,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frameId: number;

    if (shouldReduceMotion) {
      frameId = requestAnimationFrame(() => {
        setCount(target);
      });
      return () => cancelAnimationFrame(frameId);
    }

    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, shouldReduceMotion]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Framer motion variants with 80ms stagger
  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100dvh] lg:min-h-0 lg:h-[100dvh] lg:max-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#0a0805] pt-18 sm:pt-20 lg:pt-16 pb-6 sm:pb-8 lg:pb-6"
    >
      {/* 1. Background: Dotted Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* 2. Background: Two Blurred Amber Ambient Blobs (Confined inside Hero, scrolls away) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-[#ffd426] blur-[120px] opacity-[0.055]"
        style={{
          animation: shouldReduceMotion
            ? "none"
            : "blobSlow1 24s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-[-10%] h-[480px] w-[480px] rounded-full bg-[#ff9f1c] blur-[130px] opacity-[0.045]"
        style={{
          animation: shouldReduceMotion
            ? "none"
            : "blobSlow2 28s ease-in-out infinite",
        }}
      />

      {/* 3. Main Hero Content Grid */}
      <div className="site-container relative z-10 w-full py-2 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions (Desktop left-aligned, stacked on mobile) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left space-y-4 sm:space-y-5 lg:space-y-5"
          >
            {/* H1 Heading */}
            <motion.div variants={itemVariants}>
              <h1 className="font-heading font-bold text-[#f5f3ee] tracking-tight leading-[1.1] text-balance text-[clamp(32px,3.8vw,56px)]">
                Engineering{" "}
                <span className="bg-gradient-to-r from-[#ffd426] to-[#ff9f1c] bg-clip-text text-transparent">
                  Intelligent Realities
                </span>{" "}
                for the Enterprise Era.
              </h1>
            </motion.div>

            {/* Sub-text */}
            <motion.div variants={itemVariants}>
              <p className="font-sans text-sm sm:text-base lg:text-lg text-[#b7ae9c] leading-[1.6] max-w-2xl">
                Pioneering Autonomous AI Systems, Immersive 3D Web &amp; Resilient Enterprise Architectures.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row sm:items-center gap-3.5 pt-1 w-full sm:w-auto"
            >
              <MagneticButton
                variant="primary"
                size="lg"
                href="#estimator"
                className="w-full sm:w-auto justify-center text-center"
              >
                Launch Project Discovery
              </MagneticButton>

              <Button
                variant="ghost"
                size="lg"
                href="#lab"
                className="w-full sm:w-auto justify-center text-center"
              >
                Explore Interactive Lab
              </Button>
            </motion.div>

            {/* Trust Stats Row: Experience, Projects Completed & Engaged Clients */}
            <motion.div
              variants={itemVariants}
              className="pt-3.5 sm:pt-4 border-t border-white/[0.07] w-full"
            >
              <div className="grid grid-cols-3 gap-3 sm:gap-6">
                {/* 1. 2+ Years Experience */}
                <div>
                  <span className="block font-mono text-[9.5px] sm:text-[11px] text-[#7d7566] uppercase tracking-wider truncate">
                    Experience
                  </span>
                  <div className="font-heading text-lg sm:text-2xl font-bold text-[#ffd426] flex items-baseline">
                    <HeroStatCounter target={2} suffix="+" duration={900} />
                    <span className="text-xs sm:text-sm font-normal text-[#f5f3ee] ml-1 font-sans">
                      Years
                    </span>
                  </div>
                  <span className="block font-mono text-[10px] text-[#b7ae9c] truncate hidden sm:block">
                    2+ Years Experience
                  </span>
                </div>

                {/* 2. Number of Projects Completed */}
                <div>
                  <span className="block font-mono text-[9.5px] sm:text-[11px] text-[#7d7566] uppercase tracking-wider truncate">
                    Deliverables
                  </span>
                  <div className="font-heading text-lg sm:text-2xl font-bold text-[#ffd426] flex items-baseline">
                    <HeroStatCounter target={15} suffix="+" duration={1400} />
                  </div>
                  <span className="block font-mono text-[10px] text-[#b7ae9c] truncate">
                    Projects Completed
                  </span>
                </div>

                {/* 3. Engaged Clients */}
                <div>
                  <span className="block font-mono text-[9.5px] sm:text-[11px] text-[#7d7566] uppercase tracking-wider truncate">
                    Partnerships
                  </span>
                  <div className="font-heading text-lg sm:text-2xl font-bold text-[#ffd426] flex items-baseline">
                    <HeroStatCounter target={10} suffix="+" duration={1200} />
                  </div>
                  <span className="block font-mono text-[10px] text-[#b7ae9c] truncate">
                    Engaged Clients
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Mobius Ribbon Canvas (Desktop right, stacked decorative on mobile) */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full mt-2 lg:mt-0">
            <MobiusRibbon isInView={isInView} />
          </div>
        </div>
      </div>
    </section>
  );
}
