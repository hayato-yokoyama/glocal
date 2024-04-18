"use client";

import SearchNotFoundPlace from "@/components/search/SearchNotFoundPlace";
import { useLatLng } from "@/hooks/useLatLng";
import { SearchParams } from "@/types/common";
import { PlaceResult, PlaceSearchResponse } from "@/types/googleMapApi";
import { useEffect, useState } from "react";
import useSWR from "swr";

type SearchListProps = {
  searchParams: SearchParams;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useSearchPlaces = (lat: number, lng: number, searchParams: SearchParams) => {
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [nextPageToken, setNextPageToken] = useState<null | string>(null);

  const getUrl = (token?: string) => {
    const url = new URL(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/api/searchPlace?lat=${lat}&lng=${lng}&distance=${searchParams.distance.toString()}`
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
    return url;
  };

  const { data, error, isLoading } = useSWR<PlaceSearchResponse, Error>(
    nextPageToken ? getUrl(nextPageToken) : getUrl(),
    fetcher
  );

  useEffect(() => {
    if (data && data.next_page_token) {
      setNextPageToken(data.next_page_token);
    } else {
      setNextPageToken(null);
    }
    setPlaces((prevData) => [...prevData, ...(data ? data.results : [])]);
  }, [data]);

  return { data: places, error, isLoading };
};

const SearchList = ({ searchParams }: SearchListProps) => {
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });
  // const [searchPlaces, setSearchPlaces] = useState<PlaceResult[]>([]);

  const {
    data: latLngData,
    error: latLngError,
    isEmpty: isLatLngEmpty,
    isLoading: isLatLngLoading,
  } = useLatLng(searchParams.place);

  // const {
  //   data: searchPlacesData,
  //   error: searchPlacesError,
  //   isLoading: isSearchPlacesError,
  // } = useSearchPlaces(latLng.lat, latLng.lng, searchParams);

  useEffect(() => {
    console.log("LATLNG");
    if (latLngData && !isLatLngEmpty) {
      setLatLng(latLngData.results[0].geometry.location);
    }
  }, [latLngData, isLatLngEmpty]);

  // useEffect(() => {
  //   console.log("PLACES");
  //   setSearchPlaces(searchPlacesData);
  // }, [latLng]);

  if (isLatLngLoading) {
    return <p>緯度経度 検索中</p>;
  }
  if (isLatLngEmpty) {
    return <SearchNotFoundPlace place={searchParams.place} />;
  }

  return (
    <div>
      <p>{`緯度${latLng.lat} 軽度${latLng.lng}`}</p>
      {/* <div>
        <p>{searchPlaces[0] ? searchPlaces[0].name : ""}</p>
        <p>{searchPlaces[1] ? searchPlaces[1].name : ""}</p>
      </div> */}
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
