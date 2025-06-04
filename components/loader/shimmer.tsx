"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonShimmerProps {
  className?: string;
  duration?: number;
  spread?: number;
  borderRadius?: string;
}

export function SkeletonShimmer({
  className,
  duration = 2,
  spread = 100,
  borderRadius = "8px",
}: SkeletonShimmerProps) {
  const MotionDiv = motion.div;

  return (
    <MotionDiv
      className={cn(
        "relative overflow-hidden bg-[length:250%_100%] rounded",
        "bg-[linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread))),linear-gradient(var(--base-color),var(--base-color))]",
        "dark:[--base-color:#27272a] dark:[--base-gradient-color:#ffffff]",
        "light:[--base-color:#e4e4e7] light:[--base-gradient-color:#000000]",
        className
      )}
      initial={{ backgroundPosition: "100% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{
        repeat: Infinity,
        duration,
        ease: "linear",
      }}
      style={
        {
          "--spread": `${spread}px`,
          "--base-color": "#e4e4e7",
          "--base-gradient-color": "#ffffff",
          borderRadius,
        } as React.CSSProperties
      }
    />
  );
}
