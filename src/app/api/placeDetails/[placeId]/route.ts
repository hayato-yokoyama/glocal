import { Client, Language } from "@googlemaps/google-maps-services-js";
import { NextResponse } from "next/server";

const client = new Client({});

export async function GET(request: Request, { params }: { params: { placeId: string } }) {
  const response = await client.placeDetails({
    params: {
      key: process.env.GOOGLE_MAPS_API_KEY || "",
      language: Language.ja,
      place_id: params.placeId,
    },
  });
  const result = response.data;
  return NextResponse.json(result);
}
