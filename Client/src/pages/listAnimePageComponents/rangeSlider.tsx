import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { FiltersDateType } from "../../types/FiltersAnimePageDataType";

export default function RangeSlider(props: {
  min: number;
  max: number;
  date: FiltersDateType;
  setDate: React.Dispatch<React.SetStateAction<FiltersDateType>>;
  isSingleTarget: boolean;
}) {
  const { min, max, date, setDate, isSingleTarget } = props;

  const filterConfig = {
    singleTarget: { defaultValue: max },
    doubleTarget: { defaultValue: [min, max] },
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    let startYear;
    let endYear;
    if (isSingleTarget) {
      startYear = date.startYear;
      endYear = newValue as number;
    } else {
      [startYear, endYear] = newValue as number[];
    }
    setDate({
      isCheckedSeason: isSingleTarget,
      startYear: startYear,
      endYear: endYear,
      selectedSeasons: date.selectedSeasons,
    });
  };

  return (
    <div>
      <Box sx={{ width: 300, padding: "0 16px" }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={
            !isSingleTarget && date.endYear
              ? [date.startYear, date.endYear]
              : date.endYear
          }
          valueLabelDisplay="auto"
          onChange={handleChange}
          defaultValue={
            isSingleTarget
              ? filterConfig.singleTarget.defaultValue
              : filterConfig.doubleTarget.defaultValue
          }
          min={min}
          max={max}
          marks={marks}
        />
      </Box>
    </div>
  );
}

const marks = [
  {
    value: 1990,
    label: "1990",
  },
  {
    value: (new Date().getFullYear() - 1990) / 4 + 1990,
    label: Math.ceil((new Date().getFullYear() - 1990) / 4 + 1990).toString(),
  },
  {
    value: (new Date().getFullYear() - 1990) / 2 + 1990,
    label: Math.ceil((new Date().getFullYear() - 1990) / 2 + 1990).toString(),
  },
  {
    value: Math.ceil(((new Date().getFullYear() - 1990) / 4) * 3 + 1990),
    label: Math.ceil(
      ((new Date().getFullYear() - 1990) / 4) * 3 + 1990
    ).toString(),
  },
  {
    value: new Date().getFullYear(),
    label: new Date().getFullYear().toString(),
  },
];
