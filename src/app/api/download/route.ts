import { NextResponse } from "next/server";
import { bump, today } from "@/lib/store";

/**
 * Counts a download, then hands over the file.
 *
 * The count happens on the server, so it works with JavaScript off and does
 * not depend on the host's analytics tier. Vercel's own custom events are a
 * paid feature, which is why this exists at all.
 *
 * No IP, no user agent, nothing about who asked. Two counters move.
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  await bump(["dl:total", `dl:${today()}`]);
  return NextResponse.redirect(new URL("/forest.zip", request.url), 302);
}
