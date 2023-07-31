"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";

const GENRE_LIST = [
  "レストラン",
  "観光地",
  "カフェ",
  "公園",
  "居酒屋",
  "バー",
  "ホテル",
];

type filtering = {
  distance: number;
  genre: string[];
  isOpen: boolean;
  keyword: string;
  place: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<filtering>();
  const onSubmit = (data: filtering) => alert(JSON.stringify(data));

  return (
    <form className="flex flex-col gap-y-8" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex flex-col gap-y-2">
        <legend className="flex items-center gap-x-2 px-1 py-2 font-bold">
          <Image src="pin.svg" width={32} height={32} alt="" />
          場所
        </legend>
        <p className="font-bold text-red-600">
          {errors.place && errors.place.message}
        </p>
        <input
          type="text"
          placeholder="新宿駅"
          {...register("place", { required: "場所を入力してください" })}
          className="rounded-lg border-2 border-stone-500 p-2 focus:border-accent focus:outline-none"
        />

        <div className="ml-auto flex items-center gap-x-2">
          {/* TODO: 現在地ボタンをクリックすると現在地が検索ワードに入るようにする */}
          <button className="border-lg m-auto rounded-full border-2 border-primary-400 bg-white px-4 py-2 text-xs">
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
        <legend className="flex items-center gap-x-2 px-1 py-2 font-bold">
          <Image src="pen.svg" width={32} height={32} alt="" />
          キーワード
        </legend>
        <input
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
                  type="checkbox"
                  className="peer hidden"
                  {...register("genre")}
                  value={genre}
                />
                <span className="inline-block rounded-full border-2 border-primary-400 bg-white px-3 py-2 text-sm peer-checked:bg-primary-400 peer-checked:font-bold">
                  {genre}
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
