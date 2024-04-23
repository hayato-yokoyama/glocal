"use client";

import SearchCard from "@/components/search/SearchCard";
import SearchNotFound from "@/components/search/SearchNotFound";
import SearchNotFoundPlace from "@/components/search/SearchNotFoundPlace";
import { useLatLng } from "@/hooks/useLatLng";
import { useSearchPlaces } from "@/hooks/useSearchPlaces";
import { SearchParams } from "@/types/common";

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
  } = useSearchPlaces(searchParams, latLng && !isLatLngEmpty ? latLng.results[0].geometry.location : undefined);

  if (latLngError || placesError) {
    return <p>検索中にエラーが発生しました</p>;
  }

  if (isLatLngLoading || isPlacesLoading) {
    return <p>Loading...</p>;
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

  /** レビュー数でソートしたplaces */
  const sortedPlaces = places.sort((a, b) => {
    if (a.user_ratings_total === undefined) {
      return 1;
    }
    if (b.user_ratings_total === undefined) {
      return -1;
    }
    return b.user_ratings_total - a.user_ratings_total;
  });

  return (
    <div className="mb-20 flex flex-col gap-y-4">
      {sortedPlaces.map((place) => {
        return (
          <SearchCard
            key={place.place_id}
            photo={place.photos ? place.photos[0] : undefined}
            place={place.name}
            placeTypes={place.types}
            rating={place.rating ? place.rating : 0}
            ratingTotal={place.user_ratings_total ? place.user_ratings_total : 0}
            placeId={place.place_id}
          />
        );
      })}
    </div>
  );
};

export default SearchList;
