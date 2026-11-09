import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero/Hero";
import { Expertise } from "@/components/sections/Expertise/Expertise";
import { Tech } from "@/components/sections/Tech/Tech";
import { Work } from "@/components/sections/Work/Work";
import { Deployments } from "@/components/sections/Deployments/Deployments";
import { Process } from "@/components/sections/Process/Process";
import { Lab } from "@/components/sections/Lab/Lab";
import { Estimator } from "@/components/sections/Estimator/Estimator";
import { Contact } from "@/components/sections/Contact/Contact";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0805]">
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Step 2: Hero Section */}
        <Hero />

        {/* Step 3A: Core Expertise Bento Grid */}
        <Expertise />

        {/* Step 3B: Tech Ecosystem & Filterable Radar */}
        <Tech />

        {/* Step 4A: Featured Work Section */}
        <Work />

        {/* Client Protocol & Proven Production Deployments */}
        <Deployments />

        {/* Step 4B: Process Section */}
        <Process />

        {/* Step 5: Interactive AI Solution Architect */}
        <Lab />

        {/* Step 6A: Project Scope & Budget Estimator */}
        <Estimator />

        {/* Step 6B: Contact & Lead Capture */}
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
