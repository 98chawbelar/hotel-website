import { useEffect, useState } from "react";
import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaQuoteLeft,
  FaStar,
} from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "Calm, serene, and beautifully retro. The perfect place to relax and enjoy nature. Every moment felt peaceful and refreshing.",
      name: "Mr. and Mrs. Chaw",
      country: "Myanmar",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
    },

    {
      quote:
        "A wonderful escape from city life. Clean rooms, fresh mountain air, and breathtaking views made our stay unforgettable.",
      name: "Sophia Martin",
      country: "United Kingdom",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
    },

    {
      quote:
        "Excellent hospitality and cozy atmosphere. We loved waking up to the hills and enjoying breakfast with a beautiful view.",
      name: "Ko Aung Min",
      country: "Thailand",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400",
    },
  ];

  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <section className=" bg-primary relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* TOP LINE */}
      <div className="w-screen  mt-20 flex justify-center ">
        <div className="w-full  h-px bg-linear-to-r from-transparent via-gray-600 mb-5 to-transparent shadow-xs"></div>
      </div>

      {/* BACKGROUND BLUR */}
      <div className="absolute top-1/2 left-1/2 w-125 h-125 bg-accent/10 blur-[140px] rounded-full -translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-5xl mx-auto">
        {/* HEADING */}
        <div className="text-center mb-10 mt-12">
          <p className="uppercase tracking-[6px] text-accent text-xs sm:text-sm ">
            Guest Reviews
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary leading-tight">
            What Our Guests Say
          </h1>

          <p className="text-primary/60 mt-6 max-w-2xl mx-auto leading-8">
            Discover unforgettable experiences shared by guests who enjoyed
            luxury, comfort, and peaceful mountain hospitality at Kandaw101
            Hotel.
          </p>
        </div>

        {/* CARD */}
        <div className="relative bg-white/60 backdrop-blur-2xl border border-white/20 rounded-[32px] sm:rounded-[40px] shadow-2xl p-8 sm:p-12 lg:p-16 overflow-hidden">
          {/* QUOTE ICON */}
          <div className="absolute top-8 left-8 text-accent/30 text-7xl">
            <FaQuoteLeft />
          </div>

          {/* STARS */}
          <div className="flex justify-center gap-2 mb-8 relative z-10">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className="text-accent text-lg" />
            ))}
          </div>

          {/* QUOTE */}
          <p className="relative z-10 text-center text-secondary/60 text-lg sm:text-xl lg:text-2xl leading-9 sm:leading-13 font-light max-w-4xl mx-auto transition-all duration-500">
            “{testimonials[current].quote}”
          </p>

          {/* USER */}
          <div className="mt-12 flex flex-col items-center">
            <img
              src={testimonials[current].image}
              alt={testimonials[current].name}
              className="w-15 h-15 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-white shadow-xl"
            />

            <h3 className="mt-5 text-xl sm:text-2xl font-bold">
              {testimonials[current].name}
            </h3>

            <p className="text-primary/50 mt-1">
              {testimonials[current].country}
            </p>
          </div>

          {/* CONTROLS */}
          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              onClick={prevSlide}
              className="group w-14 h-14 rounded-full border border-primary/10 bg-white shadow-lg flex items-center justify-center hover:bg-accent hover:text-primary transition duration-300"
            >
              <FaChevronCircleLeft className="text-2xl group-hover:scale-110 transition" />
            </button>

            {/* DOTS */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`transition-all duration-300 rounded-full ${
                    current === index
                      ? "w-8 h-3 bg-accent"
                      : "w-3 h-3 bg-primary/20 hover:bg-primary/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="group w-14 h-14 rounded-full border border-primary/10 bg-white shadow-lg flex items-center justify-center hover:bg-accent hover:text-primary transition duration-300"
            >
              <FaChevronCircleRight className="text-2xl group-hover:scale-110 transition" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
