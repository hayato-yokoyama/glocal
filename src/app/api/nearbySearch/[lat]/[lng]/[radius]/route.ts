import { Client, Language, PlaceData } from "@googlemaps/google-maps-services-js";
import { Effect } from "effect";
import { NextRequest, NextResponse } from "next/server";

const client = new Client({});

const FOOD_GROUP_TYPES = ["restaurant", "cafe", "bar", "bakery"] as const;

/**
 * 実際の NearbySearch API の代わりに `src/mocks/nearbySearch.json` を返すかどうか。
 * `.env.local` で `USE_MOCK_NEARBY_SEARCH=true` を指定したときだけ有効になる。
 * 未指定なら開発環境でも実 API を叩くため、ジャンル分岐や重複排除がそのまま動作する。
 */
const useMockNearbySearch = process.env.USE_MOCK_NEARBY_SEARCH === "true";

type SearchCondition = {
  isOpen: string | null;
  keyword: string | null;
  type: string | undefined;
};

/** 検索条件から場所の一覧を取得する。実 API 版とモック版で同じ形にすることで後続の処理を共通化する */
type PlacesFetcher = (condition: SearchCondition) => Effect.Effect<Partial<PlaceData>[], Error>;

const createGoogleFetcher =
  (lat: string, lng: string, radius: string): PlacesFetcher =>
  ({ isOpen, keyword, type }) =>
    Effect.tryPromise({
      catch: (error) => new Error(`NearbySearch API failed: ${error}`),
      try: async () => {
        let nextPageToken = undefined;
        let results: Partial<PlaceData>[] = [];

        for (let i = 0; i < 3; i++) {
          const response = await client.placesNearby({
            params: {
              key: process.env.GOOGLE_MAPS_API_KEY || "",
              keyword: keyword || undefined,
              language: Language.ja,
              location: [Number(lat), Number(lng)],
              opennow: isOpen === "true",
              pagetoken: nextPageToken,
              radius: Number(radius),
              type: type || undefined,
            },
          });

          results = results.concat(response.data.results);

          if (response.data.next_page_token) {
            nextPageToken = response.data.next_page_token;
            await new Promise((resolve) => setTimeout(resolve, 2000));
          } else {
            break;
          }
        }

        return results;
      },
    });

/** モックデータを検索条件で絞り込む。緯度経度と半径は使わないが、種別・キーワード・営業中の絞り込みは再現する */
const mockFetcher: PlacesFetcher = ({ isOpen, keyword, type }) =>
  Effect.tryPromise({
    catch: (error) => new Error(`Failed to load mock places: ${error}`),
    try: async () => {
      // 別チャンクに切り出し、フラグが有効なときだけ読み込む（通常のリクエストではロードされない）
      const { default: places } = await import("@/mocks/nearbySearch.json");

      return (places as unknown as Partial<PlaceData>[]).filter((place) => {
        if (type && !(place.types as string[] | undefined)?.includes(type)) {
          return false;
        }
        if (keyword && !`${place.name ?? ""} ${place.vicinity ?? ""}`.includes(keyword)) {
          return false;
        }
        if (isOpen === "true" && !place.opening_hours?.open_now) {
          return false;
        }
        return true;
      });
    },
  });

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lat: string; lng: string; radius: string }> }
) {
  const { lat, lng, radius } = await params;

  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword");
  const genre = searchParams.get("genre");
  const isOpen = searchParams.get("isOpen");

  const fetchPlaces: PlacesFetcher = useMockNearbySearch ? mockFetcher : createGoogleFetcher(lat, lng, radius);

  const fetchEffect =
    genre === "food_group"
      ? Effect.all(
          FOOD_GROUP_TYPES.map((type) => fetchPlaces({ isOpen, keyword, type })),
          { concurrency: "unbounded" }
        ).pipe(
          Effect.map((allResults) => {
            const merged = allResults.flat();
            return Array.from(new Map(merged.map((p) => [p.place_id, p])).values());
          })
        )
      : fetchPlaces({ isOpen, keyword, type: genre || undefined });

  const program = fetchEffect.pipe(
    Effect.map((results) => NextResponse.json(results)),
    Effect.catchAll((error) => Effect.succeed(NextResponse.json({ error: error.message }, { status: 500 })))
  );

  return Effect.runPromise(program);
}
