import React, { useCallback, useEffect, useState } from "react";
import RangeSlider from "./rangeSlider";
import { MainAnimePageDataType } from "../../types/MainAnimePageDataType";
import axios from "axios";
import getFiltredAnimeQuery from "../../querys/getFiltredAnimeQuery";
import "../../style/components/filter.scss";
import ContinueSlider from "./continueSlider";
import { FiltersDateType } from "../../types/FiltersAnimePageDataType";

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

  // const [selectedYear, setSelectedYear] = useState<number>(0);

  // const [selectedYear, setSelectedYear] = useState<number>(0);

  useEffect(() => {
    setFilters({ date });
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
          <div>
            <input
              type="checkbox"
              id="scales"
              name="scales"
              checked={isSingleYear}
              onChange={() => setIsSingleYear(!isSingleYear)}
            />
            Сезоны
            {isSingleYear ? (
              <div>
                <input
                  type="checkbox"
                  id="summer-season"
                  name="summer"
                  checked={date.selectedSeasons.summer}
                  onChange={seasonSelectHandler}
                />
                Лето
                <input
                  type="checkbox"
                  id="fall-season"
                  name="fall"
                  checked={date.selectedSeasons.fall}
                  onChange={seasonSelectHandler}
                />
                Осень
                <input
                  type="checkbox"
                  id="winter-season"
                  name="winter"
                  checked={date.selectedSeasons.winter}
                  onChange={seasonSelectHandler}
                />
                Зима
                <input
                  type="checkbox"
                  id="spring-season"
                  name="spring"
                  checked={date.selectedSeasons.spring}
                  onChange={seasonSelectHandler}
                />
                Весна
              </div>
            ) : (
              ""
            )}
          </div>
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
