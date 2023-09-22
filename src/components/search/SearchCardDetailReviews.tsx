import Image from "next/image";

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
      <div className="flex gap-x-2">
        <Image src={reviewerIconPath} alt="" width={16} height={16} />
        <span>{reviewerName}</span>
      </div>
      <div className="flex gap-x-2">
        <span>1週間前</span>
        <span>
          <span className="text-yellow-500">★</span>
          {star}
        </span>
      </div>
      <p className="text-sm">{comment}</p>
    </div>
  );
};
export default SearchCardDetailReviews;
