import { Button, Text, Title } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";

type SearchNotFoundPlaceProps = {
  place: string;
};

const SearchNotFoundPlace = ({ place }: SearchNotFoundPlaceProps) => {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="flex flex-col gap-y-4">
        <Title order={2}>Sorry</Title>
        <Text>{place}に一致する場所が見つかりませんでした</Text>
        <Text>
          地名ではなく駅名や店舗名などの施設名を入れるとヒットしやすくなります。
        </Text>
        <span>例：新宿 → 新宿駅</span>
        <Button
          size="lg"
          variant="filled"
          component={Link}
          href="/"
          leftSection={<IconSearch size={14} />}
        >
          条件を選び直す
        </Button>
      </div>
    </div>
  );
};
export default SearchNotFoundPlace;
