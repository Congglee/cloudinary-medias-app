import { SearchForm } from "@/app/(media)/gallery/search-form";
import { fetchAlbumDetail } from "@/lib/data";
// import AlbumGrid from "./album-grid";
import { LoadMore } from "@/components/load-more";

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
