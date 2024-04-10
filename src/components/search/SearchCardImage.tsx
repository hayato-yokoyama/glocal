// import NextImage from "next/image";
import Image from "next/image";

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
  const photoUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/getPlaceImage?photo_reference=${photo?.photo_reference}`;
  console.log("🚀 ~ photoUrl:", photoUrl);
  return (
    // <Image
    //   component={NextImage}
    //   fill
    //   sizes="(max-width: 768px) 100vw"
    //   src={photoUrl}
    //   alt=""
    //   fallbackSrc="/no-image.jpg"
    //   radius="sm"
    // />
    <Image fill sizes="(max-width: 768px) 100vw" src={photoUrl} alt="" />
  );
};

export default SearchCardImage;
