import SearchCard from "@/components/search/SearchCard";
import SearchNotFound from "@/components/search/SearchNotFound";
import SearchNotFoundPlace from "@/components/search/SearchNotFoundPlace";
import { getLatLng } from "@/libs/getLatLng";
import { sortedSearchPlaces } from "@/libs/searchPlaces";
import { SearchParams } from "@/types/common";
import { Affix, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";

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

  /** 緯度経度 { lat:緯度 lng:経度 } */
  const latLng = await getLatLng(formattedSearchParams.place);

  if (!latLng) {
    return <SearchNotFoundPlace place={formattedSearchParams.place} />;
  }

  /** 取得した場所 */
  const places = await sortedSearchPlaces(latLng.lat, latLng.lng, formattedSearchParams);

  if (places.length === 0) {
    return <SearchNotFound />;
  }

  return (
    <div className="mb-20 flex flex-col gap-y-4">
      {places.map((place) => {
        return (
          <SearchCard
            key={place.placeId}
            photo={place.photo ? place.photo[0] : undefined}
            place={place.placeName}
            placeTypes={place.placeTypes}
            rating={place.rating ? place.rating : 0}
            ratingTotal={place.ratingsTotal ? place.ratingsTotal : 0}
            placeId={place.placeId}
          />
        );
      })}
      <Affix position={{ bottom: 0 }} className="flex h-16 w-full items-center justify-center gap-x-4 bg-slate-200">
        <Button variant="filled" component={Link} href="/" leftSection={<IconSearch size={14} />}>
          条件を選び直す
        </Button>
      </Affix>
    </div>
  );
};
export default SearchPage;
