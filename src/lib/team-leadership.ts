export interface LeaderProfile {
  id: string;
  name: string;
  role: string;
  title: string;
  emoji: string;
  monogram: string;
  bio: string;
  coreFocus: string[];
  portfolioUrl?: string;
  image?: string; // Reserved for user's photo upload
}

export const LEADERSHIP_TEAM: LeaderProfile[] = [
  {
    id: "momin-ali-rifat",
    name: "Momin Ali Rifat",
    role: "Co-founder & CEO",
    title: "Chief Executive Officer",
    emoji: "👑",
    monogram: "MR",
    bio: "Spearheads organizational strategy, global client partnerships, and high-stakes enterprise technology execution across international markets.",
    coreFocus: ["Strategic Expansion", "Global Client Partnerships", "Enterprise Delivery"],
    portfolioUrl: "#",
  },
  {
    id: "kamrul-hasan-siam",
    name: "Kamrul Hasan Siam",
    role: "Co-founder & Executive Director",
    title: "Executive Director",
    emoji: "⚡",
    monogram: "KS",
    bio: "Directs enterprise delivery workflows, client relationship protocols, and end-to-end product engineering lifecycles with high-standard precision.",
    coreFocus: ["Product Strategy", "Client Protocol Governance", "Operational Scaling"],
    portfolioUrl: "#",
  },
  {
    id: "montasim-kabir-mahin",
    name: "Montasim Kabir Mahin",
    role: "Co-founder & CTO",
    title: "Chief Technology Officer",
    emoji: "🧠",
    monogram: "MM",
    bio: "Architects fault-tolerant distributed backends, AI/ML inference pipelines, hardware-accelerated 3D systems, and high-concurrency cloud infrastructure.",
    coreFocus: ["Distributed Architectures", "AI Inference Pipelines", "Core Infrastructure"],
    portfolioUrl: "#",
  },
];
