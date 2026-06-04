import React from "react";
import { assets } from "../../assets/assets";

const restaurantSections = [
  {
    title: "Morning Flavors at Kandaw 101",
    description:
      "Start your day with a carefully crafted breakfast experience featuring both American classics and authentic Burmese specialties. From freshly toasted bread, coffee, and hearty breakfast sets to traditional favorites like Shan noodles and Mohinga, every dish is prepared to bring comfort, flavor, and a memorable dining experience in a cozy and elegant setting.",
    image: assets.restaurant_1,
    alt: "Restaurant Interior",
  },
  {
    title: "American Breakfast Set",
    description:
      "Enjoy a classic American-style breakfast featuring toasted bread, boiled eggs, a fresh sandwich served with salad, and two delicious sausages. The set is complemented with your choice of freshly brewed coffee or refreshing juice for a perfect morning start.",
    image: assets.american_breakfast,
    alt: "American Breakfast",
    price: "$5",
  },
  {
    title: "Burmese Breakfast Set",
    description:
      "Enjoy a traditional Burmese-style breakfast featuring authentic Shan noodles, crispy E Kyar Kway, flavorful Mohinga, and a selection of local morning favorites. The meal is perfectly paired with traditional Burmese milk tea or a refreshing beverage, offering a warm and satisfying start to your day.",
    image: assets.burmese_breakfast,
    alt: "Burmese Breakfast",
    price: "$5",
  },
];

const Restaurant = () => {
  return (
    <div className="w-full">
      
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
        <img
          src={assets.restaurant}
          alt="Hotel Restaurant"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-serif font-bold text-center">
            Luxury Restaurant Experience
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Intro */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Delicious Dining Experience
          </h2>

          <p className="text-gray-600 text-lg leading-8">
            At Kandaw 101 Hotel, we offer a delightful culinary journey with our
            diverse menu featuring both local and international cuisines. Our
            restaurant provides a warm and inviting atmosphere where guests can
            savor exquisite dishes prepared by our talented chefs.
          </p>
        </div>

        {/* Restaurant Sections */}
        <div className="mt-16 space-y-16">
          {restaurantSections.map((section, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >

              {/* Image */}
              <div
                className={`overflow-hidden rounded-sm shadow-lg ${
                  index % 2 !== 0 ? "order-1 lg:order-2" : ""
                }`}
              >
                <img
                  src={section.image}
                  alt={section.alt}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>

              {/* Text */}
              <div
                className={`${
                  index % 2 !== 0 ? "order-2 lg:order-1" : ""
                }`}
              >
                <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
                  {section.title}
                </h3>

                <p className="text-gray-600 leading-8 text-lg">
                  {section.description}
                </p>

                {/* Price Tag */}
                {section.price && (
                  <div className="mt-2 inline-block bg-accent/50 text-black px-1 py-1 rounded-md text-md font-medium shadow-xs">
                    Starting From {section.price}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Restaurant;