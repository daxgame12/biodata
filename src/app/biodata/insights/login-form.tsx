"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export function InsightsLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/insights-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (res.ok) {
      router.refresh();
    } else {
      setError(true);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-bio-canvas px-6 font-sans text-bio-ink">
      <form onSubmit={handleSubmit} className="w-full max-w-[320px]">
        <h1 className="text-xl font-semibold">Insights</h1>
        <p className="mt-2 text-sm text-bio-ink-muted">Enter the password to continue.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="mt-6 w-full rounded-xl border border-bio-divider bg-bio-canvas-alt px-4 py-3 text-base outline-none focus-visible:border-bio-accent"
        />
        {error && <p className="mt-2 text-sm text-red-600">Incorrect password.</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-full bg-bio-accent px-6 py-3 text-sm font-semibold text-bio-accent-ink transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Checking…" : "Continue"}
        </button>
      </form>
    </main>
  );
}
