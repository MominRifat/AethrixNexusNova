"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { TheMastermindsModal } from "@/components/ui/TheMastermindsModal";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Expertise", href: "#expertise" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "AI Lab", href: "#lab" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMastermindsOpen, setIsMastermindsOpen] = useState(false);
  const [navLoadingTarget, setNavLoadingTarget] = useState<string | null>(null);
  const router = useRouter();
  const lastScrollY = useRef(0);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Enable glassmorphic style after 20px
      setIsScrolled(currentScrollY > 20);

      // Smart auto-hide on scroll down, instant reveal on scroll up
      if (currentScrollY <= 40) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 16) {
        // Scrolling down -> hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 16) {
        // Scrolling up -> reveal navbar
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileOpen(false);
    document.body.style.overflow = "";
  }, []);

  const openMobileMenu = () => {
    setIsMobileOpen(true);
    setIsVisible(true);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileOpen) {
        closeMobileMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen, closeMobileMenu]);

  // Single-click deterministic smooth navigation with Obsidian Amber loading transition
  const handleNavClick = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
      href: string,
      label: string
    ) => {
      e.preventDefault();

      if (isMobileOpen) {
        closeMobileMenu();
      }

      // If on another route (e.g. /design-system), redirect to home with hash
      if (typeof window !== "undefined" && window.location.pathname !== "/") {
        router.push(`/${href}`);
        return;
      }

      // Trigger high-tech loading transition
      setNavLoadingTarget(label);

      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }

      // Scroll immediately on first click
      const targetId = href.replace(/^#/, "");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        if (typeof window !== "undefined" && window.__lenisInstance) {
          window.__lenisInstance.scrollTo(targetElement, { offset: -80, duration: 1.0 });
        } else {
          const top =
            targetElement.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }

      // Update URL hash cleanly
      if (typeof window !== "undefined" && window.history.pushState) {
        window.history.pushState(null, "", href);
      }

      // Smoothly dismiss loading overlay
      loadingTimeoutRef.current = setTimeout(() => {
        setNavLoadingTarget(null);
      }, 550);
    },
    [isMobileOpen, closeMobileMenu, router]
  );

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === "/" || window.location.pathname === "") {
      e.preventDefault();
      if (typeof window !== "undefined" && window.__lenisInstance) {
        window.__lenisInstance.scrollTo(0, { duration: 1.0 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      if (window.location.hash) {
        window.history.pushState(null, "", "/");
      }
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full max-w-[100vw] overflow-hidden transition-[transform,background-color,backdrop-filter,border-color] duration-300 ease-in-out",
          isVisible ? "translate-y-0" : "-translate-y-full",
          isScrolled
            ? "bg-[#0a0805]/80 backdrop-blur-[14px] border-b border-white/[0.07] py-3.5"
            : "bg-transparent border-b border-transparent py-5"
        )}
      >
        <div className="site-container flex items-center justify-between w-full max-w-full sm:max-w-[1240px]">
          {/* Combined Brand Logo & Wordmark */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd426] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0805] rounded-md"
            aria-label="Aethrix Nexus Nova - Home"
          >
            <div className="relative flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shrink-0">
              <Image
                src="/brand-logo-v3.png"
                alt="Aethrix Nexus Nova"
                width={180}
                height={76}
                priority
                className="h-10 sm:h-11 w-auto object-contain shrink-0 drop-shadow-[0_0_16px_rgba(255,212,38,0.35)]"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.label)}
                className="relative text-sm font-medium text-[#b7ae9c] hover:text-[#f5f3ee] transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd426] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0805] rounded group cursor-pointer"
              >
                <span>{link.label}</span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#ffd426] transition-transform duration-200 ease-out group-hover:scale-x-100"
                />
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMastermindsOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-[#ffd426]/10 border border-white/[0.08] hover:border-[#ffd426]/40 text-xs font-mono text-[#f5f3ee] hover:text-[#ffd426] transition-all cursor-pointer shadow-sm group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffd426] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffd426]" />
              </span>
              <span>The Masterminds</span>
            </button>

            <Button
              variant="primary"
              size="sm"
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact", "Contact")}
            >
              Start a Project
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={isMobileOpen ? closeMobileMenu : openMobileMenu}
            className="flex md:hidden items-center justify-center shrink-0 w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg border border-white/[0.1] bg-[#17120a] text-[#f5f3ee] hover:text-[#ffd426] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd426]"
            aria-expanded={isMobileOpen}
            aria-label="Toggle mobile menu"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Navigation Loading Transition HUD Overlay */}
      {navLoadingTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0805]/75 backdrop-blur-md pointer-events-none select-none animate-in fade-in duration-200"
          role="status"
          aria-live="polite"
        >
          {/* Top Laser Scanning Bar */}
          <div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#ffd426] to-[#ff9f1c] shadow-[0_0_16px_#ffd426] animate-pulse" />

          {/* Center High-Tech Telemetry HUD */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#140f09]/95 border border-[#ffd426]/30 shadow-[0_0_40px_rgba(255,212,38,0.25)] flex flex-col items-center gap-3.5 text-center max-w-sm mx-4 animate-in zoom-in-95 duration-200">
            <LoadingSpinner size="md" />
            <div className="space-y-1">
              <h4 className="font-heading font-bold text-sm sm:text-base text-[#f5f3ee] tracking-wide uppercase">
                Routing to {navLoadingTarget}
              </h4>
              <p className="font-mono text-[11px] text-[#ffd426] tracking-widest uppercase">
                Aethrix Neural Transit // Synchronized
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Full-Screen Overlay Menu */}
      {isMobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-40 flex flex-col justify-between bg-[#0a0805]/98 px-6 pt-28 pb-10 md:hidden backdrop-blur-xl animate-in fade-in duration-200"
        >
          <nav className="flex flex-col gap-6" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.label)}
                style={{
                  animationDelay: `${idx * 60}ms`,
                }}
                className="font-heading text-2xl font-semibold text-[#f5f3ee] hover:text-[#ffd426] transition-colors border-b border-white/[0.06] pb-3"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-4 mt-8">
            <button
              type="button"
              onClick={() => {
                closeMobileMenu();
                setIsMastermindsOpen(true);
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] border border-[#ffd426]/30 text-left font-mono text-xs text-[#ffd426] cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#ffd426] animate-pulse" />
                <span className="font-semibold text-white">The Masterminds</span>
              </div>
              <span className="text-[11px] text-[#ffd426]">Leadership Council &rarr;</span>
            </button>

            <Button
              variant="primary"
              size="lg"
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact", "Contact")}
              className="w-full justify-center"
            >
              Start a Project
            </Button>
            <p className="font-mono text-xs text-center text-[#7d7566] uppercase tracking-wider">
              Autonomous Systems &middot; Spatial Web
            </p>
          </div>
        </div>
      )}

      {/* The Masterminds Modal Dialog */}
      <TheMastermindsModal
        isOpen={isMastermindsOpen}
        onClose={() => setIsMastermindsOpen(false)}
      />
    </>
  );
}
