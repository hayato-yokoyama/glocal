"use client";

import { SearchParams } from "@/types/common";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const GENRE_LIST = [
  {
    jaName: "飲食店",
    value: "food",
  },
  {
    jaName: "カフェ",
    value: "cafe",
  },
  {
    jaName: "観光地",
    value: "tourist_attraction",
  },
  {
    jaName: "パン屋",
    value: "bakery",
  },
  {
    jaName: "公園",
    value: "park",
  },
  {
    jaName: "駐車場",
    value: "parking",
  },
  {
    jaName: "温泉・銭湯",
    value: "spa",
  },
  {
    jaName: "ホテル・宿",
    value: "lodging",
  },
  {
    jaName: "ガソリンスタンド",
    value: "gas_station",
  },
  {
    jaName: "ショッピングモール",
    value: "shopping_mall",
  },
  {
    jaName: "バー・スナック",
    value: "bar",
  },
];

export default function Home() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchParams>();

  const router = useRouter();

  const onSubmit = (params: SearchParams) => {
    const queryString = encodeURIComponent(JSON.stringify(params));
    const url = `/search/${queryString}`;
    router.push(url);
  };

  const handleClickCurrentLocation = () => {
    setValue("place", "現在地");
  };

  return (
    <form className="flex flex-col gap-y-8" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex flex-col gap-y-2">
        <label
          htmlFor="place"
          className="flex items-center gap-x-2 px-1 pt-2 font-bold"
        >
          <Image src="pin.svg" width={32} height={32} alt="" />
          場所
        </label>
        {errors.place && (
          <p className="font-bold text-red-600">{errors.place.message}</p>
        )}
        <input
          id="place"
          type="text"
          placeholder="新宿駅"
          {...register("place", { required: "場所を入力してください" })}
          className="rounded-lg border-2 border-stone-500 p-2 focus:border-accent focus:outline-none"
        />

        <div className="ml-auto flex items-center gap-x-2">
          <button
            type="button"
            className="border-lg m-auto rounded-full border-2 border-primary-400 bg-white px-4 py-2 text-xs"
            onClick={handleClickCurrentLocation}
          >
            現在地検索
          </button>
          <select
            {...register("distance", { value: 800 })}
            className="w-fit rounded-lg  border-2 border-stone-500 p-2 focus:border-accent focus:outline-none"
          >
            <option value={200}>200m（徒歩2分）</option>
            <option value={500}>500m（徒歩6分）</option>
            <option value={800}>800m（徒歩10分）</option>
            <option value={1000}>1km（自動車5分）</option>
            <option value={3000}>3km（自動車8分）</option>
            <option value={10000}>10km（自動車15分）</option>
          </select>
        </div>
      </fieldset>

      <fieldset>
        <label
          htmlFor="keyword"
          className="flex items-center gap-x-2 px-1 py-2 font-bold"
        >
          <Image src="pen.svg" width={32} height={32} alt="" />
          キーワード
        </label>
        <input
          id="keyword"
          type="text"
          {...register("keyword")}
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
                <input
                  type="radio"
                  className="peer hidden"
                  {...register("genre")}
                  value={genre.value}
                />
                <span className="inline-block rounded-full border-2 border-primary-400 bg-white px-3 py-2 text-sm peer-checked:bg-primary-400 peer-checked:font-bold">
                  {genre.jaName}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <label className="flex justify-center gap-2">
        <input
          type="checkbox"
          className="accent-primary-400"
          {...register("isOpen")}
        />
        営業中のスポットのみを表示
      </label>

      <button
        type="submit"
        className="flex items-center justify-center gap-x-2 rounded-full bg-secondary p-4 font-bold"
      >
        <Image src="search.svg" width={24} height={24} alt="" />
        この条件で探す
      </button>
    </form>
  );
}
