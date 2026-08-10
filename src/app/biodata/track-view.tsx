"use client";

import { useEffect } from "react";

/** Fires a single page-view beacon on mount. Renders nothing. */
export function TrackView() {
  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "pageview", referrer: document.referrer }),
      keepalive: true,
    }).catch(() => {});
  }, []);

  return null;
}
