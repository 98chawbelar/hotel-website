import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

import { facilities } from "../../assets/assets";

const FacilitiesBody = () => {
  return (
    <main className="bg-primary/50 text-primary overflow-hidden">
      {/* ====================================================== */}
      {/* HERO */}
      {/* ====================================================== */}
      <section className="relative py-24 sm:py-28 lg:py-36">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,162,39,0.12),transparent_45%)]" />

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center p-6 rounded-md shadow-xl max-w-4xl bg-primary text-white mx-auto">
            <p className="uppercase tracking-[6px] text-accent text-xs sm:text-sm mb-5">
              Hotel Facilities
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight">
              Everything You Need
              <span className="block text-accent">For A Perfect Stay</span>
            </h1>

            <p className="mt-6 sm:mt-8  leading-8 text-base sm:text-lg max-w-3xl mx-auto">
              Enjoy luxury facilities designed for comfort, relaxation, and
              unforgettable hospitality. From peaceful outdoor spaces to modern
              wellness experiences, every detail is crafted for modern
              travelers.
            </p>
          </div>

          {/* Quick Features */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-14 sm:mt-16">
            {[
              "Luxury Restaurant",
              "Modern Fitness",
              "Swimming Pool",
              "Peaceful Garden",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-primary text-secondary rounded-2xl p-5 sm:p-6 shadow-xl border border-primary/10"
              >
                <FaCheckCircle className="text-accent text-xl mb-4" />

                <h3 className="font-semibold text-sm sm:text-base leading-6">
                  {item}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* FACILITIES GRID */}
      {/* ====================================================== */}
      <section className="pb-20 sm:pb-24 lg:pb-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 sm:space-y-20">
            {facilities.map((item, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* IMAGE */}
                <div className="relative group">
                  <div className="overflow-hidden rounded-[28px] sm:rounded-[36px] shadow-2xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-[320px] sm:h-[450px] lg:h-[520px] object-cover group-hover:scale-105 transition duration-700"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-[28px] sm:rounded-[36px]" />

                  {/* Floating Card */}
                  <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4">
                    <p className="text-secondary/70 text-xs uppercase tracking-[3px] mb-1">
                      Premium Facility
                    </p>

                    <h3 className="text-secondary text-xl sm:text-2xl font-bold">
                      {item.name}
                    </h3>
                  </div>
                </div>

                {/* CONTENT */}
                <div>
                  <p className="uppercase tracking-[5px] text-accent text-xs sm:text-sm mb-4">
                    Kandaw101 Experience
                  </p>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
                    {item.name}
                  </h2>

                  <p className="mt-6 text-primary/70 leading-8 text-base sm:text-lg">
                    {item.description}
                  </p>

                  <div className="space-y-4 mt-8">
                    {[
                      "Modern luxury experience",
                      "Professional hotel service",
                      "Comfortable & relaxing atmosphere",
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <FaCheckCircle className="text-accent shrink-0" />

                        <p className="text-primary/75 text-sm sm:text-base">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>

                  {item.link && (
                    <Link to={item.link} className="inline-flex mt-10">
                      <button className="group bg-primary text-secondary px-6 sm:px-7 py-4 rounded-2xl font-semibold flex items-center gap-3 hover:scale-105 transition duration-300 shadow-xl">
                        Explore Facility
                        <FaArrowRight className="group-hover:translate-x-1 transition" />
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
