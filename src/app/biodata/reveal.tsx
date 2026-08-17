"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  /**
   * "image" — curtain-style wipe, used for gallery photos.
   * "hero-text" / "hero-photo" — a slower blur-to-sharp "focus pull"
   * reserved for the hero's name/tagline and first photo. See the
   * .reveal--* rules in globals.css for each curve.
   */
  variant?: "default" | "image" | "hero-text" | "hero-photo";
};

const variantClassName: Record<NonNullable<RevealProps["variant"]>, string> = {
  default: "",
  image: "reveal--image",
  "hero-text": "reveal--hero-text",
  "hero-photo": "reveal--hero-photo",
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

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setVisible(true);
      observer.disconnect();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) reveal();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);

    // Safety net: some browsers don't reliably fire the observer for
    // elements already intersecting when observation starts — notably
    // above-the-fold content (like the hero) on a tall/wide viewport
    // where nothing needs scrolling into view. Re-check shortly after
    // mount so nothing gets stuck invisible.
    const fallback = window.setTimeout(() => {
      if (done) return;
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) reveal();
    }, 200);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${variantClassName[variant]} ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
