import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const HeroBody = () => {
  const stars = Array(5).fill(0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Review Section */}
      <div className="bg-primary/50 shadow-xl rounded-xl p-5 md:p-6 mb-10 border-0 ">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Side */}
          <div className="flex items-center gap-6">
            {/* Review Score */}
            <div className="bg-accent text-white min-w-24 min-h-24 rounded-full flex flex-col items-center justify-center shadow-md">
              <p className="text-xl ">8.9</p>

              <p className="text-md">Excellent</p>
            </div>

            {/* Review Text */}
            <div>
              <h3 className="text-2xl md:text-4xl font-serif font-semibold mb-2">
                Trusted Guest Reviews
              </h3>

              <p className="text-gray-700 leading-7 max-w-xl">
                Guests love the peaceful mountain atmosphere, modern luxury
                rooms, warm Burmese hospitality, and relaxing experience at
                Kandaw 101 Hotel in Mogok.
              </p>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mt-2 text-accent">
                {stars.map((_, i) => (
                  <FaStar key={i} />
                ))}

                <span className="text-gray-600 ml-2 text-sm">
                  Based on 2024 customer reviews
                </span>
              </div>
            </div>
          </div>

          {/* OTA Logos */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="bg-transparent border-0  px-4 py-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-lg font-semibold text-[#5A2D82]">Agoda</h3>
            </div>

            <div className="bg-transparent border-0  px-4 py-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-bold text-[#003580]">Booking.com</h3>
            </div>

            <div className="bg-transparent border-0  px-4 py-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-bold text-[#E61E43]">Airbnb</h3>
            </div>

            <div className="bg-transparent border-0  px-4 py-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-bold text-[#2175D9]">Trip.com</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Experience Section */}
      <div>
        {/* Top Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="uppercase tracking-[8px] text-sm text-gray-600 mb-2">
            Kandaw 101 Hotel
          </p>

          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 leading-tight mb-3">
            Experience Modern Luxury In The Heart Of Mogok
          </h2>

          <p className="text-gray-600 leading-8 text-md">
            Discover peaceful mountain living, elegant Burmese-inspired
            interiors, luxury accommodation, and unforgettable hospitality
            designed for modern travelers seeking comfort and relaxation.
          </p>
        </div>

        {/* Section 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-20">
          {/* Image */}
          <div className="relative overflow-hidden rounded-3xl shadow-xl group">
            <img
              src={assets.king_rooms}
              alt="Luxury Room"
              className=" min-w-full w-auto min-h-125 h-full object-cover group-hover:scale-105 transition duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Floating Card */}
            <div className="absolute bottom-6 left-3 bg-gray-100 backdrop-blur-lg px-2 py-4 rounded-xl shadow-2xl">
              <p className="text-xs md:text-sm text-gray-600 ">
                Luxury Accommodation
              </p>

              <h3 className=" md:text-xl lg:text-lg font-serif font-semibold">
                Elegant Modern Rooms
              </h3>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="uppercase tracking-[8px] text-sm text-gray-400 mb-2">
              Luxury Redefined
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-semibold leading-tight mb-3">
              A Peaceful Private Paradise
            </h3>

            <p className="text-gray-600 leading-8 mb-4 text-md">
              Our rooms are thoughtfully designed with modern comfort, elegant
              Burmese-inspired decoration, and peaceful mountain atmosphere to
              create a relaxing sanctuary for every guest.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-gray-50  p-3">
                <h4 className="text-2xl font-bold text-accent mb-1">24/7</h4>

                <p className="text-gray-400 text-sm">Guest Support Service</p>
              </div>

              <div className="bg-gray-50  p-3">
                <h4 className="text-2xl font-bold text-accent mb-1">Free</h4>

                <p className="text-gray-400 text-sm">High-Speed WiFi</p>
              </div>
            </div>

            <Link to="/rooms">
              <button className="cursor-pointer bg-accent/80 hover:bg-accent  text-white px-4 py-4 rounded-xl transition duration-300 shadow-lg">
                Explore Rooms
              </button>
            </Link>
          </div>
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <p className="uppercase tracking-[4px] text-sm text-gray-400 mb-4">
              Nature & Relaxation
            </p>

            <h3 className="text-3xl md:text-5xl font-serif font-semibold leading-tight mb-6">
              Leave Your Worries In The Hills
            </h3>

            <p className="text-gray-600 leading-8 mb-8 text-lg">
              Surrounded by breathtaking mountain views, fresh air, and peaceful
              landscapes, Kandaw 101 Hotel offers a calm retreat where guests
              can relax, recharge, and reconnect with nature.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-gray-100 px-5 py-3 rounded-full text-sm font-medium">
                Mountain View
              </div>

              <div className="bg-gray-100 px-5 py-3 rounded-full text-sm font-medium">
                Peaceful Environment
              </div>

              <div className="bg-gray-100 px-5 py-3 rounded-full text-sm font-medium">
                Modern Comfort
              </div>
            </div>

            <Link to="/rooms">
              <button className="bg-accent/80 cursor-pointer hover:bg-accent text-white px-4 py-4 rounded-xl transition duration-300 shadow-lg">
                Discover More
              </button>
            </Link>
          </div>

          {/* Image */}
          <div className="relative overflow-hidden rounded-3xl shadow-xl group order-1 lg:order-2">
            <img
              src={assets.hero_2}
              alt="Mountain View"
              className="w-full h-125 object-cover group-hover:scale-105 transition duration-300"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Floating Review Card */}
            <div className="absolute top-6 right-6 text-center bg-white/90 backdrop-blur-md px-2 py-4 rounded-2xl shadow-md">
              <h3 className="text-lg font-bold text-accent/60">8.9/10</h3>

              <p className="text-xs text-gray-400">Guest Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBody;
