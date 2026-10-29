import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const ADMIN_SESSION_COOKIE = "admin_session";
const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24;
const ADMIN_SESSION_SECRET_MIN_LENGTH = 32;

function getAdminSessionSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  return secret && secret.length >= ADMIN_SESSION_SECRET_MIN_LENGTH ? secret : null;
}

export function createAdminSessionToken(now = Date.now()): string | null {
  const secret = getAdminSessionSecret();
  if (!secret) return null;

  const issuedAt = Math.floor(now / 1000);
  const signature = createHmac("sha256", secret)
    .update(`admin-session:${issuedAt}`)
    .digest("hex");

  return `${issuedAt}.${signature}`;
}

export function verifyAdminSessionToken(
  token: string | undefined,
  now = Date.now()
): boolean {
  const secret = getAdminSessionSecret();
  if (!secret || !token) return false;

  const match = /^(\d{10})\.([a-f0-9]{64})$/.exec(token);
  if (!match) return false;

  const issuedAt = Number(match[1]);
  const currentTime = Math.floor(now / 1000);
  if (
    issuedAt > currentTime + 60 ||
    currentTime - issuedAt > ADMIN_SESSION_MAX_AGE_SECONDS
  ) {
    return false;
  }

  const expected = createHmac("sha256", secret)
    .update(`admin-session:${issuedAt}`)
    .digest();
  const received = Buffer.from(match[2], "hex");

  return received.length === expected.length && timingSafeEqual(received, expected);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export const adminSessionCookie = ADMIN_SESSION_COOKIE;
export const adminSessionMaxAge = ADMIN_SESSION_MAX_AGE_SECONDS;
