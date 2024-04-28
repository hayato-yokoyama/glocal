import SearchListAdvanced from "@/components/search/SearchListAdvanced";
import { AdvancedSearchParams } from "@/types/common";
import { Affix, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";

const SearchAdvancedPage = async ({
  params,
  searchParams,
}: {
  params: { distance: number; place: string };
  searchParams: { genre?: string; isOpen?: boolean; keyword?: string };
}) => {
  const formattedSearchParams: AdvancedSearchParams = {
    distance: params.distance,
    genre: searchParams.genre ? decodeURIComponent(searchParams.genre) : "",
    isOpen: searchParams.isOpen ? true : false,
    keyword: searchParams.keyword ? decodeURIComponent(searchParams.keyword) : "",
    place: decodeURIComponent(params.place),
  };

  return (
    <div className="mb-20 flex flex-col gap-y-4">
      <SearchListAdvanced searchParams={formattedSearchParams} />
      <Affix position={{ bottom: 0 }} className="flex h-16 w-full items-center justify-center gap-x-4 bg-slate-200">
        <Button variant="filled" component={Link} href="/" leftSection={<IconSearch size={14} />}>
          条件を選び直す
        </Button>
      </Affix>
    </div>
  );
};
export default SearchAdvancedPage;
