import { NextResponse } from "next/server";

export async function GET(request: Request) {
  if (process.env.NODE_ENV === "development") {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");
    if (address === "0") {
      return NextResponse.json(NO_RESULT_MOCK_DATA);
    }
    return NextResponse.json(MOCK_DATA);
  }

  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return NextResponse.json(data);
}

// モックAPI用のレスポンスデータ

const MOCK_DATA = {
  results: [
    {
      address_components: [
        {
          long_name: "新宿駅",
          short_name: "新宿駅",
          types: [
            "establishment",
            "point_of_interest",
            "subway_station",
            "train_station",
            "transit_station",
          ],
        },
        {
          long_name: "１",
          short_name: "１",
          types: ["premise"],
        },
        {
          long_name: "３８",
          short_name: "３８",
          types: ["political", "sublocality", "sublocality_level_4"],
        },
        {
          long_name: "３丁目",
          short_name: "３丁目",
          types: ["political", "sublocality", "sublocality_level_3"],
        },
        {
          long_name: "新宿",
          short_name: "新宿",
          types: ["political", "sublocality", "sublocality_level_2"],
        },
        {
          long_name: "新宿区",
          short_name: "新宿区",
          types: ["locality", "political"],
        },
        {
          long_name: "東京都",
          short_name: "東京都",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "日本",
          short_name: "JP",
          types: ["country", "political"],
        },
        {
          long_name: "160-0022",
          short_name: "160-0022",
          types: ["postal_code"],
        },
      ],
      formatted_address:
        "日本、〒160-0022 東京都新宿区新宿３丁目３８−１ 新宿駅",
      geometry: {
        location: {
          lat: 35.6896067,
          lng: 139.7005713,
        },
        location_type: "ROOFTOP",
        viewport: {
          northeast: {
            lat: 35.6925143,
            lng: 139.7020351,
          },
          southwest: {
            lat: 35.6869038,
            lng: 139.6966271,
          },
        },
      },
      partial_match: true,
      place_id: "ChIJH7qx1tCMGGAR1f2s7PGhMhw",
      plus_code: {
        compound_code: "MPQ2+R6 日本、東京都新宿区",
        global_code: "8Q7XMPQ2+R6",
      },
      types: [
        "establishment",
        "point_of_interest",
        "subway_station",
        "train_station",
        "transit_station",
      ],
    },
  ],
  status: "OK",
};

const NO_RESULT_MOCK_DATA = {
  results: [],
  status: "ZERO_RESULTS",
};
