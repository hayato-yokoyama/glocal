import SearchCard from "@/components/search/SearchCard";

type fetchData = {
  html_attributions: [];
  results: SearchPlace[];
};

type SearchPlace = {
  business_status: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  icon: string;
  name: string;
  opening_hours: {
    open_now: boolean;
  };
  photos: SearchPlacePhoto[];
  place_id: string;
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  rating: number;
  reference: string;
  scope: string;
  types: string[];
  user_ratings_total: number;
  vicinity: string;
};

export type SearchPlacePhoto = {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
};

const searchPage = async () => {
  const fetchData: fetchData = await (
    await fetch("http://localhost:3000/api/searchPlace")
  ).json();
  const searchPlaces = fetchData.results;

  return (
    <div className="flex flex-col gap-y-3">
      {searchPlaces.map((place) => {
        return (
          <SearchCard
            key={place.place_id}
            // TODO: photoをAPIから取得するようにする
            photo="/mt.jpeg"
            place={place.name}
            placeTypes={place.types}
            rating={place.rating}
            ratingTotal={place.user_ratings_total}
          />
        );
      })}
    </div>
  );
};
export default searchPage;
