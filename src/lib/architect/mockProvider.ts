import { ArchitecturePlan } from "./types";

/**
 * Deterministic rule-based architecture generator.
 * Analyzes query keywords and returns a comprehensive, enterprise-grade ArchitecturePlan.
 */
export async function generateMockArchitecture(prompt: string): Promise<ArchitecturePlan> {
  const p = prompt.toLowerCase();

  // Healthcare / Medical / HIPAA
  if (
    p.includes("health") ||
    p.includes("hipaa") ||
    p.includes("medical") ||
    p.includes("clinic") ||
    p.includes("doctor") ||
    p.includes("triage") ||
    p.includes("patient")
  ) {
    return {
      summary:
        "Enterprise multi-tenant digital health platform engineered with end-to-end HIPAA compliance, AES-256 field-level encryption, role-based patient access controls, and voice-assisted clinical triage pipelines.",
      layers: [
        {
          name: "Client Layer",
          components: ["Web Clinician Portal", "Mobile Patient App (iOS/Android)", "Telehealth WebRTC Viewport"],
        },
        {
          name: "Edge & Ingress",
          components: ["Cloudflare Zero Trust Ingress", "Envoy API Gateway (mTLS)", "WAF & DDoS Shield"],
        },
        {
          name: "Services & Workers",
          components: ["Voice Triage Core (Whisper)", "HIPAA Audit Service", "EHR Integration Engine (FHIR)", "Async Event Mesh"],
        },
        {
          name: "Data & Storage",
          components: ["Encrypted PostgreSQL (RLS)", "Redis Session Store", "Encrypted Audit Log Archive", "HSM Key Store"],
        },
        {
          name: "AI & Inference",
          components: ["Local Medical LLM Triage Agent", "Whisper Audio Transcriber", "Clinical Risk Scoring Engine"],
        },
      ],
      stack: ["Next.js 16", "Rust Micro-daemons", "PostgreSQL (RLS)", "Whisper AI Core", "Kafka Mesh", "Docker / K8s", "WireGuard"],
      milestones: [
        { title: "Discovery, Threat Modeling & HIPAA Invariant Mapping", weeks: "Weeks 1-2" },
        { title: "Zero-Trust Mesh & Encrypted Data Schemas", weeks: "Weeks 3-5" },
        { title: "Voice Pipeline & EHR Integration Engine", weeks: "Weeks 6-9" },
        { title: "Penetration Testing, BAA Sign-Off & SLA Rollout", weeks: "Weeks 10-12" },
      ],
      assumptions: [
        "Target deployment adheres strictly to HIPAA Title II and BAA agreements.",
        "Clinical voice transcription operates under an on-premise or HIPAA-compliant private cloud boundary.",
        "Average peak concurrency provisioned for up to 10,000 simultaneous consultation sessions.",
      ],
    };
  }

  // E-commerce / Retail / 3D Shopping
  if (
    p.includes("commerce") ||
    p.includes("shop") ||
    p.includes("retail") ||
    p.includes("cart") ||
    p.includes("store") ||
    p.includes("marketplace")
  ) {
    return {
      summary:
        "High-scale omni-channel e-commerce architecture featuring real-time inventory consensus, sub-40ms multi-modal visual search, and WebGL 3D spatial product configurators.",
      layers: [
        {
          name: "Client Layer",
          components: ["Next.js 16 Storefront", "Interactive 3D Product Canvas", "Merchant Admin Dashboard"],
        },
        {
          name: "Edge & Ingress",
          components: ["Global Anycast Edge CDN", "GraphQL Federation Gateway", "Rate Limiting Envoy Mesh"],
        },
        {
          name: "Services & Workers",
          components: ["Cart & Checkout Engine", "Inventory Allocation Mesh", "PCI-DSS Payment Service", "Order Event Shard"],
        },
        {
          name: "Data & Storage",
          components: ["Distributed PostgreSQL (Citus)", "Redis Cache Clusters", "Draco 3D Asset Store", "Kafka Transaction Log"],
        },
        {
          name: "AI & Inference",
          components: ["Gemini Multi-Modal Vector Embeddings", "pgvector Visual Search Engine", "Personalized Re-ranking Agent"],
        },
      ],
      stack: ["Next.js 16", "Three.js / WebGL", "pgvector", "Apache Kafka", "Redis Enterprise", "Stripe API", "Kubernetes"],
      milestones: [
        { title: "Commerce Domain Blueprint & Checkout Invariants", weeks: "Weeks 1-2" },
        { title: "3D Spatial Pipeline & Global Asset CDN Setup", weeks: "Weeks 3-4" },
        { title: "Vector Search & Real-Time Inventory Sharding", weeks: "Weeks 5-8" },
        { title: "Stress Testing (150k rps) & Multi-Region Rollout", weeks: "Weeks 9-11" },
      ],
      assumptions: [
        "Product catalog scale: ~500k active SKUs with 3D model geometry compressed under 1.5MB per asset.",
        "Inventory operations execute under strong consistency (ACID) across multi-tenant shards.",
      ],
    };
  }

  // IoT / Edge / Drone / Telemetry / Hardware
  if (
    p.includes("iot") ||
    p.includes("edge") ||
    p.includes("sensor") ||
    p.includes("drone") ||
    p.includes("hardware") ||
    p.includes("telemetry") ||
    p.includes("agriculture") ||
    p.includes("industrial")
  ) {
    return {
      summary:
        "Ruggedized offline-first industrial IoT and autonomous edge computing platform with sub-GHz LoRaWAN mesh telemetry and on-device neural vision processing.",
      layers: [
        {
          name: "Client Layer",
          components: ["Operator Field Console", "Low-Bandwidth Mobile Portal", "Spatial Telemetry Map"],
        },
        {
          name: "Edge & Ingress",
          components: ["NVIDIA Jetson Orin Edge Hub", "MQTT Gateway Broker", "LoRaWAN Sub-GHz Concentrator"],
        },
        {
          name: "Services & Workers",
          components: ["Edge Inference Daemon (Rust)", "Offline State Synchronizer", "Actuator Command Dispatcher"],
        },
        {
          name: "Data & Storage",
          components: ["TimescaleDB (Telemetry)", "SQLite Embedded Cache", "S3 Raw Sensor Blob Archive"],
        },
        {
          name: "AI & Inference",
          components: ["TensorRT YOLOv11 Defect Detector", "Edge Anomaly Classifier", "Adaptive Resource Optimizer"],
        },
      ],
      stack: ["Rust Core", "TensorRT", "NVIDIA Jetson", "LoRaWAN", "MQTT / EMQX", "TimescaleDB", "WebSockets"],
      milestones: [
        { title: "Hardware Spec & Embedded Firmware Architecture", weeks: "Weeks 1-3" },
        { title: "Edge Inference Optimization (INT8 Quantization)", weeks: "Weeks 4-6" },
        { title: "Mesh Telemetry Ingestion & Actuator Protocols", weeks: "Weeks 7-9" },
        { title: "Field Validation & Zero-Connectivity Survival Test", weeks: "Weeks 10-12" },
      ],
      assumptions: [
        "Edge nodes possess intermittent connectivity; local storage buffers 14 days of raw telemetry.",
        "Thermal envelope restricted to 15W passive cooling in harsh outdoor industrial conditions.",
      ],
    };
  }

  // Fintech / Banking / Payments / Ledger
  if (
    p.includes("fintech") ||
    p.includes("banking") ||
    p.includes("payment") ||
    p.includes("crypto") ||
    p.includes("ledger") ||
    p.includes("fraud") ||
    p.includes("trading")
  ) {
    return {
      summary:
        "Fault-tolerant financial event ledger and transactional clearinghouse designed for sub-5ms P99 settlement, cryptographic row isolation, and real-time fraud mitigation.",
      layers: [
        {
          name: "Client Layer",
          components: ["Institutional Trader Terminal", "Compliance Officer Portal", "Mobile Verification Key App"],
        },
        {
          name: "Edge & Ingress",
          components: ["Dual-Region Ingress Gateway", "Hardware Security Module (HSM)", "WAF & TLS 1.3 Strict"],
        },
        {
          name: "Services & Workers",
          components: ["Order Matching Consensus Engine", "Real-Time Fraud Evaluation Mesh", "Double-Entry Accounting Service"],
        },
        {
          name: "Data & Storage",
          components: ["PostgreSQL (RLS & Append-Only Logs)", "Apache Kafka Partition Mesh", "Redis In-Memory State"],
        },
        {
          name: "AI & Inference",
          components: ["Streaming Anomaly Detection Engine", "Graph Neural Fraud Classifier", "Automated Reconciliation Agent"],
        },
      ],
      stack: ["Rust / Go Core", "Apache Kafka", "PostgreSQL (RLS)", "OpenTelemetry", "Envoy Proxy", "Kubernetes"],
      milestones: [
        { title: "Accounting Invariants & Cryptographic Threat Analysis", weeks: "Weeks 1-2" },
        { title: "Event Partition Mesh & Consensus Engine Setup", weeks: "Weeks 3-6" },
        { title: "Fraud Detection Graph & Real-Time Ledger Sync", weeks: "Weeks 7-10" },
        { title: "Financial SOC2 Type II & Penetration Certification", weeks: "Weeks 11-13" },
      ],
      assumptions: [
        "Zero-tolerance for transaction loss; synchronous multi-AZ replication required for ledger entries.",
        "P99 latency budget strictly capped at 5ms for transactional validation.",
      ],
    };
  }

  // 3D / WebGL / Spatial / VR
  if (
    p.includes("3d") ||
    p.includes("spatial") ||
    p.includes("webgl") ||
    p.includes("three") ||
    p.includes("vr") ||
    p.includes("ar") ||
    p.includes("immersive")
  ) {
    return {
      summary:
        "High-performance spatial web architecture delivering 60-120 FPS interactive 3D viewports, progressive Draco geometry streaming, and real-time multi-user spatial presence.",
      layers: [
        {
          name: "Client Layer",
          components: ["Three.js / WebGL 2.0 Viewport", "Touch / Spatial Controller", "DOM Overlay Surface"],
        },
        {
          name: "Edge & Ingress",
          components: ["Edge Cloudflare Worker CDN", "WebSocket Presence Gateway", "WebRTC Spatial Audio Relay"],
        },
        {
          name: "Services & Workers",
          components: ["Progressive LOD Mesh Streamer", "Spatial Physics Simulation Daemon", "Multi-User State Synchronizer"],
        },
        {
          name: "Data & Storage",
          components: ["Draco GLTF Asset CDN", "Redis Memory Shard (Presence)", "PostgreSQL Scene Graph Store"],
        },
        {
          name: "AI & Inference",
          components: ["Generative 3D Mesh Optimization Agent", "Dynamic Lighting Neural Estimator", "Adaptive Frame Budgeter"],
        },
      ],
      stack: ["Three.js", "@react-three/fiber", "WebSockets", "Rust WebAssembly", "Redis", "Next.js 16"],
      milestones: [
        { title: "Spatial Viewport Architecture & Memory Budgets", weeks: "Weeks 1-2" },
        { title: "Draco Mesh Optimization & Asset Pipeline", weeks: "Weeks 3-5" },
        { title: "Multi-User WebSocket Sync & Physics Engine", weeks: "Weeks 6-8" },
        { title: "Cross-Device FPS Profiling (Mobile to Desktop)", weeks: "Weeks 9-11" },
      ],
      assumptions: [
        "Target framerate: deterministic 60 FPS on mid-tier mobile and 120 FPS on high-refresh displays.",
        "Total asset load payload budgeted under 4MB per primary scene.",
      ],
    };
  }

  // Default General Distributed Enterprise SaaS
  return {
    summary:
      "Enterprise-grade distributed SaaS platform architecture featuring deep RAG vector search, local agentic orchestration, and zero-downtime microservices.",
    layers: [
      {
        name: "Client Layer",
        components: ["Next.js 16 Enterprise Dashboard", "Interactive Canvas Viewport", "Admin Telemetry Panel"],
      },
      {
        name: "Edge & Ingress",
        components: ["Edge Routing Gateway (Envoy)", "OAuth2 / SAML SSO Authentication", "Rate-Limiting WAF"],
      },
      {
        name: "Services & Workers",
        components: ["Agentic Workflow Orchestrator", "Async Background Worker Queue", "Distributed Notification Service"],
      },
      {
        name: "Data & Storage",
        components: ["PostgreSQL with pgvector", "Redis Cache & Job Store", "S3 Compliant Blob Storage"],
      },
      {
        name: "AI & Inference",
        components: ["Hybrid RAG Pipeline (BM25 + Vector)", "Autonomous Decision Agents", "Model Guardrail Validator"],
      },
    ],
    stack: ["Next.js 16", "FastAPI / Python Core", "pgvector", "Redis / BullMQ", "Docker / Kubernetes", "OpenTelemetry"],
    milestones: [
      { title: "Domain Architecture & Schema Specification", weeks: "Weeks 1-2" },
      { title: "Core Services Implementation & Auth/RBAC", weeks: "Weeks 3-5" },
      { title: "Vector Ingestion & Agentic Pipeline Integration", weeks: "Weeks 6-8" },
      { title: "Production Cluster Hardening & Observability", weeks: "Weeks 9-11" },
    ],
    assumptions: [
      "Multi-tenant architecture with logical database separation and tenant-scoped encryption.",
      "Vector database index size initially provisioned for up to 10M embeddings with HNSW indexing.",
    ],
  };
}
