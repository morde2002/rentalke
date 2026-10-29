import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminSessionCookie, adminSessionMaxAge, createAdminSessionToken } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  let body: { password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionToken = createAdminSessionToken();

  if (!adminPassword || !sessionToken) {
    return NextResponse.json(
      { error: "Admin authentication is not configured" },
      { status: 500 }
    );
  }

  if (typeof body.password !== "string" || body.password !== adminPassword) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(adminSessionCookie, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: adminSessionMaxAge,
    path: "/",
  });

  return NextResponse.json({ success: true });
}
