import SearchList from "@/components/search/SearchList";
import { SearchParams } from "@/types/common";
import { Affix, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { distance: string; place: string } }) {
  const place = decodeURIComponent(params.place);
  const distance = params.distance;
  const range = (distance: string) => {
    if (distance === "200") {
      return "徒歩2分圏内";
    }
    if (distance === "500") {
      return "徒歩6分圏内";
    }
    if (distance === "800") {
      return "徒歩10分圏内";
    }
    if (distance === "1000") {
      return "自動車5分圏内";
    }
    if (distance === "3000") {
      return "徒歩8分圏内";
    }
    if (distance === "10000") {
      return "徒歩15分圏内";
    }
    return `${distance}m圏内`;
  };
  return {
    title: `${place}から${range(distance)}の検索結果 | Glocal | レビューの数で場所を見つける場所検索サイト`,
  };
}

const SearchPage = async ({
  params,
  searchParams,
}: {
  params: { distance: number; place: string };
  searchParams: { genre?: string; isOpen?: boolean; keyword?: string };
}) => {
  const formattedSearchParams: SearchParams = {
    distance: params.distance,
    genre: searchParams.genre ? decodeURIComponent(searchParams.genre) : "",
    isOpen: searchParams.isOpen ? true : false,
    keyword: searchParams.keyword ? decodeURIComponent(searchParams.keyword) : "",
    place: decodeURIComponent(params.place),
  };

  return (
    <div className="mb-20 flex flex-col gap-y-4">
      <SearchList searchParams={formattedSearchParams} />
      <Affix position={{ bottom: 0 }} className="flex h-16 w-full items-center justify-center gap-x-4 bg-slate-200">
        <Button variant="filled" component={Link} href="/" leftSection={<IconSearch size={14} />}>
          条件を選び直す
        </Button>
      </Affix>
    </div>
  );
};
export default SearchPage;
