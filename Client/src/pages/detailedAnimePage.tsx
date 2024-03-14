import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type {
  AnimePageDataType,
  DetailedAnimePageScreenshots,
  DetailedAnimePageVideos,
} from "../types/Index";
import Header from "../components/header";
import DetailedAnimePageInfo from "./detailedAnimePageComponents/detailedAnimePageInfo";
import DetailedAnimePageSlider from "./detailedAnimePageComponents/detailedAnimePageSlider";
import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";

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
  const { id } = useParams();

  useEffect(() => {
    getAnime();
  }, []);

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
        console.log("videos");
        setCurrentGalleryItem(index);
        setIsVisibleVideoGallery(true);
        break;
      case "screenshots":
        console.log("screen");
        setCurrentGalleryItem(index);
        setIsVisibleImageGallery(true);
        break;
      default:
        console.log("default");
        break;
    }
  }

  async function getAnime() {
    let res = await fetch(`http://localhost:8080/anime/${id}`);
    let animeJson = await res.json();
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
    const parcedDescription = anime?.description.replace(/\[.*?\]/g, "");
    return parcedDescription;
  }

  return (
    <div className="detailed">
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
