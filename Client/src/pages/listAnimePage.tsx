import React from "react";
import { useEffect, useState } from "react";
import type { IndexAnimeType } from "../types/Index";
import { Link } from "react-router-dom";
import Spinner from "../components/spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { MainAnimePageDataType } from "../types/MainAnimePageDataType";
import getIndexAnimeQuery from "../querys/getIndexAnimeQuery";
import axios from "axios";
import Filter from "./listAnimePageComponents/filter";
import getFiltredAnimeQuery from "../querys/getFiltredAnimeQuery";
import { useDebouncedCallback } from "use-debounce";

export default function ListAnimePage() {
  const [animeList, setAnimeList] = useState<MainAnimePageDataType[]>();
  const [page, setPage] = useState<number>(4);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<{
    selectedYears?: number[];
  }>({});

  const getMainAnimePageData = async (
    limit?: string,
    page?: string,
    filters?: {
      selectedYears?: number[];
    }
  ): Promise<MainAnimePageDataType[]> => {
    const url = "https://shikimori.one/api/graphql";
    const headers = {
      "Content-Type": "application/json",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
    };

    const graphqlQuery = {
      query: getFiltredAnimeQuery(limit, page, filters),
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

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop + 1) !==
        document.documentElement.offsetHeight ||
      isLoading
    )
      return;
    setIsLoading(true);
  };

  const fetchedData = async () => {
    let listJson = await getMainAnimePageData("36", "1", filters);
    setAnimeList(listJson);
  };

  const getMoreAnimes = async () => {
    setTimeout(async () => {
      let newPageAnimes = await getMainAnimePageData(
        "24",
        page.toString(),
        filters
      );

      setPage(page + 1);

      if (animeList) {
        setAnimeList(animeList.concat(newPageAnimes));
      }

      setIsLoading(false);
    }, 0);
  };

  useEffect(() => {
    fetchedData();
    window.addEventListener("scroll", handleScroll);
  }, []);

  const debounced = useDebouncedCallback(() => fetchedData(), 1000);

  useEffect(() => {
    debounced();
  }, [filters]);

  useEffect(() => {
    if (!isLoading) {
      return;
    }
    getMoreAnimes();
  }, [isLoading, filters]);

  return (
    <div className="filtered">
      <div>
        <Filter setFilters={setFilters}></Filter>
      </div>
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
              <Link to={`${anime.id}`} className="anime-card">
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
  );
}
