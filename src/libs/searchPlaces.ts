import { SearchParams } from "@/types/common";
import { PlaceResult, PlaceSearchResponse } from "@/types/googleMapApi";

/** 指定条件から場所を検索する */
const searchPlaces = async (lat: number, lng: number, searchParams: SearchParams) => {
  const fetchPlaces = async (token?: string) => {
    const url = new URL(
      `http://localhost:3000/api/searchPlace?lat=${lat}&lng=${lng}&distance=${searchParams.distance.toString()}`
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

    const res = await fetch(url);
    const data: PlaceSearchResponse = await res.json();
    return data;
  };

  try {
    const allPlaces: PlaceResult[] = [];
    const data1 = await fetchPlaces();
    // 最初の20件を追加
    allPlaces.push(...data1.results);
    if (data1.next_page_token) {
      // next_page_token が数秒後に有効になるので、固定で2秒待機
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const data2 = await fetchPlaces(data1.next_page_token);
      allPlaces.push(...data2.results);
      if (data2.next_page_token) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const data3 = await fetchPlaces(data2.next_page_token);
        allPlaces.push(...data3.results);
      }
    }

    return allPlaces.map((place) => ({
      isOpen: place.opening_hours?.open_now,
      photo: place.photos,
      placeId: place.place_id,
      placeName: place.name,
      placeTypes: place.types,
      rating: place.rating,
      ratingsTotal: place.user_ratings_total,
    }));
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in searchPlaces:", error.message);
    } else {
      console.error("Unknown error in searchPlaces");
    }
    throw error;
  }
};

/** 指定条件から場所を検索し、レビュー数でソートする */
export const sortedSearchPlaces = async (lat: number, lng: number, searchParams: SearchParams) => {
  /** 取得した場所 */
  const places = await searchPlaces(lat, lng, searchParams);

  /** レビュー数（ratingsTotal）でソートしたplaces */
  const sortedPlaces = places.sort((a, b) => {
    if (a.ratingsTotal === undefined) {
      return 1;
    }
    if (b.ratingsTotal === undefined) {
      return -1;
    }
    return b.ratingsTotal - a.ratingsTotal;
  });

  return sortedPlaces;
};
