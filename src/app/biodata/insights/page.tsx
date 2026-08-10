import { cookies } from "next/headers";
import type { Metadata } from "next";
import { Redis } from "@upstash/redis";
import { isAuthorized, INSIGHTS_COOKIE } from "@/lib/insights-auth";
import { InsightsLogin } from "./login-form";

export const metadata: Metadata = {
  title: "Insights — Dax Rajani",
  robots: { index: false, follow: false },
};

type TrackEvent = {
  type: "pageview" | "instagram_click";
  time: string;
  city: string;
  region: string;
  country: string;
  device: string;
  browser: string;
  referrer: string;
};

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

function parseEvent(entry: unknown): TrackEvent | null {
  try {
    const value = typeof entry === "string" ? JSON.parse(entry) : entry;
    return value && typeof value === "object" ? (value as TrackEvent) : null;
  } catch {
    return null;
  }
}

export default async function InsightsPage() {
  const cookieStore = await cookies();
  const authed = isAuthorized(cookieStore.get(INSIGHTS_COOKIE)?.value);

  if (!authed) {
    return <InsightsLogin />;
  }

  const raw = redis ? await redis.lrange<unknown>("biodata:events", 0, 199) : [];
  const events = raw.map(parseEvent).filter((e): e is TrackEvent => e !== null);

  const pageViews = events.filter((e) => e.type === "pageview").length;
  const instagramClicks = events.filter((e) => e.type === "instagram_click").length;

  return (
    <main className="min-h-screen bg-bio-canvas px-6 py-16 font-sans text-bio-ink sm:px-8">
      <div className="mx-auto max-w-[860px]">
        <h1 className="text-2xl font-semibold">Insights</h1>
        <p className="mt-2 text-sm text-bio-ink-muted">
          {pageViews} page views · {instagramClicks} Instagram taps
          {!redis && " — storage not configured yet"}
        </p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-bio-divider text-bio-ink-muted">
                <th className="py-3 pr-4 font-medium">Time</th>
                <th className="py-3 pr-4 font-medium">Event</th>
                <th className="py-3 pr-4 font-medium">Location</th>
                <th className="py-3 pr-4 font-medium">Device</th>
                <th className="py-3 pr-4 font-medium">Referrer</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, i) => (
                <tr key={i} className="border-b border-bio-divider/60">
                  <td className="py-3 pr-4 whitespace-nowrap">
                    {new Date(event.time).toLocaleString()}
                  </td>
                  <td className="py-3 pr-4">
                    {event.type === "instagram_click" ? "Instagram tap" : "Page view"}
                  </td>
                  <td className="py-3 pr-4">
                    {[event.city, event.region, event.country].filter(Boolean).join(", ") ||
                      "Unknown"}
                  </td>
                  <td className="py-3 pr-4 whitespace-nowrap">
                    {event.device} · {event.browser}
                  </td>
                  <td className="max-w-[220px] truncate py-3 pr-4">{event.referrer || "—"}</td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-bio-ink-muted">
                    No visits logged yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
