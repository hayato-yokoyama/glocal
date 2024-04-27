import { Client } from "@googlemaps/google-maps-services-js";
import { NextResponse } from "next/server";

const client = new Client({});

export async function GET(request: Request, { params }: { params: { address: string } }) {
  const response = await client.geocode({
    params: {
      address: params.address,
      key: process.env.GOOGLE_MAPS_API_KEY || "",
    },
  });
  const result = response.data;
  return NextResponse.json(result);
}
