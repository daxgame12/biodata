import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const EVENTS_KEY = "biodata:events";
const MAX_EVENTS = 500;

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

function deviceFromUA(ua: string): string {
  if (/ipad|tablet/i.test(ua)) return "Tablet";
  if (/mobile|iphone|android/i.test(ua)) return "Mobile";
  return "Desktop";
}

function browserFromUA(ua: string): string {
  if (/edg\//i.test(ua)) return "Edge";
  if (/chrome\//i.test(ua) && !/edg\//i.test(ua)) return "Chrome";
  if (/safari\//i.test(ua) && !/chrome\//i.test(ua)) return "Safari";
  if (/firefox\//i.test(ua)) return "Firefox";
  return "Other";
}

export async function POST(request: NextRequest) {
  let body: { type?: string; referrer?: string } = {};
  try {
    body = await request.json();
  } catch {
    // no body / malformed JSON — treat as a plain pageview
  }

  const ua = request.headers.get("user-agent") ?? "";
  const event: TrackEvent = {
    type: body.type === "instagram_click" ? "instagram_click" : "pageview",
    time: new Date().toISOString(),
    city: request.headers.get("x-vercel-ip-city") ?? "Unknown",
    region: request.headers.get("x-vercel-ip-country-region") ?? "",
    country: request.headers.get("x-vercel-ip-country") ?? "Unknown",
    device: deviceFromUA(ua),
    browser: browserFromUA(ua),
    referrer: body.referrer ?? request.headers.get("referer") ?? "",
  };

  await Promise.allSettled([logEvent(event), notifyTelegram(event)]);

  return NextResponse.json({ ok: true });
}

async function logEvent(event: TrackEvent) {
  if (!redis) return;
  await redis.lpush(EVENTS_KEY, JSON.stringify(event));
  await redis.ltrim(EVENTS_KEY, 0, MAX_EVENTS - 1);
}

async function notifyTelegram(event: TrackEvent) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const label = event.type === "instagram_click" ? "Instagram tap" : "Page view";
  const location = [event.city, event.region, event.country].filter(Boolean).join(", ");
  const text = [
    label,
    location || "Unknown location",
    `${event.device} · ${event.browser}`,
    new Date(event.time).toLocaleString("en-US", { timeZone: "America/Toronto" }),
  ].join("\n");

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}
