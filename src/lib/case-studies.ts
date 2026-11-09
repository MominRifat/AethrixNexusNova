/**
 * Case Studies Data File
 *
 * HONESTY NOTICE & ETHICAL COMPLIANCE (PROJECT_RULES.md):
 * The following case studies represent concept and reference architectures engineered
 * by Aethrix Nexus Nova to illustrate real-world enterprise engineering patterns.
 * All metrics, throughput benchmarks, and telemetry figures are reference/simulated
 * benchmarks (placeholders) and must be replaced with verified production client figures.
 */

export interface KPI {
  id: string;
  label: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  caption: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  sub: string;
  x: number; // percentage in SVG viewBox
  y: number;
  type: "source" | "processor" | "database" | "output";
}

export interface ArchitectureFlow {
  headline: string;
  description: string;
  nodes: ArchitectureNode[];
  pathD: string; // SVG path data for main animated packet
  branchPathD?: string; // Optional secondary branch path for full parallel circuit
}

export interface CaseStudy {
  id: string;
  code: string;
  title: string;
  tagline: string;
  clientType: string;
  badge: "Concept / Reference Architecture";
  summary: string;
  fullOverview: string;
  keyChallenge: string;
  solutionArchitecture: string;
  tags: string[];
  kpis: [KPI, KPI, KPI];
  architecture: ArchitectureFlow;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "omnicommerce-3d",
    code: "CASE_01 // ALPHA",
    title: "OmniCommerce 3D & Gemini AI",
    tagline: "AI-driven real-time visual search & interactive 3D spatial models on multi-tenant backbone",
    clientType: "Global Enterprise Commerce",
    badge: "Concept / Reference Architecture",
    summary:
      "Engineered an omni-channel commerce engine integrating Gemini multi-modal embeddings for sub-40ms visual product search and WebGL 3D configuration models.",
    fullOverview:
      "A next-generation enterprise commerce proof-of-architecture designed for brands operating across multiple high-traffic geographic regions. By unifying Gemini 2.0 multi-modal vector embeddings with a custom lightweight Three.js spatial viewport, buyers query inventory via camera feeds or voice commands, inspecting interactive 3D CAD models with zero layout shift.",
    keyChallenge:
      "Rendering 60-120 FPS photorealistic 3D models on constrained mobile devices while querying millions of multi-modal vector embeddings under strict sub-50ms latency budgets.",
    solutionArchitecture:
      "Deployed an edge-cached Next.js 16 front-end paired with a decoupled vector indexing pipeline in pgvector. Spatial assets are compressed into Draco-optimized GLTF streams served over a global CDN, while Gemini Vision models execute asynchronous feature extraction via edge workers.",
    tags: ["Next.js 16", "Three.js / WebGL", "Gemini Multi-Modal", "pgvector", "Redis Cache", "PostgreSQL"],
    kpis: [
      {
        id: "latency",
        label: "Visual Search Latency",
        value: 32,
        prefix: "< ",
        suffix: "ms",
        caption: "Multi-modal vector similarity retrieval",
      },
      {
        id: "fps",
        label: "Spatial Render Budget",
        value: 120,
        suffix: " FPS",
        caption: "Fluid 3D viewport on mobile & desktop",
      },
      {
        id: "uptime",
        label: "High-Concurrency SLA",
        value: 99.99,
        decimals: 2,
        suffix: "%",
        caption: "Simulated peak seasonal failover",
      },
    ],
    architecture: {
      headline: "Multi-Modal Ingestion & Edge 3D Delivery Pipeline",
      description:
        "Input visual tokens map to high-dimensional vectors via Gemini Vision, queried against pgvector, and synchronized with Draco 3D geometry streams.",
      nodes: [
        { id: "client", label: "Client Viewport", sub: "Web & Mobile App", x: 65, y: 90, type: "source" },
        { id: "gateway", label: "Edge Gateway", sub: "Cloudflare & Envoy", x: 215, y: 90, type: "processor" },
        { id: "gemini", label: "Gemini Vision", sub: "Vector Embeddings", x: 380, y: 46, type: "processor" },
        { id: "pgvector", label: "pgvector DB", sub: "HNSW Indexed Store", x: 550, y: 46, type: "database" },
        { id: "model-cdn", label: "Draco 3D CDN", sub: "Spatial Geometry", x: 465, y: 134, type: "database" },
        { id: "output", label: "Synthesized DOM", sub: "120 FPS Renderer", x: 740, y: 90, type: "output" },
      ],
      pathD: "M 115 90 L 215 90 C 290 90 310 46 380 46 L 550 46 C 625 46 655 90 740 90",
      branchPathD: "M 215 90 C 285 90 355 134 465 134 C 575 134 645 90 740 90",
    },
  },
  {
    id: "aegis-core",
    code: "CASE_02 // BETA",
    title: "Aegis Multi-Tenant Core",
    tagline: "Role-based enterprise event platform designed for high-volume event handling at millisecond latency",
    clientType: "Fintech & Banking Infrastructure",
    badge: "Concept / Reference Architecture",
    summary:
      "Architected a fault-tolerant multi-tenant microservices platform with row-level tenant security, processing over 140,000 asynchronous transactions per second.",
    fullOverview:
      "A resilient distributed transactional backbone engineered for financial institutions requiring strict regulatory compliance (SOC2 / ISO 27001) and zero cross-tenant contamination. The architecture isolates database operations via cryptographic tenant keys and leverages an event mesh for immediate state reconciliation across distributed datacenters.",
    keyChallenge:
      "Achieving deterministic sub-5ms P99 latency during burst transactional volumes while guaranteeing cryptographic isolation between competing institutional tenants.",
    solutionArchitecture:
      "Constructed a high-throughput event mesh utilizing Apache Kafka with consumer group sharding and Go/Rust ingestion services. PostgreSQL row-level security (RLS) is enforced at the connection pool layer, coupled with OpenTelemetry distributed tracing across all transit lanes.",
    tags: ["Rust / Go Core", "Kafka Event Mesh", "PostgreSQL (RLS)", "Distributed Tracing", "Envoy Proxy", "Kubernetes"],
    kpis: [
      {
        id: "throughput",
        label: "Peak Event Volume",
        value: 140,
        suffix: "k /s",
        caption: "Sustained transactional stream capacity",
      },
      {
        id: "p99",
        label: "P99 Processing Latency",
        value: 4.2,
        decimals: 1,
        suffix: "ms",
        caption: "End-to-end consensus & persistence",
      },
      {
        id: "isolation",
        label: "Cross-Tenant Leaks",
        value: 0,
        suffix: " breaches",
        caption: "Cryptographic RLS isolation guarantee",
      },
    ],
    architecture: {
      headline: "Zero-Trust Multi-Tenant Event Ingestion & Isolation",
      description:
        "Every event is validated via hardware security modules, routed through tenant Kafka partitions, and committed to isolated PostgreSQL tablespaces.",
      nodes: [
        { id: "producer", label: "Tenant Services", sub: "TLS 1.3 Event Influx", x: 65, y: 90, type: "source" },
        { id: "rbac", label: "Zero-Trust RBAC", sub: "eBPF / Envoy Gate", x: 215, y: 90, type: "processor" },
        { id: "kafka", label: "Kafka Event Mesh", sub: "Partitioned Shards", x: 380, y: 90, type: "processor" },
        { id: "rust", label: "Consensus Workers", sub: "Rust Micro-daemons", x: 550, y: 46, type: "processor" },
        { id: "db", label: "Encrypted RLS DB", sub: "Tenant Tablespaces", x: 550, y: 134, type: "database" },
        { id: "ledger", label: "Audit Ledger", sub: "Immutable Log", x: 740, y: 90, type: "output" },
      ],
      pathD: "M 115 90 L 215 90 L 380 90 C 450 90 480 46 550 46 C 620 46 660 90 740 90",
      branchPathD: "M 380 90 C 450 90 480 134 550 134 C 620 134 660 90 740 90",
    },
  },
  {
    id: "agrosense-edge",
    code: "CASE_03 // GAMMA",
    title: "AgroSense Autonomous Edge",
    tagline: "Drone imagery and speech processing for real-time crop analysis and automated irrigation",
    clientType: "Autonomous AgTech Systems",
    badge: "Concept / Reference Architecture",
    summary:
      "Engineered an offline-first autonomous field computing platform deploying YOLOv11 and Whisper on embedded Jetson modules for real-time agricultural telemetry.",
    fullOverview:
      "A ruggedized industrial edge architecture designed for mission-critical agricultural environments with zero reliable cellular or internet connectivity. Edge modules mounted on autonomous aerial drones analyze multispectral canopy imagery in flight while local speech models enable agronomists to control telemetry through voice commands in noisy open-air conditions.",
    keyChallenge:
      "Running continuous neural inference on power-constrained 15W edge devices in remote climates while maintaining millisecond-level precision without cloud telemetry dependencies.",
    solutionArchitecture:
      "Deployed TensorRT-optimized YOLOv11 vision models and quantized Whisper voice models directly onto NVIDIA Jetson Orin edge units. Telemetry packets are broadcast across localized LoRaWAN mesh networks, syncing opportunistically to central cloud nodes when gateways are detected.",
    tags: ["YOLOv11 Edge", "Whisper Voice Core", "NVIDIA Jetson", "LoRaWAN Mesh", "MQTT Gateway", "Rust Daemon"],
    kpis: [
      {
        id: "inference",
        label: "On-Device Inference",
        value: 8.5,
        decimals: 1,
        prefix: "< ",
        suffix: "ms",
        caption: "Local edge neural processing latency",
      },
      {
        id: "offline",
        label: "Field Offline Autonomy",
        value: 100,
        suffix: "%",
        caption: "Zero cloud dependency for field action",
      },
      {
        id: "efficiency",
        label: "Resource Conservation",
        value: 42,
        suffix: "%",
        caption: "Simulated irrigation water optimization",
      },
    ],
    architecture: {
      headline: "Autonomous Aerial Edge Inference & LoRa Telemetry Mesh",
      description:
        "High-resolution multispectral imagery is captured by drone gimbals, classified on TensorRT engines, and broadcast via LoRa to field actuators.",
      nodes: [
        { id: "drone", label: "Drone Sensor Rig", sub: "Multispectral Gimbal", x: 65, y: 90, type: "source" },
        { id: "jetson", label: "Jetson Orin TPU", sub: "TensorRT Hardware", x: 215, y: 90, type: "processor" },
        { id: "yolo", label: "YOLOv11 Vision", sub: "Canopy Defect Detect", x: 380, y: 46, type: "processor" },
        { id: "whisper", label: "Whisper Voice", sub: "Quantized Local Audio", x: 380, y: 134, type: "processor" },
        { id: "lora", label: "LoRaWAN Gateway", sub: "Sub-GHz Long Range", x: 560, y: 90, type: "database" },
        { id: "actuator", label: "Smart Actuators", sub: "Automated Valves", x: 740, y: 90, type: "output" },
      ],
      pathD: "M 115 90 L 215 90 C 285 90 310 46 380 46 C 450 46 480 90 560 90 L 740 90",
      branchPathD: "M 215 90 C 285 90 310 134 380 134 C 450 134 480 90 560 90",
    },
  },
];
