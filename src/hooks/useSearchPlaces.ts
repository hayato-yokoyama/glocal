import { SearchParams } from "@/types/common";
import { LatLng, PlaceSearchResponse } from "@/types/googleMapApi";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/** 検索条件、緯度経度から場所を取得する */
export const useSearchPlaces = (searchParams: SearchParams, latLng?: LatLng) => {
  const getUrl = (token?: string) => {
    if (!latLng) {
      return null;
    }
    const url = new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/searchPlace?lat=${latLng.lat}&lng=${
        latLng.lng
      }&distance=${searchParams.distance.toString()}`
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
    if (token) {
      url.searchParams.append("token", token);
    }
    return url.toString();
  };

  const searchPlaceUrl = getUrl();

  const { data, error, isLoading } = useSWR<PlaceSearchResponse, Error>(searchPlaceUrl, fetcher);

  return { data, error, isEmpty: data && data.results.length === 0, isLoading };
};
