import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#0a0805] text-[#b7ae9c] border-t border-white/[0.07] overflow-hidden">
      {/* Subtle Dotted Grid Background with Radial Mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 90% 80% at 50% 0%, black, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 0%, black, transparent 85%)",
        }}
      />

      {/* Hairline Divider at Top */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.14] to-transparent pointer-events-none"
      />

      <div className="site-container relative z-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand Blurb */}
          <div className="space-y-4">
            {/* Combined Brand Logo & Wordmark */}
            <Link
              href="/"
              className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd426] rounded-md group"
              aria-label="Aethrix Nexus Nova - Home"
            >
              <div className="relative flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/brand-logo.png"
                  alt="Aethrix Nexus Nova"
                  width={210}
                  height={89}
                  className="h-11 sm:h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,32,86,0.3)]"
                />
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-[#7d7566] max-w-sm">
              Next-generation enterprise IT firm pioneering autonomous AI systems,
              immersive spatial 3D web applications, and resilient cloud architectures.
            </p>

            <div className="pt-2">
              <span className="font-mono text-[11px] text-[#ffd426] uppercase tracking-wider bg-[#ffd426]/10 px-2.5 py-1 rounded-full border border-[#ffd426]/20 inline-block">
                Enterprise Node &middot; Production Ready
              </span>
            </div>
          </div>

          {/* Column 2: Expertise Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-[#f5f3ee] uppercase tracking-wider mb-4">
              Expertise
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#expertise"
                  className="hover:text-[#ffd426] transition-colors"
                >
                  Enterprise AI & Deep RAG
                </a>
              </li>
              <li>
                <a
                  href="#expertise"
                  className="hover:text-[#ffd426] transition-colors"
                >
                  Spatial 3D Web & WebGL
                </a>
              </li>
              <li>
                <a
                  href="#expertise"
                  className="hover:text-[#ffd426] transition-colors"
                >
                  Distributed Django Architectures
                </a>
              </li>
              <li>
                <a
                  href="#expertise"
                  className="hover:text-[#ffd426] transition-colors"
                >
                  Edge IoT & Automation Telemetry
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-[#f5f3ee] uppercase tracking-wider mb-4">
              Architecture
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#work" className="hover:text-[#ffd426] transition-colors">
                  Reference Case Studies
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#ffd426] transition-colors">
                  Engineering Protocol
                </a>
              </li>
              <li>
                <a href="#lab" className="hover:text-[#ffd426] transition-colors">
                  Interactive AI Lab
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-[#ffd426] transition-colors">
                  Scope &amp; Architecture Estimator
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Engagement */}
          {/* Note: All contact coordinates below are conceptual placeholders per PROJECT_RULES.md */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-[#f5f3ee] uppercase tracking-wider mb-4">
              Engagement Node
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="block text-xs font-mono uppercase text-[#7d7566]">
                  Client Consultation
                </span>
                <span className="text-[#f5f3ee] font-mono text-xs">
                  {/* Placeholder contact email */}
                  consult@aethrixnexus.dev
                </span>
              </div>
              <div>
                <span className="block text-xs font-mono uppercase text-[#7d7566]">
                  Global Presence
                </span>
                <span className="text-[#f5f3ee] text-xs">
                  {/* Placeholder global nodes */}
                  San Francisco, CA &middot; Dhaka Node
                </span>
              </div>
              <div>
                <span className="block text-xs font-mono uppercase text-[#7d7566]">
                  SLA Response
                </span>
                <span className="text-[#f5f3ee] text-xs">
                  Guaranteed under 24 hours
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7d7566]">
          <p>
            &copy; {currentYear} Aethrix Nexus Nova. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[11px] text-[#7d7566]">
              SOC2 &middot; HIPAA Reference Ready
            </span>
            <Link
              href="/design-system"
              className="text-[#7d7566] hover:text-[#ffd426] transition-colors font-mono"
            >
              System UI Specs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
