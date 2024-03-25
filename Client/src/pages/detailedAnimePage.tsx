import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type {
  AnimePageDataType,
  DetailedAnimePageScreenshots,
  DetailedAnimePageVideos,
} from "../types/Index";
import DetailedAnimePageInfo from "./detailedAnimePageComponents/detailedAnimePageInfo";
import DetailedAnimePageSlider from "./detailedAnimePageComponents/detailedAnimePageSlider";
import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import getAnimePageQuery from "../querys/getAnimePageQuery";
import getAnimeBannerQuery from "../querys/getAnimeBannerQuery";

function DetailedAnimePage() {
  const [anime, setAnime] = useState<AnimePageDataType>();
  const [galleryItems, setGalleryItems] = useState<{
    images: ReactImageGalleryItem[];
    videos: ReactImageGalleryItem[];
  }>({ images: [], videos: [] });
  const [isVisibleImageGallery, setIsVisibleImageGallery] =
    useState<boolean>(false);
  const [isVisibleVideoGallery, setIsVisibleVideoGallery] =
    useState<boolean>(false);
  const [currentGalleryItem, setCurrentGalleryItem] = useState<number>(0);
  const { id } = useParams<string>();

  const escFunction = useCallback((event: { key: string }) => {
    if (event.key === "Escape") {
      setIsVisibleImageGallery(false);
      setIsVisibleVideoGallery(false);
    }
  }, []);

  useEffect(() => {
    getAnime();
  }, [window.location.pathname]);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  function getCustomVideoRender(item: any) {
    return (
      <iframe
        className="image-gallery-image"
        src={item.original}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    );
  }

  function onSliderClickHandler(
    e: React.MouseEvent<HTMLElement>,
    index: number,
    type: "videos" | "screenshots"
  ) {
    switch (type) {
      case "videos":
        setCurrentGalleryItem(index);
        setIsVisibleVideoGallery(true);
        break;
      case "screenshots":
        setCurrentGalleryItem(index);
        setIsVisibleImageGallery(true);
        break;
      default:
        break;
    }
  }

  const getAnimePageData = async (id: string): Promise<AnimePageDataType> => {
    const url = "https://shikimori.one/api/graphql";
    let data;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
      },
      body: JSON.stringify({
        query: getAnimePageQuery(id),
      }),
    };

    try {
      const res = await fetch(url, options);
      const animeList = await res.json();
      data = animeList.data.animes[0];
    } catch (error) {
      console.error(error);
    }

    const bannerUrl = "https://graphql.anilist.co";
    const bannerOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
      },
      body: JSON.stringify({
        query: getAnimeBannerQuery(data.malId),
      }),
    };

    const bannerRes = await fetch(bannerUrl, bannerOptions);
    const banner = await bannerRes.json();
    data.bannerImage = banner.data.Media.bannerImage;
    data.coverImage = banner.data.Media.coverImage.large;
    return data;
  };

  async function getAnime() {
    if (!id) return;
    let animeJson = await getAnimePageData(id);
    // let animeJson = await res.json();
    setAnime(animeJson);
    setGalleryItems({
      images: animeJson.screenshots.map(
        (item: DetailedAnimePageScreenshots) => ({
          original: item.originalUrl,
          thumbnail: item.x332Url,
        })
      ),
      videos: animeJson.videos
        .filter(
          (item: DetailedAnimePageVideos) =>
            item.kind === "op" ||
            item.kind === "ed" ||
            item.kind === "op_ed_clip"
        )
        .map((item: DetailedAnimePageVideos) => ({
          original: item.playerUrl,
          thumbnail: item.imageUrl,
        })),
    });
  }

  function parseDescription() {
    if (anime?.description === null) return "Отсутствует";
    const parcedDescription = anime?.description.replace(/\[.*?\]/g, "");
    return parcedDescription;
  }

  return (
    <div className="detailed">
      <span>{window.location.pathname}</span>

      {anime ? (
        <div
          className="detailed-wrapper"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
              anime.bannerImage ? anime.bannerImage : anime.poster.originalUrl
            })`,
          }}
        >
          <div className="detailed-anime">
            <img
              className="detailed-anime__image"
              src={anime.poster.originalUrl}
              alt=""
            ></img>
            <div className="detailed-anime-wrapper">
              <div className="detailed-anime-titles">
                <div className="detailed-anime-titles__default">
                  {anime.licenseNameRu ??
                    anime.russian ??
                    anime.english ??
                    anime.name}
                </div>
                <div className="detailed-anime-titles__default detailed-anime-titles__english">
                  {anime.english ??
                    anime.russian ??
                    anime.english ??
                    anime.name}
                </div>
                <div className="detailed-anime-titles__default detailed-anime-titles__japanese">
                  {anime.japanese ??
                    anime.russian ??
                    anime.english ??
                    anime.name}
                </div>
              </div>
              <DetailedAnimePageInfo anime={anime}></DetailedAnimePageInfo>
            </div>
          </div>
          <div className="detailed-anime-description">
            <h3 className="detailed-anime-description__title">Описание:</h3>
            <div className="detailed-anime-description__text">
              {parseDescription()}
            </div>
          </div>
          {isVisibleImageGallery ? (
            <div className="image-gallary-wrapper">
              <button
                onClick={() => setIsVisibleImageGallery(false)}
                className="image-gallary-wrapper__close-btn"
              >
                x
              </button>
              <ImageGallery
                showPlayButton={false}
                showFullscreenButton={true}
                items={galleryItems.images}
                startIndex={currentGalleryItem}
              />
            </div>
          ) : (
            ""
          )}
          {isVisibleVideoGallery ? (
            <div className="image-gallary-wrapper">
              <button
                onClick={() => setIsVisibleVideoGallery(false)}
                className="image-gallary-wrapper__close-btn"
              ></button>
              <ImageGallery
                showPlayButton={false}
                showFullscreenButton={false}
                renderItem={getCustomVideoRender}
                items={galleryItems.videos}
                startIndex={currentGalleryItem}
                lazyLoad={true}
              />
            </div>
          ) : (
            ""
          )}
          <div className="detailed-anime-previews">
            <DetailedAnimePageSlider
              anime={anime}
              type="videos"
              onSliderClickHandler={onSliderClickHandler}
            ></DetailedAnimePageSlider>
            <DetailedAnimePageSlider
              anime={anime}
              type="screenshots"
              onSliderClickHandler={onSliderClickHandler}
            ></DetailedAnimePageSlider>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default DetailedAnimePage;
