import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  withDot?: boolean;
  children: React.ReactNode;
}

export function Badge({
  withDot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full",
        "bg-[rgba(255,212,38,0.08)] border border-[rgba(255,212,38,0.28)]",
        "font-mono text-[12px] leading-none text-[#ffd426] tracking-wide uppercase select-none",
        className
      )}
      {...props}
    >
      {withDot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ffd426] opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ffd426]" />
        </span>
      )}
      {children}
    </span>
  );
}
