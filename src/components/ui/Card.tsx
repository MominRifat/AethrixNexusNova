import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-[24px] overflow-hidden p-6 sm:p-8",
        "bg-gradient-to-b from-[#1e1810] to-[#17120a]",
        "border border-white/[0.07]",
        "transition-transform duration-300 ease-out hover:-translate-y-1",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[24px]",
        "before:bg-[radial-gradient(circle_at_50%_0%,rgba(255,212,38,0.12),transparent_70%)]",
        "before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
