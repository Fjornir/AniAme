import React, { useCallback, useEffect, useState } from "react";
import RangeSlider from "./rangeSlider";
import { MainAnimePageDataType } from "../../types/MainAnimePageDataType";
import axios from "axios";
import getFiltredAnimeQuery from "../../querys/getFiltredAnimeQuery";
import "../../style/components/filter.scss";

export default function Filter(props: {
  setFilters: React.Dispatch<
    React.SetStateAction<{
      selectedYears?: number[];
    }>
  >;
}) {
  const { setFilters } = props;
  const minYear = 1990;
  const maxYear = new Date().getFullYear();

  const [selectedYears, setSelectedYears] = useState<number[]>([
    minYear,
    maxYear,
  ]);

  useEffect(() => {
    setFilters((filters) => ({
      ...filters,
      selectedYears,
    }));
  }, [selectedYears, setFilters]);

  return (
    <div className="filter">
      <form>
        <RangeSlider
          selectedYears={selectedYears}
          setSelectedYears={setSelectedYears}
          min={minYear}
          max={maxYear}
        ></RangeSlider>
      </form>
    </div>
  );
}
