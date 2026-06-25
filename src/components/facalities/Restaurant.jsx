import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";

import Loading from "../Loading";
import getBaseUrl from "../../utils/baseURL";
import { useFetchFacilitiesQuery } from "../../redux/features/facilities/facilitiesApi";

const Restaurant = () => {
  const { data, isLoading } = useFetchFacilitiesQuery();

  const facilities = data?.facilities || data?.data || data || [];

  const BASE_URL = getBaseUrl();

  const getImageUrl = (img) => {
    if (!img) {
      return "https://placehold.co/600x400";
    }

    if (typeof img === "object") {
      img = img.url || img.path || img.secure_url || "";
    }

    if (!img) {
      return "https://placehold.co/600x400";
    }

    if (img.startsWith("http")) {
      return img;
    }

    return `${BASE_URL}/${img.replace(/^\/+/, "")}`;
  };

  const restaurant = facilities.find(
    (item) =>
      item.name?.toLowerCase().includes("restaurant") ||
      item.slug?.toLowerCase().includes("restaurant"),
  );

  // FRONTEND IMAGE DESCRIPTIONS

  const imageDescriptions = [
    {
      title: "Luxury Restaurant Interior",
      description:
        "Enjoy a premium dining atmosphere at Kandaw101 Hotel Restaurant. Our elegant interior provides a comfortable environment where guests can relax and enjoy delicious meals with warm hospitality.",
      price: "500 Ks Per Person",
    },

    {
      title: "American Breakfast Experience",
      description:
        "Start your morning with our American breakfast selection prepared with fresh ingredients. Enjoy a balanced meal with quality flavors and a relaxing dining experience.",
      price: "1500 Ks Per Person",
    },

    {
      title: "Traditional Burmese Breakfast",
      description:
        "Experience authentic Burmese breakfast flavors prepared with traditional recipes. Our dishes bring local taste together with comfortable hotel dining.",
      price: "1000 Ks Per Person",
    },

    {
      title: "Restaurant Dining Area",
      description:
        "A peaceful dining space designed for families, friends, and guests who want to enjoy great food in a relaxing atmosphere.",
      price: "5000 Ks Family Package",
    },
  ];
  if (isLoading) {
    return <Loading />;
  }

  if (!restaurant) {
    return <div className="text-center py-20">Restaurant data not found</div>;
  }

  return (
    <div className="w-full bg-primary">
      {/* HERO SLIDER */}

      <section className="relative h-[60vh] overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          loop
          speed={1200}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="h-full"
        >
          {restaurant.images?.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={getImageUrl(image)}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h1 className="text-white text-4xl md:text-6xl font-serif font-bold">
                  {restaurant.name}
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* INTRO */}

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif text-secondary font-semibold mb-6">
            Delicious Dining Experience
          </h2>

          <p className="text-secondary/65 text-lg leading-8">
            {restaurant.description}
          </p>
        </div>

        {/* EACH IMAGE WITH OWN DESCRIPTION */}

        <div className="mt-20 space-y-20">
          {restaurant.images?.map((image, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-10 items-center ${
                index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* IMAGE */}

              <div className="overflow-hidden rounded-2xl shadow-xl">
                <img
                  src={getImageUrl(image)}
                  alt={restaurant.name}
                  className="
                w-full
                h-[420px]
                object-cover
                hover:scale-105
                transition
                duration-500
                "
                />
              </div>

              {/* TEXT */}

              <div>
                <h3 className="text-3xl text-secondary font-serif font-semibold mb-5">
                  {imageDescriptions[index]?.title || restaurant.name}
                </h3>

                <p className="text-secondary/65 text-lg leading-8">
                  {imageDescriptions[index]?.description ||
                    restaurant.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Restaurant;
