import { createHmac, timingSafeEqual } from "crypto";

export const INSIGHTS_COOKIE = "insights_session";

function sign(): string {
  const secret = process.env.INSIGHTS_PASSWORD ?? "";
  return createHmac("sha256", secret).update("authorized").digest("hex");
}

export function checkPassword(password: string): boolean {
  return !!process.env.INSIGHTS_PASSWORD && password === process.env.INSIGHTS_PASSWORD;
}

export function sessionToken(): string {
  return sign();
}

export function isAuthorized(cookieValue: string | undefined): boolean {
  if (!cookieValue || !process.env.INSIGHTS_PASSWORD) return false;
  const expected = Buffer.from(sign());
  const actual = Buffer.from(cookieValue);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
