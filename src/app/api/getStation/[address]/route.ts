import { StationResponse } from "@/types/common";
import { Effect } from "effect";
import { NextResponse } from "next/server";

/** 地名と同名の駅を取得する */
export async function GET(_: Request, { params }: { params: Promise<{ address: string }> }) {
  const { address } = await params;

  const program = Effect.tryPromise({
    catch: () => new Error("Error fetching station data"),
    try: async () => {
      const response = await fetch(`https://express.heartrails.com/api/json?method=getStations&name=${address}`);
      return response.json() as Promise<StationResponse>;
    },
  }).pipe(
    Effect.map((data) => NextResponse.json(data)),
    Effect.catchAll(() => Effect.succeed(NextResponse.json({ response: { error: "Error fetching station data" } })))
  );

  return Effect.runPromise(program);
}
