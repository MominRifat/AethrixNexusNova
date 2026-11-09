import React from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "./Marquee";
import { TechRadar } from "./TechRadar";

export function Tech() {
  return (
    <Section
      id="tech"
      variant="bg-0"
      eyebrow="Tech Radar & Ecosystem"
      eyebrowDot
      title="Battle-Tested Modern Primitives"
      description="An architectural stack curated for predictable scale, sub-second latency, and verified resilience across the full compute spectrum."
      withTopDivider
    >
      {/* 1. Two-Row Infinite Technology Marquee */}
      <Reveal index={0}>
        <div className="mb-6">
          <Marquee />
        </div>
      </Reveal>

      {/* 2. Interactive Filterable Technology Radar */}
      <Reveal index={1}>
        <TechRadar />
      </Reveal>
    </Section>
  );
}
