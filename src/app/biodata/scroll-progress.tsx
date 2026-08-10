"use client";

import { useEffect, useState } from "react";

/**
 * Thin top-edge progress bar tracking scroll position. Stays hidden while
 * the hero is in view — Endowed Progress / Zeigarnik effect: once a viewer
 * has committed to reading past the hero, showing how much is left
 * increases the odds they scroll to the end instead of abandoning midway.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const scrollTop = window.scrollY;
      const heroThreshold = window.innerHeight * 0.8;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollTop > heroThreshold);
      setProgress(max > 0 ? Math.min(scrollTop / max, 1) : 0);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-x-0 top-0 z-50 h-[3px] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="h-full bg-bio-accent" style={{ width: `${progress * 100}%` }} />
    </div>
  );
}
