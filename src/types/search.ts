export type SearchPlaceFetchData = {
  html_attributions: [];
  results: SearchPlace[];
};

export type SearchPlace = {
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
  opening_hours?: {
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
