import { Button, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";

const SearchNotFound = () => {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="flex flex-col gap-y-4">
        <Text>
          検索条件に該当する結果がありませんでした。別の条件で再度お試しください。
        </Text>
        <Button
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

export default SearchNotFound;
