import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

const RoomHeader = ({ rooms = [] }) => {
  return (
    <header className="relative  h-screen overflow-hidden ">
      {/* ================= SLIDER ================= */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop={rooms.length > 3}
        slidesPerView={3}
        spaceBetween={20}
        speed={1200}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        className="absolute  inset-0 h-full w-full"
      >
        {rooms.map((room) => (
          <SwiperSlide key={room._id}>
            <div className="relative  w-full h-screen">
              {/* IMAGE */}
              <img
                src={room.images}
                alt={room.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />

              {/* GRADIENT */}
              <div className="absolute  inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/20" />

              {/* CONTENT */}
              <div className="absolute  max-w-7xl inset-0 z-20  mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="max-w-4xl">
                  {/* Badge */}
                  <div className="inline-flex w-fit items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-xl px-4 py-2 rounded-full mb-6">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />

                    <p className="text-white text-xs sm:text-sm tracking-[3px] uppercase">
                      Luxury Room Experience
                    </p>
                  </div>

                  {/* TITLE */}
                  <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                    {room.name}
                  </h1>

                  {/* DESCRIPTION */}
                  <p className="mt-6 text-white/75 text-base sm:text-lg leading-8 max-w-2xl">
                    {room.description}
                  </p>

                  {/* BUTTONS */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-10">
                    <Link to="/booking">
                      <button className="w-full sm:w-auto bg-accent text-primary px-7 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:scale-105 transition duration-300 shadow-2xl">
                        <CiCalendar className="text-xl" />
                        Book Now
                      </button>
                    </Link>

                    <Link to="/rooms">
                      <button className="w-full sm:w-auto border border-white/10 bg-white/5 backdrop-blur-xl text-white px-7 py-4 rounded-2xl hover:bg-white/10 transition duration-300">
                        Explore Rooms
                      </button>
                    </Link>
                  </div>

                  {/* STATS */}
                  <div className="grid grid-cols-3 gap-6 mt-14 max-w-xl">
                    <div>
                      <h3 className="text-2xl sm:text-4xl font-black text-gray-400">
                        {room.beds}
                      </h3>

                      <p className="text-white/60 text-xs sm:text-sm mt-2">
                        Beds
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-4xl font-black text-gray-400">
                        {room.size}
                      </h3>

                      <p className="text-white/60 text-xs sm:text-sm mt-2">
                        Room Size
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-4xl font-black text-gray-400">
                        {room.basePrice?.toLocaleString()} Ks
                      </h3>

                      <p className="text-white/60 text-xs sm:text-sm mt-2">
                        Per Night
                      </p>
                    </div>
                  </div>
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
