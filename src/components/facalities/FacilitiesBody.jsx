import React from "react";
import { facilities } from "../../assets/assets";
import { Link } from "react-router-dom";

const FacilitiesBody = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-3xl uppercase font-serif font-semibold text-center">
        Facilities
      </h1>

      <p className="text-md mt-2 text-center text-gray-500 font-normal mb-10 max-w-4xl mx-auto">
        We want your stay at our lush hotel to be truly unforgettable. 
        That is why we give special attention to all of your needs so that we can ensure an experience quite unique. 
        Luxury hotels offer the perfect setting with stunning views for leisure and our modern luxury resort facilities will help you enjoy the best of all.
      </p>

      <div className="space-y-8">
        {facilities.map((item, index) => (
          <div key={index} className="relative w-full">

            <Link to={item.link}>
              <img
                src={item.image}
                alt={item.name}
                className="w-full md:w-[90%] lg:w-[80%] mx-auto h-auto rounded-sm object-cover shadow-md"
              />
            </Link>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-primary/50 px-6 py-2 rounded-t-sm shadow-sm">
              <p className="text-white text-xl font-bold">
                {item.name}
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default FacilitiesBody;