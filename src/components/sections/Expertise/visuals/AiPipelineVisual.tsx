import React from "react";

export function AiPipelineVisual() {
  return (
    <div className="relative w-full h-32 flex items-center justify-center overflow-hidden rounded-[14px] bg-[#120e08]/60 border border-white/[0.05]">
      <svg
        viewBox="0 0 420 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[380px] h-auto select-none"
      >
        {/* Connection Pipelines (Background lines) */}
        <path
          d="M60 60 H150 M190 60 H270 M310 60 H370"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Animated Data Travel Pulse */}
        <line
          x1="60"
          y1="60"
          x2="370"
          y2="60"
          stroke="url(#dataLinePulse)"
          strokeWidth="2"
          strokeDasharray="16 120"
          className="animate-[pulseLine_3s_linear_infinite]"
        />

        <defs>
          <linearGradient id="dataLinePulse" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffd426" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffd426" stopOpacity="1" />
            <stop offset="100%" stopColor="#ff9f1c" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Node 1: Raw Document */}
        <g transform="translate(40, 40)">
          <rect
            width="40"
            height="40"
            rx="8"
            fill="#17120a"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="1"
          />
          <path
            d="M50 50h20M50 56h14M50 62h18"
            transform="translate(-40, -40)"
            stroke="#7d7566"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <text
            x="20"
            y="54"
            textAnchor="middle"
            fill="#7d7566"
            fontSize="9"
            fontFamily="monospace"
          >
            DOCS
          </text>
        </g>

        {/* Node 2: Neural Embedding */}
        <g transform="translate(150, 40)">
          <rect
            width="40"
            height="40"
            rx="8"
            fill="#17120a"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="1"
          />
          <circle cx="20" cy="20" r="8" stroke="#7d7566" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="20" cy="20" r="3" fill="#b7ae9c" />
          <text
            x="20"
            y="54"
            textAnchor="middle"
            fill="#7d7566"
            fontSize="9"
            fontFamily="monospace"
          >
            EMBED
          </text>
        </g>

        {/* Node 3: Vector Database (ONE Accent Highlight) */}
        <g transform="translate(270, 36)">
          <rect
            width="46"
            height="48"
            rx="10"
            fill="#1e1810"
            stroke="#ffd426"
            strokeWidth="1.2"
            className="drop-shadow-[0_0_12px_rgba(255,212,38,0.25)]"
          />
          <path
            d="M13 16h20M13 24h20M13 32h20"
            stroke="#ffd426"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="33" cy="16" r="2" fill="#ffd426" />
          <circle cx="33" cy="24" r="2" fill="#ffd426" />
          <circle cx="33" cy="32" r="2" fill="#ffd426" />
          <text
            x="23"
            y="60"
            textAnchor="middle"
            fill="#ffd426"
            fontSize="9"
            fontWeight="bold"
            fontFamily="monospace"
          >
            PGVECTOR
          </text>
        </g>

        {/* Node 4: Synthesized Answer */}
        <g transform="translate(370, 40)">
          <rect
            width="40"
            height="40"
            rx="8"
            fill="#17120a"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="1"
          />
          <path
            d="M12 20L18 26L28 14"
            stroke="#34d399"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="20"
            y="54"
            textAnchor="middle"
            fill="#7d7566"
            fontSize="9"
            fontFamily="monospace"
          >
            INFER
          </text>
        </g>

        {/* Travelling Data Dot */}
        <circle r="3" fill="#ffd426">
          <animateMotion
            path="M60 60 H150 M190 60 H270 M310 60 H370"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
