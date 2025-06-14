"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

interface ResizablePanelsProps {
  children: React.ReactNode;
  defaultSize?: number;
  className?: string;
}

export default function ResizablePanels({
  children,
  defaultSize = 40,
  className,
}: ResizablePanelsProps) {
  const childrenArray = React.Children.toArray(children);
  const [isStable, setIsStable] = useState(false);

  // Set isStable to true after initial render and sizing
  useEffect(() => {
    // Using requestAnimationFrame ensures we're after the browser paint
    const frame = requestAnimationFrame(() => {
      // And setTimeout adds a small buffer to ensure everything is settled
      const timer = setTimeout(() => {
        setIsStable(true);
      }, 50);

      return () => clearTimeout(timer);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="h-full w-full">
      <ResizablePrimitive.PanelGroup
        direction="horizontal"
        className={cn("h-full w-full", className)}
        // This onLayout callback helps ensure proper initial sizing
        onLayout={() => {
          if (!isStable) setIsStable(true);
        }}
      >
        <ResizablePrimitive.Panel
          defaultSize={defaultSize}
          minSize={30}
          maxSize={75}
          className={cn(
            "overflow-auto transition-opacity duration-100",
            !isStable && "opacity-95"
          )} // Subtle visual cue during initial layout
        >
          {childrenArray[0]}
        </ResizablePrimitive.Panel>
        <ResizableHandle />
        <ResizablePrimitive.Panel minSize={30} className="overflow-auto">
          {childrenArray[1]}
        </ResizablePrimitive.Panel>
      </ResizablePrimitive.PanelGroup>
    </div>
  );
}

function ResizableHandle() {
  return (
    <ResizablePrimitive.PanelResizeHandle className="relative flex w-2 items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-1.5 data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&:hover]:bg-primary/20 transition-colors group">
      <GripVertical className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </ResizablePrimitive.PanelResizeHandle>
  );
}
