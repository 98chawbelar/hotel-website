import React from "react";

import Loading from "../Loading";
import getBaseUrl from "../../utils/baseURL";
import { useFetchFacilitiesQuery } from "../../redux/features/facilities/facilitiesApi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

const pricing = [
  {
    title: "Shirt / T-Shirt",
    description: "Professional washing and ironing service.",
    price: "200 MMK",
  },
  {
    title: "Pants / Jeans",
    description: "Fresh cleaning with careful fabric handling.",
    price: "400 MMK",
  },
  {
    title: "Jacket / Coat",
    description: "Premium garment care and professional finishing.",
    price: "600 MMK",
  },
];

const hotelFacilities = [
  {
    title: "Free WiFi",
    description: "High-speed internet access available throughout the hotel.",
  },
  {
    title: "Free Car Parking",
    description: "Secure and convenient parking space for hotel guests.",
  },
  {
    title: "Android TV",
    description:
      "Enjoy entertainment and streaming services inside every room.",
  },
  {
    title: "Daily Room Cleaning",
    description:
      "Clean and comfortable rooms prepared every day for your stay.",
  },
];

const Laundry = () => {
  const { data, isLoading } = useFetchFacilitiesQuery();

  const facilities = data?.facilities || data?.data || data || [];

  const BASE_URL = getBaseUrl();

  const getImageUrl = (img) => {
    if (!img) return "https://placehold.co/600x400";

    if (typeof img === "object") {
      img = img.url || img.path || img.secure_url || "";
    }

    if (!img) return "https://placehold.co/600x400";

    if (img.startsWith("http")) {
      return img;
    }

    return `${BASE_URL}/${img.replace(/^\/+/, "")}`;
  };

  const laundry = facilities.find(
    (item) =>
      item.name?.toLowerCase().includes("laundry") ||
      item.slug?.toLowerCase().includes("laundry"),
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!laundry) {
    return <div className="text-center py-20">Laundry data not found</div>;
  }

  return (
    <div className="w-full">
      {/* ================= HERO SWIPER ================= */}

      <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          loop={true}
          speed={1200}
          autoplay={{
            delay: 2500,

            disableOnInteraction: false,
          }}
          className="h-full w-full"
        >
          {laundry.images?.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={getImageUrl(image)}
                alt="Laundry"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h1 className="text-white text-4xl md:text-6xl font-serif font-bold text-center">
                  Professional Laundry Service
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Fresh, Clean And Carefully Handled Laundry Service
          </h2>

          <p className="text-gray-600 text-lg leading-8">
            {laundry.description}
          </p>
        </div>

        {/* ================= IMAGES + DESCRIPTION ================= */}

        <div className="mt-16 space-y-16">
          {laundry.images?.map((image, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >
              <div
                className={`overflow-hidden rounded-xl shadow-lg

${index % 2 !== 0 ? "order-1 lg:order-2" : ""}

`}
              >
                <img
                  src={getImageUrl(image)}
                  alt="Laundry"
                  className="w-full h-[320px] md:h-[450px] object-cover hover:scale-105 transition duration-500"
                />
              </div>

              <div className={index % 2 !== 0 ? "order-2 lg:order-1" : ""}>
                <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
                  {index === 0
                    ? "Premium Laundry & Garment Care"
                    : "Fast & Convenient Service"}
                </h3>

                <p className="text-gray-600 text-lg leading-8">
                  {laundry.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ================= PRICE ================= */}

        <div className="mt-20">
          <h2 className="text-3xl font-serif font-semibold text-center mb-10">
            Laundry Service Pricing
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {pricing.map((item, index) => (
              <div
                key={index}
                className="border rounded-xl p-6 shadow bg-white"
              >
                <h3 className="text-2xl font-semibold">{item.title}</h3>

                <p className="text-gray-600 my-4">{item.description}</p>

                <span className="bg-accent/50 px-3 py-1 rounded">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= HOTEL FACILITIES ================= */}

        <div className="mt-24 bg-gray-50 rounded-2xl p-10">
          <h2 className="text-3xl font-serif text-center mb-10">
            Complimentary Hotel Facilities
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {hotelFacilities.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow"
              >
                <h3 className="font-semibold text-xl">{item.title}</h3>

                <p className="text-gray-600 mt-3">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laundry;
