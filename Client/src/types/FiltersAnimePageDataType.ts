export interface FiltersAnimePageDataType {
  date?: FiltersDateType;
  genres: string[];
  status: string[];
  order: string;
}

export interface FiltersDateType {
  isCheckedSeason: boolean;
  startYear: number;
  endYear: number | undefined;
  selectedSeasons: {
    [key: string]: boolean;
  };
}
