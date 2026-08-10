import { NextRequest, NextResponse } from "next/server";
import { checkPassword, sessionToken, INSIGHTS_COOKIE } from "@/lib/insights-auth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({ password: "" }));
  const password = typeof body.password === "string" ? body.password : "";

  if (!checkPassword(password)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(INSIGHTS_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return response;
}
