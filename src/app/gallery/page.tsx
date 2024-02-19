import GalleryGrid from "./gallery-grid";
import { SearchForm } from "./search-form";
import UploadButton from "./upload-button";
import { fetchImages } from "@/lib/data";

export type SearchResult = {
  public_id: string;
  tags: string[];
  folder: string;
};

export default async function GalleryPage({
  searchParams,
}: {
  searchParams?: {
    search?: string;
  };
}) {
  const query = searchParams?.search;
  const resources = await fetchImages({ query });

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <UploadButton />
        </div>
        <SearchForm placeholder="Search by tags..." />
        <GalleryGrid images={resources} />
      </div>
    </section>
  );
}
