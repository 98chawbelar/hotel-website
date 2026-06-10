import React, { useState } from "react";
import { rooms, assets } from "../../assets/assets";
import { useFetchAllRoomsQuery } from "../../redux/features/rooms/roomsApi";

const RoomGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const { data, isLoading, error } = useFetchAllRoomsQuery();
  const rooms = Array.isArray(data)
    ? data
    : Array.isArray(data?.rooms)
      ? data.rooms
      : [];

  const images = rooms
    .filter((room) => room.image)
    .map((room) => ({
      src: room.image,
      name: room.name,
    }));

  const closeModal = () => setSelectedImage(null);
  if (isLoading) {
    return <div className="text-center py-20 text-white">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load gallery
      </div>
    );
  }

  return (
    <section className="py-20 px-4 bg-transparent overflow-hidden">
      {/* ================= GALLERY HEADER ================= */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
          Explore Our Gallery
        </h2>

        <p className="text-white/60 max-w-2xl mx-auto">
          Experience luxury interiors and unforgettable comfort.
        </p>
      </div>

      {/* ================= 3D STACK GALLERY ================= */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-5xl h-[520px] sm:h-[550px] md:h-[600px]">
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              className="
                absolute cursor-pointer group
                left-1/2 -translate-x-1/2
                transition-all duration-500
              "
              style={{
                top: `${index * 35}px`,
                zIndex: images.length - index,
                transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
              }}
            >
              {/* CARD */}
              <div
                className="
                  w-[260px]
                  sm:w-[320px]
                  md:w-[380px]
                  h-[320px]
                  sm:h-[360px]
                  md:h-[420px]
                  overflow-hidden
                  rounded-2xl
                  shadow-2xl
                  border border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  transition-transform duration-500
                  group-hover:scale-105
                "
              >
                <img
                  src={img.src}
                  alt={img.name}
                  className="
                    w-full h-full object-cover
                    transition duration-700
                    group-hover:scale-110
                  "
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition" />

                {/* label */}
                <div className="absolute bottom-3 left-3 text-white text-sm opacity-0 group-hover:opacity-100 transition">
                  {img.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {selectedImage && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full px-4 text-center"
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.name}
              className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />

            <p className="text-white mt-4 text-lg md:text-xl font-serif">
              {selectedImage.name}
            </p>
          </div>
        </div>
      )}

      {/* ================= REVIEW SECTION ================= */}
      <div className="max-w-6xl mx-auto mt-20 px-4">
        <div className="relative rounded-3xl overflow-hidden">
          {/* glow background */}
          <div className="absolute inset-0 bg-cyan-400/10 blur-3xl" />

          {/* glass container */}
          <div className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              {/* LEFT SIDE */}
              <div className="flex items-center gap-6">
                {/* SCORE */}
                <div className="relative w-24 h-24 flex flex-col items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                  <h2 className="text-3xl font-bold text-white">8.9</h2>
                  <p className="text-xs text-white/60">Excellent</p>

                  <div className="absolute inset-0 rounded-2xl bg-cyan-400/10 blur-xl -z-10" />
                </div>

                {/* TEXT */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">
                    Trusted Guest Reviews
                  </h3>

                  <p className="text-white/60 max-w-xl leading-7">
                    Guests love the peaceful mountain atmosphere, modern luxury
                    rooms, and warm hospitality at Kandaw 101 Hotel.
                  </p>

                  <div className="flex items-center gap-1 mt-3 text-yellow-400">
                    ★★★★★
                    <span className="text-white/50 text-sm ml-3">
                      Based on verified stays
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { name: "Agoda", color: "text-purple-300" },
                  { name: "Booking", color: "text-blue-300" },
                  { name: "Airbnb", color: "text-red-300" },
                  { name: "Trip.com", color: "text-cyan-300" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="
                      px-5 py-3
                      rounded-2xl
                      bg-white/5
                      border border-white/10
                      backdrop-blur-xl
                      hover:scale-105
                      transition
                    "
                  >
                    <p className={`font-semibold ${item.color}`}>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomGallery;
