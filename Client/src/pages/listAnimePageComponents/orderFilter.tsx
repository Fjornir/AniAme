import React, { useCallback, useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";

export default function OrderFilter(props: {
  order: string;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { order, setOrder } = props;

  return (
    <div className="order-filter">
      <div>Тип</div>
      <div>
        <Checkbox
          name="raiting"
          checked={order === "ranked_shiki"}
          onChange={() => setOrder("ranked_shiki")}
          inputProps={{ "aria-label": "controlled" }}
        />
        По рейтингу Шикимори
      </div>
      <div>
        <Checkbox
          name="popularity"
          checked={order === "popularity"}
          onChange={() => setOrder("popularity")}
          inputProps={{ "aria-label": "controlled" }}
        />
        По популярности
      </div>
      <div>
        <Checkbox
          name="alphabet"
          checked={order === "name"}
          onChange={() => setOrder("name")}
          inputProps={{ "aria-label": "controlled" }}
        />
        По алфавиту
      </div>
      <div>
        <Checkbox
          name="release"
          checked={order === "aired_on"}
          onChange={() => setOrder("aired_on")}
          inputProps={{ "aria-label": "controlled" }}
        />
        По дате выхода
      </div>
    </div>
  );
}
