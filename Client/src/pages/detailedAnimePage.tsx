import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { AnimePageDataType } from "../types/Index";
import Header from "../components/header";
import DetailedAnimePageInfo from "./detailedAnimePageComponents/detailedAnimePageInfo";
import DetailedAnimePageScreenshotsSlider from "./detailedAnimePageComponents/detailedAnimePageScreenshotsSlider";
import DetailedAnimePageVideosSlider from "./detailedAnimePageComponents/detailedAnimePageVideosSlider";

function DetailedAnimePage() {
  const [anime, setAnime] = useState<AnimePageDataType>();
  const { id } = useParams();

  useEffect(() => {
    getAnime();
  }, []);

  async function getAnime() {
    let res = await fetch(`http://localhost:8080/anime/${id}`);
    let animeJson = await res.json();
    setAnime(animeJson);
  }

  function parseDescription() {
    const parcedDescription = anime?.description.replace(/\[.*?\]/g, "");
    return parcedDescription;
  }

  return (
    <div className="detailed">
      <Header></Header>
      <div
        className="detailed-anime"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
            anime?.bannerImage ? anime?.bannerImage : anime?.poster.originalUrl
          })`,
        }}
      >
        <img
          className="detailed-anime__image"
          src={anime?.poster.originalUrl}
          alt=""
        ></img>
        <div className="detailed-anime-wrapper">
          <div className="detailed-anime-titles">
            <div className="detailed-anime-titles__default">
              {anime?.licenseNameRu ??
                anime?.russian ??
                anime?.english ??
                anime?.name}
            </div>
            <div className="detailed-anime-titles__default detailed-anime-titles__english">
              {anime?.english ??
                anime?.russian ??
                anime?.english ??
                anime?.name}
            </div>
            <div className="detailed-anime-titles__default detailed-anime-titles__japanese">
              {anime?.japanese ??
                anime?.russian ??
                anime?.english ??
                anime?.name}
            </div>
            {/* <div className="detailed-anime-titles__default detailed-anime-titles__japanese">
              {anime?.synonyms.map((item: string) => {
                <div>{item}</div>
              })}
            </div> */}
          </div>
          <DetailedAnimePageInfo anime={anime}></DetailedAnimePageInfo>
          <div className="detailed-anime-description">{parseDescription()}</div>
        </div>
      </div>
      <div className="detailed-anime-previews">
        <DetailedAnimePageVideosSlider
          anime={anime}
        ></DetailedAnimePageVideosSlider>
        <DetailedAnimePageScreenshotsSlider
          anime={anime}
        ></DetailedAnimePageScreenshotsSlider>
      </div>
    </div>
  );
}

export default DetailedAnimePage;
