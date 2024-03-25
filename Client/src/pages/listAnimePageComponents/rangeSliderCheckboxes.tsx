import React, { useCallback, useEffect, useState } from "react";
import { FiltersDateType } from "../../types/FiltersAnimePageDataType";
import "../../style/filter/rangeFilter.scss";
import { Checkbox } from "@mui/material";

export default function RangeSliderCheckboxes(props: {
  isSingleYear: boolean;
  setIsSingleYear: React.Dispatch<React.SetStateAction<boolean>>;
  date: FiltersDateType;
  seasonSelectHandler: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const { isSingleYear, setIsSingleYear, date, seasonSelectHandler } = props;
  return (
    <div className="range-slider">
      <div className="range-slider-item">По дате</div>
      <div className="range-slider-item">
        <Checkbox
          id="scales"
          name="scales"
          checked={isSingleYear}
          onChange={() => setIsSingleYear(!isSingleYear)}
        />
        Сезоны
      </div>
      {isSingleYear ? (
        <div className="range-slider-item">
          <Checkbox
            id="summer-season"
            name="summer"
            checked={date.selectedSeasons.summer}
            onChange={seasonSelectHandler}
          />
          Лето
          <Checkbox
            id="fall-season"
            name="fall"
            checked={date.selectedSeasons.fall}
            onChange={seasonSelectHandler}
          />
          Осень
          <Checkbox
            id="winter-season"
            name="winter"
            checked={date.selectedSeasons.winter}
            onChange={seasonSelectHandler}
          />
          Зима
          <Checkbox
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
  );
}
