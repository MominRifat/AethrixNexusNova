"use client";

import React from "react";
import { Section } from "@/components/ui/Section";
import { TerminalConsole } from "./TerminalConsole";

export function Lab() {
  return (
    <Section
      id="lab"
      variant="bg-0"
      eyebrow="Interactive AI Lab"
      eyebrowDot={true}
      title="Describe your problem. Watch an architecture appear."
      description="Interactive terminal powered by multi-layered architectural reasoning. Describe your enterprise platform to synthesize blueprints, component topologies, and delivery schedules in real time."
      withTopDivider
      className="relative overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#ffd426]/5 blur-[120px]"
      />

      {/* Terminal UI */}
      <div className="relative z-10 mt-6">
        <TerminalConsole />
      </div>
    </Section>
  );
}
