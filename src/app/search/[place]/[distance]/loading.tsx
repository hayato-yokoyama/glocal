import { Loader, Text } from "@mantine/core";

const Loading = () => {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="flex flex-col gap-y-8 text-center">
        <Loader className="mx-auto" />
        <div className="flex flex-col">
          <Text>検索中です...</Text>
          <Text>もうしばらくお待ちください</Text>
        </div>
      </div>
    </div>
  );
};

export default Loading;
