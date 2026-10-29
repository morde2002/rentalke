import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

function getAuthHeaders() {
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
  return {
    Authorization: `Basic ${auth}`,
    "Content-Type": "application/json",
  };
}

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ folders: [] });
  }

  const { pathname } = new URL(request.url);
  const path = pathname.split("/cloudinary/folders/").pop() || "media/properties";
  const decodedPath = decodeURIComponent(path);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/folders/${encodeURIComponent(decodedPath)}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    return NextResponse.json({ folders: [] });
  }

  const data = await response.json();
  return NextResponse.json({ folders: data.folders || [] });
}
