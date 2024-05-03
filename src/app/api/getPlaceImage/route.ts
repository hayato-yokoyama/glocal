import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const photoReference = searchParams.get("photo_reference");

  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=560&photoreference=${photoReference}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  console.log("🚀 ~ GET ~ url:", url);
  redirect(url);
}
