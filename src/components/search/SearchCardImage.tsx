import { Image } from "@mantine/core";
import NextImage from "next/image";

/** photoReferenceから検索結果の写真を取得する */
const getPhotoUrl = (photoReference?: string) => {
  if (photoReference === undefined) {
    return null;
  }
  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=560&photoreference=${photoReference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
  return url;
};

const SearchCardImage = ({
  photo,
}: {
  photo?: {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  };
}) => {
  return (
    <Image
      component={NextImage}
      fill
      sizes="(max-width: 768px) 100vw"
      // TODO: API Keyを制限しつつ、セキュアにAPIを実行できるように整える
      // src={getPhotoUrl(photo?.photo_reference)}
      alt=""
      fallbackSrc="/no-image.jpg"
      radius="sm"
    />
  );
};

export default SearchCardImage;
