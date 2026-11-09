"use client";

import React from "react";

export function DeploymentVisual() {
  return (
    <div className="relative w-full h-36 sm:h-38 rounded-xl bg-[#0e0b07] border border-white/[0.08] p-3 flex flex-col justify-between overflow-hidden select-none">
      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-1.5 text-[#34d399]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#34d399] animate-pulse" />
          <span>DEPLOY_STAGE // BLUE_GREEN_CANARY</span>
        </div>
        <span className="text-[#34d399] bg-[#34d399]/10 px-2 py-0.5 rounded border border-[#34d399]/20 font-bold">
          99.99% SLA MET
        </span>
      </div>

      {/* Central Blue/Green Cluster Switcher */}
      <div className="relative z-10 my-auto flex items-center justify-around gap-2">
        {/* Blue Cluster (Previous/Standby) */}
        <div className="flex flex-col items-center p-3 rounded-xl bg-[#17120a] border border-white/[0.06] w-28 text-center opacity-60">
          <div className="flex items-center gap-1.5 mb-1 font-mono text-[10px] text-[#7d7566]">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span>CLUSTER_BLUE</span>
          </div>
          <span className="font-mono text-xs text-[#b7ae9c]">v2.4.1</span>
          <span className="font-mono text-[9px] text-[#7d7566] mt-0.5">DRAINED // IDLE</span>
        </div>

        {/* Traffic Switch Router */}
        <div className="flex flex-col items-center">
          <div className="font-mono text-[9px] text-[#ffd426] mb-1">ENVOY ROUTE</div>
          <div className="flex items-center gap-1 text-[#ffd426]">
            <span className="h-1 w-3 bg-[#ffd426] rounded-full animate-pulse" />
            <span className="font-mono text-[10px] font-bold">100%</span>
            <span className="h-1 w-3 bg-[#ffd426] rounded-full animate-pulse" />
          </div>
          <span className="font-mono text-[8px] text-[#34d399] mt-1">0 DROPPED PKTS</span>
        </div>

        {/* Green Cluster (Active/Live) */}
        <div className="flex flex-col items-center p-3 rounded-xl bg-[#1e1810] border border-[#34d399]/40 w-28 text-center shadow-[0_0_20px_rgba(52,211,153,0.15)]">
          <div className="flex items-center gap-1.5 mb-1 font-mono text-[10px] text-[#34d399]">
            <span className="h-2 w-2 rounded-full bg-[#34d399] animate-ping" />
            <span>CLUSTER_GRN</span>
          </div>
          <span className="font-mono text-xs text-[#f5f3ee] font-bold">v2.5.0</span>
          <span className="font-mono text-[9px] text-[#34d399] mt-0.5">ACTIVE CANARY</span>
        </div>
      </div>

      {/* Bottom Telemetry Footer */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#7d7566] border-t border-white/[0.06] pt-2">
        <span>FAILOVER: MULTI-REGION AUTOMATIC</span>
        <span>ROLLBACK: 0.8s INSTANT</span>
      </div>
    </div>
  );
}
