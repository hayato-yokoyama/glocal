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

  return { data: sortedPlaces, error, isEmpty: data.length === 0, isLoading };
};
