import { Client, Language } from "@googlemaps/google-maps-services-js";
import { Effect } from "effect";
import { NextResponse } from "next/server";

const client = new Client({});

export async function GET(_: Request, { params }: { params: Promise<{ placeId: string }> }) {
  const { placeId } = await params;

  const program = Effect.tryPromise({
    catch: (error) => new Error(`PlaceDetails API failed: ${error}`),
    try: () =>
      client.placeDetails({
        params: {
          key: process.env.GOOGLE_MAPS_API_KEY || "",
          language: Language.ja,
          place_id: placeId,
        },
      }),
  }).pipe(
    Effect.map((response) => NextResponse.json(response.data)),
    Effect.catchAll((error) => Effect.succeed(NextResponse.json({ error: error.message }, { status: 500 })))
  );

  return Effect.runPromise(program);
}
