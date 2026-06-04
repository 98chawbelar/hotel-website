import { assets } from "../../assets/assets";

const laundryServices = [
  {
    title: "Premium Laundry & Garment Care",
    description:
      "Our professional laundry service is designed to provide guests with fresh, clean, and perfectly cared-for clothing throughout their stay. From everyday garments to delicate fabrics, every item is handled with attention and care to ensure comfort, cleanliness, and convenience in a luxury hotel environment.",
    image: assets.laundry_1,
    alt: "Laundry Service",
  },
  {
    title: "Fast & Convenient Service",
    description:
      "Kandaw 101 Hotel offers reliable laundry solutions including washing, ironing, drying, and same-day service options for added convenience. Guests can enjoy freshly prepared clothing delivered neatly and professionally, allowing for a relaxing and worry-free stay in the heart of Mogok.",
    image: assets.laundry_2,
    alt: "Luxury Laundry Service",
  },
];

const pricing = [
  {
    title: "Shirt / T-Shirt",
    description: "Professional washing and ironing service.",
    price: "200 MMK",
  },
  {
    title: "Pants / Jeans",
    description: "Fresh cleaning with careful fabric handling.",
    price: "400 MMK",
  },
  {
    title: "Jacket / Coat",
    description: "Premium garment care and professional finishing.",
    price: "600 MMK",
  },
];

const facilities = [
  {
    title: "Free WiFi",
    description:
      "High-speed internet access available throughout the hotel.",
  },
  {
    title: "Free Car Parking",
    description:
      "Secure and convenient parking space for hotel guests.",
  },
  {
    title: "Android TV",
    description:
      "Enjoy entertainment and streaming services inside every room.",
  },
  {
    title: "Daily Room Cleaning",
    description:
      "Clean and comfortable rooms prepared every day for your stay.",
  },
];

const Laundry = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative max-w-screen h-fit">
        <img
          src={assets.laundry}
          alt="Hotel Laundry"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-serif font-bold text-center">
            Professional Laundry Service
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Intro */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Fresh, clean, and carefully handled laundry service for a
            comfortable stay at Kandaw 101 Hotel.
          </h2>

          <p className="text-gray-600 text-lg leading-8">
            At Kandaw 101 Hotel, we provide convenient and reliable laundry
            services to ensure our guests enjoy a comfortable and worry-free
            stay. From daily clothing care to special garment handling, our
            team delivers fresh and neatly prepared laundry with professional
            attention.
          </p>
        </div>

        {/* Laundry Service Sections */}
        <div className="mt-16 space-y-16">
          {laundryServices.map((service, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >
              {/* Image Left */}
              <div
                className={`overflow-hidden rounded-sm shadow-lg ${
                  index % 2 !== 0 ? "order-1 lg:order-2" : ""
                }`}
              >
                <img
                  src={service.image}
                  alt={service.alt}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>

              {/* Text Right */}
              <div
                className={`${
                  index % 2 !== 0 ? "order-2 lg:order-1" : ""
                }`}
              >
                <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-8 text-lg">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              Laundry Service Pricing
            </h2>

            <p className="text-gray-600 text-lg leading-8 max-w-3xl mx-auto">
              We provide affordable and professional laundry services designed
              for your comfort and convenience during your stay at Kandaw 101
              Hotel.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricing.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition duration-300 bg-white"
              >
                <h3 className="text-2xl font-semibold mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>

                <span className="mt-2 inline-block bg-accent/50 text-black px-1 py-1 rounded-md text-md font-medium shadow-xs">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Complimentary Facilities */}
        <div className="mt-24 bg-gray-50 rounded-2xl p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              Complimentary Hotel Facilities
            </h2>

            <p className="text-gray-600 text-lg leading-8 max-w-3xl mx-auto">
              Kandaw 101 Hotel is committed to providing guests with comfort,
              convenience, and a relaxing hospitality experience through our
              premium complimentary facilities.
            </p>
          </div>

          {/* Facilities Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm text-center"
              >
                <h3 className="text-xl font-semibold mb-3">
                  {facility.title}
                </h3>

                <p className="text-gray-600">
                  {facility.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Text */}
          <div className="text-center mt-12">
            <p className="text-gray-700 text-lg leading-8 max-w-4xl mx-auto">
              At Kandaw 101 Hotel, we strive to create a safe, clean, and
              enjoyable environment where every guest can relax comfortably and
              experience warm hospitality throughout their stay.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Laundry;