import React, { useEffect, useState } from "react";
import "../style/components/search.scss";
import searchLogo from "../imgs/icons/search-svgrepo-com.svg";
import { AnimePageDataType } from "../types/Index";
import { Link } from "react-router-dom";
import { Unstable_Popup as Popup } from "@mui/base/Unstable_Popup";
import { styled } from "@mui/system";
import kindAnimes from "../common/kindAnimes";
import { AnimeSearchDataType } from "../types/AnimeSearchDataType";
import getAnimeSearchQuery from "../querys/getAnimeSearchQuery";

export default function Search() {
  const [inputText, setInputText] = useState<string>("");
  const [anime, setAnime] = useState<AnimeSearchDataType[]>();
  const [isNeedToUpdate, setIsNeedToUpdate] = useState<boolean>(false);
  const [isShowResults, setIsShowResults] = useState<boolean>(false);

  useEffect(() => {
    if (!isNeedToUpdate) {
      return;
    }
    getAnime();
  }, [isNeedToUpdate]);

  useEffect(() => {
    if (inputText === "") {
      setIsShowResults(false);
    }
    return;
  }, [isShowResults]);

  function getStatus(status: string) {
    switch (status) {
      case "anons":
        return "Анонс";
        break;
      case "ongoing":
        return "Выходит";
        break;
      case "released":
        return "Вышло";
        break;
      default:
        break;
    }
  }

  async function getAnimeSearchData(
    search: string
  ): Promise<AnimeSearchDataType[]> {
    const url = "https://shikimori.one/api/graphql";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
      },
      body: JSON.stringify({
        query: getAnimeSearchQuery(search),
      }),
    };

    const res = await fetch(url, options);
    const animeList = await res.json();

    return animeList.data.animes;
  }

  async function getAnime() {
    // let list = await fetch(
    //   "http://localhost:8080/anime/search?" +
    //     new URLSearchParams({
    //       search: inputText,
    //     })
    // );
    let listJson = await getAnimeSearchData(inputText);
    setAnime(listJson);
    setIsNeedToUpdate(false);
    if (inputText) {
      setIsShowResults(true);
    }
  }

  return (
    <div className="search">
      <img className="search__logo" src={searchLogo} alt="" />
      <input
        className="search__input"
        type="text"
        value={inputText}
        onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInputText(event.target.value);
          setIsNeedToUpdate(true);
        }}
      ></input>
      {isShowResults ? (
        <>
          <div className="search-result-wrapper">
            {anime?.length
              ? anime?.map((item) => (
                  <Link
                    onClick={() => {
                      setIsShowResults(false);
                      setInputText("");
                    }}
                    to={`anime/${item.id}`}
                  >
                    <div className="search-result-item">
                      <img
                        className="search-result-item__image"
                        src={item.poster?.mainUrl}
                        alt=""
                      />
                      <div className="search-result-item-description">
                        <div className="search-result-item-description__title">
                          {item.russian}
                        </div>
                        <div className="search-result-item-description-about">
                          <div className="search-result-item-description-about-item">
                            Тип: {kindAnimes(item.kind)}
                          </div>
                          <div className="search-result-item-description-about-item">
                            {item.releasedOn.year}
                          </div>
                          <div className="search-result-item-description-about-item">
                            {getStatus(item.status)}
                          </div>
                        </div>
                        <div className="search-result-item-description__genres">
                          Жанр: {item.genres.map((elem) => elem.russian + " ")}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              : "Ничего не найдено"}
          </div>
          <div
            onClick={() => setIsShowResults(false)}
            className="search-result__background"
          ></div>
        </>
      ) : null}
    </div>
  );
}
const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const PopupBody = styled("div")(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  box-shadow: ${
    theme.palette.mode === "dark"
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  z-index: 1;
`
);
