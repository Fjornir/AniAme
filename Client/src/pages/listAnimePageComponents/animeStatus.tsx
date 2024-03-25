import React, { useCallback, useEffect, useState } from "react";
import "../../style/filter/statusFilter.scss";
import { Checkbox } from "@mui/material";

export default function AnimeStatus(props: {
  status: string[];
  setStatus: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const { status, setStatus } = props;

  const [state, setState] = useState({
    anons: status.includes("anons"),
    ongoing: status.includes("ongoing"),
    released: status.includes("released"),
  });

  const { anons, ongoing, released } = state;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    setStatus(
      Object.entries(state)
        .filter((item) => item[1] === true)
        .map((item) => item[0])
    );
  }, [setStatus, state]);

  return (
    <div className="status">
      <div>Статус</div>
      <div>
        <Checkbox
          id={Object.keys(state)[0]}
          name={Object.keys(state)[0]}
          checked={anons}
          onChange={(event) => handleChange(event)}
        />
        Анонс
      </div>
      <div>
        <Checkbox
          id={Object.keys(state)[1]}
          name={Object.keys(state)[1]}
          checked={ongoing}
          onChange={(event) => handleChange(event)}
        />
        Онгоинг
      </div>
      <div>
        <Checkbox
          id={Object.keys(state)[2]}
          name={Object.keys(state)[2]}
          checked={released}
          onChange={(event) => handleChange(event)}
        />
        Вышел
      </div>
    </div>
  );
}
