import SearchActionAffix from "@/components/search/SearchActionAffix";
import SearchList from "@/components/search/SearchList";
import { SearchParams, StationResponse } from "@/types/common";

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
  // 地名と同名の駅があるかどうか、取得する
  const stationResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getStation/${params.place}`);
  const stationData: StationResponse = await stationResponse.json();
  const isStationName = stationData.response.station ? true : false;

  /** 駅名変換したPlace */
  const adjustedPlace = isStationName ? `${params.place}駅` : params.place;

  const formattedSearchParams: SearchParams = {
    distance: params.distance,
    genre: searchParams.genre ? decodeURIComponent(searchParams.genre) : "",
    isOpen: searchParams.isOpen ? true : false,
    keyword: searchParams.keyword ? decodeURIComponent(searchParams.keyword) : "",
    place: decodeURIComponent(adjustedPlace),
  };

  return (
    <div className="mb-20 flex flex-col gap-y-4">
      <SearchList searchParams={formattedSearchParams} />
      <SearchActionAffix />
    </div>
  );
};
export default SearchPage;
