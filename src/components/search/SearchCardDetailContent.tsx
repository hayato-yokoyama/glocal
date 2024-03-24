import SearchCardDetailReviews from "@/components/search/SearchCardDetailReviews";
import { PlaceDetailsResponse } from "@/types/googleMapApi";
import { Anchor, Badge, Divider } from "@mantine/core";
import {
  IconClockFilled,
  IconMapPinFilled,
  IconPhoneFilled,
  IconWorld,
} from "@tabler/icons-react";

const fetchDetail = async (placeId: string) => {
  const res = await fetch(
    `http://localhost:3000/api/getPlaceDetail?placeId=${placeId}`
  );
  const data: PlaceDetailsResponse = await res.json();
  return data;
};

const SearchCardDetailContent = async ({ placeId }: { placeId: string }) => {
  const detail = await fetchDetail(placeId);
  return (
    <div className="flex flex-col gap-y-3">
      <Divider />
      <ul className="m-0 flex list-none flex-col gap-y-2 p-0">
        <li className="flex items-center gap-x-3">
          <IconClockFilled size={20} className="fill-primary" />
          {detail.result.opening_hours.open_now ? (
            <Badge variant="light" color="teal" size="md">
              営業中
            </Badge>
          ) : (
            <Badge variant="light" color="red" size="md">
              営業時間外
            </Badge>
          )}
        </li>
        <li className="flex items-center gap-x-3">
          <IconMapPinFilled size={20} className="fill-primary" />
          <Anchor
            href={detail.result.url}
            target="_blank"
            rel="noopener noreferrer"
            c="black"
            underline="always"
            className="flex-1"
          >
            Google Mapで見る
          </Anchor>
        </li>
        <li className="flex items-center gap-x-3">
          <IconWorld size={20} className="text-primary" />
          <Anchor
            href={detail.result.website}
            lineClamp={1}
            target="_blank"
            rel="noopener noreferrer"
            c="black"
            underline="always"
            className="flex-1 whitespace-nowrap"
          >
            {detail.result.website}
          </Anchor>
        </li>
        <li className="flex items-center gap-x-3">
          <IconPhoneFilled size={20} className="fill-primary" />
          <Anchor
            href={`tel:${detail.result.formatted_phone_number}`}
            c="black"
            underline="always"
            className="flex-1"
          >
            {detail.result.formatted_phone_number}
          </Anchor>
        </li>
      </ul>
      <Divider />
      <ul className="m-0 flex list-none flex-col gap-y-2 p-0 text-xs font-light">
        {detail.result.reviews.map((review, index) => {
          return (
            <li key={index}>
              <SearchCardDetailReviews
                comment={review.text}
                reviewerIconPath={review.profile_photo_url}
                reviewerName={review.author_name}
                star={review.rating}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchCardDetailContent;
