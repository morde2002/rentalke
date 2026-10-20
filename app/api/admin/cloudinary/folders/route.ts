import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const baseFolder = "media/properties";

function getAuthHeaders() {
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
  return {
    Authorization: `Basic ${auth}`,
    "Content-Type": "application/json",
  };
}

async function getFolders(path = baseFolder) {
  if (!cloudName || !apiKey || !apiSecret) {
    return [];
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/folders/${encodeURIComponent(path)}`;
  const response = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  return (data.folders || []).map((folder: { name: string }) => folder.name);
}

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || baseFolder;
  const folders = await getFolders(path);

  return NextResponse.json({ folders, baseFolder });
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const folderPath = body?.path;

  if (!folderPath) {
    return NextResponse.json({ error: "Folder path is required" }, { status: 400 });
  }

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ error: "Cloudinary credentials not configured" }, { status: 500 });
  }

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/folders`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ path: folderPath }),
  });

  if (!response.ok) {
    const error = await response.text();
    return NextResponse.json({ error: error || "Unable to create folder" }, { status: 500 });
  }

  return NextResponse.json({ success: true, folder: folderPath });
}
