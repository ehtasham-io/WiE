"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { useReducedMotion } from "framer-motion";

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  // Lenis overrides native scroll physics, which fights the OS/browser
  // "reduce motion" setting. Fall back to plain native scrolling instead.
  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5 }}>
      {children}
    </ReactLenis>
  );
}