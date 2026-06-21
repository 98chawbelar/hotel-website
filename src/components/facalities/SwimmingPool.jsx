import React from "react";

import Loading from "../Loading";
import getBaseUrl from "../../utils/baseURL";
import { useFetchFacilitiesQuery } from "../../redux/features/facilities/facilitiesApi";

const SwimmingPool = () => {
  const { data, isLoading } = useFetchFacilitiesQuery();

  const facilities = data?.facilities || data?.data || data || [];

  const BASE_URL = getBaseUrl();

  const getImageUrl = (img) => {
    if (!img) return "https://placehold.co/800x600";

    if (typeof img === "object") {
      img = img.url || img.path || img.secure_url || "";
    }

    if (!img) return "https://placehold.co/800x600";

    if (img.startsWith("http")) return img;

    return `${BASE_URL}/${img.replace(/^\/+/, "")}`;
  };

  const pool = facilities.find(
    (item) =>
      item.name?.toLowerCase().includes("pool") ||
      item.slug?.toLowerCase().includes("pool"),
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!pool) {
    return (
      <div className="py-20 text-center">Swimming Pool data not found</div>
    );
  }

  return (
    <div className="w-full overflow-hidden bg-primary/50">
      {/* ================= HERO ================= */}

      <section className="relative h-[65vh] md:h-[80vh]">
        <img
          src={getImageUrl(pool.images?.[0])}
          alt={pool.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-3xl">
              <p className="uppercase tracking-[5px] text-accent text-sm mb-5">
                Kandaw101 Facilities
              </p>

              <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-black leading-tight">
                {pool.name}
              </h1>

              <p className="text-white/80 text-lg md:text-xl mt-6 leading-8">
                Relax, refresh and enjoy a premium swimming experience
                surrounded by comfort and luxury.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* IMAGE CARD */}

          <div className="relative group">
            <div className="overflow-hidden rounded-[35px] shadow-2xl">
              <img
                src={getImageUrl(pool.images?.[0])}
                alt={pool.name}
                className="

w-full

h-[350px]

md:h-[500px]

object-cover

group-hover:scale-110

transition

duration-700

"
              />
            </div>

            <div className="absolute bottom-6 left-6 right-6 bg-black/50 backdrop-blur-xl rounded-3xl p-6">
              <p className="text-accent uppercase tracking-[3px] text-xs">
                Premium Experience
              </p>

              <h3 className="text-white text-2xl font-bold mt-2">
                {pool.name}
              </h3>
            </div>
          </div>

          {/* DESCRIPTION */}

          <div>
            <p className="uppercase tracking-[5px] text-accent text-sm mb-5">
              Luxury Relaxation
            </p>

            <h2 className="text-3xl md:text-5xl font-black leading-tight">
              Premium Comfort & Refreshing Moments
            </h2>

            <p className="mt-8 text-primary/70 text-lg leading-9">
              {pool.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              <div className="bg-white rounded-2xl p-6 shadow">
                <h3 className="font-bold text-xl">Pool Access</h3>

                <p className="text-gray-600 mt-3">
                  Enjoy a relaxing swimming experience during your stay.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow">
                <h3 className="font-bold text-xl">Peaceful Environment</h3>

                <p className="text-gray-600 mt-3">
                  Perfect place for relaxation and unforgettable moments.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FEATURE SECTION ================= */}

        <div className="mt-24 bg-primary rounded-[40px] p-8 md:p-14 text-secondary">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black">
              Enjoy Every Moment
            </h2>

            <p className="mt-5 text-secondary/70 text-lg leading-8">
              Kandaw101 Hotel provides a peaceful atmosphere where guests can
              relax, refresh and enjoy modern hospitality with beautiful
              surroundings.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "Relaxing Pool",
                desc: "Clean and comfortable swimming area for guests.",
              },

              {
                title: "Modern Facility",
                desc: "Designed with guest comfort and luxury in mind.",
              },

              {
                title: "Beautiful Atmosphere",
                desc: "Enjoy peaceful moments surrounded by nature.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 rounded-3xl p-7 backdrop-blur-xl"
              >
                <h3 className="text-xl font-bold">{item.title}</h3>

                <p className="mt-3 text-secondary/70 leading-7">
                  {item.description || item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SwimmingPool;
