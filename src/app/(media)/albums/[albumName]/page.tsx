import { SearchForm } from "@/app/(media)/gallery/search-form";
// import AlbumGrid from "./album-grid";
import { LoadMore } from "@/components/load-more";
import { unstable_noStore as noStore } from "next/cache";
import cloudinary from "cloudinary";
import { SearchResult } from "../../gallery/page";

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

export default async function GalleryPage({
  params: { albumName },
}: {
  params: {
    albumName: string;
  };
}) {
  const resources = await fetchAlbumDetail(albumName);

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Album {albumName}</h1>
        </div>
        <SearchForm placeholder="Search by tags..." />
        {/* <AlbumGrid images={resources} /> */}
        <LoadMore images={resources} />
      </div>
    </section>
  );
}
