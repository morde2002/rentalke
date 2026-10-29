import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminSessionCookie } from "@/lib/admin-auth";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(adminSessionCookie);

  return NextResponse.json({ success: true });
}
