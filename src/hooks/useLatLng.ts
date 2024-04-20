import { GeocodingResponse } from "@/types/googleMapApi";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/** 緯度経度を取得する */
export const useLatLng = (place: string) => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (place === "現在地") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            throw new Error("緯度経度の取得に失敗しました");
          }
        );
      } else {
        console.error("このブラウザでは、Geolocation APIがサポートされていません");
      }
    }
  }, [place]);

  const { data, error, isLoading } = useSWR<GeocodingResponse, Error>(
    place !== "現在地" ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/getLatLng?address=${place}` : null,
    fetcher
  );

  return {
    data: place === "現在地" ? { results: [{ geometry: { location: currentLocation } }] } : data,
    error,
    isEmpty: data && data.results.length === 0,
    isLoading,
  };
};
