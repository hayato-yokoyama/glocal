import SearchCardDetail from "@/components/search/SearchCardDetail";
import { Card, Image } from "@mantine/core";
import NextImage from "next/image";

type SearchCardProps = {
  photo?: {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  };
  place: string;
  placeTypes: string[];
  rating: number;
  ratingTotal: number;
};

/** photoReferenceから検索結果の写真を取得する */
const getPhotoUrl = (photoReference: string) => {
  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=560&photoreference=${photoReference}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  return url;
};

const SearchCard = ({ photo, place, rating, ratingTotal }: SearchCardProps) => {
  return (
    <Card withBorder>
      <div className="relative aspect-video">
        <Image
          component={NextImage}
          fill
          src={null}
          alt=""
          fallbackSrc="/no-image-available.svg"
        />
      </div>
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-2">
          <div className="text-left">
            <span className="mr-2">
              <span className="mr-1 text-xl font-bold">{ratingTotal}</span>件
            </span>
            <span className="mr-2 text-xs">
              <span>★</span>
              {rating}
            </span>
          </div>
          <p className="my-0 text-left text-2xl font-bold">{place}</p>
        </div>
        <SearchCardDetail
          mapUrl="/"
          phoneNumber="00011112222"
          webSiteUrl="https://example.com/"
        />
      </div>
    </Card>
  );
};
export default SearchCard;
