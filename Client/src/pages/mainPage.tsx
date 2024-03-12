import React from "react";
import { useEffect, useState } from "react";
import type { IndexAnimeType } from "../types/Index";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Slider from "../components/slider";
import Spinner from "../components/spinner";
import InfiniteScroll from "react-infinite-scroll-component";

function MainAnimePage() {
  const [animeList, setAnimeList] = useState<IndexAnimeType[]>();
  const [page, setPage] = useState<number>(4);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchedData();
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop + 1) !==
        document.documentElement.offsetHeight ||
      isLoading
    )
      return;
    setIsLoading(true);
    console.log(isLoading);
  };

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


  
  const getMoreAnimes = async () => {
    console.log("getMoreAnimes Start", isLoading);
    setTimeout(async () => {
      let list = await fetch(
        "http://localhost:8080/anime?" +
          new URLSearchParams({
            limit: "24",
            page: page.toString(),
          })
      );

      setPage(page + 1);

      let newPageAnimes = await list.json();
      console.log(animeList, newPageAnimes);

      if (animeList) {
        setAnimeList(animeList.concat(newPageAnimes));
      }

      setIsLoading(false);
      console.log("getMoreAnimes end", isLoading);
    }, 0);
  };

  useEffect(() => {
    if (!isLoading) {
      return;
    }
    getMoreAnimes();
  }, [isLoading]);

  return (
    <div className="main">
      <Slider></Slider>
      <h3 className="main__title">Аниме</h3>
      <div className="main-wrapper">
        <InfiniteScroll
          dataLength={animeList?.length || 0}
          next={getMoreAnimes}
          hasMore={true}
          loader={<Spinner></Spinner>}
          scrollThreshold="300px"
        >
          <ul id="scrollableDiv" className="main-list">
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
        </InfiniteScroll>
        {/* {animeList?.map((anime: IndexAnimeType) => (
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
          ))} */}
      </div>
      {isLoading && <Spinner></Spinner>}
    </div>
  );
}

export default MainAnimePage;
