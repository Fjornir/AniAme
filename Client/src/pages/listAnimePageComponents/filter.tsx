import React, { useCallback, useEffect, useState } from "react";
import RangeSlider from "./rangeSlider";
import { MainAnimePageDataType } from "../../types/MainAnimePageDataType";
import axios from "axios";
import getFiltredAnimeQuery from "../../querys/getFiltredAnimeQuery";
import "../../style/components/filter.scss";
import { FiltersDateType } from "../../types/FiltersAnimePageDataType";
import RangeSliderCheckboxes from "./rangeSliderCheckboxes";

export default function Filter(props: {
  setFilters: React.Dispatch<
    React.SetStateAction<{
      date?: FiltersDateType;
    }>
  >;
}) {
  const { setFilters } = props;
  const minYear = 1990;
  const maxYear = new Date().getFullYear();

  const [isSingleYear, setIsSingleYear] = useState<boolean>(true);

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
    setFilters((filters) => ({ ...filters, date }));
  }, [date, setFilters]);

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
      <form>
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
      </form>
    </div>
  );
}
