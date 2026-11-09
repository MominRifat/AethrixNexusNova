export type TechCategory =
  | "All"
  | "Frontend & 3D"
  | "Backend"
  | "DevOps & Edge"
  | "Database"
  | "AI";

export type ProficiencyLevel = "Core" | "Advanced" | "Working";

export interface TechItem {
  id: string;
  name: string;
  category: Exclude<TechCategory, "All">;
  proficiency: ProficiencyLevel;
  highlight?: string;
}

export const TECH_CATEGORIES: TechCategory[] = [
  "All",
  "Frontend & 3D",
  "Backend",
  "DevOps & Edge",
  "Database",
  "AI",
];

export const TECH_STACK: TechItem[] = [
  // 1. Frontend & 3D
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend & 3D",
    proficiency: "Core",
    highlight: "App Router, Server Components & Turbopack",
  },
  {
    id: "react",
    name: "React",
    category: "Frontend & 3D",
    proficiency: "Core",
    highlight: "Concurrent UI & modern state trees",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend & 3D",
    proficiency: "Core",
    highlight: "Strict type boundaries & zero-any architecture",
  },
  {
    id: "threejs",
    name: "Three.js",
    category: "Frontend & 3D",
    proficiency: "Core",
    highlight: "Custom WebGL shaders & 60-120fps spatial scenes",
  },
  {
    id: "draco-r3f",
    name: "Draco 3D & R3F",
    category: "Frontend & 3D",
    proficiency: "Core",
    highlight: "Geometric mesh compression & reactive 3D canvas",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend & 3D",
    proficiency: "Core",
    highlight: "Design token systems & responsive tokens",
  },
  {
    id: "gsap-framer",
    name: "GSAP / Framer Motion",
    category: "Frontend & 3D",
    proficiency: "Advanced",
    highlight: "Physics-based micro-interactions & fluid animations",
  },

  // 2. Backend
  {
    id: "django",
    name: "Django",
    category: "Backend",
    proficiency: "Core",
    highlight: "Multi-tenant isolation & enterprise ORM",
  },
  {
    id: "python",
    name: "Python",
    category: "Backend",
    proficiency: "Core",
    highlight: "Asynchronous backend logic & service pipelines",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "Backend",
    proficiency: "Advanced",
    highlight: "Sub-millisecond high-throughput inference APIs",
  },
  {
    id: "grpc",
    name: "gRPC",
    category: "Backend",
    proficiency: "Core",
    highlight: "Low-latency binary microservice inter-communication",
  },
  {
    id: "graphql",
    name: "GraphQL",
    category: "Backend",
    proficiency: "Advanced",
    highlight: "Flexible typed query schemas & federated data graph",
  },
  {
    id: "celery",
    name: "Celery",
    category: "Backend",
    proficiency: "Advanced",
    highlight: "Asynchronous task workers & scheduled queues",
  },
  {
    id: "websocket",
    name: "WebSocket",
    category: "Backend",
    proficiency: "Advanced",
    highlight: "Bi-directional telemetry & token streaming",
  },

  // 3. DevOps & Edge
  {
    id: "docker",
    name: "Docker",
    category: "DevOps & Edge",
    proficiency: "Core",
    highlight: "Multi-stage hermetic container images",
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "DevOps & Edge",
    proficiency: "Advanced",
    highlight: "Automated scaling & zero-downtime rolling deploys",
  },
  {
    id: "terraform",
    name: "Terraform (IaC)",
    category: "DevOps & Edge",
    proficiency: "Core",
    highlight: "Declarative cloud infrastructure provisioning",
  },
  {
    id: "prometheus-grafana",
    name: "Prometheus & Grafana",
    category: "DevOps & Edge",
    proficiency: "Advanced",
    highlight: "Real-time telemetry observability & distributed metrics",
  },
  {
    id: "tinyml",
    name: "TinyML & Quantization",
    category: "DevOps & Edge",
    proficiency: "Advanced",
    highlight: "Ultra-low power on-device neural model inference",
  },
  {
    id: "edge-iot",
    name: "Edge IoT",
    category: "DevOps & Edge",
    proficiency: "Advanced",
    highlight: "Industrial sensor telemetry & microcontroller links",
  },

  // 4. Database
  {
    id: "postgresql",
    name: "PostgreSQL (RLS)",
    category: "Database",
    proficiency: "Core",
    highlight: "Row-level security, ACID compliance & tenant isolation",
  },
  {
    id: "pgvector",
    name: "pgvector / Vector DB",
    category: "Database",
    proficiency: "Core",
    highlight: "High-dimensional vector similarity retrieval for RAG",
  },
  {
    id: "redis",
    name: "Redis",
    category: "Database",
    proficiency: "Core",
    highlight: "In-memory distributed caching, lock management & session store",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Database",
    proficiency: "Advanced",
    highlight: "High-throughput document persistence for unstructured data",
  },
  {
    id: "clickhouse",
    name: "ClickHouse / TimescaleDB",
    category: "Database",
    proficiency: "Advanced",
    highlight: "Columnar analytical OLAP & IoT telemetry time-series engine",
  },

  // 5. AI
  {
    id: "pytorch",
    name: "PyTorch",
    category: "AI",
    proficiency: "Core",
    highlight: "Model fine-tuning & local training",
  },
  {
    id: "ollama",
    name: "Ollama",
    category: "AI",
    proficiency: "Core",
    highlight: "On-premise localized LLM execution",
  },
  {
    id: "langchain",
    name: "LangChain",
    category: "AI",
    proficiency: "Advanced",
    highlight: "RAG agentic tool pipelines",
  },
  {
    id: "gemini",
    name: "Gemini API",
    category: "AI",
    proficiency: "Core",
    highlight: "Multimodal audio/vision enterprise search",
  },
  {
    id: "yolo",
    name: "YOLOv8",
    category: "AI",
    proficiency: "Advanced",
    highlight: "Edge object detection telemetry",
  },
  {
    id: "whisper",
    name: "Whisper",
    category: "AI",
    proficiency: "Advanced",
    highlight: "Realtime streaming speech transcription",
  },
];
