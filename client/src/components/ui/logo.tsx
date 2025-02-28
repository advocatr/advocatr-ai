
import React from "react";
import { cn } from "@/lib/utils";

// Default logo color if we need to render a text-based fallback
const LOGO_COLOR = "#C3B1E1";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10"
  };

  // Render a colored scales symbol as fallback
  return (
    <span 
      className={cn("inline-block", sizeClasses[size], className)} 
      style={{ color: LOGO_COLOR }}
    >
      ⚖
    </span>
  );
}
