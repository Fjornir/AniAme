import React from "react";
import { useEffect, useState } from "react";
import type { IndexAnimeType } from "../types/Index";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/header";
import Slider from "../components/slider";
import Spinner from "../components/spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { MainAnimePageDataType } from "../types/MainAnimePageDataType";
import getIndexAnimeQuery from "../querys/getIndexAnimeQuery";
import axios from "axios";

function MainAnimePage() {
  const [animeList, setAnimeList] = useState<MainAnimePageDataType[]>();
  const [page, setPage] = useState<number>(4);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /////////////////// First data init
  useEffect(() => {
    fetchedData();
    window.addEventListener("scroll", handleScroll);
  }, []);

  /////////////////// Query func for anime data
  const getMainAnimePageData = async (
    limit: string,
    page: string
  ): Promise<MainAnimePageDataType[]> => {
    const url = "https://shikimori.one/api/graphql";
    const headers = {
      "Content-Type": "application/json",
      Accept: "*/*",
    };

    const graphqlQuery = {
      query: getIndexAnimeQuery(limit, page),
      variables: {},
    };

    const response = await axios({
      url: url,
      method: "post",
      headers: headers,
      data: graphqlQuery,
    });

    return response.data.data.animes;
  };

  /////////////////// Func for bottom loader
  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop + 1) !==
        document.documentElement.offsetHeight ||
      isLoading
    )
      return;
    setIsLoading(true);
  };

  /////////////////// Func for first anime pool
  const fetchedData = async () => {
    const listJson = getMainAnimePageData("36", "1");
    setAnimeList(await listJson);
  };

  /////////////////// Func for getting more animes
  const getMoreAnimes = async () => {
    setTimeout(async () => {
      const newPageAnimes = await getMainAnimePageData("24", page.toString());

      setPage(page + 1);

      if (animeList) {
        setAnimeList(animeList.concat(newPageAnimes));
      }

      setIsLoading(false);
    }, 0);
  };

  /////////////////// Hook for getting more animes then on bottom
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
                <Link to={`/anime/${anime.id}`} className="anime-card">
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
      </div>
      {isLoading && <Spinner></Spinner>}
    </div>
  );
}

export default MainAnimePage;
