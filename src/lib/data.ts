"use server";

import { unstable_noStore as noStore } from "next/cache";
import cloudinary from "cloudinary";
import { Folder } from "@/app/albums/page";
import { SearchResult } from "@/app/gallery/page";

export async function fetchImages({
  query,
  limit = 30,
}: {
  query?: string;
  limit?: number;
}) {
  try {
    const { resources } = (await cloudinary.v2.search
      .expression(`resource_type:image${query ? ` AND tags=${query}` : ""}`)
      .sort_by("created_at", "desc")
      .with_field("tags")
      .max_results(limit)
      .execute()) as { resources: SearchResult[] };
    return resources;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch cloudinary images.");
  }
}

export async function fetchFolders() {
  noStore();
  try {
    const { folders } = (await cloudinary.v2.api.root_folders()) as {
      folders: Folder[];
    };
    return folders;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch cloudinary folders data.");
  }
}

export async function fetchAlbumDetail(albumName: string) {
  noStore();
  try {
    const { resources } = (await cloudinary.v2.search
      .expression(`resource_type:image AND folder=${albumName}`)
      .sort_by("created_at", "desc")
      .with_field("tags")
      .max_results(30)
      .execute()) as { resources: SearchResult[] };

    return resources;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch cloudinary album folder detail data.");
  }
}
