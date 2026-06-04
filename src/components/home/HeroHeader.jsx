import React from "react";
import { assets } from "../../assets/assets";
import { IoIosArrowDown } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { Link } from "react-router-dom";

const HeroHeader = () => {
  return (
    <header
      className="relative min-w-screen min-h-[90svh] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${assets.hero_1})` }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* CONTENT WRAPPER */}
      <div className="relative z-10  mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
        {/* HERO TEXT */}
        <div className="flex flex-col items-center  justify-center min-h-[90svh] text-center md:text-left text-white gap-2 sm:gap-3">
          <p className="text-xs sm:text-sm md:text-lg tracking-[3px] sm:tracking-[5px] uppercase opacity-80">
            Welcome To
          </p>

          <h1 className="font-serif underline  font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Kandaw 101 Hotel
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-xl ">
            Experience the best hospitality in the heart of the town.
          </p>

          {/* CTA */}
          <div className="mt-4 sm:mt-6">
            <Link to="/rooms">
              <button className="flex items-center gap-2 bg-accent hover:bg-accent/60 active:scale-95 transition px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base">
                <CiCalendar className="text-lg sm:text-xl" />
                Book Now
              </button>
            </Link>
          </div>
        </div>

        {/* SCROLL BUTTON */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex flex-col items-center">
          <button
            onClick={() =>
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              })
            }
          >
            <IoIosArrowDown className="bg-white text-black w-9 h-9 sm:w-10 sm:h-10 rounded-full shadow-lg animate-bounce hover:scale-120 transition duration-200" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeroHeader;
