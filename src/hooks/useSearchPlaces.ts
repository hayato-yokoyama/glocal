import { SearchParams } from "@/types/common";
import { LatLng, PlaceSearchResponse } from "@/types/googleMapApi";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/** 2,3ページ目の待機時間付きfetcher */
const waitFetcher = async (url: string) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch(url);
  return response.json();
};

const getUrl = (searchParams: SearchParams, latLng?: LatLng, token?: string) => {
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

/** 検索条件、緯度経度から場所を取得する */
export const useSearchPlaces = (searchParams: SearchParams, latLng?: LatLng) => {
  const {
    data: data1,
    error: error1,
    isLoading: isLoading1,
  } = useSWR<PlaceSearchResponse, Error>(getUrl(searchParams, latLng), fetcher);
  const {
    data: data2,
    error: error2,
    isLoading: isLoading2,
  } = useSWR<PlaceSearchResponse, Error>(
    data1 && data1.next_page_token ? getUrl(searchParams, latLng, data1.next_page_token) : null,
    waitFetcher
  );
  const {
    data: data3,
    error: error3,
    isLoading: isLoading3,
  } = useSWR<PlaceSearchResponse, Error>(
    data2 && data2.next_page_token ? getUrl(searchParams, latLng, data2.next_page_token) : null,
    waitFetcher
  );

  // ローディング中の場合はローディング中を返す
  if (isLoading1 || isLoading2 || isLoading3) {
    return { data: undefined, error: undefined, isEmpty: false, isLoading: true };
  }

  // エラーがある場合はエラーを返す
  if (error1 || error2 || error3) {
    return { data: undefined, error: error1 || error2 || error3, isEmpty: false, isLoading: false };
  }

  // データが存在しない場合はデータを返さずに isEmpty を true にする
  if (data1 && data1.results.length === 0) {
    return { data: undefined, error: undefined, isEmpty: true, isLoading: false };
  }

  const combinedResults = [
    ...(data1 ? data1.results : []),
    ...(data2 ? data2.results : []),
    ...(data3 ? data3.results : []),
  ];

  return { data: combinedResults, error: undefined, isEmpty: combinedResults.length === 0, isLoading: false };
};
