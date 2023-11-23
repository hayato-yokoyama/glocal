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

type LatLng = {
  lat: number;
  lng: number;
};
