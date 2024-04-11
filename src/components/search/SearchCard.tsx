import SearchCardDetail from "@/components/search/SearchCardDetail";
import SearchCardImage from "@/components/search/SearchCardImage";
import { Card, Group, Title } from "@mantine/core";
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
  return (
    <Card padding="xs" withBorder className="flex flex-col gap-y-3">
      <div className="relative aspect-video">
        <SearchCardImage photo={photo} />
      </div>

      <div>
        <Group>
          <span className="font-bold">
            <span className="mr-1 text-xl text-pink-600">{ratingTotal}</span>件
          </span>
          <span className="flex items-center gap-x-0.5 text-xs">
            <IconStarFilled size={12} className="fill-amber-400" />
            {rating}
          </span>
        </Group>
        <Title order={2}>{place}</Title>
      </div>

      <SearchCardDetail placeId={placeId} />
    </Card>
  );
};
export default SearchCard;
