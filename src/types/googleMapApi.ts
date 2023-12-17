/** ジオコーディングAPIのレスポンス */
export type GeocodingResponse = {
  results: GeocodingResult[];
  status: string;
};

type GeocodingResult = {
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
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
  geometry: {
    location: LatLng;
    viewport: {
      northeast: LatLng;
      southwest: LatLng;
    };
  };
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours?: {
    open_now: boolean;
  };
  permanently_closed?: boolean;
  photos?: {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }[];
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

// =====
// 共通
// =====
type LatLng = {
  lat: number;
  lng: number;
};
