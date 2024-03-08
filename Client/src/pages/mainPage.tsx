import React from "react";
import { useEffect, useState } from "react";
import type { IndexAnimeType } from "../types/Index";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Slider from "../components/slider";

function MainAnimePage() {
  const [animeList, setAnimeList] = useState<IndexAnimeType[]>();

  useEffect(() => {
    console.log("1");

    const fetchedData = async () => {
      let list = await fetch("http://localhost:8080/anime");
      let listJson = await list.json();
      console.log({ list, listJson });

      setAnimeList(listJson);
    };

    fetchedData();
  }, []);

  return (
    <div className="main">
      <Header></Header>
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
    </div>
  );
}

export default MainAnimePage;
