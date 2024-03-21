"use client";

import { SearchParams } from "@/types/common";
import { Button, Checkbox, Radio } from "@mantine/core";
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
    const { place, distance, keyword, genre, isOpen } = params;

    // prettier-ignore
    const pathParams = `${encodeURIComponent(place)}/${encodeURIComponent(distance)}`;

    let queryParams = `?`;

    if (keyword !== "") {
      queryParams += `keyword=${encodeURIComponent(keyword)}&`;
    }
    if (genre !== null) {
      queryParams += `genre=${encodeURIComponent(genre)}&`;
    }
    if (isOpen) {
      queryParams += `isOpen=${encodeURIComponent(isOpen)}&`;
    }

    const url = `/search/${pathParams}${queryParams.slice(0, -1)}`;
    router.push(url);
  };

  const handleClickCurrentLocation = () => {
    setValue("place", "現在地");
  };

  return (
    <form className="flex flex-col gap-y-8" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex flex-col gap-y-2">
        <label htmlFor="place">場所</label>
        {errors.place && <p>{errors.place.message}</p>}
        <input
          id="place"
          type="text"
          placeholder="新宿駅"
          {...register("place", { required: "場所を入力してください" })}
        />

        <div className="ml-auto flex items-center gap-x-2">
          <Button
            type="button"
            onClick={handleClickCurrentLocation}
            variant="light"
          >
            現在地検索
          </Button>
          <select {...register("distance", { value: 800 })}>
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
        <label htmlFor="keyword">キーワード</label>
        <input id="keyword" type="text" {...register("keyword")} />
      </fieldset>
      <fieldset>
        <legend>ジャンル</legend>
        <div className="flex flex-wrap gap-2">
          {GENRE_LIST.map((genre, index) => {
            return (
              <Radio
                key={index}
                label={genre.jaName}
                {...register("genre")}
                value={genre.value}
              />
            );
          })}
        </div>
      </fieldset>
      <Checkbox
        label="営業中のスポットのみを表示"
        className="mx-auto"
        {...register("isOpen")}
      />
      <Button
        type="submit"
        variant="filled"
        fullWidth
      >
        この条件で探す
      </Button>
    </form>
  );
}
