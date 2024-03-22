import React, { useCallback, useEffect, useState } from "react";
import "../../style/genres.scss";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SetURLSearchParams } from "react-router-dom";
import { GenresIdNameEnum } from "../../enums/GenresEnum";

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function GenresCheckboxes(props: {
  personName: string[];
  setPersonName: React.Dispatch<React.SetStateAction<string[]>>;
  setSearchParams: SetURLSearchParams;
}) {
  const { personName, setPersonName, setSearchParams } = props;
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    console.log(value);

    setSearchParams(
      `?genres=` +
        Object.entries(GenresIdNameEnum)
          .filter((item) => value.includes(item[0]))
          .map((item) => item[1])
    );

    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div className="genres">
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Жанры</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {genresNames.map((item) => (
            <MenuItem
              key={item.name}
              value={item.id}
              style={getStyles(item.name, personName, theme)}
            >
              {item.russian}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const genresNames = [
  {
    id: "27",
    name: "Shounen",
    russian: "Сёнен",
  },
  {
    id: "25",
    name: "Shoujo",
    russian: "Сёдзё",
  },
  {
    id: "42",
    name: "Seinen",
    russian: "Сэйнэн",
  },
  {
    id: "43",
    name: "Josei",
    russian: "Дзёсей",
  },
  {
    id: "15",
    name: "Kids",
    russian: "Детское",
  },
  {
    id: "5",
    name: "Avant Garde",
    russian: "Авангард",
  },
  {
    id: "2",
    name: "Adventure",
    russian: "Приключения",
  },
  {
    id: "4",
    name: "Comedy",
    russian: "Комедия",
  },
  {
    id: "9",
    name: "Ecchi",
    russian: "Этти",
  },
  {
    id: "10",
    name: "Fantasy",
    russian: "Фэнтези",
  },
  {
    id: "14",
    name: "Horror",
    russian: "Ужасы",
  },
  {
    id: "36",
    name: "Slice of Life",
    russian: "Повседневность",
  },
  {
    id: "133",
    name: "Boys Love",
    russian: "Сёнен-ай",
  },
  {
    id: "117",
    name: "Suspense",
    russian: "Триллер",
  },
  {
    id: "22",
    name: "Romance",
    russian: "Романтика",
  },
  {
    id: "543",
    name: "Gourmet",
    russian: "Гурман",
  },
  {
    id: "24",
    name: "Sci-Fi",
    russian: "Фантастика",
  },
  {
    id: "30",
    name: "Sports",
    russian: "Спорт",
  },
  {
    id: "37",
    name: "Supernatural",
    russian: "Сверхъестественное",
  },
  {
    id: "8",
    name: "Drama",
    russian: "Драма",
  },
  {
    id: "1",
    name: "Action",
    russian: "Экшен",
  },
  {
    id: "7",
    name: "Mystery",
    russian: "Тайна",
  },
  {
    id: "129",
    name: "Girls Love",
    russian: "Сёдзё-ай",
  },
  {
    id: "539",
    name: "Erotica",
    russian: "Эротика",
  },
  {
    id: "12",
    name: "Hentai",
    russian: "Хентай",
  },
  {
    id: "130",
    name: "Isekai",
    russian: "Исэкай",
  },
  {
    id: "134",
    name: "Childcare",
    russian: "Забота о детях",
  },
  {
    id: "20",
    name: "Parody",
    russian: "Пародия",
  },
  {
    id: "142",
    name: "Performing Arts",
    russian: "Исполнительское искусство",
  },
  {
    id: "148",
    name: "Pets",
    russian: "Питомцы",
  },
  {
    id: "135",
    name: "Magical Sex Shift",
    russian: "Магическая смена пола",
  },
  {
    id: "143",
    name: "Anthropomorphic",
    russian: "Антропоморфизм",
  },
  {
    id: "102",
    name: "Team Sports",
    russian: "Командный спорт",
  },
  {
    id: "151",
    name: "Romantic Subtext",
    russian: "Романтический подтекст",
  },
  {
    id: "107",
    name: "Love Polygon",
    russian: "Любовный многоугольник",
  },
  {
    id: "31",
    name: "Super Power",
    russian: "Супер сила",
  },
  {
    id: "38",
    name: "Military",
    russian: "Военное",
  },
  {
    id: "32",
    name: "Vampire",
    russian: "Вампиры",
  },
  {
    id: "145",
    name: "Idols (Female)",
    russian: "Идолы (Жен.)",
  },
  {
    id: "40",
    name: "Psychological",
    russian: "Психологическое",
  },
  {
    id: "141",
    name: "Survival",
    russian: "Выживание",
  },
  {
    id: "106",
    name: "Reincarnation",
    russian: "Реинкарнация",
  },
  {
    id: "144",
    name: "Crossdressing",
    russian: "Кроссдрессинг",
  },
  {
    id: "119",
    name: "CGDCT",
    russian: "CGDCT",
  },
  {
    id: "147",
    name: "Medical",
    russian: "Медицина",
  },
  {
    id: "17",
    name: "Martial Arts",
    russian: "Боевые искусства",
  },
  {
    id: "18",
    name: "Mecha",
    russian: "Меха",
  },
  {
    id: "23",
    name: "School",
    russian: "Школа",
  },
  {
    id: "29",
    name: "Space",
    russian: "Космос",
  },
  {
    id: "35",
    name: "Harem",
    russian: "Гарем",
  },
  {
    id: "114",
    name: "Award Winning",
    russian: "Удостоено наград",
  },
  {
    id: "21",
    name: "Samurai",
    russian: "Самураи",
  },
  {
    id: "13",
    name: "Historical",
    russian: "Исторический",
  },
  {
    id: "3",
    name: "Racing",
    russian: "Гонки",
  },
  {
    id: "124",
    name: "Mahou Shoujo",
    russian: "Махо-сёдзё",
  },
  {
    id: "150",
    name: "Idols (Male)",
    russian: "Идолы (Муж.)",
  },
  {
    id: "103",
    name: "Video Game",
    russian: "Видеоигры",
  },
  {
    id: "149",
    name: "Educational",
    russian: "Образовательное",
  },
  {
    id: "139",
    name: "Workplace",
    russian: "Работа",
  },
  {
    id: "136",
    name: "Showbiz",
    russian: "Шоу-бизнес",
  },
  {
    id: "105",
    name: "Gore",
    russian: "Жестокость",
  },
  {
    id: "140",
    name: "Iyashikei",
    russian: "Иясикэй",
  },
  {
    id: "19",
    name: "Music",
    russian: "Музыка",
  },
  {
    id: "112",
    name: "Gag Humor",
    russian: "Гэг-юмор",
  },
  {
    id: "146",
    name: "High Stakes Game",
    russian: "Игра с высокими ставками",
  },
  {
    id: "6",
    name: "Mythology",
    russian: "Мифология",
  },
  {
    id: "118",
    name: "Combat Sports",
    russian: "Спортивные единоборства",
  },
  {
    id: "137",
    name: "Otaku Culture",
    russian: "Культура отаку",
  },
  {
    id: "111",
    name: "Time Travel",
    russian: "Путешествие во времени",
  },
  {
    id: "104",
    name: "Adult Cast",
    russian: "Взрослые персонажи",
  },
  {
    id: "39",
    name: "Detective",
    russian: "Детектив",
  },
  {
    id: "11",
    name: "Strategy Game",
    russian: "Стратегические игры",
  },
  {
    id: "108",
    name: "Visual Arts",
    russian: "Изобразительное искусство",
  },
  {
    id: "138",
    name: "Organized Crime",
    russian: "Организованная преступность",
  },
  {
    id: "131",
    name: "Delinquents",
    russian: "Хулиганы",
  },
  {
    id: "125",
    name: "Reverse Harem",
    russian: "Реверс-гарем",
  },
  {
    id: "33",
    name: "Yaoi",
    russian: "Яой",
  },
  {
    id: "34",
    name: "Yuri",
    russian: "Юри",
  },
];
