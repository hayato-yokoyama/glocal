import { Client } from "@googlemaps/google-maps-services-js";
import { Effect } from "effect";
import { NextResponse } from "next/server";

const client = new Client({});

export async function GET(_request: Request, { params }: { params: Promise<{ address: string }> }) {
  const { address } = await params;

  const program = Effect.tryPromise({
    catch: (error) => new Error(`Geocode API failed: ${error}`),
    try: () =>
      client.geocode({
        params: {
          address,
          key: process.env.GOOGLE_MAPS_API_KEY || "",
        },
      }),
  }).pipe(
    Effect.map((response) => NextResponse.json(response.data)),
    Effect.catchAll((error) => Effect.succeed(NextResponse.json({ error: error.message }, { status: 500 })))
  );

  return Effect.runPromise(program);
}
