"use client";

import SearchCardDetailReviews from "@/components/search/SearchCardDetailReviews";
import Image from "next/image";
import { useState } from "react";

type SearchCardDetailProps = {
  mapUrl: string;
  phoneNumber: string;
  webSiteUrl: string;
};

const REVIEW = [
  {
    comment:
      "東京タワーは日本の代表的な観光名所であり、私も訪れた際には感動的な経験をしました。まず、タワーの高さと美しさに圧倒されました。展望台からのパノラマビューは絶景で、夜には都市のライトアップが素晴らしく、ロマンチックな雰囲気が漂います。特に、東京の夜景を楽しみたい方にはおすすめです。タワー内には歴史的な要素も多く、展示や案内が興味深いです。タワーの歴史を知りながら上昇すると、より一層価値を感じることができます。また、展示物には日本文化や都市の発展に関する情報もあり、教育的な要素もあります。",
    reviewerIconPath: "/user-icon.JPG",
    reviewerName: "かいけつゾロリ",
    star: 3.8,
  },
  {
    comment:
      "東京タワーは日本の代表的な観光名所であり、私も訪れた際には感動的な経験をしました。まず、タワーの高さと美しさに圧倒されました。展望台からのパノラマビューは絶景で、夜には都市のライトアップが素晴らしく、ロマンチックな雰囲気が漂います。特に、東京の夜景を楽しみたい方にはおすすめです。タワー内には歴史的な要素も多く、展示や案内が興味深いです。タワーの歴史を知りながら上昇すると、より一層価値を感じることができます。また、展示物には日本文化や都市の発展に関する情報もあり、教育的な要素もあります。",
    reviewerIconPath: "/user-icon.JPG",
    reviewerName: "クレヨンしんちゃん",
    star: 4.7,
  },
  {
    comment:
      "東京タワーは日本の代表的な観光名所であり、私も訪れた際には感動的な経験をしました。まず、タワーの高さと美しさに圧倒されました。展望台からのパノラマビューは絶景で、夜には都市のライトアップが素晴らしく、ロマンチックな雰囲気が漂います。特に、東京の夜景を楽しみたい方にはおすすめです。タワー内には歴史的な要素も多く、展示や案内が興味深いです。タワーの歴史を知りながら上昇すると、より一層価値を感じることができます。また、展示物には日本文化や都市の発展に関する情報もあり、教育的な要素もあります。",
    reviewerIconPath: "/user-icon.JPG",
    reviewerName: "それいけアンパンマン",
    star: 3.0,
  },
];

const SearchCardDetail = ({
  mapUrl,
  phoneNumber,
  webSiteUrl,
}: SearchCardDetailProps) => {
  const [isOpenedDetail, setIsOpenedDetail] = useState(false);
  if (!isOpenedDetail) {
    return <button onClick={() => setIsOpenedDetail(true)}>もっと見る</button>;
  }
  return (
    <div className="flex flex-col gap-y-3">
      <hr />
      <ul className="flex flex-col gap-y-2">
        <li className="flex gap-x-3">
          <Image src="/gmap.svg" alt="" width={20} height={20} />
          <a
            href={mapUrl}
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GoogleMapで見る
          </a>
        </li>
        <li className="flex gap-x-3">
          <Image src="/world.svg" alt="" width={20} height={20} />
          <a
            href={webSiteUrl}
            className="line-clamp-1 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {webSiteUrl}
          </a>
        </li>
        <li className="flex gap-x-3">
          <Image src="/clock.svg" alt="" width={20} height={20} />
          <span className="text-red-600">営業時間外</span>
        </li>
        <li className="flex gap-x-3">
          <Image src="/tel.svg" alt="" width={20} height={20} />
          <a href={`tel:${phoneNumber}`} className="line-clamp-1 underline">
            {phoneNumber}
          </a>
        </li>
      </ul>
      <hr />
      <ul className="flex flex-col gap-y-4 text-xs font-light">
        {REVIEW.map((review, index) => {
          return (
            <li key={index}>
              <SearchCardDetailReviews
                comment={review.comment}
                reviewerIconPath={review.reviewerIconPath}
                reviewerName={review.reviewerName}
                star={review.star}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchCardDetail;
