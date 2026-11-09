"use client";

import React from "react";

export function FullStackVisual() {
  return (
    <div className="relative w-full h-28 sm:h-32 rounded-xl bg-[#0e0b07] border border-white/[0.08] p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden select-none">
      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-1.5 text-[#ffd426]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffd426] animate-pulse" />
          <span>ASYNC_ENGINEERING // RUNTIME_PIPELINE</span>
        </div>
        <span className="text-[#34d399] bg-[#34d399]/10 px-2 py-0.5 rounded border border-[#34d399]/20">
          PARALLEL OPTIMIZED
        </span>
      </div>

      {/* Central Streaming Data Lanes */}
      <div className="relative z-10 my-auto flex flex-col gap-2">
        {/* Lane 1: Rust Core */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#17120a] border border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#ffd426] font-bold w-16">
              RUST_CORE
            </span>
            <div className="relative w-32 sm:w-44 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-[#ffd426] to-transparent rounded-full animate-[shimmer_2s_infinite]"
                style={{
                  animation: "marquee 2s linear infinite",
                }}
              />
            </div>
          </div>
          <span className="font-mono text-[9px] text-[#34d399]">0.4ms IO</span>
        </div>

        {/* Lane 2: Kafka Mesh */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#17120a] border border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#ff9f1c] font-bold w-16">
              KAFKA_MESH
            </span>
            <div className="relative w-32 sm:w-44 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 w-14 bg-gradient-to-r from-transparent via-[#ff9f1c] to-transparent rounded-full"
                style={{
                  animation: "marquee 1.6s linear infinite",
                }}
              />
            </div>
          </div>
          <span className="font-mono text-[9px] text-[#b7ae9c]">140k msg/s</span>
        </div>

        {/* Lane 3: TensorRT AI */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#17120a] border border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#34d399] font-bold w-16">
              TENSOR_RT
            </span>
            <div className="relative w-32 sm:w-44 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-[#34d399] to-transparent rounded-full"
                style={{
                  animation: "marquee 2.4s linear infinite",
                }}
              />
            </div>
          </div>
          <span className="font-mono text-[9px] text-[#34d399]">FP16 INT8</span>
        </div>
      </div>

      {/* Bottom Telemetry Footer */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#7d7566] border-t border-white/[0.06] pt-2">
        <span>TEST COVERAGE: 99.4% DETERMINISTIC</span>
        <span>ZERO RACE CONDITIONS</span>
      </div>
    </div>
  );
}
