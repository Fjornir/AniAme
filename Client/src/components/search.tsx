import React, { useEffect, useState } from "react";
import "../style/components/search.scss";
import searchLogo from "../imgs/icons/search-svgrepo-com.svg";
import { AnimePageDataType } from "../types/Index";
import { Link } from "react-router-dom";

export default function Search() {
  const [inputText, setInputText] = useState<string>("");
  const [anime, setAnime] = useState<AnimePageDataType[]>();
  const [isNeedToUpdate, setIsNeedToUpdate] = useState<boolean>(false);
  const [isShowResults, setIsShowResults] = useState<boolean>(false);
  console.log(inputText);

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

  async function getAnime() {
    let list = await fetch(
      "http://localhost:8080/anime/search?" +
        new URLSearchParams({
          search: inputText,
        })
    );
    let listJson = await list.json();
    setAnime(listJson);
    console.log(anime);
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
            {anime?.map((item) => (
              <Link
                onClick={() => {
                  setIsShowResults(false);
                  setInputText("");
                }}
                to={`anime/${item.id}`}
              >
                {item.russian}
              </Link>
            ))}
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
