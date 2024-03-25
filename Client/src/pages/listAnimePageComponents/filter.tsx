import React, { useCallback, useEffect, useState } from "react";
import RangeSlider from "./rangeSlider";
import "../../style/components/filter.scss";
import {
  FiltersAnimePageDataType,
  FiltersDateType,
} from "../../types/FiltersAnimePageDataType";
import RangeSliderCheckboxes from "./rangeSliderCheckboxes";
import GenresCheckboxes from "./genresCheckboxes";
import { SetURLSearchParams } from "react-router-dom";
import AnimeStatus from "./animeStatus";
import OrderFilter from "./orderFilter";

export default function Filter(props: {
  filters: FiltersAnimePageDataType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersAnimePageDataType>>;
  setSearchParams: SetURLSearchParams;
}) {
  const { filters, setFilters, setSearchParams } = props;
  const minYear = 1990;
  const maxYear = new Date().getFullYear();

  const [isSingleYear, setIsSingleYear] = useState<boolean>(true);
  const [genres, setGenres] = useState<string[]>(filters.genres);
  const [status, setStatus] = useState<string[]>(filters.status);
  const [order, setOrder] = React.useState<string>("ranked_shiki");

  const [date, setDate] = useState<FiltersDateType>({
    isCheckedSeason: isSingleYear,
    startYear: minYear,
    endYear: maxYear,
    selectedSeasons: {
      summer: false,
      fall: false,
      winter: false,
      spring: false,
    },
  });

  useEffect(() => {
    setFilters((filters) => {
      return { ...filters, date, genres, status, order };
    });
  }, [date, setFilters, genres, status, order]);

  function seasonSelectHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const checked = e.target.checked;

    setDate((oldDate) => {
      const newDate: FiltersDateType = { ...oldDate };
      newDate.selectedSeasons = { [name]: checked };
      return newDate;
    });
  }

  return (
    <div className="filter">
      <form className="filter-form">
        <div>
          <OrderFilter order={order} setOrder={setOrder}></OrderFilter>
        </div>
        <div>
          <AnimeStatus status={status} setStatus={setStatus}></AnimeStatus>
        </div>
        <div>
          <RangeSliderCheckboxes
            isSingleYear={isSingleYear}
            setIsSingleYear={setIsSingleYear}
            date={date}
            seasonSelectHandler={seasonSelectHandler}
          ></RangeSliderCheckboxes>
          <RangeSlider
            min={minYear}
            max={maxYear}
            date={date}
            setDate={setDate}
            isSingleTarget={isSingleYear}
          ></RangeSlider>
        </div>
        <div>
          <GenresCheckboxes
            personName={genres}
            setPersonName={setGenres}
            setSearchParams={setSearchParams}
          ></GenresCheckboxes>
        </div>
      </form>
    </div>
  );
}
