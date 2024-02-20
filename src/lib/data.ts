"use server";

import { unstable_noStore as noStore } from "next/cache";
import cloudinary from "cloudinary";
import { SearchResult } from "@/app/(media)/gallery/page";
import { Folder } from "@/app/(media)/albums/page";

export async function fetchImages({ query }: { query?: string }) {
  try {
    const searchBuilder = cloudinary.v2.search
      .expression(`resource_type:image${query ? ` AND tags=${query}` : ""}`)
      .sort_by("created_at", "desc")
      .with_field("tags")
      .max_results(200);

    const { resources } = (await searchBuilder.execute()) as {
      resources: SearchResult[];
      next_cursor: string;
    };

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
