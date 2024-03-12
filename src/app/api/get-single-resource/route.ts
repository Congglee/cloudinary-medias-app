import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const publicId = searchParams.get("publicId") || "";
  const resource = (await cloudinary.v2.api.resource(publicId)) as {
    resource: { width: number; height: number };
  };
  return NextResponse.json({ resource });
}
