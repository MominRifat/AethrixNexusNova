"use client";

import React, { useRef, useState } from "react";
import { Button, ButtonProps } from "./Button";
import { cn } from "@/lib/utils";

export interface MagneticButtonProps extends ButtonProps {
  maxShift?: number;
  wrapperClassName?: string;
}

export function MagneticButton({
  maxShift = 6,
  children,
  style,
  className,
  wrapperClassName,
  ...props
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window === "undefined" || !containerRef.current) return;

    // Check pointer capabilities and motion preference at interaction time
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || isReduced) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.22;
    const deltaY = (e.clientY - centerY) * 0.22;

    const clampedX = Math.max(-maxShift, Math.min(maxShift, deltaX));
    const clampedY = Math.max(-maxShift, Math.min(maxShift, deltaY));

    setPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const isFullWidth = className?.includes("w-full");

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition:
          position.x === 0 && position.y === 0
            ? "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
            : "transform 0.1s ease-out",
        willChange: "transform",
      }}
      className={cn(
        "inline-block",
        isFullWidth && "w-full sm:w-auto",
        wrapperClassName
      )}
    >
      <Button className={className} style={style} {...props}>
        {children}
      </Button>
    </div>
  );
}
