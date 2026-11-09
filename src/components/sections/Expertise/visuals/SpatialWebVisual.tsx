import React from "react";

export function SpatialWebVisual() {
  return (
    <div className="relative w-full h-32 flex items-center justify-center overflow-hidden rounded-[14px] bg-[#120e08]/60 border border-white/[0.05] [perspective:700px]">
      {/* 3D Rotating Wireframe Cube */}
      <div
        className="relative w-16 h-16 [transform-style:preserve-3d] animate-[spin3d_14s_linear_infinite]"
        style={{
          transformOrigin: "center center",
        }}
      >
        {/* Front Face (Accent Gold Highlight) */}
        <div
          className="absolute inset-0 border border-[#ffd426] bg-[rgba(255,212,38,0.06)] rounded-sm flex items-center justify-center [transform:translateZ(32px)]"
        >
          <div className="w-2 h-2 rounded-full bg-[#ffd426] drop-shadow-[0_0_8px_#ffd426]" />
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 border border-white/[0.12] bg-black/20 rounded-sm [transform:rotateY(180deg)_translateZ(32px)]" />

        {/* Left Face */}
        <div className="absolute inset-0 border border-white/[0.1] bg-black/10 rounded-sm [transform:rotateY(-90deg)_translateZ(32px)]" />

        {/* Right Face */}
        <div className="absolute inset-0 border border-white/[0.1] bg-black/10 rounded-sm [transform:rotateY(90deg)_translateZ(32px)]" />

        {/* Top Face */}
        <div className="absolute inset-0 border border-white/[0.14] bg-white/[0.02] rounded-sm [transform:rotateX(90deg)_translateZ(32px)]" />

        {/* Bottom Face */}
        <div className="absolute inset-0 border border-white/[0.08] bg-black/30 rounded-sm [transform:rotateX(-90deg)_translateZ(32px)]" />
      </div>

      {/* Frame Rate Indicator Label */}
      <div className="absolute bottom-2.5 right-3 font-mono text-[10px] text-[#7d7566] tracking-wider uppercase">
        60–120 FPS &middot; WebGL
      </div>
    </div>
  );
}
