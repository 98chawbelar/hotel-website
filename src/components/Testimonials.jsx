import { useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "Calm, serene, and beautifully retro. The perfect place to relax and enjoy nature. Every moment felt peaceful and refreshing.",
      name: "Mr. and Mrs. Chaw",
      country: "Myanmar",
    },
    {
      quote:
        "A wonderful escape from city life. Clean rooms, fresh mountain air, and breathtaking views made our stay unforgettable.",
      name: "Sophia Martin",
      country: "United Kingdom",
    },
    {
      quote:
        "Excellent hospitality and cozy atmosphere. We loved waking up to the hills and enjoying breakfast with a beautiful view.",
      name: "Ko Aung Min",
      country: "Thailand",
    },
  ];

  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
  };

  return (
    <>
      <div className="w-screen flex justify-center ">
        <div className="w-full h-px bg-linear-to-r from-transparent via-primary/60 to-transparent shadow-2xl"></div>
      </div>
      <div className="max-w-4xl mx-auto mt-12 px-6 py-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 underline">
          Testimonials
        </h1>

        <p className="text-gray-600 italic text-base md:text-lg leading-8 min-h-[130px] transition-all duration-300">
          "{testimonials[current].quote}"
        </p>

        <p className="text-gray-700 font-semibold mt-4 text-lg">
          {testimonials[current].name}
        </p>

        <p className="text-gray-500 text-sm">{testimonials[current].country}</p>

        {/* CONTROLS */}
        <div className="flex justify-center items-center gap-6 mt-8">
          <button
            onClick={prevSlide}
            className="text-3xl text-blue-500 hover:text-blue-700 transition cursor-pointer"
          >
            <FaChevronCircleLeft />
          </button>

          <button
            onClick={nextSlide}
            className="text-3xl text-blue-500 hover:text-blue-700 transition cursor-pointer"
          >
            <FaChevronCircleRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
