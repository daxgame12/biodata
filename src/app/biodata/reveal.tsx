"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  /**
   * "image" — curtain-style wipe, used for gallery photos.
   * "hero-text" / "hero-photo" — a slower blur-to-sharp "focus pull"
   * reserved for the hero's name/tagline and first photo.
   * "glow" — the ambient light bloom behind the hero.
   * See the .reveal--* rules in globals.css for each curve.
   */
  variant?: "default" | "image" | "hero-text" | "hero-photo" | "glow";
};

const variantClassName: Record<NonNullable<RevealProps["variant"]>, string> = {
  default: "",
  image: "reveal--image",
  "hero-text": "reveal--hero-text",
  "hero-photo": "reveal--hero-photo",
  glow: "reveal--glow",
};

/**
 * Fades and lifts children into place the first time they enter the
 * viewport. One-shot and fully inert under prefers-reduced-motion via
 * the .reveal rules in globals.css.
 *
 * Visibility is decided by a plain scroll/resize position check rather
 * than IntersectionObserver — IntersectionObserver can behave
 * inconsistently across browsers/viewports (notably for elements
 * already in view when observation starts), which left photos stuck
 * invisible on some devices. Throttling is done with a plain
 * timestamp rather than requestAnimationFrame, since rAF itself gets
 * paused for backgrounded/inactive tabs on some platforms — this
 * check has no dependency on the page actually being painted.
 */
export function Reveal({ children, className = "", delayMs = 0, variant = "default" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    let lastCheck = 0;

    const check = () => {
      const now = Date.now();
      if (now - lastCheck < 100) return;
      lastCheck = now;

      const rect = node.getBoundingClientRect();
      // No lower bound on rect.bottom: an element that's already been
      // scrolled past (e.g. a large jump-scroll) should still resolve
      // to visible rather than staying stuck waiting for a scroll
      // event that passes back through its exact former position.
      if (rect.top < window.innerHeight * 0.92) {
        setVisible(true);
      }
    };

    check(); // catch anything already in view immediately
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [visible]);

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
