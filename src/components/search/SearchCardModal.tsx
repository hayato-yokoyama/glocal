import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { Anchor, Avatar, Badge, Group, Image, Text, Title } from "@mantine/core";
import { IconClockFilled, IconMapPinFilled, IconPhoneFilled, IconStarFilled, IconWorld } from "@tabler/icons-react";

type SearchCardModalProps = {
  placeId: string;
};

const images = [
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png",
];

const SearchCardModal = ({ placeId }: SearchCardModalProps) => {
  return (
    <div className="flex flex-col gap-y-3">
      <Carousel withIndicators loop>
        {images.map((url) => (
          <Carousel.Slide key={url}>
            <Image src={url} alt="" />
          </Carousel.Slide>
        ))}
      </Carousel>
      <div>
        <Group>
          <span className="text-sm font-bold">
            <span className="mr-1 text-lg text-pink-600">300</span>件
          </span>
          <span className="flex items-center gap-x-0.5 text-xs">
            <IconStarFilled size={12} className="fill-amber-400" />
            4.0
          </span>
        </Group>
        <Title order={3} size="h4" lineClamp={2}>
          東京タワー
        </Title>
      </div>
      <ul className="m-0 flex list-none flex-col gap-y-2 p-0">
        <li className="flex items-center gap-x-3">
          <IconClockFilled size={20} className="fill-primary" />
          <Badge variant="light" color="teal" size="md">
            営業中
          </Badge>
        </li>
        <li className="flex items-center gap-x-3">
          <IconMapPinFilled size={20} className="fill-primary" />
          <Anchor
            href="http://expmple.com"
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
            href="http://expmple.com"
            lineClamp={1}
            target="_blank"
            rel="noopener noreferrer"
            c="black"
            underline="always"
            className="flex-1 whitespace-nowrap"
          >
            http://expmple.com
          </Anchor>
        </li>
        <li className="flex items-center gap-x-3">
          <IconPhoneFilled size={20} className="fill-primary" />
          <Anchor href={`tel:00011112222`} c="black" underline="always" className="flex-1">
            000-1111-2222
          </Anchor>
        </li>
      </ul>
      <ul className="m-0 flex list-none flex-col gap-y-2 p-0 text-xs font-light">
        <li>
          <SearchCardDetailReviews
            comment="彼らは今ちょうどその存在心ってのの末に進んありなけれ。すでに今に講演めも無論その専攻なうなりになるばいるですがは満足するだなて、それほどにもしですでないな。文字を云わです方は始めて事実がことにたたまし。"
            reviewerIconPath=""
            reviewerName="test-user"
            star={3.8}
          />
        </li>
        <li>
          <SearchCardDetailReviews
            comment="彼らは今ちょうどその存在心ってのの末に進んありなけれ。すでに今に講演めも無論その専攻なうなりになるばいるですがは満足するだなて、それほどにもしですでないな。文字を云わです方は始めて事実がことにたたまし。"
            reviewerIconPath=""
            reviewerName="test-user"
            star={3.8}
          />
        </li>
        <li>
          <SearchCardDetailReviews
            comment="彼らは今ちょうどその存在心ってのの末に進んありなけれ。すでに今に講演めも無論その専攻なうなりになるばいるですがは満足するだなて、それほどにもしですでないな。文字を云わです方は始めて事実がことにたたまし。"
            reviewerIconPath=""
            reviewerName="test-user"
            star={3.8}
          />
        </li>
        <li>
          <SearchCardDetailReviews
            comment="彼らは今ちょうどその存在心ってのの末に進んありなけれ。すでに今に講演めも無論その専攻なうなりになるばいるですがは満足するだなて、それほどにもしですでないな。文字を云わです方は始めて事実がことにたたまし。"
            reviewerIconPath=""
            reviewerName="test-user"
            star={3.8}
          />
        </li>
        <li>
          <SearchCardDetailReviews
            comment="彼らは今ちょうどその存在心ってのの末に進んありなけれ。すでに今に講演めも無論その専攻なうなりになるばいるですがは満足するだなて、それほどにもしですでないな。文字を云わです方は始めて事実がことにたたまし。"
            reviewerIconPath=""
            reviewerName="test-user"
            star={3.8}
          />
        </li>
      </ul>
    </div>
  );
};

export default SearchCardModal;

const SearchCardDetailReviews = ({
  comment,
  reviewerIconPath,
  reviewerName,
  star,
}: {
  comment: string;
  reviewerIconPath: string;
  reviewerName: string;
  star: number;
}) => {
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
