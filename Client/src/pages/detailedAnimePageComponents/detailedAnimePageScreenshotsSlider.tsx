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
  const swiper = useSwiper();

  return (
    <div>
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
        className="screenshots"
      >
        {anime?.screenshots.map((item) => {
          return (
            <SwiperSlide className="screenshots-slide">
              <img
                className="screenshots-slide__image"
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
