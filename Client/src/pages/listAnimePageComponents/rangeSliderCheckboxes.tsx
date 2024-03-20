import React, { useCallback, useEffect, useState } from "react";
import { FiltersDateType } from "../../types/FiltersAnimePageDataType";

export default function RangeSliderCheckboxes(props: {
  isSingleYear: boolean;
  setIsSingleYear: React.Dispatch<React.SetStateAction<boolean>>;
  date: FiltersDateType;
  seasonSelectHandler: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const { isSingleYear, setIsSingleYear, date, seasonSelectHandler } = props;
  return (
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
  );
}
