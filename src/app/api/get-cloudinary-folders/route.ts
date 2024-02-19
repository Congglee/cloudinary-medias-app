import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { Folder } from "@/app/albums/page";

export async function GET(request: NextRequest) {
  const { folders } = (await cloudinary.v2.api.root_folders()) as {
    folders: Folder[];
  };

  return NextResponse.json({ folders });
}
