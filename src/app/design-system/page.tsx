import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

const PALETTE = [
  { name: "bg-0", hex: "#0a0805", role: "Primary Background" },
  { name: "bg-1", hex: "#120e08", role: "Secondary Background" },
  { name: "surface-1", hex: "#17120a", role: "Card Low Elevation" },
  { name: "surface-2", hex: "#1e1810", role: "Card High Elevation" },
  { name: "text", hex: "#f5f3ee", role: "Primary Heading & Copy" },
  { name: "text-2", hex: "#b7ae9c", role: "Secondary Text / Muted" },
  { name: "text-3", hex: "#7d7566", role: "Subtle Microcopy / Labels" },
  { name: "accent", hex: "#ffd426", role: "Primary Amber Accent (~10% max)" },
  { name: "ember", hex: "#ff9f1c", role: "Warm Highlight / Accent" },
  { name: "copper", hex: "#b45309", role: "Muted Warm Tone" },
  { name: "success", hex: "#34d399", role: "Telemetry / Live Node" },
  { name: "danger", hex: "#f87171", role: "Error / Critical Alert" },
  { name: "line", hex: "rgba(255,255,255,0.07)", role: "Subtle Border" },
  { name: "line-strong", hex: "rgba(255,255,255,0.14)", role: "Prominent Border" },
  { name: "line-accent", hex: "rgba(255,212,38,0.3)", role: "Active / Focus Border" },
];

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-[#0a0805] text-[#f5f3ee] py-16">
      <div className="site-container space-y-20">
        {/* Navigation & Header */}
        <div className="border-b border-white/[0.07] pb-8">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-mono text-[#ffd426] hover:underline mb-4"
          >
            &larr; Back to Home Verification Anchor
          </Link>
          <div className="flex items-center gap-3">
            <Badge withDot>Aethrix Nexus Nova</Badge>
            <span className="font-mono text-xs text-[#7d7566]">
              Internal Specification / Hidden Route
            </span>
          </div>
          <h1 className="mt-3 font-heading text-4xl sm:text-5xl font-bold tracking-tight">
            Design System &amp; Primitives
          </h1>
          <p className="mt-2 text-base text-[#b7ae9c] max-w-2xl">
            Obsidian Amber palette tokens, Space Grotesk / Plus Jakarta Sans typography scale,
            accessible focus indicators, and Framer Motion reveal primitives.
          </p>
        </div>

        {/* 1. Palette Swatches */}
        <section className="space-y-6">
          <h2 className="font-heading text-2xl font-bold text-[#f5f3ee]">
            1. Palette: Obsidian Amber
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {PALETTE.map((item) => (
              <div
                key={item.name}
                className="rounded-[16px] p-4 border border-white/[0.07] bg-[#120e08] space-y-3"
              >
                <div
                  className="h-14 w-full rounded-[10px] border border-white/[0.1] shadow-inner"
                  style={{ backgroundColor: item.hex }}
                />
                <div>
                  <div className="font-mono text-xs font-semibold text-[#f5f3ee]">
                    {item.name}
                  </div>
                  <div className="font-mono text-[11px] text-[#7d7566]">
                    {item.hex}
                  </div>
                  <div className="text-[11px] text-[#b7ae9c] mt-1 leading-tight">
                    {item.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Typography Scale */}
        <section className="space-y-6">
          <h2 className="font-heading text-2xl font-bold text-[#f5f3ee]">
            2. Typography Scale
          </h2>
          <Card className="space-y-8">
            <div>
              <span className="font-mono text-xs text-[#7d7566]">
                Heading 1 &middot; Space Grotesk 700 &middot; clamp(40px, 5vw, 64px)
              </span>
              <p className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f5f3ee] text-balance mt-1">
                Engineering Intelligent Realities
              </p>
            </div>

            <div className="border-t border-white/[0.07] pt-6">
              <span className="font-mono text-xs text-[#7d7566]">
                Heading 2 &middot; Space Grotesk 700 &middot; text-3xl / text-4xl
              </span>
              <p className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#f5f3ee] text-balance mt-1">
                Enterprise AI Solutions &amp; 3D Systems
              </p>
            </div>

            <div className="border-t border-white/[0.07] pt-6">
              <span className="font-mono text-xs text-[#7d7566]">
                Heading 3 &middot; Space Grotesk 600 &middot; text-xl / text-2xl
              </span>
              <p className="font-heading text-xl sm:text-2xl font-semibold tracking-tight text-[#f5f3ee] mt-1">
                High-Throughput Multi-Tenant Architecture
              </p>
            </div>

            <div className="border-t border-white/[0.07] pt-6">
              <span className="font-mono text-xs text-[#7d7566]">
                Body Copy &middot; Plus Jakarta Sans &middot; 1.65 line-height
              </span>
              <p className="text-base sm:text-lg text-[#b7ae9c] leading-[1.65] max-w-3xl mt-1">
                Aethrix Nexus Nova delivers high-concurrency systems, edge computing,
                and custom generative AI pipelines engineered to survive enterprise
                workloads. We engineer software where stability meets bleeding-edge spatial design.
              </p>
            </div>

            <div className="border-t border-white/[0.07] pt-6">
              <span className="font-mono text-xs text-[#7d7566]">
                Microcopy &amp; Technical Badges &middot; JetBrains Mono 12px
              </span>
              <p className="font-mono text-[12px] text-[#ffd426] tracking-wide mt-1">
                LATENCY: 14MS | THROUGHPUT: 120,000 REQ/SEC | ZERO DOWNTIME
              </p>
            </div>
          </Card>
        </section>

        {/* 3. Button Primitives */}
        <section className="space-y-6">
          <h2 className="font-heading text-2xl font-bold text-[#f5f3ee]">
            3. Buttons &amp; Interactive Triggers
          </h2>
          <Card className="space-y-8">
            <div>
              <h3 className="text-sm font-mono text-[#7d7566] uppercase mb-4">
                Primary Button (#ffd426 solid + #1a1305 text + static shadow)
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="lg">
                  Primary Large (lg)
                </Button>
                <Button variant="primary" size="md">
                  Primary Medium (md)
                </Button>
                <Button variant="primary" size="sm">
                  Primary Small (sm)
                </Button>
                <Button variant="primary" size="md" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            <div className="border-t border-white/[0.07] pt-6">
              <h3 className="text-sm font-mono text-[#7d7566] uppercase mb-4">
                Ghost Button (transparent + line-strong border + hover fill)
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="ghost" size="lg">
                  Ghost Large (lg)
                </Button>
                <Button variant="ghost" size="md">
                  Ghost Medium (md)
                </Button>
                <Button variant="ghost" size="sm">
                  Ghost Small (sm)
                </Button>
                <Button variant="ghost" size="md" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            <div className="border-t border-white/[0.07] pt-6">
              <h3 className="text-sm font-mono text-[#7d7566] uppercase mb-2">
                Accessible Focus-Visible Ring Test
              </h3>
              <p className="text-xs text-[#b7ae9c] mb-4">
                Use Tab key to verify visible 2px accent ring with 3px offset.
              </p>
              <div className="flex gap-4">
                <Button variant="primary" size="md">
                  Focus Me With Tab
                </Button>
                <Button variant="ghost" size="md">
                  Focus Next
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* 4. Badges & Pills */}
        <section className="space-y-6">
          <h2 className="font-heading text-2xl font-bold text-[#f5f3ee]">
            4. Badges &amp; Status Indicators
          </h2>
          <Card>
            <div className="flex flex-wrap items-center gap-4">
              <Badge>Standard Badge</Badge>
              <Badge withDot>Operational System</Badge>
              <Badge withDot>Autonomous Agent v2.4</Badge>
              <Badge>12px JetBrains Mono</Badge>
            </div>
          </Card>
        </section>

        {/* 5. Card Component & Radial Glow */}
        <section className="space-y-6">
          <h2 className="font-heading text-2xl font-bold text-[#f5f3ee]">
            5. Card Primitive (Hover translateY + radial glow)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <Badge withDot className="mb-4">
                AI / RAG
              </Badge>
              <h3 className="font-heading text-xl font-bold text-[#f5f3ee]">
                Dynamic Neural Search
              </h3>
              <p className="mt-2 text-sm text-[#b7ae9c]">
                Hover this card to inspect the subtle top radial amber glow (via ::before opacity)
                and smooth 4px vertical lift.
              </p>
            </Card>

            <Card>
              <Badge className="mb-4">Spatial 3D</Badge>
              <h3 className="font-heading text-xl font-bold text-[#f5f3ee]">
                WebGL Pipeline
              </h3>
              <p className="mt-2 text-sm text-[#b7ae9c]">
                Engineered with 60 FPS target and automatic fallback for reduced motion.
              </p>
            </Card>

            <Card>
              <Badge className="mb-4">Cloud Core</Badge>
              <h3 className="font-heading text-xl font-bold text-[#f5f3ee]">
                Multi-Tenant Django
              </h3>
              <p className="mt-2 text-sm text-[#b7ae9c]">
                Schema-isolated databases, zero shared state, and low-latency token streaming.
              </p>
            </Card>
          </div>
        </section>

        {/* 6. Reveal Motion Component */}
        <section className="space-y-6">
          <h2 className="font-heading text-2xl font-bold text-[#f5f3ee]">
            6. Reveal Animation Primitive (Framer Motion)
          </h2>
          <p className="text-sm text-[#b7ae9c]">
            Fades up 20px with cubic-bezier(0.22, 1, 0.36, 1) and staggered index delay.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((idx) => (
              <Reveal key={idx} index={idx}>
                <div className="p-4 rounded-[16px] bg-[#120e08] border border-white/[0.07] text-center">
                  <span className="font-mono text-xs text-[#ffd426]">
                    Stagger Node #{idx + 1}
                  </span>
                  <p className="text-xs text-[#7d7566] mt-1">
                    Delay: {idx * 0.1}s
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Section Wrapper Demo */}
        <section className="space-y-6">
          <h2 className="font-heading text-2xl font-bold text-[#f5f3ee]">
            7. Section Wrapper Component Preview
          </h2>
          <div className="border border-white/[0.14] rounded-[24px] overflow-hidden">
            <Section
              variant="bg-1"
              eyebrow="Preview Section"
              eyebrowDot
              title="Fluid Section Title with Eyebrow"
              description="Consistent clamp padding-block, alternating background token, and hairline divider support."
              withTopDivider
              withBottomDivider
            >
              <p className="text-sm text-[#b7ae9c]">
                Interior content container with strict 1240px max width and responsive padding.
              </p>
            </Section>
          </div>
        </section>

        {/* 8. Obsidian Amber Circular Reactor / Loading Spinner */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#f5f3ee]">
                8. Circular Loading Reactor (Obsidian Amber)
              </h2>
              <p className="text-sm text-[#b7ae9c] mt-1">
                Concentric multi-tiered SVG radar orbit with gradient sweep, orbiting satellite node, counter-rotating reticle, and pulsing geometric quantum core.
              </p>
            </div>
            <Badge withDot>Hardware-Accelerated</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* XS & SM */}
            <div className="p-6 rounded-[20px] bg-[#120e08] border border-white/[0.08] flex flex-col items-center justify-center gap-4">
              <span className="font-mono text-xs text-[#7d7566]">XS (18px) &amp; SM (28px)</span>
              <div className="flex items-center gap-6">
                <LoadingSpinner size="xs" />
                <LoadingSpinner size="sm" />
              </div>
              <span className="text-[11px] font-mono text-[#b7ae9c]">Buttons &amp; Badges</span>
            </div>

            {/* MD */}
            <div className="p-6 rounded-[20px] bg-[#120e08] border border-white/[0.08] flex flex-col items-center justify-center gap-4">
              <span className="font-mono text-xs text-[#7d7566]">MD (48px)</span>
              <LoadingSpinner size="md" label="Processing" />
              <span className="text-[11px] font-mono text-[#b7ae9c]">Cards &amp; Forms</span>
            </div>

            {/* LG */}
            <div className="p-6 rounded-[20px] bg-[#120e08] border border-white/[0.08] flex flex-col items-center justify-center gap-4">
              <span className="font-mono text-xs text-[#7d7566]">LG (72px)</span>
              <LoadingSpinner size="lg" label="Telemetry Sync" sublabel="Node // 120 FPS" />
              <span className="text-[11px] font-mono text-[#b7ae9c]">Modals &amp; Views</span>
            </div>

            {/* XL */}
            <div className="p-6 rounded-[20px] bg-[#120e08] border border-white/[0.08] flex flex-col items-center justify-center gap-4">
              <span className="font-mono text-xs text-[#7d7566]">XL (104px)</span>
              <LoadingSpinner size="xl" label="Architecture Core" sublabel="Matrix Online" />
              <span className="text-[11px] font-mono text-[#b7ae9c]">Route &amp; Suspense Transit</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
