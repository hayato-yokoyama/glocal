import { StationResponse } from "@/types/common";
import { NextRequest, NextResponse } from "next/server";

/** 地名と同名の駅を取得する */
export async function GET(request: NextRequest, { params }: { params: Promise<{ address: string }> }) {
  const { address } = await params;

  try {
    const response = await fetch(`https://express.heartrails.com/api/json?method=getStations&name=${address}`);
    const data: StationResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    const response: StationResponse = {
      response: {
        error: "Error fetching station data",
      },
    };
    return NextResponse.json(response);
  }
}
