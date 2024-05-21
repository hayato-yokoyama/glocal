import { Anchor, Button, Text, Title } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";

const SearchError = () => {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="flex w-full flex-col gap-y-4">
        <Title order={2}>Sorry</Title>
        <Text>検索中にエラーが発生しました。しばらくしてからもう一度お試しください。</Text>
        <Text>
          もし問題が解決しない場合は、お手数ですが管理者 (
          <Anchor href="https://twitter.com/hayatoyokoyama_" target="_blank">
            <span className="font-bold">@hayatoyokoyama_</span>
          </Anchor>
          ) までお問い合わせいただけると幸いです。
        </Text>
        <Button variant="filled" component={Link} href="/" leftSection={<IconSearch size={14} />}>
          条件を選び直す
        </Button>
      </div>
    </div>
  );
};

export default SearchError;
