import { Client, Language } from "@googlemaps/google-maps-services-js";
import { NextRequest, NextResponse } from "next/server";

const client = new Client({});

export async function GET(request: NextRequest, { params }: { params: Promise<{ placeId: string }> }) {
  const { placeId } = await params;

  const response = await client.placeDetails({
    params: {
      key: process.env.GOOGLE_MAPS_API_KEY || "",
      language: Language.ja,
      place_id: placeId,
    },
  });
  const result = response.data;
  return NextResponse.json(result);
}
