import { Client } from "@googlemaps/google-maps-services-js";
import { NextRequest, NextResponse } from "next/server";

const client = new Client({});

export async function GET(request: NextRequest, { params }: { params: Promise<{ address: string }> }) {
  const { address } = await params;

  const response = await client.geocode({
    params: {
      address,
      key: process.env.GOOGLE_MAPS_API_KEY || "",
    },
  });
  const result = response.data;
  return NextResponse.json(result);
}
