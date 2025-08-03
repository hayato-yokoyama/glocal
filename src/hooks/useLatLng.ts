import { GeocodeResponseData, LatLngLiteral } from "@googlemaps/google-maps-services-js";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/** 緯度経度を取得する */
export const useLatLng = (place: string) => {
  const [currentLocation, setCurrentLocation] = useState<LatLngLiteral>({ lat: 0, lng: 0 });
  const [isCurrentLocationLoading, setIsCurrentLocationLoading] = useState(false);

  useEffect(() => {
    if (place === "現在地") {
      setIsCurrentLocationLoading(true);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setIsCurrentLocationLoading(false);
          },
          () => {
            setIsCurrentLocationLoading(false);
          }
        );
      } else {
        setIsCurrentLocationLoading(false);
        console.error("このブラウザでは、Geolocation APIがサポートされていません");
      }
    }
  }, [place]);

  const { data, error, isLoading } = useSWR<GeocodeResponseData, Error>(
    place !== "現在地" ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/geocode/${place}` : null,
    fetcher
  );

  if (place === "現在地") {
    return {
      data: currentLocation,
      error,
      isEmpty: false,
      isLoading: isCurrentLocationLoading,
    };
  }

  if (!data || data.status === "ZERO_RESULTS") {
    return {
      data: undefined,
      error,
      isEmpty: true,
      isLoading,
    };
  }

  return {
    data: data.results[0].geometry.location,
    error,
    isEmpty: false,
    isLoading,
  };
};
