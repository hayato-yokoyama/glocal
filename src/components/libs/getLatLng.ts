import { GeocodingResponse } from "@/types/googleMapApi";

/** 地名や施設名から緯度経度取得する（ジオコーディングする） */
export const getLatLng = async (address: string) => {
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
