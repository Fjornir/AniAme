import React, { useCallback, useEffect, useState } from "react";
import RangeSlider from "./rangeSlider";
import "../../style/components/filter.scss";
import { FiltersDateType } from "../../types/FiltersAnimePageDataType";
import RangeSliderCheckboxes from "./rangeSliderCheckboxes";
import GenresCheckboxes from "./genresCheckboxes";
import { SetURLSearchParams } from "react-router-dom";

export default function Filter(props: {
  setFilters: React.Dispatch<
    React.SetStateAction<{
      date?: FiltersDateType;
    }>
  >;
  setSearchParams: SetURLSearchParams;
}) {
  const { setFilters, setSearchParams } = props;
  const minYear = 1990;
  const maxYear = new Date().getFullYear();

  const [isSingleYear, setIsSingleYear] = useState<boolean>(true);

  const [genres, setGenres] = useState<string[]>([]);

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
    console.log("123");

    setFilters((filters) => ({ ...filters, date, genres }));
  }, [date, setFilters, genres]);

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
