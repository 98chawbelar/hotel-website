import React from "react";
import { assets } from "../../assets/assets";

const facilities = [
  {
    title: "Luxury Swimming Pool",
    description:
      "Enjoy a peaceful and refreshing swimming experience surrounded by elegant Burmese-inspired decoration, crystal-clear water, and a relaxing resort atmosphere designed for comfort and leisure.",
    image: assets.pool,
    alt: "Swimming Pool",
  },
  {
    title: "Beautiful Garden Area",
    description:
      "Relax in our beautifully designed garden space featuring tropical greenery, natural landscapes, and a calm outdoor atmosphere inspired by the natural beauty of Mogok.",
    image: assets.garden,
    alt: "Hotel Garden",
  },
  {
    title: "Secure Car Parking",
    description:
      "Kandaw 101 Hotel provides spacious and secure parking facilities for guests, ensuring convenience, safety, and easy access throughout your stay.",
    image: assets.parking,
    alt: "Hotel Parking",
  },
];

const facilityCards = [
  {
    title: "Free Pool Access",
    description:
      "Complimentary swimming pool access for all hotel guests.",
  },
  {
    title: "Relaxing Garden",
    description:
      "Peaceful outdoor garden space perfect for relaxation and photography.",
  },
  {
    title: "Free Parking",
    description:
      "Safe and convenient parking area available for hotel guests.",
  },
  {
    title: "24/7 Security",
    description:
      "Professional security service ensuring a safe environment.",
  },
];

const SwimmingPool = () => {
  return (
    <div className="w-full">

      {/* Hero Section */}
      <div className="relative w-full h-[55vh] md:h-[75vh] overflow-hidden">
        <img
          src={assets.pool}
          alt="Hotel Facilities"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-white text-4xl md:text-6xl font-serif font-bold">
              Luxury Hotel Facilities
            </h1>

            <p className="text-white mt-4 text-lg md:text-2xl">
              Relax, Refresh & Enjoy Your Stay at Kandaw 101 Hotel
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Intro */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Premium Comfort & Relaxation
          </h2>

          <p className="text-gray-600 text-lg leading-8">
            Kandaw 101 Hotel offers a collection of modern facilities designed
            to provide comfort, convenience, and relaxation. From our luxury
            swimming pool and peaceful garden to secure parking facilities,
            every space is carefully prepared to create a memorable hospitality
            experience inspired by the beauty of Mogok.
          </p>
        </div>

        {/* Facility Sections */}
        <div className="mt-20 space-y-20">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >

              {/* Image */}
              <div
                className={`overflow-hidden rounded-2xl shadow-xl ${
                  index % 2 !== 0 ? "order-1 lg:order-2" : ""
                }`}
              >
                <img
                  src={facility.image}
                  alt={facility.alt}
                  className="w-full h-[300px] md:h-[450px] object-cover hover:scale-105 transition duration-500"
                />
              </div>

              {/* Text */}
              <div
                className={`${
                  index % 2 !== 0 ? "order-2 lg:order-1" : ""
                }`}
              >
                <h3 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
                  {facility.title}
                </h3>

                <p className="text-gray-600 text-lg leading-9">
                  {facility.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Facility Cards */}
        <div className="mt-28 bg-gray-50 rounded-3xl p-8 md:p-12">

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              Additional Facilities
            </h2>

            <p className="text-gray-600 text-lg leading-8 max-w-3xl mx-auto">
              Enjoy premium facilities and services designed to make your stay
              comfortable, safe, and enjoyable at Kandaw 101 Hotel.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilityCards.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition duration-300 text-center"
              >
                <h3 className="text-xl font-semibold mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Text */}
          <div className="text-center mt-14">
            <p className="text-gray-700 text-lg leading-8 max-w-4xl mx-auto">
              At Kandaw 101 Hotel, we are committed to creating a peaceful,
              secure, and enjoyable environment where guests can relax and
              experience warm hospitality with modern luxury facilities.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SwimmingPool;