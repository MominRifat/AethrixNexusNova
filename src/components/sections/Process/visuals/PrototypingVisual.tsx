"use client";

import React from "react";

export function PrototypingVisual() {
  return (
    <div className="relative w-full h-28 sm:h-32 rounded-xl bg-[#0e0b07] border border-white/[0.08] p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden select-none">
      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-1.5 text-[#ffd426]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffd426] animate-pulse" />
          <span>SPATIAL_PROTOTYPE // 3D_VIEWPORT</span>
        </div>
        <span className="text-[#ffd426] bg-[#ffd426]/10 px-2 py-0.5 rounded border border-[#ffd426]/20">
          120 FPS LOCKED
        </span>
      </div>

      {/* Central Interactive 3D Wireframe Plane */}
      <div className="relative z-10 my-auto flex items-center justify-center">
        <div
          className="relative w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center"
          style={{ perspective: "600px" }}
        >
          {/* Rotating Outer Ring */}
          <div
            className="absolute inset-0 rounded-full border border-dashed border-[#ffd426]/40 animate-spin"
            style={{ animationDuration: "14s" }}
          />

          {/* Counter-Rotating Middle Ring */}
          <div
            className="absolute inset-2 rounded-full border border-dotted border-white/20 animate-spin"
            style={{ animationDuration: "9s", animationDirection: "reverse" }}
          />

          {/* Central 3D Tilted Wireframe Isometric Plane */}
          <div
            className="w-14 h-14 border border-[#ffd426] bg-[#ffd426]/5 rounded-lg flex items-center justify-center transition-transform duration-500 shadow-[0_0_20px_rgba(255,212,38,0.2)]"
            style={{
              transform: "rotateX(55deg) rotateZ(45deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="w-8 h-8 border border-white/30 rounded-sm" />
            <div className="absolute w-2 h-2 rounded-full bg-[#ffd426] animate-ping" />
          </div>

          {/* Coordinate Axis Marker */}
          <div className="absolute -bottom-2 -left-3 font-mono text-[9px] text-[#7d7566] flex flex-col">
            <span>X: +1.42</span>
            <span>Y: -0.89</span>
            <span>Z: +2.10</span>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Footer */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#7d7566] border-t border-white/[0.06] pt-2">
        <span>DRACO_COMPRESSION: 84% REDUCTION</span>
        <span>RLS ISOLATION: ACTIVE</span>
      </div>
    </div>
  );
}
