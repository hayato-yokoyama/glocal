"use client";

import SearchCard from "@/components/search/SearchCard";
import { SearchParams } from "@/types/common";
import { LatLng } from "@/types/googleMapApi";

/** 地名や施設名から緯度経度取得する（ジオコーディングする） */
const getLatLng = (address: string): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK" && results) {
        const location = results[0].geometry.location;
        resolve({
          lat: location.lat(),
          lng: location.lng(),
        });
      } else {
        reject(
          "Geocode was not successful for the following reason: " + status
        );
      }
    });
  });
};

/** 指定条件から場所を検索する */
const searchPlaces = (
  latLng: LatLng,
  searchParams: SearchParams
): Promise<google.maps.places.PlaceResult[]> => {
  return new Promise((resolve, reject) => {
    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );
    const request: google.maps.places.PlaceSearchRequest = {
      keyword: searchParams.keyword,
      location: new google.maps.LatLng(latLng.lat, latLng.lng),
      openNow: searchParams.isOpen,
      radius: searchParams.distance,
      type: searchParams.genre,
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        resolve(results);
      } else {
        reject("Search was not successful for the following reason: " + status);
      }
    });
  });
};

const SearchPage = async ({ params }: { params: { slug: string } }) => {
  const searchParamsString = decodeURIComponent(params.slug);
  const searchParams: SearchParams = JSON.parse(searchParamsString);

  /** 緯度経度 { lat:緯度 lng:経度 } */
  const latLng = await getLatLng(searchParams.place);

  /** 取得した場所 */
  const places = await searchPlaces(latLng, searchParams);

  /** レビュー数（ratingsTotal）でソートしたplaces */
  const sortedPlaces = places.sort((a, b) => {
    if (a.user_ratings_total === undefined) {
      return 1;
    }
    if (b.user_ratings_total === undefined) {
      return -1;
    }
    return b.user_ratings_total - a.user_ratings_total;
  });

  return (
    <div className="flex flex-col gap-y-4">
      <p>検索件数 {sortedPlaces.length}件</p>
      <p>
        <span className="mr-0.5 text-lg font-bold">{searchParams.place}</span>
        での検索結果
      </p>
      {sortedPlaces.map((place) => {
        return (
          <SearchCard
            key={place.place_id}
            // photo={place.photo ? place.photo[0] : undefined}
            place={place.name || "unnamed"}
            placeTypes={place.types || []}
            rating={place.rating || 0}
            ratingTotal={
              place.user_ratings_total ? place.user_ratings_total : 0
            }
          />
        );
      })}
    </div>
  );
};
export default SearchPage;
