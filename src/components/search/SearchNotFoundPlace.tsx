import Image from "next/image";

type SearchNotFoundPlaceProps = {
  place: string;
};

const SearchNotFoundPlace = ({ place }: SearchNotFoundPlaceProps) => {
  return (
    <div className="mx-4 flex h-[calc(100vh_-_90px)] flex-col justify-center gap-y-6">
      <Image src="/elephant.svg" width={64} height={64} alt="" />
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
  );
};
export default SearchNotFoundPlace;
