import { filtering } from "@/app/page";
import SearchCard from "@/components/search/SearchCard";
import { SEARCH_PLACES } from "@/constants/search";
import { SearchPlaceFetchData } from "@/types/search";

const searchPage = async ({ params }: { params: { slug: string } }) => {
  // const fetchData: fetchData = await (
  //   await fetch("http://localhost:3000/api/searchPlace")
  // ).json();
  // const searchPlaces = fetchData.results;

  const searchParamsString = decodeURIComponent(params.slug);
  const searchParams: filtering = JSON.parse(searchParamsString);

  const fetchData: SearchPlaceFetchData = SEARCH_PLACES;
  const searchPlaces = fetchData.results;

  return (
    <div className="flex flex-col gap-y-4">
      <p>
        <span className="mr-0.5 text-lg font-bold">{searchParams.place}</span>
        での検索結果
      </p>
      {searchPlaces.map((place) => {
        return (
          <SearchCard
            key={place.place_id}
            // TODO: photoをAPIから取得するようにする
            photo="/mt.jpeg"
            place={place.name}
            placeTypes={place.types}
            rating={place.rating}
            ratingTotal={place.user_ratings_total}
          />
        );
      })}
    </div>
  );
};
export default searchPage;
