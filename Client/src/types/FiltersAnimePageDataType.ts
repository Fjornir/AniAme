export interface FiltersAnimePageDataType {
  date?: FiltersDateType;
}

export interface FiltersDateType {
  isCheckedSeason: boolean;
  startYear: number;
  endYear: number | null;
  selectedSeasons: {
    [key: string]: boolean;
  };
}
