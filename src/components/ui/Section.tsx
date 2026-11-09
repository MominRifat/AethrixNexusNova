import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  variant?: "bg-0" | "bg-1";
  eyebrow?: string;
  eyebrowDot?: boolean;
  title?: string;
  description?: string;
  withTopDivider?: boolean;
  withBottomDivider?: boolean;
  children: React.ReactNode;
}

export function Section({
  id,
  variant = "bg-0",
  eyebrow,
  eyebrowDot = false,
  title,
  description,
  withTopDivider = false,
  withBottomDivider = false,
  className,
  children,
  ...props
}: SectionProps) {
  const bgStyles = {
    "bg-0": "bg-[#0a0805]",
    "bg-1": "bg-[#120e08]",
  };

  return (
    <section
      id={id}
      className={cn(
        "relative w-full py-[clamp(80px,10vw,140px)]",
        bgStyles[variant],
        className
      )}
      {...props}
    >
      {withTopDivider && (
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.14] to-transparent pointer-events-none"
        />
      )}

      <div className="site-container">
        {(eyebrow || title || description) && (
          <div className="mb-12 md:mb-16 max-w-2xl">
            {eyebrow && (
              <div className="mb-3">
                <Badge withDot={eyebrowDot}>{eyebrow}</Badge>
              </div>
            )}
            {title && (
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f5f3ee] text-balance">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base sm:text-lg text-[#b7ae9c] leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        {children}
      </div>

      {withBottomDivider && (
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.14] to-transparent pointer-events-none"
        />
      )}
    </section>
  );
}
