"use client";

import { useRef } from "react";
import { useParallaxScroll } from "./useParallaxScroll";

interface Props {
  title: string;
  description: string;
}

export default function ParallaxTitle({ title, description }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useParallaxScroll(containerRef, contentRef, 0.3, false);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: "100%", 
        height: "40vh",
        backgroundColor: "#ffffff", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        zIndex: 5,
        position: "relative"
      }}
    >
      <div
        ref={contentRef}
        style={{
        display: "flex", 
        flexDirection: "column", 
        gap: "0.5rem",
        width: "100%",
        maxWidth: "1200px",
        padding: "0 2rem",
        boxSizing: "border-box",
        zIndex: 10,
        pointerEvents: "none"
      }}>
        <h1 style={{
          color: "#451eff",
          fontSize: "clamp(2.5rem, 5vw, 5rem)",
          fontWeight: 500,
          textAlign: "left",
          margin: "0 0 0 -0.05em",
          lineHeight: 0.85,
          fontFamily: "'Gasoek One', sans-serif",
          letterSpacing: "0.05em",
          pointerEvents: "auto"
        }}>
          {title}
        </h1>
        
        <div style={{ 
          fontFamily: "'Funnel Sans', sans-serif", 
          color: "#451eff", 
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginTop: "1.5rem",
          letterSpacing: "-0.03em",
          fontWeight: 500,
          pointerEvents: "auto"
        }}>
          <p style={{ margin: 0, fontSize: "1.25rem", lineHeight: 1.1 }}>{description}</p>
        </div>
      </div>
    </div>
  );
}
