import { Client } from "@googlemaps/google-maps-services-js";
import { NextResponse } from "next/server";

const client = new Client({});

export async function GET(request: Request, { params }: { params: { address: string } }) {
  // 地名と同名の駅があるかどうか、取得する
  const stationResponse = await getStation(params.address);
  const isStationName = stationResponse.response.station ? true : false;

  const response = await client.geocode({
    params: {
      address: isStationName ? `${params.address}駅` : params.address,
      key: process.env.GOOGLE_MAPS_API_KEY || "",
    },
  });
  const result = response.data;
  return NextResponse.json(result);
}

/** 地名と同名の駅を取得する */
const getStation = async (address: string): Promise<StationResponse> => {
  try {
    const response = await fetch(`https://express.heartrails.com/api/json?method=getStations&name=${address}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      response: {
        error: "Error fetching station data",
      },
    };
  }
};

type StationResponse = {
  response: {
    error?: string;
    station?: {
      line: string;
      name: string;
      next: string;
      postal: string;
      prefecture: string;
      prev: string;
      x: number;
      y: number;
    }[];
  };
};
