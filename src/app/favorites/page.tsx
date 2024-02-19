import { SearchForm } from "../gallery/search-form";
import FavoritesList from "./favorites-list";
import { fetchImages } from "@/lib/data";

export default async function FavoritesPage() {
  const resources = await fetchImages({ query: "favorite" });

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Favorite Images</h1>
        </div>
        <SearchForm placeholder="Search by tags..." />
        <FavoritesList initialResources={resources} />
      </div>
    </section>
  );
}
