import React from "react";
import { assets } from "../../assets/assets";

const Gym = () => {
  return (
    <div className="w-full">

      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
        <img
          src={assets.gym}
          alt="Hotel Gym"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-serif font-bold text-center">
            Luxury Gym Experience
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Intro */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Stay Active During Your Stay
          </h2>

          <p className="text-gray-600 text-lg leading-8">
            At Kandaw 101 Hotel, we provide a modern and relaxing fitness
            environment designed for both comfort and performance. Our luxury
            wooden-style gym combines premium international fitness equipment
            with peaceful interior design inspired by the natural beauty of
            Mogok.
          </p>
        </div>

        {/* Images + Description */}
        <div className="mt-16 space-y-16">

          {/* Section 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            <div className="overflow-hidden rounded-sm shadow-lg">
              <img
                src={assets.gym_1}
                alt="Gym Interior"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>

           <div>
  <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
    Modern Fitness Experience
  </h3>

  <p className="text-gray-600 leading-8 text-lg">
    Our luxury fitness center is equipped with modern international gym
    equipment designed to support both strength training and cardio
    workouts. Guests can enjoy premium treadmills, exercise bikes,
    free weights, and professional workout stations inside a warm
    wooden-style environment inspired by nature and comfort.
  </p>
</div>

          </div>

          {/* Section 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            <div className="order-2 lg:order-1">
  <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
    Peaceful Yoga & Wellness Space
  </h3>

  <p className="text-gray-600 leading-8 text-lg">
    Kandaw 101 Hotel also offers a relaxing wellness atmosphere for yoga,
    stretching, and mindfulness activities. Surrounded by calming wooden
    interiors, soft natural lighting, and peaceful resort-style decoration,
    guests can refresh both body and mind while enjoying a quiet and
    luxurious wellness experience in the heart of Mogok.
  </p>
</div>
            <div className="overflow-hidden rounded-sm shadow-lg order-1 lg:order-2">
              <img
                src={assets.gym_2}
                alt="Luxury Hotel Gym"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Gym;