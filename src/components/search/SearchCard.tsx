"use client";

import SearchCardDetail from "@/components/search/SearchCardDetail";
import Image from "next/image";
import { useState } from "react";

type SearchCardProps = {
  photo: string;
  place: string;
  placeTypes: string[];
  rating: number;
  ratingTotal: number;
};

const SearchCard = ({
  photo,
  place,
  placeTypes,
  rating,
  ratingTotal,
}: SearchCardProps) => {
  const [isOpenedDetail, setIsOpenedDetail] = useState(false);
  return (
    <section className="rounded-xl bg-background-secondary">
      <div className="relative aspect-video">
        <Image src={photo} fill alt="" className="rounded-t-xl object-cover" />
      </div>
      <div className="flex flex-col gap-y-3 px-3 py-2">
        <div className="flex flex-col gap-y-2">
          <div className="text-left">
            <span className="mr-2">
              <span className="mr-1 text-xl font-bold text-secondary">
                {ratingTotal}
              </span>
              件
            </span>
            <span className="mr-2 text-xs">
              <span className="text-accent">★</span>
              {rating}
            </span>
          </div>
          <p className="text-left text-2xl font-bold">{place}</p>
          <div className="flex flex-wrap gap-2 text-sm">
            {placeTypes.map((placeType, index) => {
              return <span key={index}>{placeType}</span>;
            })}
          </div>
          {!isOpenedDetail && (
            <button onClick={() => setIsOpenedDetail(true)}>もっと見る</button>
          )}
        </div>
        {isOpenedDetail && (
          <SearchCardDetail
            mapUrl="/"
            phoneNumber="00011112222"
            webSiteUrl="https://example.com/"
          />
        )}
      </div>
    </section>
  );
};
export default SearchCard;
