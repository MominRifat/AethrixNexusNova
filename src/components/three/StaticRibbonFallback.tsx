import React from "react";

export function StaticRibbonFallback() {
  return (
    <div className="relative flex items-center justify-center w-full h-[360px] sm:h-[460px] lg:h-[540px] select-none pointer-events-none">
      {/* Subtle radial ambient glow behind fallback */}
      <div
        aria-hidden="true"
        className="absolute w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(255,212,38,0.12)_0%,transparent_70%)] blur-2xl"
      />

      {/* Floating SVG Möbius Ribbon Graphic */}
      <div className="relative animate-[float_6s_ease-in-out_infinite] will-change-transform">
        <svg
          width="320"
          height="320"
          viewBox="0 0 320 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-64 h-64 sm:w-80 sm:h-80 drop-shadow-[0_12px_32px_rgba(255,212,38,0.15)]"
        >
          <defs>
            <linearGradient id="amberGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd426" />
              <stop offset="45%" stopColor="#ff9f1c" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="amberGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#b45309" />
              <stop offset="50%" stopColor="#ff9f1c" />
              <stop offset="100%" stopColor="#ffd426" />
            </linearGradient>
            <radialGradient id="highlightGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Front loop segment */}
          <path
            d="M90 210C55 210 35 185 35 160C35 135 55 110 90 110C140 110 180 210 230 210C265 210 285 185 285 160C285 135 265 110 230 110C180 110 140 210 90 210Z"
            stroke="url(#amberGradient1)"
            strokeWidth="32"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Inner core overlay for metallic depth */}
          <path
            d="M90 210C55 210 35 185 35 160C35 135 55 110 90 110C140 110 180 210 230 210C265 210 285 185 285 160C285 135 265 110 230 110C180 110 140 210 90 210Z"
            stroke="url(#amberGradient2)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />

          {/* Specular sheen highlight */}
          <circle cx="160" cy="160" r="14" fill="url(#highlightGlow)" />
        </svg>
      </div>
    </div>
  );
}
