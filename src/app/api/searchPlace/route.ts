import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const distance = searchParams.get("distance");
  const keyword = searchParams.get("keyword");
  const genre = searchParams.get("genre");
  const isOpen = searchParams.get("isOpen");
  const token = searchParams.get("token");

  if (lat === null || lng === null) {
    throw new Error("lat or lng is null");
  }
  if (distance === null) {
    throw new Error("distance is null");
  }

  const url = getNearBySearchUrl(
    process.env.GOOGLE_MAPS_API_KEY as string,
    lat,
    lng,
    distance,
    keyword,
    genre,
    isOpen,
    token
  );

  const response = await fetch(url);
  const data = await response.json();
  return NextResponse.json(data);
}

const getNearBySearchUrl = (
  key: string,
  lat: string,
  lng: string,
  distance: string,
  keyword: string | null,
  genre: string | null,
  isOpen: string | null,
  token: string | null
) => {
  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
  );
  // Required parameters
  url.searchParams.append("key", key);
  url.searchParams.append("location", `${lat},${lng}`);
  url.searchParams.append("radius", distance);

  // Optional parameters
  url.searchParams.append("language", "ja");

  if (token) {
    // pagetokenをパラメータに含めるときは、その他のパラメータを含めないようにする
    url.searchParams.append("pagetoken", token);
    return url;
  }
  if (keyword) {
    url.searchParams.append("keyword", keyword);
  }
  if (genre) {
    url.searchParams.append("type", genre);
  }
  if (isOpen) {
    url.searchParams.append("opennow", "true");
  }
  return url;
};
