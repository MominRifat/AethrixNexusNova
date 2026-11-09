"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { StaticNeuralFallback } from "./StaticNeuralFallback";
import { ThreeErrorBoundary } from "./ThreeErrorBoundary";

// Dynamic import of 3D Neural Architecture Core with SSR disabled and fallback
const NeuralCoreScene = dynamic(() => import("./NeuralCoreScene"), {
  ssr: false,
  loading: () => <StaticNeuralFallback />,
});

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("resize", callback);
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);

  return () => {
    window.removeEventListener("resize", callback);
    mediaQuery.removeEventListener("change", callback);
  };
}

function getClientSnapshot(): boolean {
  if (typeof window === "undefined") return true;

  // 1. Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // 2. Check mobile low-power or small viewport
  const isSmallScreen = window.innerWidth < 768;
  const isLowPowerDevice =
    typeof navigator !== "undefined" &&
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4;

  // 3. Check WebGL availability
  let hasWebGL = false;
  try {
    const canvas = document.createElement("canvas");
    hasWebGL = Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl"))
    );
  } catch {
    hasWebGL = false;
  }

  return prefersReducedMotion || isSmallScreen || isLowPowerDevice || !hasWebGL;
}

function getServerSnapshot(): boolean {
  return true;
}

export interface MobiusRibbonProps {
  isInView?: boolean;
}

export function MobiusRibbon({ isInView = true }: MobiusRibbonProps) {
  const shouldUseFallback = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  if (shouldUseFallback) {
    return <StaticNeuralFallback />;
  }

  return (
    <ThreeErrorBoundary fallback={<StaticNeuralFallback />}>
      <NeuralCoreScene isInView={isInView} />
    </ThreeErrorBoundary>
  );
}
