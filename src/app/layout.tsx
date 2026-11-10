import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { SITE_CONFIG } from "@/lib/site-config";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0805",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://aethrixnexus.nova"),
  title: {
    default: "Aethrix Nexus Nova | Enterprise AI, 3D Web & Resilient Architecture",
    template: "%s | Aethrix Nexus Nova",
  },
  description:
    "Engineering Intelligent Realities for the Enterprise Era. Pioneering autonomous AI systems, immersive 60-120 FPS 3D spatial web platforms, and zero-downtime distributed cloud architectures.",
  keywords: [
    "Enterprise AI",
    "Deep RAG Pipelines",
    "Three.js Spatial Web",
    "WebGL 3D",
    "Distributed Systems",
    "Autonomous Agents",
    "Zero-Downtime Cloud",
    "Next.js 16 Enterprise",
  ],
  authors: [{ name: "Aethrix Nexus Nova Engineering" }],
  creator: "Aethrix Nexus Nova",
  publisher: "Aethrix Nexus Nova",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aethrixnexus.nova",
    siteName: "Aethrix Nexus Nova",
    title: "Aethrix Nexus Nova | Enterprise IT & AI Architecture",
    description:
      "Engineering Intelligent Realities for the Enterprise Era. Autonomous AI systems, 3D spatial web & resilient cloud platforms.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Aethrix Nexus Nova Enterprise AI Architecture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aethrix Nexus Nova | Enterprise AI & 3D Web Architecture",
    description:
      "Engineering Intelligent Realities for the Enterprise Era. Autonomous AI systems, 3D spatial web & resilient cloud platforms.",
    images: ["/opengraph-image"],
    creator: "@AethrixNova",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon-v3.png" },
      { url: "/icon.svg" },
      { url: "/favicon-v3.ico" },
    ],
    apple: "/apple-icon.png",
  },
  verification: {
    google: "5BpQIi6ny1LrY051hPFSuJDeb7onsiU46NZjqGoYSyA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.brandName,
    url: "https://aethrixnexus.nova",
    logo: "https://aethrixnexus.nova/brand-logo-v3.png",
    description: SITE_CONFIG.tagline,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.contactPhone,
      contactType: "customer service",
      email: SITE_CONFIG.contactEmail,
    },
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        <meta name="google-site-verification" content="5BpQIi6ny1LrY051hPFSuJDeb7onsiU46NZjqGoYSyA" />
        <link rel="icon" href="/icon-v3.png" type="image/png" sizes="256x256" />
        <link rel="icon" href="/favicon-v3.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#0a0805] text-[#f5f3ee] antialiased selection:bg-[#ffd426]/20 selection:text-[#ffd426]">
        {/* Skip to Main Content Link for Keyboard Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#ffd426] focus:text-[#0a0805] focus:font-mono focus:text-xs focus:font-bold focus:rounded-lg focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#0a0805]"
        >
          Skip to main content
        </a>

        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
