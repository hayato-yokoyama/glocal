"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const GENRE_LIST = [
  "レストラン",
  "観光地",
  "カフェ",
  "公園",
  "居酒屋",
  "バー",
  "ホテル",
];

export default function Home() {
  const [place, setPlace] = useState("");
  const handleChangePlace = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(e.target.value);
  };

  const handleClickCurrentLocation = () => {
    setPlace("現在地");
  };

  return (
    <div className="flex flex-col gap-y-8">
      <fieldset className="flex flex-col gap-y-2">
        <legend className="flex items-center gap-x-2 px-1 py-2 font-bold">
          <Image src="pin.svg" width={32} height={32} alt="" />
          場所
        </legend>
        <div className="flex items-center gap-x-2">
          <input
            type="text"
            placeholder="新宿駅"
            value={place}
            onChange={handleChangePlace}
            className="w-7 flex-1 rounded-lg border-2 border-stone-500 p-2 focus:border-accent focus:outline-none"
          />
        </div>
        <div className="ml-auto flex items-center gap-x-2">
          <button
            onClick={handleClickCurrentLocation}
            className="border-lg m-auto rounded-full border-2 border-primary-400 bg-white px-4 py-2 text-xs"
          >
            現在地検索
          </button>
          <select className="w-fit rounded-lg  border-2 border-stone-500 p-2 focus:border-accent focus:outline-none">
            <option>200m（徒歩2分）</option>
            <option>500m（徒歩6分）</option>
            <option>800m（徒歩10分）</option>
            <option>1km（自動車5分）</option>
            <option>3km（自動車8分）</option>
            <option>10km（自動車15分）</option>
          </select>
        </div>
      </fieldset>
      <fieldset>
        <legend className="flex items-center gap-x-2 px-1 py-2 font-bold">
          <Image src="pen.svg" width={32} height={32} alt="" />
          キーワード
        </legend>
        <input
          type="text"
          className="w-full rounded-lg border-2 border-stone-500 p-2 focus:border-accent focus:outline-none"
        />
      </fieldset>
      <fieldset>
        <legend className="flex items-center gap-x-2 px-1 py-2 font-bold">
          <Image src="cup.svg" width={32} height={32} alt="" />
          ジャンル
        </legend>
        <div className="flex flex-wrap gap-2">
          {GENRE_LIST.map((genre, index) => {
            return (
              <label key={index}>
                <input type="checkbox" className="peer hidden" />
                <span className="inline-block rounded-full border-2 border-primary-400 bg-white px-3 py-2 text-sm peer-checked:bg-primary-400 peer-checked:font-bold">
                  {genre}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
      <label className="flex justify-center gap-2">
        <input type="checkbox" className="accent-primary-400" />
        営業中のスポットのみを表示
      </label>
      <Link
        href="/search"
        className="flex items-center justify-center gap-x-2 rounded-full bg-secondary p-4 font-bold"
      >
        <Image src="search.svg" width={24} height={24} alt="" />
        この条件で探す
      </Link>
    </div>
  );
}
