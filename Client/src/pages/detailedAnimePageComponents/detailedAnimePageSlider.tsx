import React from "react";
import { AnimePageDataType } from "../../types/Index";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function DetailedAnimePageScreenshotsSlider(props: {
  anime: AnimePageDataType;
  type: string | undefined;
  onSliderClickHandler: (
    e: React.MouseEvent<HTMLElement>,
    index: number,
    type: "videos" | "screenshots"
  ) => void;
}) {
  const { anime, type, onSliderClickHandler } = props;

  return (
    <div className={type === "screenshots" ? "screenshots" : "videos"}>
      <h3 className="screenshots__title">
        {type === "screenshots" ? "Кадры" : "Видео"}
      </h3>

      <Swiper
        effect={"coverflow"}
        spaceBetween={30}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true}
        centeredSlides={true}
        grabCursor={true}
        navigation
        slidesPerView={type === "screenshots" ? 3 : 1}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 2.5,
        }}
        className={
          type === "screenshots" ? "screenshots-slider" : "videos-slider"
        }
      >
        {type === "screenshots"
          ? anime?.screenshots.map((item, index) => (
              <SwiperSlide className="screenshots-slider-slide">
                <img
                  onClick={(e: React.MouseEvent<HTMLElement>) =>
                    onSliderClickHandler(e, index, "screenshots")
                  }
                  className="screenshots-slider-slide__image"
                  src={item.originalUrl}
                  alt=""
                ></img>
              </SwiperSlide>
            ))
          : anime?.videos
              .filter(
                (item) =>
                  item.kind === "op" ||
                  item.kind === "ed" ||
                  item.kind === "op_ed_clip"
              )
              .map((item, index) => (
                <SwiperSlide className="videos-slider__slide">
                  <img
                    onClick={(e: React.MouseEvent<HTMLElement>) =>
                      onSliderClickHandler(e, index, "videos")
                    }
                    src={item.imageUrl}
                    alt=""
                  ></img>
                </SwiperSlide>
              ))}
        {}
      </Swiper>
    </div>
  );
}

export default DetailedAnimePageScreenshotsSlider;
