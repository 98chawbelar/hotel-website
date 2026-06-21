import { Link } from "react-router-dom";

import Loading from "../Loading";
import getBaseUrl from "../../utils/baseURL";
import { useFetchFacilitiesQuery } from "../../redux/features/facilities/facilitiesApi";

const Gym = () => {
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

  // ONLY GYM
  const gym = facilities.find(
    (item) =>
      item.name?.toLowerCase().includes("gym") ||
      item.slug?.toLowerCase().includes("gym"),
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!gym) {
    return <div className="text-center py-20">Gym data not found</div>;
  }

  return (
    <div className="w-full">
      {/* HERO IMAGE SLIDER STYLE */}
      <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
        <img
          src={getImageUrl(gym.images?.[0])}
          alt={gym.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-serif font-bold text-center">
            {gym.name}
          </h1>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
            Stay Active During Your Stay
          </h2>

          <p className="text-gray-600 text-lg leading-8">{gym.description}</p>
        </div>

        {/* ALL IMAGES */}
        <div className="mt-16 space-y-16">
          {gym.images?.map((image, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >
              {/* IMAGE */}

              <div
                className={`overflow-hidden rounded-xl shadow-lg ${
                  index % 2 !== 0 ? "order-1 lg:order-2" : ""
                }`}
              >
                <img
                  src={getImageUrl(image)}
                  alt={`${gym.name}-${index}`}
                  className="
                  w-full
                  h-[320px]
                  md:h-[450px]
                  object-cover
                  hover:scale-105
                  transition
                  duration-500
                  "
                />
              </div>

              {/* DESCRIPTION */}

              <div className={`${index % 2 !== 0 ? "order-2 lg:order-1" : ""}`}>
                <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
                  {gym.name}
                </h3>

                <p className="text-gray-600 text-lg leading-8">
                  {gym.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* BUTTON */}

        {gym.link && (
          <div className="text-center mt-16">
            <Link to={gym.link}>
              <button
                className="
                bg-primary
                text-white
                px-8
                py-4
                rounded-2xl
                "
              >
                Explore Gym
              </button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Gym;
