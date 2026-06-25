import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaConciergeBell,
  FaDumbbell,
  FaUtensils,
} from "react-icons/fa";

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
    <div className="bg-primary text-secondary overflow-hidden">
      {/* HERO */}
      <header
        className="
          relative
          h-[70vh]
          sm:h-[80vh]
          bg-cover
          bg-center
        "
        style={{
          backgroundImage: `url(${assets.hero_1})`,
        }}
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/50" />

        {/* CONTENT */}
        <div
          className="
            relative
            z-10
            h-full
            flex
            flex-col
            items-center
            justify-center
            text-center
            px-6
          "
        >
          <p className="text-accent tracking-[5px] uppercase mb-5 text-sm">
            Luxury Hotel Experience
          </p>

          <h1
            className="
              text-4xl
              sm:text-6xl
              lg:text-7xl
              font-bold
              text-white
              max-w-5xl
              leading-tight
            "
          >
            Discover Comfort, Luxury & Warm Hospitality
          </h1>

          <p
            className="
              mt-6
              text-gray-200
              max-w-3xl
              leading-8
              text-sm
              sm:text-lg
            "
          >
            Experience unforgettable stays inspired by modern luxury hotels in
            Thailand — where elegant design, comfort, and exceptional
            hospitality come together.
          </p>
        </div>
      </header>

      {/* ABOUT SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* IMAGE */}
            <div className="relative">
              <img
                src={assets.reception}
                alt=""
                className="
                  rounded-3xl
                  shadow-2xl
                  w-full
                  h-[500px]
                  object-cover
                "
              />

              <div
                className="
                  absolute
                  -bottom-8
                  -right-5
                  bg-white
                  shadow-2xl
                  rounded-2xl
                  px-8
                  py-6
                "
              >
                <h2 className="text-4xl font-bold text-primary">10+</h2>

                <p className="text-gray-500">Years of Hospitality</p>
              </div>
            </div>

            {/* TEXT */}
            <div>
              <p className="text-accent uppercase tracking-[4px] mb-4">
                About Kandaw 101 Hotel
              </p>

              <h2
                className="
                  text-4xl
                  sm:text-5xl
                  font-bold
                  text-primary
                  leading-tight
                  mb-6
                "
              >
                Inspired by Thailand Luxury Hospitality
              </h2>

              <div className="space-y-6 text-gray-600 leading-8">
                <p>
                  Kandaw 101 Hotel is designed to deliver a luxurious and
                  peaceful experience for every guest. Inspired by the elegance
                  of modern Thailand hotels, we combine premium comfort with
                  warm hospitality.
                </p>

                <p>
                  Whether you're traveling for relaxation, business, or family
                  vacations, our hotel offers stylish rooms, premium facilities,
                  and exceptional service that make every stay memorable.
                </p>

                <p>
                  From beautiful interiors and comfortable bedding to
                  personalized customer service, every detail is carefully
                  designed to create a welcoming atmosphere.
                </p>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-6 mt-10">
                <div>
                  <h3 className="text-3xl font-bold text-primary">50+</h3>

                  <p className="text-gray-500 text-sm">Luxury Rooms</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-primary">24/7</h3>

                  <p className="text-gray-500 text-sm">Guest Support</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-primary">1000+</h3>

                  <p className="text-gray-500 text-sm">Happy Guests</p>
                </div>
              </div>
            </div>
          </div>

          {/* EXPERIENCE SECTION */}
          <div className="mt-28 text-center">
            <p className="text-accent uppercase tracking-[4px] mb-4">
              Hotel Experience
            </p>

            <h2 className="text-4xl sm:text-5xl font-bold text-primary">
              Designed For Relaxation
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
              {[
                {
                  icon: <FaSwimmingPool />,
                  title: "Swimming Pool",
                  desc: "Relax and refresh in our luxurious swimming pool area.",
                },
                {
                  icon: <FaUtensils />,
                  title: "Restaurant",
                  desc: "Enjoy delicious cuisine prepared by our professional chefs.",
                },
                {
                  icon: <FaWifi />,
                  title: "High-Speed WiFi",
                  desc: "Stay connected anytime with free high-speed internet.",
                },
                {
                  icon: <FaParking />,
                  title: "Free Parking",
                  desc: "Safe and convenient parking facilities for guests.",
                },
                {
                  icon: <FaDumbbell />,
                  title: "Fitness Center",
                  desc: "Modern fitness equipment to maintain your healthy lifestyle.",
                },
                {
                  icon: <FaConciergeBell />,
                  title: "24/7 Service",
                  desc: "Friendly staff available anytime for your assistance.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="
                    bg-white
                    rounded-3xl
                    p-8
                    shadow-sm
                    hover:shadow-2xl
                    transition-all
                    duration-500
                    hover:-translate-y-2
                  "
                >
                  <div className="text-5xl text-accent mb-5 flex justify-center">
                    {item.icon}
                  </div>

                  <h3 className="text-2xl font-semibold text-primary mb-4">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 leading-7">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FACILITIES */}
          <div className="mt-28">
            <div className="text-center mb-14">
              <p className="text-accent uppercase tracking-[4px] mb-4">
                Premium Facilities
              </p>

              <h2 className="text-4xl sm:text-5xl font-bold text-primary">
                Everything You Need
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((item, index) => (
                <div
                  key={index}
                  className="
                    bg-white
                    rounded-3xl
                    overflow-hidden
                    shadow-sm
                    hover:shadow-2xl
                    transition-all
                    duration-500
                    hover:-translate-y-2
                  "
                >
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold text-primary">
                      {item.name}
                    </h3>

                    <p className="text-gray-600 mt-4 leading-7">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GALLERY */}
          <div className="mt-28">
            <div className="text-center mb-14">
              <p className="text-accent uppercase tracking-[4px] mb-4">
                Hotel Gallery
              </p>

              <h2 className="text-4xl sm:text-5xl font-bold text-primary">
                Explore Our Rooms
              </h2>
            </div>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3500,
              }}
              loop={true}
              spaceBetween={25}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1280: {
                  slidesPerView: 3,
                },
              }}
            >
              {rooms.map((room) => (
                <SwiperSlide key={room._id}>
                  <div
                    className="
                      overflow-hidden
                      rounded-3xl
                      group
                      relative
                    "
                  >
                    <img
                      src={getImageUrl(room.images?.[0])}
                      alt={room.name}
                      className="
                        w-full
                        h-[420px]
                        object-cover
                        group-hover:scale-110
                        transition
                        duration-700
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/70
                        to-transparent
                      "
                    />

                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-semibold">{room.name}</h3>

                      <p className="text-gray-200 mt-2">
                        Luxury & Comfort Experience
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* FINAL SECTION */}
          <div className="mt-28 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-primary">
              Your Comfort Is Our Priority
            </h2>

            <p
              className="
                max-w-3xl
                mx-auto
                mt-6
                text-gray-600
                leading-8
              "
            >
              At Kandaw 101 Hotel, we believe every guest deserves comfort,
              elegance, and unforgettable hospitality. Let us make your stay a
              truly memorable experience.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
