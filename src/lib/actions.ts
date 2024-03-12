"use server";

import { SearchResult } from "@/app/(media)/gallery/page";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";
import { fetchAlbumDetail, fetchImages } from "./data";

export async function createFolder(album: string) {
  await cloudinary.v2.api.create_folder(album);
  revalidatePath("/albums");
}

export async function deleteImage(imagePublicIds: string[]) {
  await cloudinary.v2.api.delete_resources(imagePublicIds);
}

export async function deleteFolder(album: string) {
  try {
    await cloudinary.v2.api.delete_folder(album);
  } catch (error) {
    throw new Error("Folder is not empty");
  }
  revalidatePath("/albums");
}

export async function addImageToAlbum(image: SearchResult, album: string) {
  try {
    let parts = image.public_id.split("/");
    if (parts.length > 1) {
      parts = parts.slice(1);
    }
    const publicId = parts.join("/");

    await cloudinary.v2.uploader.rename(
      image.public_id,
      `${album}/${publicId}`
    );
    if (image.folder !== "") {
      await fetchAlbumDetail(image.folder); // Not optimized yet, looking for another solution 〒▽〒
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to move image to an album");
  }
  revalidatePath("/albums/[albumName]", "page"); // revalidatePath failed to update resource images with the latest data (dynamic path)
}

export async function setAsFavoriteAction(
  publicId: string,
  isFavorite: boolean
) {
  if (isFavorite) {
    await cloudinary.v2.uploader.add_tag("favorite", [publicId]);
  } else {
    await cloudinary.v2.uploader.remove_tag("favorite", [publicId]);
  }
  revalidatePath("/gallery");
  revalidatePath("/favorites");
  await fetchImages({}); // Fix the error that state isFavorited is not updated 😭
}
