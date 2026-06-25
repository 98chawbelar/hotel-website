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
    description:
      "Professional washing and ironing service for shirts and casual wear with careful fabric protection.",
    price: "3,000 MMK",
  },

  {
    title: "Pants / Jeans",
    description:
      "Deep cleaning and wrinkle-free finishing for jeans, trousers and heavy fabrics.",
    price: "5,000 MMK",
  },

  {
    title: "Jacket / Coat",
    description:
      "Premium garment care with steam ironing and luxury finishing service.",
    price: "8,000 MMK",
  },

  {
    title: "Ironing Service",
    description:
      "Fast ironing service for uniforms, shirts and business clothing.",
    price: "2,500 MMK",
  },

  {
    title: "Express Laundry",
    description:
      "Same-day laundry service with quick washing, drying and delivery.",
    price: "10,000 MMK",
  },

  {
    title: "Blanket / Bed Sheet",
    description:
      "Large fabric washing with sanitizing and soft premium finishing.",
    price: "12,000 MMK",
  },
];

const imageDescriptions = [
  {
    title: "Premium Jeans Cleaning",
    description:
      "Our professional laundry team carefully cleans jeans, denim and heavy fabrics using premium washing techniques to maintain softness, color and fabric quality.",
  },

  {
    title: "Professional Ironing Service",
    description:
      "Enjoy wrinkle-free clothing with our premium ironing service for business wear, uniforms and daily garments prepared with perfect finishing.",
  },

  {
    title: "Fast Same-Day Laundry",
    description:
      "Need urgent laundry service? Kandaw101 Hotel provides fast same-day washing and drying service for travelers and hotel guests.",
  },

  {
    title: "Luxury Garment Care",
    description:
      "Delicate fabrics and premium clothing receive professional garment treatment, soft finishing and careful fabric protection.",
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
    <div className="w-full bg-primary overflow-hidden">
      {/* HERO SECTION */}

      <section className="relative h-[55vh] sm:h-[70vh] lg:h-[85vh] overflow-hidden">
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
          {laundry.images?.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={getImageUrl(image)}
                alt="Laundry Service"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/55 flex items-center justify-center px-6">
                <div className="text-center max-w-4xl">
                  <h1 className="text-white text-3xl sm:text-5xl lg:text-7xl font-serif font-bold leading-tight">
                    Professional Laundry Service
                  </h1>

                  <p className="text-white/80 mt-6 text-sm sm:text-lg leading-8 max-w-2xl mx-auto">
                    Premium laundry, ironing and garment care service for a
                    clean and comfortable hotel experience.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* INTRO */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <p className="uppercase tracking-[5px] text-accent text-xs mb-4">
            Kandaw101 Hotel
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-secondary font-serif font-semibold mb-6 leading-tight">
            Fresh, Clean & Carefully Handled Laundry Service
          </h2>

          <p className="text-secondary/65 text-base sm:text-lg leading-8">
            {laundry.description}
          </p>
        </div>

        {/* IMAGE SECTIONS */}

        <div className="mt-20 lg:mt-28 space-y-24">
          {laundry.images?.map((image, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* IMAGE */}

              <div className="overflow-hidden rounded-[30px] shadow-2xl">
                <img
                  src={getImageUrl(image)}
                  alt="Laundry"
                  className="w-full h-75 sm:h-113 lg:h-130 object-cover hover:scale-105 transition duration-700"
                />
              </div>

              {/* TEXT */}

              <div>
                <p className="uppercase tracking-[4px] text-accent text-xs mb-4">
                  Laundry Experience
                </p>

                <h3 className="text-2xl sm:text-3xl text-secondary/65 lg:text-4xl font-serif font-semibold mb-6 leading-tight">
                  {imageDescriptions[index]?.title ||
                    "Professional Laundry Service"}
                </h3>

                <p className="text-secondary/65 text-base sm:text-lg leading-8">
                  {imageDescriptions[index]?.description || laundry.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <span className="px-5 py-3 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    Same Day Service
                  </span>

                  <span className="px-5 py-3 rounded-full bg-green-500/10 text-green-600 text-sm font-semibold">
                    Premium Fabric Care
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PRICING */}

        <div className="mt-24 lg:mt-32">
          <div className="text-center mb-14">
            <p className="uppercase tracking-[5px] text-accent text-xs mb-4">
              Laundry Pricing
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold">
              Service Price List
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {pricing.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-[28px] p-8 shadow-lg hover:shadow-2xl transition duration-500"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold leading-tight">
                    {item.title}
                  </h3>

                  <span className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap">
                    {item.price}
                  </span>
                </div>

                <p className="text-gray-600 mt-6 leading-8">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* EXTRA SERVICE INFO */}

        <div className="mt-24 bg-gray-50 rounded-[36px] p-8 sm:p-12 lg:p-16">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[5px] text-accent text-xs mb-4">
              Why Choose Us
            </p>

            <h2 className="text-3xl sm:text-4xl font-serif font-semibold">
              Premium Laundry Benefits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="bg-white rounded-[24px] p-8 shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Fast Same-Day Service
              </h3>

              <p className="text-gray-600 leading-7">
                Quick laundry processing and delivery for busy travelers and
                hotel guests.
              </p>
            </div>

            <div className="bg-white rounded-[24px] p-8 shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Premium Fabric Care
              </h3>

              <p className="text-gray-600 leading-7">
                Gentle cleaning process that protects delicate fabrics and
                expensive garments.
              </p>
            </div>

            <div className="bg-white rounded-[24px] p-8 shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Professional Ironing
              </h3>

              <p className="text-gray-600 leading-7">
                Wrinkle-free finishing service for formal wear, uniforms and
                casual clothing.
              </p>
            </div>

            <div className="bg-white rounded-[24px] p-8 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Hygienic Cleaning</h3>

              <p className="text-gray-600 leading-7">
                Sanitized washing and fresh finishing to ensure cleanliness and
                guest comfort.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Laundry;
