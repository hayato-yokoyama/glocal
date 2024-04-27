import { Client } from "@googlemaps/google-maps-services-js";
import { NextResponse } from "next/server";

const client = new Client({});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  const params = {
    address: address || "",
    key: process.env.GOOGLE_MAPS_API_KEY || "",
  };

  const response = await client.geocode({ params });
  const result = response.data;
  return NextResponse.json(result);
}
