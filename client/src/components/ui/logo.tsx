import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  return (
    <img
      src="/client/ssrc/components/ui/advocatr-logo-500px.png"
      alt="Advocatr Logo"
      className={cn(sizeClasses[size], className)}
    />
  );
}
