import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

import { assets } from "../../assets/assets";

const HeroHeader = () => {
  const heroSlides = [
    assets.hero_1,
    assets.hero_2,
    assets.hero_3,
    assets.hero_4,
    assets.hero_5,
    assets.hero_6,
  ];

  return (
    <header className="relative h-screen overflow-hidden">
      {/* ================= SLIDER ================= */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop
        speed={1200}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        className="absolute inset-0 h-full w-full"
      >
        {heroSlides.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative   w-full  h-screen">
              {/* IMAGE */}
              <img
                src={image}
                alt={`Hero ${index + 1}`}
                className="w-full h-full  object-cover"
              />
            </div>
            {/* GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ================= CONTENT ================= */}
      <div className="relative z-20 max-w-[1440px] mx-auto h-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center h-full max-w-4xl">
          {/* Badge */}
          <div className="inline-flex w-fit items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-xl px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />

            <p className="text-white text-xs sm:text-sm tracking-[3px] uppercase">
              Luxury Mountain Hotel
            </p>
          </div>

          {/* Heading */}
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
            Welcome To
            <span className="block text-accent">Kandaw 101 Hotel</span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-white/75 text-base sm:text-lg leading-8 max-w-2xl">
            Experience elegant hospitality, peaceful mountain views, luxury
            rooms, and unforgettable stays in the heart of Mogok.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link to="/rooms">
              <button className="w-full sm:w-auto bg-accent text-primary px-7 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:scale-105 transition duration-300 shadow-2xl">
                <CiCalendar className="text-xl" />
                Book Now
              </button>
            </Link>

            <Link to="/facilities">
              <button className="w-full sm:w-auto border border-white/10 bg-white/5 backdrop-blur-xl text-white px-7 py-4 rounded-2xl hover:bg-white/10 transition duration-300">
                Explore Hotel
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-14 max-w-xl">
            <div>
              <h3 className="text-2xl sm:text-4xl font-black text-accent">
                4.9
              </h3>

              <p className="text-white/60 text-xs sm:text-sm mt-2">
                Guest Rating
              </p>
            </div>

            <div>
              <h3 className="text-2xl sm:text-4xl font-black text-accent">
                24/7
              </h3>

              <p className="text-white/60 text-xs sm:text-sm mt-2">Service</p>
            </div>

            <div>
              <h3 className="text-2xl sm:text-4xl font-black text-accent">
                100+
              </h3>

              <p className="text-white/60 text-xs sm:text-sm mt-2">
                Happy Guests
              </p>
            </div>
          </div>
        </div>

        {/* ================= SCROLL BUTTON ================= */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
          <button
            onClick={() =>
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              })
            }
            className="group flex flex-col items-center gap-3"
          >
            <span className="text-white/70 text-xs tracking-[4px] uppercase">
              Scroll
            </span>

            <div className="bg-white text-primary w-11 h-11 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition duration-300">
              <IoIosArrowDown className="text-xl animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeroHeader;
