"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  /** "image" swaps the translateY rise for a slower fade + scale-to-rest,
   *  the treatment photos read best with. See globals.css for the curve. */
  variant?: "default" | "image";
};

/**
 * Fades and lifts children into place the first time they enter the
 * viewport. One-shot (unobserves after triggering) and fully inert under
 * prefers-reduced-motion via the .reveal rules in globals.css.
 */
export function Reveal({ children, className = "", delayMs = 0, variant = "default" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${variant === "image" ? "reveal--image" : ""} ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
