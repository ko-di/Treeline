/**
 * Counters, kept in Upstash Redis over its REST API.
 *
 * REST rather than a client library because route handlers are serverless:
 * a new connection per invocation is the wrong shape, and REST has none.
 *
 * Everything here is aggregate. The one exception is `proj:<id>`, which holds
 * a random id the kit generated on its own machine. That is pseudonymous
 * personal data, so it carries an expiry and nothing else about it is kept:
 * no IP, no user agent, no name, nothing from the project itself.
 *
 * With no credentials set, every call is a no-op that returns null. The site
 * then works exactly as before, minus the counting. Measurement is never a
 * reason for a page to fail.
 */

const URL_ENV =
  process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? "";
const TOKEN_ENV =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? "";

export const storeConfigured = Boolean(URL_ENV && TOKEN_ENV);

/** A project record expires after this many seconds: 400 days. */
const PROJECT_TTL = 400 * 24 * 60 * 60;

type Command = (string | number)[];

async function send(commands: Command[]): Promise<unknown[] | null> {
  if (!storeConfigured) return null;
  try {
    const res = await fetch(`${URL_ENV}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN_ENV}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commands),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const out = (await res.json()) as { result?: unknown; error?: string }[];
    return out.map((r) => (r && "result" in r ? r.result : null));
  } catch {
    // A counter that cannot be written is not worth an error page.
    return null;
  }
}

export async function bump(keys: string[]): Promise<void> {
  if (!keys.length) return;
  await send(keys.map((k) => ["INCR", k]));
}

export async function readNumbers(keys: string[]): Promise<number[]> {
  const out = await send(keys.map((k) => ["GET", k]));
  if (!out) return keys.map(() => 0);
  return out.map((v) => (typeof v === "string" ? Number(v) || 0 : 0));
}

export type Project = {
  /** The furthest camp this project has reported, 0 if it has only just started. */
  maxCamp: number;
  version: string;
  team: string;
  researchTime: string;
};

export async function readProject(id: string): Promise<Project | null> {
  const out = await send([["GET", `proj:${id}`]]);
  const raw = out?.[0];
  if (typeof raw !== "string") return null;
  try {
    return JSON.parse(raw) as Project;
  } catch {
    return null;
  }
}

export async function writeProject(id: string, p: Project): Promise<void> {
  await send([["SET", `proj:${id}`, JSON.stringify(p), "EX", PROJECT_TTL]]);
}

/** Today as YYYY-MM-DD, so a daily counter needs no clock arithmetic later. */
export function today(): string {
  return new Date().toISOString().slice(0, 10);
}
