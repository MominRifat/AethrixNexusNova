import React from "react";

export function DistributedBackendVisual() {
  return (
    <div className="relative w-full h-32 flex items-center justify-center overflow-hidden rounded-[14px] bg-[#120e08]/60 border border-white/[0.05] p-3">
      <svg
        viewBox="0 0 380 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[360px] h-auto select-none"
      >
        {/* Queue Lane 1: Ingress Gateway */}
        <g transform="translate(10, 15)">
          <rect
            width="75"
            height="22"
            rx="5"
            fill="#17120a"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
          />
          <text x="37" y="15" fill="#7d7566" fontSize="9" fontFamily="monospace" textAnchor="middle">
            INGRESS
          </text>
        </g>

        {/* Pipeline 1 -> 2 */}
        <line x1="85" y1="26" x2="140" y2="26" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" strokeDasharray="3 3" />

        {/* Queue Lane 2: Celery Worker Pool (Accent Highlight) */}
        <g transform="translate(140, 10)">
          <rect
            width="100"
            height="32"
            rx="6"
            fill="#1e1810"
            stroke="#ffd426"
            strokeWidth="1.2"
            className="drop-shadow-[0_0_10px_rgba(255,212,38,0.2)]"
          />
          <text x="50" y="16" fill="#ffd426" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
            CELERY WORKERS
          </text>
          <text x="50" y="26" fill="#b7ae9c" fontSize="8" fontFamily="monospace" textAnchor="middle">
            CONCURRENCY: 64
          </text>
        </g>

        {/* Pipeline 2 -> 3 */}
        <line x1="240" y1="26" x2="295" y2="26" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" strokeDasharray="3 3" />

        {/* Queue Lane 3: Partitioned Postgres */}
        <g transform="translate(295, 15)">
          <rect
            width="75"
            height="22"
            rx="5"
            fill="#17120a"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
          />
          <text x="37" y="15" fill="#7d7566" fontSize="9" fontFamily="monospace" textAnchor="middle">
            POSTGRES
          </text>
        </g>

        {/* Moving Packets */}
        <rect width="8" height="6" rx="2" fill="#ffd426">
          <animateMotion path="M 85 26 L 140 26 L 240 26 L 295 26" dur="2.2s" repeatCount="indefinite" />
        </rect>
        <rect width="8" height="6" rx="2" fill="#ff9f1c">
          <animateMotion path="M 85 26 L 140 26 L 240 26 L 295 26" begin="1.1s" dur="2.2s" repeatCount="indefinite" />
        </rect>

        {/* Sub-Queue: Telemetry Stream */}
        <g transform="translate(140, 56)">
          <rect
            width="100"
            height="18"
            rx="4"
            fill="#17120a"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
          <text x="50" y="12" fill="#7d7566" fontSize="8" fontFamily="monospace" textAnchor="middle">
            WEBSOCKET STREAM
          </text>
        </g>
        <path d="M 190 42 L 190 56" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    </div>
  );
}
