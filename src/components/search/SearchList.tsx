"use client";

import Loading from "@/app/(default)/search/[place]/[distance]/loading";
import SearchCard from "@/components/search/SearchCard";
import SearchError from "@/components/search/SearchError";
import SearchNotFound from "@/components/search/SearchNotFound";
import SearchNotFoundPlace from "@/components/search/SearchNotFoundPlace";
import { useLatLng } from "@/hooks/useLatLng";
import { useSearchPlaces } from "@/hooks/useSearchPlaces";
import { SearchParams } from "@/types/common";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import { Title } from "@mantine/core";

type SearchListProps = {
  searchParams: SearchParams;
};

const SearchList = ({ searchParams }: SearchListProps) => {
  const {
    data: latLng,
    error: latLngError,
    isEmpty: isLatLngEmpty,
    isLoading: isLatLngLoading,
  } = useLatLng(searchParams.place);

  const {
    data: places,
    error: placesError,
    isEmpty: isPlacesEmpty,
    isLoading: isPlacesLoading,
  } = useSearchPlaces(searchParams, latLng || undefined);

  if (latLngError || placesError) {
    return <SearchError />;
  }

  if (isLatLngLoading || isPlacesLoading) {
    return <Loading />;
  }

  if (isLatLngEmpty) {
    return <SearchNotFoundPlace place={searchParams.place} />;
  }

  if (isPlacesEmpty) {
    return <SearchNotFound />;
  }

  if (!places || !latLng) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-12">
      <SearchListSection minTotal={10000} places={places.placesOver10000} />
      <SearchListSection minTotal={5000} places={places.placesOver5000} />
      <SearchListSection minTotal={1000} places={places.placesOver1000} />
      <SearchListSection minTotal={500} places={places.placesOver500} />
      <SearchListSection minTotal={300} places={places.placesOver300} />
      <SearchListSection minTotal={100} places={places.placesOver100} />
      <SearchListSection minTotal={50} places={places.placesOver50} />
      <SearchListSection places={places.placesUnder50} />
    </div>
  );
};

export default SearchList;

const SearchListSection = ({ minTotal, places }: { minTotal?: number; places: Partial<PlaceData>[] }) => {
  if (places.length <= 0) {
    return null;
  }
  return (
    <div className="flex flex-col gap-y-4">
      {minTotal ? (
        <Title order={2} size="h4">
          <span className="mr-1 text-2xl text-pink-600">{minTotal}</span>件以上
        </Title>
      ) : (
        <Title order={2} size="h4">
          <span className="mr-1 text-2xl">50</span>件以下
        </Title>
      )}
      <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {places.map((place) => {
          return (
            <SearchCard
              key={place.place_id}
              photo={place.photos ? place.photos[0] : undefined}
              place={place.name || ""}
              placeTypes={place.types || []}
              rating={place.rating ? place.rating : 0}
              ratingTotal={place.user_ratings_total ? place.user_ratings_total : 0}
              placeId={place.place_id || ""}
            />
          );
        })}
      </div>
    </div>
  );
};
