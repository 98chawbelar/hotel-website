import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { assets } from "../assets/assets";
import { useFetchAllRoomsQuery } from "../redux/features/rooms/roomsApi";
import { useFetchFacilitiesQuery } from "../redux/features/facilities/facilitiesApi";
import getBaseUrl from "../utils/baseURL";
import Loading from "../components/Loading";

const About = () => {
  const { data: roomsData, isLoading: roomsLoading } = useFetchAllRoomsQuery();
  const { data: facilitiesData, isLoading: facilitiesLoading } =
    useFetchFacilitiesQuery();

  const rooms = Array.isArray(roomsData) ? roomsData : roomsData?.rooms || [];
  const facilities =
    facilitiesData?.facilites || facilitiesData?.data || facilitiesData || [];

  const BASE_URL = getBaseUrl();

  const getImageUrl = (img) => {
    if (!img) return "https://placehold.co/600x400";

    if (Array.isArray(img)) {
      img = img[0];
    }

    if (typeof img === "object") {
      img = img.url || img.path || img.secure_url || img.filename || "";
    }

    if (!img) return "https://placehold.co/600x400";

    if (img.startsWith("http")) {
      return img;
    }

    return `${BASE_URL}/${img.replace(/^\/+/, "")}`;
  };

  if (roomsLoading || facilitiesLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* HERO IMAGE */}
      <header
        className="relative w-full h-[50vh] sm:h-[60vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${assets.hero_1})` }}
      >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50" />
      </header>

      {/* ABOUT CONTENT */}
      <section className="bg-secondary px-4 sm:px-6 lg:px-10 py-14 sm:py-18 lg:py-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* HEADING */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-8">
            ABOUT KANDAW 101 HOTEL
          </h1>

          {/* DESCRIPTION */}
          <div className="space-y-6 text-gray-700 leading-8 text-base sm:text-xs lg:text-sm">
            <p>
              Kandaw 101 Hotel is the perfect destination for travelers seeking
              comfort, elegance, and unforgettable hospitality in the heart of
              Mogok, Myanmar. Designed with a modern luxury atmosphere, our
              hotel combines stylish interiors with warm and welcoming service
              to make every guest feel at home.
            </p>

            <p>
              We proudly offer beautifully designed rooms suitable for couples,
              families, and business travelers. Every room is fully equipped
              with air-conditioning, Smart TV, high-speed free WiFi, premium
              bedding, modern bathrooms, and all essential amenities for a
              relaxing and comfortable stay.
            </p>

            <p>
              Guests can also enjoy our hotel facilities including a relaxing
              restaurant, swimming pool, fitness center, room service, free
              parking, and 24-hour front desk assistance. Whether you are
              visiting for business or leisure, Kandaw 101 Hotel promises a
              memorable experience with exceptional service and modern comfort.
            </p>
          </div>
          <div className="flex justify-center mt-10 ">
            <img
              src={assets.reception}
              alt=""
              className="w-full sm:w-[80%] lg:w-[50vw] rounded-lg shadow-md object-cover"
            />
          </div>
          {/* Facilities */}
          <div className="mt-15">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10 underline">
              Hotel Facilities
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {facilities.map((item, index) => (
                <div
                  key={index}
                  className="
        bg-white
        rounded-2xl
        p-5
        shadow-sm
        border
        border-gray-100
        hover:shadow-lg
        transition
        duration-300
      "
                >
                  <h3 className="text-lg font-semibold text-primary">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* ROOM GALLERY */}
          <div className="mt-15">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={false}
              loop={true}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1280: {
                  slidesPerView: 3,
                },
              }}
              className="rounded-2xl overflow-hidden"
            >
              {rooms.map((room) => (
                <SwiperSlide key={room.id}>
                  <div className="overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src={getImageUrl(room.images?.[0])}
                      alt={room.name}
                      className="w-full h-65 sm:h-80 object-cover hover:scale-110 transition duration-500"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
