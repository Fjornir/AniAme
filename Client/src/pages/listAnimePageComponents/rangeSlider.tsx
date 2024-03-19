import * as React from "react";
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
function valuetext(value: number) {
  return `${value}°C`;
}

export default function RangeSlider(props: {
  min: number;
  max: number;
  selectedYears: number[];
  setSelectedYears: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const { min, max, selectedYears, setSelectedYears } = props;

  const handleChange = (event: Event, newValue: number | number[]) => {
    setSelectedYears(newValue as number[]);
  };

  console.log((new Date().getFullYear() - 1990) / 4 + 1990);

  return (
    <div>
      {" "}
      <Box sx={{ width: 300, padding: "0 16px" }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={selectedYears}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          defaultValue={[min, max]}
          min={min}
          max={max}
          marks={marks}
        />
      </Box>
    </div>
  );
}
