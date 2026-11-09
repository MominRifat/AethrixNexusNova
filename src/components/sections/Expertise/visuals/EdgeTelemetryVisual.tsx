import React from "react";

export function EdgeTelemetryVisual() {
  return (
    <div className="relative w-full h-32 flex items-center justify-center overflow-hidden rounded-[14px] bg-[#120e08]/60 border border-white/[0.05] p-3">
      <svg
        viewBox="0 0 380 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[360px] h-auto select-none"
      >
        {/* Signal transmission wave lines */}
        <path
          d="M 65 45 C 110 20, 140 70, 190 45 C 240 20, 270 70, 315 45"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />

        {/* Node 1: Sensor Array */}
        <g transform="translate(35, 25)">
          <circle cx="20" cy="20" r="18" fill="#17120a" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
          <circle cx="20" cy="20" r="6" fill="#7d7566" />
          <text x="20" y="48" fill="#7d7566" fontSize="8" fontFamily="monospace" textAnchor="middle">
            SENSORS
          </text>
        </g>

        {/* Node 2: Industrial Edge Gateway (Accent Highlight) */}
        <g transform="translate(165, 20)">
          <rect
            width="50"
            height="50"
            rx="10"
            fill="#1e1810"
            stroke="#ffd426"
            strokeWidth="1.2"
            className="drop-shadow-[0_0_12px_rgba(255,212,38,0.25)]"
          />
          {/* Microcontroller chip pins */}
          <path d="M15 10v6M25 10v6M35 10v6M15 34v6M25 34v6M35 34v6" stroke="#ffd426" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="15" y="18" width="20" height="14" rx="2" fill="#ffd426" opacity="0.2" />
          <text x="25" y="60" fill="#ffd426" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
            EDGE AI
          </text>
        </g>

        {/* Node 3: Cloud Control Plane */}
        <g transform="translate(295, 25)">
          <circle cx="20" cy="20" r="18" fill="#17120a" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
          <path
            d="M 12 24 a 6 6 0 0 1 11 -3 a 7 7 0 0 1 12 2 a 5 5 0 0 1 -3 9 h -17 a 4 4 0 0 1 -3 -8"
            stroke="#34d399"
            strokeWidth="1.2"
            fill="none"
          />
          <text x="20" y="48" fill="#7d7566" fontSize="8" fontFamily="monospace" textAnchor="middle">
            CLOUD
          </text>
        </g>

        {/* Transmitting Signal Pulses */}
        <circle r="3.5" fill="#ffd426">
          <animateMotion
            path="M 65 45 C 110 20, 140 70, 190 45 C 240 20, 270 70, 315 45"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
