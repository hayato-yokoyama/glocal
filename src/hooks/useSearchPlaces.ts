import { SearchParams } from "@/types/common";
import { LatLngLiteral, PlaceData } from "@googlemaps/google-maps-services-js";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getUrl = (searchParams: SearchParams, latLng?: LatLngLiteral) => {
  if (!latLng) {
    return null;
  }
  const url = new URL(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/nearbySearch/${latLng.lat}/${
      latLng.lng
    }/${searchParams.distance.toString()}`
  );
  if (searchParams.keyword) {
    url.searchParams.append("keyword", searchParams.keyword);
  }
  if (searchParams.genre) {
    url.searchParams.append("genre", searchParams.genre);
  }
  if (searchParams.isOpen) {
    url.searchParams.append("isOpen", "true");
  }
  return url.toString();
};

/** レビュー数の閾値ごとに場所を分類する */
const categorizePlaces = (places: Partial<PlaceData>[]) => {
  const sorted = [...places].sort((a, b) => {
    if (a.user_ratings_total === undefined) return 1;
    if (b.user_ratings_total === undefined) return -1;
    return b.user_ratings_total - a.user_ratings_total;
  });

  const filterByRange = (min: number, max: number) =>
    sorted.filter(
      (place) => place.user_ratings_total && place.user_ratings_total >= min && place.user_ratings_total < max
    );

  return {
    placesOver100: filterByRange(100, 300),
    placesOver1000: filterByRange(1000, 5000),
    placesOver10000: filterByRange(10000, Number.MAX_SAFE_INTEGER),
    placesOver300: filterByRange(300, 500),
    placesOver50: filterByRange(50, 100),
    placesOver500: filterByRange(500, 1000),
    placesOver5000: filterByRange(5000, 10000),
    placesUnder50: filterByRange(0, 50),
  };
};

/** 検索条件、緯度経度から場所を取得する */
export const useSearchPlaces = (searchParams: SearchParams, latLng?: LatLngLiteral) => {
  const {
    data: data,
    error: error,
    isLoading: isLoading,
  } = useSWR<Partial<PlaceData>[], Error>(getUrl(searchParams, latLng), fetcher);

  if (data === undefined) {
    return { data, error, isEmpty: false, isLoading };
  }

  return {
    data: categorizePlaces(data),
    error,
    isEmpty: data.length === 0,
    isLoading,
  };
};
