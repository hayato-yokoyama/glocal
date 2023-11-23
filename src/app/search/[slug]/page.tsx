import SearchCard from "@/components/search/SearchCard";
import { SEARCH_PLACES } from "@/constants/search";
import { SearchParams } from "@/types/common";
import { GeocodingResponse } from "@/types/googleMapApi";
import { SearchPlaceFetchData } from "@/types/search";

/** 地名や施設名から緯度経度取得する（ジオコーディングする） */
const getLatLng = async (address: string) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch geocoding data. Status: ${res.status}`);
    }
    const data: GeocodingResponse = await res.json();

    if (data.results.length === 0) {
      throw new Error("No results found for the provided address.");
    }

    const latLng = {
      lat: data.results[0].geometry.location.lat,
      lng: data.results[0].geometry.location.lng,
    };
    return latLng;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in getLatLng:", error.message);
    } else {
      console.error("Unknown error in getLatLng");
    }
    throw error;
  }
};

const SearchPage = async ({ params }: { params: { slug: string } }) => {
  const searchParamsString = decodeURIComponent(params.slug);
  const searchParams: SearchParams = JSON.parse(searchParamsString);

  /** 緯度経度 { lat:緯度 lng:経度 } */
  const latLng = await getLatLng(searchParams.place);

  const fetchData: SearchPlaceFetchData = SEARCH_PLACES;
  const searchPlaces = fetchData.results;

  return (
    <div className="flex flex-col gap-y-4">
      {latLng && (
        <div>
          緯度: {latLng.lat}, 経度: {latLng.lng}
        </div>
      )}

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
export default SearchPage;
