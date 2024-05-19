import SearchCardModal from "@/components/search/SearchCardModal";
import { Card, Group, Image, Loader, Modal, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconStarFilled } from "@tabler/icons-react";
import NextImage from "next/image";
import { Suspense } from "react";

type SearchCardProps = {
  photo?: {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  };
  place: string;
  placeId: string;
  placeTypes: string[];
  rating: number;
  ratingTotal: number;
};

const SearchCard = ({ photo, place, rating, ratingTotal, placeId }: SearchCardProps) => {
  const [isOpenDetail, { open, close }] = useDisclosure(false);
  const photoUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/getPlaceImage?photo_reference=${photo?.photo_reference}`;

  return (
    <>
      <Card
        padding="xs"
        shadow="sm"
        withBorder
        className="flex cursor-pointer flex-col gap-y-3 hover:bg-slate-50"
        onClick={open}
        role="button"
        tabIndex={0}
      >
        <div className="relative aspect-video">
          <Image
            component={NextImage}
            fill
            sizes="(max-width: 600px) 100vw"
            src={photoUrl}
            alt=""
            fallbackSrc="/no-image.jpg"
            radius="sm"
            unoptimized
          />
        </div>

        <div>
          <Group>
            <span className="text-sm font-bold">
              <span className="mr-1 text-lg text-pink-600">{ratingTotal}</span>件
            </span>
            <span className="flex items-center gap-x-0.5 text-xs">
              <IconStarFilled size={12} className="fill-amber-400" />
              {rating}
            </span>
          </Group>
          <Title order={3} size="h4" lineClamp={2}>
            {place}
          </Title>
        </div>
      </Card>

      <Modal opened={isOpenDetail} onClose={close} centered size="lg">
        <Suspense
          fallback={
            <div className="text-center">
              <Loader size="sm" />
            </div>
          }
        >
          {/* async functionを呼び出すと起こるエラーの回避 */}
          {/* @ts-expect-error Server Component */}
          <SearchCardModal placeId={placeId} />
        </Suspense>
      </Modal>
    </>
  );
};
export default SearchCard;
