import { SearchParams } from "@/types/common";
import { Affix, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";

const SearchPage = async ({
  params,
  searchParams,
}: {
  params: { query: string };
  searchParams: { isOpen?: boolean };
}) => {
  const formattedSearchParams: SearchParams = {
    isOpen: searchParams.isOpen ? true : false,
    query: decodeURIComponent(params.query),
  };

  return (
    <div className="mb-20 flex flex-col gap-y-4">
      <Affix position={{ bottom: 0 }} className="flex h-16 w-full items-center justify-center gap-x-4 bg-slate-200">
        <Button variant="filled" component={Link} href="/" leftSection={<IconSearch size={14} />}>
          条件を選び直す
        </Button>
      </Affix>
    </div>
  );
};
export default SearchPage;
