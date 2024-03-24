/** ジオコーディングAPIのレスポンス */
export type GeocodingResponse = {
  results: GeocodingResult[];
  status: string;
};

type GeocodingResult = {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: {
    bounds: Bounds;
    location: LatLng;
    location_type: string;
    viewport: Bounds;
  };
  place_id: string;
  types: string[];
};

type Bounds = {
  northeast: LatLng;
  southwest: LatLng;
};

/** Places Nearby Search API のレスポンス */
export type PlaceSearchResponse = {
  html_attributions: string[];
  next_page_token: string;
  results: PlaceResult[];
  status: string;
};

export type PlaceResult = {
  business_status?: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours?: {
    open_now: boolean;
  };
  permanently_closed?: boolean;
  photos?: Photo[];
  place_id: string;
  plus_code?: {
    compound_code: string;
    global_code: string;
  };
  price_level?: number;
  rating?: number;
  reference: string;
  scope: string;
  types: string[];
  user_ratings_total?: number;
  vicinity: string;
};

/** Place Details API のレスポンス */
export type PlaceDetailsResponse = {
  html_attributions: string[];
  result: PlaceDetails;
  status: string;
};

type PlaceDetails = {
  address_components: AddressComponent[];
  adr_address: string;
  business_status: string;
  formatted_address: string;
  formatted_phone_number: string;
  geometry: Geometry;
  html_attributions: string[];
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  international_phone_number: string;
  name: string;
  opening_hours: {
    open_now: boolean;
    periods: {
      close: { day: number; time: string };
      open: { day: number; time: string };
    }[];
    weekday_text: string[];
  };
  photos: Photo[];
  place_id: string;
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  rating: number;
  reference: string;
  reviews: {
    author_name: string;
    author_url: string;
    language: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
  }[];
  status: string;
  types: string[];
  url: string;
  user_ratings_total: number;
  utc_offset: number;
  vicinity: string;
  website: string;
};

// =====
// 共通
// =====
type LatLng = {
  lat: number;
  lng: number;
};

type Geometry = {
  location: LatLng;
  viewport: {
    northeast: LatLng;
    southwest: LatLng;
  };
};

type Photo = {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
};

type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};
