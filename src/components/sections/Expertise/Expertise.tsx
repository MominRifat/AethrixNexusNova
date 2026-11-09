import React from "react";
import { BrainCircuit, Boxes, Layers, Cpu } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ExpertiseCard } from "./ExpertiseCard";
import { AiPipelineVisual } from "./visuals/AiPipelineVisual";
import { SpatialWebVisual } from "./visuals/SpatialWebVisual";
import { DistributedBackendVisual } from "./visuals/DistributedBackendVisual";
import { EdgeTelemetryVisual } from "./visuals/EdgeTelemetryVisual";

export function Expertise() {
  return (
    <Section
      id="expertise"
      variant="bg-1"
      eyebrow="Core Expertise"
      eyebrowDot
      title="Four disciplines. One engineering standard."
      description="Engineered for high-concurrency, resilient fault tolerance, and verifiable production scale."
      withTopDivider
    >
      {/* Bento Grid: 12 cols desktop, 2 cols tablet, 1 col mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        {/* Card 1: Enterprise AI & Deep RAG (Span 7) */}
        <div className="lg:col-span-7 flex flex-col h-full">
          <Reveal index={0} className="flex-1 flex flex-col h-full">
            <ExpertiseCard
              className="flex-1 h-full"
              icon={<BrainCircuit className="w-6 h-6" />}
              title="Enterprise AI & Deep RAG Pipelines"
              description="Custom RAG architectures, local LLM fine-tuning, and multimodal perception models engineered for deterministic enterprise retrieval."
              tags={["Vector DB", "Local LLM fine-tuning", "Whisper", "YOLO", "Autonomous Agents"]}
              visual={<AiPipelineVisual />}
            />
          </Reveal>
        </div>

        {/* Card 2: Immersive 3D Web & Spatial UI (Span 5) */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <Reveal index={1} className="flex-1 flex flex-col h-full">
            <ExpertiseCard
              className="flex-1 h-full"
              icon={<Boxes className="w-6 h-6" />}
              title="Immersive 3D Web & Spatial UI"
              description="Custom WebGL shaders, interactive Three.js experiences, and fluid spatial canvases maintaining consistent 60–120 FPS."
              tags={["WebGL", "Three.js", "60-120 FPS", "Liquid transitions"]}
              visual={<SpatialWebVisual />}
            />
          </Reveal>
        </div>

        {/* Card 3: High-Scale Distributed Backend (Span 5) */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <Reveal index={2} className="flex-1 flex flex-col h-full">
            <ExpertiseCard
              className="flex-1 h-full"
              icon={<Layers className="w-6 h-6" />}
              title="High-Scale Distributed Backend"
              description="Schema-isolated multi-tenant databases, asynchronous queue workers, and sub-millisecond REST & WebSocket architectures."
              tags={["Django", "Multi-tenant isolation", "RBAC", "Microservices", "High-traffic APIs"]}
              visual={<DistributedBackendVisual />}
            />
          </Reveal>
        </div>

        {/* Card 4: IoT, Edge Computing & Hardware Automation (Span 7) */}
        <div className="lg:col-span-7 flex flex-col h-full">
          <Reveal index={3} className="flex-1 flex flex-col h-full">
            <ExpertiseCard
              className="flex-1 h-full"
              icon={<Cpu className="w-6 h-6" />}
              title="IoT, Edge Computing & Hardware Automation"
              description="Embedded sensor microcontrollers, smart grid telemetry bridges, and localized edge AI running on industrial hardware."
              tags={["Embedded sensors", "Smart-grid telemetry", "Edge AI", "Robotics"]}
              visual={<EdgeTelemetryVisual />}
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
