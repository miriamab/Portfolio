import { useEffect, useRef } from "react";

export function useParallaxScroll(
  containerRef: React.RefObject<HTMLDivElement | null>,
  contentRef: React.RefObject<HTMLDivElement | null>,
  speed: number = 0.3,
  clampToZero: boolean = false
) {
  const currentOffset = useRef(0);
  const targetOffset = useRef(0);
  const isInitialized = useRef(false);

  useEffect(() => {
    let rafId: number;

    const updateParallax = () => {
      if (containerRef.current && contentRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const containerCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const diff = containerCenter - viewportCenter;

        let offset = diff * speed;
        if (clampToZero) {
          offset = Math.max(0, offset);
        }

        targetOffset.current = offset;

        if (!isInitialized.current) {
          currentOffset.current = offset;
          isInitialized.current = true;
        } else {
          // Lerping for perfectly smooth, hardware-accelerated movement
          currentOffset.current += (targetOffset.current - currentOffset.current) * 0.08;
        }

        // Apply transform using translate3d
        contentRef.current.style.transform = `translate3d(0, ${currentOffset.current}px, 0)`;
      }

      rafId = requestAnimationFrame(updateParallax);
    };

    rafId = requestAnimationFrame(updateParallax);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [speed, clampToZero, containerRef, contentRef]);
}
