import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBed,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaParking,
  FaStar,
  FaSwimmingPool,
  FaUtensils,
  FaWifi,
} from "react-icons/fa";

import { assets, facilities, rooms } from "../../assets/assets";
import { useFetchAllRoomsQuery } from "../../redux/features/rooms/roomsApi";
import { useFetchFacilitiesQuery } from "../../redux/features/facilities/facilitiesApi";
import Loading from "../Loading";
import getBaseUrl from "../../utils/baseURL";

const HomeBody = () => {
  const { data: roomsData, isLoading: roomsLoading } = useFetchAllRoomsQuery();
  const { data: facilitiesData, isLoading: facilitiesLoading } =
    useFetchFacilitiesQuery();

  const rooms = Array.isArray(roomsData) ? roomsData : roomsData?.rooms || [];
  const facilities =
    facilitiesData?.facilities || facilitiesData?.data || facilitiesData || [];

  const featuredRooms = rooms.slice(0, 3);

  const BASE_URL = getBaseUrl();

  const getImageUrl = (img) => {
    if (!img) return "https://placehold.co/600x400";
    // array support
    if (Array.isArray(img)) {
      img = img[0];
    }
    // object support
    if (typeof img === "object") {
      img = img.url || img.path || img.secure_url || img.filename || "";
    }

    if (!img) return "https://placehold.co/600x400";

    // already full url
    if (img.startsWith("http")) {
      return img;
    }

    return `${BASE_URL}/${img.replace(/^\/+/, "")}`;
  };

  if (roomsLoading || facilitiesLoading) {
    return <Loading />;
  }
  return (
    <main className="bg-secondary text-primary overflow-hidden">
      <section className="relative min-h-screen flex items-center">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={assets.hero_1}
            alt="Kandaw Hotel"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-linear-to-r from-primary/90 via-primary/70 to-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 sm:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
            {/* LEFT */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-5 sm:mb-6">
                <FaStar className="text-accent text-sm" />

                <p className="text-secondary text-xs sm:text-sm tracking-wide">
                  Luxury Mountain Hotel In Mogok
                </p>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-tight font-black text-secondary">
                Modern
                <span className="text-accent"> Luxury </span>
                In The Heart Of Mogok
              </h1>

              <p className="mt-5 sm:mt-6 text-secondary/75 text-base sm:text-lg leading-7 sm:leading-8 max-w-2xl">
                Experience elegant mountain living, peaceful nature, modern
                comfort, and premium Burmese hospitality at Kandaw101 Hotel.
                Designed for travelers who want calm, beauty, and unforgettable
                stays.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:mt-10">
                <Link to="/rooms" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto group bg-accent text-primary px-6 sm:px-7 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:scale-105 transition duration-300 shadow-2xl">
                    Explore Rooms
                    <FaArrowRight className="group-hover:translate-x-1 transition" />
                  </button>
                </Link>

                <Link to="/contact" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto border border-white/15 bg-white/5 backdrop-blur-md text-secondary px-6 sm:px-7 py-4 rounded-2xl hover:bg-white/10 transition duration-300">
                    Contact Hotel
                  </button>
                </Link>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-4 sm:gap-5 mt-12 sm:mt-16">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent">
                    4.9
                  </h3>

                  <p className="text-secondary/60 text-xs sm:text-sm mt-1">
                    Guest Rating
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent">
                    24/7
                  </h3>

                  <p className="text-secondary/60 text-xs sm:text-sm mt-1">
                    Guest Service
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent">
                    100+
                  </h3>

                  <p className="text-secondary/60 text-xs sm:text-sm mt-1">
                    Happy Guests
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative order-1 lg:order-2">
              {/* Main card */}
              <div className="relative bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[28px] sm:rounded-4xl overflow-hidden shadow-2xl">
                <img
                  src={assets.hero_2}
                  alt="Hotel"
                  className="w-full h-105 sm:h-130 lg:h-150 object-cover"
                />

                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
                  <div className="flex items-center justify-between gap-5">
                    <div>
                      <p className="text-secondary/60 text-xs sm:text-sm">
                        Premium Experience
                      </p>

                      <h3 className="text-lg sm:text-2xl font-bold text-secondary mt-1">
                        Kandaw101 Hotel
                      </h3>
                    </div>

                    <div className="bg-accent text-primary px-4 sm:px-5 py-3 mt-10 rounded-2xl text-center min-w-20 sm:min-w-23">
                      <h4 className="text-gray-600 text-xl sm:text-2xl">8.9</h4>

                      <p className="text-[12px] sm:text-[10px] font-bold">
                        Excellent
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute border-b-0 -bottom-6 sm:-bottom-10 left-1/2 -translate-x-1/2 lg:left-10 lg:translate-x-0  bg-secondary p-2 sm:p-4 rounded-2xl shadow-xl w-[50%] sm:w-65 max-w-sm">
                <div className="flex items-center gap-2">
                  <div className="bg-accent/10 w-12 h-12 sm:w-14 sm:h-14 rounded-xl  flex items-center justify-center">
                    <FaMapMarkerAlt className="text-accent shadow-2xl  text-lg sm:text-xl" />
                  </div>

                  <div>
                    <h4 className="font-bold text-base sm:text-lg">
                      Perfect Location
                    </h4>

                    <p className="text-primary/60 text-xs sm:text-sm">
                      Peaceful Mogok mountain area
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom blur */}
        <div className="absolute bottom-0 left-0 w-full h-32 sm:h-40 bg-linear-to-t from-secondary to-transparent" />
      </section>

      {/* QUICK INFO */}
      <section className="relative -mt-8 sm:-mt-12 lg:-mt-16 z-20 px-4 sm:px-6">
        <div className="  mx-auto bg-primary rounded-3xl sm:rounded-4xl border border-primary/10 relative z-10 max-w-7xl  w-full px-4 sm:px-6 lg:px-6 pt-20 sm:pt-28 pb-12 sm:pb-18 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <FaWifi />,
                title: "Free WiFi",
                desc: "Fast internet access in every room and hotel area.",
              },
              {
                icon: <FaUtensils />,
                title: "Breakfast",
                desc: "Fresh Burmese and international breakfast daily.",
              },
              {
                icon: <FaSwimmingPool />,
                title: "Pool Access",
                desc: "Relax and recharge in our peaceful swimming pool.",
              },
              {
                icon: <FaParking />,
                title: "Secure Parking",
                desc: "Spacious and secure parking for hotel guests.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 border-b sm:border-b lg:border-b-0 lg:border-r border-white/5 last:border-b-0 lg:last:border-r-0"
              >
                <div className="text-accent text-3xl mb-4">{item.icon}</div>

                <h3 className="text-secondary text-lg sm:text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="text-secondary/60 mt-2 text-sm leading-7">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* ABOUT */}
      {/* ===================================================== */}
      <section className="relative z-10 max-w-7xl mx-auto w-full  pt-28 sm:pt-32 pb-16 sm:pb-24  px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          {/* Images */}
          <div className="relative">
            <div className="overflow-hidden rounded-[28px] sm:rounded-[36px] shadow-2xl">
              <img
                src={assets.reception}
                alt="Reception"
                className="w-full h-105 sm:h-130 lg:h-162.5 object-cover hover:scale-105 transition duration-700"
              />
            </div>

            <div className="relative sm:absolute sm:-bottom-10 sm:-right-6 lg:-right-10 mt-6 sm:mt-0 bg-primary rounded-3xl p-6 sm:p-8 shadow-2xl max-w-xs">
              <p className="text-accent uppercase tracking-[4px] text-xs sm:text-sm mb-2">
                Since 2024
              </p>

              <h3 className="text-secondary text-xl sm:text-2xl font-bold leading-tight">
                Luxury Hospitality With Burmese Warmth
              </h3>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="uppercase tracking-[5px] sm:tracking-[6px] text-accent text-xs sm:text-sm mb-5">
              About Kandaw101
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              Designed For Comfort, Peace, And Elegant Living
            </h2>

            <p className="mt-6 sm:mt-8 text-primary/70 leading-8 sm:leading-9 text-base sm:text-lg">
              Kandaw101 Hotel combines modern architecture, peaceful mountain
              scenery, and refined Burmese hospitality to create a luxury hotel
              experience unlike anywhere else in Mogok.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mt-8 sm:mt-10">
              {[
                "Luxury Modern Rooms",
                "Mountain View Experience",
                "Professional Guest Service",
                "Peaceful Environment",
                "High-Speed WiFi",
                "Premium Breakfast",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <FaCheckCircle className="text-accent shrink-0" />

                  <p className="text-primary/80 text-sm sm:text-base">{item}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-10 sm:mt-12">
              <Link to="/about" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-primary text-secondary px-7 py-4 rounded-2xl hover:opacity-90 transition">
                  Learn More
                </button>
              </Link>

              <Link to="/rooms" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto border border-primary/10 px-7 py-4 rounded-2xl hover:bg-primary hover:text-secondary transition">
                  View Rooms
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* ROOMS */}
      {/* ===================================================== */}
      <section className=" bg-primary py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-360 mx-auto">
          {/* Heading */}
          <div className=" relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 sm:pb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-14 sm:mb-16">
            <div>
              <p className="uppercase tracking-[5px] sm:tracking-[6px] text-accent text-xs sm:text-sm mb-4">
                Luxury Accommodation
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-secondary leading-tight">
                Discover Our Rooms
              </h2>
            </div>

            <p className="max-w-xl text-secondary/65 leading-7 sm:leading-8 text-sm sm:text-base">
              Every room is carefully designed with comfort, elegance, and
              modern hospitality in mind.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {featuredRooms.map((room) => (
              <div
                key={room.title}
                className="group bg-white/5 border border-white/10 rounded-[28px] sm:rounded-4xl overflow-hidden backdrop-blur-xl hover:-translate-y-2 transition duration-500"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={getImageUrl(room.images?.[0])}
                    alt={room.name}
                    className="w-full h-64 sm:h-72 lg:h-80 object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute top-4 sm:top-5 right-4 sm:right-5 bg-accent text-primary px-4 py-2 rounded-full font-semibold shadow-lg text-sm">
                    Ks {Number(room.basePrice || 0).toLocaleString()}
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-4 gap-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-secondary">
                      {room.name}
                    </h3>

                    <div className="flex items-center gap-2 text-accent text-sm">
                      <FaBed />
                      <span>{room.beds}</span>
                    </div>
                  </div>

                  <p className="text-secondary/65 leading-7 sm:leading-8 text-sm">
                    {room.description}
                  </p>

                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-6">
                    {(room.facilities || []).slice(0, 5).map((item, index) => (
                      <div
                        key={index}
                        className="bg-white/5 border border-white/5 px-3 sm:px-4 py-2 rounded-full text-secondary/70 text-xs sm:text-sm"
                      >
                        {item.title}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-8 gap-4">
                    <div>
                      <p className="text-secondary/40 text-xs sm:text-sm">
                        Room Size
                      </p>

                      <h4 className="text-secondary font-semibold text-sm sm:text-base">
                        {room.size}
                      </h4>
                    </div>

                    <Link to="/rooms">
                      <button className="bg-accent text-primary px-4 sm:px-5 py-3 rounded-xl font-semibold hover:scale-105 transition text-sm sm:text-base">
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="text-center mt-12 sm:mt-14">
            <Link to="/rooms">
              <button className="border border-white/10 text-secondary px-7 sm:px-8 py-4 rounded-2xl hover:bg-white/10 transition">
                View All Rooms
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* FACILITIES */}
      {/* ===================================================== */}
      <section className="py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-7xl  w-full px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 sm:pb-24 mx-auto">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
            <p className="uppercase tracking-[5px] sm:tracking-[6px] text-accent text-xs sm:text-sm mb-4">
              Hotel Facilities
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              Everything You Need For A Comfortable Stay
            </h2>

            <p className="text-primary/60 mt-6 sm:mt-8 leading-7 sm:leading-8 text-base sm:text-lg">
              Carefully selected facilities designed for modern travelers and
              luxury experiences.
            </p>
          </div>

          {/* Facilities Grid */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-[28px] sm:rounded-[32px] h-[320px] sm:h-[380px] lg:h-[420px]"
              >
                <img
                  src={getImageUrl(facility.images || facility.images)}
                  alt={facility.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute bottom-0 p-6 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-secondary mb-3">
                    {facility.name}
                  </h3>

                  <p className="text-secondary/25 leading-6 sm:leading-7 text-[8px] sm:text-[10px]">
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* EXPERIENCE SECTION */}
      {/* ===================================================== */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 lg:pb-28">
        <div className="max-w-[1440px] mx-auto bg-primary rounded-[28px] sm:rounded-[40px] overflow-hidden">
          <div className="grid lg:grid-cols-2 items-center">
            {/* LEFT */}
            <div className="p-6 sm:p-10 md:p-14 lg:p-16">
              <p className="uppercase tracking-[5px] sm:tracking-[6px] text-accent text-xs sm:text-sm mb-4">
                Peaceful Experience
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-secondary leading-tight">
                Escape The Noise Of The City
              </h2>

              <p className="text-secondary/65 leading-8 sm:leading-9 mt-6 sm:mt-8 text-base sm:text-lg">
                Enjoy fresh mountain air, peaceful mornings, luxury rooms, and
                unforgettable relaxation in the beautiful hills of Mogok.
              </p>

              <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 mt-10 sm:mt-12">
                <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                  <FaClock className="text-accent text-2xl mb-4" />

                  <h3 className="text-secondary font-semibold mb-2">
                    Flexible Check-In
                  </h3>

                  <p className="text-secondary/60 text-sm leading-7">
                    Check-in available from 12:00 PM for your comfort.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                  <FaStar className="text-accent text-2xl mb-4" />

                  <h3 className="text-secondary font-semibold mb-2">
                    Premium Hospitality
                  </h3>

                  <p className="text-secondary/60 text-sm leading-7">
                    Warm and professional service for every guest.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="h-full">
              <img
                src={assets.hero_3}
                alt="Mountain Hotel"
                className="w-full h-[350px] sm:h-[500px] lg:min-h-[700px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomeBody;
