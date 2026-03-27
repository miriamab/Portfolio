
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useLayoutEffect, useEffect } from "react";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function RootActions({ children }: { children: React.ReactNode }) {
  return <>{children}</>; // temporary stub
}
