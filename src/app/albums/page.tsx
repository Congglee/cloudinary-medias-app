import { AlbumCard } from "./album-card";
import { fetchFolders } from "@/lib/data";
import { CreateAlbumForm } from "./create-album-form";

export type Folder = { name: string; path: string };

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
