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

  /** レビュー数でソートしたplaces */
  const sortedPlaces = data.sort((a, b) => {
    if (a.user_ratings_total === undefined) {
      return 1;
    }
    if (b.user_ratings_total === undefined) {
      return -1;
    }
    return b.user_ratings_total - a.user_ratings_total;
  });

  /** レビュー数の範囲でフィルタリングする */
  const filterByRatingTotalRange = (
    places: Partial<PlaceData>[],
    minTotal: number,
    maxTotal: number
  ): Partial<PlaceData>[] => {
    return places.filter(
      (place) => place.user_ratings_total && place.user_ratings_total >= minTotal && place.user_ratings_total < maxTotal
    );
  };

  const placesOver10000 = filterByRatingTotalRange(sortedPlaces, 10000, Number.MAX_SAFE_INTEGER);
  const placesOver5000 = filterByRatingTotalRange(sortedPlaces, 5000, 10000);
  const placesOver1000 = filterByRatingTotalRange(sortedPlaces, 1000, 5000);
  const placesOver500 = filterByRatingTotalRange(sortedPlaces, 500, 1000);
  const placesOver300 = filterByRatingTotalRange(sortedPlaces, 300, 500);
  const placesOver100 = filterByRatingTotalRange(sortedPlaces, 100, 300);
  const placesOver50 = filterByRatingTotalRange(sortedPlaces, 50, 100);
  const placesUnder50 = filterByRatingTotalRange(sortedPlaces, 0, 50);

  return {
    data: {
      placesOver100,
      placesOver1000,
      placesOver10000,
      placesOver300,
      placesOver50,
      placesOver500,
      placesOver5000,
      placesUnder50,
    },
    error,
    isEmpty: data.length === 0,
    isLoading,
  };
};
