"use client";

import { useEffect, useRef, useState } from "react";

interface Dot {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  vx: number;
  vy: number;
  colorIntensity: number;
}

interface MousePosition {
  x: number;
  y: number;
  age: number;
}

export default function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const mouseTrailRef = useRef<MousePosition[]>([]);
  const animationRef = useRef<number>(0);
  const frameCountRef = useRef(0);
  const scrollRef = useRef(0);
  const [canvasHeight, setCanvasHeight] = useState(0);

  const DOT_SPACING = 20;
  const DOT_RADIUS = 1.2;
  const MOUSE_RADIUS = 130;
  const DOT_COLOR = "rgba(200, 200, 200, 0.5)";
  const TRAIL_LENGTH = 50;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getPageHeight = () => {
      return Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
    };

    const initDots = () => {
      const dots: Dot[] = [];
      // Berechne Dots für die gesamte Seite
      const pageHeight = getPageHeight();
      const cols = Math.ceil(window.innerWidth / DOT_SPACING) + 1;
      const rows = Math.ceil(pageHeight / DOT_SPACING) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * DOT_SPACING;
          const y = j * DOT_SPACING;
          dots.push({ x, y, originalX: x, originalY: y, vx: 0, vy: 0, colorIntensity: 0 });
        }
      }
      dotsRef.current = dots;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight; // Canvas ist nur Viewport groß
      initDots();
    };

    const animate = () => {
      ctx.fillStyle = '#fbfbfb';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      frameCountRef.current++;

      // Berechne document-relative Position aus viewport-Position + aktuellem Scroll
      const currentScrollY = window.scrollY;
      const mouseDocX = mouseRef.current.x;
      const mouseDocY = mouseRef.current.y + currentScrollY;

      // Trail System
      if (frameCountRef.current % 2 === 0 && mouseRef.current.x > -500) {
        const lastPos = mouseTrailRef.current[0];
        if (!lastPos || 
            Math.abs(lastPos.x - mouseDocX) > 2 || 
            Math.abs(lastPos.y - mouseDocY) > 2) {
          mouseTrailRef.current.unshift({ 
            x: mouseDocX, 
            y: mouseDocY, 
            age: 0 
          });
        }
      }
      
      mouseTrailRef.current = mouseTrailRef.current
        .map(pos => ({ ...pos, age: pos.age + 1 }))
        .filter(pos => pos.age < TRAIL_LENGTH);

      // Update alle Dots
      dotsRef.current.forEach((dot) => {
        // Berechne Distanz zur Maus
        const dx = mouseDocX - dot.originalX;
        const dy = mouseDocY - dot.originalY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const easedDistance = Math.max(0, 1 - Math.pow(distance / MOUSE_RADIUS, 2));
        
        let targetX = dot.originalX;
        let targetY = dot.originalY;
        let targetColorIntensity = 0;
        
        // Primärer Maus-Effekt
        if (distance < MOUSE_RADIUS && easedDistance > 0) {
          const angle = Math.atan2(dy, dx);
          const force = easedDistance * easedDistance;
          targetX = dot.originalX + Math.cos(angle) * force * 15;
          targetY = dot.originalY + Math.sin(angle) * force * 15;
          targetColorIntensity = Math.pow(easedDistance, 1.5);
        } else if (distance < MOUSE_RADIUS * 1.2) {
          const angle = Math.atan2(dy, dx);
          const minForce = Math.max(0, 0.03 - distance / (MOUSE_RADIUS * 30));
          targetX = dot.originalX + Math.cos(angle) * minForce * 2;
          targetY = dot.originalY + Math.sin(angle) * minForce * 2;
        }

        // Trail-Effekt
        mouseTrailRef.current.forEach((trailPos, index) => {
          if (index === 0) return;
          
          const trailStrength = 1 - (trailPos.age / TRAIL_LENGTH);
          const tdx = trailPos.x - dot.originalX;
          const tdy = trailPos.y - dot.originalY;
          const tDistance = Math.sqrt(tdx * tdx + tdy * tdy);
          const effectiveRadius = MOUSE_RADIUS * (1.0 + trailStrength * 0.8);

          if (tDistance < effectiveRadius) {
            const tEasedDistance = Math.max(0, 1 - Math.pow(tDistance / effectiveRadius, 2));
            const force = tEasedDistance * tEasedDistance * trailStrength * 0.3;
            
            if (force > 0) {
              const angle = Math.atan2(tdy, tdx);
              targetX += Math.cos(angle) * force * 6;
              targetY += Math.sin(angle) * force * 6;
              targetColorIntensity = Math.max(targetColorIntensity, Math.pow(tEasedDistance, 1.2) * trailStrength * 0.8);
            }
          }
        });

        const hasEffect = targetX !== dot.originalX || targetY !== dot.originalY;

        if (hasEffect) {
          const springStrength = 0.15;
          const damping = 0.75;
          
          dot.vx = (dot.vx + (targetX - dot.x) * springStrength) * damping;
          dot.vy = (dot.vy + (targetY - dot.y) * springStrength) * damping;
          dot.x += dot.vx;
          dot.y += dot.vy;

          dot.colorIntensity += (targetColorIntensity - dot.colorIntensity) * 0.15;
        } else {
          const springStrength = 0.08;
          const damping = 0.85;
          
          dot.vx = (dot.vx + (dot.originalX - dot.x) * springStrength) * damping;
          dot.vy = (dot.vy + (dot.originalY - dot.y) * springStrength) * damping;
          dot.x += dot.vx;
          dot.y += dot.vy;
          
          dot.colorIntensity *= 0.92;
        }

        // Zeichnen
        if (dot.colorIntensity > 0.01) {
          const r = Math.round(200 + (69 - 200) * dot.colorIntensity);
          const g = Math.round(200 + (30 - 200) * dot.colorIntensity);
          const b = Math.round(200 + (255 - 200) * dot.colorIntensity);
          const alpha = 0.5 + dot.colorIntensity * 0.5;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        } else {
          ctx.fillStyle = DOT_COLOR;
        }

        // Konvertiere zu Viewport-Koordinaten für das Zeichnen
        const renderY = dot.y - currentScrollY;

        // Nur zeichnen wenn im Viewport sichtbar
        if (renderY > -DOT_SPACING && renderY < canvas.height + DOT_SPACING) {
          ctx.beginPath();
          ctx.arc(dot.x, renderY, DOT_RADIUS, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Speichere viewport-relative Position
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    // Initial setup
    resize();
    handleScroll();

    // Resize observer for content changes
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(document.body);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll);
    animate();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
