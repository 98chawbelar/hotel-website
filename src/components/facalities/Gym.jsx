import { Link } from "react-router-dom";

import Loading from "../Loading";
import getBaseUrl from "../../utils/baseURL";
import { useFetchFacilitiesQuery } from "../../redux/features/facilities/facilitiesApi";

const Gym = () => {
  const { data, isLoading } = useFetchFacilitiesQuery();

  // FIX RESPONSE
  const facilities = Array.isArray(data)
    ? data
    : data?.facilities || data?.data || [];

  const BASE_URL = getBaseUrl();

  // IMAGE URL FIX
  const getImageUrl = (img) => {
    if (!img) {
      return "https://placehold.co/600x400?text=No+Image";
    }

    // OBJECT SUPPORT
    if (typeof img === "object") {
      img = img.url || img.path || img.secure_url || "";
    }

    if (!img) {
      return "https://placehold.co/600x400?text=No+Image";
    }

    // FULL URL
    if (img.startsWith("http")) {
      return img;
    }

    // REMOVE DUPLICATE SLASH
    img = img.replace(/^\/+/, "");

    // FIX uploads path
    if (!img.startsWith("uploads")) {
      img = `uploads/${img}`;
    }

    return `${BASE_URL}/${img}`;
  };

  // FIND GYM
  const gym = facilities.find(
    (item) =>
      item?.name?.toLowerCase().includes("gym") ||
      item?.slug?.toLowerCase().includes("gym"),
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!gym) {
    return <div className="text-center py-20 text-2xl">Gym data not found</div>;
  }

  console.log("GYM DATA =>", gym);

  return (
    <div className="w-full bg-primary overflow-hidden">
      {/* HERO */}
      <section className="relative w-full h-[45vh] sm:h-[55vh] md:h-[70vh] overflow-hidden">
        <img
          src={getImageUrl(gym.images?.[0])}
          alt={gym.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4">
          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold text-center">
            {gym.name}
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* INTRO */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-white font-bold mb-6">
            Stay Active During Your Stay
          </h2>

          <p className="text-secondary/65 text-base md:text-lg leading-8">
            {gym.description}
          </p>
        </div>

        {/* GYM IMAGES */}
        <div className="mt-16 space-y-16">
          {gym.images?.map((image, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >
              {/* IMAGE */}
              <div
                className={`overflow-hidden rounded-2xl shadow-xl ${
                  index % 2 !== 0 ? "order-1 lg:order-2" : ""
                }`}
              >
                <img
                  src={getImageUrl(image)}
                  alt={`${gym.name}-${index}`}
                  className="
                    w-full
                    h-[280px]
                    sm:h-[350px]
                    md:h-[450px]
                    object-cover
                    hover:scale-105
                    transition
                    duration-500
                  "
                />
              </div>

              {/* TEXT */}
              <div className={`${index % 2 !== 0 ? "order-2 lg:order-1" : ""}`}>
                <h3 className="text-2xl md:text-3xl text-white font-bold mb-5">
                  {index === 0 && "Modern Fitness Equipment"}

                  {index === 1 && "Comfortable Workout Environment"}

                  {index === 2 && "Healthy Lifestyle Experience"}

                  {index > 2 && gym.name}
                </h3>

                <p className="text-secondary/65 text-base md:text-lg leading-8">
                  {index === 0 &&
                    "Our hotel gym includes modern cardio machines, strength equipment, and free weights for a complete fitness experience."}

                  {index === 1 &&
                    "Enjoy a clean, spacious, and air-conditioned workout area designed for comfort and convenience during your stay."}

                  {index === 2 &&
                    "Maintain your healthy routine while traveling with our fully equipped fitness center available for hotel guests."}

                  {index > 2 && gym.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* BUTTON */}
      </section>
    </div>
  );
};

export default Gym;
