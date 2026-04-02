"use client";

import { useRef } from "react";
import { useParallaxScroll } from "./useParallaxScroll";

export default function ParallaxScrollBlock({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useParallaxScroll(containerRef, contentRef, 0.3, false);

  return (
    <div 
      ref={containerRef}
      style={{
        width: "100%",
        zIndex: 5,
        position: "relative"
      }}
    >
      <div ref={contentRef} style={{ width: "100%" }}>
        {children}
      </div>
    </div>
  );
}
