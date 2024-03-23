import { Avatar, Text } from "@mantine/core";
import { IconStarFilled } from "@tabler/icons-react";

type SearchCardDetailReviewsProps = {
  comment: string;
  reviewerIconPath: string;
  reviewerName: string;
  star: number;
};

const SearchCardDetailReviews = ({
  comment,
  reviewerIconPath,
  reviewerName,
  star,
}: SearchCardDetailReviewsProps) => {
  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex items-center gap-x-2">
        <Avatar src={reviewerIconPath} alt="" size="sm" />
        <span>{reviewerName}</span>
      </div>
      <div className="flex gap-x-2">
        <span>1週間前</span>
        <span className="flex items-center">
          <IconStarFilled size={12} className="fill-amber-400" />
          {star}
        </span>
      </div>
      <Text size="sm">{comment}</Text>
    </div>
  );
};
export default SearchCardDetailReviews;
