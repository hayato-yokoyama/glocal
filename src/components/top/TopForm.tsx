"use client";

import { Button, Checkbox, Chip, Fieldset, Group, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

type FormValues = {
  distance: string;
  genre: string;
  isOpen: boolean;
  keyword: string;
  place: string;
};

const TopForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClickSubmit = (params: FormValues) => {
    const { place, distance, keyword, genre, isOpen } = params;

    // prettier-ignore
    const pathParams = `${encodeURIComponent(place)}/${encodeURIComponent(distance)}`;

    let queryParams = `?`;

    if (keyword !== "") {
      queryParams += `keyword=${encodeURIComponent(keyword)}&`;
    }
    if (genre !== "") {
      queryParams += `genre=${encodeURIComponent(genre)}&`;
    }
    if (isOpen) {
      queryParams += `isOpen=${encodeURIComponent(isOpen)}&`;
    }

    const url = `/search/${pathParams}${queryParams.slice(0, -1)}`;

    startTransition(() => {
      router.push(url);
    });
  };

  const form = useForm<FormValues>({
    initialValues: {
      distance: "800",
      genre: "",
      isOpen: false,
      keyword: "",
      place: "",
    },
    validate: {
      place: (value) => (/^\s*$/.test(value) ? "場所を入力してください" : null),
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => handleClickSubmit(values))}
      className="mx-auto flex w-full max-w-screen-md flex-col gap-y-8"
    >
      <Fieldset className="flex flex-col gap-y-2" variant="unstyled">
        <TextInput
          size="md"
          withAsterisk
          label={<span className="font-bold">場所</span>}
          placeholder="新宿駅"
          {...form.getInputProps("place")}
        />

        <div className="ml-auto flex items-center gap-x-2">
          <Button type="button" onClick={() => form.setValues({ place: "現在地" })} variant="light" color="cyan">
            現在地検索
          </Button>
          <Select
            size="md"
            data={[
              { label: "200m（徒歩2分）", value: "200" },
              { label: "500m（徒歩6分）", value: "500" },
              { label: "800m（徒歩10分）", value: "800" },
              { label: "1km（自動車5分）", value: "1000" },
              { label: "3km（自動車8分）", value: "3000" },
              { label: "10km（自動車15分）", value: "10000" },
            ]}
            {...form.getInputProps("distance")}
          />
        </div>
      </Fieldset>
      <Fieldset variant="unstyled">
        <TextInput
          size="md"
          label={<span className="font-bold">キーワード</span>}
          placeholder="オムライス"
          {...form.getInputProps("keyword")}
        />
      </Fieldset>
      <Fieldset variant="unstyled" legend={<span className="text-base font-bold">ジャンル（複数不可）</span>}>
        <Chip.Group {...form.getInputProps("genre")}>
          <Group>
            <Chip value="restaurant">レストラン</Chip>
            <Chip value="cafe">カフェ</Chip>
            <Chip value="tourist_attraction">観光地</Chip>
            <Chip value="lodging">ホテル・宿泊</Chip>
            <Chip value="park">公園</Chip>
            <Chip value="parking">駐車場</Chip>
            <Chip value="travel_agency">観光案内・旅行会社</Chip>
            <Chip value="movie_theater">映画館</Chip>
            <Chip value="amusement_park">遊園地</Chip>
            <Chip value="shopping_mall">ショッピングモール</Chip>
            <Chip value="department_store">デパート</Chip>
            <Chip value="spa">スパ・温泉</Chip>
            <Chip value="supermarket">スーパー</Chip>
            <Chip value="book_store">書店</Chip>
            <Chip value="bakery">パン屋</Chip>
            <Chip value="bar">バー・スナック</Chip>
            <Chip value="beauty_salon">美容室</Chip>
            <Chip value="gym">ジム・フィットネス</Chip>
            <Chip value="hospital">病院・クリニック</Chip>
            <Chip value="dentist">歯医者</Chip>
            <Chip value="art_gallery">美術館</Chip>
            <Chip value="museum">博物館</Chip>
            <Chip value="aquarium">水族館</Chip>
            <Chip value="campground">キャンプ場</Chip>
          </Group>
        </Chip.Group>
      </Fieldset>
      <Checkbox label="営業中のスポットのみを表示" className="mx-auto" {...form.getInputProps("isOpen")} />
      <Button
        type="submit"
        variant="filled"
        leftSection={<IconSearch size={14} />}
        loading={isPending}
        disabled={isPending}
      >
        この条件で探す
      </Button>
    </form>
  );
};

export default TopForm;
