import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

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

export default function RangeSlider(props: {
  min: number;
  max: number;
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { min, max, selectedYear, setSelectedYear } = props;

  const handleChange = (event: Event, newValue: number | number[]) => {
    setSelectedYear(newValue as number);
  };

  return (
    <div>
      <Box sx={{ width: 300, padding: "0 16px" }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={selectedYear}
          valueLabelDisplay="auto"
          onChange={handleChange}
          defaultValue={max}
          min={min}
          max={max}
          marks={marks}
        />
      </Box>
    </div>
  );
}
