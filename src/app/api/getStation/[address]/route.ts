import { StationResponse } from "@/types/common";
import { NextResponse } from "next/server";

/** 地名と同名の駅を取得する */
export async function GET(request: Request, { params }: { params: { address: string } }) {
  try {
    const response = await fetch(`https://express.heartrails.com/api/json?method=getStations&name=${params.address}`);
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
