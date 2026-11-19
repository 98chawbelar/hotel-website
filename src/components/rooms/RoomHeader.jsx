import React from "react";
import { Link } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

import { getImgUrl } from "../../utils/getImgUrl";

const RoomHeader = ({ rooms = [] }) => {
  return (
    <header className="relative h-screen overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop={rooms.length > 1}
        slidesPerView={1}
        speed={1200}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        className="absolute inset-0 h-full w-full"
      >
        {rooms.map((room) => (
          <SwiperSlide key={room._id}>
            <div className="relative h-screen w-full">
              <img
                src={getImgUrl(
                  Array.isArray(room.images) ? room.images[0] : room.images,
                )}
                alt={room.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50" />

              <div className="absolute inset-0 flex items-center z-20">
                <div className="max-w-7xl mx-auto px-6">
                  <h1 className="text-white text-5xl md:text-7xl font-black">
                    {room.name}
                  </h1>

                  <p className="mt-5 text-white/80 max-w-2xl text-lg">
                    {room.description}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </header>
  );
};

export default RoomHeader;
