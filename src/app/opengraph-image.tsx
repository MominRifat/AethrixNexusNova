import { ImageResponse } from "next/og";

export const alt = "Aethrix Nexus Nova - Enterprise IT & AI Architecture";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0805",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle Obsidian Amber Glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 212, 38, 0.15) 0%, transparent 70%)",
          }}
        />

        {/* Top Header / Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              border: "1px solid rgba(255, 212, 38, 0.4)",
              background: "#17120a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffd426",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            ●
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "28px",
                fontWeight: "800",
                color: "#f5f3ee",
                letterSpacing: "-0.03em",
              }}
            >
              Aethrix<span style={{ color: "#ffd426" }}>Nexus</span> Nova
            </span>
            <span style={{ fontSize: "14px", color: "#b7ae9c", fontFamily: "monospace" }}>
              ENTERPRISE IT & AI SYSTEMS ARCHITECTURE
            </span>
          </div>
        </div>

        {/* Main Center Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "960px" }}>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: "800",
              color: "#f5f3ee",
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            Engineering{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #ffd426 0%, #ff9f1c 100%)",
                backgroundClip: "text",
                color: "#ffd426",
              }}
            >
              Intelligent Realities
            </span>{" "}
            for the Enterprise Era.
          </h1>
          <p
            style={{
              fontSize: "22px",
              color: "#b7ae9c",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            Autonomous AI Systems, Immersive 3D Web &amp; Resilient Distributed Cloud Architectures.
          </p>
        </div>

        {/* Bottom Feature Badges */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              padding: "10px 18px",
              borderRadius: "100px",
              backgroundColor: "rgba(255, 212, 38, 0.08)",
              border: "1px solid rgba(255, 212, 38, 0.3)",
              color: "#ffd426",
              fontFamily: "monospace",
              fontSize: "14px",
            }}
          >
            ● Deep RAG & Autonomous Agents
          </div>
          <div
            style={{
              padding: "10px 18px",
              borderRadius: "100px",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#f5f3ee",
              fontFamily: "monospace",
              fontSize: "14px",
            }}
          >
            ● 60-120 FPS WebGL Spatial UI
          </div>
          <div
            style={{
              padding: "10px 18px",
              borderRadius: "100px",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#f5f3ee",
              fontFamily: "monospace",
              fontSize: "14px",
            }}
          >
            ● High-Throughput Distributed Core
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
