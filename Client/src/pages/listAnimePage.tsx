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
import { FiltersAnimePageDataType } from "../types/FiltersAnimePageDataType";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams } from "react-router-dom";
import { GenresNameIdEnum } from "../enums/GenresEnum";

function getDefaultFilters(
  searchParams: URLSearchParams
): FiltersAnimePageDataType {
  const genres = searchParams.get("genres")?.split(",");

  const genreIds = genres
    ? genres.map((item: string) => GenresNameIdEnum[item])
    : [];
  return {
    genres: genreIds,
    status: [],
    order: "ranked_shiki",
  };
}

export default function ListAnimePage() {
  let [searchParams, setSearchParams] = useSearchParams();

  const defaultFilters = getDefaultFilters(searchParams);

  const [animeList, setAnimeList] = useState<MainAnimePageDataType[]>();
  const [page, setPage] = useState<number>(4);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isHasNotMoreData, setIsHasNotMoreData] = useState<boolean>(false);
  const [filters, setFilters] =
    useState<FiltersAnimePageDataType>(defaultFilters);
  const firstAnimeChankLength = 36;

  const getMainAnimePageData = async (
    limit = firstAnimeChankLength.toString(),
    page = "1",
    isPrimaryLoad = false
  ): Promise<MainAnimePageDataType[]> => {
    const url = "https://shikimori.one/api/graphql";
    const headers = {
      "Content-Type": "application/json",
      Accept: "*/*",
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

    if (
      isPrimaryLoad &&
      response.data.data.animes.length < firstAnimeChankLength
    ) {
      setIsHasNotMoreData(true);
    }

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
    let listJson = await getMainAnimePageData(
      firstAnimeChankLength.toString(),
      "1",
      true
    );
    setAnimeList(listJson);
  };

  const handleSearchParams = () => {
    // const genres = searchParams.get("genres")?.split(",");
    // const genreIds = genres?.map((item: string) => GenresNameIdEnum[item]);
    // setFilters((filters) => ({ ...filters, genres: genreIds }));
  };

  const getMoreAnimes = async () => {
    if (isHasNotMoreData) {
      return;
    }
    setTimeout(async () => {
      let newPageAnimes = await getMainAnimePageData("24", page.toString());

      if (newPageAnimes.length < 24) {
        console.log("no more cal");

        setIsHasNotMoreData(true);
        setIsLoading(false);
      }

      setPage(page + 1);

      if (animeList) {
        setAnimeList(animeList.concat(newPageAnimes));
      }

      setIsLoading(false);
    }, 0);
  };

  useEffect(() => {
    handleSearchParams();
    fetchedData();
    window.addEventListener("scroll", handleScroll);
  }, []);

  const debounced = useDebouncedCallback(() => fetchedData(), 1000);

  useEffect(() => {
    setIsHasNotMoreData(false);
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
        <Filter
          setSearchParams={setSearchParams}
          filters={filters}
          setFilters={setFilters}
        ></Filter>
      </div>
      <InfiniteScroll
        dataLength={animeList?.length || 0}
        next={getMoreAnimes}
        hasMore={!isHasNotMoreData}
        loader={<Spinner></Spinner>}
        scrollThreshold="300px"
      >
        <ul id="scrollableDiv" className="main-list">
          {animeList?.map((anime: IndexAnimeType) => (
            <li key={anime.id} className="main-list-item">
              <Link to={`/anime/${anime.id}`} className="anime-card">
                {anime.score > 0 ? (
                  <span className="anime-card__score">{anime.score}</span>
                ) : (
                  <span className="anime-card__score">Анонс</span>
                )}

                <img
                  className="anime-card__image"
                  src={
                    anime.poster?.mainUrl ??
                    "https://shikimori.one/assets/globals/missing/main.png"
                  }
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
