"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function OverscrollBackground() {
  const pathname = usePathname();

  useEffect(() => {
    let bgColor = "#fbfbfb"; // default from globals.css

    if (pathname === "/projects" || pathname === "/about") {
      bgColor = "#451eff";
    } else if (pathname?.startsWith("/projects/")) {
      bgColor = "#ffffff";
    }

    document.body.style.backgroundColor = bgColor;
    document.documentElement.style.backgroundColor = bgColor;

    // Optional: Set theme-color meta tag for mobile browsers
    let metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.setAttribute("name", "theme-color");
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute("content", bgColor);

    return () => {
      // In Next.js App router, navigating restores defaults if needed, 
      // but it's safe to just let the effect handle changes.
    };
  }, [pathname]);

  return null;
}