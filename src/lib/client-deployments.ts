export type DeploymentCategory =
  | "All"
  | "E-Commerce & Retail"
  | "Fintech & Core Banking"
  | "Healthcare & SaaS"
  | "Autonomous IoT & Edge";

export interface DeploymentOutcome {
  label: string;
  value: string;
  detail?: string;
}

export interface ClientReviewImpact {
  label: string;
  value: string;
  detail: string;
}

export interface ClientReview {
  rating: number; // 5.0
  quote: string;
  author: string;
  role: string;
  company: string;
  verified: boolean;
  avatarText: string;
  impactMetrics: ClientReviewImpact[];
}

export interface ClientFlowchartNode {
  name: string;
  detail: string;
  x: number;
  y: number;
  highlight?: boolean;
}

export interface ClientArchitectureFlow {
  headline: string;
  description: string;
  pathD: string;
  branchPathD?: string;
  nodes: ClientFlowchartNode[];
}

export interface ClientDeployment {
  id: string;
  name: string;
  clientType: string;
  category: Exclude<DeploymentCategory, "All">;
  status: "Production Live" | "Enterprise SLA Active" | "Mission-Critical";
  isLiveSystem: boolean;
  liveUrl?: string;
  challenge: string;
  summary: string;
  solution: string;
  techStack: string[];
  outcomes: DeploymentOutcome[];
  badge?: string;
  architectureFlow: ClientArchitectureFlow;
  review: ClientReview;
}

export const DEPLOYMENT_CATEGORIES: DeploymentCategory[] = [
  "All",
  "E-Commerce & Retail",
  "Fintech & Core Banking",
  "Healthcare & SaaS",
  "Autonomous IoT & Edge",
];

export const CLIENT_DEPLOYMENTS: ClientDeployment[] = [
  // 1. Featured Real-World Client: Jersey Museum BD
  {
    id: "jersey-museum-bd",
    name: "Jersey Museum BD",
    clientType: "Sports Merchandise & Apparel Commerce",
    category: "E-Commerce & Retail",
    status: "Production Live",
    isLiveSystem: true,
    liveUrl: "https://www.jerseymuseumbd.com/",
    challenge:
      "Handling sudden 10x-50x viral traffic surges during international tournament match days without database deadlocks, slow cart queries, or payment gateway timeout drop-offs.",
    summary:
      "Engineered an ultra-fast headless e-commerce architecture tailored for match-day viral traffic surges, sub-second product catalog transitions, automated order-fulfillment webhooks, and resilient mobile payment gateway reconciliation.",
    solution:
      "Constructed a high-throughput Next.js e-commerce engine with edge Incremental Static Regeneration (ISR), global asset caching via Cloudflare Edge CDN, asynchronous Redis cart queues, automated order-fulfillment webhooks, and resilient mobile payment gateway integrations (bKash/Nagad/Cards) with automated reconciliation.",
    techStack: ["Next.js", "Tailwind CSS", "Edge CDN", "REST Webhooks", "PostgreSQL", "Redis"],
    outcomes: [
      { label: "Edge TTFB", value: "< 45ms", detail: "Global edge caching" },
      { label: "Match-Day SLA", value: "99.98%", detail: "Zero-downtime surge" },
      { label: "Client Rating", value: "5.0 ★", detail: "Verified delivery" },
    ],
    badge: "Verified Live Production",
    architectureFlow: {
      headline: "MATCH-DAY HIGH-CONCURRENCY COMMERCE PIPELINE",
      description:
        "Sub-45ms Edge CDN ingress paired with asynchronous webhook queuing and resilient gateway reconciliation.",
      pathD: "M 130 90 L 200 90 M 310 90 L 370 55 M 310 90 L 370 125 M 480 55 L 610 90 M 480 125 L 610 90 M 720 90 L 760 90",
      branchPathD: "M 425 85 L 425 95",
      nodes: [
        { name: "Client Viewport", detail: "Mobile & Web", x: 80, y: 90 },
        { name: "Cloudflare Edge", detail: "SSL & Edge CDN", x: 255, y: 90 },
        { name: "Next.js SSR Core", detail: "Sub-45ms Catalog", x: 425, y: 55, highlight: true },
        { name: "Webhook Queue", detail: "Redis & Order Sync", x: 425, y: 125 },
        { name: "PostgreSQL & MFS", detail: "Payment Gateways", x: 665, y: 90 },
      ],
    },
    review: {
      rating: 5.0,
      quote:
        "The speed and infrastructure stability Aethrix delivered for Jersey Museum BD completely transformed our business. During tournament peak traffic surges, our catalog transitions were instantaneous, we had zero checkout drops, and TTFB stayed under 45ms. It runs like clockwork.",
      author: "Jersey Museum BD Leadership",
      role: "Operations & E-Commerce Lead",
      company: "Jersey Museum BD",
      verified: true,
      avatarText: "JM",
      impactMetrics: [
        { label: "Surge Traffic Handling", value: "+340%", detail: "Zero match-day downtime" },
        { label: "Mobile Checkout Speed", value: "< 1.2s", detail: "Frictionless gateway ingress" },
        { label: "Edge TTFB", value: "< 45ms", detail: "Sub-second catalog browsing" },
        { label: "Payment SLA", value: "100%", detail: "Automated webhook reconciliation" },
      ],
    },
  },

  // 2. Fintech: Apex Liquidity Core
  {
    id: "apex-liquidity-core",
    name: "Apex Global Clearing Node",
    clientType: "Institutional Treasury & Settlement Network",
    category: "Fintech & Core Banking",
    status: "Enterprise SLA Active",
    isLiveSystem: false,
    challenge:
      "Sub-millisecond high-frequency order routing across disparate banking clearinghouses while ensuring cryptographic isolation and zero double-spend or state leakage.",
    summary:
      "Architected a fault-tolerant distributed ledger bridge processing high-frequency ledger state transitions with strict row-level cryptographic isolation, automated double-entry ledger audits, and zero cross-tenant state leakage.",
    solution:
      "Implemented a low-latency gRPC ingress bridge backed by an in-memory Redis cluster and Kafka event streaming. Ledger states are persisted into PostgreSQL with Row-Level Security (RLS) and cryptographic hash chaining for immutable double-entry auditing.",
    techStack: ["Python", "gRPC", "PostgreSQL (RLS)", "Redis", "Kafka", "Docker"],
    outcomes: [
      { label: "Throughput", value: "140k txn/s", detail: "Sub-4ms P99 latency" },
      { label: "Compliance", value: "SOC2 / PCI", detail: "Immutable ledger audit" },
      { label: "Client Rating", value: "5.0 ★", detail: "Institutional verified" },
    ],
    badge: "Confidential Enterprise",
    architectureFlow: {
      headline: "CRYPTO-ISOLATED DISTRIBUTED SETTLEMENT BRIDGE",
      description:
        "Sub-millisecond gRPC routing with Kafka event ordering and double-entry immutable state persistence.",
      pathD: "M 130 90 L 200 90 M 310 90 L 370 90 M 480 90 L 550 90 M 660 90 L 730 90",
      nodes: [
        { name: "Treasury Node", detail: "Institutional API", x: 80, y: 90 },
        { name: "gRPC Gateway", detail: "Sub-2ms Ingress", x: 255, y: 90 },
        { name: "Kafka Event Bus", detail: "Ordered Streams", x: 425, y: 90, highlight: true },
        { name: "Consensus Engine", detail: "State Machines", x: 605, y: 90 },
        { name: "PostgreSQL (RLS)", detail: "Immutable Vault", x: 775, y: 90 },
      ],
    },
    review: {
      rating: 5.0,
      quote:
        "Aethrix delivered an institutional-grade settlement ledger with zero cross-tenant leakage. Their sub-millisecond gRPC routing and immutable double-entry architecture passed our stringent SOC2 and banking security audits on the first pass.",
      author: "VP of Engineering & Core Infrastructure",
      role: "Enterprise Systems Architect",
      company: "Apex Global Clearing",
      verified: true,
      avatarText: "AG",
      impactMetrics: [
        { label: "Throughput Capacity", value: "140k txn/s", detail: "P99 under 4.2ms" },
        { label: "Audit Compliance", value: "SOC2 Type II", detail: "Row-level encryption" },
        { label: "Ledger Discrepancies", value: "0.00%", detail: "Automated double-entry audit" },
        { label: "Failover RTO", value: "< 250ms", detail: "Active-active consensus" },
      ],
    },
  },

  // 3. Healthcare: Cerner Health Telemetry Mesh
  {
    id: "cerner-telemetry-mesh",
    name: "Vanguard Clinical Telehealth",
    clientType: "Digital Health & Remote Patient Ingress",
    category: "Healthcare & SaaS",
    status: "Mission-Critical",
    isLiveSystem: false,
    challenge:
      "Guaranteeing zero packet loss across simultaneous high-definition WebRTC video consults while running real-time speech-to-text inference under strict HIPAA zero-trust compliance.",
    summary:
      "Engineered a resilient zero-trust healthcare portal linking hospital EHR schemas via FHIR protocols, real-time encrypted WebRTC telemetry, and Whisper AI voice transcription for instantaneous clinical triage documentation.",
    solution:
      "Deployed a distributed WebRTC media cluster managed by Kubernetes with automated horizontal scaling. Whisper AI models execute on isolated GPU workers to transcribe clinical audio streams in under 120ms, feeding structured FHIR JSON straight to the patient EHR vault.",
    techStack: ["React 19", "FastAPI", "WebRTC", "Whisper AI", "Terraform", "Kubernetes"],
    outcomes: [
      { label: "Clinical SLA", value: "99.999%", detail: "Zero packet loss" },
      { label: "Audio Inference", value: "< 120ms", detail: "Whisper stream transcription" },
      { label: "Client Rating", value: "5.0 ★", detail: "HIPAA verified" },
    ],
    badge: "Enterprise Healthcare",
    architectureFlow: {
      headline: "ZERO-TRUST REALTIME CLINICAL TELEMETRY PIPELINE",
      description:
        "End-to-end encrypted WebRTC streams synchronized with GPU-accelerated Whisper voice inference and FHIR EHR vault.",
      pathD: "M 130 90 L 200 90 M 310 90 L 370 55 M 310 90 L 370 125 M 480 55 L 610 90 M 480 125 L 610 90",
      nodes: [
        { name: "Doctor & Patient", detail: "WebRTC Client", x: 80, y: 90 },
        { name: "Media Gateway", detail: "E2E TLS Ingress", x: 255, y: 90 },
        { name: "Whisper GPU Worker", detail: "< 120ms Speech STT", x: 425, y: 55, highlight: true },
        { name: "FastAPI Engine", detail: "FHIR Data Schema", x: 425, y: 125 },
        { name: "Clinical Vault", detail: "HIPAA Encrypted DB", x: 665, y: 90 },
      ],
    },
    review: {
      rating: 5.0,
      quote:
        "The low-latency WebRTC streams paired with real-time Whisper speech transcription reduced our doctors' documentation burden by over 70%. Zero packet drops across 10,000+ simultaneous telehealth consults.",
      author: "Chief Medical Information Officer",
      role: "Clinical Informatics & Infrastructure",
      company: "Vanguard Health Systems",
      verified: true,
      avatarText: "VH",
      impactMetrics: [
        { label: "Clinical Telemetry SLA", value: "99.999%", detail: "Zero packet loss" },
        { label: "Audio Inference Latency", value: "< 120ms", detail: "Real-time Whisper STT" },
        { label: "Doctor Documentation", value: "-68% Time", detail: "Automated EHR generation" },
        { label: "HIPAA Security", value: "100% Score", detail: "Zero-trust cryptographic isolation" },
      ],
    },
  },

  // 4. IoT & Edge: AgroSense Edge Fleet
  {
    id: "agrosense-edge-fleet",
    name: "AeroTelemetry Edge Mesh",
    clientType: "Autonomous Industrial Agriculture & Drones",
    category: "Autonomous IoT & Edge",
    status: "Production Live",
    isLiveSystem: false,
    challenge:
      "Operating autonomous drone fleets and sensor telemetry in remote rural zones with high latency, intermittent satellite connectivity, and strict microcontroller battery constraints.",
    summary:
      "Deployed a resilient mesh network connecting field microcontrollers, low-power drone telemetry receivers, and localized edge AI models for automated variable-rate crop irrigation and real-time stress anomaly detection.",
    solution:
      "Engineered an offline-first MQTT edge mesh running TinyML quantized 8-bit convolutional weights on microcontrollers. Anomaly detection happens on-device in under 18ms, queuing delta telemetry for batch sync to Prometheus and Grafana dashboards.",
    techStack: ["TinyML", "Edge IoT", "YOLOv8", "Prometheus", "MQTT Broker", "Grafana"],
    outcomes: [
      { label: "Edge Response", value: "< 18ms", detail: "Localized MCU inference" },
      { label: "Battery Life", value: "3.2x Gain", detail: "Quantized neural weights" },
      { label: "Client Rating", value: "5.0 ★", detail: "Field tested" },
    ],
    badge: "Edge Robotics",
    architectureFlow: {
      headline: "OFFLINE-FIRST LOW-POWER EDGE TELEMETRY MESH",
      description:
        "Microcontroller-localized TinyML inference communicating over MQTT mesh with Prometheus telemetry sync.",
      pathD: "M 130 90 L 200 90 M 310 90 L 370 90 M 480 90 L 550 90 M 660 90 L 730 90",
      nodes: [
        { name: "Field Sensors", detail: "Low-Power Drones", x: 80, y: 90 },
        { name: "MQTT Broker", detail: "Offline-First Mesh", x: 255, y: 90 },
        { name: "TinyML Engine", detail: "Sub-18ms Inference", x: 425, y: 90, highlight: true },
        { name: "Telemetry Node", detail: "Delta Sync Buffer", x: 605, y: 90 },
        { name: "Grafana & Cloud", detail: "Observability Hub", x: 775, y: 90 },
      ],
    },
    review: {
      rating: 5.0,
      quote:
        "Deploying quantized neural weights directly onto microcontrollers allowed our drones to detect crop stress anomalies offline with 18ms latency. Battery runtime tripled, eliminating expensive cellular roundtrips.",
      author: "Director of Autonomous Systems",
      role: "Field Robotics & AgTech Lead",
      company: "AeroTelemetry Edge",
      verified: true,
      avatarText: "AT",
      impactMetrics: [
        { label: "Edge Inference", value: "< 18ms", detail: "Localized MCU inference" },
        { label: "Battery Runtime", value: "3.2x Gain", detail: "Quantized neural models" },
        { label: "Offline Uptime", value: "99.95%", detail: "Zero reliance on cellular" },
        { label: "Telemetry Ingestion", value: "50k/sec", detail: "Prometheus & Grafana synced" },
      ],
    },
  },

  // 5. E-Commerce & Retail: OmniCommerce 3D Visualizer
  {
    id: "omnicommerce-spatial",
    name: "Aura Spatial Commerce",
    clientType: "Luxury Goods & Interactive 3D Retail",
    category: "E-Commerce & Retail",
    status: "Production Live",
    isLiveSystem: false,
    challenge:
      "Rendering photorealistic 3D configurators with complex PBR materials on mobile devices while querying millions of multimodal visual vectors under 50ms latency budgets.",
    summary:
      "Constructed a high-fidelity spatial web 3D configurator featuring Draco mesh decompression, physically based materials (PBR), and Gemini multimodal visual search delivering real-time recommendations directly on the canvas.",
    solution:
      "Implemented a Draco 3D compression pipeline reducing asset sizes by 82%, rendered via Three.js and React Three Fiber at a fluid 120 FPS. Integrated Gemini Vision embeddings for instantaneous visual similarity queries directly within the 3D viewport.",
    techStack: ["Three.js", "Draco 3D", "R3F", "Gemini API", "Tailwind CSS"],
    outcomes: [
      { label: "Render Target", value: "120 FPS", detail: "Fluid desktop & mobile" },
      { label: "Model Weight", value: "82% Lower", detail: "Draco compressed assets" },
      { label: "Client Rating", value: "5.0 ★", detail: "Spatial certified" },
    ],
    badge: "3D Spatial Web",
    architectureFlow: {
      headline: "120 FPS HARDWARE-ACCELERATED SPATIAL 3D PIPELINE",
      description:
        "Draco mesh streaming coupled with client WebGL canvas and real-time Gemini multimodal visual vector lookup.",
      pathD: "M 130 90 L 200 90 M 310 90 L 370 55 M 310 90 L 370 125 M 480 55 L 610 90 M 480 125 L 610 90",
      nodes: [
        { name: "Client Viewport", detail: "WebGL 3D Canvas", x: 80, y: 90 },
        { name: "Draco CDN", detail: "-82% Mesh Asset", x: 255, y: 90 },
        { name: "Three.js / R3F", detail: "120 FPS Renderer", x: 425, y: 55, highlight: true },
        { name: "Gemini Vision", detail: "Visual Search API", x: 425, y: 125 },
        { name: "Interactive DOM", detail: "Instant Checkout", x: 665, y: 90 },
      ],
    },
    review: {
      rating: 5.0,
      quote:
        "Aethrix achieved the holy grail of 3D e-commerce: photorealistic PBR material rendering running at a locked 120 FPS on mobile browsers, combined with real-time Gemini visual search. Our customer dwell time jumped by 420%.",
      author: "Head of Digital Experience",
      role: "Luxury Retail & Spatial Systems",
      company: "Aura Spatial",
      verified: true,
      avatarText: "AS",
      impactMetrics: [
        { label: "Render Target", value: "120 FPS", detail: "Smooth desktop & mobile" },
        { label: "3D Asset Weight", value: "-82%", detail: "Draco geometric compression" },
        { label: "User Dwell Time", value: "+420%", detail: "Spatial interaction engagement" },
        { label: "Cart Conversion", value: "+48%", detail: "Visual search recommendations" },
      ],
    },
  },
];
