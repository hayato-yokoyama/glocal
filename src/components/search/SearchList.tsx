"use client";

import SearchNotFoundPlace from "@/components/search/SearchNotFoundPlace";
import { SearchParams } from "@/types/common";
import { GeocodingResponse } from "@/types/googleMapApi";
import useSWR from "swr";

type SearchListProps = {
  searchParams: SearchParams;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());
/**
 * 緯度経度取得
 * */
const useLatLng = (place: string) => {
  const { data, error, isLoading } = useSWR<GeocodingResponse, Error>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getLatLng?address=${place}`,
    fetcher
  );
  return { data, error, isEmpty: data && data.results.length === 0, isLoading };
};

const SearchList = ({ searchParams }: SearchListProps) => {
  const { data, error, isEmpty, isLoading } = useLatLng(searchParams.place);

  if (isLoading) {
    return <p>loading</p>;
  }
  if (error || !data) {
    return <p>エラーです</p>;
  }
  if (isEmpty) {
    return <SearchNotFoundPlace place={searchParams.place} />;
  }

  /** 緯度経度 { lat:緯度 lng:経度 } */
  const latLng = {
    lat: data.results[0].geometry.location.lat,
    lng: data.results[0].geometry.location.lng,
  };

  return (
    <div>
      <p>{`緯度${latLng.lat} 軽度${latLng.lng}`}</p>
    </div>
  );

  // /** 取得した場所 */
  // const places = await sortedSearchPlaces(latLng.lat, latLng.lng, searchParams);

  // if (places.length === 0) {
  //   return <SearchNotFound />;
  // }
  // return (
  //   <div className="mb-20 flex flex-col gap-y-4">
  //     {places.map((place) => {
  //       return (
  //         <SearchCard
  //           key={place.placeId}
  //           photo={place.photo ? place.photo[0] : undefined}
  //           place={place.placeName}
  //           placeTypes={place.placeTypes}
  //           rating={place.rating ? place.rating : 0}
  //           ratingTotal={place.ratingsTotal ? place.ratingsTotal : 0}
  //           placeId={place.placeId}
  //         />
  //       );
  //     })}
  //   </div>
  // );
};

export default SearchList;
