import React from "react";
import { AnimePageDataType } from "../../types/Index";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function DetailedAnimePageScreenshotsSlider(props: {
  anime: AnimePageDataType | undefined;
}) {
  const { anime } = props;

  return (
    <div className="screenshots">
      <h3 className="screenshots__title">
        Кадры
      </h3>
      <Swiper
        effect={"coverflow"}
        spaceBetween={30}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper: any) => console.log(swiper)}
        loop={true}
        centeredSlides={true}
        grabCursor={true}
        navigation
        slidesPerView={3}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 2.5,
        }}
        className="screenshots-slider"
      >
        {anime?.screenshots.map((item) => {
          return (
            <SwiperSlide className="screenshots-slider-slide">
              <img
                className="screenshots-slider-slide__image"
                src={item.originalUrl}
                alt=""
              ></img>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default DetailedAnimePageScreenshotsSlider;
