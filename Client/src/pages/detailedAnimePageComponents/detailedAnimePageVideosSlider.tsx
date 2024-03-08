import React from "react";
import { AnimePageDataType } from "../../types/Index";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function detailedAnimePageVideosSlider(props: {
  anime: AnimePageDataType | undefined;
}) {
  const { anime } = props;

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
        slidesPerView={1}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 2.5,
        }}
        className="videos"
      >
        {anime?.videos.map((item) => {
          
          if (item.kind === "op" || item.kind === "ed" || item.kind === "op_ed_clip" ) {
            return (
              <SwiperSlide className="videos-slide">
                <img src={item.imageUrl} alt=""></img>
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
    </div>
  );
}

export default detailedAnimePageVideosSlider;
