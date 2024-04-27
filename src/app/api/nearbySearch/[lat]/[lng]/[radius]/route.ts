import { Client, Language, PlaceData } from "@googlemaps/google-maps-services-js";
import { NextResponse } from "next/server";

const client = new Client({});

export async function GET(request: Request, { params }: { params: { lat: string; lng: string; radius: string } }) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword");
  const genre = searchParams.get("genre");
  const isOpen = searchParams.get("isOpen");

  let nextPageToken = undefined;
  let results: Partial<PlaceData>[] = [];

  // 最大3ページまで取得する
  for (let i = 0; i < 3; i++) {
    const response = await client.placesNearby({
      params: {
        key: process.env.GOOGLE_MAPS_API_KEY || "",
        keyword: keyword || undefined,
        language: Language.ja,
        location: [Number(params.lat), Number(params.lng)],
        opennow: isOpen === "true",
        pagetoken: nextPageToken,
        radius: Number(params.radius),
        type: genre || undefined,
      },
    });

    results = results.concat(response.data.results);

    // 次のページのトークンがあれば取得し、なければループを抜ける
    if (response.data.next_page_token) {
      nextPageToken = response.data.next_page_token;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } else {
      break;
    }
  }
  return NextResponse.json(results);
}
