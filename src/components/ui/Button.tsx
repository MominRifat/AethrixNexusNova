import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      external,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans tracking-tight select-none cursor-pointer transition-[transform,opacity,background-color,border-color,color] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd426] focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#0a0805] disabled:pointer-events-none disabled:opacity-50";

    const variantStyles = {
      primary:
        "bg-[#ffd426] text-[#1a1305] font-semibold shadow-[0_2px_14px_rgba(255,212,38,0.16)] hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.99]",
      ghost:
        "bg-transparent text-[#f5f3ee] border border-white/[0.14] hover:bg-[rgba(255,212,38,0.12)] hover:border-[#ffd426]/40 hover:text-[#ffd426] hover:-translate-y-[1px] active:translate-y-0",
    };

    const sizeStyles = {
      sm: "h-9 px-3.5 text-xs rounded-[10px] gap-1.5",
      md: "h-11 px-5 text-sm rounded-[10px] gap-2",
      lg: "h-13 px-6 text-base rounded-[16px] gap-2.5",
    };

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClassName}
          >
            {children}
          </a>
        );
      }

      return (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
