import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPaypal, FaCcVisa, FaCcMastercard } from "react-icons/fa";

import RoomCard from "./RoomCard";
import RoomGallery from "./RoomGallery";

import { useFetchAllRoomsQuery } from "../../redux/features/rooms/roomsApi";
import getBaseUrl from "../../utils/baseURL";

const RoomBody = () => {
  const navigate = useNavigate();

  const [adults, setAdults] = useState(1);
  const [child, setChild] = useState(0);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const { data, isLoading, error } = useFetchAllRoomsQuery();

  const rooms = Array.isArray(data) ? data : data?.rooms || [];
  const today = new Date().toISOString().split("T")[0];

  const BASE_URL = getBaseUrl();

  const formatImage = (image) => {
    if (!image) return "https://placehold.co/600x400";

    if (Array.isArray(image)) {
      image = image[0];
    }

    if (typeof image === "object") {
      image = image.url || image.path || image.secure_url || "";
    }

    if (image.startsWith("http")) {
      return image;
    }

    return `${BASE_URL}/${image.replace(/^\/+/, "")}`;
  };

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      alert("Please select dates");
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Checkout must be after checkin");
      return;
    }

    navigate(
      `/booking?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&child=${child}`,
    );
  };

  if (isLoading) {
    return <div className="text-center py-20 text-white">Loading rooms...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">Failed loading rooms</div>
    );
  }

  return (
    <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 sm:pb-24">
      <div className="bg-primary rounded-2xl overflow-hidden shadow-xl">
        {/* HEADER */}

        <div className="p-6 md:p-10 border-b border-white/10">
          <h2
            className="
text-3xl 
font-serif 
text-white
mb-3
"
          >
            Our Rooms
          </h2>

          <p
            className="
text-white/70
max-w-xl
leading-7
"
          >
            Discover comfortable luxury rooms designed for relaxing stays at
            Kandaw 101 Hotel.
          </p>
        </div>

        {/* SEARCH */}

        <div className="p-6 md:p-10">
          <div
            className="
grid 
grid-cols-1 
md:grid-cols-2 
lg:grid-cols-5
gap-5
"
          >
            <div>
              <label className="text-white block mb-2">Check In</label>

              <input
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => setCheckIn(e.target.value)}
                className="
w-full
rounded-xl
px-4
py-3
bg-white
outline-none
"
              />
            </div>

            <div>
              <label className="text-white block mb-2">Check Out</label>

              <input
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="
w-full
rounded-xl
px-4
py-3
bg-white
outline-none
"
              />
            </div>

            <div>
              <label className="text-white block mb-2">Adults</label>

              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="
w-full
rounded-xl
px-4
py-3
bg-white
"
              >
                <option value={1}>1 Adult</option>

                <option value={2}>2 Adults</option>

                <option value={3}>3 Adults</option>
              </select>
            </div>

            <div>
              <label className="text-white block mb-2">Children</label>

              <select
                value={child}
                onChange={(e) => setChild(Number(e.target.value))}
                className="
w-full
rounded-xl
px-4
py-3
bg-white
"
              >
                <option value={0}>0 Child</option>

                <option value={1}>1 Child</option>

                <option value={2}>2 Childs</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="
w-full
bg-accent
text-white
rounded-xl
py-3
hover:scale-105
transition
"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* ROOMS */}

        <div className="p-6 md:p-10 space-y-8">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <RoomCard
                key={room._id}
                room={{
                  ...room,

                  images: formatImage(room.images),
                }}
              />
            ))
          ) : (
            <div className="text-center text-white py-10">
              No rooms available
            </div>
          )}
        </div>

        {/* PAYMENT */}

        <div
          className="
bg-white
p-10
"
        >
          <div className="text-center">
            <h3 className="text-2xl font-serif mb-3">Secure Payment Methods</h3>

            <p className="text-gray-600 mb-5">
              Safe and trusted online payment.
            </p>

            <Link to="/payment">
              <button
                className="
bg-accent
text-white
px-6
py-3
rounded-xl
flex
gap-2
mx-auto
"
              >
                <FaPaypal />
                Pay Now
              </button>
            </Link>

            <div
              className="
flex
justify-center
gap-5
text-3xl
mt-6
"
            >
              <FaPaypal className="text-blue-600" />

              <FaCcVisa className="text-blue-700" />

              <FaCcMastercard className="text-red-500" />
            </div>
          </div>
        </div>

        <RoomGallery />
      </div>
    </div>
  );
};

export default RoomBody;
