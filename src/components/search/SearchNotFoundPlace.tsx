import Image from "next/image";
import Link from "next/link";

type SearchNotFoundPlaceProps = {
  place: string;
};

const SearchNotFoundPlace = ({ place }: SearchNotFoundPlaceProps) => {
  return (
    <div className="relative">
      <div className="mx-4 flex h-[calc(100vh_-_90px)] flex-col justify-center gap-y-4">
        <p className="break-keep [overflow-wrap:anywhere]">
          <span className="mr-2 font-bold">{place}</span>
          <wbr />
          に一致する場所が見つかりませんでした🙇‍♂️
        </p>
        <div>
          <p className="break-keep [overflow-wrap:anywhere]">
            場所は、
            <wbr />
            地名ではなく
            <wbr />
            駅名や店舗名などの
            <wbr />
            施設名を入れると
            <wbr />
            ヒットしやすくなります。
          </p>
          <p className="mt-2">例：新宿 → 新宿駅</p>
        </div>
      </div>
      <Link
        href="/"
        className="absolute bottom-2 flex w-full items-center justify-center gap-x-2 rounded-full bg-primary-400 p-4 font-bold"
      >
        <Image src="/search.svg" width={20} height={20} alt="" />
        検索画面に戻る
      </Link>
    </div>
  );
};
export default SearchNotFoundPlace;
