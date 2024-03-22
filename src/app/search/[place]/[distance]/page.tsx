import SearchCard from "@/components/search/SearchCard";
import SearchNotFoundPlace from "@/components/search/SearchNotFoundPlace";
import { SearchParams } from "@/types/common";
import {
  GeocodingResponse,
  PlaceResult,
  PlaceSearchResponse,
} from "@/types/googleMapApi";
import Image from "next/image";
import Link from "next/link";

/** 地名や施設名から緯度経度取得する（ジオコーディングする） */
const getLatLng = async (address: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/getLatLng?address=${address}`
    );

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
    return;
  }
};

/** 指定条件から場所を検索する */
const searchPlaces = async (
  lat: number,
  lng: number,
  searchParams: SearchParams
) => {
  const fetchPlaces = async (token?: string) => {
    const res = await fetch(
      `http://localhost:3000/api/searchPlace?lat=${lat}&lng=${lng}&distance=${searchParams.distance.toString()}&keyword=${
        searchParams.keyword
      }&genre=${searchParams.genre}&isOpen=${searchParams.isOpen}&${
        token && `token=${token}`
      }`,
      {
        cache: "no-store",
      }
    );
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

const SearchPage = async ({
  params,
  searchParams,
}: {
  params: { distance: number; place: string };
  searchParams: { genre?: string; isOpen?: boolean; keyword?: string };
}) => {
  const formattedSearchParams: SearchParams = {
    distance: params.distance,
    genre: searchParams.genre ? decodeURIComponent(searchParams.genre) : "",
    isOpen: searchParams.isOpen ? true : false,
    keyword: searchParams.keyword
      ? decodeURIComponent(searchParams.keyword)
      : "",
    place: decodeURIComponent(params.place),
  };

  /** 緯度経度 { lat:緯度 lng:経度 } */
  const latLng = await getLatLng(formattedSearchParams.place);

  if (!latLng) {
    return <SearchNotFoundPlace place={formattedSearchParams.place} />;
  }

  /** 取得した場所 */
  const places = await searchPlaces(
    latLng.lat,
    latLng.lng,
    formattedSearchParams
  );

  if (places.length === 0) {
    return (
      <div className="relative">
        <div className="flex h-[calc(100vh_-_90px)] flex-col items-center justify-center font-bold">
          <p>検索条件にヒットする場所がありませんでした🙇‍♂️</p>
        </div>
        <Link
          href="/"
          className="bg-primary-400 absolute bottom-2 flex w-full items-center justify-center gap-x-2 rounded-full p-4 font-bold"
        >
          <Image src="/search.svg" width={20} height={20} alt="" />
          検索画面に戻る
        </Link>
      </div>
    );
  }

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

  return (
    <div className="flex flex-col gap-y-4">
      <span>
        <span className="mr-0.5 text-lg font-bold">
          {formattedSearchParams.place}
        </span>
        での検索結果
      </span>
      <span>検索件数 {sortedPlaces.length}件</span>
      {sortedPlaces.map((place) => {
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
