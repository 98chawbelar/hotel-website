import { useState } from "react";

import { useFetchAllRoomsQuery } from "../../redux/features/rooms/roomsApi";
import getBaseUrl from "../../utils/baseURL";
import { getImgUrl } from "../../utils/getImgUrl";
const RoomGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const { data, isLoading, error } = useFetchAllRoomsQuery();

  const rooms = Array.isArray(data) ? data : data?.rooms || [];

  const images = rooms.flatMap((room) => {
    if (!room.images) {
      return [];
    }

    if (Array.isArray(room.images)) {
      return room.images.map((img) => ({
        src: getImgUrl(img),

        name: room.name,
      }));
    }

    return [
      {
        src: getImgUrl(room.images),
        name: room.name,
      },
    ];
  });

  if (isLoading) {
    return (
      <div className="text-center py-20 text-white">Loading gallery...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load gallery
      </div>
    );
  }

  return (
    <section className="py-20 px-4 overflow-hidden">
      {/* HEADER */}

      <div className="text-center mb-10">
        <h2
          className="
text-3xl
md:text-5xl
font-serif
text-white
mb-4
"
        >
          Explore Our Gallery
        </h2>

        <p
          className="
text-white/60
max-w-2xl
mx-auto
"
        >
          Experience luxury rooms, elegant interiors and unforgettable comfort.
        </p>
      </div>

      {/* HALF CIRCLE GALLERY */}

      <div
        className="

relative

max-w-7xl

mx-auto

h-[350px]

sm:h-[420px]

md:h-[500px]

flex

justify-center

overflow-hidden

"
      >
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(img)}
            className="

absolute

bottom-0

cursor-pointer

group

transition-all

duration-500

"
            style={{
              left:
                window.innerWidth < 640 ? `${index * 28}%` : `${index * 16}%`,

              zIndex: index,
            }}
          >
            <div
              className="


w-[220px]

sm:w-[260px]

md:w-[320px]


h-[260px]

sm:h-[330px]

md:h-[420px]



rounded-t-full


overflow-hidden


shadow-2xl


border

border-white/20



bg-white/10



backdrop-blur-xl



group-hover:-translate-y-8


transition

duration-500


"
            >
              <img
                src={img.src}
                alt={img.name}
                className="

w-full

h-full

object-cover


group-hover:scale-110


transition

duration-700

"
              />

              <div
                className="

absolute

inset-0

bg-gradient-to-t

from-black/70

via-black/10

to-transparent

"
              />

              <div
                className="

absolute

bottom-6

left-0

right-0


text-center


text-white


opacity-0


group-hover:opacity-100


transition

"
              >
                <h3
                  className="

text-xl

font-serif

"
                >
                  {img.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* IMAGE MODAL */}

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="

fixed

inset-0

z-50

bg-black/80

backdrop-blur-xl

flex

items-center

justify-center

px-4

"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="

max-w-6xl

w-full

text-center

"
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.name}
              className="

w-full

max-h-[85vh]

object-contain

rounded-3xl

shadow-2xl

"
            />

            <p
              className="

text-white

mt-5

text-2xl

font-serif

"
            >
              {selectedImage.name}
            </p>
          </div>
        </div>
      )}

      {/* REVIEW SECTION */}

      <div
        className="

max-w-6xl

mx-auto

mt-20


rounded-3xl


bg-white/5


border

border-white/10


backdrop-blur-xl


p-8

md:p-12

"
      >
        <div
          className="

flex

flex-col

lg:flex-row

justify-between

items-center

gap-10

"
        >
          <div>
            <h3
              className="

text-3xl

font-serif

text-white

mb-4

"
            >
              Trusted Guest Reviews
            </h3>

            <p className="text-white/60 leading-7 max-w-xl">
              Guests enjoy peaceful mountain views, luxury rooms and warm
              hospitality at Kandaw 101 Hotel.
            </p>

            <div className="mt-4 text-yellow-400 text-xl">★★★★★</div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {["Agoda", "Booking", "Airbnb", "Trip.com"].map((item) => (
              <div
                key={item}
                className="px-5 py-3 rounded-xl bg-white/10 text-white borde border-white/10"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomGallery;
