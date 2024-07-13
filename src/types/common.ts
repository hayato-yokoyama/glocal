export type SearchParams = {
  distance: number;
  genre: string;
  isOpen: boolean;
  keyword: string;
  place: string;
};

export type StationResponse = {
  response: {
    error?: string;
    station?: {
      line: string;
      name: string;
      next: string;
      postal: string;
      prefecture: string;
      prev: string;
      x: number;
      y: number;
    }[];
  };
};
