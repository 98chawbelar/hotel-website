import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

import Loading from "../Loading";
import getBaseUrl from "../../utils/baseURL";
import { useFetchFacilitiesQuery } from "../../redux/features/facilities/facilitiesApi";

const FacilitiesBody = () => {
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="bg-primary/50 text-primary overflow-hidden">
      {/* HERO */}
      <section className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 sm:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,162,39,0.12),transparent_45%)]" />

        <div className="relative max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center p-6 rounded-md shadow-xl max-w-4xl bg-primary text-white mx-auto">
            <p className="uppercase tracking-[6px] text-accent text-xs sm:text-sm mb-5">
              Hotel Facilities
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight">
              Everything You Need
              <span className="block text-accent">For A Perfect Stay</span>
            </h1>

            <p className="mt-6 leading-8 text-base sm:text-lg max-w-3xl mx-auto">
              Enjoy luxury facilities designed for comfort, relaxation and
              unforgettable hospitality.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
            {[
              "Luxury Restaurant",
              "Modern Fitness",
              "Swimming Pool",
              "Peaceful Garden",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-primary text-secondary rounded-2xl p-5 shadow-xl"
              >
                <FaCheckCircle className="text-accent text-xl mb-4" />

                <h3 className="font-semibold">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITIES */}

      <section className="pb-20">
        <div className="relative z-10 max-w-7xl  w-full    mx-auto ">
          <div className="space-y-16">
            {facilities.map((item, index) => (
              <div
                key={item._id || index}
                className={`grid lg:grid-cols-2 gap-10 items-center ${
                  index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* IMAGE */}

                <div className="relative group">
                  <div className="overflow-hidden rounded-[30px] shadow-2xl">
                    <img
                      src={getImageUrl(item.images?.[0])}
                      alt={item.name}
                      className="
                      w-full
                      h-80
                      sm:h-113
                      lg:h-130
                      object-cover
                      group-hover:scale-105
                      transition
                      duration-700
                      "
                    />
                  </div>

                  <div
                    className="
                    absolute inset-0 
                    bg-linear-to-t 
                    from-black/60 
                    to-transparent
                    rounded-[30px]
                  "
                  />

                  <div
                    className="
                    absolute bottom-5 left-5
                    bg-white/10
                    backdrop-blur-xl
                    rounded-2xl
                    px-5 py-4
                  "
                  >
                    <p className="text-secondary/70 text-xs uppercase">
                      Premium Facility
                    </p>

                    <h3 className="text-secondary text-xl font-bold">
                      {item.name}
                    </h3>
                  </div>
                </div>

                {/* CONTENT */}

                <div>
                  <p className="uppercase tracking-[5px] text-accent text-xs mb-4">
                    Kandaw101 Experience
                  </p>

                  <h2 className="text-3xl sm:text-5xl font-black">
                    {item.name}
                  </h2>

                  <p className="mt-6 text-primary/70 leading-8">
                    {item.description}
                  </p>

                  <div className="space-y-4 mt-8">
                    {[
                      "Modern luxury experience",
                      "Professional hotel service",
                      "Comfortable relaxing atmosphere",
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <FaCheckCircle className="text-accent" />

                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>

                  {item.link && (
                    <Link to={item.link} className="inline-flex mt-10">
                      <button
                        className="
      bg-primary
      text-secondary
      px-7
      py-4
      rounded-2xl
      flex
      items-center
      gap-3
      "
                      >
                        Explore Facility
                        <FaArrowRight />
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default FacilitiesBody;
