"use client";

import React from "react";

export function DiscoveryBlueprintVisual() {
  return (
    <div className="relative w-full h-28 sm:h-32 rounded-xl bg-[#0e0b07] border border-white/[0.08] p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden select-none">
      {/* Background Blueprint Grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffd426_1px,transparent_1px)] [background-size:16px_16px]"
      />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-1.5 text-[#ffd426]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffd426] animate-ping" />
          <span>BLUEPRINT // TOPOLOGY_SCAN</span>
        </div>
        <span className="text-[#34d399] bg-[#34d399]/10 px-2 py-0.5 rounded border border-[#34d399]/20">
          PASSED (0 INVARIANT VIOLATIONS)
        </span>
      </div>

      {/* Central SVG Blueprint Graph */}
      <div className="relative z-10 my-auto flex items-center justify-center">
        <svg
          viewBox="0 0 320 90"
          className="w-full max-w-[290px] h-auto text-[#f5f3ee]"
          aria-hidden="true"
        >
          {/* Blueprint Crosshairs */}
          <line x1="20" y1="45" x2="300" y2="45" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
          <line x1="160" y1="10" x2="160" y2="80" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />

          {/* Node 1 */}
          <rect x="20" y="25" width="60" height="40" rx="6" fill="#17120a" stroke="rgba(255,212,38,0.4)" strokeWidth="1" />
          <text x="50" y="44" fill="#ffd426" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
            DOMAIN
          </text>
          <text x="50" y="55" fill="#7d7566" fontSize="7" fontFamily="sans-serif" textAnchor="middle">
            ENTITIES
          </text>

          {/* Connecting Line 1-2 with moving dot */}
          <line x1="80" y1="45" x2="130" y2="45" stroke="#ffd426" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle r="2.5" fill="#ffd426">
            <animate attributeName="cx" values="80;130" dur="2s" repeatCount="indefinite" />
            <animate attributeName="cy" values="45;45" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Center Blueprint Core Node */}
          <rect x="130" y="20" width="60" height="50" rx="8" fill="#1e1810" stroke="#ffd426" strokeWidth="1.5" />
          <circle cx="160" cy="35" r="5" fill="#ffd426" opacity="0.3" />
          <circle cx="160" cy="35" r="2.5" fill="#ffd426" />
          <text x="160" y="58" fill="#f5f3ee" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
            INVARIANT
          </text>

          {/* Connecting Line 2-3 with moving dot */}
          <line x1="190" y1="45" x2="240" y2="45" stroke="#ffd426" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle r="2.5" fill="#ff9f1c">
            <animate attributeName="cx" values="190;240" dur="2s" begin="1s" repeatCount="indefinite" />
            <animate attributeName="cy" values="45;45" dur="2s" begin="1s" repeatCount="indefinite" />
          </circle>

          {/* Node 3 */}
          <rect x="240" y="25" width="60" height="40" rx="6" fill="#17120a" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <text x="270" y="44" fill="#34d399" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
            SLA SPEC
          </text>
          <text x="270" y="55" fill="#7d7566" fontSize="7" fontFamily="sans-serif" textAnchor="middle">
            p99 &lt; 15ms
          </text>
        </svg>
      </div>

      {/* Bottom Telemetry Footer */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#7d7566] border-t border-white/[0.06] pt-2">
        <span>INTERFACE: gRPC / OpenAPI 3.1</span>
        <span>SECURITY: Zero-Trust Strict</span>
      </div>
    </div>
  );
}
