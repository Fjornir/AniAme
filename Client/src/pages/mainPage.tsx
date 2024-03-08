import React from "react";
import { useEffect, useState } from "react";
import type { IndexAnimeType } from "../types/Index";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Slider from "../components/slider";

function MainAnimePage() {
  const [animeList, setAnimeList] = useState<IndexAnimeType[]>();
  const [page, setPage] = useState<number>(4);
  let isLoading = false;

  window.addEventListener("scroll", async () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    isLoading = true;
    await getMoreAnimes();
  });

  useEffect(() => {
    const fetchedData = async () => {
      let list = await fetch(
        "http://localhost:8080/anime?" +
          new URLSearchParams({
            limit: "36",
            page: "1",
          })
      );

      console.log({ list });
      let listJson = await list.json();

      setAnimeList(listJson);
    };

    fetchedData();
  }, []);

  const getMoreAnimes = async () => {
    console.log("getMoreAnimes Start", isLoading);
    let list = await fetch(
      "http://localhost:8080/anime?" +
        new URLSearchParams({
          limit: "12",
          page: page.toString(),
        })
    );

    setPage(page + 1);

    let newPageAnimes = await list.json();
    console.log(animeList, newPageAnimes);

    if (animeList) {
      setAnimeList([...animeList, ...newPageAnimes]);
    }

    setTimeout(() => {
      isLoading = false;
      console.log("getMoreAnimes end", isLoading);
    }, 2000);
  };

  return (
    <div className="main">
      <Slider></Slider>
      <h3 className="main__title">Аниме</h3>
      <div className="main-wrapper">
        <ul className="main-list">
          {animeList?.map((anime: IndexAnimeType) => (
            <li key={anime.id} className="main-list-item">
              <Link to={`anime/${anime.id}`} className="anime-card">
                <img
                  className="anime-card__image"
                  src={anime.poster.mainUrl}
                  alt={
                    anime.licenseNameRu ??
                    anime.russian ??
                    anime.english ??
                    anime.name
                  }
                />
                <div className="anime-card-name-wrapper">
                  <span className="anime-card-name-wrapper__title">
                    {anime.licenseNameRu ??
                      anime.russian ??
                      anime.english ??
                      anime.name}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={getMoreAnimes}>Показать еще</button>
    </div>
  );
}

export default MainAnimePage;
