"use client";

import { Button, Checkbox, Fieldset, Select, Tabs, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

type AdvancedFormValues = {
  distance: string;
  genre: string;
  isOpen: boolean;
  keyword: string;
  place: string;
};

const TopForm = () => {
  const router = useRouter();

  const handleClickAdvancedSubmit = (params: AdvancedFormValues) => {
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

    const url = `/search/advanced/${pathParams}${queryParams.slice(0, -1)}`;
    router.push(url);
  };

  const advancedForm = useForm<AdvancedFormValues>({
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
    <Tabs defaultValue="roughly" variant="outline">
      <Tabs.List className="mb-4">
        <Tabs.Tab value="roughly">ざっくり検索</Tabs.Tab>
        <Tabs.Tab value="advanced">しっかり検索</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="advanced">
        <form
          onSubmit={advancedForm.onSubmit((values) => handleClickAdvancedSubmit(values))}
          className="flex flex-col gap-y-8"
        >
          <Fieldset className="flex flex-col gap-y-2" variant="unstyled">
            <TextInput
              size="md"
              withAsterisk
              label={<span className="font-bold">場所</span>}
              placeholder="新宿駅"
              {...advancedForm.getInputProps("place")}
            />

            <div className="ml-auto flex items-center gap-x-2">
              <Button
                type="button"
                onClick={() => advancedForm.setValues({ place: "現在地" })}
                variant="light"
                color="cyan"
              >
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
                {...advancedForm.getInputProps("distance")}
              />
            </div>
          </Fieldset>
          <Fieldset variant="unstyled">
            <TextInput
              size="md"
              label={<span className="font-bold">キーワード</span>}
              placeholder="オムライス"
              {...advancedForm.getInputProps("keyword")}
            />
          </Fieldset>
          <Checkbox label="営業中のスポットのみを表示" className="mx-auto" {...advancedForm.getInputProps("isOpen")} />
          <Button type="submit" variant="filled" leftSection={<IconSearch size={14} />}>
            この条件で探す
          </Button>
        </form>
      </Tabs.Panel>
    </Tabs>
  );
};

export default TopForm;
