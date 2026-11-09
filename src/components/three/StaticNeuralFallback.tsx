import React from "react";

export function StaticNeuralFallback() {
  return (
    <div className="relative flex items-center justify-center w-full h-[320px] sm:h-[400px] lg:h-[440px] xl:h-[480px] max-h-[56vh] select-none pointer-events-none">
      {/* Central Ambient Glow */}
      <div
        aria-hidden="true"
        className="absolute w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(255,212,38,0.18)_0%,transparent_70%)] blur-2xl animate-pulse"
      />

      {/* Floating 2D Vector Neural Matrix */}
      <div className="relative animate-[float_6s_ease-in-out_infinite] will-change-transform">
        <svg
          width="340"
          height="340"
          viewBox="0 0 340 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-72 h-72 sm:w-88 sm:h-88 drop-shadow-[0_0_36px_rgba(255,212,38,0.22)]"
        >
          <defs>
            <radialGradient id="coreEnergy" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffd426" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#ff9f1c" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Concentric Telemetry Orbitals */}
          <g className="origin-center animate-[spin_24s_linear_infinite]">
            <ellipse
              cx="170"
              cy="170"
              rx="140"
              ry="60"
              stroke="#ffd426"
              strokeWidth="1.2"
              strokeDasharray="6 8"
              opacity="0.38"
              transform="rotate(-25 170 170)"
            />
          </g>
          <g className="origin-center animate-[spin_18s_linear_infinite_reverse]">
            <ellipse
              cx="170"
              cy="170"
              rx="155"
              ry="70"
              stroke="#ff9f1c"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              opacity="0.28"
              transform="rotate(35 170 170)"
            />
          </g>

          {/* Neural Core Geometric Lattice */}
          <polygon
            points="170,80 245,125 245,215 170,260 95,215 95,125"
            stroke="#ffd426"
            strokeWidth="1.5"
            strokeOpacity="0.6"
            fill="none"
          />
          <polygon
            points="170,105 220,135 220,205 170,235 120,205 120,135"
            stroke="#ff9f1c"
            strokeWidth="1"
            strokeOpacity="0.45"
            fill="none"
          />

          {/* Synaptic Interconnect Lines */}
          <line x1="170" y1="80" x2="170" y2="260" stroke="#ffd426" strokeWidth="1" strokeOpacity="0.35" />
          <line x1="95" y1="125" x2="245" y2="215" stroke="#ffd426" strokeWidth="1" strokeOpacity="0.35" />
          <line x1="95" y1="215" x2="245" y2="125" stroke="#ffd426" strokeWidth="1" strokeOpacity="0.35" />

          {/* Central Pulsating Energy Sphere */}
          <circle cx="170" cy="170" r="42" fill="url(#coreEnergy)" className="animate-pulse" />
          <circle cx="170" cy="170" r="16" fill="#ffd426" opacity="0.9" />

          {/* Node Vertices */}
          {[[170, 80], [245, 125], [245, 215], [170, 260], [95, 215], [95, 125], [170, 105], [220, 135], [220, 205], [170, 235], [120, 205], [120, 135]].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={i < 6 ? 4.5 : 3.2}
              fill={i % 2 === 0 ? "#ffd426" : "#ff9f1c"}
              className="drop-shadow-[0_0_6px_#ffd426]"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
