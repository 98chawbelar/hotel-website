import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { assets, facilities, rooms } from "../assets/assets";

const About = () => {
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

            <div className="flex flex-wrap flex-col justify-center gap-x-4 gap-y-2">
              {facilities.map((item, index) => (
                <div key={index} className="text-md sm:text-lg text-gray-700">
                  • {item.name}
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
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="rounded-2xl overflow-hidden"
            >
              {rooms.map((room) => (
                <SwiperSlide key={room.id}>
                  <div className="overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src={room.image}
                      alt="room"
                      className="w-full h-63 sm:h-75 object-cover hover:scale-110 transition duration-500"
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
