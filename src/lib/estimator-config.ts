/**
 * Estimator Configuration File
 *
 * All budget bands, project types, scale tiers, and milestone ranges can be edited here.
 * Values are clearly marked as INDICATIVE benchmarks per HONESTY rule in PROJECT_RULES.md.
 */

export interface ProjectTypeOption {
  id: string;
  title: string;
  tagline: string;
  iconName: "Globe" | "ShoppingBag" | "LayoutDashboard" | "Sparkles";
  baseRange: string;
}

export interface ScaleTierOption {
  id: string;
  title: string;
  badge: string;
  description: string;
  multiplier: number;
}

export interface TimelineOption {
  id: string;
  title: string;
  tagline: string;
}

export interface BudgetBandOption {
  id: string;
  label: string;
  range: string;
  description: string;
}

export const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: "business-website",
    title: "Modern Business & Corporate Website",
    tagline:
      "Fast, SEO-optimized corporate web presence with responsive layouts, CMS blog & inquiry lead forms.",
    iconName: "Globe",
    baseRange: "৳20,000 – ৳35,000",
  },
  {
    id: "ecommerce-store",
    title: "E-Commerce & Online Store",
    tagline:
      "Headless store with payment gateways (bKash, Nagad, Cards), product inventory, order webhooks & instant checkout.",
    iconName: "ShoppingBag",
    baseRange: "৳35,000 – ৳55,000",
  },
  {
    id: "custom-webapp",
    title: "Custom Web App & Management Portal",
    tagline:
      "Role-based admin dashboard, automated workflows, custom database, user auth & third-party API integrations.",
    iconName: "LayoutDashboard",
    baseRange: "৳55,000 – ৳80,000",
  },
  {
    id: "ai-3d-platform",
    title: "AI-Powered & 3D Interactive Platform",
    tagline:
      "Intelligent conversational AI agents, hardware-accelerated 3D WebGL viewports & smart enterprise automation.",
    iconName: "Sparkles",
    baseRange: "৳80,000 – ৳100,000+",
  },
];

export const SCALE_TIERS: ScaleTierOption[] = [
  {
    id: "mvp",
    title: "Standard Launch (Core Architecture)",
    badge: "Stage 01",
    description: "Clean modern design, full mobile responsiveness, fast edge loading, and core essential features.",
    multiplier: 1.0,
  },
  {
    id: "growth",
    title: "Growth Platform (Advanced Features)",
    badge: "Stage 02",
    description: "Custom admin panel, automated notifications, payment gateway reconciliation, and SEO optimization.",
    multiplier: 1.4,
  },
  {
    id: "enterprise",
    title: "Full-Scale Enterprise (High Availability)",
    badge: "Stage 03",
    description: "High-traffic surge architecture, multi-tiered security, real-time analytics, and 24/7 dedicated support.",
    multiplier: 1.8,
  },
];

export const TIMELINE_OPTIONS: TimelineOption[] = [
  { id: "2-3-weeks", title: "2 – 3 Weeks", tagline: "Fast Sprint Track" },
  { id: "4-6-weeks", title: "4 – 6 Weeks", tagline: "Standard Production Horizon" },
  { id: "2-3-months", title: "2 – 3 Months", tagline: "Comprehensive Full-Stack" },
  { id: "flexible", title: "Flexible Horizon", tagline: "Phased Milestone Delivery" },
];

export const BUDGET_BANDS: BudgetBandOption[] = [
  {
    id: "band-1",
    label: "Corporate Web Horizon",
    range: "৳20,000 – ৳35,000",
    description: "Modern business web presence, fast mobile responsiveness & lead capture forms.",
  },
  {
    id: "band-2",
    label: "E-Commerce & Growth Horizon",
    range: "৳35,000 – ৳55,000",
    description: "Full online store, product catalog, payment gateway (bKash/Nagad) & order sync.",
  },
  {
    id: "band-3",
    label: "Web App & SaaS Horizon",
    range: "৳55,000 – ৳80,000",
    description: "Custom management portal, role-based admin dashboard & automated business logic.",
  },
  {
    id: "band-4",
    label: "AI & 3D Enterprise Horizon",
    range: "৳80,000 – ৳100,000+",
    description: "Intelligent AI assistant agent, 3D WebGL interactive models & enterprise scale.",
  },
];

export const TYPICAL_DELIVERABLES = [
  "Modern responsive UI/UX tailored for desktop, tablet, and mobile devices",
  "Zero-technical-debt clean source code with 100% complete IP ownership",
  "Sub-second page load times with global Edge CDN caching & optimization",
  "Secure payment gateway & webhook integrations (bKash, Nagad, SSLCommerz)",
  "Full deployment on production server, SSL certificate, and domain configuration",
];
