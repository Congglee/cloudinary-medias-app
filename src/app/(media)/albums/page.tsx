import { AlbumCard } from "./album-card";
import { CreateAlbumForm } from "./create-album-form";
import { unstable_noStore as noStore } from "next/cache";
import cloudinary from "cloudinary";

export type Folder = { name: string; path: string };

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

export default async function AlbumsPage() {
  const folders = await fetchFolders();

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 xs:justify-between xs:flex-row">
          <h1 className="text-4xl font-bold w-full xs:w-auto">Albums</h1>
          <CreateAlbumForm />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {folders.map((folder) => (
            <AlbumCard key={folder.path} folder={folder} />
          ))}
        </div>
      </div>
    </section>
  );
}
