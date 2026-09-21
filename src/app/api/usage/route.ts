import { NextResponse } from "next/server";
import { bump, readProject, writeProject, type Project } from "@/lib/store";

/**
 * Takes a report from a copy of forest whose owner opted in.
 *
 * The kit sends 5 fields and nothing else. This handler is the second half of
 * that promise: it reads those 5, ignores anything else in the body, and never
 * touches the request's IP or user agent.
 *
 * The funnel is built from `reached:N`, the number of distinct projects that
 * got at least as far as camp N. A project that jumps from camp 2 to camp 4
 * fills in 3 and 4, so the numbers only ever fall as N rises. That is what
 * makes "where do people stall" readable at a glance.
 *
 * The per-project record expires after 400 days. The counters are aggregate
 * and stay, so history survives while the pseudonymous record does not.
 */
export const dynamic = "force-dynamic";

const TEAMS = ["solo", "small", "larger"];
const TIMES = ["none", "minutes", "afternoon", "days", "weeks"];
/** Matches the id the kit generates: 16 hex characters, nothing else. */
const ID = /^[0-9a-f]{16}$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const id = typeof body.id === "string" ? body.id : "";
  if (!ID.test(id)) return NextResponse.json({ ok: false }, { status: 400 });

  const camp = Number(body.camp);
  const version = typeof body.version === "string" ? body.version.slice(0, 12) : "";
  const team = TEAMS.includes(String(body.team)) ? String(body.team) : "";
  const researchTime = TIMES.includes(String(body.researchTime))
    ? String(body.researchTime)
    : "";

  const before = await readProject(id);
  const keys: string[] = [];

  // First time this project has been seen.
  if (!before) {
    keys.push("projects:total");
    if (team) keys.push(`team:${team}`);
    if (researchTime) keys.push(`time:${researchTime}`);
  }

  // Fill in every camp between the last high-water mark and this one.
  const wasAt = before?.maxCamp ?? 0;
  const nowAt = Number.isInteger(camp) && camp >= 1 && camp <= 6 ? camp : wasAt;
  for (let n = wasAt + 1; n <= nowAt; n++) keys.push(`reached:${n}`);

  if (version && version !== before?.version) keys.push(`version:${version}`);

  await bump(keys);
  await writeProject(id, {
    maxCamp: Math.max(wasAt, nowAt),
    version: version || (before?.version ?? ""),
    team: team || (before?.team ?? ""),
    researchTime: researchTime || (before?.researchTime ?? ""),
  } satisfies Project);

  return NextResponse.json({ ok: true });
}
