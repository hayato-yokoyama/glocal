import SearchCardImage from "@/components/search/SearchCardImage";
import SearchCardModal from "@/components/search/SearchCardModal";
import { Card, Group, Modal, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconStarFilled } from "@tabler/icons-react";

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
          <SearchCardImage photo={photo} />
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
        <SearchCardModal placeId={placeId} />
      </Modal>
    </>
  );
};
export default SearchCard;
