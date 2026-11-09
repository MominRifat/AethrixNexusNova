"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal button after user scrolls past 350px
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // Clean hash from URL if any
    if (window.location.hash) {
      window.history.pushState(null, "", window.location.pathname);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-[#17120a]/90 backdrop-blur-md border border-white/[0.12] hover:border-[#ffd426]/60 text-[#f5f3ee] hover:text-[#ffd426] shadow-[0_6px_24px_rgba(0,0,0,0.65)] hover:shadow-[0_0_24px_rgba(255,212,38,0.28)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd426] group"
        >
          <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
