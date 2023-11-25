import SearchCard from "@/components/search/SearchCard";
import { SearchParams } from "@/types/common";
import { GeocodingResponse, PlaceSearchResponse } from "@/types/googleMapApi";

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

/** 指定条件から場所を検索する */
const searchPlaces = async (lat: number, lng: number, radius: number) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.GOOGLE_MAPS_API_KEY}&location=${lat},${lng}&radius=${radius}&language=ja`;
    const res = await fetch(url);
    const data: PlaceSearchResponse = await res.json();
    const places = data.results.map((place) => ({
      isOpen: place.opening_hours?.open_now,
      photo: place.photos,
      placeId: place.place_id,
      placeName: place.name,
      placeTypes: place.types,
      rating: place.rating,
      ratingsTotal: place.user_ratings_total,
    }));
    return places;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in searchPlaces:", error.message);
    } else {
      console.error("Unknown error in searchPlaces");
    }
    throw error;
  }
};

const SearchPage = async ({ params }: { params: { slug: string } }) => {
  const searchParamsString = decodeURIComponent(params.slug);
  const searchParams: SearchParams = JSON.parse(searchParamsString);

  /** 緯度経度 { lat:緯度 lng:経度 } */
  const latLng = await getLatLng(searchParams.place);

  /** 取得した場所 */
  const places = await searchPlaces(
    latLng.lat,
    latLng.lng,
    searchParams.distance
  );

  return (
    <div className="flex flex-col gap-y-4">
      <p>{places[1].placeName}</p>
      {latLng && (
        <div>
          緯度: {latLng.lat}, 経度: {latLng.lng}
        </div>
      )}

      <p>
        <span className="mr-0.5 text-lg font-bold">{searchParams.place}</span>
        での検索結果
      </p>
      {places.map((place) => {
        return (
          <SearchCard
            key={place.placeId}
            photo={place.photo ? place.photo[0] : undefined}
            place={place.placeName}
            placeTypes={place.placeTypes}
            rating={place.rating ? place.rating : 0}
            ratingTotal={place.ratingsTotal ? place.ratingsTotal : 0}
          />
        );
      })}
    </div>
  );
};
export default SearchPage;
