import { LoadMore } from "@/components/load-more";
// import GalleryGrid from "./gallery-grid";
import { SearchForm } from "./search-form";
import UploadButton from "./upload-button";
import { unstable_noStore as noStore } from "next/cache";
import cloudinary from "cloudinary";

export type SearchResult = {
  public_id: string;
  tags: string[];
  folder: string;
};

export async function fetchImages({ query }: { query?: string }) {
  noStore();
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
        <div className="flex flex-col gap-4 xs:justify-between xs:flex-row">
          <h1 className="text-4xl font-bold w-full xs:w-auto">Gallery</h1>
          <UploadButton />
        </div>
        <SearchForm placeholder="Search by tags..." />
        {/* <GalleryGrid images={resources} /> */}
        <LoadMore images={resources} />
      </div>
    </section>
  );
}
