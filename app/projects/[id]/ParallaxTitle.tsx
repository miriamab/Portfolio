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
      className="parallax-title-wrapper"
      style={{ 
        width: "100%", 
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
        boxSizing: "border-box",
        zIndex: 10,
        pointerEvents: "none"
      }}>
        <style>{`
          .parallax-title-wrapper {
            height: 40vh;
          }
          .parallax-title-container {
            padding: 0 2rem;
          }
          @media (max-width: 768px) {
            .parallax-title-wrapper {
              height: auto;
              padding: 5rem 0;
            }
            .parallax-title-container {
              padding: 0 1rem;
            }
          }
        `}</style>
        <div className="parallax-title-container" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }}>
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
    </div>
  );
}
